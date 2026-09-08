"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Halo", "Welcome", "Bonjour", "Selamat Datang", "Hola"];

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) return;

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 1800);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 1;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        delay: 10,
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-between overflow-hidden bg-[#f3f1ea] px-8 py-12 text-[#1c1d1a] dark:bg-[#12141a] dark:text-[#eeece5]"
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,500&family=Manrope:wght@500;600&display=swap");
        .font-display {
          font-family: "Newsreader", Georgia, serif;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-80 w-80 rounded-full bg-[#c9a15c]/15 blur-[100px]"
        />
      </div>

      <div className="z-10 flex w-full justify-between text-xs font-medium tracking-wide text-[#5c5d56] dark:text-[#a3a7b3]">
        <span>Portfolio</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.5 }}
            className="font-display italic text-4xl font-medium md:text-6xl"
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 h-px w-48 overflow-hidden rounded-full bg-[#ddd9cd] dark:bg-[#2b2f3a]">
          <motion.div
            className="h-full bg-[#a8783a] dark:bg-[#c9a15c]"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="z-10 font-display text-3xl font-medium">{progress}%</div>
    </motion.div>
  );
}
