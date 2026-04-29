"use client";

import { motion } from "framer-motion";

const partners = [
  "EduPrime",
  "SchoolHub",
  "LearnTech",
  "BrightEdu",
  "PixelArts",
  "MediaCo",
  "Creativa",
  "ODA Group",
];

export function PartnersSection() {
  return (
    <section className="bg-white py-[100px] px-[50px] text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-[11px] uppercase tracking-[4px] text-gray-500 font-medium mb-[45px]">
          PARTNERED WITH 150+ SCHOOLS & BRANDS
        </h2>

        <div className="flex flex-wrap justify-center max-w-[900px] mx-auto gap-y-[16px] gap-x-[40px]">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center gap-[16px]">
              <span className="text-[24px] min-[900px]:text-[32px] font-[800] text-dark">
                {partner}
              </span>
              <div className="w-[8px] h-[8px] rounded-full bg-primary flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
