# Google Ads Search Launch Strategy — Tela Vake

Status: working source of truth. Updated 2026-08-25. This document records
approved business decisions and the launch plan; it is not a record of every
research claim or chat message.

## Approved business facts

- Studio: Dance Studio Tela, Vake, Tbilisi.
- Heritage claim approved for advertising: **Since 1970**. Do not use a
  changing year-count such as “54 years”.
- Directions currently offered:
  - adults: Ballroom & Latin, Women's Tango, Ballet, Georgian Dance, Pro-Am;
  - children: Ballroom & Latin, Ballet, Georgian Dance.
- Group classes are the first advertising priority.
- Private lessons / Pro-Am are available, but are not the first campaign focus.
- Salsa and Bachata are not offered and must not be advertised.
- Wedding Dance is not part of the first launch.
- The first lesson is free in every current programme.
- Owner approved using the instructors’ names and a championship-level
  positioning claim. Do not add unverified claims about television appearances,
  awards, “first in Georgia”, or historic milestones without written evidence.

## Launch constraints

- Budget: **USD 10–15 per day total**.
- Languages at launch: English and Russian. Georgian is an intentional later
  expansion, not an omission.
- Geography: start around the studio’s Google Maps location in Vake, with a
  roughly 5 km radius covering the practical nearby catchment. Use the Google
  Ads location option **Presence**: people in or regularly in the targeted
  area.
- First campaign type: Google Search only.
- Do not launch Performance Max / Local as the first campaign. Review it after
  Search has generated enough qualified leads and we have reviewed query and
  lead-quality data.

## What the first campaign should optimise for

At launch, priority is reliable traffic and learning, not an artificial
conversion number. Use a controlled Search build and inspect the search terms
report weekly.

1. Begin with Maximize Clicks while the account has no paid-search conversion
   history.
2. Measure every contact action, but distinguish an intent click from an
   actual conversation or paid enrollment.
3. Move to conversion bidding only after there is a reliable volume of
   qualified leads—not merely button clicks—for the relevant campaign.

## Campaign and ad-group approach

USD 10–15/day must not be divided across many thin campaigns. Start with one
focused Search campaign and only split budgets after data supports it.

Keyword Planner will decide the final order and the number of ad groups. The
initial candidates are:

1. Adult Ballroom & Latin — adult group-class intent.
2. Children’s Ballroom & Latin — parent intent.
3. Ballet — split adult and children only if search volume and budget support
   distinct groups.
4. Women’s Tango — a separate, tightly relevant adult group.
5. Georgian Dance — include after keyword-volume validation for EN/RU.

Pro-Am/private lessons are a later, separate high-value test rather than a
reason to dilute the group-class launch. Wedding, Salsa and Bachata must not
be included in the launch campaign.

Every ad group must send visitors to the matching Tela programme page, not a
generic home page. The page’s booking flow opens the contact-choice dialog;
do not replace it with an unmeasured third-party form.

## Keyword rules

- Start with Phrase and Exact match high-intent terms only.
- Build English and Russian variants only at launch; add Georgian after the
  first controlled test.
- Use local intent where natural: `Tbilisi`, `Vake`, and nearby-area wording.
- Do not target unrelated wellness searches such as Pilates, Barre, general
  women’s fitness, gymnastics or yoga. The associated benefits—posture,
  coordination, confidence and musicality—may be used honestly in relevant ad
  copy instead.
- Do not target services not offered: Salsa, Bachata, Hip Hop, K-pop, Pole
  Dance, Contemporary, etc.
- Add negative keywords progressively from the real Search terms report.
  Start with online/tutorial/video/download/music terms, employment terms,
  dancewear/equipment, studio hire if unavailable, and unsupported styles.
- Do **not** broadly negative-match `free`, `бесплатно`, or `бесплатный`:
  Tela genuinely offers a first free lesson. Exclude misleading queries such
  as “free online dance classes” only after they appear.

## Advertising claims and copy rules

The core approved proposition is:

> Dance Studio Tela, Vake — Ballroom & Latin, Ballet, Georgian Dance and
> Women’s Tango for adults and children. First lesson free. Since 1970.

Copy may use the approved instructor names and championship-level positioning.
It must accurately match the programme page and actual timetable. Do not use
“legendary”, an unverifiable television-network claim, or a numerical heritage
claim in place of the factual “Since 1970”.

