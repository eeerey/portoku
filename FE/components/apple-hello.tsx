"use client";

import { motion } from "framer-motion";

export function AppleHello() {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        className="w-64 h-32 md:w-96 md:h-48 text-gray-900 dark:text-white"
        viewBox="0 0 500 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Teks "hello" bergaya stroke tangan */}
        <motion.path
          d="M40 100 C 40 20, 70 20, 70 100 C 70 160, 40 160, 40 100 M70 100 L120 100 M120 60 L120 140 C120 160, 150 160, 150 140 M170 100 C170 60, 200 60, 200 100 M210 100 C210 60, 240 60, 240 100 M250 100 C250 60, 290 60, 290 100 C290 140, 250 140, 250 100"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
        />
      </svg>
    </div>
  );
}
