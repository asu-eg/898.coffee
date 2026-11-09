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
  group: "flex flex-col gap-3",
  cards: "flex flex-col gap-3",
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
            label={s.language.name}
            ariaLabel={s.language.switchTo}
            lang={otherLocale}
            onPress={() => setLocale(otherLocale)}
          />
        </div>

        <div className={styles.headerSlot}>
          <C.Header
            brandName={site.brandName}
            logoSrc={logo}
            taglineLead={s.header.taglineLead}
            taglineEmphasis={s.header.taglineEmphasis}
          />
        </div>

        <nav aria-label={s.nav.mainNav} className={styles.navSlot}>
          <div className={styles.group}>
            <div className={styles.cards}>
              <C.ActionCard
                to={ROUTES.menu}
                icon="cup"
                title={s.sections.primary.menuTitle}
                hint={s.sections.primary.menuHint}
                tone="featured"
              />
              <C.ActionCard
                to={ROUTES.review}
                icon="star"
                title={s.sections.primary.reviewTitle}
                hint={s.sections.primary.reviewHint}
              />
            </div>
          </div>

          <section className={styles.group}>
            <C.SectionTitle>{s.sections.social.title}</C.SectionTitle>
            <div className={styles.cards}>
              <C.ActionCard
                href={site.instagram.url}
                newTabLabel={s.nav.newTab}
                icon="instagram"
                title={site.instagram.name}
                hint={site.instagram.handle}
                tone="social"
              />
            </div>
          </section>

          <section className={styles.group}>
            <C.SectionTitle>{s.sections.location.title}</C.SectionTitle>
            <div className={styles.cards}>
              <C.ActionCard
                href={site.location.mapsUrl}
                newTabLabel={s.nav.newTab}
                icon="pin"
                title={s.sections.location.locationName}
              />
            </div>
          </section>
        </nav>

        <C.Footer
          lead={s.footer.lead}
          emphasis={s.footer.emphasis}
          brandName={site.brandName}
        />
      </div>
    </main>
  );
}
