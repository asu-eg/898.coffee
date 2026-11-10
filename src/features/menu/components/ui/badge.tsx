import { Icon } from "@/shared/icons";

type BadgeVariant = "new" | "top" | "out_of_stock";

interface BadgeProps {
  kind: BadgeVariant;
  label: string;
  compact?: boolean;
  className?: string;
}

const styles = {
  base: "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full text-caption font-semibold ring-1",
  regular: "min-h-6",
  compact: "min-h-5",
  star: "size-3",
} as const;

const variantStyles: Record<
  BadgeVariant,
  { badge: string; paddingDefault: string; paddingCompact: string }
> = {
  new: {
    badge: "bg-brand text-white ring-white/30",
    paddingDefault: "px-3",
    paddingCompact: "px-2",
  },
  top: {
    badge: "bg-sand text-charcoal ring-white/30",
    paddingDefault: "ps-2 pe-3",
    paddingCompact: "ps-1 pe-2",
  },
  out_of_stock: {
    badge: "bg-cream text-navy ring-navy/30",
    paddingDefault: "px-3",
    paddingCompact: "px-2",
  },
} as const;

export function Badge({ kind, label, compact = false, className }: BadgeProps) {
  const { badge, paddingDefault, paddingCompact } = variantStyles[kind];
  const padding = compact ? paddingCompact : paddingDefault;
  const height = compact ? styles.compact : styles.regular;
  const hasStar = kind === "top";

  return (
    <span
      className={[styles.base, height, padding, badge, className]
        .filter(Boolean)
        .join(" ")}
    >
      {hasStar && (
        <Icon name="star" className={styles.star} />
      )}
      {label}
    </span>
  );
}
