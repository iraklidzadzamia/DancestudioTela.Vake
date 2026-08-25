import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./analytics", () => ({
  getConsentChoice: () => null,
  isGoogleMeasurementConfigured: () => true,
  updateGoogleConsent: vi.fn(),
}));

import ConsentBanner from "./ConsentBanner";

describe("Georgian consent copy", () => {
  afterEach(cleanup);

  it("uses informal address and permission language", () => {
    const { getByRole, getByText } = render(<ConsentBanner language="KA" />);

    expect(getByText("შენი კონფიდენციალურობა — შენი არჩევანი")).toBeInTheDocument();
    expect(getByText(/შენი თანხმობით/)).toHaveTextContent("„თელაში“");
    expect(getByRole("button", { name: "ანალიტიკის დაშვება" })).toBeInTheDocument();
  });

  it("uses the approved informal Russian cookie terminology", () => {
    const { getByRole, getByText } = render(<ConsentBanner language="RU" />);

    expect(getByText("Твоя конфиденциальность — твой выбор")).toBeInTheDocument();
    expect(getByText(/С твоего согласия/)).toHaveTextContent("студию Tela");
    expect(getByRole("button", { name: "Разрешить аналитику" })).toBeInTheDocument();
  });
});
