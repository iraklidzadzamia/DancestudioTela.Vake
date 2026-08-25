import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  bookingContactChannels,
  contactHref,
  heroContactChannels,
  sectionContactChannels,
} from "./contacts";

describe("temporary WhatsApp availability", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("hides WhatsApp from rendered channel lists without deleting its integration", () => {
    const contacts = readFileSync("src/contacts.ts", "utf8");

    expect(contacts).toContain("export const WHATSAPP_ENABLED = false;");
    expect(heroContactChannels).not.toContain("WhatsApp");
    expect(bookingContactChannels).not.toContain("WhatsApp");
    expect(sectionContactChannels).not.toContain("WhatsApp");
    expect(contactHref("WhatsApp", "RU")).toContain("https://wa.me/");
  });

  it("keeps the GA4 event and click-tracking path ready for restoration", () => {
    const analytics = readFileSync("src/analytics.ts", "utf8");
    const app = readFileSync("src/App.tsx", "utf8");

    expect(analytics).toContain('WhatsApp: "contact_whatsapp"');
    expect(app).toMatch(/trackContactIntent\(channel, "hero", language\)/);
    expect(app).toMatch(/trackContactIntent\(channel, "booking_modal", language/);
    expect(app).toMatch(/trackContactIntent\(channel, "contact_section", language\)/);
  });

  it("still maps a restored WhatsApp click to the existing GA4 event", async () => {
    vi.resetModules();
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TEST");
    window.history.replaceState({}, "", "/en/");
    const gtag = vi.fn();
    window.gtag = gtag;

    const { trackContactIntent } = await import("./analytics");
    trackContactIntent("WhatsApp", "booking_modal", "RU", "hero");

    expect(gtag).toHaveBeenCalledWith("event", "contact_whatsapp", {
      contact_channel: "whatsapp",
      placement: "booking_modal",
      booking_source: "hero",
      page_path: "/en/",
      language: "ru",
      transport_type: "beacon",
    });
  });
});
