"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoStackProps {
  photos: string[];
  interval?: number;
}

export function PhotoStack({ photos, interval = 3500 }: PhotoStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [photos.length, interval]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative flex h-96 w-72 items-center justify-center md:h-[420px] md:w-80">
      <AnimatePresence>
        {photos.map((photo, index) => {
          const position =
            (index - currentIndex + photos.length) % photos.length;

          // Hanya tampilkan maksimal 3 foto
          if (position > 2) return null;

          return (
            <motion.div
              key={`${photo}-${index}`}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 20,
              }}
              animate={{
                opacity: position === 0 ? 1 : position === 1 ? 0.7 : 0.4,

                scale: position === 0 ? 1 : position === 1 ? 0.92 : 0.84,

                y: position * -18,

                rotate: position === 0 ? 0 : position === 1 ? -4 : 4,

                zIndex: photos.length - position,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                x: -100,
              }}
              transition={{
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800/80 p-2.5 shadow-2xl backdrop-blur-md dark:bg-slate-900/80"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-700">
                <img
                  src={photo}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
