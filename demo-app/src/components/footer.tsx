import { Flame } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flame className="w-4 h-4 text-brand-gold" />
            <span className="text-sm">
              &copy; {year} DreamForge Software. All rights reserved.
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://dreamforge-academy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Academy
            </a>
            <a
              href="https://github.com/brainit-consulting/DreamForgeSoftwareAgentSkills"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/brainit-consulting/DreamForgeSoftwareAgentSkills/blob/main/PRIVACY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
          </nav>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-8">
          Built with Next.js &middot; Created by Emile du Toit
        </p>
      </div>
    </footer>
  );
}
