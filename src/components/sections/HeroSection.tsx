"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const parallaxWatermark = useTransform(scrollY, [0, 1000], [0, 150]);
  const parallaxMockup = useTransform(scrollY, [0, 1000], [0, -100]);

  // Stat 1 counter
  const countRef = useRef<HTMLSpanElement>(null);
  const countInView = useInView(countRef, { once: true });
  const [counterDone, setCounterDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && countInView && !counterDone) {
      const controls = animate(0, 231, {
        duration: 2,
        onUpdate: (value) => {
          if (countRef.current) {
            countRef.current.textContent = Math.round(value).toString();
          }
        },
        onComplete: () => {
          setCounterDone(true);
        },
      });
      return () => controls.stop();
    }
  }, [countInView, counterDone, mounted]);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-between pt-[140px] pb-[80px] px-[50px] max-[600px]:px-[20px]"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #1a1a2e, #0a0a1a, #111128)",
      }}
    >
      {/* CSS classes for custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-slow-reverse 30s linear infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}} />

      {/* Decorative elements */}
      {/* 1. 3 Circle outlines */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none animate-spin-slow" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full border border-white/5 pointer-events-none animate-spin-reverse" />
      <div className="absolute top-[30%] right-[20%] w-[200px] h-[200px] rounded-full border border-primary/10 pointer-events-none animate-float" />

      {/* 2. Radial gradient glow */}
      <div className="absolute top-1/2 right-[20%] transform -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/[0.08] blur-[80px] pointer-events-none" />

      {/* 3. "gm" watermark */}
      <motion.div
        style={{ y: parallaxWatermark }}
        className="absolute right-[-20px] top-[10%] text-[350px] font-display font-bold leading-none text-white/[0.02] pointer-events-none select-none z-0"
      >
        gm
      </motion.div>

      {/* 4. Wavy SVG accent lines near bottom */}
      <div className="absolute bottom-20 left-0 w-full overflow-hidden pointer-events-none z-0 h-[100px]">
        <svg viewBox="0 0 1200 100" className="w-[200%] md:w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,50 Q300,100 600,50 T1200,50"
            fill="none"
            stroke="#e6005c"
            strokeWidth="2.5"
            opacity="0.5"
          />
          <path
            d="M0,60 Q300,110 600,60 T1200,60"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.08"
          />
        </svg>
      </div>

      {/* 5. Bottom wave clip */}
      <div className="absolute bottom-[-1px] left-0 w-full pointer-events-none z-20">
        <svg
          viewBox="0 0 1440 100"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path d="M0,100L1440,100L1440,80Q720,0 0,80Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-[1400px] mx-auto w-full h-full">
        {/* Top row */}
        <div className="flex flex-col min-[900px]:flex-row justify-between items-start gap-12 w-full mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="max-w-[420px] flex flex-col gap-6"
          >
            <p className="text-white/70 text-[14px] leading-[1.85] font-body">
              Kami membantu sekolah menghadirkan buku tahunan modern yang tidak hanya menjadi koleksi,
              tapi juga pengalaman digital interaktif yang bisa dikenang selamanya.
            </p>
            <button className="w-fit px-6 py-2 rounded-full border border-white/25 text-white text-[12px] uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_rgba(230,0,92,0.4)]">
              ABOUT US &rarr;
            </button>
          </motion.div>

          <div className="flex flex-col min-[600px]:flex-row gap-8 min-[600px]:gap-[50px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col"
            >
              {/* RESOLVED CONFLICT HERE */}
              <div className="text-white text-[28px] min-[375px]:text-[36px] min-[600px]:text-[60px] font-black leading-none font-display">
                <span ref={countRef} suppressHydrationWarning>{mounted ? "0" : "231"}</span>
              </div>
              <div className="text-white/45 text-[11px] uppercase tracking-wider mt-2 max-w-[200px]">
                Sekolah Telah Bekerjasama Dengan GM Yearbook
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="text-white text-[28px] min-[375px]:text-[36px] min-[600px]:text-[60px] font-black leading-none font-display">
                8<sup className="text-primary top-[-0.3em]">+</sup>
              </div>
              <div className="text-white/45 text-[11px] uppercase tracking-wider mt-2 max-w-[200px]">
                Tahun Mengeksplorasi Industri Creative
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 min-[900px]:mt-0 relative z-10 mb-10"
        >
          <h1 className="font-display text-[32px] min-[600px]:text-[44px] min-[900px]:text-[78px] font-extrabold italic text-white max-w-[650px] leading-[1.05]">
            Creative Digital Yearbook <span className="text-primary">#1</span> in Indonesia
          </h1>
        </motion.div>
      </div>

      {/* Right side mockup */}
      <motion.div
        style={{ y: parallaxMockup }}
        className="absolute right-[60px] top-1/2 transform -translate-y-1/2 hidden min-[1100px]:block z-20 pointer-events-none [perspective:1000px]"
      >
        <div className="relative w-[400px] h-[350px]">
          {/* Book 1 */}
          <div
            className="absolute top-0 left-0 w-[300px] h-[210px] rounded-lg shadow-[20px_20px_30px_rgba(0,0,0,0.8)] border border-white/10 flex items-center justify-center flex-col overflow-hidden"
            style={{
              transform: "rotateY(-10deg)",
              background: "linear-gradient(135deg, #111 0%, #222 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
            <BookOpen size={40} className="text-white/30 mb-4" />
            <span className="text-white/30 font-display font-bold tracking-widest uppercase">
              GM Yearbook
            </span>
          </div>
          {/* Book 2 */}
          <div
            className="absolute bottom-0 right-0 w-[240px] h-[170px] rounded-lg shadow-[15px_15px_25px_rgba(0,0,0,0.7)] border border-white/10 flex items-center justify-center flex-col overflow-hidden"
            style={{
              transform: "rotateY(-5deg) translateZ(20px)",
              background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
            <BookOpen size={30} className="text-white/30 mb-3" />
            <span className="text-white/30 font-display font-bold tracking-widest uppercase text-sm">
              GM Yearbook
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}