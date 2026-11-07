import type { Localized } from "@/shared/i18n";

const en = {
  taglineLead: "Where clarity",
  taglineEmphasis: "brews.",
  footerLead: "Every visit tells",
  footerEmphasis: "a story.",
  mainNav: "Main navigation",
  languageName: "عربي",
  switchToLanguage: "Switch to Arabic",
  menuTitle: "Menu",
  menuHint: "Drinks, desserts & offers",
  reviewTitle: "Rate your visit",
  reviewHint: "Shape your next sip",
  followUs: "Follow the story",
  findUs: "Find your seat",
  newTab: "(opens in a new tab)",
  locationName: "Main branch",
};

const ar: typeof en = {
  taglineLead: "قهوة توزن",
  taglineEmphasis: "أفكارك.",
  footerLead: "كل قعدة ليها",
  footerEmphasis: "حكاية.",
  mainNav: "التنقل الرئيسي",
  languageName: "English",
  switchToLanguage: "التبديل إلى الإنجليزية",
  menuTitle: "القائمة",
  menuHint: "مشروبات، حلويات وعروض",
  reviewTitle: "قيّم زيارتك",
  reviewHint: "رأيك بيحدد فنجانك الجاي",
  followUs: "تابع الحكاية",
  findUs: "لاقي قعدتك",
  newTab: "(يُفتح في تبويب جديد)",
  locationName: "الفرع الرئيسي",
};

export const strings: Localized<typeof en> = { en, ar };
