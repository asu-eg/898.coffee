import type { Localized } from "@/shared/i18n";

const en = {
  badge: {
    new: "New",
    top: "Top pick",
    outOfStock: "Out of stock",
  },
  price: {
    from: "From",
  },
};

const ar: typeof en = {
  badge: {
    new: "جديد",
    top: "الأفضل",
    outOfStock: "نفذت الكمية",
  },
  price: {
    from: "يبدأ من",
  },
};

export const menuStrings: Localized<typeof en> = { en, ar };
