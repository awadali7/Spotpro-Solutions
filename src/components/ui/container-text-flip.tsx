"use client";

import React, { useState, useEffect } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

/**
 * Local rewrite of Aceternity's container-text-flip.
 *
 * Upstream animates an explicit pixel `width` on an `inline-block`, measured
 * from the text's unconstrained `scrollWidth`. Inside a centred, wrapping,
 * fluid-type `h1` that forces the span wider than the line box, so long
 * phrases overflowed the viewport and left a gap before the following words.
 *
 * The width animation is gone. The phrase is plain inline content that wraps
 * with the sentence at any viewport; the per-letter blur/fade reveal — the
 * part you actually see — is unchanged.
 */
export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  const word = words[currentWordIndex];

  return (
    <span className={cn("hyphens-none", className)}>
      <motion.span key={word} className={cn(textClassName)}>
        {word.split(" ").map((chunk, chunkIndex, chunks) => {
          // Letters are separate inline boxes, and a space held inside one of
          // them gives the browser no break opportunity — the phrase then runs
          // off a narrow viewport. Words are kept whole and separated by real
          // text nodes so the phrase wraps like ordinary prose.
          const offset = chunks
            .slice(0, chunkIndex)
            .reduce((n, c) => n + c.length, 0);

          return (
            <React.Fragment key={chunkIndex}>
              {chunkIndex > 0 ? " " : null}
              <span className="inline-block whitespace-nowrap">
                {chunk.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: animationDuration / 1000,
                      ease: "easeInOut",
                      delay: (offset + index) * 0.02,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </React.Fragment>
          );
        })}
      </motion.span>
    </span>
  );
}
