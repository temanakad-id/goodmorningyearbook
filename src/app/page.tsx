// ✅ FILE YANG SUDAH DI-RESOLVE (keep BOTH components)

import HeroSection from "@/components/sections/HeroSection";
import ProductionService from "@/components/sections/ProductionService";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductionService />
    </main>
  );
}