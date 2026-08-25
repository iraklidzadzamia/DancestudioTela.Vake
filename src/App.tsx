import { useEffect, useId, useRef, useState } from "react";
import { AutoPlayVideo } from "./AutoPlayVideo";
import ConsentBanner, { ConsentSettingsButton } from "./ConsentBanner";
import { trackBookingModalOpen, trackContactIntent, trackPageView, trackScrollDepth, trackSectionView } from "./analytics";
import { scheduleGroups, siteCopy, type Language, type SiteCopy } from "./content";
import { bookingContactChannels, contactHref, formattedPhoneNumber, heroContactChannels, opensOutsidePage, sectionContactChannels, type ContactChannel } from "./contacts";
import { getProgramMedia } from "./programMedia";
import { getSeoData, languagePaths as languagePath, matchSiteRoute, programSlugs } from "./site";
import { useFirstVideoFrame, VideoPoster } from "./VideoPoster";
import { attemptVideoPlayback } from "./videoPlayback";

type Program = SiteCopy["programs"]["items"][number];

type FilmCopy = { kicker: string; title: string; body: string; caption: string; note: string };
type InterfaceCopy = {
  skip: string; audienceKicker: string; audienceTitle: string; audienceBody: string; viewProgram: string;
  adultsNote: string; childrenNote: string;
  insideKicker: string; insideTitle: string; insideBody: string; kidsKicker: string; kidsTitle: string;
  kidsBody: string; proamLink: string; storyLink: string; closingKicker: string; closingTitle: string;
  closingBody: string; back: string; programFor: string; whoTitle: string; whoBodyAdult: string;
  whoBodyChild: string; lessonTitle: string; lessonBody: string; practicalTitle: string; practicalBody: string;
  related: string; scheduleLink: string; playFilm: string; pauseFilm: string; watchFilm: string;
  languageLabel: string; navigationLabel: string; socialLabel: string; nextSection: string; sinceLabel: string;
  films: { proam: FilmCopy; kids: FilmCopy; tango: FilmCopy; tangoGroup: FilmCopy; georgian: FilmCopy; closing: FilmCopy };
};

