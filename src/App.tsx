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

function SocialIcon({ channel }: { channel: string }) {
  if (channel === "Instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" />
        <circle cx="12" cy="12" r="4.1" />
        <circle className="social-icon-fill" cx="17.45" cy="6.65" r="1.05" />
      </svg>
    );
  }

  if (channel === "Facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path className="social-icon-fill" d="M13.65 21v-8h2.75l.42-3.1h-3.17V7.92c0-.9.25-1.5 1.58-1.5H17V3.65c-.31-.04-1.35-.13-2.56-.13-2.53 0-4.26 1.55-4.26 4.39V9.9H7.32V13h2.86v8h3.47Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.15 11.75a8.12 8.12 0 0 1-11.97 7.14L4 20l1.13-4.08a8.12 8.12 0 1 1 15.02-4.17Z" />
      <path d="M8.72 8.06c.2-.47.42-.48.72-.49h.61c.2 0 .39.07.49.34l.78 1.88c.09.22.05.41-.08.59l-.58.74c-.14.17-.19.33-.07.55.5.9 1.27 1.65 2.2 2.12.2.1.37.08.51-.09l.83-.96c.17-.2.37-.25.6-.16l1.78.83c.27.12.4.22.41.39.03.38-.17 1.16-.48 1.58-.44.59-1.23.94-1.96.93-1.22-.02-2.87-.65-4.5-2.1-1.33-1.19-2.24-2.65-2.42-3.84-.13-.88.21-1.74.46-2.18l.2-.17Z" />
    </svg>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(languageFromPath);
  const [activeSchedule, setActiveSchedule] = useState(scheduleGroups[0].id);
  const [showMobileBook, setShowMobileBook] = useState(false);
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

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBook(!entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
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
        <div className="hero-film" aria-label={copy.hero.media}>
          <div className="hero-film-surface" aria-hidden="true">
            <div className="hero-film-mark"><Logo /></div>
            <i />
          </div>
        </div>

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
            <div className="hero-socials" aria-label={copy.contact.channels}>
              {["Instagram", "Facebook", "WhatsApp"].map((channel) => (
                <span className="hero-social" key={channel} role="img" aria-label={channel}>
                  <SocialIcon channel={channel} />
                </span>
              ))}
            </div>
            <ul className="reassurance" aria-label="Beginner reassurance">
              {copy.hero.notes.map((note) => (
                <li key={note}><span aria-hidden="true">✦</span>{note}</li>
              ))}
            </ul>
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
            {copy.programs.items.map((program) => (
              <article className="program-entry" key={program.number}>
                <span className="program-number">{program.number}</span>
                <div className="program-copy">
                  <p>{program.tag}</p>
                  <h3>{program.title}</h3>
                  <span>{program.body}</span>
                </div>
                <div className="program-gesture" aria-hidden="true">
                  <i />
                  <span>↗</span>
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
                <span className="contact-channel" key={channel}>
                  <span className="contact-channel-name">
                    <span className="social-icon"><SocialIcon channel={channel} /></span>
                    {channel}
                  </span>
                  <i className="contact-channel-pending" aria-hidden="true" />
                </span>
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

      {showMobileBook && (
        <a className="mobile-book" href="#contact">{copy.hero.primary}<span aria-hidden="true">↗</span></a>
      )}
    </main>
  );
}
