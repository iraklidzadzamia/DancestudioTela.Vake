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
    items: { number: string; title: string; body: string; tag: string }[];
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
  pageTitle: "DanceStudio Tela, Vake — Ballroom & Latin in Tbilisi",
  pageDescription: "Private Pro-Am Ballroom & Latin lessons for adults in Vake, Tbilisi. No partner or experience needed. Your first lesson is free.",
  nav: [
    { label: "Pro-Am", href: "#proam" },
    { label: "Programs", href: "#programs" },
    { label: "Schedule", href: "#schedule" },
    { label: "Our story", href: "#story" },
  ],
  bookShort: "Book",
  hero: {
    eyebrow: "TELA · SINCE 1970 · VAKE, TBILISI",
    title: "Dance with a professional.",
    accent: "Discover Ballroom & Latin in Vake.",
    body: "Private Pro-Am coaching for adults — from your very first step to performances and competitions.",
    primary: "Book your first free lesson",
    secondary: "Ask us anything",
    notes: ["No partner needed", "No experience needed", "Competition is optional"],
    media: "Private Pro-Am Ballroom & Latin lesson",
  },
  intro: {
    kicker: "A different kind of dance experience",
    title: "Not simply a class. A beautiful part of your week that belongs entirely to you.",
    body: "Move, learn and connect in a warm studio environment, with personal attention and a path shaped around your goals.",
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
    kicker: "More ways to dance",
    title: "A studio for different ages, rhythms and ambitions.",
    body: "Pro-Am is the heart of the adult experience. Other Tela programs remain easy to discover for families and dancers with different interests.",
    items: [
      { number: "01", title: "Georgian Dance", body: "Tradition, movement and Georgian culture for children and adults.", tag: "Children · Adults" },
      { number: "02", title: "Ballet", body: "Technique, posture and expression through age-appropriate training.", tag: "Children · Adults" },
      { number: "03", title: "Ballroom & Latin for Kids", body: "A structured introduction to movement, musicality and partner dance.", tag: "Children" },
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
      { question: "Is the first lesson really free?", answer: "Yes. Your first lesson at DanceStudio Tela Vake is free." },
    ],
  },
  contact: {
    kicker: "Your first lesson is free",
    title: "The first step can be beautifully simple.",
    body: "You do not need experience. You do not need a partner. Choose the way you would like to contact us.",
    channels: "Instagram · Facebook · WhatsApp",
    pending: "Direct contact links are being connected",
  },
  footer: { studio: "DanceStudio Tela, Vake", location: "Vake · Tbilisi · Georgia", rights: "All rights reserved" },
};