const interfaceCopy: Record<Language, InterfaceCopy> = {
  EN: {
    skip: "Skip to programs", audienceKicker: "Find your way in", audienceTitle: "Who are you choosing for?",
    audienceBody: "Start with the person, then discover the direction. No dance vocabulary required.",
    viewProgram: "Discover this program", adultsNote: "Movement, confidence and a new part of your life.",
    childrenNote: "Technique, imagination and the joy of growing through movement.",
    insideKicker: "Inside Tela", insideTitle: "Learning that feels personal. Progress you can feel.",
    insideBody: "The right class is more than a list of steps. It is attention, music, a welcoming room and the moment your body begins to understand.",
    kidsKicker: "For young dancers", kidsTitle: "Confidence begins with being seen.",
    kidsBody: "Children learn through age-appropriate guidance, clear corrections and the pleasure of moving together — in Ballroom & Latin, ballet and Georgian dance.",
    proamLink: "Explore Pro-Am", storyLink: "Our story", closingKicker: "Life at Tela",
    closingTitle: "The best reason to dance is how it makes you feel.",
    closingBody: "The film captures the spontaneous, joyful and human side of the studio — the feeling people remember after class.",
    back: "Back to all programs", programFor: "Program for", whoTitle: "Who this is for",
    whoBodyAdult: "For adults who want to move beautifully, learn with attention and begin at a level that feels comfortable.",
    whoBodyChild: "For children who are ready to discover rhythm, coordination and confidence with thoughtful guidance.",
    lessonTitle: "What the first lesson gives you", lessonBody: "You meet the teaching style, try the movement and understand whether this direction feels right. The first lesson is free.",
    practicalTitle: "Practical details", practicalBody: "Group placement depends on age, experience and goals. Contact us before your visit and we will recommend the most suitable group.",
    related: "You may also like", scheduleLink: "See the studio timetable", playFilm: "Play film", pauseFilm: "Pause film", watchFilm: "Real moments from Tela", languageLabel: "Language", navigationLabel: "Main navigation", socialLabel: "Location and social channels", nextSection: "Continue to the next section", sinceLabel: "Story since",
    films: {
      proam: { kicker: "Ballroom & Latin · Pro-Am", title: "Learn with a professional beside you.", body: "In Pro-Am, your instructor is both teacher and dance partner. Every detail is shaped around your pace — whether you want a beautiful weekly ritual, a performance or a path toward competition.", caption: "Pro-Am in motion", note: "Professional partner · personal pace" },
      kids: { kicker: "For children", title: "Small corrections. Lasting confidence.", body: "Young dancers learn best when they feel seen. Clear, age-appropriate guidance helps technique, coordination and confidence grow together — in Ballroom & Latin, ballet and Georgian dance.", caption: "Teaching with attention", note: "Ballroom & Latin · Ballet · Georgian Dance" },
      tango: { kicker: "Women’s Tango", title: "Strength, musicality and your own expression.", body: "Women’s Tango develops posture, balance and expressive movement. The class is a place to understand the music, refine the body and dance with greater freedom.", caption: "Tango On Bars", note: "Technique, balance and expression" },
      tangoGroup: { kicker: "Inside the group", title: "Technique becomes a shared energy.", body: "Focused practice meets the atmosphere of dancing together — two sides of the same direction.", caption: "Women’s Tango group", note: "A real class moment at Tela" },
      georgian: { kicker: "Georgian Dance", title: "Tradition that lives in movement.", body: "Rhythm, precision and ensemble energy connect dancers with Georgia’s movement culture. Georgian dance is available for adults and children.", caption: "Georgian dance at Tela", note: "For adults and children" },
      closing: { kicker: "The feeling after class", title: "Come for the dance. Stay for the joy.", body: "Technique matters. So does the human part — the laughter, energy and moments that make you want to return.", caption: "Life at Tela", note: "The spontaneous side of the studio" },
    },
  },
  KA: {
    skip: "პროგრამებზე გადასვლა", audienceKicker: "იპოვე შენი გზა", audienceTitle: "ვისთვის ირჩევ?",
    audienceBody: "დაიწყე ადამიანით და შემდეგ აღმოაჩინე მიმართულება — საცეკვაო ტერმინების ცოდნა არ არის საჭირო.",
    viewProgram: "გაიგე მეტი პროგრამის შესახებ", adultsNote: "მოძრაობა, თავდაჯერება და ცხოვრების ახალი ნაწილი.",
    childrenNote: "ტექნიკა, წარმოსახვა და მოძრაობით ზრდის სიხარული.",
    insideKicker: "„თელას“ შიგნით", insideTitle: "პერსონალური სწავლება. პროგრესი, რომელსაც გრძნობ.",
    insideBody: "სწორი გაკვეთილი ნაბიჯების სია არ არის. ეს არის ყურადღება, მუსიკა, მეგობრული გარემო და მომენტი, როცა სხეული მოძრაობას შეიგრძნობს.",
    kidsKicker: "პატარა მოცეკვავეებისთვის", kidsTitle: "თავდაჯერება იწყება ყურადღებით.",
    kidsBody: "ბავშვები ასაკზე მორგებული მითითებებით, მკაფიო შესწორებებითა და ერთად მოძრაობის სიხარულით სწავლობენ — Ballroom & Latin-ს, ბალეტსა და ქართულ ცეკვას.",
    proamLink: "გაეცანი Pro-Am-ს", storyLink: "ჩვენი ისტორია", closingKicker: "ცხოვრება „თელაში“",
    closingTitle: "ცეკვის საუკეთესო მიზეზი ის გრძნობაა, რომელსაც ის გაძლევს.",
    closingBody: "ვიდეო აჩვენებს სტუდიის სპონტანურ, მხიარულ და ადამიანურ მხარეს — ემოციას, რომელიც გაკვეთილის შემდეგ რჩება.",
    back: "ყველა პროგრამაზე დაბრუნება", programFor: "პროგრამა", whoTitle: "ვისთვის არის",
    whoBodyAdult: "ზრდასრულებისთვის, ვისაც სურს ლამაზად მოძრაობა, ყურადღებით სწავლა და კომფორტული დონიდან დაწყება.",
    whoBodyChild: "ბავშვებისთვის, რომლებიც მზად არიან აღმოაჩინონ რიტმი, კოორდინაცია და თავდაჯერება ყურადღებიანი სწავლებით.",
    lessonTitle: "რას გაძლევს პირველი გაკვეთილი", lessonBody: "გაიცნობ სწავლების სტილს, მოსინჯავ მოძრაობას და გაიგებ, შეგეფერება თუ არა ეს მიმართულება. პირველი გაკვეთილი უფასოა.",
    practicalTitle: "პრაქტიკული ინფორმაცია", practicalBody: "ჯგუფის შერჩევა დამოკიდებულია ასაკზე, გამოცდილებასა და მიზნებზე. ვიზიტამდე დაგვიკავშირდი და ყველაზე შესაფერის ჯგუფს გირჩევთ.",
    related: "შეიძლება ასევე მოგეწონოს", scheduleLink: "სტუდიის განრიგის ნახვა", playFilm: "ვიდეოს ჩართვა", pauseFilm: "ვიდეოს დაპაუზება", watchFilm: "რეალური მომენტები „თელადან“", languageLabel: "ენა", navigationLabel: "მთავარი ნავიგაცია", socialLabel: "მდებარეობა და სოციალური არხები", nextSection: "შემდეგ სექციაზე გადასვლა", sinceLabel: "ისტორია დაიწყო",
    films: {
      proam: { kicker: "Ballroom & Latin · Pro-Am", title: "ისწავლე პროფესიონალთან ერთად.", body: "Pro-Am-ში ინსტრუქტორი ერთდროულად შენი პედაგოგი და საცეკვაო პარტნიორია. სწავლება შენს ტემპსა და მიზანს ერგება — იქნება ეს სასიამოვნო ყოველკვირეული რიტუალი, გამოსვლა თუ შეჯიბრებისკენ გზა.", caption: "Pro-Am მოძრაობაში", note: "პროფესიონალი პარტნიორი · პირადი ტემპი" },
      kids: { kicker: "ბავშვებისთვის", title: "პატარა შესწორებები. დიდი თავდაჯერება.", body: "ბავშვი უკეთ სწავლობს, როცა ყურადღებას გრძნობს. ასაკზე მორგებული, მკაფიო მითითებები ტექნიკას, კოორდინაციასა და თავდაჯერებას ერთად ავითარებს — Ballroom & Latin-ში, ბალეტსა და ქართულ ცეკვაში.", caption: "სწავლება ყურადღებით", note: "Ballroom & Latin · ბალეტი · ქართული ცეკვა" },
      tango: { kicker: "ქალთა ტანგო", title: "ძალა, მუსიკალურობა და საკუთარი გამოხატვა.", body: "ქალთა ტანგო ავითარებს სხეულის სწორად დაჭერას, ბალანსსა და გამომსახველ მოძრაობას. აქ მუსიკის უკეთ გაგებას, სხეულის დახვეწასა და მეტ თავისუფლებას სწავლობ.", caption: "Tango On Bars", note: "ტექნიკა, ბალანსი და გამომსახველობა" },
      tangoGroup: { kicker: "ჯგუფის შიგნით", title: "ტექნიკა საერთო ენერგიად იქცევა.", body: "კონცენტრირებული ვარჯიში და ერთად ცეკვის ატმოსფერო — ერთი მიმართულების ორი მხარეა.", caption: "ქალთა ტანგოს ჯგუფი", note: "ნამდვილი გაკვეთილი „თელაში“" },
      georgian: { kicker: "ქართული ცეკვა", title: "ტრადიცია, რომელიც მოძრაობაში ცოცხლობს.", body: "რიტმი, სიზუსტე და ჯგუფური ენერგია მოცეკვავეს ქართული მოძრაობის კულტურასთან აკავშირებს. ქართული ცეკვა ხელმისაწვდომია ზრდასრულებისა და ბავშვებისთვის.", caption: "ქართული ცეკვა „თელაში“", note: "ზრდასრულებისა და ბავშვებისთვის" },
      closing: { kicker: "გრძნობა გაკვეთილის შემდეგ", title: "მოდი ცეკვისთვის. დარჩი სიხარულისთვის.", body: "ტექნიკა მნიშვნელოვანია. ადამიანური მხარეც — სიცილი, ენერგია და ის მომენტები, რომლებიც დაბრუნების სურვილს გიტოვებს.", caption: "ცხოვრება „თელაში“", note: "სტუდიის სპონტანური მხარე" },
    },
  },
  RU: {
    skip: "Перейти к направлениям", audienceKicker: "Найди свой путь", audienceTitle: "Для кого ты ищешь занятия?",
    audienceBody: "Сначала определи, для кого нужны занятия — для себя или для ребёнка, а затем подбери подходящее направление. Разбираться в танцевальной терминологии не нужно.",
    viewProgram: "Подробнее о направлении", adultsNote: "Движение, уверенность и новая часть твоей жизни.",
    childrenNote: "Техника, воображение и радость взросления через движение.",
    insideKicker: "Внутри студии Tela", insideTitle: "Обучение с личным вниманием. Прогресс, который ощущается.",
    insideBody: "Правильное занятие — больше, чем набор шагов. Это внимание, музыка, тёплая атмосфера и момент, когда тело начинает чувствовать движение.",
    kidsKicker: "Для юных танцоров", kidsTitle: "Уверенность начинается с внимания.",
    kidsBody: "Дети учатся через понятные объяснения, бережные корректировки и удовольствие от совместного движения — в Ballroom & Latin, балете и грузинских танцах.",
    proamLink: "Открыть Pro-Am", storyLink: "Наша история", closingKicker: "Жизнь в студии Tela",
    closingTitle: "Лучшая причина танцевать — то, как ты себя чувствуешь.",
    closingBody: "Видео показывает спонтанную, радостную и человеческую сторону студии — эмоцию, которая остаётся после занятия.",
    back: "Вернуться ко всем направлениям", programFor: "Направление для", whoTitle: "Кому подходит",
    whoBodyAdult: "Взрослым, которые хотят красиво двигаться, учиться с вниманием и начать с комфортного для себя уровня.",
    whoBodyChild: "Детям, которые готовы открывать ритм, координацию и уверенность под внимательным руководством.",
    lessonTitle: "Что даст первый урок", lessonBody: "Ты познакомишься с подходом преподавателя, попробуешь потанцевать на уроке и поймёшь, подходит ли тебе направление. Первый урок бесплатный.",
    practicalTitle: "Практическая информация", practicalBody: "Выбор группы зависит от возраста, опыта и целей. Свяжись с нами перед визитом — мы порекомендуем подходящую группу.",
    related: "Тебе также может подойти", scheduleLink: "Посмотреть расписание студии", playFilm: "Включить видео", pauseFilm: "Поставить видео на паузу", watchFilm: "Настоящие моменты из жизни студии Tela", languageLabel: "Язык", navigationLabel: "Основная навигация", socialLabel: "Адрес и социальные сети", nextSection: "Перейти к следующему разделу", sinceLabel: "История с",
    films: {
      proam: { kicker: "Ballroom & Latin · Pro-Am", title: "Учись рядом с профессионалом.", body: "В Pro-Am преподаватель становится твоим танцевальным партнёром. Каждая деталь обучения подстраивается под твой темп и личные цели — будь то красивый еженедельный ритуал, выступление на сцене или путь к соревнованиям.", caption: "Pro-Am в движении", note: "Профессиональный партнёр · персональный темп" },
      kids: { kicker: "Для детей", title: "Небольшие подсказки. Уверенность надолго.", body: "Дети лучше учатся, когда чувствуют внимание. Занятия с учётом возраста помогают одновременно развивать технику, координацию и уверенность — в Ballroom & Latin, балете и грузинских танцах.", caption: "Обучение с вниманием", note: "Ballroom & Latin · Балет · Грузинские танцы" },
      tango: { kicker: "Женское танго", title: "Сила, музыкальность и свобода самовыражения.", body: "Женское танго развивает осанку, баланс и выразительное движение. Здесь можно глубже понять музыку, почувствовать тело и танцевать свободнее.", caption: "Tango On Bars", note: "Техника, баланс и выразительность" },
      tangoGroup: { kicker: "Внутри группы", title: "Техника становится общей энергией.", body: "Сосредоточенная практика и атмосфера совместного танца — две стороны одного направления.", caption: "Группа женского танго", note: "Настоящий момент занятия в студии Tela" },
      georgian: { kicker: "Грузинские танцы", title: "Традиция, которая живёт в движении.", body: "Ритм, точность и ансамблевая энергия приобщают танцоров к богатой традиции грузинского танца. Направление доступно взрослым и детям.", caption: "Грузинские танцы в студии Tela", note: "Для взрослых и детей" },
      closing: { kicker: "Ощущение после занятия", title: "Приходи за танцем. Оставайся ради радости.", body: "Техника важна. Но важна и человеческая сторона — смех, энергия и моменты, ради которых хочется вернуться.", caption: "Жизнь в студии Tela", note: "Спонтанная сторона студии" },
    },
  },
};

