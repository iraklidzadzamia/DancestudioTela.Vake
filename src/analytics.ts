import type { Language } from "./content";

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
const gaMeasurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim();
const googleAdsId = (import.meta.env.VITE_GOOGLE_ADS_ID ?? "").trim();
const googleAdsLeadLabel = (import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL ?? "").trim();
const configuredTagIds = [...new Set([gaMeasurementId, googleAdsId].filter(Boolean))];

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

export function trackBeginLead(location: string, language: Language) {
  trackEvent("begin_lead", { location, language: language.toLowerCase() });
}

export function trackContactChannel(channel: string, language: Language) {
  const method = channel.toLowerCase();
  trackEvent("contact_channel_click", { method, language: language.toLowerCase() });

  if (channel !== "WhatsApp" && channel !== "Phone") return;
  trackEvent("generate_lead", { method, language: language.toLowerCase() });

  if (googleAdsId && googleAdsLeadLabel) {
    ensureGtag()("event", "conversion", {
      send_to: `${googleAdsId}/${googleAdsLeadLabel}`,
      transport_type: "beacon",
    });
  }
}

export function trackLeadForm(language: Language) {
  trackEvent("generate_lead", { method: "website_form", language: language.toLowerCase() });
}
