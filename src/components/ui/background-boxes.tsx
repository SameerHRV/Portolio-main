"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = 30; // number of rows
  const cols = 30; // number of columns

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

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Defer random animation delays to client to avoid SSR mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      {...rest}
    >
      <div className="flex flex-wrap">
        {Array.from({ length: rows * cols }).map((_, i) => (
          <motion.div
            key={i}
            className="w-16 h-16 border border-slate-700/30 bg-slate-800/20"
            whileHover={{
              backgroundColor: getRandomColor(),
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              transition: {
                duration: 3,
                repeat: Infinity,
                // fixed delay during SSR; randomize after mount
                delay: mounted ? Math.random() * 2 : 0,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
