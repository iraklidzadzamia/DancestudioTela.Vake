# Google Ads Search Campaign Design — Tela Vake

Status: approved direction, ready to build as a paused draft. Updated 2026-08-25.

## Objective

Create one fast, controllable Google Search campaign that captures high-intent
people near Dance Studio Tela Vake and sends every standard ad click to the
main website page. Pro-Am is the studio's defining proposition, while adult
group classes and children's classes receive equal strategic priority.

The first build favors coverage and speed. Search terms will be reviewed and
cleaned after launch rather than trying to predict every useful query in
advance.

## Decisions confirmed by the owner

- One Search campaign, not separate campaigns by language or programme.
- Ad groups are separated by search intent so the headlines can match what the
  person searched for.
- All standard ad clicks go to a language version of the main page:
  - English ad: `https://dancestudio-tela-vake.vercel.app/en/`
  - Russian ad: `https://dancestudio-tela-vake.vercel.app/ru/`
- Georgian keywords and Georgian ad copy are intentionally deferred. Relevant
  Georgian queries found in the Search terms report will be added manually.
- English and Russian keywords may live in the same intent-based ad group.
- The launch is expected to be cleaned and refined after real query data is
  available.

## Campaign settings

| Setting | Value |
| --- | --- |
| Campaign name | `Search | Tela Vake | All Programs | 2026-08` |
| Status while building | Paused / draft |
| Type | Search |
| Goal | Leads |
| Networks | Google Search only; Search Partners off; Display off |
| Bidding at launch | Maximize Clicks |
| Budget | Owner-selected; use 50 GEL/day as a provisional starting point if no other number is chosen |
| Final URL expansion / text customization | Off |
| Geography | 5 km radius around the approved Google Maps pin: `41.7099898, 44.7722754` |
| Location option | Presence: people in or regularly in the targeted locations |
| Languages | All languages; ad and keyword content is English/Russian at launch |
| Ad schedule | All days initially; restrict later only from lead-quality evidence |
| Auto-tagging | On; already verified |
| Conversion bidding | Do not use until imported actions and real lead quality are reliable |

The radius must be visually checked in Google Ads to confirm the desired
coverage of Vake, Saburtalo and Mtatsminda before publishing.

## Ad-group structure

1. `01 | General + Local`
2. `02 | Pro-Am`
3. `03 | Ballroom + Latin`
4. `04 | Women's Tango`
5. `05 | Georgian Dance`
6. `06 | Ballet`
7. `07 | Kids Dance`

This gives Pro-Am its own message while preserving clear entry points for the
other services. It does not enforce equal spend: a single campaign has one
shared budget, so actual distribution depends on search demand and auction
conditions.

## Keyword policy

- Start with Phrase and Exact only. Do not launch Broad match.
- Phrase match provides discovery; Exact match protects the highest-intent core
  terms.
- Do not add every grammatical variation. Google already matches close
  variants and same-intent queries.
- Review the Search terms report at least twice during the first week and then
  weekly.

### 01 | General + Local

Phrase:

```text
"dance studio tbilisi"
"dance classes tbilisi"
"dance studio vake"
"dance classes vake"
"adult dance classes tbilisi"
"dance studio saburtalo"
"dance classes mtatsminda"
"dance classes near me"
"танцевальная студия тбилиси"
"уроки танцев тбилиси"
"танцевальная студия ваке"
"танцы в ваке"
"танцы для взрослых тбилиси"
"танцы сабуртало"
"танцы мтацминда"
"танцы рядом"
"dance studio tela"
"tela dance studio"
"студия танцев tela"
```

Exact:

```text
[dance studio vake]
[dance classes vake]
[dance studio tela]
[танцевальная студия ваке]
[танцы в ваке]
[студия танцев tela]
```

### 02 | Pro-Am

Phrase:

```text
"pro am dance tbilisi"
"proam dance tbilisi"
"pro am dance vake"
"proam ballroom tbilisi"
"ballroom pro am lessons"
"private ballroom lessons tbilisi"
"dance with professional partner"
"про ам танцы тбилиси"
"pro-am танцы тбилиси"
"pro-am бальные танцы"
"индивидуальные уроки бальных танцев"
"танцы с профессиональным партнером"
"персональные уроки танцев тбилиси"
```

Exact:

