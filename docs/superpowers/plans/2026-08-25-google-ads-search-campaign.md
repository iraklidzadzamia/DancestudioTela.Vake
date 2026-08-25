# Tela Vake Google Ads Search Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one paused Google Search campaign for Dance Studio Tela Vake, covering all current programmes with intent-specific ad groups and sending standard ad clicks to the main website page.

**Architecture:** One campaign owns the shared budget, geographic targeting, bidding and conversion settings. Seven intent-based ad groups contain English and Russian Phrase/Exact keywords plus separate English and Russian responsive search ads; campaign-level negatives protect the shared budget. The campaign stays paused until a final owner review.

**Tech Stack:** Google Ads web interface or Google Ads Editor, GA4 imported key events, Google Business Profile location asset, Dance Studio Tela website.

## Global Constraints

- Source of truth: `docs/plans/2026-08-25-google-ads-search-campaign-design.md`.
- Create exactly one Search campaign.
- Use seven ad groups: General + Local, Pro-Am, Ballroom + Latin, Women's Tango, Georgian Dance, Ballet and Kids Dance.
- Do not add Georgian keywords or Georgian ad copy in the initial build.
- Send English ads to `https://dancestudio-tela-vake.vercel.app/en/` and Russian ads to `https://dancestudio-tela-vake.vercel.app/ru/`; both are main-page routes.
- Do not advertise Salsa, Bachata, wedding dance or other unsupported services.
- Allowed advertising claims: first lesson free, in Vake, since 1970, and professional partner for Pro-Am.
- Keep the campaign paused until the owner explicitly approves publication.
- Do not add Google Tag Manager or duplicate direct Google Ads conversion tags.

---

### Task 1: Verify conversion readiness

**Files:**
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md`
- Read: `docs/plans/2026-08-25-google-ads-search-launch-strategy.md`

**Interfaces:**
- Consumes: GA4 events already emitted by the production website.
- Produces: an approved list of Google Ads campaign goals before campaign creation.

- [ ] **Step 1: Open Google Ads conversion goals**

Open `Goals → Conversions → Summary` in the target Google Ads account.

- [ ] **Step 2: Verify imported high-intent actions**

Confirm whether these exact names exist as imported GA4 actions:

```text
contact_whatsapp
contact_instagram
contact_facebook
contact_phone
get_directions
```

- [ ] **Step 3: Exclude diagnostic events from campaign goals**

Confirm these events are not Primary campaign goals:

```text
page_view
booking_modal_open
scroll_depth
section_view
click
```

- [ ] **Step 4: Record any unavailable imported actions**

If an approved action has not appeared yet, leave it out rather than creating a duplicate conversion. Continue building the campaign as paused.

- [ ] **Step 5: Verify Google Business Profile connection**

Open `Assets → Associations` and confirm the correct Tela Vake Business Profile is linked for the location asset.

### Task 2: Create the paused Search campaign

**Files:**
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md:30`

**Interfaces:**
- Consumes: owner account, conversion findings from Task 1, approved Maps pin.
- Produces: paused campaign `Search | Tela Vake | All Programs | 2026-08`.

- [ ] **Step 1: Start a new Search campaign**

Choose the Leads objective and Search campaign type. Do not choose Performance Max.

- [ ] **Step 2: Apply the campaign identity**

Set the name to:

```text
Search | Tela Vake | All Programs | 2026-08
```

- [ ] **Step 3: Restrict networks**

Keep Google Search enabled. Disable Search Partners and Display Network.

- [ ] **Step 4: Set bidding**

Select Maximize Clicks. Do not select Maximize Conversions, Target CPA or Target ROAS for the initial build.

- [ ] **Step 5: Set a provisional budget**

Enter `50 GEL/day` only if the owner has not selected another launch budget. The campaign remains paused, so this does not authorize spend.

- [ ] **Step 6: Add the radius**

Use Advanced location search → Radius and enter a 5 km radius around:

```text
41.7099898, 44.7722754
```

- [ ] **Step 7: Verify the map preview**

Check visually that the radius covers the intended practical parts of Vake, Saburtalo and Mtatsminda. Do not publish if the preview clearly misses a required area.

- [ ] **Step 8: Restrict location presence**

Under Location options select `Presence: People in or regularly in your targeted locations`.

- [ ] **Step 9: Apply language handling**

Select All languages. Do not create Georgian ads or keywords in this task.

