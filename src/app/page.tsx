import HeroSection from "@/components/sections/HeroSection";
import ProductionService from "@/components/sections/ProductionService";
import MarqueeTicker from "@/components/sections/MarqueeTicker";
import ProcessWorkflow from "@/components/sections/ProcessWorkflow";
import NewsSection from "@/components/sections/NewsSection";
import ClientReviews from "@/components/sections/ClientReviews";
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
        <NewsSection />
        <ClientReviews />
      </main>
    </>
  );
}