function updateMeta(attribute: "name" | "property", key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}
function updateCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}
function updateAlternates(alternates: ReturnType<typeof getSeoData>["alternates"]) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
  Object.entries(alternates).forEach(([hreflang, href]) => {
    if (!href) return;
    const element = document.createElement("link");
    element.rel = "alternate";
    element.hreflang = hreflang;
    element.href = href;
    document.head.appendChild(element);
  });
}
function programHref(language: Language, program: Program) {
  const audience = program.audience === "adults" ? "adults" : "kids";
  return languagePath[language] + audience + "/" + programSlugs[program.number] + "/";
}

function DancerMark({ className }: { className: string }) {
  const instanceId = useId().replace(/:/g, "");
  const filterId = `logo-luminance-${instanceId}`;
  const maskId = `logo-dancer-mask-${instanceId}`;
  return <svg className={className} viewBox="1120 220 1830 1500" aria-hidden="true">
    <defs>
      <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="luminanceToAlpha" result="luma" />
        <feComponentTransfer in="luma">
          <feFuncA type="linear" slope="4" intercept="-0.8" />
        </feComponentTransfer>
      </filter>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="4000" height="2828" style={{ maskType: "alpha" }}>
        <image href="/tela-logo-header.jpg" x="0" y="0" width="4000" height="2828" filter={`url(#${filterId})`} />
      </mask>
    </defs>
    <rect x="0" y="0" width="4000" height="2828" fill="#d2a6e5" mask={`url(#${maskId})`} />
  </svg>;
}

function Logo({ header = false }: { header?: boolean }) {
  if (header) return <DancerMark className="logo-header" />;
  return <span className="logo-crop" aria-hidden="true"><img src="/tela-logo.png" alt="" loading="eager" fetchPriority="high" decoding="async" /></span>;
}
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={"section-label" + (light ? " section-label-light" : "")}>{children}</p>;
}
function SocialIcon({ channel }: { channel: string }) {
  if (channel === "Phone") return <span className="phone-symbol" aria-hidden="true">☎</span>;
  if (channel === "Google Maps") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21s6-5.35 6-11a6 6 0 1 0-12 0c0 5.65 6 11 6 11Z" /><circle cx="12" cy="10" r="2.15" /></svg>;
  if (channel === "Instagram") return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" /><circle cx="12" cy="12" r="4.1" /><circle className="social-icon-fill" cx="17.45" cy="6.65" r="1.05" /></svg>;
  if (channel === "Facebook") return <svg aria-hidden="true" viewBox="0 0 24 24"><path className="social-icon-fill" d="M13.65 21v-8h2.75l.42-3.1h-3.17V7.92c0-.9.25-1.5 1.58-1.5H17V3.65c-.31-.04-1.35-.13-2.56-.13-2.53 0-4.26 1.55-4.26 4.39V9.9H7.32V13h2.86v8h3.47Z" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.15 11.75a8.12 8.12 0 0 1-11.97 7.14L4 20l1.13-4.08a8.12 8.12 0 1 1 15.02-4.17Z" /><path d="M8.72 8.06c.2-.47.42-.48.72-.49h.61c.2 0 .39.07.49.34l.78 1.88c.09.22.05.41-.08.59l-.58.74c-.14.17-.19.33-.07.55.5.9 1.27 1.65 2.2 2.12.2.1.37.08.51-.09l.83-.96c.17-.2.37-.25.6-.16l1.78.83c.27.12.4.22.41.39.03.38-.17 1.16-.48 1.58-.44.59-1.23.94-1.96.93-1.22-.02-2.87-.65-4.5-2.1-1.33-1.19-2.24-2.65-2.42-3.84-.13-.88.21-1.74.46-2.18l.2-.17Z" /></svg>;
}