- [ ] **Step 10: Disable automatic landing-page changes**

Turn off Final URL expansion and automatic text customization if they are offered in the Search campaign setup.

- [ ] **Step 11: Save without enabling**

Save the campaign in Paused or Draft status.

### Task 3: Create the seven ad groups and keywords

**Files:**
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md:52`
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md:67`

**Interfaces:**
- Consumes: paused campaign from Task 2 and exact keyword payload in the design document.
- Produces: seven paused ad groups with Phrase and Exact keywords only.

- [ ] **Step 1: Create the ad groups**

Create these exact ad-group names:

```text
01 | General + Local
02 | Pro-Am
03 | Ballroom + Latin
04 | Women's Tango
05 | Georgian Dance
06 | Ballet
07 | Kids Dance
```

- [ ] **Step 2: Add General + Local keywords**

Copy the Phrase and Exact lists under `### 01 | General + Local` from the design document. Confirm the imported types are Phrase and Exact, not Broad.

- [ ] **Step 3: Add Pro-Am keywords**

Copy the Phrase and Exact lists under `### 02 | Pro-Am`. Confirm no wedding-dance or generic choreography terms were introduced by recommendations.

- [ ] **Step 4: Add Ballroom + Latin keywords**

Copy the Phrase and Exact lists under `### 03 | Ballroom + Latin`. Reject suggested Salsa and Bachata keywords.

- [ ] **Step 5: Add Women's Tango keywords**

Copy the Phrase and Exact lists under `### 04 | Women's Tango`.

- [ ] **Step 6: Add Georgian Dance keywords**

Copy only the English and Russian Phrase and Exact lists under `### 05 | Georgian Dance`. Do not add Georgian-script terms yet.

- [ ] **Step 7: Add Ballet keywords**

Copy the Phrase and Exact lists under `### 06 | Ballet`. Confirm isolated `[ballet tbilisi]` and `[балет тбилиси]` are absent.

- [ ] **Step 8: Add Kids Dance keywords**

Copy the Phrase and Exact lists under `### 07 | Kids Dance`.

- [ ] **Step 9: Reject automatic Broad-match expansion**

Review every ad group and confirm no keyword has Broad match. Disable automatic application of Broad-match recommendations for this campaign.

### Task 4: Add responsive search ads

**Files:**
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md:289`

**Interfaces:**
- Consumes: seven ad groups from Task 3 and verified copy from the design document.
- Produces: two RSAs per ad group, one English and one Russian, with main-page final URLs.

- [ ] **Step 1: Create the General + Local RSAs**

Copy the exact headlines, descriptions, paths and URLs from the two `01 | General + Local` RSA sections.

- [ ] **Step 2: Create the Pro-Am RSAs**

Copy the exact assets from the two `02 | Pro-Am` RSA sections.

- [ ] **Step 3: Create the Ballroom + Latin RSAs**

Copy the exact assets from the two `03 | Ballroom + Latin` RSA sections.

- [ ] **Step 4: Create the Women's Tango RSAs**

Copy the exact assets from the two `04 | Women's Tango` RSA sections.

- [ ] **Step 5: Create the Georgian Dance RSAs**

Copy the exact assets from the two `05 | Georgian Dance` RSA sections.

- [ ] **Step 6: Create the Ballet RSAs**

Copy the exact assets from the two `06 | Ballet` RSA sections.

- [ ] **Step 7: Create the Kids Dance RSAs**

Copy the exact assets from the two `07 | Kids Dance` RSA sections.

- [ ] **Step 8: Check each RSA**

For all 14 ads confirm:

```text
At least 3 headlines
At least 2 descriptions
No headline longer than 30 characters
No description longer than 90 characters
No Georgian copy
No unsupported service claim
Correct English or Russian main-page URL
```

- [ ] **Step 9: Do not pin assets initially**

Leave headline and description positions unpinned so Google can test combinations. Every supplied asset is written to work independently.

### Task 5: Add campaign negatives and assets

**Files:**
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md:705`
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md:785`

**Interfaces:**
- Consumes: shared campaign from Task 2.
- Produces: campaign-level exclusions plus location, call, callout and structured-snippet assets.

- [ ] **Step 1: Add unsupported-style negatives**

Copy the exact terms under `Unsupported styles` as campaign-level negative Phrase keywords.

