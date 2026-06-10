# Graph Report - shopify-test-2  (2026-06-10)

## Corpus Check
- 34 files · ~7,708 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 428 nodes · 434 edges · 42 communities (39 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c77dcc91`
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

## God Nodes (most connected - your core abstractions)
1. `labels` - 80 edges
2. `general` - 61 edges
3. `cart` - 30 edges
4. `blog` - 19 edges
5. `PredictiveSearch` - 18 edges
6. `contact` - 11 edges
7. `collections` - 9 edges
8. `search` - 8 edges
9. `options` - 8 edges
10. `Contributor Covenant Code of Conduct` - 8 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (42 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (80): labels, alignment, animation_speed, answer, article_limit, articles_per_page, author, background (+72 more)

### Community 1 - "Community 1"
Cohesion: 0.03
Nodes (61): general, 404, accent, announcement_bar, article, badge, block, blog (+53 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (41): 404, back_to_shopping, not_found, title, accessibility, account, cart, decrease_quantity (+33 more)

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
Cohesion: 0.12
Nodes (16): product_count, days, hours, minutes, seconds, empty, empty, empty (+8 more)

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (9): collections, apply_filters, clear_all, empty, product_count, search_placeholder, search_products, sort_by (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): Contributing to Skeleton Theme, How to contribute, Standards, Steps to contribute

## Knowledge Gaps
- **305 isolated node(s):** `PreToolUse`, `title`, `not_found`, `back_to_shopping`, `account` (+300 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `labels` connect `Community 0` to `Community 7`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `general` connect `Community 1` to `Community 7`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `cart` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `title`, `not_found` to the rest of the system?**
  _305 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.025 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.03278688524590164 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._