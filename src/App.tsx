import { useEffect, useState } from "react";
import { scheduleGroups, siteCopy, type Language, type SiteCopy } from "./content";

const languagePath: Record<Language, string> = { EN: "/en/", KA: "/ka/", RU: "/ru/" };
const siteOrigin = "https://dancestudio-tela-vake.vercel.app";
const programSlugs: Record<string, string> = {
  "01": "ballroom-latin", "02": "womens-tango", "03": "ballet", "04": "georgian-dance",
  "05": "ballroom-latin", "06": "ballet", "07": "georgian-dance",
};
type Program = SiteCopy["programs"]["items"][number];

const interfaceCopy: Record<Language, {
  skip: string; audienceKicker: string; audienceTitle: string; audienceBody: string; viewProgram: string;
  adultsNote: string; childrenNote: string; adultFilm: string; childFilm: string; filmReserved: string;
  insideKicker: string; insideTitle: string; insideBody: string; kidsKicker: string; kidsTitle: string;
  kidsBody: string; proamLink: string; storyLink: string; closingKicker: string; closingTitle: string;
  closingBody: string; back: string; programFor: string; whoTitle: string; whoBodyAdult: string;
  whoBodyChild: string; lessonTitle: string; lessonBody: string; practicalTitle: string; practicalBody: string;
  related: string; scheduleLink: string;
}> = {
  EN: {
    skip: "Skip to programs", audienceKicker: "Find your way in", audienceTitle: "Who are you choosing for?",
    audienceBody: "Start with the person, then discover the direction. No dance vocabulary required.",
    viewProgram: "Discover this program", adultsNote: "Movement, confidence and a new part of your life.",
    childrenNote: "Technique, imagination and the joy of growing through movement.", adultFilm: "Real movement at Tela",
    childFilm: "Careful teaching for young dancers", filmReserved: "Reserved for your portrait studio film",
    insideKicker: "Inside Tela", insideTitle: "Learning that feels personal. Progress you can feel.",
    insideBody: "The right class is more than a list of steps. It is attention, music, a welcoming room and the moment your body begins to understand.",
    kidsKicker: "For young dancers", kidsTitle: "Confidence begins with being seen.",
    kidsBody: "Children learn through age-appropriate guidance, clear corrections and the pleasure of moving together — in Ballroom & Latin, ballet and Georgian dance.",
    proamLink: "Explore Pro-Am", storyLink: "Our story", closingKicker: "Life at Tela",
    closingTitle: "The best reason to dance is how it makes you feel.",
    closingBody: "The final film will hold the spontaneous, funny and human side of the studio — the feeling people remember after class.",
    back: "Back to all programs", programFor: "Program for", whoTitle: "Who this is for",
    whoBodyAdult: "For adults who want to move beautifully, learn with attention and begin at a level that feels comfortable.",
    whoBodyChild: "For children who are ready to discover rhythm, coordination and confidence with thoughtful guidance.",
    lessonTitle: "What the first lesson gives you", lessonBody: "You meet the teaching style, try the movement and understand whether this direction feels right. The first lesson is free.",
    practicalTitle: "Practical details", practicalBody: "Exact group level, teacher and age information is being confirmed. We will help you choose the right group before your visit.",
    related: "You may also like", scheduleLink: "See the studio timetable",
  },
  KA: {
    skip: "პროგრამებზე გადასვლა", audienceKicker: "იპოვე შენი გზა", audienceTitle: "ვისთვის ირჩევ?",
    audienceBody: "დაიწყე ადამიანით და შემდეგ აღმოაჩინე მიმართულება — საცეკვაო ტერმინების ცოდნა არ არის საჭირო.",
    viewProgram: "გაიგე მეტი პროგრამის შესახებ", adultsNote: "მოძრაობა, თავდაჯერება და ცხოვრების ახალი ნაწილი.",
    childrenNote: "ტექნიკა, წარმოსახვა და მოძრაობით ზრდის სიხარული.", adultFilm: "ნამდვილი მოძრაობა Tela-ში",
    childFilm: "ყურადღებიანი სწავლება პატარა მოცეკვავეებისთვის", filmReserved: "ადგილი თქვენი ვერტიკალური ვიდეოსთვის",
    insideKicker: "Tela-ს შიგნით", insideTitle: "პერსონალური სწავლება. პროგრესი, რომელსაც გრძნობ.",
    insideBody: "სწორი გაკვეთილი ნაბიჯების სია არ არის. ეს არის ყურადღება, მუსიკა, მეგობრული გარემო და მომენტი, როცა სხეული მოძრაობას იგებს.",
    kidsKicker: "პატარა მოცეკვავეებისთვის", kidsTitle: "თავდაჯერება იწყება ყურადღებით.",
    kidsBody: "ბავშვები ასაკზე მორგებული მითითებებით, მკაფიო შესწორებებითა და ერთად მოძრაობის სიხარულით სწავლობენ — Ballroom & Latin-ს, ბალეტსა და ქართულ ცეკვას.",
    proamLink: "გაეცანი Pro-Am-ს", storyLink: "ჩვენი ისტორია", closingKicker: "ცხოვრება Tela-ში",
    closingTitle: "ცეკვის საუკეთესო მიზეზი ის გრძნობაა, რომელსაც ის გაძლევს.",
    closingBody: "ფინალური ვიდეო აჩვენებს სტუდიის სპონტანურ, მხიარულ და ადამიანურ მხარეს — ემოციას, რომელიც გაკვეთილის შემდეგ რჩება.",
    back: "ყველა პროგრამაზე დაბრუნება", programFor: "პროგრამა", whoTitle: "ვისთვის არის",
    whoBodyAdult: "ზრდასრულებისთვის, ვისაც სურს ლამაზად მოძრაობა, ყურადღებით სწავლა და კომფორტული დონიდან დაწყება.",
    whoBodyChild: "ბავშვებისთვის, რომლებიც მზად არიან გააცნობიერონ რიტმი, კოორდინაცია და თავდაჯერება ყურადღებიანი სწავლებით.",
    lessonTitle: "რას გაძლევს პირველი გაკვეთილი", lessonBody: "გაიცნობ სწავლების სტილს, მოსინჯავ მოძრაობას და გაიგებ, შეგეფერება თუ არა ეს მიმართულება. პირველი გაკვეთილი უფასოა.",
    practicalTitle: "პრაქტიკული ინფორმაცია", practicalBody: "ჯგუფის დონე, პედაგოგი და ასაკი ზუსტდება. ვიზიტამდე სწორი ჯგუფის შერჩევაში დაგეხმარებით.",
    related: "შეიძლება ასევე მოგეწონოს", scheduleLink: "სტუდიის განრიგის ნახვა",
  },
  RU: {
    skip: "Перейти к направлениям", audienceKicker: "Найдите свой путь", audienceTitle: "Для кого вы выбираете?",
    audienceBody: "Начните с человека, а затем найдите направление. Разбираться в танцевальных терминах не нужно.",
    viewProgram: "Подробнее о направлении", adultsNote: "Движение, уверенность и новая часть вашей жизни.",
    childrenNote: "Техника, воображение и радость взросления через движение.", adultFilm: "Настоящее движение в Tela",
    childFilm: "Внимательное обучение маленьких танцоров", filmReserved: "Место для вашего вертикального видео",
    insideKicker: "Внутри Tela", insideTitle: "Обучение с личным вниманием. Прогресс, который ощущается.",
    insideBody: "Правильное занятие — больше, чем набор шагов. Это внимание, музыка, тёплая атмосфера и момент, когда тело начинает понимать движение.",
    kidsKicker: "Для юных танцоров", kidsTitle: "Уверенность начинается с внимания.",
    kidsBody: "Дети учатся через понятные объяснения, бережные корректировки и удовольствие от совместного движения — в Ballroom & Latin, балете и грузинских танцах.",
    proamLink: "Открыть Pro-Am", storyLink: "Наша история", closingKicker: "Жизнь в Tela",
    closingTitle: "Лучшая причина танцевать — то, как вы себя чувствуете.",
    closingBody: "Финальное видео покажет спонтанную, смешную и человеческую сторону студии — эмоцию, которая остаётся после занятия.",
    back: "Вернуться ко всем направлениям", programFor: "Направление для", whoTitle: "Кому подходит",
    whoBodyAdult: "Взрослым, которые хотят красиво двигаться, учиться с вниманием и начать с комфортного для себя уровня.",
    whoBodyChild: "Детям, которые готовы открывать ритм, координацию и уверенность под внимательным руководством.",
    lessonTitle: "Что даст первый урок", lessonBody: "Вы познакомитесь с подходом преподавателя, попробуете движение и поймёте, подходит ли вам направление. Первый урок бесплатный.",
    practicalTitle: "Практическая информация", practicalBody: "Точный уровень группы, преподаватель и возраст уточняются. Перед визитом мы поможем выбрать подходящую группу.",
    related: "Вам также может подойти", scheduleLink: "Посмотреть расписание студии",
  },
};

