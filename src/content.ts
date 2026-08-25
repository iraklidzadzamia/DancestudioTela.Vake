export type Language = "EN" | "KA" | "RU";

export interface SiteCopy {
  languageCode: string;
  pageTitle: string;
  pageDescription: string;
  nav: { label: string; href: string }[];
  bookShort: string;
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    primary: string;
    secondary: string;
    notes: string[];
    directions: { label: string; summary: string }[];
    media: string;
  };
  intro: { kicker: string; title: string; body: string };
  proam: {
    kicker: string;
    title: string;
    body: string;
    points: { number: string; title: string; body: string }[];
    aside: string;
  };
  benefits: string[];
  journey: {
    kicker: string;
    title: string;
    body: string;
    steps: { number: string; title: string; body: string }[];
  };
  programs: {
    kicker: string;
    title: string;
    body: string;
    adultLabel: string;
    childrenLabel: string;
    items: { number: string; title: string; body: string; tag: string; audience: "adults" | "children" }[];
  };
  schedule: {
    kicker: string;
    title: string;
    body: string;
    draft: string;
    teachers: string;
  };
  heritage: {
    kicker: string;
    title: string;
    body: string;
    year: string;
    note: string;
  };
  faq: {
    kicker: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    channels: string;
    pending: string;
  };
  footer: { studio: string; location: string; privacy: string; rights: string };
}

