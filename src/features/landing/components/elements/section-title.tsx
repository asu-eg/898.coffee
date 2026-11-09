import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

const styles = {
  title: "px-1 text-small font-bold text-charcoal",
};

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className={styles.title}>
      {children}
    </h2>
  );
}
