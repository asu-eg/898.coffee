import { useState } from "react";
import { Icon } from "@/shared/icons";

interface PictureProps {
  src: string | null;
  alt?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}

const styles = {
  frame: "relative overflow-hidden bg-sand/30",
  img: "absolute inset-0 size-full transition-opacity duration-200 ease-out motion-reduce:transition-none",
  imgCover: "object-cover",
  imgContain: "object-contain",
  visible: "opacity-100",
  hidden: "opacity-0",
  fallback: "absolute inset-0 flex items-center justify-center text-taupe/50",
  fallbackIcon: "size-8",
} as const;

export function Picture({
  src,
  alt = "",
  className,
  priority = false,
  fit = "cover",
}: PictureProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [trackedSrc, setTrackedSrc] = useState(src);

  if (trackedSrc !== src) {
    setTrackedSrc(src);
    setStatus("loading");
  }

  const showImage = src !== null && status !== "error";
  const showFallback = src === null || status === "error";

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")}>
      {showImage && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={[
            styles.img,
            fit === "contain" ? styles.imgContain : styles.imgCover,
            status === "loaded" ? styles.visible : styles.hidden,
          ].join(" ")}
        />
      )}

      {showFallback && (
        <span className={styles.fallback} aria-hidden="true">
          <Icon name="cup" className={styles.fallbackIcon} />
        </span>
      )}
    </div>
  );
}
