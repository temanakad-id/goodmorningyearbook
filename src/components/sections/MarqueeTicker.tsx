import React from 'react';

const ROW1_ITEMS = [
  "CREATIVE DIGITAL YEARBOOK",
  "CREATIVE DIGITAL YEARBOOK",
  "FLEXIBLE PRICE",
  "TRUSTED"
];

const ROW2_ITEMS = [
  "CREATING MEMORIES SINCE 2017",
  "IT'S YOUR LEGACY",
  "MORE THAN MEMORIES",
  "GOOD MORNING YEARBOOK"
];

export function MarqueeTicker() {
  return (
    <div className="overflow-hidden w-full flex flex-col">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          will-change: transform;
        }

        .marquee-track.left {
          animation: marqueeLeft 25s linear infinite;
        }

        .marquee-track.right {
          animation: marqueeRight 30s linear infinite;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          padding: 0 20px;
          font-size: 16px;
          font-weight: 800;
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
          white-space: nowrap;
        }

        .dot-white {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: white;
        }

        .dot-primary {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #e6005c;
        }
      `}</style>

      {/* Row 1 */}
      <div className="bg-primary py-[16px]">
        <div className="marquee-track left">
          {[...ROW1_ITEMS, ...ROW1_ITEMS].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span>{item}</span>
              <span className="dot-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="bg-dark py-[14px]">
        <div className="marquee-track right">
          {[...ROW2_ITEMS, ...ROW2_ITEMS].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span>{item}</span>
              <span className="dot-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarqueeTicker;
