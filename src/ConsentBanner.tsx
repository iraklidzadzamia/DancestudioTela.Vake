import { useEffect, useState } from "react";
import { getConsentChoice, isGoogleMeasurementConfigured, updateGoogleConsent, type ConsentChoice } from "./analytics";
import type { Language } from "./content";

const consentCopy: Record<Language, { title: string; body: string; accept: string; necessary: string; settings: string }> = {
  EN: {
    title: "Your privacy, your choice",
    body: "With your permission, Google Analytics and Google Ads help us understand which pages and campaigns lead people to Tela.",
    accept: "Accept analytics",
    necessary: "Necessary only",
    settings: "Cookie settings",
  },
  KA: {
    title: "შენი კონფიდენციალურობა — შენი არჩევანი",
    body: "შენი თანხმობით Google Analytics და Google Ads გვეხმარება გავიგოთ, რომელი გვერდები და რეკლამები იზიდავს ადამიანებს „თელაში“.",
    accept: "ანალიტიკის დაშვება",
    necessary: "მხოლოდ აუცილებელი",
    settings: "ქუქიების პარამეტრები",
  },
  RU: {
    title: "Твоя конфиденциальность — твой выбор",
    body: "С твоего согласия Google Analytics и Google Ads помогают нам понять, какие страницы и объявления приводят людей в студию Tela.",
    accept: "Разрешить аналитику",
    necessary: "Только необходимые",
    settings: "Настройки файлов cookie",
  },
};

export const consentSettingsEvent = "tela:consent-settings";

export function openConsentSettings() {
  window.dispatchEvent(new Event(consentSettingsEvent));
}

export default function ConsentBanner({ language }: { language: Language }) {
  const [isOpen, setIsOpen] = useState(() => isGoogleMeasurementConfigured() && getConsentChoice() === null);
  const copy = consentCopy[language];

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(consentSettingsEvent, open);
    return () => window.removeEventListener(consentSettingsEvent, open);
  }, []);

  if (!isGoogleMeasurementConfigured() || !isOpen) return null;

  const choose = (choice: ConsentChoice) => {
    updateGoogleConsent(choice);
    setIsOpen(false);
  };

  return <aside className="consent-banner" aria-labelledby="consent-title" aria-live="polite">
    <div className="consent-copy"><strong id="consent-title">{copy.title}</strong><p>{copy.body}</p></div>
    <div className="consent-actions">
      <button className="consent-button consent-button-secondary" type="button" onClick={() => choose("denied")}>{copy.necessary}</button>
      <button className="consent-button consent-button-primary" type="button" onClick={() => choose("granted")}>{copy.accept}</button>
    </div>
  </aside>;
}

export function ConsentSettingsButton({ language }: { language: Language }) {
  if (!isGoogleMeasurementConfigured()) return null;
  return <button className="footer-consent" type="button" onClick={openConsentSettings}>{consentCopy[language].settings}</button>;
}
