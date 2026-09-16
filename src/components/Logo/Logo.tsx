import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "../../../public/spotpro-logo.png";

/**
 * The supplied artwork knocks out "SPOTPRO" and the emblem pattern to
 * transparency, so it is drawn for light backgrounds. On the dark footer it is
 * sat on a light plate (`onDark`) rather than letting those knockouts fill with
 * navy, which inverts the intended design.
 */
const sizes = {
  md: "h-10",
  lg: "h-12",
} as const;

export function Logo({
  className,
  onDark = false,
  priority = false,
  size = "md",
}: {
  className?: string;
  onDark?: boolean;
  priority?: boolean;
  size?: keyof typeof sizes;
}) {
  return (
    <Link
      href="/"
      aria-label="SpotPro Solutions — home"
      className={cn(
        "focus-visible:ring-ring inline-flex items-center rounded-md focus-visible:ring-2 focus-visible:outline-none",
        onDark && "bg-white/95 px-3 py-2",
        className,
      )}
    >
      <Image
        src={logo}
        alt="SpotPro Solutions"
        priority={priority}
        className={cn(sizes[size], "w-auto")}
        sizes="160px"
      />
    </Link>
  );
}