const bookingDialogEvent = "tela:open-booking";
const contactLabels: Record<Language, Record<ContactChannel, string>> = {
  EN: { "Google Maps": "Directions", Instagram: "Instagram Direct", Facebook: "Messenger", WhatsApp: "WhatsApp", Phone: "Call the studio" },
  KA: { "Google Maps": "მარშრუტი", Instagram: "Instagram Direct", Facebook: "Messenger", WhatsApp: "WhatsApp", Phone: "სტუდიაში დარეკვა" },
  RU: { "Google Maps": "Как добраться", Instagram: "Instagram Direct", Facebook: "Messenger", WhatsApp: "WhatsApp", Phone: "Позвонить в студию" },
};
const bookingCopy: Record<Language, { kicker: string; title: string; body: string; close: string; notes: Record<ContactChannel, string> }> = {
  EN: {
    kicker: "Your first lesson is free",
    title: "Choose how you’d like to book.",
    body: "Open a private conversation in the channel you already use. We’ll help you choose the right direction and group.",
    close: "Close booking options",
    notes: { "Google Maps": "Open directions", Instagram: "Open a private chat", Facebook: "Open Messenger", WhatsApp: "Fastest way to message us", Phone: formattedPhoneNumber() },
  },
  KA: {
    kicker: "პირველი გაკვეთილი უფასოა",
    title: "აირჩიე ჩაწერის მოსახერხებელი გზა.",
    body: "გახსენი პირადი ჩატი შენთვის მოსახერხებელ არხში. სწორი მიმართულებისა და ჯგუფის არჩევაში დაგეხმარებით.",
    close: "ჩაწერის ფანჯრის დახურვა",
    notes: { "Google Maps": "მარშრუტის გახსნა", Instagram: "პირადი ჩატის გახსნა", Facebook: "Messenger-ის გახსნა", WhatsApp: "ჩვენთან მოწერის ყველაზე სწრაფი გზა", Phone: formattedPhoneNumber() },
  },
  RU: {
    kicker: "Первый урок бесплатный",
    title: "Выбери, как тебе удобнее записаться.",
    body: "Открой личный чат в привычном мессенджере. Мы поможем выбрать подходящее направление и группу.",
    close: "Закрыть варианты записи",
    notes: { "Google Maps": "Открыть маршрут", Instagram: "Открыть личный чат", Facebook: "Открыть Messenger", WhatsApp: "Самый быстрый способ написать нам", Phone: formattedPhoneNumber() },
  },
};

function openBookingDialog(placement: string) {
  window.dispatchEvent(new CustomEvent<string>(bookingDialogEvent, { detail: placement }));
}

function BookingDialog({ language }: { language: Language }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [placement, setPlacement] = useState<string | null>(null);
  const copy = bookingCopy[language];

  useEffect(() => {
    const open = (event: Event) => setPlacement((event as CustomEvent<string>).detail);
    window.addEventListener(bookingDialogEvent, open);
    return () => window.removeEventListener(bookingDialogEvent, open);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !placement) return;
    trackBookingModalOpen(placement, language);
    document.body.classList.add("booking-open");
    if (!dialog.open) {
      try { dialog.showModal(); } catch { dialog.setAttribute("open", ""); }
    }
    return () => document.body.classList.remove("booking-open");
  }, [language, placement]);

  const close = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      try { dialog.close(); } catch { dialog.removeAttribute("open"); setPlacement(null); }
    } else {
      setPlacement(null);
    }
  };

  return <dialog className={"booking-dialog language-" + language.toLowerCase()} ref={dialogRef} aria-labelledby="booking-title" onClose={() => setPlacement(null)} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <div className="booking-dialog-panel">
      <button className="booking-close" type="button" onClick={close} aria-label={copy.close}><span aria-hidden="true">×</span></button>
      <div className="booking-heading"><p>{copy.kicker}</p><h2 id="booking-title">{copy.title}</h2><span>{copy.body}</span></div>
      <div className="booking-options">
        {bookingContactChannels.map((channel) => {
          const href = contactHref(channel, language);
          if (!href) return null;
          const external = opensOutsidePage(channel);
          return <a className={"booking-option" + (channel === "WhatsApp" ? " booking-option-primary" : "")} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} key={channel} onClick={() => { trackContactIntent(channel, "booking_modal", language, placement ?? undefined); close(); }}>
            <i><SocialIcon channel={channel} /></i><span><strong>{contactLabels[language][channel]}</strong><small>{copy.notes[channel]}</small></span><b aria-hidden="true">↗</b>
          </a>;
        })}
      </div>
    </div>
  </dialog>;
}

function EngagementTracker({ language, path }: { language: Language; path: string }) {
  useEffect(() => {
    const seen = new Set<number>();
    let frame = 0;
    const measure = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight;
      if (height <= window.innerHeight) return;
      const depth = ((window.scrollY + window.innerHeight) / height) * 100;
      [25, 50, 75, 90].forEach((threshold) => {
        if (depth >= threshold && !seen.has(threshold)) {
          seen.add(threshold);
          trackScrollDepth(threshold, language);
        }
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [language, path]);

  useEffect(() => {
    const seen = new Set<string>();
    const sections = ["orientation", "programs", "schedule", "story", "contact"].map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target.id)) return;
        seen.add(entry.target.id);
        trackSectionView(entry.target.id, language);
      });
    }, { threshold: 0.45 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [language, path]);

  return null;
}

