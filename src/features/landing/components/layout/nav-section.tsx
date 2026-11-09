import type { ComponentProps } from "react";
import { ActionCard } from "../elements/action-card";
import { SectionTitle } from "../elements/section-title";

type NavCard = ComponentProps<typeof ActionCard>;

interface NavSectionProps {
  title?: string;
  cards: readonly NavCard[];
}

const styles = {
  group: "flex flex-col gap-3",
  cards: "flex flex-col gap-3",
};

function getCardKey(card: NavCard) {
  return "to" in card ? `route:${card.to}` : `url:${card.href}`;
}

export function NavSection({ title, cards }: NavSectionProps) {
  const content = (
    <>
      {title && <SectionTitle>{title}</SectionTitle>}

      <div className={styles.cards}>
        {cards.map((card) => (
          <ActionCard key={getCardKey(card)} {...card} />
        ))}
      </div>
    </>
  );

  return title ? (
    <section className={styles.group}>{content}</section>
  ) : (
    <div className={styles.group}>{content}</div>
  );
}
