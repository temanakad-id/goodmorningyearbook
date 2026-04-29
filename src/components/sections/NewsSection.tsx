"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { School, GraduationCap, Star } from 'lucide-react';

const articles = [
  {
    id: 1,
    gradient: "linear-gradient(135deg, #e6005c, #ff4081)",
    icon: School,
    schoolName: "SMA Negeri 1 Salatiga",
    title: "SMA Negeri 1 Salatiga — Yearbook 2026",
    desc: "Kolaborasi spektakuler dengan salah satu sekolah terbaik di Jawa Tengah.",
    date: "March 2026"
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    icon: GraduationCap,
    schoolName: "SMA Al-Azhar Semarang",
    title: "SMA Al-Azhar Semarang — Yearbook 2026",
    desc: "Konsep yearbook modern dengan sentuhan tradisional Jawa yang elegan.",
    date: "February 2026"
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    icon: Star,
    schoolName: "SMA Prestige Solo",
    title: "SMA Prestige Solo — Yearbook 2026",
    desc: "Yearbook premium lengkap dengan AR experience dan exclusive packaging.",
    date: "January 2026"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function NewsSection() {
  return (
    <section className="bg-[#f8f8f8] py-[110px] px-[50px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-[50px]">
          <h2 className="text-[50px] font-black text-dark">News</h2>
          <button className="border-2 border-dark rounded-full px-6 py-2.5 text-[12px] font-bold tracking-wider transition-colors duration-300 hover:bg-dark hover:text-white">
            ALL ARTICLES →
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-[28px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <motion.div
                key={article.id}
                variants={cardVariants}
                className="bg-white rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-[8px] hover:shadow-2xl flex flex-col"
              >
                <div
                  className="h-[200px] relative flex flex-col items-center justify-center p-6"
                  style={{ background: article.gradient }}
                >
                  <Icon size={36} className="text-white/40 mb-3" />
                  <span className="text-white font-bold text-center text-lg">{article.schoolName}</span>
                </div>
                <div className="p-[24px] flex flex-col flex-grow">
                  <span className="text-primary text-[12px] font-semibold mb-3">{article.date}</span>
                  <h3 className="text-[16px] font-bold mb-2 text-dark">{article.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{article.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
