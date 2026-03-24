"use client";

import Image from "next/image";
import { Moon, Sun, Flame } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="https://dreamforge-academy.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-brand-purple/30 group-hover:ring-brand-gold/60 transition-all duration-500">
            <Image
              src="/logo.png"
              alt="DreamForge Academy"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-brand-gold" />
            <span className="font-heading text-lg tracking-tight font-semibold">
              DreamForge
            </span>
            <span className="text-muted-foreground text-sm hidden sm:inline">
              Academy
            </span>
          </div>
        </a>

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 rounded-full flex items-center justify-center
                       hover:bg-secondary transition-colors duration-300
                       group cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-brand-gold group-hover:rotate-45 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 text-brand-purple group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
