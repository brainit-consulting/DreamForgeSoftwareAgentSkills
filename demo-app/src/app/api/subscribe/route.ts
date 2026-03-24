import { NextResponse } from "next/server";
import { z } from "zod";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  honeypot: z.string().max(0).optional(),
});

interface Subscriber {
  email: string;
  subscribedAt: string;
}

const DATA_DIR = join(process.cwd(), "data");
const SUBSCRIBERS_FILE = join(DATA_DIR, "subscribers.json");

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, honeypot } = parsed.data;

    // Honeypot check — bots fill hidden fields, real users don't
    if (honeypot && honeypot.length > 0) {
      // Return success silently to not reveal the trap
      return NextResponse.json({ message: "Thanks for subscribing!" });
    }

    const subscribers = await readSubscribers();
    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicates
    if (subscribers.some((s) => s.email === normalizedEmail)) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    // Add subscriber
    subscribers.push({
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
    });

    await writeSubscribers(subscribers);

    // TODO: Replace file-based storage with a real email service
    // Options: Resend, ConvertKit, Mailchimp, Buttondown
    // Example with Resend:
    // await resend.contacts.create({
    //   email: normalizedEmail,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    // });

    return NextResponse.json({
      message: "You're subscribed! Welcome to the forge.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
