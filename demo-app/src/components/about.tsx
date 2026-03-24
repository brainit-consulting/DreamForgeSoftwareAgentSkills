import { Flame, ExternalLink } from "lucide-react";

export function About() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="relative p-10 sm:p-14 rounded-3xl glass overflow-hidden">
          {/* Subtle corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-gold/10 to-transparent rounded-bl-full" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-6 h-6 text-brand-gold" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                The Real Academy
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                <strong className="text-foreground">DreamForge Academy</strong>{" "}
                is a hands-on learning platform where small business owners and
                tech enthusiasts learn to build real products with AI, automation,
                and modern software — no CS degree required.
              </p>
              <p>
                This demo page is a prototype, but the Academy is the real deal. Founded by{" "}
                <strong className="text-foreground">Emile du Toit</strong>, courses
                cover everything from AI agents (Claude, Codex) and workflow
                automation (n8n) to full-stack SaaS development and deployment.
                New content drops regularly.
              </p>
            </div>

            <a
              href="https://dreamforge-academy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full
                         font-semibold text-white
                         bg-gradient-to-r from-brand-purple to-brand-blue
                         shadow-[0_10px_40px_rgba(139,92,246,0.3)]
                         hover:shadow-[0_14px_50px_rgba(139,92,246,0.45)]
                         hover:-translate-y-0.5
                         transition-all duration-300 group"
            >
              Join the Actual Academy
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
