# Graph Report - shopify-test-2  (2026-06-10)

## Corpus Check
- 28 files · ~9,706 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 342 nodes · 354 edges · 37 communities (34 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dff2535e`
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
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]

## God Nodes (most connected - your core abstractions)
1. `labels` - 38 edges
2. `general` - 34 edges
3. `cart` - 30 edges
4. `blog` - 19 edges
5. `PredictiveSearch` - 18 edges
6. `Shopify Theme Learning Plan` - 12 edges
7. `contact` - 11 edges
8. `collections` - 9 edges
9. `search` - 8 edges
10. `Contributor Covenant Code of Conduct` - 8 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (37 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (38): labels, alignment, articles_per_page, background, comments_per_page, customer_account_menu, description, featured_collection (+30 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (34): general, 404, article, block, blog, cart, collection, collection_card (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (32): 404, back_to_shopping, not_found, title, accessibility, account, cart, decrease_quantity (+24 more)

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
Cohesion: 0.11
Nodes (18): center, left, right, horizontal, vertical, options, alignment, direction (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (16): contact, description_html, email, heading, message, name, phone, subject (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (16): articles, pages, products, search_for_html, suggestions, search, no_results_html, placeholder (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (13): Blocks, Clone, Contributing, `critical.css`, CSS & JavaScript, Getting started, License, Prerequisites (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (12): 1. Correction, 2. Warning, 3. Temporary Ban, 4. Permanent Ban, Attribution, Contributor Covenant Code of Conduct, Enforcement, Enforcement Guidelines (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (12): Current Learning Goal - 2026-06-04, Latest Session Summary - 2026-05-29, Latest Session Summary - 2026-06-04, Latest Session Summary - 2026-06-05, Latest Session Summary - 2026-06-08, Latest Session Summary - 2026-06-09, Latest Session Summary - 2026-06-10, Progress (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (9): collections, apply_filters, clear_all, empty, product_count, search_placeholder, search_products, sort_by (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (7): snowboard_binding_mount, snowboard_length, specifications, features, products, metafields, metaobjects

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (7): newsletter, description_html, email, heading, placeholder, submit, success

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): Contributing to Skeleton Theme, How to contribute, Standards, Steps to contribute

## Knowledge Gaps
- **234 isolated node(s):** `PreToolUse`, `title`, `not_found`, `back_to_shopping`, `account` (+229 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cart` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `labels` connect `Community 0` to `Community 7`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `general` connect `Community 1` to `Community 7`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `title`, `not_found` to the rest of the system?**
  _234 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._