import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Variant = "highlight" | "typewriter";

/**
 * A paragraph that reveals itself as it scrolls through the viewport.
 *
 * - `highlight` dims whole words and fades them up in sequence.
 * - `typewriter` snaps individual characters in with `steps(1)`, so the text
 *   types itself out as you scroll.
 *
 * Pure CSS (`animation-timeline: view()`), so this stays a Server Component and
 * ships no JavaScript — the stagger comes from `--i` / `--n` custom properties
 * driving each unit's `animation-range` (see `globals.css`).
 *
 * Characters are grouped into whole words, and words are separated by real text
 * nodes rather than spaces held inside spans: an inline box containing only a
 * space gives the browser no line-break opportunity, and the paragraph would
 * overflow narrow viewports.
 *
 * Unrevealed characters are `opacity: 0` but still occupy their space, so the
 * paragraph's height never changes and nothing below it reflows.
 */
export function ScrollHighlightText({
  text,
  variant = "highlight",
  className,
}: {
  text: string;
  variant?: Variant;
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);

  if (variant === "highlight") {
    return (
      <p className={cn("scroll-highlight text-pretty", className)}>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            {index > 0 ? " " : null}
            <span
              style={{ "--i": index, "--n": words.length } as React.CSSProperties}
            >
              {word}
            </span>
          </Fragment>
        ))}
      </p>
    );
  }

  const totalChars = words.reduce((n, word) => n + word.length, 0);
  // Global character index each word starts at, so the stagger runs across the
  // whole sentence rather than restarting per word. Computed up front: mutating
  // a counter inside the render map trips react-hooks/immutability.
  const wordOffsets = words.reduce<number[]>((acc, word, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + words[index - 1].length);
    return acc;
  }, []);

  return (
    <p className={cn("scroll-typewriter text-pretty", className)}>
      {words.map((word, wordIndex) => {
        const offset = wordOffsets[wordIndex];

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            {wordIndex > 0 ? " " : null}
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="tw-char"
                  style={
                    {
                      "--i": offset + charIndex,
                      "--n": totalChars,
                    } as React.CSSProperties
                  }
                >
                  {char}
                </span>
              ))}
            </span>
          </Fragment>
        );
      })}
    </p>
  );
}
