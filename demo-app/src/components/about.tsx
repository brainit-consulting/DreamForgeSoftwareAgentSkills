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
                About the Academy
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                <strong className="text-foreground">DreamForge Academy</strong>{" "}
                is an online learning platform for small business owners and tech
                enthusiasts who want to build with modern tools — without needing
                a computer science degree.
              </p>
              <p>
                Founded by{" "}
                <strong className="text-foreground">Emile du Toit</strong>, the
                Academy covers everything from AI agents and automation
                (n8n, Claude, Codex) to SaaS development and deployment.
                Whether you&apos;re a plumber exploring tech or a developer going
                deeper, there&apos;s something here for you.
              </p>
            </div>

            <a
              href="https://dreamforge-academy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full
                         font-medium text-sm glass
                         hover:border-brand-purple/30 hover:bg-secondary
                         transition-all duration-300 group"
            >
              Explore the Academy
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
