import { useStrings } from "@/shared/i18n";
import { site } from "../../data";
import { strings } from "../../strings";

interface FooterProps {
  className?: string;
}

const currentYear = new Date().getFullYear();

const styles = {
  footer: "flex flex-col items-center gap-2 text-center",
  lead: "text-small text-navy",
  emphasis: "font-bold text-brand",
  copyright: "text-caption whitespace-nowrap text-navy/80",
} as const;

export function Footer({ className }: FooterProps) {
  const s = useStrings(strings);

  return (
    <footer className={`${styles.footer} ${className ?? ""}`}>
      <p className={styles.lead}>
        {s.footer.lead}{" "}
        <span className={styles.emphasis}>{s.footer.emphasis}</span>
      </p>
      <p dir="ltr" className={styles.copyright}>
        {`© ${currentYear} ${site.brandName}`}
      </p>
    </footer>
  );
}
