import { Icon } from "@/shared/icons";

type ChevronSize = "sm" | "md" | "lg";

interface ChevronProps {
  size?: ChevronSize;
  className?: string;
}

const styles = {
  base: "flex shrink-0 items-center justify-center rounded-full bg-arctic text-brand",
  sizes: {
    sm: "size-6",
    md: "size-7",
    lg: "size-8",
  },
  iconSizes: {
    sm: 12,
    md: 14,
    lg: 16,
  },
} as const;

export function Chevron({ size = "md", className }: ChevronProps) {
  return (
    <span
      aria-hidden="true"
      className={[styles.base, styles.sizes[size], className]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon name="arrow" size={styles.iconSizes[size]} />
    </span>
  );
}
