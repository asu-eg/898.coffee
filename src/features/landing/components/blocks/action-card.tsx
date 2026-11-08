import { Icon, type IconName } from "@/shared/icons";
import { Link, type AppRoute } from "@/shared/router";

type Tone = "standard" | "featured" | "social";

interface BaseCardProps {
  icon: IconName;
  title: string;
  hint?: string;
  tone?: Tone;
}

interface InternalCardProps extends BaseCardProps {
  to: AppRoute;
}

interface ExternalCardProps extends BaseCardProps {
  href: string;
  newTabLabel: string;
}

type ActionCardProps = InternalCardProps | ExternalCardProps;

const lightCard =
  "border-white/50 bg-white/80 text-navy hover:bg-white hover:border-brand";
const lightArrow = "text-navy/40 group-hover:text-brand";

const tones: Record<Tone, { card: string; bubble: string; arrow: string }> = {
  standard: {
    card: lightCard,
    bubble: "bg-arctic/60 text-brand group-hover:bg-arctic",
    arrow: lightArrow,
  },
  featured: {
    card: "border-transparent bg-brand text-white hover:border-arctic",
    bubble: "bg-white text-brand",
    arrow: "text-white/80 group-hover:text-white/100",
  },
  social: {
    card: lightCard,
    bubble: "bg-brand text-white",
    arrow: lightArrow,
  },
};

const styles = {
  card: "group flex min-h-16 w-full items-center gap-4 rounded-lg border px-4 py-3 outline-none transition duration-interactive ease-smooth focus-visible:ring-2 focus-visible:ring-brand active:scale-95 motion-reduce:transition-none",
  bubble:
    "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-interactive ease-smooth motion-reduce:transition-none",
  text: "flex min-w-0 flex-1 flex-col",
  title: "text-heading font-bold",
  hint: "text-small opacity-80",
  arrow:
    "size-5 shrink-0 transition-transform duration-interactive ease-smooth group-hover:translate-x-1 rtl:group-hover:-translate-x-1 motion-reduce:transition-none",
  srOnly: "sr-only",
};

export function ActionCard(props: ActionCardProps) {
  const { icon, title, hint, tone = "standard" } = props;
  const look = tones[tone];

  const content = (
    <>
      <span className={`${styles.bubble} ${look.bubble}`}>
        <Icon name={icon} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </span>
      <Icon name="arrow" className={`${styles.arrow} ${look.arrow}`} />
    </>
  );

  return "to" in props ? (
    <Link href={props.to} className={`${styles.card} ${look.card}`}>
      {content}
    </Link>
  ) : (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${look.card}`}
    >
      {content}
      <span className={styles.srOnly}>{props.newTabLabel}</span>
    </a>
  );
}
