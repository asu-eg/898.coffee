import type { Locale } from "@/shared/i18n";

type PriceSize = "caption" | "small" | "body" | "heading";

interface PriceProps {
  value: number;
  currency: string;
  locale: Locale;
  regularValue?: number | null;
  size?: PriceSize;
  className?: string;
}

const styles = {
  root: "inline-flex flex-wrap items-baseline gap-x-1.5",
  current: "tabular-nums font-bold",
  regular: "tabular-nums font-medium text-taupe line-through",
} as const;

const sizeClasses: Record<PriceSize, string> = {
  caption: "text-caption",
  small: "text-small",
  body: "text-body",
  heading: "text-heading",
} as const;

function formatPrice(value: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function Price({
  value,
  currency,
  locale,
  regularValue,
  size = "small",
  className,
}: PriceProps) {
  const currentPrice = formatPrice(value, currency, locale);
  const regularPrice =
    regularValue != null && regularValue > value
      ? formatPrice(regularValue, currency, locale)
      : null;

  return (
    <span className={[styles.root, className].filter(Boolean).join(" ")}>
      <bdi className={[sizeClasses[size], styles.current].join(" ")}>
        {currentPrice}
      </bdi>

      {regularPrice !== null && (
        <bdi className={[sizeClasses.caption, styles.regular].join(" ")}>
          {regularPrice}
        </bdi>
      )}
    </span>
  );
}
