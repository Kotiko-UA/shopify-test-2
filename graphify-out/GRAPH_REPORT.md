# Graph Report - shopify-test-2  (2026-06-18)

## Corpus Check
- 37 files · ~11,522 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 536 nodes · 726 edges · 52 communities (48 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ac1e27c4`
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

## God Nodes (most connected - your core abstractions)
1. `labels` - 87 edges
2. `$()` - 64 edges
3. `general` - 62 edges
4. `cart` - 30 edges
5. `ne` - 25 edges
6. `blog` - 19 edges
7. `PredictiveSearch` - 18 edges
8. `o()` - 18 edges
9. `a()` - 17 edges
10. `d()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `r()` --calls--> `emit()`  [EXTRACTED]
  assets/swiper-bundle.min.js → assets/swiper-bundle.min.js  _Bridges community 42 → community 43_

## Import Cycles
- None detected.

## Communities (52 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (87): labels, alignment, animation_speed, answer, article_limit, articles_per_page, author, background (+79 more)

### Community 1 - "Community 1"
Cohesion: 0.03
Nodes (62): general, 404, accent, announcement_bar, article, badge, block, blog (+54 more)

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (6): 404, back_to_shopping, not_found, title, navigation, menu

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (30): cart, added, adding, apply_discount, checkout, close, delivery_instructions, discount_code (+22 more)

### Community 4 - "Community 4"
Cohesion: 0.17
Nodes (19): changeCartItem(), closeCartDrawer(), fetchCart(), fetchSectionHtml(), getCartDrawer(), getCartDrawerTrigger(), getCartSectionIds(), getFocusableElements() (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (19): blog, all_articles, article_comments, article_metadata_html, back_to_blog, comment_form_body, comment_form_email, comment_form_name (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (26): center, left, right, horizontal, left, right, vertical, grid (+18 more)

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
Cohesion: 0.11
Nodes (19): product_count, days, hours, minutes, seconds, empty, empty, empty (+11 more)

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (9): collections, apply_filters, clear_all, empty, product_count, search_placeholder, search_products, sort_by (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): Contributing to Skeleton Theme, How to contribute, Standards, Steps to contribute

### Community 42 - "Community 42"
Cohesion: 0.12
Nodes (44): $(), a(), addEventListener(), ae(), b(), blur(), c(), cancelAnimationFrame() (+36 more)

### Community 43 - "Community 43"
Cohesion: 0.11
Nodes (7): ce(), emit(), me(), ne, onAny(), pe(), ue()

### Community 44 - "Community 44"
Cohesion: 0.29
Nodes (7): newsletter, description_html, email, heading, placeholder, submit, success

### Community 45 - "Community 45"
Cohesion: 0.33
Nodes (6): accessibility, account, cart, decrease_quantity, increase_quantity, skip_to_content

### Community 46 - "Community 46"
Cohesion: 0.33
Nodes (6): customers, login, email, password, submit, title

### Community 47 - "Community 47"
Cohesion: 0.33
Nodes (6): thumbnails, view_image, products, gallery, order_requests, sold_out

### Community 48 - "Community 48"
Cohesion: 0.33
Nodes (6): gift_card, add_to_apple_wallet, card, expired, expires_on, use_at_checkout

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (4): password, enter, password, title

## Knowledge Gaps
- **316 isolated node(s):** `PreToolUse`, `title`, `not_found`, `back_to_shopping`, `account` (+311 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `labels` connect `Community 0` to `Community 7`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `general` connect `Community 1` to `Community 7`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `title`, `not_found` to the rest of the system?**
  _316 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.022988505747126436 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.03225806451612903 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._