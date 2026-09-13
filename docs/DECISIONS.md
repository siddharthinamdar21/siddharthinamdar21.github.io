# Decisions

Why the project is the way it is. Read when a change seems to contradict
something already there.

**Format rules**

- Entries are `### D<n> - <short title>` followed by **What** and **Why**, 1-2
  lines each. Hard cap 5 lines per entry; longer detail belongs in a code comment
  or a doc, linked from here.
- IDs are sequential and never reused. Check the highest existing ID before
  assigning.
- Superseding: the new entry says `(supersedes D<x>)`, and the old one collapses
  to a single line: `### D<x> - <title> - SUPERSEDED by D<y>.`
- Newest at the bottom. Never reorder.
- Pure polish (a colour tweak, a spacing nudge) earns an entry only if it sets a
  rule future work must follow.

---

### D1 - Plain static site, no build step
**What:** Hand-written HTML/CSS/JS with plain `<script>` tags. No bundler, no
package manager, no ES modules.
**Why:** GitHub Pages serves it directly, and the owner edits content himself.
ES modules would break opening pages from disk; a bundler would add a step
between editing `data/` and seeing the result.

### D2 - `index.html` at root, other pages in `pages/<name>/index.html`
**What:** Only the home page sits at the repo root; the rest are folders.
**Why:** GitHub Pages requires root `index.html`. Folder-per-page gives clean
URLs (`/pages/about/`) rather than `.html` suffixes, which matters because
project links get pasted into job applications.

### D3 - All paths relative, rebased by `PF.asset()` / `PF.page()`
**What:** Paths in `data/*.js` are root-relative; JS rebases them for the current
page depth. Nothing is absolute.
**Why:** The site then works from a domain root, a project subpath, or `file://`
without changes. Absolute paths would pin it to one deployment shape.

### D4 - One project detail template driven by `?id=`
**What:** `pages/project/index.html` renders all 55 projects from the query string.
**Why:** Adding a project stays a single edit in `data/projects.js`. The cost is
that link previews are generic, see D13.

### D5 - Videos on YouTube, never in the repo
**What:** Gameplay footage is unlisted on YouTube; `assets/prototype_videos/` is
gitignored.
**Why:** The source videos were 850 MB and three exceeded GitHub's 100 MB per-file
hard limit, so the push would have been rejected outright. YouTube also supplies
free poster frames, which became the thumbnails.

### D6 - Casino variants grouped, not listed individually
**What:** Six Plinko builds, five Slots, three Blackjack etc. are one project each
with a `videos` array and a thumbnail switcher.
**Why:** Twenty-five near-identical cards read as padding; "Plinko, 6 variants"
reads as depth. Card badges surface the count so nothing is hidden.

### D7 - Three home tabs derived from category, not stored
**What:** `PF.scope` maps casino and apps to themselves and everything else to
games. The tab drives highlights, showcase, spotlight, grid and the board game
section.
**Why:** 55 projects across three unrelated kinds of work cannot share one landing
page. Deriving scope avoids a second field that could contradict `category`.

### D8 - Per-tab copy in `data/home.js`, not in the page module
**What:** Tab headings, intro lines and highlight cards live in a data file keyed
by scope.
**Why:** They were hardcoded in `js/pages/home.js`, which put editable copy in a
file the owner should never open. `ABOUT.highlights` was also a single shared list
and could not differ per tab.

### D9 - Delisted App Store titles removed, claims rewritten
**What:** Sweet Merge and Sweet Bubble Merge were removed as published titles, and
"2 published iOS games" became "12 company titles built solo".
**Why:** The games are no longer on the store, so the site pointed at nothing. The
achievement survives in an About highlight, worded in the past tense.

### D10 - Gems of Luna framed as inherited, not built
**What:** Its description says the game was already live when the client handed
over the codebase.
**Why:** More credible than implying a from-scratch build, and maintaining a live
product with 10K+ users is its own skill. Overstating it would not survive an
interview question.

### D11 - Art is decorative texture, never a project thumbnail
**What:** Generated artwork is used for the page background, hero, detail poster,
CTA band and card bodies. Project cards always use real footage or a gradient.
**Why:** Decorative art on a project card implies it is gameplay. A gradient
placeholder is the more honest fallback.

### D12 - Artwork ships as WebP; the tile is lossless
**What:** All four pieces are WebP. `bg-tile-seamless.webp` is lossless and built
by mirroring into a 2x2; the rest are lossy at quality 62.
**Why:** Palette quantisation banded the soft gradients. Lossy compression drifted
the tile's edges enough to reintroduce a seam grid; mirroring makes opposing edges
identical by construction. Home page art went 1236 KB to 212 KB.

