"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { productionServices } from "@/data/site-data";
import { ArrowRight } from "lucide-react";
import { ProductionServiceCard } from "@/types";

const Card = ({ data, index }: { data: ProductionServiceCard; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cardRef.current.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    cardRef.current.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="group flex flex-col gap-[16px]"
    >
      <div className="flex justify-between items-center px-1">
        <div className="flex flex-col">
          <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-primary transition-colors">{data.title}</h3>
          <span className="text-[11px] text-gray-500 uppercase tracking-wider">{data.subtitle}</span>
        </div>
        <button className="w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:bg-dark group-hover:scale-110 group-hover:-rotate-45">
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="relative group-hover:-translate-y-[6px] transition-transform duration-300 ease-out group-hover:shadow-md rounded-[14px]">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[240px] rounded-[14px] overflow-hidden cursor-pointer w-full will-change-transform"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-0 left-0 p-[24px] z-10 pointer-events-none">
            <h4 className="text-[20px] font-bold text-white leading-tight mb-1">{data.overlayTitle}</h4>
            <p className="text-[11px] text-white/70">{data.overlaySubtitle}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductionService() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-[110px] px-[50px] w-full">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-[60px] gap-6"
        >
          <h2 className="font-display text-[52px] font-[800] leading-tight text-gray-900 m-0 p-0">
            <em className="italic font-display">Production</em> Service
          </h2>
          <p className="max-w-[420px] text-gray-500 text-[14px] leading-relaxed m-0 p-0">
            Dari sesi Pemotretan, Video, Event, hingga AR experience. Setiap momen dibuat lebih hidup dan siap diabadikan dalam buku tahunan terbaik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]">
          {productionServices.map((service, index) => (
            <Card key={service.id} data={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
