import { useStrings } from "@/shared/i18n";
import { ROUTES } from "@/shared/router";
import { ActionCard } from "../ui/action-card";
import { strings } from "../../strings";

const styles = {
  group: "flex flex-col gap-3",
} as const;

export function PrimaryNavSection() {
  const s = useStrings(strings);

  return (
    <div className={styles.group}>
      <ActionCard
        to={ROUTES.menu}
        icon="cup"
        title={s.sections.primary.menuTitle}
        hint={s.sections.primary.menuHint}
        tone="featured"
      />
      <ActionCard
        to={ROUTES.review}
        icon="star"
        title={s.sections.primary.reviewTitle}
        hint={s.sections.primary.reviewHint}
      />
    </div>
  );
}