- [ ] **Step 2: Add information and media negatives**

Copy the exact terms under `Low-intent information and media` as campaign-level negative Phrase keywords.

- [ ] **Step 3: Add employment, shopping and venue-hire negatives**

Copy the exact terms under `Employment, shopping and venue hire` as campaign-level negative Phrase keywords.

- [ ] **Step 4: Add performance and tourism negatives**

Copy the exact terms under `Performance and tourism noise` as campaign-level negative Phrase keywords.

- [ ] **Step 5: Protect the genuine free offer**

Search the negative list and confirm these terms are absent:

```text
free
бесплатно
бесплатный
```

- [ ] **Step 6: Associate the location asset**

Attach the already linked Tela Vake Google Business Profile location to the campaign.

- [ ] **Step 7: Add the call asset**

Use `+995 505 05 16 14` and schedule the asset only for hours when the phone can be answered.

- [ ] **Step 8: Add campaign callouts**

Add these exact values:

```text
First Lesson Free
In Vake, Tbilisi
For Adults and Children
Since 1970
Professional Partner in Pro-Am
```

- [ ] **Step 9: Add the Styles structured snippet**

Add these exact values under the `Styles` header:

```text
Pro-Am
Ballroom & Latin
Women's Tango
Ballet
Georgian Dance
```

- [ ] **Step 10: Skip sitelinks in the first build**

Do not add programme-page sitelinks because the owner wants all initial advertising traffic to enter through the main page.

### Task 6: Run pre-publication QA

**Files:**
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md`

**Interfaces:**
- Consumes: completed paused campaign from Tasks 1–5.
- Produces: evidence-backed owner review package; campaign remains paused.

- [ ] **Step 1: Open the campaign overview**

Confirm the campaign is Paused and the displayed daily budget matches the intended launch budget.

- [ ] **Step 2: Verify structure totals**

Confirm exactly:

```text
1 campaign
7 ad groups
14 responsive search ads
0 Broad-match keywords
0 Georgian keywords or ads
```

- [ ] **Step 3: Verify landing pages**

Open both final URLs in a private browser window and confirm HTTP success, visible language switcher, programmes, schedule and booking CTA:

```text
https://dancestudio-tela-vake.vercel.app/en/
https://dancestudio-tela-vake.vercel.app/ru/
```

- [ ] **Step 4: Run policy and URL checks**

Use Google Ads `Check` or `Review` and resolve every error. Record warnings without automatically applying recommendations that broaden matching or change final URLs.

- [ ] **Step 5: Review the radius and location mode**

Capture the map preview or report the exact radius and verify Presence-only targeting.

- [ ] **Step 6: Review conversion goals**

List which of the five high-intent actions are Primary for this campaign. Explicitly report any missing action.

- [ ] **Step 7: Request final owner approval**

Present budget, radius, goals, ad-group count, keyword types, negative list and ads. Do not enable the campaign until the owner says to publish or launch it.

### Task 7: Publish and begin controlled cleanup

**Files:**
- Read: `docs/plans/2026-08-25-google-ads-search-campaign-design.md:818`

**Interfaces:**
- Consumes: explicit owner approval from Task 6.
- Produces: enabled campaign with a scheduled Search terms and lead-quality review cadence.

- [ ] **Step 1: Enable only after explicit approval**

Change the campaign status from Paused to Enabled only after the owner confirms the final budget and launch.

- [ ] **Step 2: Check delivery after 48 hours**

Review disapprovals, location delivery, search terms, clicks, spend and high-intent contact events.

- [ ] **Step 3: Add immediate negatives**

Add unsupported services, jobs, media, event and shopping queries from the real Search terms report as campaign negatives.

- [ ] **Step 4: Promote useful queries after 7 days**

Add qualified, relevant search terms as Exact keywords in the matching ad group.

- [ ] **Step 5: Compare actual lead quality**

For each contact, record the path from contact action to conversation, attended first lesson and paid enrolment. Do not evaluate success only from button-click conversions.

- [ ] **Step 6: Review budget after 14–30 days**

Increase budget only when the campaign is limited by budget and qualified-lead quality is acceptable. Consider Maximize Conversions only after reliable qualified-lead data exists.

- [ ] **Step 7: Add Georgian terms from evidence**

When relevant Georgian search terms appear and the account accepts the assets, add them manually to the matching intent group. Do not create a new campaign solely for this step.