function updateMeta(selector: string, value: string) { document.querySelector(selector)?.setAttribute("content", value); }
function languageFromPath(): Language {
  const segment = window.location.pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (segment === "ka") return "KA";
  if (segment === "ru") return "RU";
  return "EN";
}
function programHref(language: Language, program: Program) {
  const audience = program.audience === "adults" ? "adults" : "kids";
  return languagePath[language] + audience + "/" + programSlugs[program.number] + "/";
}

function Logo({ full = false, header = false }: { full?: boolean; header?: boolean }) {
  if (header) return <svg className="logo-header" viewBox="1120 220 1830 1500" aria-hidden="true">
    <defs>
      <filter id="logo-luminance" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="luminanceToAlpha" result="luma" />
        <feComponentTransfer in="luma">
          <feFuncA type="linear" slope="3.5" intercept="-0.35" />
        </feComponentTransfer>
      </filter>
      <mask id="logo-dancer-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="4000" height="2828" style={{ maskType: "alpha" }}>
        <image href="/tela-logo-header.jpg" x="0" y="0" width="4000" height="2828" filter="url(#logo-luminance)" />
      </mask>
    </defs>
    <rect x="0" y="0" width="4000" height="2828" fill="#d2a6e5" mask="url(#logo-dancer-mask)" />
  </svg>;

  const className = full ? "logo-full" : "logo-crop";
  return <span className={className} aria-hidden="true"><img src="/tela-logo.png" alt="" loading="eager" fetchPriority="high" decoding="async" /></span>;
}
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={"section-label" + (light ? " section-label-light" : "")}>{children}</p>;
}
function SocialIcon({ channel }: { channel: string }) {
  if (channel === "Google Maps") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21s6-5.35 6-11a6 6 0 1 0-12 0c0 5.65 6 11 6 11Z" /><circle cx="12" cy="10" r="2.15" /></svg>;
  if (channel === "Instagram") return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" /><circle cx="12" cy="12" r="4.1" /><circle className="social-icon-fill" cx="17.45" cy="6.65" r="1.05" /></svg>;
  if (channel === "Facebook") return <svg aria-hidden="true" viewBox="0 0 24 24"><path className="social-icon-fill" d="M13.65 21v-8h2.75l.42-3.1h-3.17V7.92c0-.9.25-1.5 1.58-1.5H17V3.65c-.31-.04-1.35-.13-2.56-.13-2.53 0-4.26 1.55-4.26 4.39V9.9H7.32V13h2.86v8h3.47Z" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.15 11.75a8.12 8.12 0 0 1-11.97 7.14L4 20l1.13-4.08a8.12 8.12 0 1 1 15.02-4.17Z" /><path d="M8.72 8.06c.2-.47.42-.48.72-.49h.61c.2 0 .39.07.49.34l.78 1.88c.09.22.05.41-.08.59l-.58.74c-.14.17-.19.33-.07.55.5.9 1.27 1.65 2.2 2.12.2.1.37.08.51-.09l.83-.96c.17-.2.37-.25.6-.16l1.78.83c.27.12.4.22.41.39.03.38-.17 1.16-.48 1.58-.44.59-1.23.94-1.96.93-1.22-.02-2.87-.65-4.5-2.1-1.33-1.19-2.24-2.65-2.42-3.84-.13-.88.21-1.74.46-2.18l.2-.17Z" /></svg>;
}

