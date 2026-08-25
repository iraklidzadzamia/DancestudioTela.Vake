# Tango video playback group

## Goal

Allow the two videos in the Women's Tango chapter to play at the same time when both are sufficiently visible, without forcing frame or timeline synchronisation.

## Current cause

`AutoPlayVideo` broadcasts a `tela:film-play` event with the video's `base`. Every other instance pauses when that value differs from its own base, so the second Tango film always stops the first one.

## Design

- Add an optional `playbackGroup` prop to `AutoPlayVideo`.
- Use `playbackGroup ?? base` as the identity in the existing playback event.
- Videos with the same identity do not pause one another.
- Give `tango-on-bars` and `tango-group` the same `tango-chapter` identity.
- Keep the existing intersection threshold: each video plays only while at least 35% visible.
- Keep all other videos mutually exclusive exactly as they are now.

This is viewport-independent. On desktop, both Tango videos can play because both are visible. On mobile, the vertically stacked videos still pause independently as they leave the viewport. No media-query JavaScript, extra dependency, or timeline synchronisation is introduced.

## Interaction rules

- A manually paused video remains paused even when its group partner plays.
- Playing a Tango video still pauses videos from other sections.
- Playing a video from another section pauses both Tango videos.
- Browser visibility and autoplay failure handling stay unchanged.

## Verification

- Unit-test the shared playback identity and Tango usage.
- Run the full test suite and production build.
- Verify the Tango chapter at desktop and mobile viewport sizes.
