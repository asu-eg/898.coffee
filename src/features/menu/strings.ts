import type { Localized } from "@/shared/i18n";

const en = {
  common: {
    close: "Close",
    back: "Back to home",
  },
  language: {
    name: "عربي",
    switchTo: "Switch to Arabic",
  },
  badge: {
    new: "New",
    top: "Top pick",
    outOfStock: "Out of stock",
  },
  price: {
    from: "From",
  },
  states: {
    loading: "Loading the menu…",
    errorTitle: "Something went wrong",
    errorNetwork: "Check your connection and try again.",
    errorServer: "We couldn't load the menu right now. Please try again.",
    retry: "Try again",
  },
  header: {
    searchLabel: "Search the menu",
    categoriesLabel: "Browse categories",
  },
  nav: {
    categoriesTitle: "Categories",
    signaturesLabel: "Signatures",
    pairingsLabel: "Pairings",
  },
  sections: {
    signatures: {
      title: "Our signatures",
      subtitle: "The drinks people come back for",
    },
    pairings: {
      title: "Perfect pairings",
      subtitle: "Better together, for less",
    },
    showAll: (name: string, count: number) => `Show all ${count} in ${name}`,
  },
  product: {
    size: "Size",
    addOns: "Add-ons",
    baristaWay: "Barista's Way",
    baristaWaySub: "Our favorite way to make it",
    oftenOrderedWith: "Often ordered with",
    outOfStock: "Currently unavailable",
    addToOrder: "Add to order",
    a11yOpen: (name: string) => `View ${name}`,
  },
  pairing: {
    save: (amount: string) => `Save ${amount}`,
    outOfStock: "One of these items is unavailable",
  },
  search: {
    placeholder: "Search drinks, desserts, offers…",
    prompt: "Start typing to search the menu",
    noMatch: (query: string) => `No results for "${query}"`,
    groupCategories: "Categories",
    groupPairings: "Pairings",
    groupProducts: "Items",
    resultsCount: (count: number) => `${count} results`,
    resultsCountOne: "1 result",
  },
  promo: {
    alt: "Today's promotion",
  },
  cart: {
    title: "Your order",
    empty: "Your order is empty",
    emptyHint: "Add a drink or a pairing to start your order.",
    browseMenu: "Browse the menu",
    subtotal: "Subtotal",
    viewOrder: "View order",
    clear: "Clear order",
    clearQuestion: "Remove everything from your order?",
    keep: "Keep it",
    itemsCount: (count: number) => `${count} items`,
    itemsCountOne: "1 item",
    a11yViewOrder: (count: number, total: string) =>
      `View order, ${count} items, ${total}`,
    a11yRemove: (title: string) => `Remove ${title}`,
    a11yIncrease: (title: string) => `Increase quantity of ${title}`,
    a11yDecrease: (title: string) => `Decrease quantity of ${title}`,
  },
};

const ar: typeof en = {
  common: {
    close: "إغلاق",
    back: "العودة للرئيسية",
  },
  language: {
    name: "English",
    switchTo: "التبديل إلى الإنجليزية",
  },
  badge: {
    new: "جديد",
    top: "الأكثر طلباً",
    outOfStock: "غير متاح",
  },
  price: {
    from: "يبدأ من",
  },
  states: {
    loading: "جارِ تحميل المنيو…",
    errorTitle: "حدث خطأ ما",
    errorNetwork: "تحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
    errorServer: "تعذّر تحميل المنيو الآن. حاول مرة أخرى.",
    retry: "إعادة المحاولة",
  },
  header: {
    searchLabel: "ابحث في المنيو",
    categoriesLabel: "تصفح الأقسام",
  },
  nav: {
    categoriesTitle: "الأقسام",
    signaturesLabel: "مميزاتنا",
    pairingsLabel: "العروض",
  },
  sections: {
    signatures: {
      title: "مميزاتنا",
      subtitle: "المشروبات اللي الكل بيرجعلها",
    },
    pairings: {
      title: "عروض متكاملة",
      subtitle: "أحلى مع بعض، وبسعر أوفر",
    },
    showAll: (name: string, count: number) => `عرض كل ${count} في ${name}`,
  },
  product: {
    size: "الحجم",
    addOns: "إضافات",
    baristaWay: "بطريقة الباريستا",
    baristaWaySub: "طريقتنا المفضلة لتحضيرها",
    oftenOrderedWith: "غالباً بيتطلب معاها",
    outOfStock: "غير متاح حالياً",
    addToOrder: "أضف للطلب",
    a11yOpen: (name: string) => `عرض ${name}`,
  },
  pairing: {
    save: (amount: string) => `وفّر ${amount}`,
    outOfStock: "أحد هذه المنتجات غير متاح حالياً",
  },
  search: {
    placeholder: "ابحث عن مشروبات، حلويات، عروض…",
    prompt: "ابدأ الكتابة للبحث في المنيو",
    noMatch: (query: string) => `لا توجد نتائج لـ"${query}"`,
    groupCategories: "الأقسام",
    groupPairings: "العروض",
    groupProducts: "المنتجات",
    resultsCount: (count: number) => `${count} نتيجة`,
    resultsCountOne: "نتيجة واحدة",
  },
  promo: {
    alt: "عرض اليوم",
  },
  cart: {
    title: "طلبك",
    empty: "طلبك فارغ",
    emptyHint: "أضف مشروباً أو عرضاً لتبدأ طلبك.",
    browseMenu: "تصفح المنيو",
    subtotal: "الإجمالي",
    viewOrder: "عرض الطلب",
    clear: "إفراغ الطلب",
    clearQuestion: "هل تريد إزالة كل شيء من طلبك؟",
    keep: "الاحتفاظ به",
    itemsCount: (count: number) => `${count} عناصر`,
    itemsCountOne: "عنصر واحد",
    a11yViewOrder: (count: number, total: string) =>
      `عرض الطلب، ${count} عناصر، ${total}`,
    a11yRemove: (title: string) => `إزالة ${title}`,
    a11yIncrease: (title: string) => `زيادة كمية ${title}`,
    a11yDecrease: (title: string) => `تقليل كمية ${title}`,
  },
};

export const strings: Localized<typeof en> = { en, ar };