function LanguageSwitcher({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return <div className="language-switcher" aria-label="Language">{(["EN", "KA", "RU"] as Language[]).map((item) => <button className={language === item ? "is-active" : ""} key={item} onClick={() => onChange(item)} type="button" aria-pressed={language === item}>{item}</button>)}</div>;
}
function Header({ language, copy, onLanguage, internal = false }: { language: Language; copy: SiteCopy; onLanguage: (language: Language) => void; internal?: boolean }) {
  const home = languagePath[language];
  return <header className={"header" + (internal ? " header-internal" : "")}>
    <a className="brand" href={home} aria-label={copy.footer.studio}><Logo header /><span className="brand-type">Dance Studio Tela</span></a>
    <nav className="desktop-nav" aria-label="Primary navigation">{copy.nav.map((item) => <a href={internal ? home + item.href : item.href} key={item.href}>{item.label}</a>)}</nav>
    <div className="header-actions"><LanguageSwitcher language={language} onChange={onLanguage} /><a className="header-cta" href={internal ? home + "#contact" : "#contact"}>{copy.bookShort}</a></div>
  </header>;
}

function PortraitMedia({ label, reserved, number, image = false, warm = false }: { label: string; reserved: string; number: string; image?: boolean; warm?: boolean }) {
  return <figure className={"portrait-media" + (image ? " portrait-media-image" : "") + (warm ? " portrait-media-warm" : "")}>
    {image ? <picture><source srcSet="/hero-tela-v1.avif" type="image/avif" /><source srcSet="/hero-tela-v1.webp" type="image/webp" /><img src="/hero-tela-v1.png" alt={label} /></picture> : <div className="portrait-media-poster" aria-hidden="true"><i /><span>Tela</span></div>}
    <figcaption><span>{label}</span><small>{reserved}</small><strong aria-hidden="true">{number}</strong></figcaption>
  </figure>;
}

function ProgramList({ language, programs, action }: { language: Language; programs: Program[]; action: string }) {
  return <div className="program-list">{programs.map((program) => <a className="program-row" href={programHref(language, program)} key={program.number}>
    <span className="program-row-number">{program.number}</span><div><p>{program.tag}</p><h3>{program.title}</h3><span>{program.body}</span></div><small>{action}</small><i aria-hidden="true">↗</i>
  </a>)}</div>;
}

function HomePage({ language, copy, onLanguage }: { language: Language; copy: SiteCopy; onLanguage: (language: Language) => void }) {
  const [audience, setAudience] = useState<"adults" | "children">("adults");
  const [activeSchedule, setActiveSchedule] = useState(scheduleGroups[0].id);
  const [showMobileBook, setShowMobileBook] = useState(false);
  const ui = interfaceCopy[language];
  const adultPrograms = copy.programs.items.filter((program) => program.audience === "adults");
  const childrenPrograms = copy.programs.items.filter((program) => program.audience === "children");
  const visiblePrograms = audience === "adults" ? adultPrograms : childrenPrograms;
  const selectedSchedule = scheduleGroups.find((group) => group.id === activeSchedule) ?? scheduleGroups[0];

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShowMobileBook(!entry.isIntersecting), { threshold: 0.08 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>(".hero-video video");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!video) return;
    const syncMotion = () => {
      if (motionPreference.matches) video.pause();
      else void video.play().catch(() => undefined);
    };
    syncMotion();
    motionPreference.addEventListener("change", syncMotion);
    return () => motionPreference.removeEventListener("change", syncMotion);
  }, []);

  return <main className={"site-shell language-" + language.toLowerCase()}>
    <a className="skip-link" href="#programs">{ui.skip}</a>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-video" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata" poster="/media/hero-tela-poster.webp">
          <source src="/media/hero-tela.webm" type="video/webm" />
          <source src="/media/hero-tela.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-video-shade" aria-hidden="true" />
      <Header language={language} copy={copy} onLanguage={onLanguage} />
      <div className="hero-stage" id="top">
        <div className="hero-copy">
          <div className="hero-meta">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <div className="hero-meta-icons" aria-label="Location and social channels">
              {["Google Maps", "Instagram", "Facebook"].map((channel) => <span className="hero-meta-icon" role="img" aria-label={channel} key={channel}><SocialIcon channel={channel} /></span>)}
            </div>
          </div>
          <h1 id="hero-title">{copy.hero.title}<em>{copy.hero.accent}</em></h1><p className="hero-body">{copy.hero.body}</p>
          <div className="hero-actions"><a className="button button-primary" href="#programs">{copy.hero.primary}</a><a className="button button-secondary" href="#contact">{copy.hero.secondary}</a></div>
          <ul className="reassurance" aria-label="Beginner reassurance">{copy.hero.notes.map((note) => <li key={note}><span aria-hidden="true">✦</span>{note}</li>)}</ul>
        </div>
        <a className="hero-scroll" href="#orientation" aria-label="Continue to the next section"><span aria-hidden="true" /></a>
      </div>
    </section>

    <section className="orientation section-ivory" id="orientation" aria-labelledby="orientation-title"><div className="section-wrap orientation-grid">
      <div className="orientation-year" aria-label="Since 1970"><span>Since</span><strong>1970</strong></div>
      <div className="orientation-copy"><SectionLabel>{copy.intro.kicker}</SectionLabel><h2 id="orientation-title">{copy.intro.title}</h2><p>{copy.intro.body}</p></div>
      <dl className="orientation-facts">{copy.hero.notes.map((note, index) => <div key={note}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{note}</dd></div>)}</dl>
    </div></section>

    <section className="programs section-sand" id="programs" aria-labelledby="programs-title"><div className="section-wrap">
      <div className="programs-heading"><div><SectionLabel>{ui.audienceKicker}</SectionLabel><h2 id="programs-title">{ui.audienceTitle}</h2></div><p>{ui.audienceBody}</p></div>
      <div className="audience-switch" role="tablist" aria-label={copy.programs.title}>
        <button className={audience === "adults" ? "is-active" : ""} type="button" role="tab" aria-selected={audience === "adults"} onClick={() => setAudience("adults")}><span>01</span><strong>{copy.programs.adultLabel}</strong><small>{ui.adultsNote}</small></button>
        <button className={audience === "children" ? "is-active" : ""} type="button" role="tab" aria-selected={audience === "children"} onClick={() => setAudience("children")}><span>02</span><strong>{copy.programs.childrenLabel}</strong><small>{ui.childrenNote}</small></button>
      </div>
      <div className="programs-layout" role="tabpanel"><div className="programs-intro"><p>{copy.programs.body}</p><div className="programs-count"><span>0{visiblePrograms.length}</span><small>{copy.programs.kicker}</small></div></div><ProgramList language={language} programs={visiblePrograms} action={ui.viewProgram} /></div>
    </div></section>

    <section className="inside section-dark" aria-labelledby="inside-title"><div className="section-wrap inside-grid">
      <PortraitMedia label={ui.adultFilm} reserved={ui.filmReserved} number="02" />
      <div className="inside-copy"><SectionLabel light>{ui.insideKicker}</SectionLabel><h2 id="inside-title">{ui.insideTitle}</h2><p>{ui.insideBody}</p><div className="inside-values">{copy.benefits.slice(0, 4).map((benefit, index) => <span key={benefit}><i>{String(index + 1).padStart(2, "0")}</i>{benefit}</span>)}</div></div>
    </div></section>

    <section className="kids-feature section-ivory" aria-labelledby="kids-title"><div className="section-wrap kids-grid">
      <div className="kids-copy"><SectionLabel>{ui.kidsKicker}</SectionLabel><h2 id="kids-title">{ui.kidsTitle}</h2><p>{ui.kidsBody}</p><div className="kids-program-links">{childrenPrograms.map((program) => <a href={programHref(language, program)} key={program.number}>{program.title}<span aria-hidden="true">↗</span></a>)}</div></div>
      <PortraitMedia label={ui.childFilm} reserved={ui.filmReserved} number="03" warm />
    </div></section>

    <section className="proam section-plum" id="proam" aria-labelledby="proam-title"><div className="proam-monogram" aria-hidden="true"><span>PRO</span><i /><span>AM</span></div><div className="section-wrap proam-grid">
      <div className="proam-heading"><SectionLabel light>{copy.proam.kicker}</SectionLabel><h2 id="proam-title">{copy.proam.title}</h2><p>{copy.proam.body}</p><a className="text-link text-link-light" href={languagePath[language] + "adults/pro-am/"}>{ui.proamLink}<span aria-hidden="true">↗</span></a></div>
      <div className="proam-points">{copy.proam.points.map((point) => <article className="proam-point" key={point.number}><span>{point.number}</span><div><h3>{point.title}</h3><p>{point.body}</p></div></article>)}</div>
    </div></section>

    <section className="journey section-dark" aria-labelledby="journey-title"><div className="section-wrap"><div className="section-heading-row"><div><SectionLabel light>{copy.journey.kicker}</SectionLabel><h2 id="journey-title">{copy.journey.title}</h2></div><p>{copy.journey.body}</p></div><div className="journey-grid">{copy.journey.steps.map((step) => <article className="journey-card" key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></div></section>

    <section className="schedule-section section-sand" id="schedule" aria-labelledby="schedule-title"><div className="section-wrap">
      <div className="schedule-header"><div><SectionLabel>{copy.schedule.kicker}</SectionLabel><h2 id="schedule-title">{copy.schedule.title}</h2></div><div><p>{copy.schedule.body}</p><span>{copy.schedule.draft}</span></div></div>
      <div className="schedule-layout"><div className="schedule-tabs" role="tablist" aria-label={copy.schedule.title}>{scheduleGroups.map((group) => <button key={group.id} type="button" role="tab" aria-selected={activeSchedule === group.id} className={activeSchedule === group.id ? "is-active" : ""} onClick={() => setActiveSchedule(group.id)}><span>{group.label[language]}</span><i aria-hidden="true">{activeSchedule === group.id ? "●" : "○"}</i></button>)}</div>
        <div className="schedule-panel" role="tabpanel"><div className="schedule-panel-title"><span>{selectedSchedule.label[language]}</span><i>{String(selectedSchedule.classes.length).padStart(2, "0")}</i></div><div className="class-list">{selectedSchedule.classes.map((item, index) => <article className="class-row" key={item.time + item.title + index}><time>{item.time}</time><div><h3>{item.title}</h3>{item.teachers && <p>{copy.schedule.teachers} {item.teachers}</p>}</div><span aria-hidden="true">↗</span></article>)}</div></div>
      </div>
    </div></section>

    <section className="heritage section-dark" id="story" aria-labelledby="heritage-title"><div className="section-wrap heritage-grid"><div className="heritage-emblem"><Logo full /></div><div className="heritage-copy"><SectionLabel light>{copy.heritage.kicker}</SectionLabel><h2 id="heritage-title">{copy.heritage.title}</h2><p>{copy.heritage.body}</p></div><div className="heritage-year"><span>Since</span><strong>{copy.heritage.year}</strong></div></div></section>

    <section className="faq section-ivory" aria-labelledby="faq-title"><div className="section-wrap faq-grid"><div className="faq-heading"><SectionLabel>{copy.faq.kicker}</SectionLabel><h2 id="faq-title">{copy.faq.title}</h2></div><div className="faq-list">{copy.faq.items.map((item, index) => <details key={item.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true">+</i></summary><p>{item.answer}</p></details>)}</div></div></section>

    <section className="closing-film section-ivory" aria-labelledby="closing-title"><div className="section-wrap closing-grid"><PortraitMedia label={ui.closingKicker} reserved={ui.filmReserved} number="06" warm /><div className="closing-copy"><SectionLabel>{ui.closingKicker}</SectionLabel><h2 id="closing-title">{ui.closingTitle}</h2><p>{ui.closingBody}</p><a className="button button-ink" href="#contact">{copy.hero.secondary}<span aria-hidden="true">↗</span></a></div></div></section>

    <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="section-wrap contact-grid"><div><SectionLabel light>{copy.contact.kicker}</SectionLabel><h2 id="contact-title">{copy.contact.title}</h2></div><div className="contact-action"><p>{copy.contact.body}</p><div className="contact-channels" aria-label={copy.contact.channels}>{copy.contact.channels.split(" · ").map((channel) => <span className="contact-channel" key={channel}><span><i className="social-icon"><SocialIcon channel={channel} /></i>{channel}</span><small>{copy.contact.pending}</small></span>)}</div></div></div></section>
    <Footer copy={copy} />
    {showMobileBook && <a className="mobile-book" href="#contact">{copy.hero.secondary}<span aria-hidden="true">↗</span></a>}
  </main>;
}

function Footer({ copy }: { copy: SiteCopy }) {
  return <footer className="footer"><div className="section-wrap footer-grid"><div className="footer-brand"><Logo /><strong>{copy.footer.studio}</strong></div><p>{copy.footer.location}</p><p>© {new Date().getFullYear()} · {copy.footer.rights}</p></div></footer>;
}

function ProgramPage({ language, copy, onLanguage, audience, slug }: { language: Language; copy: SiteCopy; onLanguage: (language: Language) => void; audience: "adults" | "kids"; slug: string }) {
  const ui = interfaceCopy[language];
  const desiredAudience = audience === "adults" ? "adults" : "children";
  const programs = copy.programs.items.filter((program) => program.audience === desiredAudience);
  const selected = programs.find((program) => programSlugs[program.number] === slug);
  const isProAm = audience === "adults" && slug === "pro-am";
  const title = isProAm ? "Pro-Am" : selected?.title;
  const body = isProAm ? copy.proam.body : selected?.body;
  const tag = isProAm ? copy.programs.adultLabel : selected?.tag;
  const related = programs.filter((program) => program.number !== selected?.number).slice(0, 3);
  if (!title || !body) return <HomePage language={language} copy={copy} onLanguage={onLanguage} />;

  return <main className={"site-shell detail-shell language-" + language.toLowerCase()}>
    <section className="detail-hero"><Header language={language} copy={copy} onLanguage={onLanguage} internal /><div className="section-wrap detail-hero-grid"><div className="detail-hero-copy"><a className="detail-back" href={languagePath[language] + "#programs"}>← {ui.back}</a><p className="eyebrow">{ui.programFor} · {tag}</p><h1>{title}</h1><p>{body}</p><a className="button button-primary" href={languagePath[language] + "#contact"}>{copy.hero.secondary}<span aria-hidden="true">↗</span></a></div><PortraitMedia label={title} reserved={ui.filmReserved} number={isProAm ? "P/A" : selected?.number ?? "01"} image={isProAm || selected?.number === "01"} /></div></section>
    <section className="detail-proof section-sand"><div className="section-wrap">{copy.hero.notes.map((note, index) => <span key={note}><i>{String(index + 1).padStart(2, "0")}</i>{note}</span>)}</div></section>
    <section className="detail-content section-ivory"><div className="section-wrap detail-content-grid"><article><SectionLabel>{ui.whoTitle}</SectionLabel><h2>{ui.whoTitle}</h2><p>{audience === "adults" ? ui.whoBodyAdult : ui.whoBodyChild}</p></article><article><SectionLabel>{ui.lessonTitle}</SectionLabel><h2>{ui.lessonTitle}</h2><p>{ui.lessonBody}</p></article><article><SectionLabel>{ui.practicalTitle}</SectionLabel><h2>{ui.practicalTitle}</h2><p>{ui.practicalBody}</p><a className="text-link" href={languagePath[language] + "#schedule"}>{ui.scheduleLink}<span aria-hidden="true">↗</span></a></article></div></section>
    {isProAm && <section className="detail-proam section-plum"><div className="section-wrap proam-points">{copy.proam.points.map((point) => <article className="proam-point" key={point.number}><span>{point.number}</span><div><h3>{point.title}</h3><p>{point.body}</p></div></article>)}</div></section>}
    <section className="related section-dark"><div className="section-wrap"><SectionLabel light>{ui.related}</SectionLabel><div className="related-grid">{related.map((program) => <a href={programHref(language, program)} key={program.number}><span>{program.number}</span><h2>{program.title}</h2><p>{program.body}</p><i aria-hidden="true">↗</i></a>)}</div></div></section>
    <section className="contact-section detail-contact" id="contact"><div className="section-wrap contact-grid"><div><SectionLabel light>{copy.contact.kicker}</SectionLabel><h2>{copy.contact.title}</h2></div><div className="contact-action"><p>{copy.contact.body}</p><a className="button button-light" href={languagePath[language] + "#contact"}>{copy.bookShort}<span aria-hidden="true">↗</span></a></div></div></section>
    <Footer copy={copy} />
  </main>;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const language = languageFromPath();
  const copy = siteCopy[language];
  const segments = path.split("/").filter(Boolean);
  const audience = segments[1] === "adults" || segments[1] === "kids" ? segments[1] : null;
  const slug = audience ? segments[2] : null;

  useEffect(() => { const syncRoute = () => setPath(window.location.pathname); window.addEventListener("popstate", syncRoute); return () => window.removeEventListener("popstate", syncRoute); }, []);
  useEffect(() => {
    document.documentElement.lang = copy.languageCode;
    const detailProgram = copy.programs.items.find((program) => programSlugs[program.number] === slug && program.audience === (audience === "adults" ? "adults" : "children"));
    const detailTitle = slug === "pro-am" ? "Pro-Am" : detailProgram?.title;
    const pageTitle = audience && slug && detailTitle ? detailTitle + " — " + copy.footer.studio : copy.pageTitle;
    const pageDescription = audience && slug ? (slug === "pro-am" ? copy.proam.body : detailProgram?.body ?? copy.pageDescription) : copy.pageDescription;
    const canonicalUrl = siteOrigin + path;
    document.title = pageTitle; document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    updateMeta('meta[name="description"]', pageDescription); updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[property="og:title"]', pageTitle); updateMeta('meta[property="og:description"]', pageDescription);
    updateMeta('meta[name="twitter:title"]', pageTitle); updateMeta('meta[name="twitter:description"]', pageDescription);
  }, [audience, copy, path, slug]);

  const changeLanguage = (nextLanguage: Language) => {
    const parts = path.split("/").filter(Boolean); if (parts.length === 0) parts.push(nextLanguage.toLowerCase()); else parts[0] = nextLanguage.toLowerCase();
    const nextPath = "/" + parts.join("/") + "/"; window.history.pushState({}, "", nextPath); setPath(nextPath); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (audience && slug) return <ProgramPage language={language} copy={copy} onLanguage={changeLanguage} audience={audience} slug={slug} />;
  return <HomePage language={language} copy={copy} onLanguage={changeLanguage} />;
}
