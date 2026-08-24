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
  footer: { studio: string; location: string; rights: string };
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
    title: "Dance starts here.",
    accent: "A direction for every age.",
    body: "Ballroom & Latin, ballet, Georgian dance and Women’s Tango for adults and children — in Vake, at Tela since 1970.",
    primary: "Explore programs",
    secondary: "Book a free first lesson",
    notes: ["For adults and children", "Start at any level", "First lesson free in every program"],
    directions: [
      { label: "For adults", summary: "Ballroom & Latin · Ballet · Georgian Dance · Women’s Tango" },
      { label: "For children", summary: "Ballroom & Latin · Ballet · Georgian Dance" },
    ],
    media: "DanceStudio Tela classes for adults and children",
  },
  intro: {
    kicker: "Tela · Since 1970",
    title: "A dance studio where every generation can find its rhythm.",
    body: "Founded in 1970 as Georgia’s first Latin ballroom studio, Tela brings adults and children together through beautiful movement, thoughtful teaching and a first lesson that is free in every direction.",
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
    kicker: "Your journey",
    title: "Start exactly where you are. Decide how far you want to go.",
    body: "There is no performance standard to meet before you begin. We teach the first step — and every step after it.",
    steps: [
      { number: "01", title: "First free lesson", body: "Meet your instructor, try the movement and talk about your goals, preferred style and what feels comfortable." },
      { number: "02", title: "Personal program", body: "Build technique and confidence around your chosen music and style. Video recaps help you see your progress." },
      { number: "03", title: "Your spotlight moment", body: "Choose a warm closed evening with friends or an official Pro-Am tournament, with professional filming." },
      { number: "04", title: "A result that stays", body: "Keep the photographs, film, emotion and confidence — then shape the next goal when you are ready." },
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
    body: "Choose a day pair to see the current working timetable. Final public class names and age groups are being confirmed.",
    draft: "Working schedule · confirmation in progress",
    teachers: "With",
  },
  heritage: {
    kicker: "Tela · Since 1970",
    title: "A new chapter of a dance story that began more than half a century ago.",
    body: "Founded in 1970 as Georgia’s first Latin ballroom studio, Tela now carries that legacy forward through the country’s first Pro-Am community — where amateurs dance with professionals, build confidence and share the stage.",
    year: "1970",
    note: "Archive photography and the verified studio chronology will be added here.",
  },
  faq: {
    kicker: "Before your first step",
    title: "The questions almost every beginner asks.",
    items: [
      { question: "Do I need a dance partner?", answer: "No. In Pro-Am, your professional instructor is your dance partner." },
      { question: "What if I have never danced?", answer: "That is completely fine. Your first lesson begins at your current level and moves at your pace." },
      { question: "Do I have to compete?", answer: "No. You can dance entirely for yourself, join a closed studio evening with friends, perform, or enter a tournament. Every stage is optional." },
      { question: "Can I choose the music and style?", answer: "Yes. Your program, pace, music and style are shaped around you. We can also help with your performance look and costume when needed." },
      { question: "Will I receive photos or video?", answer: "Yes. Performances and closed studio events include professional filming, so the experience stays with you in photographs and video." },
      { question: "What should I wear?", answer: "Choose comfortable clothing that lets you move. Special ballroom clothing is not required for your first lesson." },
      { question: "Is the first lesson really free?", answer: "Yes. Your first lesson is free in every DanceStudio Tela Vake program." },
    ],
  },
  contact: {
    kicker: "Your first lesson is free",
    title: "The first step can be beautifully simple.",
    body: "Choose your direction, start from your current level and contact us in the way that feels easiest for you.",
    channels: "Instagram · Facebook · WhatsApp",
    pending: "Direct contact links are being connected",
  },
  footer: { studio: "DanceStudio Tela, Vake", location: "Vake · Tbilisi · Georgia", rights: "All rights reserved" },
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
    title: "ცეკვა აქ იწყება.",
    accent: "მიმართულება ყველა ასაკისთვის.",
    body: "Ballroom & Latin, ბალეტი, ქართული ცეკვა და ქალების ტანგო ბავშვებისა და ზრდასრულებისთვის — ვაკეში, Tela-სთან 1970 წლიდან.",
    primary: "გაეცანი პროგრამებს",
    secondary: "დაჯავშნე პირველი უფასო გაკვეთილი",
    notes: ["ზრდასრულებისა და ბავშვებისთვის", "დაიწყე ნებისმიერი დონიდან", "პირველი გაკვეთილი ყველა პროგრამაში უფასოა"],
    directions: [
      { label: "ზრდასრულებისთვის", summary: "Ballroom & Latin · ბალეტი · ქართული ცეკვა · ქალების ტანგო" },
      { label: "ბავშვებისთვის", summary: "Ballroom & Latin · ბალეტი · ქართული ცეკვა" },
    ],
    media: "სტუდია Tela-ს ცეკვის გაკვეთილები ზრდასრულებისა და ბავშვებისთვის",
  },
  intro: {
    kicker: "Tela · 1970 წლიდან",
    title: "საცეკვაო სტუდია, სადაც ყველა თაობა საკუთარ რიტმს პოულობს.",
    body: "1970 წელს დაარსებული, როგორც საქართველოში პირველი ლათინური სამეჯლისო სტუდია, Tela აერთიანებს ზრდასრულებსა და ბავშვებს ლამაზ მოძრაობაში, გააზრებულ სწავლებასა და ყველა მიმართულებაში უფასო პირველ გაკვეთილში.",
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
    kicker: "შენი გზა",
    title: "დაიწყე იქიდან, სადაც ხარ. თავად გადაწყვიტე, რამდენად შორს წახვალ.",
    body: "დაწყებამდე არანაირი სტანდარტის დაკმაყოფილება არ გჭირდება. ჩვენ გასწავლით პირველ ნაბიჯსაც და ყველა შემდეგ ნაბიჯსაც.",
    steps: [
      { number: "01", title: "პირველი უფასო გაკვეთილი", body: "გაიცანი ინსტრუქტორი, მოსინჯე მოძრაობა და ისაუბრე მიზნებზე, სასურველ სტილსა და კომფორტზე." },
      { number: "02", title: "პერსონალური პროგრამა", body: "განავითარე ტექნიკა და თავდაჯერება შენს მუსიკასა და სტილზე მორგებული სწავლებით. ვიდეო-შეჯამებები პროგრესის დანახვაში დაგეხმარება." },
      { number: "03", title: "შენი განსაკუთრებული მომენტი", body: "აირჩიე მეგობრებისთვის გამართული თბილი დახურული საღამო ან ოფიციალური Pro-Am ტურნირი — პროფესიონალური გადაღებით." },
      { number: "04", title: "შედეგი, რომელიც რჩება", body: "შეინახე ფოტოები, ვიდეო, ემოციები და თავდაჯერება — შემდეგ კი, როცა მზად იქნები, დაგეგმე ახალი მიზანი." },
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
    body: "აირჩიე დღეების წყვილი და ნახე სამუშაო განრიგი. ჯგუფების საბოლოო სახელები და ასაკები ზუსტდება.",
    draft: "სამუშაო განრიგი · მიმდინარეობს დაზუსტება",
    teachers: "პედაგოგები",
  },
  heritage: {
    kicker: "Tela · 1970 წლიდან",
    title: "ნახევარ საუკუნეზე მეტი ხნის წინ დაწყებული საცეკვაო ისტორიის ახალი თავი.",
    body: "1970 წელს დაარსებული, როგორც საქართველოში პირველი ლათინური სამეჯლისო სტუდია, Tela დღეს ამ მემკვიდრეობას ქვეყნის პირველი Pro-Am საზოგადოების მეშვეობით აგრძელებს — აქ მოყვარულები პროფესიონალებთან ცეკვავენ, თავდაჯერებას იძენენ და სცენას იზიარებენ.",
    year: "1970",
    note: "აქ დაემატება საარქივო ფოტოები და სტუდიის დაზუსტებული ქრონოლოგია.",
  },
  faq: {
    kicker: "პირველ ნაბიჯამდე",
    title: "კითხვები, რომლებსაც თითქმის ყველა დამწყები სვამს.",
    items: [
      { question: "მჭირდება საცეკვაო პარტნიორი?", answer: "არა. Pro-Am-ში შენი პროფესიონალი ინსტრუქტორი შენი საცეკვაო პარტნიორია." },
      { question: "თუ არასოდეს მიცეკვია?", answer: "სრულიად ნორმალურია. პირველი გაკვეთილი იწყება შენი დონიდან და მიდის შენს ტემპში." },
      { question: "აუცილებელია შეჯიბრებაში მონაწილეობა?", answer: "არა. შეგიძლია მხოლოდ საკუთარი თავისთვის იცეკვო, მეგობრებთან ერთად დახურულ საღამოში მიიღო მონაწილეობა, სცენაზე გამოხვიდე ან ტურნირზე იასპარეზო. ყველა ეტაპი სურვილისამებრ არის." },
      { question: "შემიძლია მუსიკისა და სტილის არჩევა?", answer: "დიახ. პროგრამა, ტემპი, მუსიკა და სტილი შენზე მორგდება. საჭიროების შემთხვევაში სასცენო იმიჯისა და კოსტიუმის შერჩევაშიც დაგეხმარებით." },
      { question: "მივიღებ ფოტოებს ან ვიდეოს?", answer: "დიახ. გამოსვლებსა და დახურულ ღონისძიებებს პროფესიონალურად ვიღებთ, რათა გამოცდილება ფოტოებსა და ვიდეოში შენთან დარჩეს." },
      { question: "რა ჩავიცვა?", answer: "აირჩიე კომფორტული სამოსი, რომელიც თავისუფლად მოძრაობის საშუალებას გაძლევს. პირველ გაკვეთილზე სპეციალური საცეკვაო ტანსაცმელი საჭირო არ არის." },
      { question: "პირველი გაკვეთილი ნამდვილად უფასოა?", answer: "დიახ. პირველი გაკვეთილი DanceStudio Tela Vake-ის ყველა პროგრამაში უფასოა." },
    ],
  },
  contact: {
    kicker: "პირველი გაკვეთილი უფასოა",
    title: "პირველი ნაბიჯი შეიძლება ძალიან მარტივი იყოს.",
    body: "აირჩიე მიმართულება, დაიწყე შენი დღევანდელი დონიდან და დაგვიკავშირდი შენთვის მოსახერხებელი გზით.",
    channels: "Instagram · Facebook · WhatsApp",
    pending: "პირდაპირი საკონტაქტო ბმულები მალე დაემატება",
  },
  footer: { studio: "სტუდია „თელა“, ვაკე", location: "ვაკე · თბილისი · საქართველო", rights: "ყველა უფლება დაცულია" },
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
    title: "Танец начинается здесь.",
    accent: "Своё направление — для каждого возраста.",
    body: "Ballroom & Latin, балет, грузинские танцы и женское танго для взрослых и детей — в Ваке, в студии Tela с 1970 года.",
    primary: "Смотреть программы",
    secondary: "Записаться на бесплатный урок",
    notes: ["Для взрослых и детей", "Можно начать с нуля", "Первый урок бесплатный в каждом направлении"],
    directions: [
      { label: "Для взрослых", summary: "Ballroom & Latin · Балет · Грузинские танцы · Женское танго" },
      { label: "Для детей", summary: "Ballroom & Latin · Балет · Грузинские танцы" },
    ],
    media: "Занятия в танцевальной студии Tela для взрослых и детей",
  },
  intro: {
    kicker: "Tela · С 1970 года",
    title: "Танцевальная студия, где каждое поколение находит свой ритм.",
    body: "Основанная в 1970 году как первая в Грузии латинская бальная студия, Tela объединяет взрослых и детей через красивое движение, внимательное обучение и бесплатный первый урок в каждом направлении.",
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
    kicker: "Ваш путь",
    title: "Начните там, где находитесь сейчас. Сами решите, как далеко хотите пройти.",
    body: "Перед началом не требуется соответствовать какому-либо уровню. Мы научим первому шагу — и каждому следующему.",
    steps: [
      { number: "01", title: "Первый бесплатный урок", body: "Познакомьтесь с преподавателем, попробуйте движение и обсудите цели, желаемый стиль и комфортный формат." },
      { number: "02", title: "Персональная программа", body: "Развивайте технику и уверенность под выбранную музыку и стиль. Видео-рекапы помогают видеть прогресс." },
      { number: "03", title: "Ваш звёздный момент", body: "Выберите камерный закрытый вечер для друзей или официальный Pro-Am турнир — с профессиональной съёмкой." },
      { number: "04", title: "Результат, который остаётся", body: "Сохраните фотографии, видео, эмоции и уверенность — а когда будете готовы, выберите следующую цель." },
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
    body: "Выберите пару дней, чтобы посмотреть рабочее расписание. Публичные названия групп и возрастные категории уточняются.",
    draft: "Рабочее расписание · информация уточняется",
    teachers: "Преподаватели",
  },
  heritage: {
    kicker: "Tela · С 1970 года",
    title: "Новая глава танцевальной истории, начавшейся более полувека назад.",
    body: "Основанная в 1970 году как первая в Грузии латинская бальная студия, Tela продолжает эту историю через первое в стране Pro-Am-сообщество — здесь любители танцуют с профессионалами, обретают уверенность и делят с ними сцену.",
    year: "1970",
    note: "Здесь появятся архивные фотографии и проверенная хронология студии.",
  },
  faq: {
    kicker: "Перед первым шагом",
    title: "Вопросы, которые задаёт почти каждый начинающий.",
    items: [
      { question: "Мне нужен танцевальный партнёр?", answer: "Нет. В Pro-Am профессиональный преподаватель становится вашим танцевальным партнёром." },
      { question: "Что, если я никогда не танцевал(а)?", answer: "Это совершенно нормально. Первый урок начинается с вашего текущего уровня и проходит в комфортном темпе." },
      { question: "Я должен(на) участвовать в соревнованиях?", answer: "Нет. Можно танцевать исключительно для себя, принять участие в закрытом вечере для друзей, выступить на сцене или выйти на турнир. Каждый этап добровольный." },
      { question: "Можно выбрать музыку и стиль?", answer: "Да. Программа, темп, музыка и стиль создаются вокруг вас. При необходимости мы также поможем подобрать сценический образ и костюм." },
      { question: "Останутся ли у меня фотографии или видео?", answer: "Да. Выступления и закрытые мероприятия сопровождаются профессиональной съёмкой, поэтому этот опыт останется с вами в фотографиях и видео." },
      { question: "Что надеть?", answer: "Выберите удобную одежду, которая не мешает двигаться. Специальный танцевальный костюм на первом уроке не нужен." },
      { question: "Первый урок действительно бесплатный?", answer: "Да. Первый урок бесплатный в каждом направлении DanceStudio Tela Vake." },
    ],
  },
  contact: {
    kicker: "Первый урок бесплатный",
    title: "Первый шаг может быть удивительно простым.",
    body: "Выберите направление, начните с вашего уровня и свяжитесь с нами удобным способом.",
    channels: "Instagram · Facebook · WhatsApp",
    pending: "Прямые контактные ссылки скоро будут добавлены",
  },
  footer: { studio: "Танцевальная студия «Тела», Ваке", location: "Ваке · Тбилиси · Грузия", rights: "Все права защищены" },
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
