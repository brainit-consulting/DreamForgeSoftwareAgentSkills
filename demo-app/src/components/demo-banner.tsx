"use client";

import { useState } from "react";
import { X, FlaskConical } from "lucide-react";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-[60] bg-brand-gold/10 border-b border-brand-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-center gap-2 text-sm">
        <FlaskConical className="w-4 h-4 text-brand-gold shrink-0" />
        <p className="text-center">
          <strong className="text-brand-gold">Demo app</strong>
          <span className="text-muted-foreground">
            {" "}&mdash; This prototype exists to test the{" "}
            <a
              href="https://github.com/brainit-consulting/DreamForgeSoftwareAgentSkills"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              audit-my-app
            </a>{" "}
            skill. The form saves locally but does not send real emails.
          </span>
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 rounded-md hover:bg-brand-gold/10 transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
