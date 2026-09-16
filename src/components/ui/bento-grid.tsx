import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento border-border bg-card hover:border-accent/60 row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border p-6 transition duration-200 hover:shadow-lg",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-1">
        {icon}
        <h3 className="font-heading text-foreground mt-3 mb-2 font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm text-pretty">{description}</p>
      </div>
    </div>
  );
};
