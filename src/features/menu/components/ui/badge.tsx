import { Icon } from "@/shared/icons";

type BadgeKind = "new" | "top" | "out_of_stock";

interface BadgeProps {
  kind: BadgeKind;
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

const variants: Record<
  BadgeKind,
  { surface: string; regularPadding: string; compactPadding: string }
> = {
  new: {
    surface: "bg-brand text-white ring-white/30",
    regularPadding: "px-3",
    compactPadding: "px-2",
  },
  top: {
    surface: "bg-sand text-charcoal ring-white/30",
    regularPadding: "ps-2 pe-3",
    compactPadding: "ps-1 pe-2",
  },
  out_of_stock: {
    surface: "bg-cream text-navy ring-navy/30",
    regularPadding: "px-3",
    compactPadding: "px-2",
  },
} as const;

export function Badge({
  kind,
  label,
  compact = false,
  className,
}: BadgeProps) {
  const variant = variants[kind];

  return (
    <span
      className={[
        styles.base,
        compact ? styles.compact : styles.regular,
        compact ? variant.compactPadding : variant.regularPadding,
        variant.surface,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {kind === "top" && <Icon name="star" className={styles.star} />}
      {label}
    </span>
  );
}
