# Tela video and program media design

Date: 24 August 2026

## Goal

Make the site's films feel intentional and unobtrusive, preserve fast poster-first rendering, replace unfinished program-page placeholders with honest media, and repair the cramped mobile schedule selector.

## Approved decisions

- Keep the hero film as an immediate, muted autoplay experience. It does not need a Save Data fallback because it is the first experience on entry.
- Remove the persistent square play/pause controls from the hero and all editorial films.
- Preserve manual playback control by making the film surface itself clickable and keyboard-operable. A centered play affordance is shown only while a film is paused.
- Remove the decorative `01`–`06` labels from film frames. Numbering used for programs, steps, FAQs, and meaningful counts remains unchanged.
- Keep a poster visible before every video can render its first frame.
- Editorial films start only after they remain at least 35% visible for a short dwell period. They pause offscreen and resume from the saved time when revisited unless the visitor paused them manually.
- Continue allowing only one film to play at a time. Preserve tab-visibility and reduced-motion handling.
- Reuse the approved homepage films on matching program pages. Use the generated adult-ballet photograph until real ballet media is supplied.
- Change the mobile schedule selector from a cramped two-column grid to four full-width rows with comfortable spacing.

## Media mapping

- Adult Ballroom & Latin: `proam-story`
- Adult Women’s Tango: `tango-on-bars`
- Adult Georgian Dance: `georgian-dance`
- Adult Ballet: optimized `adult-ballet-hero-v1.webp` derived from the retained PNG source
- Pro-Am: `proam-story`
- Kids Ballroom & Latin: `kids-coaching`
- Kids Ballet: `kids-coaching`
- Kids Georgian Dance: `georgian-dance`

Reused films are temporary program-level media and must not claim to depict a more specific class, teacher, or age group than the footage confirms.

## Playback behavior

### Hero

- Poster is present from initial render.
- Film starts muted when the hero is visible and motion is allowed.
- Scrolling away pauses playback; returning resumes from the previous time.
- Clicking an unobstructed film area toggles manual pause/play without blocking hero links or buttons.

### Editorial and program films

- Poster URLs are present immediately so a stable image is available before video data.
- Video sources remain absent until the frame approaches the viewport.
- Autoplay begins after the frame remains at least 35% visible for roughly 300 ms.
- Leaving the viewport cancels a pending start and pauses an active film.
- Returning resumes from the same time unless the visitor manually paused it.
- Clicking the frame toggles playback. Keyboard activation provides the same behavior and a visible focus state.
- The paused state shows a restrained centered play icon; the playing state has no permanent overlay control.
- Reduced Motion and Save Data keep editorial/program films on their posters until explicit activation.

## Program-page media

Program hero media becomes a dedicated component that can render either an optimized film with poster or a still image. Existing decorative `Tela` placeholders and “reserved for film” copy are removed from public pages.

The generated adult-ballet image is a temporary atmospheric asset, not documentary proof of a real lesson. It should not be captioned as a real class.

## Mobile schedule

At phone widths, day-pair tabs become one column. Each row receives horizontal padding, a stable minimum height, and a right-aligned state marker. The vertical gap between the schedule introduction, selector, and selected schedule panel is reduced so the sequence reads as one control.

## Verification

- Production build and TypeScript compilation pass.
- At initial homepage load, the hero video may load but no editorial video file is requested.
- Posters are visible before playback.
- An editorial video loads only near/in its viewport and starts after the dwell threshold.
- Scroll away pauses; scroll back resumes; manual pause survives scroll away/back.
- Only one film plays at a time.
- Program pages display the mapped film or ballet still with no placeholder card.
- Video frames contain no visible sequence labels or persistent square pause buttons.
- Mobile schedule tabs are readable at 373 px width.
