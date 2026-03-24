import { DemoBanner } from "@/components/demo-banner";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { NewsletterForm } from "@/components/newsletter-form";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <NewsletterForm />
        <About />
      </main>
      <Footer />
    </>
  );
}
