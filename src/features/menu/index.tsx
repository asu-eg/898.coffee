/**
 * TEMPORARY — Component preview page for Phase 1 atoms + Phase 2 cards.
 * This is NOT the real menu implementation.
 * Replace this file when integrating the actual menu page.
 */

import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { useLocale, setLocale, type Locale } from "@/shared/i18n";
import logoSrc from "@/assets/logo.svg";
import markSrc from "@/assets/mark.svg";
import type { Product, Pairing } from "@/features/menu/types/menu-models";
import { Badge } from "./components/ui/badge";
import { Chevron } from "./components/ui/chevron";
import { Picture } from "./components/ui/picture";
import { Price } from "./components/ui/price";
import { PairingCard } from "./components/cards/pairing-card";
import { ProductCard } from "./components/cards/product-card";
import { SignatureCard } from "./components/cards/signature-card";

// ── Constants ──────────────────────────────────────────────────────────────

const CURRENCY = "EGP";

// ── Mock data (matches production TypeScript models exactly) ───────────────

const mockProducts: Product[] = [
  {
    id: "p-new",
    name: { en: "Classic Latte", ar: "لاتيه كلاسيك" },
    image: logoSrc,
    availability: "in_stock",
    badge: "new",
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 65, discount: 0, final: 65 }],
    },
    description: {
      en: "Smooth espresso with velvety steamed milk and a touch of vanilla.",
      ar: "إسبريسو ناعم مع حليب مبخر مخملي ولمسة من الفانيليا.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "p-top",
    name: { en: "Cold Brew Reserve", ar: "كولد برو ريزرف" },
    image: markSrc,
    availability: "in_stock",
    badge: "top",
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 85, discount: 0, final: 85 }],
    },
    description: {
      en: "18-hour cold-steeped single origin, served over crystal ice.",
      ar: "يُنقع 18 ساعة بالبرد، يُقدّم فوق ثلج كريستال.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "p-oos",
    name: { en: "Sakura Matcha", ar: "ساكورا ماتشا" },
    image: logoSrc,
    availability: "out_of_stock",
    badge: "new",
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 70, discount: 0, final: 70 }],
    },
    description: {
      en: "Ceremonial grade matcha with rose and oat milk.",
      ar: "ماتشا درجة أولى مع ورد وحليب الشوفان.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "p-disc",
    name: { en: "Caramel Macchiato", ar: "ماكياتو كراميل" },
    image: markSrc,
    availability: "in_stock",
    badge: null,
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 80, discount: 15, final: 65 }],
    },
    description: {
      en: "Layered espresso, vanilla foam and caramel drizzle.",
      ar: "طبقات إسبريسو وفانيليا وكراميل.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "p-sizes",
    name: { en: "House Blend Drip", ar: "قهوة مفلترة" },
    image: logoSrc,
    availability: "in_stock",
    badge: null,
    pricing: {
      type: "sizes",
      options: [
        {
          id: "small",
          name: { en: "Small", ar: "صغير" },
          price: 45,
          discount: 0,
          final: 45,
        },
        {
          id: "medium",
          name: { en: "Medium", ar: "وسط" },
          price: 55,
          discount: 0,
          final: 55,
        },
        {
          id: "large",
          name: { en: "Large", ar: "كبير" },
          price: 65,
          discount: 0,
          final: 65,
        },
      ],
    },
    description: {
      en: "Light roast filter coffee, brewed fresh every 30 minutes.",
      ar: "قهوة مفلترة تحميص فاتح، تُحضَّر طازجة كل 30 دقيقة.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "p-noimg",
    name: { en: "Spiced Chai Latte", ar: "لاتيه شاي بالبهارات" },
    image: null,
    availability: "in_stock",
    badge: null,
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 60, discount: 0, final: 60 }],
    },
    description: {
      en: "Warming blend of cinnamon, cardamom and ginger with steamed milk.",
      ar: "مزيج دافئ من القرفة والهيل والزنجبيل مع الحليب.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
];

