# Graph Report - shopify-test-2  (2026-06-22)

## Corpus Check
- 46 files · ~14,981 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 771 nodes · 956 edges · 77 communities (72 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d69e9601`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]

## God Nodes (most connected - your core abstractions)
1. `labels` - 186 edges
2. `general` - 76 edges
3. `$()` - 64 edges
4. `cart` - 33 edges
5. `ne` - 25 edges
6. `blog` - 19 edges
7. `options` - 19 edges
8. `PredictiveSearch` - 18 edges
9. `o()` - 18 edges
10. `a()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `updateVariant()` --calls--> `formatMoney()`  [INFERRED]
  assets/product-variant-selector.js → assets/cart.js

## Import Cycles
- None detected.

## Communities (77 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.01
Nodes (186): labels, alignment, animation_speed, answer, article_limit, articles_per_page, aspect_ratio, author (+178 more)

### Community 1 - "Community 1"
Cohesion: 0.03
Nodes (76): general, 404, accent, announcement_bar, announcement_message, article, badge, base_section_container (+68 more)

### Community 2 - "Community 2"
Cohesion: 0.50
Nodes (4): color, gradient, none, background_type

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (33): cart, added, adding, apply_discount, checkout, close, delivery_instructions, discount_code (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (24): changeCartItem(), closeCartDrawer(), fetchCart(), fetchSectionHtml(), formatMoney(), getCartDrawer(), getCartDrawerTrigger(), getCartSectionIds() (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (19): blog, all_articles, article_comments, article_metadata_html, back_to_blog, comment_form_body, comment_form_email, comment_form_name (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (7): date, email, number, tel, text, url, input_type

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (16): contact, description_html, email, heading, message, name, phone, subject (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (16): articles, pages, products, search_for_html, suggestions, search, no_results_html, placeholder (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (14): Blocks, Clone, Contributing, `critical.css`, CSS & JavaScript, Getting started, License, Prerequisites (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (12): 1. Correction, 2. Warning, 3. Temporary Ban, 4. Permanent Ban, Attribution, Contributor Covenant Code of Conduct, Enforcement, Enforcement Guidelines (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (20): product_count, days, hours, invalid_date, minutes, seconds, empty, empty (+12 more)

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (10): collections, apply_filters, clear_all, empty, filters, product_count, search_placeholder, search_products (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): Contributing to Skeleton Theme, How to contribute, Standards, Steps to contribute

### Community 42 - "Community 42"
Cohesion: 0.07
Nodes (51): $(), a(), addEventListener(), ae(), b(), blur(), c(), cancelAnimationFrame() (+43 more)

### Community 43 - "Community 43"
Cohesion: 0.22
Nodes (8): footer, country, language, general, no, yes, navigation, menu

### Community 44 - "Community 44"
Cohesion: 0.29
Nodes (7): newsletter, description_html, email, heading, placeholder, submit, success

### Community 45 - "Community 45"
Cohesion: 0.29
Nodes (7): accessibility, account, cart, close, decrease_quantity, increase_quantity, skip_to_content

### Community 46 - "Community 46"
Cohesion: 0.33
Nodes (6): customers, login, email, password, submit, title

### Community 47 - "Community 47"
Cohesion: 0.12
Nodes (16): thumbnails, view_image, view_media, zoom_image, products, add_to_cart, choose_options, gallery (+8 more)

### Community 48 - "Community 48"
Cohesion: 0.33
Nodes (6): gift_card, add_to_apple_wallet, card, expired, expires_on, use_at_checkout

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (4): password, enter, password, title

### Community 52 - "Community 52"
Cohesion: 0.18
Nodes (10): background, split, options, hero_layout, page_width, size, narrow, wide (+2 more)

### Community 54 - "Community 54"
Cohesion: 0.40
Nodes (5): faq, all_categories, category, search, search_placeholder

### Community 55 - "Community 55"
Cohesion: 0.40
Nodes (5): hide, keep, message, redirect, countdown_completion

### Community 56 - "Community 56"
Cohesion: 0.40
Nodes (5): horizontal, left, right, vertical, direction

### Community 57 - "Community 57"
Cohesion: 0.40
Nodes (5): full, half, third, two_thirds, field_width

### Community 59 - "Community 59"
Cohesion: 0.50
Nodes (3): Guardrails, Progress, Storefront Improvement Plan

### Community 60 - "Community 60"
Cohesion: 0.50
Nodes (4): center, left, right, alignment

### Community 61 - "Community 61"
Cohesion: 0.50
Nodes (4): landscape, portrait, square, aspect_ratio

### Community 62 - "Community 62"
Cohesion: 0.50
Nodes (4): full, half, third, card_span

### Community 63 - "Community 63"
Cohesion: 0.50
Nodes (4): first, none, second, highlighted_column

### Community 64 - "Community 64"
Cohesion: 0.50
Nodes (4): lift, none, zoom, hover_effect

### Community 65 - "Community 65"
Cohesion: 0.50
Nodes (4): carousel, grid, slider, layout

### Community 66 - "Community 66"
Cohesion: 0.50
Nodes (4): text_style, normal, subtitle, title

### Community 67 - "Community 67"
Cohesion: 0.50
Nodes (4): testimonials, next, previous, verified

### Community 69 - "Community 69"
Cohesion: 0.20
Nodes (10): bottom_center, bottom_left, bottom_right, center, center_left, center_right, top_center, top_left (+2 more)

### Community 70 - "Community 70"
Cohesion: 0.50
Nodes (4): 404, back_to_shopping, not_found, title

### Community 73 - "Community 73"
Cohesion: 0.50
Nodes (4): contain, cover, fill, background_image_fit

### Community 74 - "Community 74"
Cohesion: 0.67
Nodes (3): position, left, right

### Community 75 - "Community 75"
Cohesion: 0.29
Nodes (6): Convert To Theme Blocks, Goal, Guardrails, Keep As Sections, Migration Order, Section to Theme Block Audit

## Knowledge Gaps
- **507 isolated node(s):** `PreToolUse`, `title`, `not_found`, `back_to_shopping`, `yes` (+502 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `labels` connect `Community 0` to `Community 52`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `options` connect `Community 52` to `Community 64`, `Community 65`, `Community 2`, `Community 66`, `Community 69`, `Community 7`, `Community 73`, `Community 74`, `Community 55`, `Community 56`, `Community 57`, `Community 60`, `Community 61`, `Community 62`, `Community 63`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `general` connect `Community 1` to `Community 52`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `title`, `not_found` to the rest of the system?**
  _507 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.010752688172043012 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.02631578947368421 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._