const en: SiteCopy = {
  languageCode: "en",
  pageTitle: "DanceStudio Tela, Vake — Dance classes for adults & children",
  pageDescription: "Dance classes for adults and children in Vake: Ballroom & Latin, ballet, Georgian dance, Women’s Tango and Pro-Am. First lesson free in every program.",
  nav: [
    { label: "Programs", href: "#programs" },
    { label: "Pro-Am", href: "#proam" },
    { label: "Schedule", href: "#schedule" },
    { label: "Our story", href: "#story" },
  ],
  bookShort: "Book",
  hero: {
    eyebrow: "TELA · SINCE 1970 · VAKE, TBILISI",
    title: "Find your",
    accent: "way to dance.",
    body: "Since 1970, Tela has helped adults and children discover dance. Today in Vake, we teach Ballroom & Latin, ballet, Georgian dance and Women’s Tango.",
    primary: "Choose your program",
    secondary: "Book a free first lesson",
    notes: ["For adults and children", "Different directions in one studio", "First lesson free in every program"],
    directions: [
      { label: "For adults", summary: "Ballroom & Latin · Ballet · Georgian Dance · Women’s Tango" },
      { label: "For children", summary: "Ballroom & Latin · Ballet · Georgian Dance" },
    ],
    media: "A cinematic tour of the real Tela studio interior",
  },
  intro: {
    kicker: "Tela · Since 1970",
    title: "Dance for every generation.",
    body: "Tela’s dance story began in 1970. Today in Vake, adults and children meet here through movement, music and thoughtful teaching.",
  },
  proam: {
    kicker: "What is Pro-Am?",
    title: "You are the amateur. Your instructor is the professional — and your dance partner.",
    body: "You learn together at your pace, with private coaching built around you — including music, style and, when needed, your performance look. Dance for yourself, share a closed studio evening with friends, perform, or take the journey to competition. The choice is always yours.",
    points: [
      { number: "01", title: "A professional partner", body: "Arrive on your own. Your instructor teaches and dances with you." },
      { number: "02", title: "Personal coaching", body: "Every lesson adapts to your experience, confidence and goals." },
      { number: "03", title: "Your own destination", body: "Dance for yourself, share a private studio evening, perform or compete — every destination is optional." },
    ],
    aside: "Personal attention changes everything.",
  },
  benefits: ["Movement", "Confidence", "Music", "Progress", "Connection", "Joy"],
  journey: {
    kicker: "Beginning at Tela",
    title: "Your first step, made simple.",
    body: "You do not need experience or a finished goal. We help you choose the right class, begin comfortably and build from there.",
    steps: [
      { number: "01", title: "Choose your path", body: "Tell us whether you are choosing for yourself or a child and what kind of movement draws you in." },
      { number: "02", title: "Try it for free", body: "Meet the teacher, experience the class and ask everything you want to know before deciding." },
      { number: "03", title: "Learn with attention", body: "Build technique, musicality and confidence at a pace that suits the dancer and the program." },
      { number: "04", title: "Make dance yours", body: "Enjoy the weekly ritual, grow through movement and choose new goals only when they feel right." },
    ],
  },
  programs: {
    kicker: "Choose your direction",
    title: "One studio. Different ways to dance.",
    body: "Start with the path that feels right for you or your child. Pro-Am is a separate personal Ballroom & Latin experience for adults who want to dance with a professional partner.",
    adultLabel: "For adults",
    childrenLabel: "For children",
    items: [
      { number: "01", title: "Ballroom & Latin", body: "Learn the elegance, rhythm and confidence of partner dance in a welcoming adult class.", tag: "Adults", audience: "adults" },
      { number: "02", title: "Women’s Tango", body: "A focused class for musicality, posture and expressive tango movement.", tag: "Adults", audience: "adults" },
      { number: "03", title: "Ballet", body: "Build technique, alignment and expressive movement at your own level.", tag: "Adults", audience: "adults" },
      { number: "04", title: "Georgian Dance", body: "Connect with Georgian rhythm, tradition and powerful ensemble movement.", tag: "Adults", audience: "adults" },
      { number: "05", title: "Ballroom & Latin", body: "A joyful foundation in musicality, movement and partner dance for young dancers.", tag: "Children", audience: "children" },
      { number: "06", title: "Ballet", body: "Age-appropriate training in posture, coordination, imagination and technique.", tag: "Children", audience: "children" },
      { number: "07", title: "Georgian Dance", body: "Movement, culture and teamwork through Georgia’s dance traditions.", tag: "Children", audience: "children" },
    ],
  },
  schedule: {
    kicker: "Studio timetable",
    title: "Find your time to dance.",
    body: "Choose a day pair to see the current timetable. Contact us before your first visit and we will recommend the most suitable group for your age, experience and goals.",
    draft: "Current timetable · confirm your group before visiting",
    teachers: "With",
  },
  heritage: {
    kicker: "Tela · Since 1970",
    title: "A dance story still moving since 1970.",
    body: "Tela’s story began in 1970. More than half a century later, that experience lives on in classes for adults and children — from Ballroom & Latin to ballet, Georgian dance, Women’s Tango and Pro-Am.",
    year: "1970",
    note: "More than half a century of dance experience continues in the studio today.",
  },
  faq: {
    kicker: "Before your first step",
    title: "Before your first lesson.",
    items: [
      { question: "Do I need a dance partner?", answer: "Tell us which direction interests you and we will explain the format. For Pro-Am you do not need a partner — your professional instructor dances with you." },
      { question: "What if I have never danced?", answer: "That is completely fine. Your first lesson begins at your current level and moves at your pace." },
      { question: "Which programs are available?", answer: "Adults can choose Ballroom & Latin, ballet, Georgian dance, Women’s Tango and Pro-Am. For children we offer Ballroom & Latin, ballet and Georgian dance." },
      { question: "How do I choose the right program?", answer: "You do not need to decide alone. Tell us who the class is for, the preferred age group and what you want to feel or learn; we will guide you." },
      { question: "Are competitions required?", answer: "No. Performance and competition opportunities belong to particular paths and remain optional. Dancing for joy, movement and confidence is a complete goal." },
      { question: "What should I wear?", answer: "Choose comfortable clothing that lets you move. Special ballroom clothing is not required for your first lesson." },
      { question: "Is the first lesson really free?", answer: "Yes. Your first lesson is free in every DanceStudio Tela Vake program." },
    ],
  },
  contact: {
    kicker: "Your first lesson is free",
    title: "We’ll help you choose your first step.",
    body: "Choose your direction, start from your current level and contact us in the way that feels easiest for you.",
    channels: "Google Maps · Instagram Direct · Messenger · WhatsApp · Phone",
    pending: "",
  },
  footer: { studio: "DanceStudio Tela, Vake", location: "2/5 Ateni Street, Vake, Tbilisi, Georgia", privacy: "Privacy policy", rights: "All rights reserved" },
};

