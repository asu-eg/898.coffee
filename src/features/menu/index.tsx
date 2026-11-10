import { useState, type ReactNode } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { setLocale, useLocale, useStrings, type Locale } from "@/shared/i18n";
import logoSrc from "@/assets/logo.svg";
import markSrc from "@/assets/mark.svg";
import { menuStrings } from "./strings";
import { BottomSheet } from "./components/ui/bottom-sheet";
import { Badge } from "./components/ui/badge";
import { Chevron } from "./components/ui/chevron";
import { MenuImage } from "./components/ui/menu-image";
import { Price } from "./components/ui/price";
import { SectionHeading } from "./components/ui/section-heading";

const CURRENCY = "EGP";

const styles = {
  page: "min-h-dvh bg-cream px-4 py-8 text-charcoal sm:px-6 sm:py-10",
  content: "mx-auto flex w-full max-w-3xl flex-col gap-10",
  intro: "flex flex-col gap-2",
  eyebrow:
    "inline-flex w-fit items-center rounded-full bg-brand/10 px-3 py-1 text-caption font-semibold text-brand",
  title: "text-title font-bold text-charcoal",
  description: "max-w-2xl text-small text-taupe",
  section: "flex flex-col gap-5 border-t border-sand pt-7",
  sectionTitle: "text-heading font-bold text-brand",
  group: "flex flex-col gap-2",
  label: "text-caption font-semibold text-taupe",
  row: "flex flex-wrap items-center gap-3",
  sample: "flex min-w-24 flex-col items-start gap-2",
  surface: "rounded-lg border border-arctic bg-white p-4",
  localeGroup: "flex w-fit gap-2 rounded-full bg-white p-1 ring-1 ring-arctic",
  localeButton:
    "rounded-full px-4 py-2 text-small font-semibold text-taupe outline-none transition-colors data-selected:bg-brand data-selected:text-white data-focus-visible:ring-2 data-focus-visible:ring-brand data-focus-visible:ring-offset-2",
  imageSmall: "size-28 rounded-md",
  imageTall: "h-40 w-28 rounded-md",
  openSheetButton:
    "inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-3 text-small font-semibold text-white outline-none transition-colors hover:bg-navy focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none",
  sheetFooter: "flex items-center justify-between gap-4",
  sheetFooterText: "text-caption text-taupe",
  sheetFooterButton:
    "shrink-0 rounded-full bg-brand px-4 py-2 text-small font-semibold text-white outline-none transition-colors hover:bg-navy focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none",
  sheetSample:
    "flex flex-col gap-1 rounded-lg border border-sand/70 bg-white p-4",
  sheetSampleTitle: "text-small font-bold text-charcoal",
  sheetSampleText: "text-caption text-taupe",
} as const;

function PreviewSample({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.sample}>
      <span className={styles.label}>{label}</span>
      {children}
    </div>
  );
}

function LocalePreview({ locale }: { locale: Locale }) {
  return (
    <section className={styles.section} aria-labelledby="locale-heading">
      <h2 id="locale-heading" className={styles.sectionTitle}>
        Preview direction
      </h2>
      <p className={styles.description}>
        Switch languages to check logical spacing, text direction, and currency
        formatting. The UI components themselves do not read the locale.
      </p>
      <ToggleButtonGroup
        selectionMode="single"
        selectedKeys={new Set([locale])}
        onSelectionChange={(keys) => {
          if (keys === "all") return;
          const next = [...keys][0];
          if (next === "en" || next === "ar") setLocale(next);
        }}
        className={styles.localeGroup}
        aria-label="Preview language"
      >
        <ToggleButton id="en" className={styles.localeButton}>
          English
        </ToggleButton>
        <ToggleButton id="ar" className={styles.localeButton}>
          العربية
        </ToggleButton>
      </ToggleButtonGroup>
    </section>
  );
}

