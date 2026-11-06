import { PATHS, FLIP_IN_RTL, type IconName } from "./data";

interface IconProps {
  size?: number;
  className?: string;
}

function Icon({ name, size = 24, className }: IconProps & { name: IconName }) {
  const flip = FLIP_IN_RTL.has(name) ? "rtl:-scale-x-100" : "";
  const classes = [flip, className].filter(Boolean).join(" ");

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
      className={classes || undefined}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export const Icons = {
  Arrow: (p: IconProps) => <Icon name="arrow" {...p} />,
  Cup: (p: IconProps) => <Icon name="cup" {...p} />,
  Star: (p: IconProps) => <Icon name="star" {...p} />,
  Instagram: (p: IconProps) => <Icon name="instagram" {...p} />,
  Pin: (p: IconProps) => <Icon name="pin" {...p} />,
} as const;