const ka: SiteCopy = {
  ...en,
  languageCode: "ka",
  pageTitle: "სტუდია „თელა“, ვაკე — ცეკვა ზრდასრულებისა და ბავშვებისთვის",
  pageDescription: "ცეკვის გაკვეთილები ზრდასრულებისა და ბავშვებისთვის ვაკეში: Ballroom & Latin, ბალეტი, ქართული ცეკვა, ქალების ტანგო და Pro-Am. პირველი გაკვეთილი ყველა პროგრამაში უფასოა.",
  nav: [
    { label: "პროგრამები", href: "#programs" },
    { label: "Pro-Am", href: "#proam" },
    { label: "განრიგი", href: "#schedule" },
    { label: "ჩვენი ისტორია", href: "#story" },
  ],
  bookShort: "დაჯავშნა",
  hero: {
    eyebrow: "TELA · 1970 წლიდან · ვაკე, თბილისი",
    title: "იპოვე შენი",
    accent: "ცეკვა.",
    body: "1970 წლიდან Tela ზრდასრულებსა და ბავშვებს ცეკვის აღმოჩენაში ეხმარება. დღეს ვაკეში ვასწავლით Ballroom & Latin-ს, ბალეტს, ქართულ ცეკვასა და ქალების ტანგოს.",
    primary: "იპოვე შენი მიმართულება",
    secondary: "დაჯავშნე პირველი უფასო გაკვეთილი",
    notes: ["ზრდასრულებისა და ბავშვებისთვის", "სხვადასხვა მიმართულება ერთ სტუდიაში", "პირველი გაკვეთილი ყველა პროგრამაში უფასოა"],
    directions: [
      { label: "ზრდასრულებისთვის", summary: "Ballroom & Latin · ბალეტი · ქართული ცეკვა · ქალების ტანგო" },
      { label: "ბავშვებისთვის", summary: "Ballroom & Latin · ბალეტი · ქართული ცეკვა" },
    ],
    media: "ნამდვილი Tela-ს სტუდიის კინემატოგრაფიული ვიდეო",
  },
  intro: {
    kicker: "Tela · 1970 წლიდან",
    title: "ცეკვა ყველა თაობისთვის.",
    body: "Tela-ს საცეკვაო ისტორია 1970 წელს დაიწყო. დღეს ვაკეში ზრდასრულები და ბავშვები მოძრაობით, მუსიკითა და ყურადღებიანი სწავლებით ერთიანდებიან.",
  },
  proam: {
    kicker: "რა არის Pro-Am?",
    title: "შენ ხარ მოყვარული, შენი ინსტრუქტორი კი პროფესიონალი — და შენი საცეკვაო პარტნიორი.",
    body: "სწავლობთ ერთად, შენს ტემპში და შენზე მორგებული ინდივიდუალური პროგრამით — მუსიკის, სტილისა და საჭიროების შემთხვევაში სასცენო იმიჯის შერჩევით. შეგიძლია იცეკვო საკუთარი სიამოვნებისთვის, მეგობრებისთვის გამართულ დახურულ საღამოზე გამოხვიდე ან შეჯიბრებამდე მიხვიდე — არჩევანი შენია.",
    points: [
      { number: "01", title: "პროფესიონალი პარტნიორი", body: "მოდი დამოუკიდებლად — ინსტრუქტორი გასწავლის და შენთან ერთად იცეკვებს." },
      { number: "02", title: "პერსონალური სწავლება", body: "ყოველი გაკვეთილი ერგება შენს გამოცდილებას, თავდაჯერებასა და მიზნებს." },
      { number: "03", title: "შენი დანიშნულება", body: "იცეკვე საკუთარი თავისთვის, მიიღე მონაწილეობა დახურულ საღამოში, გამოდი სცენაზე ან იასპარეზე — ყველა გზა სურვილისამებრ არის." },
    ],
    aside: "პერსონალური ყურადღება ყველაფერს ცვლის.",
  },
  benefits: ["მოძრაობა", "თავდაჯერება", "მუსიკა", "პროგრესი", "კავშირი", "სიხარული"],
  journey: {
    kicker: "დასაწყისი Tela-ში",
    title: "პირველი ნაბიჯი — მარტივად.",
    body: "გამოცდილება და საბოლოო მიზანი საჭირო არ არის. დაგეხმარებით სწორი კლასის არჩევაში, კომფორტულად დაწყებასა და თანდათან განვითარებაში.",
    steps: [
      { number: "01", title: "აირჩიე შენი გზა", body: "გვითხარი, შენთვის ირჩევ თუ ბავშვისთვის და როგორი მოძრაობა გიზიდავს." },
      { number: "02", title: "სცადე უფასოდ", body: "გაიცანი პედაგოგი, მოსინჯე გაკვეთილი და გადაწყვეტილებამდე დასვი ყველა კითხვა." },
      { number: "03", title: "ისწავლე ყურადღებით", body: "განავითარე ტექნიკა, მუსიკალურობა და თავდაჯერება მოცეკვავისა და პროგრამის შესაბამის ტემპში." },
      { number: "04", title: "ცეკვა გახადე შენი", body: "ისიამოვნე ყოველკვირეული რიტუალით, გაიზარდე მოძრაობით და ახალი მიზნები მაშინ აირჩიე, როცა მზად იქნები." },
    ],
  },
  programs: {
    kicker: "აირჩიე მიმართულება",
    title: "ერთი სტუდია. ცეკვის სხვადასხვა გზა.",
    body: "დაიწყე იმ გზით, რომელიც შენ ან შენს ბავშვს შეეფერება. Pro-Am ზრდასრულებისთვის Ballroom & Latin-ის ცალკე პერსონალური გამოცდილებაა — პროფესიონალ პარტნიორთან ერთად.",
    adultLabel: "ზრდასრულებისთვის",
    childrenLabel: "ბავშვებისთვის",
    items: [
      { number: "01", title: "Ballroom & Latin", body: "შეისწავლე წყვილში ცეკვის ელეგანტურობა, რიტმი და თავდაჯერება ზრდასრულთა მეგობრულ ჯგუფში.", tag: "ზრდასრულები", audience: "adults" },
      { number: "02", title: "ქალების ტანგო", body: "მუსიკალურობის, პოზისა და გამომსახველი ტანგოს მოძრაობისთვის შექმნილი სპეციალური გაკვეთილი.", tag: "ზრდასრულები", audience: "adults" },
      { number: "03", title: "ბალეტი", body: "განავითარე ტექნიკა, სხეულის სწორად დაჭერა და გამომსახველი მოძრაობა შენს დონეზე.", tag: "ზრდასრულები", audience: "adults" },
      { number: "04", title: "ქართული ცეკვა", body: "შეიგრძენი ქართული რიტმი, ტრადიცია და ძლიერი ჯგუფური მოძრაობა.", tag: "ზრდასრულები", audience: "adults" },
      { number: "05", title: "Ballroom & Latin", body: "მუსიკალურობის, მოძრაობისა და წყვილში ცეკვის მხიარული დასაწყისი პატარა მოცეკვავეებისთვის.", tag: "ბავშვები", audience: "children" },
      { number: "06", title: "ბალეტი", body: "ასაკზე მორგებული სწავლება პოზისთვის, კოორდინაციისთვის, წარმოსახვისა და ტექნიკისთვის.", tag: "ბავშვები", audience: "children" },
      { number: "07", title: "ქართული ცეკვა", body: "მოძრაობა, კულტურა და გუნდურობა ქართული ცეკვის ტრადიციებით.", tag: "ბავშვები", audience: "children" },
    ],
  },
  schedule: {
    kicker: "სტუდიის განრიგი",
    title: "იპოვე შენი დრო ცეკვისთვის.",
    body: "აირჩიე დღეების წყვილი და ნახე მიმდინარე განრიგი. პირველ ვიზიტამდე დაგვიკავშირდი და ასაკის, გამოცდილებისა და მიზნების მიხედვით ყველაზე შესაფერის ჯგუფს გირჩევთ.",
    draft: "მიმდინარე განრიგი · ვიზიტამდე დაადასტურე ჯგუფი",
    teachers: "პედაგოგები",
  },
  heritage: {
    kicker: "Tela · 1970 წლიდან",
    title: "1970 წლიდან ცოცხალი საცეკვაო ისტორია.",
    body: "Tela-ს ისტორია 1970 წელს დაიწყო. ნახევარ საუკუნეზე მეტი ხნის შემდეგ ეს გამოცდილება ზრდასრულებისა და ბავშვების კლასებში გრძელდება — Ballroom & Latin-იდან ბალეტამდე, ქართულ ცეკვამდე, ქალების ტანგომდე და Pro-Am-მდე.",
    year: "1970",
    note: "ნახევარ საუკუნეზე მეტი საცეკვაო გამოცდილება სტუდიაში დღესაც გრძელდება.",
  },
  faq: {
    kicker: "პირველ ნაბიჯამდე",
    title: "პირველ გაკვეთილამდე.",
    items: [
      { question: "მჭირდება საცეკვაო პარტნიორი?", answer: "გვითხარი, რომელი მიმართულება გაინტერესებს და ფორმატს აგიხსნით. Pro-Am-ისთვის პარტნიორი არ გჭირდება — შენთან პროფესიონალი ინსტრუქტორი ცეკვავს." },
      { question: "თუ არასოდეს მიცეკვია?", answer: "სრულიად ნორმალურია. პირველი გაკვეთილი იწყება შენი დონიდან და მიდის შენს ტემპში." },
      { question: "რომელი პროგრამებია ხელმისაწვდომი?", answer: "ზრდასრულებისთვის გვაქვს Ballroom & Latin, ბალეტი, ქართული ცეკვა, ქალების ტანგო და Pro-Am. ბავშვებისთვის — Ballroom & Latin, ბალეტი და ქართული ცეკვა." },
      { question: "როგორ ავირჩიო სწორი პროგრამა?", answer: "მარტო არჩევა არ გჭირდება. გვითხარი, ვისთვის არის გაკვეთილი, სასურველი ასაკი და რისი სწავლა ან შეგრძნება გსურს — მიმართულებას გირჩევთ." },
      { question: "შეჯიბრებები აუცილებელია?", answer: "არა. გამოსვლა და შეჯიბრება მხოლოდ ზოგიერთი გზის შესაძლებლობაა და ყოველთვის ნებაყოფლობითია. სიხარულისთვის, მოძრაობისა და თავდაჯერებისთვის ცეკვაც სრულფასოვანი მიზანია." },
      { question: "რა ჩავიცვა?", answer: "აირჩიე კომფორტული სამოსი, რომელიც თავისუფლად მოძრაობის საშუალებას გაძლევს. პირველ გაკვეთილზე სპეციალური საცეკვაო ტანსაცმელი საჭირო არ არის." },
      { question: "პირველი გაკვეთილი ნამდვილად უფასოა?", answer: "დიახ. პირველი გაკვეთილი DanceStudio Tela Vake-ის ყველა პროგრამაში უფასოა." },
    ],
  },
  contact: {
    kicker: "პირველი გაკვეთილი უფასოა",
    title: "პირველი ნაბიჯის არჩევაში დაგეხმარებით.",
    body: "აირჩიე მიმართულება, დაიწყე შენი დღევანდელი დონიდან და დაგვიკავშირდი შენთვის მოსახერხებელი გზით.",
    channels: "Google Maps · Instagram Direct · Messenger · WhatsApp · ტელეფონი",
    pending: "",
  },
  footer: { studio: "სტუდია „თელა“, ვაკე", location: "ათენის ქუჩა 2/5 · ვაკე · თბილისი · საქართველო", privacy: "კონფიდენციალურობის პოლიტიკა", rights: "ყველა უფლება დაცულია" },
};