// Signature products (vertical card)
const mockSignatures: Product[] = [
  {
    id: "s-normal",
    name: { en: "Signature Pour Over", ar: "بور أوفر مميز" },
    image: logoSrc,
    availability: "in_stock",
    badge: "top",
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 90, discount: 0, final: 90 }],
    },
    description: {
      en: "Hand-crafted pour over using our seasonal micro-lot selection.",
      ar: "بور أوفر يدوي من اختيارنا الموسمي.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "s-disc",
    name: { en: "Date Latte Special", ar: "لاتيه التمر الخاص" },
    image: markSrc,
    availability: "in_stock",
    badge: "new",
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 100, discount: 20, final: 80 }],
    },
    description: {
      en: "Rich espresso blended with Medjool date syrup and oat milk.",
      ar: "إسبريسو مع شراب التمر المدجول وحليب الشوفان.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "s-oos",
    name: { en: "Butterfly Pea Fizz", ar: "فيز عباد الشمس الأزرق" },
    image: logoSrc,
    availability: "out_of_stock",
    badge: null,
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 75, discount: 0, final: 75 }],
    },
    description: {
      en: "Colour-changing butterfly pea flower tea with sparkling water.",
      ar: "شاي زهرة البازلاء يغير لونه مع الماء الغازي.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
  {
    id: "s-priority",
    name: { en: "Honey Oat Flat White", ar: "فلات وايت العسل والشوفان" },
    image: markSrc,
    availability: "in_stock",
    badge: null,
    pricing: {
      type: "single",
      options: [{ id: "o1", name: null, price: 80, discount: 0, final: 80 }],
    },
    description: {
      en: "Double ristretto with wild honey and oat milk microfoam.",
      ar: "ريستريتو مضاعف مع عسل بري ورغوة حليب الشوفان.",
    },
    addOns: [],
    baristaWay: [],
    oftenOrderedWith: [],
  },
];

// Pairings
const mockPairings: Pairing[] = [
  {
    id: "pair-normal",
    items: [mockProducts[0]!, mockProducts[1]!],
    pricing: { price: 140, discount: 0, final: 140 },
  },
  {
    id: "pair-disc",
    items: [mockProducts[1]!, mockProducts[3]!],
    pricing: { price: 160, discount: 25, final: 135 },
  },
  {
    id: "pair-oos",
    items: [mockProducts[0]!, mockProducts[2]!],
    pricing: { price: 130, discount: 0, final: 130 },
  },
  {
    id: "pair-noimg",
    items: [mockProducts[5]!, mockProducts[4]!],
    pricing: { price: 110, discount: 0, final: 110 },
  },
  {
    id: "pair-three",
    items: [mockProducts[0]!, mockProducts[1]!, mockProducts[3]!],
    pricing: { price: 200, discount: 30, final: 170 },
  },
  {
    id: "pair-empty",
    items: [],
    pricing: { price: 0, discount: 0, final: 0 },
  },
];

// ── Interaction feedback ───────────────────────────────────────────────────

interface PressEvent {
  kind: "product" | "signature" | "pairing";
  id: string;
  label: string;
}

// ── Layout helpers ─────────────────────────────────────────────────────────

const page = {
  root: "min-h-screen bg-cream px-4 py-8 md:px-8",
  inner: "mx-auto max-w-2xl space-y-10",
  devBadge:
    "mb-8 inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-caption font-semibold text-navy/60",
  section: "space-y-4",
  sectionTitle: "border-b border-sand pb-2 text-heading font-bold text-navy",
  row: "flex flex-wrap items-start gap-3",
  label: "text-caption text-taupe",
  group: "space-y-1.5",
  localeGroup: "flex gap-2",
  localeBtn:
    "rounded-full border border-sand px-4 py-1.5 text-small font-semibold text-navy transition-colors duration-interactive ease-smooth outline-none selected:border-brand selected:bg-brand selected:text-white focus-visible:ring-2 focus-visible:ring-brand",

  // Phase 1 atoms layout
  pictureFrame: "h-36 w-36 rounded-md overflow-hidden",
  pictureTall: "h-48 w-36 rounded-md overflow-hidden",

  // Cards layout
  cardGrid: "grid grid-cols-1 gap-4 sm:grid-cols-2",
  cardGridWide: "grid grid-cols-1 gap-4 md:grid-cols-2",
  signatureGrid: "grid grid-cols-2 gap-3 sm:grid-cols-4",
  cardLabel: "text-caption text-taupe mt-1",
  cardWrap: "flex flex-col gap-1",

  // Feedback area
  feedback:
    "rounded-md border border-arctic bg-white p-3 text-small text-navy space-y-1",
  feedbackTitle:
    "text-caption font-semibold text-taupe uppercase tracking-wide",
  feedbackEmpty: "text-caption text-taupe/60 italic",

  divider: "border-t-2 border-sand pt-6",
} as const;

// ── Locale Section ─────────────────────────────────────────────────────────

