"use client";

import { useState } from "react";
import { X, FlaskConical } from "lucide-react";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-40 max-w-2xl mx-auto px-6 -mt-8 mb-12">
      <div
        className="relative p-6 sm:p-8 rounded-2xl border border-brand-gold/25
                    bg-gradient-to-br from-brand-gold/8 via-brand-purple/5 to-transparent
                    backdrop-blur-xl shadow-[0_8px_40px_rgba(245,158,11,0.1)]"
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 p-1.5 rounded-full
                     hover:bg-brand-gold/15 transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-6 h-6 text-brand-gold" />
            <h3 className="font-heading text-2xl sm:text-3xl text-brand-gold tracking-tight">
              This is a Demo
            </h3>
          </div>

          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            This prototype exists to test the{" "}
            <a
              href="https://github.com/brainit-consulting/DreamForgeSoftwareAgentSkills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-purple font-medium underline underline-offset-2
                         hover:text-brand-cyan transition-colors"
            >
              audit-my-app
            </a>{" "}
            skill. The newsletter form saves locally but does not send real emails.
          </p>
        </div>
      </div>
    </div>
  );
}
