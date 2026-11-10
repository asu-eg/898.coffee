import { useStrings } from "@/shared/i18n";
import { site } from "../../data";
import { strings } from "../../strings";
import { ActionCard } from "../ui/action-card";
import { SectionTitle } from "../ui/section-title";

const styles = {
  section: "flex flex-col gap-3",
} as const;

export function SocialNavSection() {
  const s = useStrings(strings);

  return (
    <section className={styles.section}>
      <SectionTitle>{s.sections.social.title}</SectionTitle>
      <ActionCard
        href={site.instagram.url}
        newTabLabel={s.nav.newTab}
        icon="instagram"
        title={site.instagram.name}
        hint={site.instagram.handle}
        tone="social"
      />
    </section>
  );
}