function LocaleSection({ locale }: { locale: Locale }) {
  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>Locale</h2>
      <ToggleButtonGroup
        selectionMode="single"
        selectedKeys={new Set([locale])}
        onSelectionChange={(keys) => {
          const next = [...keys][0] as Locale;
          if (next) setLocale(next);
        }}
        className={page.localeGroup}
      >
        <ToggleButton id="en" className={page.localeBtn}>
          English (LTR)
        </ToggleButton>
        <ToggleButton id="ar" className={page.localeBtn}>
          العربية (RTL)
        </ToggleButton>
      </ToggleButtonGroup>
    </section>
  );
}

// ── Phase 1 Atom Sections ─────────────────────────────────────────────────

function PictureSection() {
  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>Picture</h2>
      <div className={page.row}>
        <div className={page.group}>
          <span className={page.label}>Local image (cover)</span>
          <Picture src={logoSrc} alt="Logo" className={page.pictureFrame} />
        </div>
        <div className={page.group}>
          <span className={page.label}>Local image (contain)</span>
          <Picture
            src={markSrc}
            alt="Mark"
            fit="contain"
            className={page.pictureFrame}
          />
        </div>
        <div className={page.group}>
          <span className={page.label}>Priority (eager)</span>
          <Picture
            src={logoSrc}
            alt="Logo priority"
            priority
            className={page.pictureTall}
          />
        </div>
        <div className={page.group}>
          <span className={page.label}>Null source → fallback</span>
          <Picture src={null} className={page.pictureFrame} />
        </div>
        <div className={page.group}>
          <span className={page.label}>Broken URL → fallback</span>
          <Picture
            src="https://example.invalid/broken.jpg"
            alt="Broken"
            className={page.pictureFrame}
          />
        </div>
      </div>
    </section>
  );
}

function PriceSection({ locale }: { locale: Locale }) {
  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>Price</h2>
      <div className={page.row}>
        <div className={page.group}>
          <span className={page.label}>Caption</span>
          <Price value={45} currency={CURRENCY} size="caption" />
        </div>
        <div className={page.group}>
          <span className={page.label}>Small (default)</span>
          <Price value={45} currency={CURRENCY} />
        </div>
        <div className={page.group}>
          <span className={page.label}>Body</span>
          <Price value={45} currency={CURRENCY} size="body" />
        </div>
        <div className={page.group}>
          <span className={page.label}>Heading</span>
          <Price value={45} currency={CURRENCY} size="heading" />
        </div>
      </div>
      <div className={page.row}>
        <div className={page.group}>
          <span className={page.label}>With discount (small)</span>
          <Price value={45} currency={CURRENCY} regularValue={60} />
        </div>
        <div className={page.group}>
          <span className={page.label}>With discount (heading)</span>
          <Price
            value={120}
            currency={CURRENCY}
            regularValue={160}
            size="heading"
          />
        </div>
        <div className={page.group}>
          <span className={page.label}>
            {locale === "ar" ? "RTL" : "LTR"} EGP 199
          </span>
          <Price value={199} currency={CURRENCY} size="heading" />
        </div>
      </div>
    </section>
  );
}

function BadgeSection({ locale }: { locale: Locale }) {
  const labels = {
    new: locale === "ar" ? "جديد" : "New",
    top: locale === "ar" ? "الأفضل" : "Top pick",
    out_of_stock: locale === "ar" ? "نفذت الكمية" : "Out of stock",
  } as const;
  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>Badge</h2>
      <div className={page.group}>
        <span className={page.label}>Regular</span>
        <div className={page.row}>
          <Badge kind="new" label={labels.new} />
          <Badge kind="top" label={labels.top} />
          <Badge kind="out_of_stock" label={labels.out_of_stock} />
        </div>
      </div>
      <div className={page.group}>
        <span className={page.label}>Compact</span>
        <div className={page.row}>
          <Badge kind="new" label={labels.new} compact />
          <Badge kind="top" label={labels.top} compact />
          <Badge kind="out_of_stock" label={labels.out_of_stock} compact />
        </div>
      </div>
    </section>
  );
}

function ChevronSection() {
  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>Chevron</h2>
      <div className={page.row}>
        <div className={page.group}>
          <span className={page.label}>sm</span>
          <Chevron size="sm" />
        </div>
        <div className={page.group}>
          <span className={page.label}>md</span>
          <Chevron size="md" />
        </div>
        <div className={page.group}>
          <span className={page.label}>lg</span>
          <Chevron size="lg" />
        </div>
      </div>
    </section>
  );
}

// ── Phase 2 Card Sections ─────────────────────────────────────────────────