```text
[pro am dance tbilisi]
[proam dance tbilisi]
[pro am dance vake]
[про ам танцы тбилиси]
[pro-am танцы тбилиси]
```

### 03 | Ballroom + Latin

Phrase:

```text
"ballroom dance classes tbilisi"
"ballroom dance vake"
"latin dance classes tbilisi"
"latin dance vake"
"adult ballroom dance classes"
"kids ballroom classes tbilisi"
"бальные танцы тбилиси"
"бальные танцы ваке"
"латиноамериканские танцы тбилиси"
"латина для взрослых тбилиси"
"спортивные бальные танцы тбилиси"
"бальные танцы для детей тбилиси"
```

Exact:

```text
[ballroom dance classes tbilisi]
[latin dance classes tbilisi]
[ballroom dance vake]
[бальные танцы тбилиси]
[бальные танцы ваке]
[латиноамериканские танцы тбилиси]
```

### 04 | Women's Tango

Phrase:

```text
"women's tango classes tbilisi"
"tango classes for women"
"tango classes tbilisi"
"tango vake"
"tango on bars tbilisi"
"женское танго тбилиси"
"танго для женщин тбилиси"
"уроки танго тбилиси"
"танго ваке"
"tango on bars"
```

Exact:

```text
[women's tango classes tbilisi]
[tango classes for women]
[tango classes tbilisi]
[женское танго тбилиси]
[танго для женщин тбилиси]
[уроки танго тбилиси]
```

### 05 | Georgian Dance

Phrase:

```text
"georgian dance classes tbilisi"
"learn georgian dance tbilisi"
"georgian dance lessons vake"
"georgian dance classes adults"
"georgian dance classes kids"
"грузинские танцы тбилиси"
"уроки грузинских танцев тбилиси"
"грузинские танцы ваке"
"грузинские танцы для взрослых"
"грузинские танцы для детей"
```

Exact:

```text
[georgian dance classes tbilisi]
[georgian dance lessons vake]
[грузинские танцы тбилиси]
[грузинские танцы ваке]
[грузинские танцы для взрослых]
[грузинские танцы для детей]
```

### 06 | Ballet

Phrase:

```text
"adult ballet classes tbilisi"
"kids ballet classes tbilisi"
"ballet classes vake"
"ballet lessons tbilisi"
"beginner ballet classes tbilisi"
"балет для взрослых тбилиси"
"балет для детей тбилиси"
"уроки балета тбилиси"
"балет ваке"
"балет для начинающих тбилиси"
```

Exact:

```text
[adult ballet classes tbilisi]
[kids ballet classes tbilisi]
[ballet classes vake]
[балет для взрослых тбилиси]
[балет для детей тбилиси]
[балет ваке]
```

Do not launch the isolated exact keywords `[ballet tbilisi]` or `[балет
тбилиси]`; they can attract theatre, performance and ticket searches.

### 07 | Kids Dance

Phrase:

```text
"kids dance classes tbilisi"
"dance classes for children tbilisi"
"kids ballroom classes tbilisi"
"children dance studio vake"
"after school dance classes vake"
"танцы для детей тбилиси"
"детская танцевальная студия тбилиси"
"танцы для детей ваке"
"бальные танцы для детей тбилиси"
"детские танцевальные занятия"
```

Exact:

```text
[kids dance classes tbilisi]
[dance classes for children tbilisi]
[children dance studio vake]
[танцы для детей тбилиси]
[танцы для детей ваке]
[детская танцевальная студия тбилиси]
```

## Responsive Search Ads

Create two RSAs inside each ad group. This does not create language-based ad
groups. The English RSA links to `/en/`; the Russian RSA links to `/ru/`. Do
not mix English and Russian assets inside the same RSA because Google can
assemble headlines and descriptions in any order.

All headlines below are at most 30 characters. All descriptions are at most
90 characters.

### 01 | General + Local — English RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/en/`  
Paths: `dance` / `vake`

Headlines:

```text
Dance Classes in Vake
Dance Studio Tela Vake
First Dance Lesson Free
Dance Classes in Tbilisi
For Adults and Children
Ballroom, Ballet and More
Since 1970
Classes Near Saburtalo
Find Your Dance at Tela
Book Your Free First Class
```

Descriptions:

```text
Dance classes for adults and children in Vake. Choose your direction at Tela.
Ballroom & Latin, ballet, Georgian dance and Women's Tango. First lesson free.
Discover a welcoming dance studio near Vake and Saburtalo. Since 1970.
Visit our website, choose a class and contact us to book your free first lesson.
```