### D13 - Link previews for project pages are knowingly generic
**What:** `project.js` sets per-project `og:` tags, but crawlers do not run JS, so
shares of `?id=...` show the placeholder title and image.
**Why:** Fixing it means generating 55 static pages, which is the build step D1
exists to avoid. The home page preview, the one most often shared, is correct.

### D14 - Detail page back link follows the referrer - SUPERSEDED by D20.

### D15 - No em dashes or en dashes anywhere
**What:** All 131 occurrences replaced with hyphens, across copy, markup, comments
and the README.
**Why:** Owner's preference. Applies to anything written into this repo from here
on, including code comments.

### D16 - PNG art masters deleted from the repo
**What:** The four source PNGs in `assets/images/art/` were removed; only the
served WebP files remain.
**Why:** 3.3 MB that nothing loads. The trade-off is accepted and worth stating:
the artwork can no longer be re-derived at a different opacity or tile size
without regenerating the source art.

### D17 - Scroll reveals are re-armed centrally in `PF.scope.set()`
**What:** `set()` calls `PF.watchReveals()` after notifying subscribers, rather
than each subscriber calling it.
**Why:** Subscribers rebuild sections with `.reveal` (opacity 0). Script order
decides who renders last, so `grid.js` re-arming for itself left the highlights
and spotlight permanently invisible after a tab change. A new subscriber now
needs no reveal handling at all.

### D18 - Scope tabs stack vertically on phones
**What:** Below 620px the tab bar becomes a full-width vertical list with the
count pushed right, instead of a wrapping pill.
**Why:** Three labelled tabs with counts do not fit one row on a phone, and
wrapping inside a pill gave a lopsided 2 + 1. Stacking also gives a far better
touch target.

### D19 - Tab swap fades out before rebuilding (extends D17)
**What:** `PF.scope.set()` adds `.scope-swapping` to fade the four driven sections
down, rebuilds after 260ms, then arms the reveals two frames later. The tab bar
itself never fades.
**Why:** Destroying and rebuilding in one tick read as a jump. The two-frame wait
matters: without it `.in` lands in the same frame the elements are created, the
browser never paints opacity 0, and the fade-in is skipped entirely.

### D20 - Back link follows a recorded page, not the referrer (supersedes D14)
**What:** Every non-detail page writes its own URL to `sessionStorage`. The back
link reads that, falls back to the referrer, and only goes through history when
the referrer confirms the previous entry. Direct visits keep "All projects".
**Why:** The referrer is empty on `file://` and whenever a referrer policy or
privacy extension strips it, so the link fell back to "All projects" and sent the
visitor to a page they had never opened. Seen entering a project from the showcase.

### D21 - Clickable areas are real links, never click handlers
**What:** The showcase slide and the board game frame carry a `.cover-link`
anchor instead of a click handler. It is `aria-hidden` with `tabindex="-1"`,
because each area already holds a labelled button to the same project.
**Why:** A click handler gives no middle click, no open in new tab, no hover
URL and no keyboard route. `PF.goToProject` went with its last caller.

### D22 - The company titles stat counts company games and apps only
**What:** `ABOUT.stats` reads 25+: the 17 company games plus the 8 company apps.
Casino entries and Gems of Luna are both excluded. Total projects reads 55.
**Why:** The casino cards are selected previews from several client casino apps
rather than a title list, and Gems of Luna was inherited live (D10). The old 12
matched nothing in the data, and undercounting is what survives an interview.

### D23 - The reveal cascade only applies above the fold (extends D17)
**What:** `.reveal` now fades over 0.32s and 14px, the stagger is 40ms per item
capped at 240ms, and `watchReveals()` strips the delay from anything below the fold.
**Why:** The delay is baked in at creation from the item's index, so on the projects
page every card past the eighth waited 640ms on top of a 600ms fade each time it
scrolled into view. That reads as slow loading rather than as a reveal.

### D24 - One canonical resume PDF, the one-page variant
**What:** `assets/resume/Siddharth_Inamdar_Resume.pdf` holds the one-page version,
used on the site and on socials. The two-page version stays local in `docs/Resume.md`.
**Why:** Three years at one employer does not fill two pages, and page two repeats
the project list the site already browses. One PDF also means one place for a claim
to go stale, which has happened three times already.
