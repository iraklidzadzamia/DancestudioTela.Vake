import type { Language } from "./content";

export type ContactChannel = "Google Maps" | "Instagram" | "Facebook" | "WhatsApp" | "Phone";
export type ContactPlacement = "hero" | "contact_section" | "booking_modal";

const defaultInstagramDirect = "https://ig.me/m/dancestudiotela.vake";
const defaultFacebookMessenger = "https://m.me/Dancestudiotelavake";
const defaultGoogleMaps = "https://maps.app.goo.gl/5v5F8D6VXWXjL9tk7";
const defaultPhoneNumber = "995505051614";

const instagramDirect = optionalPublicUrl(import.meta.env.VITE_INSTAGRAM_DM_URL) ?? defaultInstagramDirect;
const facebookMessenger = optionalPublicUrl(import.meta.env.VITE_FACEBOOK_MESSENGER_URL) ?? defaultFacebookMessenger;
const googleMaps = optionalPublicUrl(import.meta.env.VITE_GOOGLE_MAPS_URL) ?? defaultGoogleMaps;
const whatsappNumber = normalizedPhone(import.meta.env.VITE_WHATSAPP_NUMBER) ?? defaultPhoneNumber;
const phoneNumber = normalizedPhone(import.meta.env.VITE_PHONE_NUMBER) ?? defaultPhoneNumber;

const whatsappMessages: Record<Language, string> = {
  EN: "Hello! I’d like to book a free first lesson at Dance Studio Tela.",
  KA: "გამარჯობა! მინდა პირველ უფასო გაკვეთილზე ჩავეწერო.",
  RU: "Здравствуйте! Хочу записаться на первый бесплатный урок.",
};

const optionalFacebook: ContactChannel[] = facebookMessenger ? ["Facebook"] : [];
export const heroContactChannels: ContactChannel[] = ["Google Maps", "Instagram", ...optionalFacebook, "WhatsApp"];
export const bookingContactChannels: ContactChannel[] = ["WhatsApp", "Instagram", ...optionalFacebook, "Phone"];
export const sectionContactChannels: ContactChannel[] = ["Google Maps", "Instagram", ...optionalFacebook, "WhatsApp", "Phone"];

function optionalPublicUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function normalizedPhone(value: string | undefined) {
  if (!value) return undefined;
  const normalized = value.replace(/\D/g, "");
  return /^\d{7,15}$/.test(normalized) ? normalized : undefined;
}

export function contactHref(channel: ContactChannel, language: Language) {
  if (channel === "Google Maps") return googleMaps;
  if (channel === "Instagram") return instagramDirect;
  if (channel === "Facebook") return facebookMessenger;
  if (channel === "WhatsApp") return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessages[language])}`;
  return `tel:+${phoneNumber}`;
}

export function opensOutsidePage(channel: ContactChannel) {
  return channel !== "Phone";
}

export function formattedPhoneNumber() {
  return "+995 505 05 16 14";
}
