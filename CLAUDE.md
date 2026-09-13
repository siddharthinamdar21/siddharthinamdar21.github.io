# Portfolio - Claude Context

## ⚠️ Active hazards

None. The résumé PDF is real as of Sep 2026. Keep the filename
`assets/resume/Siddharth_Inamdar_Resume.pdf` exactly: the nav and hero of all five
pages hardcode it, so a renamed export 404s the download button sitewide.

## Snapshot

Personal portfolio for Siddharth Inamdar (Unity game developer). Plain HTML/CSS/JS,
no build step, no dependencies. Live on GitHub Pages at
<https://siddharthinamdar21.github.io>.

55 projects, all with video. Site is shipped and in maintenance: changes are
content edits in `data/`, occasional CSS, and pushes to `main` (Pages deploys
from `main` / root automatically).

## Commands

```
python -m http.server 8000      # serve, then open http://localhost:8000
node --check <file.js>          # syntax check before committing
```

**Serve it, never open `index.html` from disk.** On `file://` YouTube refuses to
embed (error 153) and bare-folder links show a directory listing. The code has
`file://` fallbacks so local browsing works, but you are not seeing the real site.

No build step, no package manager, no tests.

## Docs index

| Doc | Governs | Level |
|---|---|---|
| `README.md` | How the owner adds a project or edits content | Authoritative for the content workflow |
| `docs/DECISIONS.md` | Why things are the way they are | Append on every decision |
| `docs/Links_To_My_Projects.txt` | Owner's raw YouTube link list | Reference only. Duplicates `data/projects.js` and **will** drift; the data file wins |

## Architecture & conventions

`index.html` sits at the repo root because GitHub Pages requires it there. Every
other page is `pages/<name>/index.html`, two levels deep, giving clean URLs.

Each page loads: its `data/*.js` files, then `js/core.js`, then the page module
(and `js/grid.js` / `js/contact.js` where those sections appear). Plain script
tags, so **load order matters** - core must precede page modules.

`js/core.js` owns the single global `window.PF` and everything shared: path
helpers, the scope controller, thumbnails, badges, chips, link buttons, scroll
reveal, icons, and the back-link origin every page records for the detail page. Page modules in `js/pages/` consume `PF` and never define globals.
A helper moves into core the moment a second page needs it.

**Paths stored in `data/*.js` are root-relative** (`assets/images/x.png`). Anything
injected by JS must go through `PF.asset()`, and links between pages through
`PF.page()`, both of which rebase for the depth of the current page. Hand-written
paths in HTML carry their own `../../`. Everything is relative, so the site works
served from a domain root or a subpath.

Content lives entirely in `data/`. Do not put copy in HTML or JS.

## Concept → file map

| Concept | Lives in |
|---|---|
| Tab headings, intro lines, highlight cards | `data/home.js` (**not** `about.js`) |
| Hero stats, experience, education, skills | `data/about.js` |
| Name, email, socials, résumé path, Formspree id | `data/profile.js` |
| Which video represents a project | `PF.primaryVideo()` in `core.js` - resolves `youtubeId` **or** `videos[0]` |
| The three home tabs and what each contains | `PF.scope` in `core.js` |
| Card grid, filters, "View all" | `js/grid.js`, configured by `data-limit` / `data-scope` on `#projectGrid` |
| Page background texture and section artwork | `css/style.css`, `:root::before` plus `.hero` / `.pd-poster` / `.cta-band` |
| Project detail page, variant switcher, back link | `js/pages/project.js` |

## Routes

| URL | File |
|---|---|
| `/` | `index.html` |
| `/pages/about/` | `pages/about/index.html` |
| `/pages/projects/` | `pages/projects/index.html` |
| `/pages/contact/` | `pages/contact/index.html` |
| `/pages/project/?id=<project-id>` | `pages/project/index.html` (one template, all 55 projects) |

## File map

