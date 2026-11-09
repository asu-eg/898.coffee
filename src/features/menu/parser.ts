import { BADGE_RANK } from "./config";
import type {
  AddOn,
  BadgeKind,
  Category,
  Menu,
  Pairing,
  Popup,
  Pricing,
  PriceOption,
  Product,
  ProductRef,
} from "./models";

interface RawName {
  en: string;
  ar: string;
}

interface RawAddOn {
  name: RawName;
  price: number;
}

interface RawPriceOption {
  id: string;
  name: RawName | null;
  price: number;
  discount: number;
  final: number;
}

interface RawPricing {
  type: "single" | "sizes";
  options: RawPriceOption[];
}

interface RawProduct {
  id: string;
  name: RawName;
  description: RawName;
  image: string | null;
  availability: string;
  badge: string | null;
  addOns: string[];
  baristaWay: string[] | null;
  oftenOrderedWith: string[];
  pricing: RawPricing;
}

interface RawCategory {
  id: string;
  name: RawName;
  products: RawProduct[];
}

interface RawPairing {
  id: string;
  items: string[];
  pricing: { price: number; discount: number; final: number };
}

interface RawMenu {
  updatedAt: string;
  currency: string;
  badges: string[];
  addOns: Record<string, RawAddOn>;
  categories: RawCategory[];
  signatures: string[];
  pairings: RawPairing[];
  popup: { enabled: boolean; image: string | null; delaySeconds: number };
}

class AddOnParser {
  static parse(id: string, raw: RawAddOn): AddOn {
    return { id, name: raw.name, price: raw.price };
  }

  static parseMap(raw: Record<string, RawAddOn>): Record<string, AddOn> {
    const map: Record<string, AddOn> = {};
    for (const [id, addon] of Object.entries(raw)) {
      map[id] = AddOnParser.parse(id, addon);
    }
    return map;
  }
}

class PricingParser {
  static parseOption(raw: RawPriceOption): PriceOption {
    return {
      id: raw.id,
      name: raw.name,
      price: raw.price,
      discount: raw.discount,
      final: raw.final,
    };
  }

  static parse(raw: RawPricing): Pricing {
    return {
      type: raw.type,
      options: raw.options.map(PricingParser.parseOption),
    };
  }
}

class ProductParser {
  static parse(raw: RawProduct, addOnMap: Record<string, AddOn>): Product {
    const resolveAddOns = (ids: string[] | null): AddOn[] =>
      (ids ?? [])
        .map((id) => addOnMap[id])
        .filter((a): a is AddOn => a !== undefined);

    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      image: raw.image,
      availability: raw.availability as Product["availability"],
      badge: raw.badge as BadgeKind | null, // ← was just raw.badge (string | null)
      pricing: PricingParser.parse(raw.pricing),
      addOns: resolveAddOns(raw.addOns),
      baristaWay: resolveAddOns(raw.baristaWay),
      oftenOrderedWith: [],
    };
  }

  static toRef(product: Product): ProductRef {
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      availability: product.availability,
      badge: product.badge,
      pricing: product.pricing,
    };
  }
}

class CategoryParser {
  static sort(products: Product[]): Product[] {
    return products.slice().sort((a, b) => {
      const rank = (badge: BadgeKind | null) =>
        badge !== null ? (BADGE_RANK[badge] ?? 2) : 2;
      return rank(a.badge) - rank(b.badge);
    });
  }

  static parse(raw: RawCategory, addOnMap: Record<string, AddOn>): Category {
    return {
      id: raw.id,
      name: raw.name,
      products: CategoryParser.sort(
        raw.products.map((p) => ProductParser.parse(p, addOnMap))
      ),
    };
  }
}

class PairingParser {
  static parse(raw: RawPairing, productMap: Record<string, Product>): Pairing {
    return {
      id: raw.id,
      items: raw.items
        .map((id) => productMap[id])
        .filter((p): p is Product => p !== undefined),
      pricing: raw.pricing,
    };
  }
}

export class MenuParser {
  static parse(raw: unknown): Menu {
    const data = raw as RawMenu;

    const addOnMap = AddOnParser.parseMap(data.addOns);

    const categories = data.categories.map((cat) =>
      CategoryParser.parse(cat, addOnMap)
    );

    const productMap: Record<string, Product> = {};
    for (const cat of categories) {
      for (const product of cat.products) {
        productMap[product.id] = product;
      }
    }

    for (const cat of data.categories) {
      for (const rawProduct of cat.products) {
        const product = productMap[rawProduct.id];
        if (!product) continue;
        product.oftenOrderedWith = rawProduct.oftenOrderedWith
          .map((id) => productMap[id])
          .filter((p): p is Product => p !== undefined)
          .map(ProductParser.toRef);
      }
    }

    const popup: Popup = data.popup;

    return {
      updatedAt: data.updatedAt,
      currency: data.currency,
      badges: data.badges,
      categories,
      signatures: data.signatures
        .map((id) => productMap[id])
        .filter((p): p is Product => p !== undefined),
      pairings: data.pairings.map((raw) =>
        PairingParser.parse(raw, productMap)
      ),
      popup,
      productMap,
      addOnMap,
    };
  }
}
