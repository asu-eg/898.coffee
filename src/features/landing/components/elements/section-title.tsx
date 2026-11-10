import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const styles = {
  title: "px-1 text-small font-bold text-charcoal",
} as const;

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={`${styles.title} ${className ?? ""}`}>
      {children}
    </h2>
  );
}
