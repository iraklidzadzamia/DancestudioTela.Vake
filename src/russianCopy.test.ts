import { describe, expect, it } from "vitest";
import { contactHref } from "./contacts";
import { siteCopy } from "./content";

describe("native Russian editorial copy", () => {
  const copy = siteCopy.RU;

  it("uses the approved informal hero and brand treatment", () => {
    expect(copy.pageTitle).toContain("студия Tela");
    expect(copy.hero.title).toBe("Найди свой");
    expect(copy.hero.body).toBe(
      "С 1970 года студия Tela помогает взрослым и детям открывать для себя мир танца. Сегодня в Ваке мы преподаём Ballroom & Latin, балет, грузинские танцы и женское танго.",
    );
    expect(copy.hero.primary).toBe("Выбери направление");
    expect(copy.hero.secondary).toBe("Запишись на бесплатный урок");
  });

  it("preserves the complete approved Pro-Am meaning", () => {
    expect(copy.proam.title).toBe("Ты — любитель. Твой преподаватель — профессионал и танцевальный партнёр.");
    expect(copy.proam.body).toBe(
      "Ты учишься вместе с преподавателем в комфортном для себя темпе по персональной программе — с подбором музыки, стиля и при необходимости сценического образа. Танцуй для себя, участвуй в закрытом вечере в студии вместе с друзьями, выступай на сцене или готовься к соревнованиям — выбор всегда остаётся за тобой.",
    );
    expect(copy.proam.points).toEqual([
      { number: "01", title: "Профессиональный партнёр", body: "Приходи без партнёра: преподаватель занимается с тобой и танцует в паре." },
      { number: "02", title: "Персональная программа", body: "Каждый урок подстраивается под твой опыт, уверенность и цели." },
      { number: "03", title: "Твоя цель", body: "Танцуй для себя, выступай на закрытом вечере или выходи на соревнования — любой путь остаётся твоим выбором." },
    ]);
  });

  it("uses the approved journey, program, schedule, and heritage language", () => {
    expect(copy.journey.steps[1].body).toBe("Познакомься с преподавателем, попробуй занятие и задай любые вопросы перед тем, как принять решение.");
    expect(copy.journey.steps[2].title).toBe("Внимательное обучение");
    expect(copy.journey.steps[3]).toEqual({
      number: "04",
      title: "Сделай танец частью жизни",
      body: "Наслаждайся еженедельным ритуалом, развивайся благодаря танцу и ставь новые цели только тогда, когда придёт время.",
    });
    expect(copy.programs.items[0].body).toContain("уверенность в парном танце");
    expect(copy.programs.items[1].title).toBe("Женское танго");
    expect(copy.programs.items[3].body).toBe("Почувствуй грузинский ритм, традиции и силу совместного движения.");
    expect(copy.programs.items[5].body).toBe("Занятия с учётом возраста для развития осанки, координации, воображения и техники.");
    expect(copy.schedule.title).toBe("Найди своё время для танца.");
    expect(copy.heritage.note).toBe("Более чем полувековая танцевальная традиция продолжается в студии и сегодня.");
  });

  it("uses natural FAQ, contact, and footer copy", () => {
    expect(copy.faq.items[1].question).toBe("Что делать, если совсем нет опыта в танцах?");
    expect(copy.faq.items[4].answer).toBe(
      "Нет. Выступления и соревнования доступны только в некоторых направлениях и всегда остаются добровольными. Танцевать ради удовольствия, движения и уверенности — это полноценная цель.",
    );
    expect(copy.faq.items[6].answer).toContain("студии Tela");
    expect(copy.contact.title).toBe("Поможем сделать твой первый шаг.");
    expect(copy.footer.studio).toBe("Танцевальная студия Tela, Ваке");
  });

  it("contains no rejected formal, English-program, or Cyrillic-brand variants", () => {
    const serialized = JSON.stringify(copy);
    for (const rejected of [
      "Найдите", "Выберите", "Начните", "Расскажите", "Познакомьтесь", "Развивайте", "Наслаждайтесь",
      "Свяжитесь", "Приходите", "Оставайтесь", "Women’s Tango", "DanceStudio Tela Vake", "«Тела»", "«Телы»", "«Теле»",
    ]) {
      expect(serialized).not.toContain(rejected);
    }
  });

  it("prefills WhatsApp with the approved concise message", () => {
    expect(new URL(contactHref("WhatsApp", "RU")).searchParams.get("text")).toBe(
      "Здравствуйте! Хочу записаться на первый бесплатный урок.",
    );
  });
});
