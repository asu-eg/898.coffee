export interface RawName {
  en: string;
  ar: string;
}

export interface RawAddOn {
  name: RawName;
  price: number;
}

export interface RawPriceOption {
  id: string;
  name: RawName | null;
  price: number;
  discount: number;
  final: number;
}

export interface RawPricing {
  type: "single" | "sizes";
  options: RawPriceOption[];
}

export interface RawProduct {
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

export interface RawCategory {
  id: string;
  name: RawName;
  products: RawProduct[];
}

export interface RawPairing {
  id: string;
  items: string[];
  pricing: { price: number; discount: number; final: number };
}

export interface RawMenuResponse {
  ok: true;
  updatedAt: string;
  currency: string;
  badges: string[];
  addOns: Record<string, RawAddOn>;
  categories: RawCategory[];
  signatures: string[];
  pairings: RawPairing[];
  popup: { enabled: boolean; image: string | null; delaySeconds: number };
}

export type MenuError = "server" | "timeout" | "network" | "unknown";
