import type { Localized } from "@/shared/i18n";

const en = {
  common: {
    close: "Close",
  },
  drawer: {
    title: "How was it?",
    description: "Submit your review or share feedback.",
  },
  choices: {
    google: {
      title: "Loved it!",
      hint: "Share your experience",
    },
    note: {
      title: "I have a suggestion",
      hint: "Help us improve",
    },
  },
  form: {
    fields: {
      message: {
        label: "How can we make it better?",
        tooShort: "Please tell us a bit more.",
      },
      name: {
        label: "Name (optional)",
      },
      contact: {
        label: "Phone or email (optional)",
      },
    },
    actions: {
      send: "Send Feedback",
      sending: "Sending…",
    },
    errors: {
      unknown: "Something went wrong. Check your connection and try again.",
      "invalid-input": "Please check your message and try again.",
      timeout: "The request took too long. Please try again.",
      server: "We couldn't send your feedback right now. Please try again later.",
      "rate-limited":
        "You've sent a few messages already. Please try again in a few minutes.",
    },
  },
  success: {
    message: "Thank you! We truly value your thoughts.",
  },
};

const ar: typeof en = {
  common: {
    close: "إغلاق",
  },
  drawer: {
    title: "كيف كانت تجربتك؟",
    description: "أرسل تقييمك أو شارك ملاحظاتك.",
  },
  choices: {
    google: {
      title: "كل شيء كان رائعاً!",
      hint: "شارك تجربتك",
    },
    note: {
      title: "لدي بعض الملاحظات",
      hint: "ساعدنا لنقدم لك الأفضل",
    },
  },
  form: {
    fields: {
      message: {
        label: "كيف يمكننا التحسن؟",
        tooShort: "من فضلك اكتب تفاصيل أكثر قليلاً.",
      },
      name: {
        label: "الاسم (اختياري)",
      },
      contact: {
        label: "الهاتف أو البريد (اختياري)",
      },
    },
    actions: {
      send: "إرسال الملاحظات",
      sending: "جارٍ الإرسال…",
    },
    errors: {
      unknown: "حدث خطأ ما. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
      "invalid-input": "يرجى مراجعة الرسالة والبيانات المدخلة ثم المحاولة مرة أخرى.",
      timeout: "استغرق الطلب وقتًا أطول من المتوقع. حاول مرة أخرى.",
      server: "تعذر إرسال ملاحظاتك الآن. يرجى المحاولة لاحقًا.",
      "rate-limited": "أرسلت عدة رسائل بالفعل. حاول مرة أخرى بعد دقائق.",
    },
  },
  success: {
    message: "شكرًا لك! نحن نقدر ملاحظاتك جداً.",
  },
};

export const strings: Localized<typeof en> = { en, ar };