### 01 | General + Local — Russian RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/ru/`  
Paths: `dance` / `vake`

Headlines:

```text
Танцы в Ваке
Студия танцев Tela
Первый урок бесплатно
Танцы для взрослых
Танцы для детей
Танцы рядом с Сабуртало
Ballroom, балет и танго
Студия Tela с 1970 года
Найдите свой танец в Tela
Запишитесь на первый урок
```

Descriptions:

```text
Танцы для взрослых и детей в Ваке. Выберите своё направление в Tela.
Ballroom & Latin, балет, грузинские танцы и женское танго. Первый урок бесплатно.
Студия рядом с Ваке и Сабуртало. Обучаем танцам с 1970 года.
Откройте сайт, выберите направление и запишитесь на бесплатный первый урок.
```

### 02 | Pro-Am — English RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/en/`  
Paths: `pro-am` / `vake`

Headlines:

```text
Pro-Am Dance in Tbilisi
Dance With a Professional
No Partner Needed
Personal Ballroom Training
Your First Lesson Is Free
Pro-Am at Tela Vake
Train at Your Own Pace
Ballroom and Latin Pro-Am
From First Step to Stage
Book a Pro-Am Lesson
```

Descriptions:

```text
Learn Ballroom and Latin with a professional partner. Training shaped around your goals.
No partner needed for Pro-Am at Tela. Start at your level in Vake, Tbilisi.
Build technique, confidence and musicality at your pace. First lesson is free.
Discover Pro-Am on our website and contact Tela to book your free first lesson.
```

### 02 | Pro-Am — Russian RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/ru/`  
Paths: `pro-am` / `vake`

Headlines:

```text
Pro-Am танцы в Тбилиси
Танцуйте с профессионалом
Партнёр не нужен
Персональные занятия Pro-Am
Ballroom и Latin Pro-Am
Первый урок бесплатно
Pro-Am в студии Tela
Ваш темп и ваши цели
От первого шага до сцены
Запишитесь на Pro-Am
```

Descriptions:

```text
Ballroom и Latin с профессиональным партнёром. Занятия под ваши цели и темп.
Для Pro-Am партнёр не нужен. Начните со своего уровня в студии Tela в Ваке.
Развивайте технику, музыкальность и уверенность. Первый урок бесплатно.
Узнайте о Pro-Am на сайте и свяжитесь с Tela для записи на первый урок.
```

### 03 | Ballroom + Latin — English RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/en/`  
Paths: `ballroom` / `vake`

Headlines:

```text
Ballroom Dance in Vake
Latin Dance Classes Vake
Ballroom and Latin Tbilisi
Adult Dance Classes
Kids Ballroom Classes
First Lesson Free
Learn Rhythm and Confidence
DanceStudio Tela Since 1970
Group Dance Classes Vake
Book Your Free Lesson
```

Descriptions:

```text
Learn Ballroom and Latin in a welcoming group for adults or children in Vake.
Build rhythm, technique and confidence with attentive teaching. First lesson free.
Dance Studio Tela has taught dance since 1970. Start at a comfortable level.
View the program on our website and contact us to book your free first lesson.
```

### 03 | Ballroom + Latin — Russian RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/ru/`  
Paths: `ballroom` / `vake`

Headlines:

```text
Бальные танцы в Ваке
Латина для взрослых
Ballroom и Latin в Тбилиси
Групповые занятия танцами
Танцы для взрослых и детей
Первый урок бесплатно
Ритм, техника, уверенность
Студия Tela с 1970 года
Начните танцевать в Ваке
Запишитесь на первый урок
```

Descriptions:

```text
Ballroom и Latin для взрослых и детей в Ваке. Дружелюбные групповые занятия.
Развивайте ритм, технику и уверенность. Первый урок в Tela бесплатно.
Студия Tela обучает танцам с 1970 года. Начните с комфортного уровня.
Посмотрите программу на сайте и свяжитесь с нами для записи на первый урок.
```

### 04 | Women's Tango — English RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/en/`  
Paths: `tango` / `vake`

Headlines:

```text
Women's Tango in Vake
Tango Classes for Women
Build Posture and Expression
Tango On Bars at Tela
First Tango Lesson Free
Dance With Confidence
Women's Tango Tbilisi
Technique, Balance, Music
Beginner-Friendly Tango
Book Your First Class
```

