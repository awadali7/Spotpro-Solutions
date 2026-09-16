import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-accent-ink text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-h2 text-foreground mt-2 font-semibold text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 text-lg text-pretty">{description}</p>
      )}
    </div>
  );
}