const ru: SiteCopy = {
  ...en,
  languageCode: "ru",
  pageTitle: "Танцевальная студия «Тела», Ваке — занятия для взрослых и детей",
  pageDescription: "Танцевальные занятия для взрослых и детей в Ваке: Ballroom & Latin, балет, грузинские танцы, женское танго и Pro-Am. Первый урок бесплатный в каждом направлении.",
  nav: [
    { label: "Программы", href: "#programs" },
    { label: "Pro-Am", href: "#proam" },
    { label: "Расписание", href: "#schedule" },
    { label: "Наша история", href: "#story" },
  ],
  bookShort: "Запись",
  hero: {
    eyebrow: "TELA · С 1970 ГОДА · ВАКЕ, ТБИЛИСИ",
    title: "Найдите свой",
    accent: "танец.",
    body: "С 1970 года Tela помогает взрослым и детям открывать танец. Сегодня в Ваке мы преподаём Ballroom & Latin, балет, грузинские танцы и Women’s Tango.",
    primary: "Выбрать направление",
    secondary: "Записаться на бесплатный урок",
    notes: ["Для взрослых и детей", "Разные направления в одной студии", "Первый урок бесплатный в каждом направлении"],
    directions: [
      { label: "Для взрослых", summary: "Ballroom & Latin · Балет · Грузинские танцы · Женское танго" },
      { label: "Для детей", summary: "Ballroom & Latin · Балет · Грузинские танцы" },
    ],
    media: "Кинематографичное видео настоящего интерьера студии Tela",
  },
  intro: {
    kicker: "Tela · С 1970 года",
    title: "Танец для каждого поколения.",
    body: "Танцевальная история Tela началась в 1970 году. Сегодня в Ваке Tela объединяет взрослых и детей через движение, музыку и внимательное обучение.",
  },
  proam: {
    kicker: "Что такое Pro-Am?",
    title: "Вы — любитель. Ваш преподаватель — профессионал и ваш танцевальный партнёр.",
    body: "Вы учитесь вместе в удобном темпе по персональной программе — с выбором музыки, стиля и, при необходимости, сценического образа. Танцуйте для себя, выступайте на закрытом вечере для друзей или двигайтесь к соревнованиям. Выбор всегда остаётся за вами.",
    points: [
      { number: "01", title: "Профессиональный партнёр", body: "Приходите самостоятельно — преподаватель обучает вас и танцует вместе с вами." },
      { number: "02", title: "Персональная программа", body: "Каждый урок адаптируется к вашему опыту, уверенности и целям." },
      { number: "03", title: "Ваша цель", body: "Танцуйте для себя, участвуйте в закрытом вечере, выступайте или соревнуйтесь — каждый вариант остаётся добровольным." },
    ],
    aside: "Персональное внимание меняет всё.",
  },
  benefits: ["Движение", "Уверенность", "Музыка", "Прогресс", "Общение", "Радость"],
  journey: {
    kicker: "Начало в Tela",
    title: "Первый шаг — без сложностей.",
    body: "Опыт и готовая цель не нужны. Мы поможем выбрать подходящее занятие, комфортно начать и постепенно двигаться дальше.",
    steps: [
      { number: "01", title: "Выберите свой путь", body: "Расскажите, выбираете вы для себя или ребёнка и какое движение вам ближе." },
      { number: "02", title: "Попробуйте бесплатно", body: "Познакомьтесь с преподавателем, почувствуйте занятие и задайте все вопросы до принятия решения." },
      { number: "03", title: "Учитесь с вниманием", body: "Развивайте технику, музыкальность и уверенность в темпе, подходящем ученику и программе." },
      { number: "04", title: "Сделайте танец своим", body: "Наслаждайтесь еженедельным ритуалом, растите через движение и выбирайте новые цели, когда будете готовы." },
    ],
  },
  programs: {
    kicker: "Выберите направление",
    title: "Одна студия. Разные пути в танце.",
    body: "Начните с направления, которое подходит вам или вашему ребёнку. Pro-Am — отдельный персональный формат Ballroom & Latin для взрослых, которые хотят танцевать с профессиональным партнёром.",
    adultLabel: "Для взрослых",
    childrenLabel: "Для детей",
    items: [
      { number: "01", title: "Ballroom & Latin", body: "Осваивайте элегантность, ритм и уверенность парного танца в дружелюбной взрослой группе.", tag: "Взрослые", audience: "adults" },
      { number: "02", title: "Женское танго", body: "Направление для музыкальности, осанки и выразительного движения в танго.", tag: "Взрослые", audience: "adults" },
      { number: "03", title: "Балет", body: "Развивайте технику, осанку и выразительность в комфортном для вас темпе.", tag: "Взрослые", audience: "adults" },
      { number: "04", title: "Грузинские танцы", body: "Откройте грузинский ритм, традицию и силу совместного движения.", tag: "Взрослые", audience: "adults" },
      { number: "05", title: "Ballroom & Latin", body: "Радостное знакомство с музыкальностью, движением и парным танцем для детей.", tag: "Дети", audience: "children" },
      { number: "06", title: "Балет", body: "Занятия по возрасту для осанки, координации, воображения и техники.", tag: "Дети", audience: "children" },
      { number: "07", title: "Грузинские танцы", body: "Движение, культура и командность через традиции грузинского танца.", tag: "Дети", audience: "children" },
    ],
  },
  schedule: {
    kicker: "Расписание студии",
    title: "Найдите своё время для танца.",
    body: "Выберите пару дней, чтобы посмотреть актуальное расписание. Перед первым визитом свяжитесь с нами — мы порекомендуем группу с учётом возраста, опыта и целей.",
    draft: "Актуальное расписание · подтвердите группу перед визитом",
    teachers: "Преподаватели",
  },
  heritage: {
    kicker: "Tela · С 1970 года",
    title: "Танцевальная история, которая продолжается с 1970 года.",
    body: "История Tela началась в 1970 году. Спустя более полувека этот опыт продолжается в занятиях для взрослых и детей — от Ballroom & Latin до балета, грузинских танцев, Women’s Tango и Pro-Am.",
    year: "1970",
    note: "Более полувека танцевального опыта продолжаются в студии сегодня.",
  },
  faq: {
    kicker: "Перед первым шагом",
    title: "Перед первым занятием.",
    items: [
      { question: "Мне нужен танцевальный партнёр?", answer: "Расскажите, какое направление вас интересует, и мы объясним формат. Для Pro-Am партнёр не нужен — с вами танцует профессиональный преподаватель." },
      { question: "Что, если я никогда не танцевал(а)?", answer: "Это совершенно нормально. Первый урок начинается с вашего текущего уровня и проходит в комфортном темпе." },
      { question: "Какие направления доступны?", answer: "Для взрослых есть Ballroom & Latin, балет, грузинские танцы, Women’s Tango и Pro-Am. Для детей — Ballroom & Latin, балет и грузинские танцы." },
      { question: "Как выбрать подходящее направление?", answer: "Вам не нужно решать в одиночку. Расскажите, для кого занятие, возраст и что хочется почувствовать или освоить — мы поможем с выбором." },
      { question: "Обязательно ли участвовать в соревнованиях?", answer: "Нет. Выступления и соревнования относятся к отдельным форматам и всегда остаются добровольными. Танцевать для удовольствия, движения и уверенности — полноценная цель." },
      { question: "Что надеть?", answer: "Выберите удобную одежду, которая не мешает двигаться. Специальный танцевальный костюм на первом уроке не нужен." },
      { question: "Первый урок действительно бесплатный?", answer: "Да. Первый урок бесплатный в каждом направлении DanceStudio Tela Vake." },
    ],
  },
  contact: {
    kicker: "Первый урок бесплатный",
    title: "Поможем выбрать ваш первый шаг.",
    body: "Выберите направление, начните с вашего уровня и свяжитесь с нами удобным способом.",
    channels: "Google Maps · Instagram Direct · Messenger · WhatsApp · Телефон",
    pending: "",
  },
  footer: { studio: "Танцевальная студия «Тела», Ваке", location: "улица Атени, 2/5 · Ваке · Тбилиси · Грузия", privacy: "Политика конфиденциальности", rights: "Все права защищены" },
};

