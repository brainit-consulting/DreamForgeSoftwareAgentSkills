import { BookOpen, Code, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Weekly Insights",
    description:
      "Curated tips and strategies for small business owners navigating the tech landscape. No jargon, just actionable advice.",
    accent: "text-brand-cyan",
    glow: "bg-brand-cyan/10",
  },
  {
    icon: Code,
    title: "Tech Tutorials",
    description:
      "Hands-on guides for building with AI agents, automation platforms, SaaS tools, and modern frameworks.",
    accent: "text-brand-purple",
    glow: "bg-brand-purple/10",
  },
  {
    icon: Users,
    title: "Community Access",
    description:
      "Connect with fellow learners, share wins, get feedback, and collaborate on projects in our growing community.",
    accent: "text-brand-gold",
    glow: "bg-brand-gold/10",
  },
  {
    icon: Sparkles,
    title: "Early Access",
    description:
      "Be the first to know about new Academy courses, tools, and resources before they go public.",
    accent: "text-brand-green",
    glow: "bg-brand-green/10",
  },
];

export function Features() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What you&apos;ll get
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Subscribe to the newsletter and unlock a growing library of
            knowledge, tools, and connections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`animate-fade-up delay-${(i + 1) * 100} group relative p-8 rounded-2xl glass
                         hover:border-brand-purple/20 transition-all duration-500
                         hover:-translate-y-1`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.glow} flex items-center justify-center mb-5
                            group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-6 h-6 ${feature.accent}`} />
              </div>

              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