const ka: SiteCopy = {
  ...en,
  languageCode: "ka",
  pageTitle: "სტუდია „თელა“, ვაკე — Ballroom & Latin თბილისში",
  pageDescription: "ინდივიდუალური Pro-Am Ballroom & Latin გაკვეთილები ზრდასრულებისთვის ვაკეში. პარტნიორი და გამოცდილება არ არის საჭირო. პირველი გაკვეთილი უფასოა.",
  nav: [
    { label: "Pro-Am", href: "#proam" },
    { label: "პროგრამები", href: "#programs" },
    { label: "განრიგი", href: "#schedule" },
    { label: "ჩვენი ისტორია", href: "#story" },
  ],
  bookShort: "დაჯავშნა",
  hero: {
    eyebrow: "TELA · 1970 წლიდან · ვაკე, თბილისი",
    title: "იცეკვე პროფესიონალთან ერთად.",
    accent: "აღმოაჩინე Ballroom & Latin ვაკეში.",
    body: "ინდივიდუალური Pro-Am გაკვეთილები ზრდასრულებისთვის — პირველი ნაბიჯიდან გამოსვლებსა და შეჯიბრებებამდე.",
    primary: "დაჯავშნე პირველი უფასო გაკვეთილი",
    secondary: "მოგვწერე",
    notes: ["პარტნიორი არ გჭირდება", "გამოცდილება არ გჭირდება", "შეჯიბრება სურვილისამებრ"],
    media: "ინდივიდუალური Pro-Am Ballroom & Latin გაკვეთილი",
  },
  intro: {
    kicker: "განსხვავებული საცეკვაო გამოცდილება",
    title: "არა უბრალოდ გაკვეთილი — კვირის განსაკუთრებული დრო, რომელიც მხოლოდ შენ გეკუთვნის.",
    body: "იმოძრავე, ისწავლე და იპოვე ახალი კავშირები თბილ გარემოში, პერსონალური ყურადღებითა და შენს მიზნებზე მორგებული გზით.",
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
    kicker: "ცეკვის სხვა გზები",
    title: "სტუდია სხვადასხვა ასაკის, რიტმისა და მიზნისთვის.",
    body: "Pro-Am ზრდასრულთა გამოცდილების ცენტრია. Tela-ს სხვა პროგრამები ხელმისაწვდომია ოჯახებისა და განსხვავებული ინტერესების მქონე მოცეკვავეებისთვის.",
    items: [
      { number: "01", title: "ქართული ცეკვა", body: "ტრადიცია, მოძრაობა და ქართული კულტურა ბავშვებისა და ზრდასრულებისთვის.", tag: "ბავშვები · ზრდასრულები" },
      { number: "02", title: "ბალეტი", body: "ტექნიკა, ტანდეგობა და გამომსახველობა ასაკზე მორგებული სწავლებით.", tag: "ბავშვები · ზრდასრულები" },
      { number: "03", title: "Ballroom & Latin ბავშვებისთვის", body: "მოძრაობის, მუსიკალურობისა და წყვილში ცეკვის სტრუქტურირებული დასაწყისი.", tag: "ბავშვები" },
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
      { question: "პირველი გაკვეთილი ნამდვილად უფასოა?", answer: "დიახ. DanceStudio Tela Vake-ში პირველი გაკვეთილი უფასოა." },
    ],
  },
  contact: {
    kicker: "პირველი გაკვეთილი უფასოა",
    title: "პირველი ნაბიჯი შეიძლება ძალიან მარტივი იყოს.",
    body: "გამოცდილება და პარტნიორი არ გჭირდება. აირჩიე ჩვენთან დაკავშირების სასურველი გზა.",
    channels: "Instagram · Facebook · WhatsApp",
    pending: "პირდაპირი საკონტაქტო ბმულები მალე დაემატება",
  },
  footer: { studio: "სტუდია „თელა“, ვაკე", location: "ვაკე · თბილისი · საქართველო", rights: "ყველა უფლება დაცულია" },
};

const ru: SiteCopy = {
  ...en,
  languageCode: "ru",
  pageTitle: "Танцевальная студия «Тела», Ваке — Ballroom & Latin в Тбилиси",
  pageDescription: "Персональные занятия Pro-Am Ballroom & Latin для взрослых в Ваке. Партнёр и опыт не нужны. Первый урок бесплатный.",
  nav: [
    { label: "Pro-Am", href: "#proam" },
    { label: "Программы", href: "#programs" },
    { label: "Расписание", href: "#schedule" },
    { label: "Наша история", href: "#story" },
  ],
  bookShort: "Запись",
  hero: {
    eyebrow: "TELA · С 1970 ГОДА · ВАКЕ, ТБИЛИСИ",
    title: "Танцуйте с профессионалом.",
    accent: "Откройте Ballroom & Latin в Ваке.",
    body: "Персональные занятия Pro-Am для взрослых — от первого шага до выступлений и соревнований.",
    primary: "Записаться на первый бесплатный урок",
    secondary: "Задать вопрос",
    notes: ["Партнёр не нужен", "Опыт не нужен", "Соревнования необязательны"],
    media: "Персональный урок Pro-Am Ballroom & Latin",
  },
  intro: {
    kicker: "Другой танцевальный опыт",
    title: "Не просто занятие. Красивое время недели, которое принадлежит только вам.",
    body: "Двигайтесь, учитесь и общайтесь в тёплой атмосфере, получая персональное внимание и программу, созданную вокруг ваших целей.",
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
    kicker: "Другие направления",
    title: "Студия для разных возрастов, ритмов и целей.",
    body: "Pro-Am находится в центре взрослой программы. Другие направления Tela легко найти семьям и танцорам с иными интересами.",
    items: [
      { number: "01", title: "Грузинские танцы", body: "Традиция, движение и грузинская культура для детей и взрослых.", tag: "Дети · Взрослые" },
      { number: "02", title: "Балет", body: "Техника, осанка и выразительность в программах, соответствующих возрасту.", tag: "Дети · Взрослые" },
      { number: "03", title: "Ballroom & Latin для детей", body: "Структурированное знакомство с движением, музыкальностью и парным танцем.", tag: "Дети" },
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
      { question: "Первый урок действительно бесплатный?", answer: "Да. Первый урок в DanceStudio Tela Vake бесплатный." },
    ],
  },
  contact: {
    kicker: "Первый урок бесплатный",
    title: "Первый шаг может быть удивительно простым.",
    body: "Опыт и партнёр не нужны. Выберите удобный способ связаться с нами.",
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