function SectionHeadingPreview() {
  return (
    <section className={styles.section} aria-labelledby="heading-preview">
      <h2 id="heading-preview" className={styles.sectionTitle}>
        SectionHeading
      </h2>
      <div className={styles.surface}>
        <SectionHeading
          title="Coffee, made with care"
          subtitle="A short supporting line can explain what this menu section contains."
        />
      </div>
      <div className={styles.surface}>
        <SectionHeading title="A heading without a subtitle" />
      </div>
    </section>
  );
}

function MenuImagePreview() {
  return (
    <section className={styles.section} aria-labelledby="image-preview">
      <h2 id="image-preview" className={styles.sectionTitle}>
        MenuImage
      </h2>
      <div className={styles.row}>
        <PreviewSample label="Cover">
          <MenuImage
            src={logoSrc}
            alt="Cafe logo"
            className={styles.imageSmall}
          />
        </PreviewSample>
        <PreviewSample label="Contain">
          <MenuImage
            src={markSrc}
            alt="Cafe mark"
            fit="contain"
            className={styles.imageSmall}
          />
        </PreviewSample>
        <PreviewSample label="Priority">
          <MenuImage
            src={logoSrc}
            alt="Priority-loaded cafe logo"
            priority
            className={styles.imageTall}
          />
        </PreviewSample>
        <PreviewSample label="No image">
          <MenuImage src={null} alt="" className={styles.imageSmall} />
        </PreviewSample>
      </div>
    </section>
  );
}

function PricePreview({ locale }: { locale: Locale }) {
  return (
    <section className={styles.section} aria-labelledby="price-preview">
      <h2 id="price-preview" className={styles.sectionTitle}>
        Price
      </h2>
      <div className={styles.row}>
        <PreviewSample label="Caption">
          <Price
            value={45}
            currency={CURRENCY}
            locale={locale}
            size="caption"
          />
        </PreviewSample>
        <PreviewSample label="Small (default)">
          <Price value={45} currency={CURRENCY} locale={locale} />
        </PreviewSample>
        <PreviewSample label="Body">
          <Price value={45} currency={CURRENCY} locale={locale} size="body" />
        </PreviewSample>
        <PreviewSample label="Heading">
          <Price
            value={45}
            currency={CURRENCY}
            locale={locale}
            size="heading"
          />
        </PreviewSample>
      </div>
      <div className={styles.row}>
        <PreviewSample label="Discount">
          <Price
            value={65}
            regularValue={85}
            currency={CURRENCY}
            locale={locale}
          />
        </PreviewSample>
        <PreviewSample label="No valid discount">
          <Price
            value={65}
            regularValue={50}
            currency={CURRENCY}
            locale={locale}
          />
        </PreviewSample>
      </div>
    </section>
  );
}

function BadgePreview({ locale }: { locale: Locale }) {
  const t = useStrings(menuStrings);

  return (
    <section className={styles.section} aria-labelledby="badge-preview">
      <h2 id="badge-preview" className={styles.sectionTitle}>
        Badge
      </h2>
      <div className={styles.group}>
        <span className={styles.label}>Regular</span>
        <div className={styles.row}>
          <Badge kind="new" label={t.badge.new} />
          <Badge kind="top" label={t.badge.top} />
          <Badge kind="out_of_stock" label={t.badge.outOfStock} />
        </div>
      </div>
      <div className={styles.group}>
        <span className={styles.label}>Compact</span>
        <div className={styles.row}>
          <Badge kind="new" label={t.badge.new} compact />
          <Badge kind="top" label={t.badge.top} compact />
          <Badge kind="out_of_stock" label={t.badge.outOfStock} compact />
        </div>
      </div>
      <p className={styles.description}>
        Labels are supplied by the page, so Badge has no translation hook or
        hidden language dependency. Current language: {locale}.
      </p>
    </section>
  );
}

function ChevronPreview() {
  return (
    <section className={styles.section} aria-labelledby="chevron-preview">
      <h2 id="chevron-preview" className={styles.sectionTitle}>
        Chevron
      </h2>
      <div className={styles.row}>
        <PreviewSample label="Small">
          <Chevron size="sm" />
        </PreviewSample>
        <PreviewSample label="Medium (default)">
          <Chevron size="md" />
        </PreviewSample>
        <PreviewSample label="Large">
          <Chevron size="lg" />
        </PreviewSample>
      </div>
    </section>
  );
}

