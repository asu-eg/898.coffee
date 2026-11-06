import { PATHS, FLIP_IN_RTL, type IconName } from "./data";

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
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