export const siteCopy: Record<Language, SiteCopy> = { EN: en, KA: ka, RU: ru };

export interface ScheduleGroup {
  id: string;
  label: Record<Language, string>;
  classes: { time: string; title: string; teachers?: string }[];
}

export const scheduleGroups: ScheduleGroup[] = [
  {
    id: "mon-thu",
    label: { EN: "Monday + Thursday", KA: "ორშაბათი + ხუთშაბათი", RU: "Понедельник + четверг" },
    classes: [
      { time: "12:00–13:30", title: "Karina's Amateurs", teachers: "Karina" },
      { time: "16:00–17:30", title: "Kids Georgian Dance" },
      { time: "17:30–19:00", title: "Kids Ballroom Old", teachers: "Karina & Vakho" },
      { time: "19:00–20:30", title: "Karina's Amateurs", teachers: "Karina" },
      { time: "20:30–22:00", title: "Tango On Bars" },
    ],
  },
  {
    id: "tue-thu",
    label: { EN: "Tuesday + Thursday", KA: "სამშაბათი + ხუთშაბათი", RU: "Вторник + четверг" },
    classes: [{ time: "14:30–15:30", title: "Kids Ballet Dance" }],
  },
  {
    id: "tue-fri",
    label: { EN: "Tuesday + Friday", KA: "სამშაბათი + პარასკევი", RU: "Вторник + пятница" },
    classes: [
      { time: "17:30–19:00", title: "Kids New Group", teachers: "Taso & Vakho" },
      { time: "19:00–20:30", title: "Taso & Gio's Amateurs Old", teachers: "Taso & Gio" },
      { time: "20:30–22:00", title: "New Amateurs", teachers: "Taso & Gio" },
    ],
  },
  {
    id: "wed-sat",
    label: { EN: "Wednesday + Saturday", KA: "ოთხშაბათი + შაბათი", RU: "Среда + суббота" },
    classes: [{ time: "19:00–20:30", title: "New Amateurs", teachers: "Sopi Chkhenkeli" }],
  },
];
