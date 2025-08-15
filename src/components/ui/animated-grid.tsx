"use client";
import React from "react";
import { motion } from "framer-motion";

export function AnimatedGrid() {
  const colors = [
    "#60a5fa", // blue-400
    "#a78bfa", // violet-400
    "#f472b6", // pink-400
    "#34d399", // emerald-400
    "#fbbf24", // amber-400
    "#fb7185", // rose-400
    "#818cf8", // indigo-400
    "#38bdf8", // sky-400
    "#a855f7", // purple-500
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // Avoid SSR/client mismatch by generating random particles after mount
  const [particles, setParticles] = React.useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  React.useEffect(() => {
    const list = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          whileHover={{
            backgroundColor: getRandomColor(),
            scale: 2,
            opacity: 1,
          }}
        />
      ))}

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-slate-400/20" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b border-slate-400/20" />
          ))}
        </div>
      </div>
    </div>
  );
}
