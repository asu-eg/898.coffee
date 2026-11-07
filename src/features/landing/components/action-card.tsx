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

const tones: Record<Tone, { card: string; bubble: string }> = {
  standard: {
    card: "bg-white text-navy",
    bubble: "bg-arctic text-navy",
  },
  featured: {
    card: "bg-brand text-white",
    bubble: "bg-white text-brand",
  },
  social: {
    card: "bg-white text-navy",
    bubble: "bg-brand text-white",
  },
};

const styles = {
  card: "group flex min-h-16 w-full items-center gap-4 rounded-lg px-4 py-3 transition-colors duration-200 ease-smooth active:scale-[0.98] motion-reduce:transition-none",
  bubble: "flex size-11 shrink-0 items-center justify-center rounded-full",
  text: "flex min-w-0 flex-1 flex-col",
  title: "text-heading font-bold text-balance",
  hint: "text-small opacity-80",
  arrow:
    "size-5 shrink-0 opacity-80 transition duration-200 ease-smooth group-hover:translate-x-1 group-hover:opacity-100 rtl:group-hover:-translate-x-1",
};

export function ActionCard(props: ActionCardProps) {
  const { icon, title, hint, tone = "standard" } = props;
  const look = tones[tone];
  const className = `${styles.card} ${look.card}`;

  const content = (
    <>
      <span className={`${styles.bubble} ${look.bubble}`}>
        <Icon name={icon} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </span>
      <Icon name="arrow" className={styles.arrow} />
    </>
  );

  return (
    <div>
      {"to" in props ? (
        <Link href={props.to} className={className}>
          {content}
        </Link>
      ) : (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
          <span className="sr-only">{props.newTabLabel}</span>
        </a>
      )}
    </div>
  );
}
