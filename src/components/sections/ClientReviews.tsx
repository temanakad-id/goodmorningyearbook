"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    quote:
      "Good Morning Yearbook benar-benar membuat buku tahunan kami terasa istimewa. Desainnya kreatif, prosesnya profesional. Sangat recommended!",
    author: "Siti Marwah",
    initials: "SM",
    role: "Kepala Sekolah, SMAN 1 Salatiga",
    rotation: -2,
    translateY: 0,
  },
  {
    quote:
      "Kemampuan tim GM dalam menciptakan pengalaman digital yang interaktif sangat luar biasa. Siswa-siswa sangat antusias dengan hasilnya!",
    author: "Budi Kurniawan",
    initials: "BK",
    role: "Waka Kesiswaan, SMA 5 Semarang",
    rotation: 1,
    translateY: -15,
  },
  {
    quote:
      "Tim GM Yearbook benar-benar mengangkat kenangan angkatan kami melalui visual yang memukau. 10/10 untuk kualitasnya!",
    author: "Rina Andayani",
    initials: "RA",
    role: "Ketua OSIS, SMA 3 Solo",
    rotation: -0.5,
    translateY: 10,
  },
  {
    quote:
      "Proses kerjanya transparan dan hasilnya melampaui ekspektasi. Film angkatan yang dibuat juga sangat sinematik dan emosional!",
    author: "Deni Wicaksono",
    initials: "DW",
    role: "Guru BK, SMA Prestige Yogyakarta",
    rotation: 1.5,
    translateY: 0,
  },
];

export default function ClientReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: { isMobile: boolean; rotation: number; translateY: number }) => ({
      opacity: 1,
      y: custom.isMobile ? 0 : custom.translateY,
      rotate: custom.isMobile ? 0 : custom.rotation,
      transition: { duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-[50px] py-[110px]">
      {/* Radial Gradient Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle at top, rgba(230,0,92,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="mb-6 font-display text-[52px] text-white">
          <span className="italic">Client&apos;s</span> Reviews
        </h2>

        <div
          className="mb-[50px] inline-flex items-center gap-2 rounded-[50px] px-6 py-2"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="text-[13px] text-[#ffd700]">★★★★★</span>
          <span className="text-[13px] text-white/75">
            4.9/5 — Based on Client Satisfaction Survey
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex w-full flex-wrap justify-center gap-[20px] max-[900px]:flex-col max-[900px]:items-center"
        >
          {REVIEWS.map((review, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={{ isMobile, rotation: review.rotation, translateY: review.translateY }}
                className={`group relative flex w-full max-w-[280px] flex-col rounded-[20px] border p-[30px] transition-colors duration-500 max-[900px]:max-w-full ${
                  isActive
                    ? "border-[rgba(230,0,92,0.4)] bg-[rgba(255,255,255,0.1)]"
                    : "border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.05)]"
                }`}
                style={{ backdropFilter: "blur(10px)" }}
                whileHover={
                  !isMobile
                    ? {
                        rotate: 0,
                        y: -12,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(230, 0, 92, 0.3)",
                      }
                    : {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(230, 0, 92, 0.3)",
                      }
                }
              >
                <p className="mb-6 text-left text-[14px] leading-[1.7] text-white opacity-85">
                  &quot;{review.quote}&quot;
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-white">
                    {review.initials}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-semibold text-white">
                      {review.author}
                    </span>
                    <span className="text-[11px] text-white opacity-45">
                      {review.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
