interface HeaderProps {
  brandName: string;
  logoSrc: string;
  taglineLead: string;
  taglineEmphasis: string;
}

const styles = {
  header: "flex flex-col items-center text-center",
  logo: "w-[clamp(10.5rem,50vw,13rem)]",
  tagline: "mt-5 max-w-72 text-body text-navy",
  emphasis: "font-bold text-brand",
};

export function Header({
  brandName,
  logoSrc,
  taglineLead,
  taglineEmphasis,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>
        <img
          src={logoSrc}
          alt={brandName}
          width={462}
          height={447}
          fetchPriority="high"
          decoding="async"
          className={styles.logo}
        />
      </h1>
      <p className={styles.tagline}>
        {taglineLead} <span className={styles.emphasis}>{taglineEmphasis}</span>
      </p>
    </header>
  );
}
