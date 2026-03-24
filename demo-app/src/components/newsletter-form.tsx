"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setState("error");
      setMessage(result.error.issues[0].message);
      return;
    }

    setState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      });

      const data = await res.json();

      if (res.ok) {
        setState("success");
        setMessage(data.message || "You're subscribed!");
        setEmail("");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="newsletter"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-brand-purple/8 animate-ember" />
      </div>

      <div className="relative max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 mb-8 animate-forge-pulse">
          <Mail className="w-7 h-7 text-brand-purple" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Stay in the{" "}
          <span className="gradient-text">loop</span>
        </h2>

        <p className="text-muted-foreground text-lg mb-10">
          Get weekly insights on AI, automation, and building with modern tools.
          No spam, unsubscribe anytime.
        </p>

        {state === "success" ? (
          <div className="animate-fade-up flex flex-col items-center gap-4 p-8 rounded-2xl glass">
            <CheckCircle2 className="w-10 h-10 text-brand-green" />
            <p className="text-lg font-medium">{message}</p>
            <div className="text-muted-foreground text-sm space-y-2 text-center max-w-md">
              <p>
                This is a <strong className="text-brand-gold">demo</strong> &mdash; no
                email will be sent. Your address was saved locally to test the form.
              </p>
              <p>
                To build a real newsletter, integrate with{" "}
                <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Resend</a>,{" "}
                <a href="https://convertkit.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">ConvertKit</a>, or{" "}
                <a href="https://mailchimp.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Mailchimp</a>.
                See the{" "}
                <a href="https://github.com/brainit-consulting/DreamForgeSoftwareAgentSkills/blob/main/demo-app/README.md" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">README</a>{" "}
                for setup instructions.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address"
                  aria-invalid={state === "error" ? "true" : undefined}
                  className="w-full h-13 px-5 rounded-full glass text-base
                             placeholder:text-muted-foreground/50
                             focus:outline-none focus:ring-2 focus:ring-brand-purple/50
                             transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                className="h-13 px-8 rounded-full font-semibold text-white
                           bg-gradient-to-r from-brand-purple to-brand-blue
                           shadow-[0_8px_30px_rgba(139,92,246,0.3)]
                           hover:shadow-[0_12px_40px_rgba(139,92,246,0.45)]
                           hover:-translate-y-0.5
                           disabled:opacity-60 disabled:hover:translate-y-0
                           transition-all duration-300 cursor-pointer
                           flex items-center justify-center gap-2 min-w-[140px]"
              >
                {state === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            {/* Honeypot — hidden from real users, traps bots */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
            />

            {/* Status message */}
            <div aria-live="polite" className="min-h-[24px]">
              {state === "error" && (
                <div className="flex items-center justify-center gap-2 text-destructive text-sm animate-fade-up">
                  <AlertCircle className="w-4 h-4" />
                  <span>{message}</span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground/60 text-xs">
              By subscribing you agree to receive emails from DreamForge Academy.
              Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
