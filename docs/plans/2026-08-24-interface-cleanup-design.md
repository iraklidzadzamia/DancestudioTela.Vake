# Tela interface cleanup design

Date: 24 August 2026

## Goal

Remove unexplained visual noise, make video states feel deliberate, and simplify the heritage and children sections without weakening useful navigation.

## Approved decisions

- Do not show a play affordance during initial loading or automatic autoplay startup.
- Show the play affordance only after the visitor manually pauses a film. Hide it immediately after manual resume.
- Automatic pauses caused by scrolling, tab visibility, another film, Reduced Motion, or Save Data do not show the affordance.
- Replace the boxed raster logo in the heritage section with the existing lilac dancer contour, without a background image or logo wording.
- Remove public program IDs from the main program list and related-program cards.
- Remove decorative `01` / `02` labels and the large program count from the audience selector area.
- Remove the unexplained class-count number from the schedule panel.
- Keep numbering where it communicates a real sequence or structure, such as journey steps and FAQ items.
- Move editorial video captions above their video frames.
- On narrow screens, keep “Small corrections. Lasting confidence.” on two lines by using a dedicated children-section type scale rather than changing the copy.
- After moving captions, inspect every video composition on phone and desktop. A CTA must not sit between a caption and its video. On phones, move the children program links and Georgian program link below their media; keep their current desktop columns.

## Playback state

`AutoPlayVideo` separates “currently not playing” from “manually paused.” Only the latter renders the visible play affordance. The hero keeps the same distinction with local state. Poster-first rendering, lazy loading, resume-from-current-time, one-active-film behavior, and accessibility labels remain unchanged.

## Heritage mark

Extract the dancer contour through the same SVG luminance-mask technique already used in the header. Each rendered mark uses unique SVG filter and mask IDs. The heritage version is larger and quieter, with no rectangular PNG presentation, inner wordmark, or nested circle.

## Number cleanup

Program numbers remain in content as stable internal identifiers for routes, keys, and media mapping. They are removed only from client-facing presentation. Schedule counts are removed rather than relabelled because the current timetable is explicitly provisional and the number adds no decision-making value.

## Video captions and CTA composition

The shared video component renders its caption before the frame. CSS changes the separator from a top border below the film to a bottom border above it. Mobile and desktop verification covers Pro-Am, children, both tango films, Georgian dance, the closing reel, and program-page films. On mobile, the children direction links and Georgian program link follow their media so the text introduction, labelled film, and action read in that order.

## Verification

- Component tests prove the play affordance is absent initially and appears only after manual pause.
- App tests prove public program and schedule numbers are absent and the heritage section contains the dancer mark without an image.
- Component structure tests prove captions precede video frames.
- Production build and all tests pass.
- Browser checks at phone and desktop widths verify two-line children heading, caption placement, CTA flow, heritage mark, clean initial video state, and absence of unexplained numbers.