Descriptions:

```text
Women's Tango for posture, balance, musicality and expressive movement in Vake.
Refine your movement and dance with more confidence. Your first lesson is free.
Join a focused Tango class at Dance Studio Tela, welcoming new students.
Explore Women's Tango on our website and contact us to book your first class.
```

### 04 | Women's Tango — Russian RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/ru/`  
Paths: `tango` / `vake`

Headlines:

```text
Женское танго в Ваке
Танго для женщин
Осанка и выразительность
Tango On Bars в Tela
Первый урок бесплатно
Танцуйте увереннее
Женское танго в Тбилиси
Техника, баланс и музыка
Танго для начинающих
Запишитесь на первый урок
```

Descriptions:

```text
Женское танго для осанки, баланса, музыкальности и выразительного движения.
Совершенствуйте движение и танцуйте увереннее. Первый урок бесплатно.
Специализированная группа танго в студии Tela в Ваке приглашает новичков.
Откройте программу на сайте и свяжитесь с нами для записи на первый урок.
```

### 05 | Georgian Dance — English RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/en/`  
Paths: `georgian-dance` / `vake`

Headlines:

```text
Georgian Dance in Vake
Georgian Dance Classes
For Adults and Children
Learn Georgian Dance
First Lesson Free
Tradition in Motion
Georgian Dance Tbilisi
Classes Near Saburtalo
DanceStudio Tela Since 1970
Join a Georgian Dance Class
```

Descriptions:

```text
Learn Georgian dance through rhythm, precision and powerful group movement in Vake.
Classes are available for adults and children. Your first lesson at Tela is free.
Connect with Georgian dance tradition at a studio teaching dance since 1970.
View the program on our website and contact us to book your free first lesson.
```

### 05 | Georgian Dance — Russian RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/ru/`  
Paths: `georgian-dance` / `vake`

Headlines:

```text
Грузинские танцы в Ваке
Уроки грузинских танцев
Для взрослых и детей
Первый урок бесплатно
Традиция в движении
Грузинские танцы Тбилиси
Студия Tela с 1970 года
Начните с любого уровня
Занятия рядом с Сабуртало
Запишитесь на первый урок
```

Descriptions:

```text
Грузинские танцы через ритм, точность и энергию группового движения в Ваке.
Занятия доступны взрослым и детям. Первый урок в студии Tela бесплатно.
Прикоснитесь к традиции в студии, которая обучает танцам с 1970 года.
Посмотрите программу на сайте и свяжитесь с нами для записи на первый урок.
```

### 06 | Ballet — English RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/en/`  
Paths: `ballet` / `vake`

Headlines:

```text
Ballet Classes in Vake
Adult Ballet in Tbilisi
Kids Ballet in Tbilisi
First Ballet Lesson Free
Build Posture and Technique
Ballet for Every Level
Tela Ballet Classes
Classes Near Saburtalo
Begin Ballet in Vake
Book Your Free Lesson
```

Descriptions:

```text
Ballet classes for adults and children in Vake, adapted to level and age.
Develop posture, technique and expressive movement. Your first lesson is free.
Start at a comfortable level with attentive guidance at Dance Studio Tela.
View the ballet program on our website and contact us to book your first class.
```

### 06 | Ballet — Russian RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/ru/`  
Paths: `ballet` / `vake`

Headlines:

```text
Балет в Ваке
Балет для взрослых
Балет для детей
Первый урок бесплатно
Осанка, техника и движение
Балет для любого уровня
Балет в студии Tela
Занятия рядом с Сабуртало
Начните заниматься балетом
Запишитесь на первый урок
```

Descriptions:

```text
Балет для взрослых и детей в Ваке. Занятия адаптированы к уровню и возрасту.
Развивайте осанку, технику и выразительность. Первый урок бесплатно.
Начните с комфортного уровня под внимательным руководством преподавателя Tela.
Откройте программу на сайте и свяжитесь с нами для записи на первый урок.
```

### 07 | Kids Dance — English RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/en/`  
Paths: `kids-dance` / `vake`

Headlines:

