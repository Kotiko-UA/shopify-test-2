# Section to Theme Block Audit

Status: completed on 2026-06-22. The theme now has 19 section-only components
and 18 portable block-only components, with no duplicated component types.

## Goal

Use `Base section + container` as the shared responsive wrapper and move every
portable storefront component into `blocks/`. A component must exist either as
a section or as a block, never both. Its section file is removed in the same
change that migrates every JSON template reference.

## Convert To Theme Blocks

| Section | Target block | Notes |
| --- | --- | --- |
| `collection-list` | `collection-list` | Portable selected-collection content; child collection cards become nested theme blocks. |
| `comparison-table` | `comparison-table` | Portable comparison content; rows become nested theme blocks. |
| `contact-form` | `contact-form` | Portable form; field definitions become nested theme blocks. |
| `countdown-promo` | `countdown-promo` | Self-contained campaign component with scoped JavaScript. |
| `faq` | `faq` | Portable support content; questions become nested theme blocks. |
| `featured-blog` | `featured-blog` | Self-contained selected-blog component. |
| `featured-collection` | `featured-collection` | Self-contained selected-collection component. |
| `hero` | `hero` | Portable campaign content with media and actions. |
| `logo-marquee` | `logo-marquee` | Portable social-proof content; logos become nested theme blocks. |
| `media-with-text` | `media-with-text` | Self-contained editorial component. |
| `newsletter` | `newsletter` | Portable customer form with block-scoped form IDs. |
| `newsletter-promo` | `newsletter-promo` | Portable campaign form with block-scoped form IDs. |
| `product-slider` | `product-slider` | Portable merchandising component; selected products become nested content. |
| `promo-grid` | `promo-grid` | Portable campaign grid; promo cards become nested theme blocks. |
| `recently-viewed-products` | `recently-viewed-products` | Portable context-aware product component. |
| `tabs` | `tabs` | Already uses nested theme blocks and can move directly. |
| `testimonials` | `testimonials` | Portable social-proof content; testimonials become nested theme blocks. |
| `trust-badges` | `trust-badges` | Portable reassurance content; badges become nested theme blocks. |

## Keep As Sections

| Section | Reason |
| --- | --- |
| `404` | Owns the Shopify 404 route template. |
| `announcement-bar` | Global header-group component with scheduling and dismissal state. |
| `article` | Owns the article object, comments form, and article pagination. |
| `base-section-container` | Page-level wrapper that accepts theme and app blocks. |
| `blog` | Owns the blog object, tag filtering, search, and pagination. |
| `cart` | Owns the cart page form and cart state. |
| `cart-drawer` | Global Ajax-rendered cart fragment. |
| `collection` | Owns collection filters, sorting, pagination, and section rendering. |
| `collections` | Owns the list-collections route and collection pagination. |
| `footer` | Global footer-group component. |
| `header` | Global header-group navigation and search shell. |
| `page` | Owns the generic page title and page content route output. |
| `password` | Owns the storefront password route and form. |
| `predictive-search` | Shopify predictive-search endpoint response fragment. |
| `product` | Owns the product form, variant state, gallery, and product media. |
| `product-recommendations` | Shopify recommendations endpoint requires a section ID. |
| `search` | Owns the search object, predictive search, and pagination. |
| `starter-template-library` | Internal documentation page, not merchant content. |
| `sticky-add-to-cart` | Product-template utility coupled to the main product form and viewport. |

## Migration Order

1. Standalone blocks with no child items.
2. Existing nested-theme-block components such as Tabs.
3. Composite components with new private child blocks.
4. Contact form fields and merchandising selectors.
5. Remove each migrated section and rewrite its JSON template references.

## Guardrails

- A block must use `block.id`, `block.settings`, and `block.shopify_attributes`.
- A block must not render a `<section>` element or a container wrapper.
- `Base section + container` is the only owner of the outer `<section>`, responsive container, and vertical spacing.
- JavaScript initialization must be idempotent when several copies exist.
- A block renders only its own component root and must not add section-level vertical padding.
- Shopify route, pagination, Ajax endpoint, and global group responsibilities stay in sections.
- Do not keep duplicate section and block versions of the same component.
- Remove a section type only in the same verified change that migrates every JSON reference.