function LanguageSwitcher({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return <div className="language-switcher" aria-label={interfaceCopy[language].languageLabel}>{(["EN", "KA", "RU"] as Language[]).map((item) => <button className={language === item ? "is-active" : ""} key={item} onClick={() => onChange(item)} type="button" aria-pressed={language === item}>{item}</button>)}</div>;
}
function Header({ language, copy, onLanguage, internal = false }: { language: Language; copy: SiteCopy; onLanguage: (language: Language) => void; internal?: boolean }) {
  const home = languagePath[language];
  return <header className={"header" + (internal ? " header-internal" : "")}>
    <a className="brand" href={home} aria-label={copy.footer.studio}><Logo header /><span className="brand-type">Dance Studio Tela</span></a>
    <nav className="desktop-nav" aria-label={interfaceCopy[language].navigationLabel}>{copy.nav.map((item) => <a href={internal ? home + item.href : item.href} key={item.href}>{item.label}</a>)}</nav>
    <div className="header-actions"><LanguageSwitcher language={language} onChange={onLanguage} /><button className="header-cta" type="button" onClick={() => openBookingDialog("header")}>{copy.bookShort}</button></div>
  </header>;
}

function ProgramList({ language, programs, action }: { language: Language; programs: Program[]; action: string }) {
  return <div className="program-list">{programs.map((program) => <a className="program-row" href={programHref(language, program)} key={program.number}>
    <div><p>{program.tag}</p><h3>{program.title}</h3><span>{program.body}</span></div><small>{action}</small><i aria-hidden="true">→</i>
  </a>)}</div>;
}

const privacyCopy: Record<Language, {
  kicker: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
  contactTitle: string;
  contactBody: string;
}> = {
  EN: {
    kicker: "Privacy at Tela",
    title: "Privacy policy",
    intro: "This page explains what the DanceStudio Tela Vake website measures and which choices remain in your control.",
    sections: [
      { title: "Information on this website", body: "The website does not contain an account system, payment form or application form. When you open a contact channel, you continue to that provider and communicate there under its privacy terms." },
      { title: "Analytics and advertising", body: "Google Analytics and Google Ads measurement load only after you accept analytics cookies. They help us understand page visits and which contact actions follow an advertising campaign. We do not use this website to sell personal data." },
      { title: "Cookies and your choice", body: "Necessary browser storage remembers your cookie choice. You can reopen Cookie settings in the footer at any time and change that choice for future visits." },
      { title: "External services", body: "Google Maps, Instagram, Facebook Messenger, WhatsApp and telephone links are separate services. Their own terms apply after you open them." },
    ],
    contactTitle: "Contact",
    contactBody: "Questions about this website can be directed to DanceStudio Tela, Vake at 2/5 Ateni Street, Vake, Tbilisi, Georgia or by phone at +995 505 05 16 14.",
  },
  KA: {
    kicker: "კონფიდენციალურობა „თელაში“",
    title: "კონფიდენციალურობის პოლიტიკა",
    intro: "ეს გვერდი განმარტავს, რას ზომავს სტუდია „თელას“ ვებსაიტი და რომელი არჩევანი რჩება შენს კონტროლში.",
    sections: [
      { title: "ინფორმაცია ამ ვებსაიტზე", body: "ვებსაიტზე არ არის ანგარიში, გადახდის ან განაცხადის ფორმა. საკონტაქტო არხის გახსნისას შესაბამის სერვისზე გადადიხარ და იქ მოქმედი კონფიდენციალურობის პირობებით ურთიერთობ." },
      { title: "ანალიტიკა და რეკლამა", body: "Google Analytics და Google Ads მხოლოდ ანალიტიკურ ქუქიებზე თანხმობის შემდეგ იტვირთება. ეს გვეხმარება გავიგოთ გვერდების მონახულება და რეკლამის შემდეგ განხორციელებული საკონტაქტო მოქმედებები. ვებსაიტი პერსონალურ მონაცემებს არ ყიდის." },
      { title: "ქუქიები და შენი არჩევანი", body: "ბრაუზერის აუცილებელი საცავი იმახსოვრებს ქუქიების არჩევანს. პარამეტრების ხელახლა გახსნა და მომავალი ვიზიტებისთვის არჩევანის შეცვლა ნებისმიერ დროს შეგიძლია გვერდის ბოლოში." },
      { title: "გარე სერვისები", body: "Google Maps, Instagram, Facebook Messenger, WhatsApp და სატელეფონო ბმულები დამოუკიდებელი სერვისებია. მათი გახსნის შემდეგ შესაბამისი პირობები მოქმედებს." },
    ],
    contactTitle: "კონტაქტი",
    contactBody: "ვებსაიტთან დაკავშირებული კითხვებისთვის მოგვმართე მისამართზე: ათენის ქუჩა 2/5, ვაკე, თბილისი, საქართველო, ან დარეკე ნომერზე +995 505 05 16 14.",
  },
  RU: {
    kicker: "Конфиденциальность в студии Tela",
    title: "Конфиденциальность",
    intro: "Здесь объясняется, что измеряется при использовании сайта студии Tela в Ваке и какие настройки остаются под твоим контролем.",
    sections: [
      { title: "Информация на сайте", body: "На сайте нет формы регистрации, оплаты или личного кабинета. При открытии карт, мессенджеров или кнопки звонка ты переходишь в сторонние сервисы и приложения, где действуют их собственные условия конфиденциальности." },
      { title: "Аналитика и реклама", body: "Инструменты Google Analytics и Google Ads включаются только после твоего согласия на аналитические файлы cookie. Они помогают нам видеть посещаемость страниц и оценивать эффективность рекламы. Мы не продаём твои личные данные." },
      { title: "Файлы cookie и твой выбор", body: "Сайт запоминает твой выбор файлов cookie. Ты можешь в любой момент открыть настройки внизу страницы и изменить решение." },
      { title: "Внешние сервисы", body: "Кнопка карты открывает Google Maps, ссылки социальных сетей и мессенджеров — соответствующие сервисы, а кнопка звонка — приложение телефона. После их открытия действуют условия соответствующего сервиса или приложения." },
    ],
    contactTitle: "Контакты",
    contactBody: "По вопросам работы сайта ты можешь обратиться в студию Tela: улица Атени, 2/5, Ваке, Тбилиси, Грузия или по телефону +995 505 05 16 14.",
  },
};

const notFoundCopy: Record<Language, { kicker: string; title: string; body: string; action: string }> = {
  EN: { kicker: "404", title: "Page not found", body: "The address may be outdated or typed incorrectly.", action: "Return to the studio" },
  KA: { kicker: "404", title: "გვერდი ვერ მოიძებნა", body: "მისამართი შესაძლოა მოძველებული ან არასწორად აკრეფილი იყოს.", action: "სტუდიის გვერდზე დაბრუნება" },
  RU: { kicker: "404", title: "Страница не найдена", body: "Возможно, адрес устарел или был введён с ошибкой.", action: "Вернуться на страницу студии" },
};

function PrivacyPage({ language, copy, onLanguage }: { language: Language; copy: SiteCopy; onLanguage: (language: Language) => void }) {
  const page = privacyCopy[language];
  return <main className={"site-shell legal-shell language-" + language.toLowerCase()}>
    <Header language={language} copy={copy} onLanguage={onLanguage} internal />
    <section className="legal-hero section-dark"><div className="section-wrap"><SectionLabel light>{page.kicker}</SectionLabel><h1>{page.title}</h1><p>{page.intro}</p></div></section>
    <section className="legal-content section-ivory"><div className="section-wrap legal-grid">
      {page.sections.map((section) => <article key={section.title}><h2>{section.title}</h2><p>{section.body}</p></article>)}
      <article className="legal-contact"><h2>{page.contactTitle}</h2><p>{page.contactBody}</p></article>
    </div></section>
    <Footer copy={copy} language={language} />
  </main>;
}

function NotFoundPage({ language, copy, onLanguage }: { language: Language; copy: SiteCopy; onLanguage: (language: Language) => void }) {
  const page = notFoundCopy[language];
  return <main className={"site-shell not-found-shell language-" + language.toLowerCase()}>
    <Header language={language} copy={copy} onLanguage={onLanguage} internal />
    <section className="not-found section-dark"><div className="section-wrap"><SectionLabel light>{page.kicker}</SectionLabel><h1>{page.title}</h1><p>{page.body}</p><a className="button button-light" href={languagePath[language]}>{page.action}</a></div></section>
    <Footer copy={copy} language={language} />
  </main>;
}

function HomePage({ language, copy, onLanguage }: { language: Language; copy: SiteCopy; onLanguage: (language: Language) => void }) {
  const [audience, setAudience] = useState<"adults" | "children">("adults");
  const [activeSchedule, setActiveSchedule] = useState(scheduleGroups[0].id);
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [heroManuallyPausedVisible, setHeroManuallyPausedVisible] = useState(false);
  const [heroAutoplayBlocked, setHeroAutoplayBlocked] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroManuallyPaused = useRef(false);
  const heroInView = useRef(true);
  const { hasPresentedFrame: heroHasPresentedFrame, revealAfterFirstFrame: revealHeroAfterFirstFrame } = useFirstVideoFrame();
  const ui = interfaceCopy[language];
  const adultPrograms = copy.programs.items.filter((program) => program.audience === "adults");
  const childrenPrograms = copy.programs.items.filter((program) => program.audience === "children");
  const visiblePrograms = audience === "adults" ? adultPrograms : childrenPrograms;
  const selectedSchedule = scheduleGroups.find((group) => group.id === activeSchedule) ?? scheduleGroups[0];

  const requestHeroPlayback = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (!heroInView.current || document.hidden || heroManuallyPaused.current) {
      video.pause();
      return;
    }
    attemptVideoPlayback(video, setHeroAutoplayBlocked);
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    const hero = document.querySelector(".hero");
    if (!video || !hero) return;
    const syncPlayback = () => requestHeroPlayback();
    const retryAfterGesture = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".hero-video video")) return;
      requestHeroPlayback();
    };
    const observer = new IntersectionObserver(([entry]) => {
      heroInView.current = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.12 });
    syncPlayback();
    observer.observe(hero);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("pointerdown", retryAfterGesture, { capture: true, passive: true });
    window.addEventListener("touchstart", retryAfterGesture, { capture: true, passive: true });
    window.addEventListener("online", syncPlayback);
    window.addEventListener("pageshow", syncPlayback);
    const pauseForSectionFilm = (event: Event) => { if ((event as CustomEvent<string>).detail !== "hero") video.pause(); };
    window.addEventListener("tela:film-play", pauseForSectionFilm);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("pointerdown", retryAfterGesture, true);
      window.removeEventListener("touchstart", retryAfterGesture, true);
      window.removeEventListener("online", syncPlayback);
      window.removeEventListener("pageshow", syncPlayback);
      window.removeEventListener("tela:film-play", pauseForSectionFilm);
    };
  }, []);

  const toggleHeroPlayback = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      heroManuallyPaused.current = false;
      setHeroManuallyPausedVisible(false);
      setHeroAutoplayBlocked(false);
      attemptVideoPlayback(video, setHeroAutoplayBlocked);
    } else {
      heroManuallyPaused.current = true;
      setHeroManuallyPausedVisible(true);
      video.pause();
    }
  };

  return <main className={"site-shell language-" + language.toLowerCase()}>
    <a className="skip-link" href="#programs">{ui.skip}</a>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-video">
        <video
          ref={heroVideoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster="/media/hero-tela-poster.webp"
          role="button"
          tabIndex={0}
          aria-label={heroPlaying ? ui.pauseFilm : ui.playFilm}
          aria-pressed={heroPlaying}
          onClick={toggleHeroPlayback}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleHeroPlayback();
            }
          }}
          onPlay={() => { setHeroPlaying(true); setHeroAutoplayBlocked(false); window.dispatchEvent(new CustomEvent("tela:film-play", { detail: "hero" })); }}
          onPause={() => setHeroPlaying(false)}
          onPlaying={revealHeroAfterFirstFrame}
          onLoadedData={requestHeroPlayback}
          onCanPlay={requestHeroPlayback}
        >
          <source src="/media/hero-tela.webm" type="video/webm" />
          <source src="/media/hero-tela.mp4" type="video/mp4" />
        </video>
        <VideoPoster src="/media/hero-tela-poster.webp" hidden={heroHasPresentedFrame} />
        {(heroManuallyPausedVisible || heroAutoplayBlocked) && <span className="hero-play-affordance media-play-affordance" aria-hidden="true"><span className="media-icon media-icon-play" /></span>}
      </div>
      <div className="hero-video-shade" aria-hidden="true" />
      <Header language={language} copy={copy} onLanguage={onLanguage} />
      <div className="hero-stage" id="top">
        <div className="hero-copy">
          <div className="hero-meta">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <div className="hero-meta-icons" aria-label={ui.socialLabel}>
              {heroContactChannels.map((channel) => {
                const href = contactHref(channel, language);
                if (!href) return null;
                return <a className="hero-meta-icon" href={href} target="_blank" rel="noreferrer" aria-label={contactLabels[language][channel]} title={contactLabels[language][channel]} key={channel} onClick={() => trackContactIntent(channel, "hero", language)}><SocialIcon channel={channel} /></a>;
              })}
            </div>
          </div>
          <h1 id="hero-title">{copy.hero.title}<em>{copy.hero.accent}</em></h1><p className="hero-body">{copy.hero.body}</p>
          <div className="hero-actions"><a className="button button-primary" href="#programs">{copy.hero.primary}</a><button className="button button-secondary" type="button" onClick={() => openBookingDialog("hero")}>{copy.hero.secondary}</button></div>
          <ul className="reassurance" aria-label="Beginner reassurance">{copy.hero.notes.map((note) => <li key={note}><span aria-hidden="true">✦</span>{note}</li>)}</ul>
        </div>
        <a className="hero-scroll" href="#orientation" aria-label={ui.nextSection}><span aria-hidden="true" /></a>
      </div>
    </section>

    <section className="orientation section-ivory" id="orientation" aria-labelledby="orientation-title"><div className="section-wrap orientation-grid">
      <div className="orientation-year"><span>{ui.sinceLabel}</span><strong>1970</strong></div>
      <div className="orientation-copy"><h2 id="orientation-title">{copy.intro.title}</h2><p>{copy.intro.body}</p></div>
      <ul className="orientation-facts">{copy.hero.notes.map((note) => <li key={note}>{note}</li>)}</ul>
    </div></section>

    <section className="programs section-sand" id="programs" aria-labelledby="programs-title"><div className="section-wrap">
      <div className="programs-heading"><div><SectionLabel>{ui.audienceKicker}</SectionLabel><h2 id="programs-title">{ui.audienceTitle}</h2></div><p>{ui.audienceBody}</p></div>
      <div className="audience-switch" role="group" aria-label={copy.programs.title}>
        <button className={audience === "adults" ? "is-active" : ""} type="button" aria-pressed={audience === "adults"} onClick={() => setAudience("adults")}><strong>{copy.programs.adultLabel}</strong><small>{ui.adultsNote}</small></button>
        <button className={audience === "children" ? "is-active" : ""} type="button" aria-pressed={audience === "children"} onClick={() => setAudience("children")}><strong>{copy.programs.childrenLabel}</strong><small>{ui.childrenNote}</small></button>
      </div>
      <div className="programs-layout"><div className="programs-intro"><p>{copy.programs.body}</p></div><ProgramList language={language} programs={visiblePrograms} action={ui.viewProgram} /></div>
    </div></section>

    <section className="editorial-film proam-film section-dark" id="proam" aria-labelledby="proam-title"><div className="section-wrap editorial-split">
      <AutoPlayVideo base="proam-story" caption={{ title: ui.films.proam.caption, note: ui.films.proam.note }} playLabel={ui.playFilm} pauseLabel={ui.pauseFilm} className="cinematic-video-arch" />
      <div className="editorial-copy"><SectionLabel light>{ui.films.proam.kicker}</SectionLabel><h2 id="proam-title">{ui.films.proam.title}</h2><p>{ui.films.proam.body}</p>
        <div className="editorial-facts">{copy.proam.points.map((point) => <div key={point.number}><p><strong>{point.title}</strong>{point.body}</p></div>)}</div>
        <a className="text-link text-link-light" href={languagePath[language] + "adults/pro-am/"}>{ui.proamLink}<span aria-hidden="true">→</span></a>
      </div>
    </div></section>

    <section className="editorial-film kids-film section-ivory" aria-labelledby="kids-title"><div className="section-wrap editorial-split editorial-split-reverse">
      <div className="editorial-copy"><SectionLabel>{ui.films.kids.kicker}</SectionLabel><h2 id="kids-title">{ui.films.kids.title}</h2><p>{ui.films.kids.body}</p></div>
      <AutoPlayVideo base="kids-coaching" caption={{ title: ui.films.kids.caption, note: ui.films.kids.note }} playLabel={ui.playFilm} pauseLabel={ui.pauseFilm} className="cinematic-video-soft" />
      <div className="kids-program-links">{childrenPrograms.map((program) => <a href={programHref(language, program)} key={program.number}>{program.title}<span aria-hidden="true">→</span></a>)}</div>
    </div></section>

    <section className="tango-chapter section-plum" aria-labelledby="tango-title"><div className="section-wrap">
      <div className="tango-heading"><div><SectionLabel light>{ui.films.tango.kicker}</SectionLabel><h2 id="tango-title">{ui.films.tango.title}</h2></div><div><p>{ui.films.tango.body}</p><a className="text-link text-link-light" href={languagePath[language] + "adults/womens-tango/"}>{ui.viewProgram}<span aria-hidden="true">→</span></a></div></div>
      <div className="tango-films">
        <AutoPlayVideo base="tango-on-bars" caption={{ title: ui.films.tango.caption, note: ui.films.tango.note }} playLabel={ui.playFilm} pauseLabel={ui.pauseFilm} className="tango-film-main" />
        <div className="tango-film-note"><SectionLabel light>{ui.films.tangoGroup.kicker}</SectionLabel><h3>{ui.films.tangoGroup.title}</h3><p>{ui.films.tangoGroup.body}</p></div>
        <AutoPlayVideo base="tango-group" caption={{ title: ui.films.tangoGroup.caption, note: ui.films.tangoGroup.note }} playLabel={ui.playFilm} pauseLabel={ui.pauseFilm} className="tango-film-secondary" />
      </div>
    </div></section>

    <section className="editorial-film georgian-film section-sand" aria-labelledby="georgian-title"><div className="section-wrap editorial-split">
      <div className="editorial-copy"><SectionLabel>{ui.films.georgian.kicker}</SectionLabel><h2 id="georgian-title">{ui.films.georgian.title}</h2><p>{ui.films.georgian.body}</p></div>
      <AutoPlayVideo base="georgian-dance" caption={{ title: ui.films.georgian.caption, note: ui.films.georgian.note }} playLabel={ui.playFilm} pauseLabel={ui.pauseFilm} className="cinematic-video-offset" />
      <div className="editorial-cta"><a className="text-link" href={languagePath[language] + "adults/georgian-dance/"}>{ui.viewProgram}<span aria-hidden="true">→</span></a></div>
    </div></section>

    <section className="journey section-dark" aria-labelledby="journey-title"><div className="section-wrap"><div className="section-heading-row"><div><SectionLabel light>{copy.journey.kicker}</SectionLabel><h2 id="journey-title">{copy.journey.title}</h2></div><p>{copy.journey.body}</p></div><div className="journey-grid">{copy.journey.steps.slice(0, 3).map((step) => <article className="journey-card" key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></div></section>

    <section className="schedule-section section-sand" id="schedule" aria-labelledby="schedule-title"><div className="section-wrap">
      <div className="schedule-header"><div><SectionLabel>{copy.schedule.kicker}</SectionLabel><h2 id="schedule-title">{copy.schedule.title}</h2></div><div><p>{copy.schedule.body}</p><span>{copy.schedule.draft}</span></div></div>
      <div className="schedule-layout"><div className="schedule-tabs" role="group" aria-label={copy.schedule.title}>{scheduleGroups.map((group) => <button key={group.id} type="button" aria-pressed={activeSchedule === group.id} className={activeSchedule === group.id ? "is-active" : ""} onClick={() => setActiveSchedule(group.id)}><span>{group.label[language]}</span><i aria-hidden="true">{activeSchedule === group.id ? "●" : "○"}</i></button>)}</div>
        <div className="schedule-panel"><div className="schedule-panel-title"><span>{selectedSchedule.label[language]}</span></div><div className="class-list">{selectedSchedule.classes.map((item, index) => <article className="class-row" key={item.time + item.title + index}><time>{item.time}</time><div><h3>{item.title}</h3>{item.teachers && <p>{copy.schedule.teachers} {item.teachers}</p>}</div></article>)}</div></div>
      </div>
    </div></section>

    <section className="heritage section-dark" id="story" aria-labelledby="heritage-title"><div className="section-wrap heritage-grid"><div className="heritage-emblem"><DancerMark className="heritage-mark" /></div><div className="heritage-copy"><SectionLabel light>{copy.heritage.kicker}</SectionLabel><h2 id="heritage-title">{copy.heritage.title}</h2><p>{copy.heritage.body}</p></div><div className="heritage-year"><span>{ui.sinceLabel}</span><strong>{copy.heritage.year}</strong></div></div></section>

    <section className="faq section-ivory" aria-labelledby="faq-title"><div className="section-wrap faq-grid"><div className="faq-heading"><SectionLabel>{copy.faq.kicker}</SectionLabel><h2 id="faq-title">{copy.faq.title}</h2></div><div className="faq-list">{[0, 1, 3, 5, 6].map((sourceIndex, index) => { const item = copy.faq.items[sourceIndex]; return <details key={item.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true">+</i></summary><p>{item.answer}</p></details>; })}</div></div></section>

    <section className="closing-reel section-dark" aria-labelledby="closing-title"><div className="section-wrap closing-reel-stage">
      <div className="closing-reel-copy"><SectionLabel light>{ui.films.closing.kicker}</SectionLabel><h2 id="closing-title">{ui.films.closing.title}</h2><p>{ui.films.closing.body}</p></div>
      <AutoPlayVideo base="closing-emotional" caption={{ title: ui.films.closing.caption, note: ui.films.closing.note }} playLabel={ui.playFilm} pauseLabel={ui.pauseFilm} className="closing-reel-video" loop={false} />
      <div className="closing-reel-cta"><button className="button button-light" type="button" onClick={() => openBookingDialog("closing_film")}>{copy.hero.secondary}</button></div>
    </div></section>

    <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="section-wrap contact-grid"><div><SectionLabel light>{copy.contact.kicker}</SectionLabel><h2 id="contact-title">{copy.contact.title}</h2></div><div className="contact-action"><p>{copy.contact.body}</p><div className="contact-channels" aria-label={ui.socialLabel}>{sectionContactChannels.map((channel) => {
      const destination = contactHref(channel, language);
      if (!destination) return null;
      const external = opensOutsidePage(channel);
      return <a className="contact-channel is-connected" href={destination} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} key={channel} onClick={() => trackContactIntent(channel, "contact_section", language)}><span><i className="social-icon"><SocialIcon channel={channel} /></i>{contactLabels[language][channel]}</span></a>;
    })}</div></div></div></section>
    <Footer copy={copy} language={language} />
  </main>;
}

function Footer({ copy, language }: { copy: SiteCopy; language: Language }) {
  return <footer className="footer"><div className="section-wrap footer-grid"><div className="footer-brand"><Logo /><strong>{copy.footer.studio}</strong></div><p className="footer-address">{copy.footer.location}</p><div className="footer-legal"><p>© {new Date().getFullYear()} · {copy.footer.rights}</p><a className="footer-privacy" href={languagePath[language] + "privacy/"}>{copy.footer.privacy}</a><ConsentSettingsButton language={language} /></div></div></footer>;
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
  const programMedia = getProgramMedia(audience, slug);
  if (!title || !body || !programMedia) return <HomePage language={language} copy={copy} onLanguage={onLanguage} />;

  return <main className={"site-shell detail-shell language-" + language.toLowerCase()}>
    <section className="detail-hero"><Header language={language} copy={copy} onLanguage={onLanguage} internal /><div className="section-wrap detail-hero-grid"><div className="detail-hero-copy"><a className="detail-back" href={languagePath[language] + "#programs"}>← {ui.back}</a><p className="eyebrow">{ui.programFor} · {tag}</p><h1>{title}</h1><p>{body}</p><button className="button button-primary" type="button" onClick={() => openBookingDialog("program_hero")}>{copy.hero.secondary}<span aria-hidden="true">↗</span></button></div>{programMedia.kind === "video" ? <AutoPlayVideo base={programMedia.base} playLabel={ui.playFilm} pauseLabel={ui.pauseFilm} className="program-hero-film" /> : <figure className="program-hero-image"><img src={programMedia.src} alt={title} /></figure>}</div></section>
    <section className="detail-proof section-sand"><div className="section-wrap">{copy.hero.notes.map((note) => <span key={note}>{note}</span>)}</div></section>
    <section className="detail-content section-ivory"><div className="section-wrap detail-content-grid"><article><SectionLabel>{ui.whoTitle}</SectionLabel><h2>{ui.whoTitle}</h2><p>{audience === "adults" ? ui.whoBodyAdult : ui.whoBodyChild}</p></article><article><SectionLabel>{ui.lessonTitle}</SectionLabel><h2>{ui.lessonTitle}</h2><p>{ui.lessonBody}</p></article><article><SectionLabel>{ui.practicalTitle}</SectionLabel><h2>{ui.practicalTitle}</h2><p>{ui.practicalBody}</p><a className="text-link" href={languagePath[language] + "#schedule"}>{ui.scheduleLink}<span aria-hidden="true">↗</span></a></article></div></section>
    {isProAm && <section className="detail-proam section-plum"><div className="section-wrap proam-points">{copy.proam.points.map((point) => <article className="proam-point" key={point.number}><div><h3>{point.title}</h3><p>{point.body}</p></div></article>)}</div></section>}
    <section className="related section-dark"><div className="section-wrap"><SectionLabel light>{ui.related}</SectionLabel><div className="related-grid">{related.map((program) => <a href={programHref(language, program)} key={program.number}><h2>{program.title}</h2><p>{program.body}</p><i aria-hidden="true">↗</i></a>)}</div></div></section>
    <section className="contact-section detail-contact" id="contact"><div className="section-wrap contact-grid"><div><SectionLabel light>{copy.contact.kicker}</SectionLabel><h2>{copy.contact.title}</h2></div><div className="contact-action"><p>{copy.contact.body}</p><button className="button button-light" type="button" onClick={() => openBookingDialog("program_contact")}>{copy.bookShort}<span aria-hidden="true">↗</span></button></div></div></section>
    <Footer copy={copy} language={language} />
  </main>;
}

export default function App({ initialPath, staticRender = false }: { initialPath?: string; staticRender?: boolean } = {}) {
  const browserPath = typeof window === "undefined" ? "/en/" : window.location.pathname;
  const [path, setPath] = useState(initialPath ?? browserPath);
  const route = matchSiteRoute(path);
  const language = route.language;
  const copy = siteCopy[language];

  useEffect(() => {
    if (staticRender) return;
    const syncRoute = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, [staticRender]);

  useEffect(() => {
    if (staticRender) return;
    const seo = getSeoData(path);
    document.documentElement.lang = seo.lang;
    document.title = seo.title;
    updateCanonical(seo.canonical);
    updateAlternates(seo.alternates);
    updateMeta("name", "description", seo.description);
    updateMeta("name", "robots", seo.robots);
    updateMeta("property", "og:url", seo.canonical);
    updateMeta("property", "og:title", seo.title);
    updateMeta("property", "og:description", seo.description);
    updateMeta("name", "twitter:title", seo.title);
    updateMeta("name", "twitter:description", seo.description);
    trackPageView(route.path, seo.title, language);
  }, [language, path, route.path, staticRender]);

  const changeLanguage = (nextLanguage: Language) => {
    let nextPath = languagePath[nextLanguage];
    if (route.kind === "program") nextPath += `${route.audience}/${route.slug}/`;
    if (route.kind === "privacy") nextPath += "privacy/";
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let page;
  if (route.kind === "program") page = <ProgramPage language={language} copy={copy} onLanguage={changeLanguage} audience={route.audience} slug={route.slug} />;
  else if (route.kind === "privacy") page = <PrivacyPage language={language} copy={copy} onLanguage={changeLanguage} />;
  else if (route.kind === "not-found") page = <NotFoundPage language={language} copy={copy} onLanguage={changeLanguage} />;
  else page = <HomePage language={language} copy={copy} onLanguage={changeLanguage} />;

  if (staticRender) return page;
  return <>{page}<EngagementTracker language={language} path={route.path} /><BookingDialog language={language} /><ConsentBanner language={language} /></>;
}
