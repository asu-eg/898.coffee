import logo from "@/assets/mark.svg";
import { setLocale, useLocale, useStrings } from "@/shared/i18n";
import { ROUTES } from "@/shared/router";
import * as C from "./components";
import { site } from "./site";
import { strings } from "./strings";

const styles = {
  page: "relative isolate",
  container:
    "relative mx-auto flex min-h-dvh w-full max-w-md flex-col gap-8 px-6 pt-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]",
  headerSlot: "pt-10",
  toggleSlot: "absolute end-6 top-6 z-10",
  navSlot: "flex flex-1 flex-col gap-6",
};

export function LandingPage() {
  const s = useStrings(strings);
  const otherLocale = useLocale() === "en" ? "ar" : "en";

  return (
    <main className={styles.page}>
      <C.Background />

      <div className={styles.container}>
        <div className={styles.toggleSlot}>
          <C.LanguageToggle
            label={s.languageName}
            ariaLabel={s.switchToLanguage}
            lang={otherLocale}
            onPress={() => setLocale(otherLocale)}
          />
        </div>

        <div className={styles.headerSlot}>
          <C.Header
            brandName={site.brandName}
            logoSrc={logo}
            taglineLead={s.taglineLead}
            taglineEmphasis={s.taglineEmphasis}
          />
        </div>

        <nav aria-label={s.mainNav} className={styles.navSlot}>
          <C.NavSection
            cards={[
              {
                to: ROUTES.menu,
                icon: "cup",
                title: s.menuTitle,
                hint: s.menuHint,
                tone: "featured",
              },
              {
                to: ROUTES.review,
                icon: "star",
                title: s.reviewTitle,
                hint: s.reviewHint,
              },
            ]}
          />

          <C.NavSection
            title={s.followUs}
            cards={[
              {
                href: site.instagram.url,
                newTabLabel: s.newTab,
                icon: "instagram",
                title: site.instagram.name,
                hint: site.instagram.handle,
                tone: "social",
              },
            ]}
          />

          <C.NavSection
            title={s.findUs}
            cards={[
              {
                href: site.location.mapsUrl,
                newTabLabel: s.newTab,
                icon: "pin",
                title: s.locationName,
              },
            ]}
          />
        </nav>

        <C.Footer
          lead={s.footerLead}
          emphasis={s.footerEmphasis}
          brandName={site.brandName}
        />
      </div>
    </main>
  );
}
