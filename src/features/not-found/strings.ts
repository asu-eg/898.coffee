import type { Localized } from "@/shared/i18n";

const en = {
  page: {
    code: "404",
    title: "This page wandered off.",
    message: "The page you’re looking for doesn’t exist or may have moved.",
  },
  actions: {
    home: "Back to the home page",
  },
};

const ar: typeof en = {
  page: {
    code: "404",
    title: "الصفحة دي مش موجودة.",
    message: "الصفحة اللي بتدور عليها مش موجودة أو ممكن تكون اتنقلت.",
  },
  actions: {
    home: "العودة للصفحة الرئيسية",
  },
};

export const strings: Localized<typeof en> = { en, ar };
