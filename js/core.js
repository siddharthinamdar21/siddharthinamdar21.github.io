/* ==========================================================================
   CORE - loaded by every page, always first.
   Owns the chrome that exists on all pages (theme toggle, nav, footer),
   the scroll-reveal system, the path helpers, and every helper used by
   more than one page module. Everything public hangs off window.PF.
   You should never need to edit this file to update content.
   ========================================================================== */

(function () {
  "use strict";

  var PF = (window.PF = {});

  /* ---------------- Paths ----------------
     index.html sits at the repo root; the other pages live two levels down
     at pages/<name>/index.html. Paths stored in data/*.js ("assets/…") are
     written relative to the root, so anything injected by JS has to be
     rebased for the deeper pages. Hand-written paths in the HTML already
     carry their own "../../".                                              */

  var ROOT = /\/pages\//.test(location.pathname) ? "../../" : "";
  var FILE = location.protocol === "file:";
  PF.isFile = FILE;   /* YouTube will not embed without an http(s) origin */

  /* Rebase a root-relative asset path. Absolute URLs and data: URIs pass
     through untouched, so callers can wrap without checking first. */
  PF.asset = function (path) {
    if (!path || /^(https?:)?\/\//.test(path) || /^data:/.test(path)) return path;
    return ROOT + path;
  };

  /* Link to a page folder. Over HTTP this yields the clean URL
     (/pages/project/); on file:// it appends index.html, because opening a
     bare folder from disk shows a directory listing instead of the page. */
  PF.page = function (name) {
    return ROOT + "pages/" + name + "/" + (FILE ? "index.html" : "");
  };

  /* ---------------- Scope ----------------
     The home page presents three bodies of work behind tabs. Scope is a
     page-level control, not a grid filter: highlights, the showcase banner,
     spotlight and the project grid all subscribe to it.
     Every project belongs to exactly one scope, derived from its category. */

  var SCOPES = [
    { key: "games",  label: "Mobile Games" },
    { key: "casino", label: "Casino Games" },
    { key: "apps",   label: "Mobile Apps" },
  ];
  var scopeListeners = [];

  PF.scope = {
    current: "games",

    of: function (project) {
      return project.category === "casino" ? "casino"
           : project.category === "apps" ? "apps"
           : "games";
    },

    filter: function (list, key) {
      var want = key || PF.scope.current;
      return list.filter(function (p) { return PF.scope.of(p) === want; });
    },

    /* Only scopes that actually hold projects get a tab, so removing the last
       project of a kind never leaves an empty tab behind. */
    available: function () {
      if (typeof PROJECTS === "undefined") return [];
      return SCOPES.filter(function (s) {
        return PROJECTS.some(function (p) { return PF.scope.of(p) === s.key; });
      });
    },

    onChange: function (fn) { scopeListeners.push(fn); },

    /* Swapping tabs destroys and rebuilds four sections in one tick, which reads
       as a jump. Fade them down first, rebuild while they are invisible, then let
       the normal .reveal transition bring the new content back up. */
    set: function (key) {
      if (key === PF.scope.current) return;
      PF.scope.current = key;

      var SWAP_MS = 260;
      var quiet = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function rebuild() {
        scopeListeners.forEach(function (fn) { fn(key); });
        document.body.classList.remove("scope-swapping");
        /* Subscribers rebuild with .reveal, which starts at opacity 0 and only
           clears once the observer sees the element. Re-arming here covers every
           subscriber; leaving it to them meant whichever listener ran last stayed
           invisible, since script order decides who renders after the sweep.
           Waiting two frames lets the browser paint that opacity 0 first,
           otherwise .in lands in the same frame and the fade never runs. */
        if (quiet) { PF.watchReveals(); return; }
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(PF.watchReveals);
        });
      }

      if (quiet) { rebuild(); return; }
      document.body.classList.add("scope-swapping");
      window.setTimeout(rebuild, SWAP_MS);
    },
  };

  /* ---------------- Constants ---------------- */

  var LINK_LABELS = {
    appstore: "App Store",
    playstore: "Google Play",
    docs: "Design Docs",
    github: "GitHub",
    website: "Website",
    youtube: "YouTube",
  };
  PF.LINK_LABELS = LINK_LABELS;

  var FALLBACK_GRADIENTS = [
    ["#f2994a", "#d9552b"],
    ["#5b8def", "#2a5db0"],
    ["#4fb877", "#1f7a3d"],
    ["#9b6ef3", "#6941c6"],
    ["#f06a8a", "#b42348"],
    ["#e8b93c", "#9a6b0f"],
  ];
  PF.FALLBACK_GRADIENTS = FALLBACK_GRADIENTS;

  /* Inline SVG icons. These live in core because both the contact sidebar and
     the About page's Quick Facts render them. */
  var ICONS = {
    email: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 3.2V18h16V7.2l-8 5.3-8-5.3zM19.2 6H4.8L12 10.8 19.2 6z"/>',
    phone: '<path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>',
    location: '<path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7zm0 9.5A2.5 2.5 0 1 0 12 6.5a2.5 2.5 0 0 0 0 5z"/>',
    openTo: '<path d="M10 4h4a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2zm0 3h4V6h-4v1zM5 9v9h14V9H5z"/>',
    linkedin: '<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.2-3.27 4.5V24H8V8z"/>',
    instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.06.42 2.24.06 1.27.07 1.65.07 4.87s0 3.6-.07 4.87c-.06 1.18-.25 1.82-.42 2.24-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.36-2.24.42-1.27.06-1.65.07-4.87.07s-3.6 0-4.87-.07c-1.18-.06-1.82-.25-2.24-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.36-1.06-.42-2.24C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.87c.06-1.18.25-1.82.42-2.24.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.36 2.24-.42C8.4 2.2 8.8 2.2 12 2.2zm0 2A7.8 7.8 0 1 0 12 19.8 7.8 7.8 0 0 0 12 4.2zm0 2.9a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm6.4-3.1a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z"/>',
    facebook: '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z"/>',
    github: '<path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0C17.3 4.66 18.3 5 18.3 5c.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z"/>',
  };

  PF.svgIcon = function (key) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[key] || ICONS.email;
    return svg;
  };

  /* ---------------- Shared: theme, nav, footer ---------------- */

  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* Back and forward restore a page from the bfcache with the DOM exactly as it
     was left, so the inline head script never re-runs and a theme switched on
     another page comes back stale. Re-apply the stored one on restore. */
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    var saved = localStorage.getItem("theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  });

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  var footerMeta = document.getElementById("footerMeta");
  if (footerMeta) footerMeta.textContent = PROFILE.title + " · " + PROFILE.location;

  /* ---------------- Shared helpers ---------------- */

  function hashCode(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  PF.hashCode = hashCode;

  function initials(title) {
    return title.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
  }

  /* Colored placeholder used whenever an image is missing or fails to load. */
  function fallbackThumb(project) {
    var g = FALLBACK_GRADIENTS[hashCode(project.id) % FALLBACK_GRADIENTS.length];
    var div = document.createElement("div");
    div.className = "thumb-fallback";
    div.style.background = "linear-gradient(135deg, " + g[0] + ", " + g[1] + ")";
    div.textContent = initials(project.title);
    return div;
  }
  PF.fallbackThumb = fallbackThumb;

  /* YouTube auto-generates a poster frame for every video, so a project with a
     video never needs a hand-made thumbnail. maxres only exists for videos
     uploaded at 720p or better, hence the hq fallback below. */
  function ytPoster(id, hq) {
    return "https://i.ytimg.com/vi/" + id + "/" + (hq ? "hqdefault" : "maxresdefault") + ".jpg";
  }
  PF.ytPoster = ytPoster;

  /* A project carries either a single youtubeId or a list of variant videos.
     Everything downstream just asks for the representative one. */
  PF.primaryVideo = function (project) {
    return project.youtubeId ||
      (project.videos && project.videos.length ? project.videos[0].id : null);
  };

  /* Thumbnail chain: local image -> the video's poster frame -> colored gradient. */
  function projectImg(project, wrap) {
    var vid = PF.primaryVideo(project);
    var src = project.thumbnail ? PF.asset(project.thumbnail)
            : vid ? ytPoster(vid)
            : null;
    if (!src) { wrap.appendChild(fallbackThumb(project)); return; }

    var img = document.createElement("img");
    img.src = src;
    img.alt = project.title + " thumbnail";
    img.loading = "lazy";
    img.onerror = function () {
      if (vid && img.src.indexOf("i.ytimg.com") === -1) {
        img.src = ytPoster(vid);                        // local file missing -> video poster
      } else if (vid && img.src.indexOf("maxresdefault") !== -1) {
        img.src = ytPoster(vid, true);                  // no maxres -> hq
      } else if (img.parentNode === wrap) {
        wrap.replaceChild(fallbackThumb(project), img);
      }
    };
    wrap.appendChild(img);
  }
  PF.projectImg = projectImg;

  function badgeEl(category) {
    var span = document.createElement("span");
    span.className = "badge badge-" + category;
    span.textContent = (typeof CATEGORIES !== "undefined" && CATEGORIES[category]) || category;
    return span;
  }
  PF.badgeEl = badgeEl;

  function chipList(items, max) {
    var ul = document.createElement("ul");
    ul.className = "chips";
    (items || []).slice(0, max || items.length).forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    return ul;
  }
  PF.chipList = chipList;

  function linkButtons(links) {
    var frag = document.createDocumentFragment();
    Object.keys(links || {}).forEach(function (key) {
      if (!links[key]) return;
      var a = document.createElement("a");
      a.className = "btn btn-outline btn-sm";
      a.href = links[key];
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = LINK_LABELS[key] || key;
      frag.appendChild(a);
    });
    return frag;
  }
  PF.linkButtons = linkButtons;

  function projectUrl(p) { return PF.page("project") + "?id=" + encodeURIComponent(p.id); }
  PF.projectUrl = projectUrl;

  /* ---------------- Where the visitor came from ----------------
     The detail page back link used to read document.referrer alone. That is
     empty on file://, and empty whenever a referrer policy or a privacy
     extension strips it. The link then fell back to its hardcoded "All
     projects" and dropped the visitor on a page they had never opened.
     Every ordinary page now records itself, so the detail page can always
     name the last real page in this tab. The referrer stays as a fallback. */

  var FROM_KEY = "pf:came-from";

  PF.cameFrom = function () {
    try { return window.sessionStorage.getItem(FROM_KEY) || ""; } catch (e) { return ""; }
  };

  /* Detail pages are skipped, so project to project keeps the page before. */
  if (!/\/pages\/project\//.test(location.pathname)) {
    try { window.sessionStorage.setItem(FROM_KEY, location.href); } catch (e) {}
  }

  /* ---------------- Scroll reveal ---------------- */

  var revealObserver = null;
  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }

  function watchReveals() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    var fold = window.innerHeight || 0;

    /* The cascade is for the batch already on screen. A card below the fold
       reveals as you scroll to it, so a queued delay there is pure lag. Read
       every position first, then write, to keep this one layout pass. */
    var queued = [];
    els.forEach(function (el) {
      if (el.style.transitionDelay && el.getBoundingClientRect().top > fold) queued.push(el);
    });
    queued.forEach(function (el) { el.style.transitionDelay = ""; });

    els.forEach(function (el) {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add("in");
    });
  }
  PF.watchReveals = watchReveals;

  PF.staggered = function (el, index) {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(index * 40, 240) + "ms";
    return el;
  };

  /* Sweep once after every page module has rendered. Core loads first, so it
     cannot sweep inline - the page modules haven't built their elements yet.
     Classic scripts at the end of <body> all run before DOMContentLoaded,
     so this fires exactly once, after the last of them. Modules that
     re-render later (the project grid's filters) call PF.watchReveals()
     themselves. */
  document.addEventListener("DOMContentLoaded", watchReveals);
})();
