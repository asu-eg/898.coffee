import type { Localized } from "@/shared/i18n";

const en = {
  header: {
    taglineLead: "Where clarity",
    taglineEmphasis: "brews.",
  },
  language: {
    name: "عربي",
    switchTo: "Switch to Arabic",
  },
  nav: {
    mainNav: "Main navigation",
    newTab: "(opens in a new tab)",
  },
  sections: {
    primary: {
      menuTitle: "Menu",
      menuHint: "Drinks, desserts & offers",
      reviewTitle: "Rate your visit",
      reviewHint: "Shape your next sip",
    },
    social: {
      title: "Follow the story",
    },
    location: {
      title: "Find your seat",
      locationName: "Main branch",
    },
  },
  footer: {
    lead: "Every visit tells",
    emphasis: "a story.",
  },
};

const ar: typeof en = {
  header: {
    taglineLead: "قهوة توزن",
    taglineEmphasis: "أفكارك.",
  },
  language: {
    name: "English",
    switchTo: "التبديل إلى الإنجليزية",
  },
  nav: {
    mainNav: "التنقل الرئيسي",
    newTab: "(يُفتح في تبويب جديد)",
  },
  sections: {
    primary: {
      menuTitle: "القائمة",
      menuHint: "مشروبات، حلويات وعروض",
      reviewTitle: "قيّم زيارتك",
      reviewHint: "رأيك بيحدد فنجانك الجاي",
    },
    social: {
      title: "تابع الحكاية",
    },
    location: {
      title: "لاقي قعدتك",
      locationName: "الفرع الرئيسي",
    },
  },
  footer: {
    lead: "كل قعدة ليها",
    emphasis: "حكاية.",
  },
};

export const strings: Localized<typeof en> = { en, ar };
