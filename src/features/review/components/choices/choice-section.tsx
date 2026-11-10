import { useStrings } from "@/shared/i18n";
import { ChoiceCard } from "./choice-card";
import { strings } from "../../strings";

interface ChoiceSectionProps {
  onOpenGoogleReview: () => void;
  onChooseNote: () => void;
}

const styles = {
  section: "flex flex-col gap-3 pb-4 animate-reveal-in",
};

export function ChoiceSection({
  onOpenGoogleReview,
  onChooseNote,
}: ChoiceSectionProps) {
  const s = useStrings(strings);

  return (
    <section className={styles.section}>
      <ChoiceCard
        icon="star"
        title={s.choices.google.title}
        hint={s.choices.google.hint}
        onPress={onOpenGoogleReview}
      />

      <ChoiceCard
        icon="chat"
        title={s.choices.note.title}
        hint={s.choices.note.hint}
        onPress={onChooseNote}
      />
    </section>
  );
}
