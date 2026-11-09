interface FooterProps {
  lead: string;
  emphasis: string;
  brandName: string;
}

const currentYear = new Date().getFullYear();

const styles = {
  footer: "flex flex-col items-center gap-2 text-center",
  lead: "text-small text-navy",
  emphasis: "font-bold text-brand",
  copyright: "text-caption whitespace-nowrap text-navy/80",
};

export function Footer({ lead, emphasis, brandName }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.lead}>
        {lead} <span className={styles.emphasis}>{emphasis}</span>
      </p>

      <p dir="ltr" className={styles.copyright}>
        {`© ${currentYear} ${brandName}`}
      </p>
    </footer>
  );
}
