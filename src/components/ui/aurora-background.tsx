"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "transition-bg relative flex flex-col items-center justify-center bg-navy text-navy-foreground",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg,var(--primary)_5%,var(--secondary)_15%,var(--accent)_25%,var(--highlight)_32%,var(--primary)_45%)",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "motion-safe:animate-aurora pointer-events-none absolute -inset-[20%] [background-image:var(--aurora)] [background-size:200%_200%] [background-position:50%_50%] opacity-45 blur-[70px] will-change-[background-position]",
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_20%,black_25%,transparent_75%)]`,
          )}
        ></div>
        <div
          className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_70%_10%,color-mix(in_oklch,var(--highlight)_22%,transparent),transparent_55%)]"
          aria-hidden="true"
        ></div>
      </div>
      {children}
    </div>
  );
};
