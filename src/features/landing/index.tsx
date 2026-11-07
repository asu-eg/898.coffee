import logo from "@/assets/mark.svg";
import { setLocale, useLocale, useStrings } from "@/shared/i18n";
import { ROUTES } from "@/shared/router";
import { ActionCard } from "./components/action-card";
import { Background } from "./components/background";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { LanguageToggle } from "./components/language-toggle";
import { site } from "./site";
import { strings } from "./strings";

const YEAR = new Date().getFullYear();

const styles = {
  page: "relative isolate",
  container:
    "relative mx-auto flex min-h-dvh w-full max-w-md flex-col gap-8 px-6 pt-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]",
  toggle: "absolute end-6 top-6 z-10",
  nav: "flex flex-1 flex-col gap-6",
  group: "flex flex-col gap-3",
  groupTitle: "px-1 text-small font-bold text-charcoal",
};

export function LandingPage() {
  const s = useStrings(strings);
  const locale = useLocale();
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <main className={styles.page}>
      <Background />

      <div className={styles.container}>
        <div className={styles.toggle}>
          <LanguageToggle
            label={s.languageName}
            ariaLabel={s.switchToLanguage}
            lang={otherLocale}
            onPress={() => setLocale(otherLocale)}
          />
        </div>

        <Header
          brandName={site.brandName}
          logoSrc={logo}
          taglineLead={s.taglineLead}
          taglineEmphasis={s.taglineEmphasis}
        />

        <nav aria-label={s.mainNav} className={styles.nav}>
          <div className={styles.group}>
            <ActionCard
              to={ROUTES.menu}
              icon="cup"
              title={s.menuTitle}
              hint={s.menuHint}
              tone="featured"
            />
            <ActionCard
              to={ROUTES.review}
              icon="star"
              title={s.reviewTitle}
              hint={s.reviewHint}
            />
          </div>

          <section className={styles.group}>
            <h2 className={styles.groupTitle}>{s.followUs}</h2>
            <ActionCard
              href={site.instagram.url}
              newTabLabel={s.newTab}
              icon="instagram"
              title={site.instagram.name}
              hint={site.instagram.handle}
              tone="social"
            />
          </section>

          <section className={styles.group}>
            <h2 className={styles.groupTitle}>{s.findUs}</h2>
            <ActionCard
              href={site.location.mapsUrl}
              newTabLabel={s.newTab}
              icon="pin"
              title={s.locationName}
            />
          </section>
        </nav>

        <Footer
          lead={s.footerLead}
          emphasis={s.footerEmphasis}
          copyright={`© ${YEAR} ${site.brandName}`}
        />
      </div>
    </main>
  );
}
