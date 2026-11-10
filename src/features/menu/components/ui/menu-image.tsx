import { Icon } from "@/shared/icons";

interface MenuImageProps {
  src: string | null;
  alt?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}

const styles = {
  frame: "relative overflow-hidden bg-sand/30",
  image: "size-full transition-opacity duration-200 ease-out motion-reduce:transition-none",
  cover: "object-cover",
  contain: "object-contain",
  fallback: "absolute inset-0 flex items-center justify-center text-taupe/50",
  fallbackIcon: "size-8",
} as const;

export function MenuImage({
  src,
  alt = "",
  priority = false,
  fit = "cover",
  className,
}: MenuImageProps) {
  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={[
            styles.image,
            fit === "contain" ? styles.contain : styles.cover,
          ].join(" ")}
        />
      ) : (
        <span className={styles.fallback} aria-hidden="true">
          <Icon name="cup" className={styles.fallbackIcon} />
        </span>
      )}
    </div>
  );
}