| Path | What |
|---|---|
| `data/` | All content. The only folder the owner should need to edit |
| `js/` | `core.js` (shared), `grid.js`, `contact.js` - the last two shared by two pages each |
| `js/pages/` | One module per page, named for the page |
| `css/style.css` | Single stylesheet, sectioned by banner comments |
| `assets/images/art/` | **Only `.webp` is served.** The PNG masters were deleted, so the artwork cannot be re-derived at a different strength without regenerating the source |
| `assets/images/rise-of-heroes/` | Web-ready gallery images; `source/` holds 30 MB of print masters, committed but never served |
| `.gitattributes` | Marks binaries. **Load-bearing:** the résumé PDF has no NUL bytes, so Git classifies it as text and CRLF conversion corrupts it |

### Rules that bite

- **Adding a category to `CATEGORIES` is two edits, not one.** It also needs
  `.badge-<key>` plus `--cat-<key>-bg` / `--cat-<key>-ink` in **both** theme blocks
  of `style.css`. Miss it and badges render as unstyled bare text sitewide. This
  has already happened once (casino, apps).
- **`bg-tile-seamless.webp` must stay lossless and mirror-built.** It tiles across
  the whole page; lossy compression drifted its edges and put a visible seam grid
  back. Mirroring into a 2x2 makes opposing edges identical by construction.
- **`.section-alt` is deliberately translucent** (`--surface-band`) so the fixed
  page texture runs through it. Cards keep solid `--surface` for legibility. Do
  not "fix" the band back to opaque.
- **`.hero` and `.page-header` also carry `.container`.** Their full-bleed
  background depends on `max-width: none` plus a `calc()` gutter that re-aligns
  the text. Removing either boxes the background at 1240px and cuts a visible
  vertical edge.
- **`role` accepts a string or an array.** Arrays render as a bulleted list.
  Both shapes are in use; check before assuming.
- **Project `id`s are URLs.** Renaming one breaks any link already shared.
- **`data/about.js` holds claims that expire.** Counts in `ABOUT.stats` need
  re-verifying against `data/projects.js` whenever projects are added, and
  time-based wording (`Pursuing`, years of experience, store availability) goes
  stale on its own. `12 company titles`, `30+ projects` and an MCA still marked
  `Pursuing` a term after it ended all slipped through. D22 records what the
  titles figure counts.
- **No em dashes or en dashes anywhere** - copy, comments, markup. Owner's
  preference, applied across the whole repo.
- **Write literal characters in CSS `content:`, not escapes.** A `\25b8` escape
  written through a Python heredoc was silently read as an octal escape and
  emitted a control character. `content: "▸"` cannot be mangled that way.

## Glossary

- **Scope** - the three home page tabs (Mobile Games / Casino Games / Mobile Apps).
  Derived from `category`, not stored: casino and apps map to themselves,
  everything else is games.
- **Category** - the finer grouping shown in the filter bar and on badges.
- **`featured`** - appears in the Spotlight rows. **`showcase`** - appears in the
  rotating hero banner. A project can be both; both are filtered by scope.
- **Variants** - grouped projects (six Plinko builds, five Slots) carry a `videos`
  array instead of a single `youtubeId`, and get a thumbnail switcher.

## Workflow notes

- Owner sends YouTube links in batches. **Validate before wiring:** oEmbed 200 means
  public or unlisted; 403 means private and 404 means draft or missing. A private
  video renders as a gradient card and "Video unavailable" on click. This has come
  up twice.
- Owner pastes screenshots for visual review and iterates on opacity and spacing by
  eye. Give him one or two named knobs to turn rather than regenerating assets.
- Owner tests locally, then asks for the push. Do not push unprompted.
- Line endings are CRLF throughout. Scripts that rewrite files must preserve them.
- Verify visual changes in **both** themes; several bugs have only appeared in one.

## Maintenance rules (for Claude - follow every conversation)

- When you add, remove, move, or repurpose a file, update the File map and
  Concept map IN THE SAME TURN.
- When a decision is made (an instruction that constrains future work, a
  deliberate deviation, a choice between approaches), append it to
  `docs/DECISIONS.md` in the same turn.
- When the user asks for a deliberate temporary hack, add it to Active hazards in
  the same turn; remove it when resolved.
- Re-verify counts before repeating them. Project totals and per-category numbers
  in this file go stale silently.
- Keep this file lean. Link to `docs/` instead of inlining detail. Aim at ~150
  lines, but never drop a real constraint to hit a line count; cut restated
  architecture and per-file inventory instead.
