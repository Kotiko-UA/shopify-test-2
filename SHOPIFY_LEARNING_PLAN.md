# Shopify Theme Learning Plan

## Current Learning Goal - 2026-06-04

The learning goal has changed from isolated Shopify exercises to building a reusable starter theme template for future ecommerce store development.

Target outcome:

- A practical Shopify starter theme with reusable product cards, product page, collection grid, AJAX add-to-cart, cart drawer, cart page, localization, responsive layout, and clean theme architecture.
- Learning continues through real features that belong in a production-ready store template.
- Boilerplate, repetitive markup, simple styles, and locale plumbing can be implemented by Codex to keep momentum.
- The learner focuses on key Shopify concepts, data flow, Liquid objects, Ajax behavior, theme editor architecture, and code review.

Learning mode:

- 70% Codex handles routine implementation: boilerplate, styles, locales, repetitive markup.
- 20% Learner completes feature blocks and explains the logic.
- 10% Codex reviews code for Shopify best practices, bugs, and maintainability.

## Latest Session Summary - 2026-06-08

Completed today:

- Practiced product metafields in the Shopify admin and Liquid.
- Clarified the difference between admin label and technical `namespace.key`.
- Rewired product metafields to the real existing keys:
  - `test_data.binding_mount`
  - `test_data.snowboard_length`
- Rendered product metafields on the product page as a `Specifications` block.
- Used `.value` for plain text metafields.
- Used `metafield_tag` for richer/special typed metafields such as dimensions.
- Created and reviewed a `Snowboard feature` metaobject definition with `title`, `text`, and `icon` fields.
- Clarified the difference between:
  - product metafield path: `custom.features`
  - metaobject type: `snowboard_feature`
- Connected a product metafield reference to a metaobject entry.
- Rendered the selected metaobject entry from `product.metafields.custom.features.value`.
- Removed the confusing fallback that rendered all metaobject entries directly from `metaobjects.snowboard_feature.values`.

Current starter-template status:

- Product page can render real product specifications through metafields.
- Product page can render a selected structured feature through a metaobject reference.
- Current metaobject example supports one selected feature entry. A production-ready extension would support a list of feature entries.

Progress update:

- Point 31, Metafields, is completed for the practical product-page basics.
- Point 32, Metaobjects, is partially completed: definition, entry, reference, and rendering are covered. Next session should reinforce when to use metafields vs metaobjects and add a list-based metaobject reference example.

Next recommended topic:

- Return to metafields/metaobjects with practical decision cases:
  - simple product value -> metafield
  - reusable structured content -> metaobject
  - editable section-only content -> section setting or block
- Then upgrade `custom.features` from a single metaobject reference to a list of metaobject references if useful for the starter template.

## Latest Session Summary - 2026-06-05

Completed today:

- Converted cart drawer from layout markup to a dedicated `sections/cart-drawer.liquid` section.
- Moved cart drawer rendering closer to Liquid and reduced JS-rendered HTML.
- Updated cart JS to handle replaced sections through event delegation.
- Practiced bundled section rendering through Cart Ajax API `sections`.
- Added `getCartSectionIds`, `replaceSectionsFromResponse`, and related section refresh flow.
- Added Ajax cart note, cart attributes, cart page quantity changes, and cart page remove link behavior.
- Added discount code checkout redirect flow.
- Cleaned up cart page and cart drawer baseline layout styles.
- Localized cart page hardcoded UI labels.
- Started collection page improvements.
- Added collection sorting, product count, empty state, toolbar, and pagination wrapper.
- Added collection filters from `collection.filters`.
- Preserved `sort_by` when applying filters and preserved active filters when sorting.
- Added filter `Clear all` behavior and basic collection filter styles.

Current starter-template status:

- Cart page and cart drawer are now mostly Ajax/section-rendering driven.
- Cart drawer is a Shopify section and Liquid renders its line item markup.
- Collection page has basic sorting, filtering, count, empty state, and pagination structure.
- Collection filters are functional but still basic; price range filters and active filter chips have not been refined yet.

Next recommended topic:

