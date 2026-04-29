"use client";

import { useState, useEffect } from "react";

const sessionTypes = [
  "Individual Studio",
  "Group Studio Set",
  "Individual Outdoor",
  "Group Outdoor",
];

export default function PhotoSession() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sessionTypes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const activeSession = sessionTypes[activeIndex];
  const firstWord = activeSession.split(" ")[0];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
      {/* LEFT COLUMN */}
      <div className="flex flex-col justify-center">
        <h2 className="font-serif text-4xl sm:text-6xl font-extrabold mb-4">
          <span className="italic">Photo</span> Session
        </h2>
        <p className="text-sm text-gray-500 max-w-md mb-8">
          Dari foto formal hingga konsep kreatif, semua dirancang agar setiap kenangan tampil menawan di buku tahunan.
        </p>

        <ul
          className="flex flex-col gap-4"
          onMouseLeave={() => setIsHovering(false)}
        >
          {sessionTypes.map((session, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={session}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsHovering(true);
                }}
                className={`text-2xl sm:text-3xl font-extrabold cursor-pointer transition-all duration-300 hover:text-[#e6005c] hover:pl-3 ${
                  isActive ? "text-gray-900" : "text-gray-300"
                }`}
              >
                {session}
              </li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full aspect-[4/5] max-h-[520px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[28px] overflow-hidden relative flex items-center justify-center">
        {/* Small tag pill */}
        <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-xs font-semibold">
          {activeSession}
        </div>

        {/* Large centered text */}
        <div className="text-8xl font-black text-white/5 uppercase text-center break-words px-4">
          {firstWord}
        </div>
      </div>
    </section>
  );
}
