interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const styles = {
  root: "flex flex-col gap-1",
  title: "text-heading font-bold text-charcoal text-balance",
  subtitle: "text-caption font-medium text-taupe text-pretty",
} as const;

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
