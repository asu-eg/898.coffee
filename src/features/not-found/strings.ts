import type { Localized } from "@/shared/i18n";

const en = {
  code: "404",
  title: "This page wandered off.",
  message: "The page you’re looking for doesn’t exist or may have moved.",
  home: "Back to the home page",
};

const ar: typeof en = {
  code: "404",
  title: "الصفحة دي مش موجودة.",
  message: "الصفحة اللي بتدور عليها مش موجودة أو ممكن تكون اتنقلت.",
  home: "العودة للصفحة الرئيسية",
};

export const strings: Localized<typeof en> = { en, ar };
