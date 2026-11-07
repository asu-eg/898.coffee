import type { ReactNode } from "react";
import { Drawer } from "vaul";
import { Button } from "react-aria-components";
import { Icon } from "@/shared/icons";

interface ReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  children: ReactNode;
}

const styles = {
  overlay: "fixed inset-0 z-50 bg-scrim",
  content:
    "fixed inset-x-0 bottom-0 z-50 mx-auto mt-24 flex max-h-[min(92dvh,48rem)] w-full max-w-md flex-col rounded-t-[32px] border border-sand/50 bg-cream text-charcoal shadow-sheet outline-none",
  handleWrapper: "mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-brand/20",
  scrollArea:
    "flex-1 overflow-y-auto px-6 pt-6 pb-[calc(max(1.25rem,env(safe-area-inset-bottom)))]",
  header: "flex items-start justify-between gap-4 pb-4",
  title: "text-title font-bold text-charcoal text-balance",
  closeBtn:
    "group -mt-2 inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full p-1 outline-none",
  closeVisual:
    "pointer-events-none inline-flex size-9 items-center justify-center rounded-full bg-white text-brand transition group-data-hovered:bg-arctic group-data-pressed:scale-95",
};

export function ReviewDrawer({
  isOpen,
  onClose,
  title,
  closeLabel,
  children,
}: ReviewDrawerProps) {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content}>
          <div className={styles.handleWrapper} />
          <div className={styles.scrollArea}>
            <div className={styles.header}>
              <Drawer.Title className={styles.title}>{title}</Drawer.Title>
              <Button
                aria-label={closeLabel}
                onPress={onClose}
                className={styles.closeBtn}
              >
                <span className={styles.closeVisual}>
                  <Icon name="close" className="size-5" />
                </span>
              </Button>
            </div>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
