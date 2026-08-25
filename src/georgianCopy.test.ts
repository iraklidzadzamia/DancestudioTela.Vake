import { describe, expect, it } from "vitest";
import { contactHref } from "./contacts";
import { siteCopy } from "./content";

describe("native Georgian editorial copy", () => {
  const copy = siteCopy.KA;

  it("uses natural lesson registration and program terminology", () => {
    expect(copy.bookShort).toBe("ჩაწერა");
    expect(copy.hero.primary).toBe("აირჩიე მიმართულება");
    expect(copy.hero.secondary).toBe("ჩაეწერე პირველ უფასო გაკვეთილზე");
    expect(copy.programs.items[1].title).toBe("ქალთა ტანგო");
    expect(copy.programs.items[1].body).toContain("სხეულის სწორად დაჭერისა");
    expect(copy.programs.items[5].body).toContain("სხეულის სწორად დაჭერის");
    expect(JSON.stringify(copy)).not.toContain("დაჯავშ");
    expect(JSON.stringify(copy)).not.toContain("ქალების ტანგ");
  });

  it("keeps the Pro-Am meaning and one consistent form of address", () => {
    expect(copy.proam.body).toBe(
      "სწავლობ ინსტრუქტორთან ერთად, შენს ტემპში და შენზე მორგებული პერსონალური პროგრამით — მუსიკის, სტილისა და, საჭიროებისამებრ, სასცენო იმიჯის შერჩევით. შეგიძლია იცეკვო საკუთარი სიამოვნებისთვის, მეგობრებთან ერთად დახურულ საღამოზე გამოხვიდე ან შეჯიბრებამდე მიხვიდე — არჩევანი ყოველთვის შენია.",
    );
    expect(copy.proam.points[2]).toEqual({
      number: "03",
      title: "შენი საცეკვაო მიზანი",
      body: "იცეკვე საკუთარი თავისთვის, მიიღე მონაწილეობა დახურულ საღამოში, გამოდი სცენაზე ან იასპარეზე — ყველა ეს გზა შენი არჩევანია.",
    });
    expect(JSON.stringify(copy)).not.toContain("სწავლობთ");
  });

  it("uses natural Georgian phrasing in the journey, schedule, and FAQ", () => {
    expect(copy.journey.kicker).toBe("დასაწყისი „თელაში“");
    expect(copy.journey.steps[3].title).toBe("აქციე ცეკვა შენს ნაწილად");
    expect(copy.schedule.teachers).toBe("პედაგოგი:");
    expect(copy.faq.items[3].answer).toContain("დამოუკიდებლად არჩევა არ გჭირდება");
    expect(copy.faq.items[4].answer).toContain("გარკვეული მიმართულებების შესაძლებლობაა");
  });

  it("uses Georgian brand forms in prose but keeps standalone brand labels", () => {
    expect(copy.hero.eyebrow).toContain("TELA");
    expect(copy.intro.kicker).toContain("Tela");
    expect(copy.hero.body).toContain("„თელა“");
    expect(copy.intro.body).toContain("„თელას“");
    expect(copy.heritage.body).toContain("„თელას“");
    expect(copy.hero.media).toContain("სტუდია „თელას“");
    expect(copy.hero.body).not.toContain("Tela ");
    expect(copy.intro.body).not.toContain("Tela-ს");
    expect(copy.heritage.body).not.toContain("Tela-ს");
    expect(copy.faq.items[6].answer).not.toContain("DanceStudio Tela");
  });

  it("prefills WhatsApp with the final conversational Georgian message", () => {
    const href = contactHref("WhatsApp", "KA");
    expect(new URL(href).searchParams.get("text")).toBe("გამარჯობა! მინდა პირველ უფასო გაკვეთილზე ჩავეწერო.");
  });
});
