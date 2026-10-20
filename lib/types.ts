export interface Product { id: string; name: string; kva: string; price: number; image_url: string; link_url: string; specs: string; sort: number; }
export type Settings = Record<string, string>;
export const ADMIN_PASSWORD = "samuel2026";
export const DEFAULT_SETTINGS: Settings = {
  brand_name: "Donaben Limited", brand_sub: "Authorized Fawde Dealer",
  hero_title: "Fawde Diesel Generator",
  hero_tagline: "Powering Progress — Donaben Limited, the authorized Fawde generator dealer in Nigeria.",
  hero_intro: "We supply reliable Fawde diesel generators for homes, businesses and industry across Nigeria, with genuine units, expert advice and dependable after-sales support.",
  catalog_title: "Our Generators", catalog_intro: "Choose a model, then request a quote.",
  whatsapp_number: "2340000000000", facebook_url: "https://facebook.com/", youtube_url: "https://youtube.com/",
  fawde_url: "https://www.fawde.com/", fawde_label: "Visit FAWDE Page for Details",
  footer_text: "2026 Donaben International Resources Limited. All rights reserved.",
  addresses: "Shop: Add your shop address here\nOffice: Add your office address here",
  modal_title: "Contact and Order Form", quote_button: "Request a Quote",
};
export const naira = (n: number) => "₦" + Number(n || 0).toLocaleString("en-NG");
