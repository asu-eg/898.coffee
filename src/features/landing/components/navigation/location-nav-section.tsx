import { useStrings } from "@/shared/i18n";
import { site } from "../../data";
import { strings } from "../../strings";
import { ActionCard } from "../ui/action-card";
import { SectionTitle } from "../ui/section-title";

const styles = {
  section: "flex flex-col gap-3",
} as const;

export function LocationNavSection() {
  const s = useStrings(strings);

  return (
    <section className={styles.section}>
      <SectionTitle>{s.sections.location.title}</SectionTitle>
      <ActionCard
        href={site.location.mapsUrl}
        newTabLabel={s.nav.newTab}
        icon="pin"
        title={s.sections.location.locationName}
      />
    </section>
  );
}