```text
Kids Dance Classes Vake
Dance Classes for Children
Kids Ballroom in Tbilisi
Kids Ballet and Ballroom
First Lesson Free
Build Coordination and Poise
Age-Appropriate Dance Classes
DanceStudio Tela Since 1970
Near Vake and Saburtalo
Find the Right Class
```

Descriptions:

```text
Dance classes for children in Vake: Ballroom and Latin, ballet and Georgian dance.
Age-appropriate teaching builds coordination, musicality and confidence.
Choose the right program for your child. The first lesson at Tela is free.
Explore children's classes on our website and contact us to book a first lesson.
```

### 07 | Kids Dance — Russian RSA

Final URL: `https://dancestudio-tela-vake.vercel.app/ru/`  
Paths: `kids-dance` / `vake`

Headlines:

```text
Танцы для детей в Ваке
Детская студия танцев
Бальные танцы для детей
Балет и танцы для детей
Первый урок бесплатно
Координация и уверенность
Занятия по возрасту
Студия Tela с 1970 года
Рядом с Ваке и Сабуртало
Подберите подходящую группу
```

Descriptions:

```text
Танцы для детей в Ваке: Ballroom и Latin, балет и грузинские танцы.
Занятия по возрасту развивают координацию, музыкальность и уверенность.
Выберите подходящее направление для ребёнка. Первый урок в Tela бесплатно.
Посмотрите детские программы на сайте и свяжитесь с нами для записи.
```

## Campaign-level negative keywords

Start with negative Phrase match for these terms and their obvious English or
Russian forms. Do not negative-match `free`, `бесплатно` or `бесплатный`
because the first lesson is genuinely free.

Unsupported styles:

```text
salsa
bachata
сальса
бачата
hip hop
хип хоп
breakdance
брейк данс
k-pop
pole dance
танцы на пилоне
belly dance
танец живота
contemporary dance
контемпорари
wedding dance
свадебный танец
```

Low-intent information and media:

```text
online
онлайн
youtube
ютуб
tutorial
самоучитель
video download
скачать видео
dance music
музыка для танцев
movie
фильм
```

Employment, shopping and venue hire:

```text
job
jobs
vacancy
вакансия
работа
dance teacher job
работа хореографом
dance shoes
танцевальная обувь
dance dress
платье для танцев
costume
костюм
studio rent
аренда студии
rehearsal room
зал для репетиций
```

Performance and tourism noise:

```text
tickets
билеты
dance show
танцевальное шоу
restaurant show
шоу в ресторане
hire dancers
заказать танцоров
```

## Campaign assets

- Location asset: use the already linked Google Business Profile.
- Call asset: `+995 505 05 16 14`; show only during hours when someone can
  answer promptly.
- Callouts:
  - `First Lesson Free`
  - `In Vake, Tbilisi`
  - `For Adults and Children`
  - `Since 1970`
  - `Professional Partner in Pro-Am`
- Structured snippet, header `Styles`:
  - `Pro-Am`
  - `Ballroom & Latin`
  - `Women's Tango`
  - `Ballet`
  - `Georgian Dance`
- Do not add sitelinks to programme detail pages in this first build because
  the owner wants all advertising traffic to enter through the main page.

## Measurement and launch rules

- Keep the campaign paused until the owner approves budget, radius preview,
  negative list, ad copy and Primary conversion actions.
- Primary candidates are the imported high-intent website actions:
  `contact_whatsapp`, `contact_instagram`, `contact_facebook`, `contact_phone`
  and `get_directions`.
- Do not optimize to `page_view`, `scroll_depth`, `section_view` or
  `booking_modal_open`.
- Do not switch to Maximize Conversions based only on button clicks. First
  compare contact actions with actual conversations, attended first lessons
  and paid enrolments.

## First clean-up cadence

### After 48 hours

- Confirm ads are serving only inside the intended location report.
- Check disapprovals and broken assets.
- Review search terms for obvious unsupported styles, jobs, media and events.

### After 7 days

- Add converting or highly relevant queries as Exact keywords.
- Add irrelevant queries as campaign negatives.
- Compare spend and qualified contacts across Pro-Am, adults and children.
- Do not judge a low-volume group only by CTR; check impression eligibility and
  actual demand.

### After 14–30 days

- Increase budget only if the campaign is limited by budget and lead quality is
  acceptable.
- Consider conversion bidding only when qualified lead data is reliable.
- Add Georgian search terms and ad copy manually when the account accepts them
  and the real Search terms report supports them.