function BottomSheetPreview({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [withFooter, setWithFooter] = useState(true);
  const isArabic = locale === "ar";

  function openSheet(showFooter: boolean) {
    setWithFooter(showFooter);
    setIsOpen(true);
  }

  const footer = withFooter ? (
    <div className={styles.sheetFooter}>
      <p className={styles.sheetFooterText}>
        {isArabic
          ? "هذا التذييل ثابت أسفل المحتوى."
          : "This footer stays below the scrollable content."}
      </p>
      <Button
        onPress={() => setIsOpen(false)}
        className={styles.sheetFooterButton}
      >
        {isArabic ? "تم" : "Done"}
      </Button>
    </div>
  ) : undefined;

  return (
    <section className={styles.section} aria-labelledby="bottom-sheet-preview">
      <h2 id="bottom-sheet-preview" className={styles.sectionTitle}>
        BottomSheet
      </h2>
      <p className={styles.description}>
        {isArabic
          ? "اختبر الفتح والإغلاق بالسحب أو زر الإغلاق أو الضغط خارج اللوحة، مع تمرير المحتوى الداخلي."
          : "Test opening, closing by dragging the handle, the close button, or the overlay, and scrolling inside the sheet."}
      </p>
      <div className={styles.row}>
        <Button
          onPress={() => openSheet(true)}
          className={styles.openSheetButton}
        >
          {isArabic ? "فتح مع تذييل" : "Open with footer"}
        </Button>
        <Button
          onPress={() => openSheet(false)}
          className={styles.openSheetButton}
        >
          {isArabic ? "فتح بدون تذييل" : "Open without footer"}
        </Button>
      </div>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isArabic ? "تجربة اللوحة السفلية" : "Bottom sheet preview"}
        description={
          isArabic
            ? "لوحة تجريبية لاختبار التمرير والإغلاق."
            : "A sample sheet used to test scrolling and dismissal behavior."
        }
        closeLabel={isArabic ? "إغلاق" : "Close"}
        footer={footer}
      >
        <div className="flex flex-col gap-3">
          <p className={styles.description}>
            {isArabic
              ? "اسحب مقبض اللوحة للأسفل لإغلاقها. مرّر هذه القائمة لاختبار أن المحتوى يتحرك داخل اللوحة دون سحبها."
              : "Drag the handle down to dismiss. Scroll this list to confirm the content moves inside the sheet without dragging the sheet itself."}
          </p>
          {Array.from({ length: 8 }, (_, index) => (
            <article key={index} className={styles.sheetSample}>
              <h3 className={styles.sheetSampleTitle}>
                {isArabic
                  ? `عنصر تجريبي ${index + 1}`
                  : `Scrollable sample ${index + 1}`}
              </h3>
              <p className={styles.sheetSampleText}>
                {isArabic
                  ? "هذا المحتوى موجود فقط لاختبار ارتفاع اللوحة وسلوك التمرير."
                  : "This sample content exists to test the sheet height and its internal scrolling behavior."}
              </p>
            </article>
          ))}
        </div>
      </BottomSheet>
    </section>
  );
}

export function MenuPage() {
  const locale = useLocale();

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.intro}>
          <span className={styles.eyebrow}>Temporary component sandbox</span>
          <h1 className={styles.title}>Menu UI components</h1>
          <p className={styles.description}>
            This page previews only the presentational components in the menu UI
            folder. Check both English and Arabic before starting the next
            implementation phase.
          </p>
        </header>

        <LocalePreview locale={locale} />
        <SectionHeadingPreview />
        <MenuImagePreview />
        <PricePreview locale={locale} />
        <BadgePreview locale={locale} />
        <ChevronPreview />
        <BottomSheetPreview locale={locale} />
      </div>
    </main>
  );
}
