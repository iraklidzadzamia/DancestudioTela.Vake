# Temporary WhatsApp hiding and mobile language alignment

## Goal

Temporarily hide WhatsApp from every actionable contact surface while keeping its URL generation and Google Analytics event path intact for one-step restoration. Also refine the mobile header so the visible language labels share the wordmark's optical lower line.

## WhatsApp availability

- Add one source-level availability flag in `src/contacts.ts`, initially disabled.
- Build the hero, booking-dialog, and contact-section channel arrays from that flag.
- When disabled, no WhatsApp link, icon, label, or focusable control is rendered on those surfaces.
- Preserve the `WhatsApp` contact-channel type, phone-number normalization, localized prefilled messages, `contactHref`, labels, and booking notes.
- Preserve the existing `trackContactIntent` click handlers and the `WhatsApp -> contact_whatsapp` analytics mapping.
- Re-enabling the flag restores the same links and click handlers, so GA4 again receives `contact_whatsapp` together with the existing placement, language, and booking-source parameters.
- Do not hide the controls with CSS because invisible links would remain in the accessibility and interaction model.

## Mobile language alignment

- Keep the dancer mark and `Dance Studio Tela` fixed.
- Keep every language button's existing touch-target rectangle fixed.
- Raise only the visible `EN / KA / RU` labels by a small additional optical correction at the mobile breakpoint.
- Use inner bottom padding, not a transform or a position change.
- Verify the label and wordmark text bottoms at 360, 390, and 430 CSS pixels.

## Testing and verification

- Add a failing test that requires WhatsApp to be absent from all three rendered contact surfaces while the other channels remain.
- Add regression assertions for WhatsApp URL generation and the preserved click handlers, plus a runtime GA4 test proving a restored WhatsApp click still emits `contact_whatsapp` with its parameters.
- Add a CSS regression assertion for the small mobile language-label correction and unchanged touch-target dimensions.
- Run the focused tests, full test suite, production build, and `git diff --check`.
- Verify the local and published UI in a real browser before completion.