- Continue collection filters.
- Next practical step: add active filter chips and handle `price_range` filter type cleanly.

## Latest Session Summary - 2026-06-04

Completed today:

- Updated the learning process to a faster 70/20/10 mode.
- Refocused the project goal: this theme should become a reusable starter template for ecommerce stores.
- Improved the current starter-template code structure.
- Split cart-related JavaScript into `assets/cart.js`.
- Kept `assets/product-form.js` focused only on product form submit and Ajax add-to-cart.
- Built and reviewed Ajax cart flow with `/cart/add.js`, `/cart.js`, and `/cart/change.js`.
- Added cart drawer item quantity controls, remove action, toast, and cart icon trigger.
- Rendered line item properties in the drawer and filtered private properties that start with `_`.
- Practiced event delegation for dynamically replaced header/cart elements.
- Started Section Rendering API.
- Added helpers for fetching and replacing rendered Shopify sections.
- Used Section Rendering API to refresh header and cart page after cart drawer updates.

Current starter-template status:

- Product form Ajax add-to-cart works.
- Cart drawer opens from product add and from the header cart icon.
- Cart drawer quantity/remove actions work.
- Header cart count updates.
- Cart page refreshes when cart changes from the drawer.
- Current drawer markup is still partly JS-rendered; next production step is to move drawer rendering toward Liquid/section rendering.

Next recommended topic:

- Continue Section Rendering API and cart architecture.
- Next practical step: move cart drawer markup/rendering closer to Liquid sections, then compare JS-rendered drawer vs Liquid-rendered section drawer.

## Latest Session Summary - 2026-05-29

Completed today:

- Finished additional section settings practice: `checkbox`, `range`, `color`, `richtext`, `inline_richtext`.
- Practiced resource picker settings: `collection`, `product`, `page`.
- Rendered selected collection title, collection URL, and first products from `collection.products`.
- Rendered selected product title, product URL, and price with the `money` filter.
- Rendered selected page title and URL.
- Reviewed theme blocks in `blocks/text.liquid` and `blocks/group.liquid`.
- Learned the difference between snippets, section blocks, and theme blocks.
- Created `snippets/main-button.liquid`.
- Removed invalid snippet schema and converted the snippet to accept render parameters: `label` and `url`.
- Rendered the snippet from `sections/hello-world.liquid` using `{% render 'main-button', label: ..., url: ... %}`.

Current progress update:

- Point 12 is completed for the practical basics. `blog` and `article` will be handled later in the dedicated articles/blog section.
- Point 13 is partially completed: theme blocks were inspected and explained, but we have not created our own theme block yet.
- Point 15 is partially completed: first snippet was created and used.
- Next recommended topic: continue snippets with `variant`/extra props, then return to creating a custom theme block.

Цей файл - наша карта навчання Shopify theme development. Ми будемо оновлювати його по мірі проходження тем.

## Принцип навчання

- Я пояснюю тему простими словами.
- Ти сам робиш зміни у файлах.
- Я перевіряю твої зміни і пояснюю, що правильно, а що треба виправити.
- Ми рухаємось маленькими кроками: спочатку розуміння, потім практика.
- У тебе є 2 роки досвіду з Vue, Nuxt і NestJS, тому складніші теми можна пояснювати через аналогії з компонентами, props/state, routing, server-side rendering, API handlers, modules і data flow з цих фреймворків.
- Якщо Shopify-концепт схожий на знайому frontend/backend-концепцію, я спочатку показую аналогію, а потім пояснюю, чим Shopify відрізняється.

## План

