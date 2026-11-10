import logo from "@/assets/mark.svg";
import { useStrings } from "@/shared/i18n";
import { site } from "../../data";
import { strings } from "../../strings";

interface HeaderProps {
  className?: string;
}

const styles = {
  header: "flex flex-col items-center text-center",
  logo: "w-[clamp(10.5rem,50vw,13rem)]",
  tagline: "mt-5 max-w-72 text-body text-navy",
  emphasis: "font-bold text-brand",
} as const;

export function Header({ className }: HeaderProps) {
  const s = useStrings(strings);

  return (
    <header className={`${styles.header} ${className ?? ""}`}>
      <h1>
        <img
          src={logo}
          alt={site.brandName}
          width={462}
          height={447}
          fetchPriority="high"
          decoding="async"
          className={styles.logo}
        />
      </h1>
      <p className={styles.tagline}>
        {s.header.taglineLead}{" "}
        <span className={styles.emphasis}>{s.header.taglineEmphasis}</span>
      </p>
    </header>
  );
}
