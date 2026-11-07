import { Button } from "react-aria-components";

interface LanguageToggleProps {
  label: string;
  ariaLabel: string;
  lang?: string;
  onPress: () => void;
}

const styles = {
  button:
    "group inline-flex min-h-12 min-w-12 items-center justify-center p-1 outline-none",
  label:
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-white/85 px-4 text-small font-bold whitespace-nowrap text-navy transition duration-200 ease-smooth group-data-hovered:bg-white group-data-pressed:scale-[0.97] group-data-focus-visible:outline-2 group-data-focus-visible:outline-offset-2 group-data-focus-visible:outline-navy motion-reduce:transition-none",
};

export function LanguageToggle({
  label,
  ariaLabel,
  lang,
  onPress,
}: LanguageToggleProps) {
  return (
    <Button onPress={onPress} aria-label={ariaLabel} className={styles.button}>
      <span lang={lang} className={styles.label}>
        {label}
      </span>
    </Button>
  );
}
