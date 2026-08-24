import type { Language } from "./content";
import type { ContactChannel } from "./contacts";

export type ConsentChoice = "granted" | "denied";
type EventParameters = Record<string, string | number | boolean | undefined>;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag?: Gtag;
  }
}

const consentStorageKey = "tela_google_consent_v1";
const productionGaMeasurementId = "G-YZREYM9M7W";
const gaMeasurementId = (
  import.meta.env.VITE_GA_MEASUREMENT_ID
  ?? (import.meta.env.PROD ? productionGaMeasurementId : "")
).trim();
const googleAdsId = (import.meta.env.VITE_GOOGLE_ADS_ID ?? "").trim();
const configuredTagIds = [...new Set([gaMeasurementId, googleAdsId].filter(Boolean))];
const contactEventNames: Record<ContactChannel, string> = {
  "Google Maps": "get_directions",
  Instagram: "contact_instagram",
  Facebook: "contact_facebook",
  WhatsApp: "contact_whatsapp",
  Phone: "contact_phone",
};

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(..._args: unknown[]) { window.dataLayer.push(arguments); };
  return window.gtag;
}

function consentParameters(choice: ConsentChoice) {
  return {
    ad_storage: choice,
    analytics_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  };
}

export function isGoogleMeasurementConfigured() {
  return configuredTagIds.length > 0;
}

export function getConsentChoice(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(consentStorageKey);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

export function updateGoogleConsent(choice: ConsentChoice) {
  try { window.localStorage.setItem(consentStorageKey, choice); } catch { /* Storage may be unavailable. */ }
  if (!isGoogleMeasurementConfigured()) return;
  ensureGtag()("consent", "update", consentParameters(choice));
}

export function initializeGoogleMeasurement() {
  if (!isGoogleMeasurementConfigured() || document.getElementById("tela-google-tag")) return;

  const gtag = ensureGtag();
  gtag("consent", "default", {
    ...consentParameters("denied"),
    functionality_storage: "granted",
    security_storage: "granted",
  });

  const savedChoice = getConsentChoice();
  if (savedChoice) gtag("consent", "update", consentParameters(savedChoice));

  gtag("js", new Date());
  configuredTagIds.forEach((tagId) => {
    gtag("config", tagId, tagId === gaMeasurementId ? { send_page_view: false } : {});
  });

  const script = document.createElement("script");
  script.id = "tela-google-tag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(configuredTagIds[0])}`;
  document.head.appendChild(script);
}

function trackEvent(name: string, parameters: EventParameters = {}) {
  if (!isGoogleMeasurementConfigured()) return;
  ensureGtag()("event", name, parameters);
}

export function trackPageView(path: string, title: string, language: Language) {
  if (!gaMeasurementId) return;
  trackEvent("page_view", {
    send_to: gaMeasurementId,
    page_path: path,
    page_location: window.location.href,
    page_title: title,
    language: language.toLowerCase(),
  });
}

export function trackBookingModalOpen(location: string, language: Language) {
  trackEvent("booking_modal_open", {
    placement: location,
    page_path: window.location.pathname,
    language: language.toLowerCase(),
  });
}

export function trackContactIntent(channel: ContactChannel, placement: string, language: Language, bookingSource?: string) {
  trackEvent(contactEventNames[channel], {
    contact_channel: channel.toLowerCase().replace(" ", "_"),
    placement,
    booking_source: bookingSource,
    page_path: window.location.pathname,
    language: language.toLowerCase(),
    transport_type: "beacon",
  });
}

export function trackLeadForm(language: Language) {
  trackEvent("generate_lead", { method: "website_form", language: language.toLowerCase() });
}

export function trackScrollDepth(percent: number, language: Language) {
  trackEvent("scroll_depth", {
    percent_scrolled: percent,
    page_path: window.location.pathname,
    language: language.toLowerCase(),
  });
}

export function trackSectionView(section: string, language: Language) {
  trackEvent("section_view", {
    section_name: section,
    page_path: window.location.pathname,
    language: language.toLowerCase(),
  });
}
