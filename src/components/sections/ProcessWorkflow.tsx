"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Palette, Camera, Sparkles } from 'lucide-react';

const processCards = [
  {
    icon: Handshake,
    title: "Konsultasi & Kontrak",
    desc: "Diskusi kebutuhan sekolah, penyesuaian paket, dan penandatanganan kontrak kerjasama.",
  },
  {
    icon: Palette,
    title: "Konsep & Desain",
    desc: "Tim kreatif merancang konsep buku tahunan, tema foto, dan layout desain sesuai identitas sekolah.",
  },
  {
    icon: Camera,
    title: "Sesi Foto, Video & Event",
    desc: "Pelaksanaan sesi foto dan video profesional, termasuk dokumentasi kegiatan sekolah hingga event khusus.",
  },
  {
    icon: Sparkles,
    title: "Editing & Design Layout",
    desc: "Tim GM Yearbook melakukan proses editing foto/video serta menyusun desain layout sesuai konsep yang disepakati.",
  }
];

export default function ProcessWorkflow() {
  return (
    <section className="bg-[#f8f8f8] py-[110px] px-[50px]">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-[60px] gap-6 lg:gap-0">
          <h2 className="font-display text-[52px] leading-tight text-dark">
            <em className="italic">Process</em> Workflow
          </h2>

          <div className="max-w-[420px] flex flex-col gap-5 items-start lg:items-end text-left lg:text-right">
            <p className="text-[14px] text-gray-500 leading-[1.85]">
              Workflow kami jelas dan transparan. Semua progress bisa dipantau sekolah secara real time. Proses mudah, hasil maksimal.
            </p>
            <button className="border-2 border-dark rounded-full py-3 px-6 text-[12px] font-bold uppercase transition-colors duration-300 hover:bg-dark hover:text-white">
              START PROJECT &rarr;
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {processCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-white rounded-[20px] pt-[32px] px-[26px] pb-[32px] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="w-[52px] h-[52px] rounded-full bg-primary flex items-center justify-center mb-[22px]">
                <card.icon className="w-[20px] h-[20px] text-white" />
              </div>

              {/* Content */}
              <h4 className="text-[15px] font-bold mb-[10px] text-dark">
                {card.title}
              </h4>
              <p className="text-[13px] text-gray-500 leading-[1.7] relative z-10">
                {card.desc}
              </p>

              {/* Step Number */}
              <div className="absolute bottom-[14px] right-[20px] text-[56px] font-[900] text-[rgba(0,0,0,0.03)] group-hover:text-[rgba(230,0,92,0.08)] group-hover:scale-110 transition-all duration-[400ms] select-none z-0">
                {String(index + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
