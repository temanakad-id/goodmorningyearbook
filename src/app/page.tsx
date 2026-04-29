import HeroSection from "@/components/sections/HeroSection";
import ProductionService from "@/components/sections/ProductionService";
import MarqueeTicker from "@/components/sections/MarqueeTicker";
import ProcessWorkflow from "@/components/sections/ProcessWorkflow";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <ProductionService />
        <MarqueeTicker />
        <ProcessWorkflow />
      </main>
    </>
  );
}