function ProductCardSection({ onPress }: { onPress: (e: PressEvent) => void }) {
  const descriptions: Record<string, string> = {
    "p-new": "new badge",
    "p-top": "top badge",
    "p-oos": "out of stock",
    "p-disc": "discounted price",
    "p-sizes": "multiple sizes (From prefix)",
    "p-noimg": "missing image",
  };

  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>ProductCard</h2>
      <p className={page.label}>
        Horizontal layout · all interaction exposed through onPress
      </p>
      <div className={page.cardGrid}>
        {mockProducts.map((product) => (
          <div key={product.id} className={page.cardWrap}>
            <ProductCard
              product={product}
              currency={CURRENCY}
              onPress={() =>
                onPress({
                  kind: "product",
                  id: product.id,
                  label: `${product.name.en} (${product.name.ar})`,
                })
              }
            />
            <span className={page.cardLabel}>{descriptions[product.id]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SignatureCardSection({
  onPress,
}: {
  onPress: (e: PressEvent) => void;
}) {
  const descriptions: Record<string, string> = {
    "s-normal": "top badge, regular price",
    "s-disc": "new badge, discounted",
    "s-oos": "out of stock",
    "s-priority": "priority image (eager load)",
  };

  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>SignatureCard</h2>
      <p className={page.label}>Vertical layout · square image</p>
      <div className={page.signatureGrid}>
        {mockSignatures.map((product, i) => (
          <div key={product.id} className={page.cardWrap}>
            <SignatureCard
              product={product}
              currency={CURRENCY}
              priority={i === 3}
              onPress={() =>
                onPress({
                  kind: "signature",
                  id: product.id,
                  label: `${product.name.en} (${product.name.ar})`,
                })
              }
            />
            <span className={page.cardLabel}>{descriptions[product.id]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PairingCardSection({ onPress }: { onPress: (e: PressEvent) => void }) {
  const descriptions: Record<string, string> = {
    "pair-normal": "normal (2 items)",
    "pair-disc": "discounted price",
    "pair-oos": "unavailable product",
    "pair-noimg": "missing images",
    "pair-three": "3 items (robustness)",
    "pair-empty": "empty items (edge case)",
  };

  return (
    <section className={page.section}>
      <h2 className={page.sectionTitle}>PairingCard</h2>
      <p className={page.label}>
        Image composition · handles variable item counts
      </p>
      <div className={page.cardGridWide}>
        {mockPairings.map((pairing) => {
          const names = pairing.items.map((i) => i.name.en).join(" + ");
          return (
            <div key={pairing.id} className={page.cardWrap}>
              <PairingCard
                pairing={pairing}
                currency={CURRENCY}
                onPress={() =>
                  onPress({
                    kind: "pairing",
                    id: pairing.id,
                    label: names || "(empty)",
                  })
                }
              />
              <span className={page.cardLabel}>{descriptions[pairing.id]}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Press Feedback ─────────────────────────────────────────────────────────

function FeedbackArea({ last }: { last: PressEvent | null }) {
  return (
    <div className={page.feedback}>
      <p className={page.feedbackTitle}>Last pressed card</p>
      {last === null ? (
        <p className={page.feedbackEmpty}>
          Press any card to see callback output here.
        </p>
      ) : (
        <>
          <p>
            <strong>Kind:</strong> {last.kind}
          </p>
          <p>
            <strong>ID:</strong> {last.id}
          </p>
          <p>
            <strong>Name:</strong> {last.label}
          </p>
        </>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export function MenuPage() {
  const locale = useLocale();
  const [lastPress, setLastPress] = useState<PressEvent | null>(null);

  return (
    <div className={page.root}>
      <div className={page.inner}>
        <div>
          <span className={page.devBadge}>
            Dev preview · Phase 1 atoms + Phase 2 cards
          </span>
          <h1 className="text-title font-bold text-navy">Menu UI Components</h1>
          <p className="mt-1 text-small text-taupe">
            Temporary preview page. Switch locale to test RTL across all
            components.
          </p>
        </div>

        <LocaleSection locale={locale} />

        {/* ── Phase 1: UI Atoms ── */}
        <div className={page.divider}>
          <h2 className="mb-6 text-title font-bold text-brand">
            Phase 1 — UI Atoms
          </h2>
          <div className="space-y-10">
            <PictureSection />
            <PriceSection locale={locale} />
            <BadgeSection locale={locale} />
            <ChevronSection />
          </div>
        </div>

        {/* ── Phase 2: Cards ── */}
        <div className={page.divider}>
          <h2 className="mb-6 text-title font-bold text-brand">
            Phase 2 — Cards
          </h2>
          <div className="space-y-10">
            <FeedbackArea last={lastPress} />
            <ProductCardSection onPress={setLastPress} />
            <SignatureCardSection onPress={setLastPress} />
            <PairingCardSection onPress={setLastPress} />
          </div>
        </div>
      </div>
    </div>
  );
}
