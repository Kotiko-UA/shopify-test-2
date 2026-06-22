# Storefront Improvement Plan

This roadmap tracks the staged functional and visual improvements for the theme.
Complete phases in order because later sections reuse behavior introduced by the
shared commerce components.

## Progress

- [x] 1. Shared product card
  - Add sale and sold-out badges.
  - Add an optional secondary image on hover.
  - Add quick add for products with one available variant.
  - Expose reusable display options to parent sections.
- [x] 2. Product page
  - Render all product media types and add gallery zoom/lightbox behavior.
  - Replace the single variant dropdown with option controls and synchronize
    price, availability, media, URL, and the sticky add-to-cart form.
  - Add configurable inventory, size-guide, pickup/delivery, and sticky-info UI.
- [x] 3. Header
  - Add configurable logo, sticky and transparent modes, and search drawer.
  - Add richer desktop navigation and a proper mobile drawer.
- [x] 4. Cart and cart drawer
  - Add a configurable free-shipping progress indicator.
  - Add configurable cross-sell products and delivery/trust messaging.
  - Keep note, gift-wrap, discount, and totals consistent between cart surfaces.
- [x] 5. Footer
  - Convert content to blocks for menus, text/contact details, newsletter, and
    social links.
  - Add policy, payment, localization, color, and layout controls.
- [x] 6. Contact form
  - Add textarea, help text, submission keys, and field validation controls.
  - Add one-third/two-thirds widths and optional success redirect behavior.
- [x] 7. Hero
  - Add mobile media, video, split/background layouts, overlay, focal point,
    height, content positioning, and color controls.
- [x] 8. Collection
  - Add a mobile filter drawer, sticky toolbar, grid-density controls, and
    progressive AJAX filtering/sorting.
- [x] 9. Announcement bar
  - Convert messages to blocks and add rotation, scheduling, dismissal, and
    configurable marquee speed.
- [x] 10. Promo grid
  - Add card spans, aspect ratio, overlay mode, colors, hover effects, and
    whole-card links.
- [x] 11. Comparison table
  - Add a highlighted option, yes/no presentation, sticky labels, and a mobile
    card layout.
- [x] 12. Testimonials
  - Add responsive carousel controls, verified/source/product metadata, and
    proper star icons.
- [x] 13. FAQ
  - Add categories, search, single-open/default-open behavior, deep links, and
    FAQ structured data.
- [x] 14. Countdown promo
  - Add timezone guidance, completion actions, invalid-date feedback, and
    optional evergreen behavior.
- [x] 15. Final verification
  - Run Shopify Theme Check and focused smoke checks.
  - Update `graphify-out/` with `graphify update .`.

## Guardrails

- Preserve existing storefront behavior unless a phase explicitly replaces it.
- Keep settings backward compatible where practical.
- Use native Shopify objects, forms, and routes before adding custom APIs.
- Respect reduced-motion preferences and keyboard navigation.
- Keep generated `graphify-out/` changes in sync after implementation.
