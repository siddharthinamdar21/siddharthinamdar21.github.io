# Siddharth Inamdar — Portfolio

Personal portfolio site. Plain HTML/CSS/JS — no build tools, no dependencies, nothing to break.

**Live site:** https://YOUR_USERNAME.github.io/ *(update after deploying)*

## Folder structure

```
index.html            Home — must stay at the root (GitHub Pages serves it as /)
pages/                Every other page, one folder each
  about/index.html      → /pages/about/
  projects/index.html   → /pages/projects/
  contact/index.html    → /pages/contact/
  project/index.html    → /pages/project/?id=<project-id>   (shared template)
assets/               images, résumé, favicon, og-image
css/style.css         All styling, both themes
data/                 ← everything you edit lives here
js/                   Rendering logic — you shouldn't need to touch it
```

Every project gets its own shareable page automatically at `/pages/project/?id=<project-id>`
(e.g. `/pages/project/?id=sweet-merge`) — great for pasting a direct link into a job
application. Clicking any card, spotlight or showcase opens it. You don't create these pages;
one template renders them all from `data/projects.js`.

## Everything you edit lives in `data/` — never touch HTML/CSS/JS for content

| File | What's in it |
|---|---|
| [`data/profile.js`](data/profile.js) | Personal details used everywhere: name, title, tagline, email, phone, location, "open to", socials, résumé path, Formspree ID |
| [`data/about.js`](data/about.js) | Hero stats, recruiter highlight cards, about summary, experience (with bullet points), education, skills, strengths |
| [`data/projects.js`](data/projects.js) | All projects + category names |

## Add a new project (2 minutes)

1. Open `data/projects.js`, copy the template from the comment at the top, paste it into the `PROJECTS` list and fill in what you have.
   **Only `id`, `title`, `category` and `description` are required** — anything missing (store links, video, image) simply doesn't show.
2. Video: upload to YouTube (**unlisted** is fine), copy the ID from the URL (`youtube.com/watch?v=THIS_PART`) into `youtubeId`.
3. Thumbnail (optional): drop a 16:9 image (e.g. 1280×720) into `assets/images/` and set the `thumbnail` path. Without one, a colored placeholder is generated.
4. Want it in the big **Spotlight** section on the home page? Add `featured: true` (keep Spotlight to your 3–5 best).
   Want it in the **rotating hero banner** at the top of the home page? Add `showcase: true` (absolute best work, ideally with a video or image).
5. Commit and push — GitHub Pages redeploys automatically.

> Paths in `data/*.js` are always written from the **root** (`assets/images/foo.png`),
> never with `../`. The pages under `pages/` rebase them automatically.

## Other edits

| What | Where |
|---|---|
| Profile photo | Drop it at `assets/images/profile.jpg` (shows in hero + About page; hidden until the file exists) |
| Résumé | Replace `assets/resume/Siddharth_Inamdar_Resume.pdf` (keep the filename) |
| Colors, fonts, both themes | `css/style.css` → the two variable blocks at the top (dark + light) |
| Contact form service | Create a free form at [formspree.io](https://formspree.io), paste its ID into `formspreeId` in `data/profile.js`. Until then the form opens the visitor's email app. |
| Default theme | Dark is default; visitors can toggle and their choice is remembered |

## How the JavaScript is split

Each page loads only the modules it needs. `js/core.js` always loads first and puts
everything shared on a single global, `PF`.

| File | Does | Loaded by |
|---|---|---|
| [`js/core.js`](js/core.js) | Theme toggle, nav, footer, scroll reveal, path helpers (`PF.asset` / `PF.page`), and every helper used by more than one page | every page |
| [`js/grid.js`](js/grid.js) | Category filter bar + project cards | home, projects |
| [`js/contact.js`](js/contact.js) | Contact sidebar + message form | home, contact |
| [`js/pages/home.js`](js/pages/home.js) | Hero, highlights, showcase banner, spotlight, board game | home |
| [`js/pages/about.js`](js/pages/about.js) | Everything on the About page | about |
| [`js/pages/project.js`](js/pages/project.js) | Project detail page, gallery, YouTube facade | project |

Adding a section? Put it in the page module that owns it. Put something in `core.js`
only once a second page needs it.

## Run locally

Open `index.html` in a browser — no server needed.

To preview the exact URLs GitHub Pages will serve (`/pages/about/` rather than
`/pages/about/index.html`), run a local server instead:

```
python -m http.server 8000     # then open http://localhost:8000
```

## Deploy (first time)

1. Create a GitHub repo named `YOUR_USERNAME.github.io` (public).
2. `git init`, commit, push this folder to it.
3. Repo → Settings → Pages → confirm "Deploy from branch: main / root".
4. Live at `https://YOUR_USERNAME.github.io` within a minute or two.

`.nojekyll` is committed so GitHub serves every file as-is instead of running Jekyll.
