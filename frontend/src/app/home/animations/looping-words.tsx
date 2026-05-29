"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface LoopingWordsProps {
  words: string[];
  className?: string;
}

export function LoopingWords({ words, className }: LoopingWordsProps) {
  const controls = useAnimationControls();
  const wordsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [selectorWidth, setSelectorWidth] = useState(0);

  // Duplicate the words array to create a seamless infinite loop
  const duplicatedWords = useMemo(() => [...words, ...words], [words]);
  const totalOriginal = words.length;

  const updateWidth = useCallback((index: number) => {
    const el = wordsRef.current[index];
    if (el) {
      setSelectorWidth(el.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (totalOriginal === 0) return;

    // Initial width setup
    updateWidth(0);

    let index = 0;
    const interval = setInterval(async () => {
      index++;
      updateWidth(index % totalOriginal);

      await controls.start({
        y: `-${(index * 100) / duplicatedWords.length}%`,
        transition: { duration: 1.2, ease: [0.175, 0.885, 0.32, 1.15] },
      });

      // If we've scrolled past the first full set, snap back to the start seamlessly
      if (index === totalOriginal) {
        index = 0;
        controls.set({ y: "0%" });
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [controls, duplicatedWords.length, totalOriginal, updateWidth]);

  return (
    <div className={`flex items-center justify-center ${className || ""}`.trim()}>
      <div 
        className="relative h-[1.5em] pt-[0.3em] px-[0.2em] text-[11vw] md:text-[6vw] leading-[0.9] font-bold uppercase whitespace-nowrap overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          maskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)"
        }}
      >
        
        {/* List of words */}
        <motion.ul
          className="flex flex-col items-center m-0 p-0 list-none"
          animate={controls}
          initial={{ y: "0%" }}
        >
          {duplicatedWords.map((word, i) => (
            <li
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="tracking-tight text-inherit"
            >
              <p className="m-0 text-primary">{word}</p>
            </li>
          ))}
        </motion.ul>

        {/* Selector Edge Boxes - Fixed custom border color */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[0.9em] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
          animate={{ width: selectorWidth }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-[0.125em] h-[0.125em] border-t-[0.035em] border-l-[0.035em] border-primary" />
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-[0.125em] h-[0.125em] border-t-[0.035em] border-r-[0.035em] border-primary" />
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-[0.125em] h-[0.125em] border-b-[0.035em] border-l-[0.035em] border-primary" />
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-[0.125em] h-[0.125em] border-b-[0.035em] border-r-[0.035em] border-primary" />
        </motion.div>
      </div>
    </div>
  );
}