Before launch, every RSA headline and description must be checked against the
current Google Ads character limits and against its matching landing page.

## Measurement architecture — already implemented

### GA4 site events

The site sends the following high-intent contact events after consent:

- `contact_whatsapp`
- `contact_instagram`
- `contact_facebook`
- `contact_phone`
- `get_directions`

It also records diagnostic events: `booking_modal_open`, `page_view`,
`scroll_depth` and `section_view`. Diagnostic events are not lead conversions.

Contact events include:

- `placement` — for example `hero`, `booking_modal` or `contact_section`;
- `booking_source` — the CTA that opened the booking dialog;
- contact channel, page path and selected site language.

GA4 custom dimensions already created:

- **Contact placement** → `placement` (Event scope)
- **Booking source** → `booking_source` (Event scope)

### Google configuration already complete

- GA4 measurement is live on the production website.
- GA4 is linked to the Google Ads account.
- Google Ads auto-tagging is on.
- Google Ads import of GA4 app and web metrics is on.
- Google Business Profile is linked.
- The existing Google-hosted `Local actions – Directions` conversion is kept
  separate from the website’s `get_directions` event. It is not currently part
  of account-level campaign goals.
- Do not add Google Tag Manager or a duplicate direct Google Ads website tag
  for the same actions.

### Next measurement steps

1. Wait for GA4 to surface the tested contact events in **Admin → Events →
   Recent events** (Google may take up to 24 hours).
2. Mark the five `contact_*` / `get_directions` events as GA4 Key events.
3. Import those Key events into Google Ads.
4. Configure Google Ads action optimisation deliberately. Do not treat
   `page_view`, scrolling, generic click events or booking-dialog opens as
   bidding goals.
5. Start a simple lead-quality log: contact channel → actual conversation →
   first lesson attended → paid enrollment. This is the evidence needed to
   decide which contact actions deserve bidding priority.

## Handoff — current state and exact next move

This section is for any future agent or work session. Read it before changing
tracking, Google Ads conversion settings, or campaign settings.

### Already verified live

- GA4 Realtime received production page views, scroll depth, section views and
  booking-dialog opens.
- The five high-intent events were manually tested and received in Realtime:
  `contact_whatsapp`, `contact_instagram`, `contact_facebook`,
  `contact_phone`, and `get_directions`.
- The user tested the hero contact icons once and the same contact options from
  the “Book a Free First Lesson” dialog once. The events therefore represent
  genuine implementation tests, not a theoretical setup.
- `booking_modal_open` and generic `click` were also received. They are useful
  diagnostic events only and must not be treated as lead conversions.
- The site records the contact placement and, when a contact is chosen from
  the dialog, the CTA that opened it. GA4 custom definitions for both fields
  have been created.
- Google Ads auto-tagging is enabled, and GA4 app/web metrics import is on.
- The account has a Google-hosted `Local actions – Directions` conversion from
  the linked Business Profile. It is separate from the website map-link event;
  leave it unchanged and out of account-level campaign goals for now.

### Waiting state

GA4 Realtime can show events before **Admin → Events → Recent events** lists
them. Google states this may take up to 24 hours. Do not create replacement
events manually and do not add a direct Google Ads website tag while waiting.

### Resume sequence

1. In GA4, wait until Recent events lists the five high-intent event names.
2. Mark only those five event names as Key events.
3. Import the five Key events into Google Ads. Do not import page views,
   generic clicks, scroll depth, section views, or booking-dialog opens.
4. Review the imported actions in Google Ads before changing any action to
   Primary; all actions should use a lead-oriented count of One where the
   imported-action settings allow it.
5. Use Keyword Planner to validate real English and Russian query volume,
   forecast click costs and choose the final 3–4 tightly focused ad groups.
6. Build a Search campaign as a draft only. Do not publish or enable spending
   without the owner's explicit final approval.

## Campaign governance

- No campaign is published or enabled without the owner’s explicit final
  approval of budget, locations, keywords, ad copy and conversion goals.
- Review the Search terms report weekly in the first month and add negatives
  based on real traffic, not guesswork.
- Review contact-event counts and actual lead quality separately.
- Add Georgian campaigns, Performance Max / local goals, or remarketing only
  after the Search launch has produced enough usable data and there is a clear
  business reason.
