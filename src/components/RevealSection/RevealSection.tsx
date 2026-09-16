import { cn } from "@/lib/utils";

export function RevealSection({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  return (
    <Tag className={cn("reveal-on-scroll", className)}>{children}</Tag>
  );
}
