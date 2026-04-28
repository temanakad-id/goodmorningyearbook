import HeroSection from "@/components/sections/HeroSection";
import ProcessWorkflow from "@/components/sections/ProcessWorkflow";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProcessWorkflow />
    </main>
  );
}
