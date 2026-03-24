"use client";

import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToNewsletter = () => {
    document
      .getElementById("newsletter")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden noise-overlay">
      {/* Ember glow orbs */}
      <div className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-brand-purple/20 animate-ember" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 rounded-full bg-brand-gold/15 animate-ember delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 animate-ember delay-400" />

      {/* Floating sparks */}
      <div className="absolute top-[20%] right-[25%] w-2 h-2 rounded-full bg-brand-gold animate-float" />
      <div className="absolute top-[35%] left-[20%] w-1.5 h-1.5 rounded-full bg-brand-purple animate-float delay-300" />
      <div className="absolute bottom-[30%] right-[15%] w-1 h-1 rounded-full bg-brand-cyan animate-float delay-500" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-muted-foreground">
              An online academy for builders &amp; entrepreneurs
            </span>
          </div>
        </div>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Forge your{" "}
          <span className="gradient-text-warm">future</span>{" "}
          with tech
        </h1>

        <p className="animate-fade-up delay-200 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          DreamForge Academy teaches small business owners and tech enthusiasts
          how to harness AI, automation, and modern software tools to build
          something extraordinary.
        </p>

        <div className="animate-fade-up delay-300 flex justify-center">
          <button
            onClick={scrollToNewsletter}
            className="group relative px-10 py-4 rounded-full font-semibold text-white
                       bg-gradient-to-r from-brand-purple to-brand-blue
                       shadow-[0_10px_40px_rgba(139,92,246,0.3)]
                       hover:shadow-[0_14px_50px_rgba(139,92,246,0.45)]
                       hover:-translate-y-0.5
                       transition-all duration-300 cursor-pointer"
          >
            Subscribe to Newsletter
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        <button
          onClick={scrollToNewsletter}
          className="animate-fade-up delay-500 mt-16 mx-auto flex flex-col items-center gap-2
                     text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Scroll to newsletter"
        >
          <span className="text-xs uppercase tracking-widest">Discover</span>
          <ArrowDown className="w-4 h-4 animate-float" />
        </button>
      </div>
    </section>
  );
}