1. Структура Shopify theme: `layout`, `templates`, `sections`, `blocks`, `snippets`, `assets`, `config`, `locales`.
2. Зв'язок `templates/*.json` -> `sections/*.liquid`.
3. Базовий Liquid: output, tags, filters, comments, whitespace control.
4. Section schema: `settings`, `presets`, базова структура JSON schema.
5. `section.settings`: `text`, `textarea`, `url`, `image_picker`, `select`.
6. Умови в Liquid: `if`, `blank`, приховування порожніх елементів.
7. Theme editor vs локальні файли: `settings_data.json`, JSON templates, `--theme-editor-sync`.
8. Section blocks: `blocks` у schema, `section.blocks`, `block.settings`.
9. Різні типи section blocks: `case block.type`.
10. Обмеження блоків: `limit`, `max_blocks`.
11. Доступність секцій у редакторі: `disabled_on`, `enabled_on`, section groups.
12. Додаткові settings: `checkbox`, `range`, `color`, `richtext`, `inline_richtext`, `collection`, `product`, `page`, `blog`, `article`, `color_scheme`.
13. Theme blocks у папці `blocks/`: reusable blocks, nested blocks, `{% content_for 'blocks' %}`.
14. App blocks: як apps додають блоки в theme editor.
15. Snippets: винесення повторюваної верстки в `snippets` і `{% render %}`.
16. JSON templates глибше: `sections`, `order`, `blocks`, `block_order`, alternate templates.
17. Section groups: header, footer, overlay groups.
18. Assets: CSS, JS, images, `asset_url`, `image_url`, `image_tag`, responsive images.
19. Locales and translations: `locales/*.json`, filter `t`, schema locale files.
20. Navigation and menus: `linklists`, menu rendering, nested menus.
21. Shopify objects: `shop`, `routes`, `request`, `settings`, `template`, `page`, `product`, `collection`, `cart`, `blog`, `article`.
22. Product pages: product object, variants, options, media, price, availability.
23. Product form: variant ID, quantity, add to cart form, selling plans basics.
24. Collection pages: product grid, sorting, filtering, pagination.
25. Search: search template, predictive search basics.
26. Blog and articles: `blog`, `article`, article templates, article lists, tags.
27. Cart: cart template, cart items, quantity changes, remove item, totals.
28. Ajax cart: Shopify Ajax API, cart drawer basics, cart counter updates.
29. Section Rendering API: partial HTML updates after cart/product interactions.
30. Forms: contact form, newsletter/customer form, form errors and success states.
31. Metafields: reading custom product/collection/page data in Liquid.
32. Metaobjects: metaobject templates and rendering structured content.
33. Customer accounts: account links, modern customer account component basics.
34. SEO basics: `title`, meta description, canonical, structured data basics.
35. Accessibility: semantic HTML, headings, labels, focus, alt text, keyboard support.
36. Performance: image sizes, lazy loading, CSS/JS discipline, Liquid performance basics.
37. Theme Check: linting, common warnings, how to read errors.
38. Shopify CLI workflow: `theme dev`, `theme pull`, `theme push`, dev themes, draft themes.
39. Git workflow for themes: commits, comparing generated JSON changes, avoiding accidental overwrites.
40. Production-ready section practice: build a clean reusable section from zero.

## Progress

Completed:

- 1. Структура Shopify theme
- 2. Зв'язок `templates/*.json` -> `sections/*.liquid`
- 4. Section schema basics
- 5. Basic `section.settings`
- 6. Liquid conditions
- 7. Theme editor vs локальні файли, `--theme-editor-sync`
- 8. Section blocks
- 9. `case block.type`
- 10. `limit` and `max_blocks`

Partially completed:

- 3. Базовий Liquid
- 11. `disabled_on` completed, `enabled_on` only explained
- 12. Some settings completed: `text`, `textarea`, `url`, `image_picker`, `select`
- 18. Some asset/image basics completed: `asset_url`, `image_url`, `image_tag`

Next recommended topic:

- Continue point 12 with `checkbox`, then `range`, `color`, and `richtext`.

## Useful Official References

- Shopify theme architecture: https://shopify.dev/docs/storefronts/themes/architecture
- Templates: https://shopify.dev/docs/storefronts/themes/architecture/templates
- Blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks
- Theme blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks
- Theme best practices: https://shopify.dev/docs/storefronts/themes/best-practices
- Accessibility best practices: https://shopify.dev/docs/storefronts/themes/best-practices/accessibility
- Performance best practices: https://shopify.dev/docs/storefronts/themes/best-practices/performance
- Shopify Ajax API: https://shopify.dev/docs/api/ajax
- Shopify Liquid reference: https://shopify.dev/docs/api/liquid
