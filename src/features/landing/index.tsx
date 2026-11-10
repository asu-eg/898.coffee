import { useStrings } from "@/shared/i18n";
import * as C from "./components";
import { strings } from "./strings";

const styles = {
  page: "relative isolate",
  container:
    "relative mx-auto flex min-h-dvh w-full max-w-md flex-col gap-8 px-6 pt-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]",
  headerSlot: "pt-10",
  toggleSlot: "absolute end-6 top-6 z-10",
  navSlot: "flex flex-1 flex-col gap-6",
} as const;

export function LandingPage() {
  const s = useStrings(strings);

  return (
    <main className={styles.page}>
      <C.Background />

      <div className={styles.container}>
        <C.LanguageToggle className={styles.toggleSlot} />

        <C.Header className={styles.headerSlot} />

        <nav aria-label={s.nav.mainNav} className={styles.navSlot}>
          <C.PrimaryNavSection />
          <C.SocialNavSection />
          <C.LocationNavSection />
        </nav>

        <C.Footer />
      </div>
    </main>
  );
}
