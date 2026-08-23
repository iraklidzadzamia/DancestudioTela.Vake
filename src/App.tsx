import { useEffect, useState } from "react";
import { scheduleGroups, siteCopy, type Language } from "./content";

const languagePath: Record<Language, string> = {
  EN: "/en/",
  KA: "/ka/",
  RU: "/ru/",
};

const siteOrigin = "https://dancestudio-tela-vake.vercel.app";

function updateMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

function languageFromPath(): Language {
  const segment = window.location.pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (segment === "ka") return "KA";
  if (segment === "ru") return "RU";
  return "EN";
}

function Logo({ full = false }: { full?: boolean }) {
  return (
    <span className={full ? "logo-full" : "logo-crop"} aria-hidden="true">
      <img src="/tela-logo.png" alt="" />
    </span>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`section-label${light ? " section-label-light" : ""}`}>{children}</p>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>(languageFromPath);
  const [activeSchedule, setActiveSchedule] = useState(scheduleGroups[0].id);
  const copy = siteCopy[language];
  const selectedSchedule = scheduleGroups.find((group) => group.id === activeSchedule) ?? scheduleGroups[0];

  useEffect(() => {
    document.documentElement.lang = copy.languageCode;
    document.title = copy.pageTitle;
    const canonicalUrl = `${siteOrigin}${languagePath[language]}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    updateMeta('meta[name="description"]', copy.pageDescription);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[property="og:title"]', copy.pageTitle);
    updateMeta('meta[property="og:description"]', copy.pageDescription);
    updateMeta('meta[name="twitter:title"]', copy.pageTitle);
    updateMeta('meta[name="twitter:description"]', copy.pageDescription);
  }, [copy, language]);

  useEffect(() => {
    const syncLanguage = () => setLanguage(languageFromPath());
    window.addEventListener("popstate", syncLanguage);
    return () => window.removeEventListener("popstate", syncLanguage);
  }, []);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.history.pushState({}, "", languagePath[nextLanguage]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={`site-shell language-${language.toLowerCase()}`}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-material" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

        <header className="header">
          <a className="brand" href="#top" aria-label={copy.footer.studio}>
            <Logo />
            <span className="brand-type">
              <strong>Tela</strong>
              <small>DanceStudio · Vake</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {copy.nav.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="language-switcher" aria-label="Language">
              {(["EN", "KA", "RU"] as Language[]).map((item) => (
                <button
                  className={language === item ? "is-active" : ""}
                  key={item}
                  onClick={() => changeLanguage(item)}
                  type="button"
                  aria-pressed={language === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <a className="header-cta" href="#contact">{copy.bookShort}</a>
          </div>
        </header>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="hero-title">
              {copy.hero.title}
              <em>{copy.hero.accent}</em>
            </h1>
            <p className="hero-body">{copy.hero.body}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                {copy.hero.primary}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#contact">
                {copy.hero.secondary}
              </a>
            </div>
            <ul className="reassurance" aria-label="Beginner reassurance">
              {copy.hero.notes.map((note) => (
                <li key={note}><span aria-hidden="true">✦</span>{note}</li>
              ))}
            </ul>
          </div>

          <div className="hero-stage" aria-label={copy.hero.media}>
            <div className="stage-frame">
              <div className="stage-glow" aria-hidden="true" />
              <div className="stage-monogram"><Logo /></div>
              <p>{copy.hero.media}</p>
            </div>
            <div className="stage-caption">
              <span>01</span>
              <p>Movement<br />Presence<br />Possibility</p>
            </div>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to discover</span>
          <i />
        </div>
      </section>

      <section className="intro section-light" aria-labelledby="intro-title">
        <div className="section-wrap intro-grid">
          <SectionLabel>{copy.intro.kicker}</SectionLabel>
          <div className="intro-copy">
            <h2 id="intro-title">{copy.intro.title}</h2>
            <p>{copy.intro.body}</p>
          </div>
          <div className="intro-mark" aria-hidden="true">
            <span>TV</span>
            <i />
          </div>
        </div>
      </section>

      <section className="proam section-plum" id="proam" aria-labelledby="proam-title">
        <div className="proam-type" aria-hidden="true">
          <span>PRO</span>
          <i />
          <span>AM</span>
        </div>
        <div className="section-wrap proam-grid">
          <div className="proam-heading">
            <SectionLabel light>{copy.proam.kicker}</SectionLabel>
            <h2 id="proam-title">{copy.proam.title}</h2>
            <p>{copy.proam.body}</p>
          </div>
          <div className="proam-points">
            {copy.proam.points.map((point) => (
              <article className="proam-point" key={point.number}>
                <span>{point.number}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="proam-aside">
            <span>“</span>
            <p>{copy.proam.aside}</p>
          </aside>
        </div>
      </section>

      <div className="benefit-ribbon" aria-label={copy.benefits.join(", ")}>
        <div>
          {[...copy.benefits, ...copy.benefits].map((benefit, index) => (
            <span key={`${benefit}-${index}`}>{benefit}<i aria-hidden="true">✦</i></span>
          ))}
        </div>
      </div>

      <section className="journey section-dark" aria-labelledby="journey-title">
        <div className="section-wrap">
          <div className="section-heading-row">
            <div>
              <SectionLabel light>{copy.journey.kicker}</SectionLabel>
              <h2 id="journey-title">{copy.journey.title}</h2>
            </div>
            <p>{copy.journey.body}</p>
          </div>
          <div className="journey-grid">
            {copy.journey.steps.map((step, index) => (
              <article className="journey-card" key={step.number}>
                <div className="journey-number">{step.number}</div>
                <div className="journey-line" aria-hidden="true"><i /></div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="journey-arrow" aria-hidden="true">{index < copy.journey.steps.length - 1 ? "↘" : "✦"}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="programs section-light" id="programs" aria-labelledby="programs-title">
        <div className="section-wrap">
          <div className="section-heading-row section-heading-dark">
            <div>
              <SectionLabel>{copy.programs.kicker}</SectionLabel>
              <h2 id="programs-title">{copy.programs.title}</h2>
            </div>
            <p>{copy.programs.body}</p>
          </div>
          <div className="program-grid">
            {copy.programs.items.map((program, index) => (
              <article className={`program-card program-card-${index + 1}`} key={program.number}>
                <div className="program-art" aria-hidden="true">
                  <span>{program.number}</span>
                  <i />
                </div>
                <div className="program-copy">
                  <p>{program.tag}</p>
                  <h3>{program.title}</h3>
                  <span>{program.body}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="schedule-section section-sand" id="schedule" aria-labelledby="schedule-title">
        <div className="section-wrap">
          <div className="schedule-header">
            <div>
              <SectionLabel>{copy.schedule.kicker}</SectionLabel>
              <h2 id="schedule-title">{copy.schedule.title}</h2>
            </div>
            <div className="schedule-header-copy">
              <p>{copy.schedule.body}</p>
              <span>{copy.schedule.draft}</span>
            </div>
          </div>

          <div className="schedule-layout">
            <div className="schedule-tabs" role="tablist" aria-label={copy.schedule.title}>
              {scheduleGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSchedule === group.id}
                  className={activeSchedule === group.id ? "is-active" : ""}
                  onClick={() => setActiveSchedule(group.id)}
                >
                  <span>{group.label[language]}</span>
                  <i aria-hidden="true">{activeSchedule === group.id ? "●" : "○"}</i>
                </button>
              ))}
            </div>

            <div className="schedule-panel" role="tabpanel">
              <div className="schedule-panel-title">
                <span>{selectedSchedule.label[language]}</span>
                <i>{String(selectedSchedule.classes.length).padStart(2, "0")}</i>
              </div>
              <div className="class-list">
                {selectedSchedule.classes.map((item, index) => (
                  <article className="class-row" key={`${item.time}-${item.title}-${index}`}>
                    <time>{item.time}</time>
                    <div>
                      <h3>{item.title}</h3>
                      {item.teachers && <p>{copy.schedule.teachers} {item.teachers}</p>}
                    </div>
                    <span aria-hidden="true">↗</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="heritage section-dark" id="story" aria-labelledby="heritage-title">
        <div className="heritage-arc" aria-hidden="true" />
        <div className="section-wrap heritage-grid">
          <div className="heritage-logo"><Logo full /></div>
          <div className="heritage-copy">
            <SectionLabel light>{copy.heritage.kicker}</SectionLabel>
            <h2 id="heritage-title">{copy.heritage.title}</h2>
            <p>{copy.heritage.body}</p>
            <small>{copy.heritage.note}</small>
          </div>
          <div className="heritage-year" aria-label={`Since ${copy.heritage.year}`}>
            <span>Since</span>
            <strong>{copy.heritage.year}</strong>
          </div>
        </div>
      </section>

      <section className="faq section-light" aria-labelledby="faq-title">
        <div className="section-wrap faq-grid">
          <div className="faq-heading">
            <SectionLabel>{copy.faq.kicker}</SectionLabel>
            <h2 id="faq-title">{copy.faq.title}</h2>
          </div>
          <div className="faq-list">
            {copy.faq.items.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-glow" aria-hidden="true" />
        <div className="section-wrap contact-grid">
          <div>
            <SectionLabel light>{copy.contact.kicker}</SectionLabel>
            <h2 id="contact-title">{copy.contact.title}</h2>
          </div>
          <div className="contact-action">
            <p>{copy.contact.body}</p>
            <div className="contact-channels" aria-label={copy.contact.channels}>
              {copy.contact.channels.split(" · ").map((channel) => (
                <span key={channel}>{channel}<i aria-hidden="true">↗</i></span>
              ))}
            </div>
            <small>{copy.contact.pending}</small>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="section-wrap footer-grid">
          <div className="footer-brand"><Logo /><strong>{copy.footer.studio}</strong></div>
          <p>{copy.footer.location}</p>
          <p>© {new Date().getFullYear()} · {copy.footer.rights}</p>
        </div>
      </footer>

      <a className="mobile-book" href="#contact">{copy.hero.primary}<span aria-hidden="true">↗</span></a>
    </main>
  );
}
