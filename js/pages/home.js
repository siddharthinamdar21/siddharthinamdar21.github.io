/* ==========================================================================
   HOME PAGE (index.html) - hero, highlights, showcase banner, spotlight
   and the board game section.
   The project grid and contact form on this page come from js/grid.js and
   js/contact.js, which the projects and contact pages share.
   Requires: data/profile.js, data/about.js, data/projects.js, js/core.js
   ========================================================================== */

(function () {
  "use strict";

  /* A real link laid over a clickable area. The showcase slide and the board
     game frame used to navigate from a click handler, which meant middle
     click, open in new tab, right click and the hover URL all did nothing.
     Both areas already hold a labelled button to the same project, so this
     link stays out of the tab order and out of the accessibility tree: it
     exists only to give the mouse the affordances a real link has. */
  function coverLink(p) {
    var a = document.createElement("a");
    a.className = "cover-link";
    a.href = PF.projectUrl(p);
    a.setAttribute("aria-hidden", "true");
    a.setAttribute("tabindex", "-1");
    return a;
  }

  /* ---------------- Hero ---------------- */

  var heroTagline = document.getElementById("heroTagline");
  if (heroTagline) {
    heroTagline.textContent = PROFILE.tagline;
    document.getElementById("heroTitle").textContent = PROFILE.title;
    var heroPhoto = document.getElementById("heroPhoto");
    if (PROFILE.photo) heroPhoto.src = PF.asset(PROFILE.photo);
    else heroPhoto.style.display = "none";

    var statsEl = document.getElementById("heroStats");
    ABOUT.stats.forEach(function (s) {
      var li = document.createElement("li");
      var strong = document.createElement("strong");
      strong.textContent = s.value;
      li.appendChild(strong);
      li.appendChild(document.createTextNode(s.label));
      statsEl.appendChild(li);
      animateCount(strong, s.value);
    });
  }

  /* Counts a numeric stat up from zero. Leaves non-numeric values alone and
     respects prefers-reduced-motion. */
  function animateCount(el, finalText) {
    var match = /^(\d+)(.*)$/.exec(finalText);
    if (!match) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var target = parseInt(match[1], 10);
    var suffix = match[2] || "";
    var start = null;
    var DURATION = 900;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / DURATION, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Highlights ---------------- */

  var hlWrap = document.getElementById("highlightCards");

  /* All per-tab copy lives in data/home.js so it can be edited without
     touching any code. */
  function block() {
    return (typeof HOME !== "undefined" && HOME[PF.scope.current]) || {};
  }

  function renderHighlights() {
    if (!hlWrap) return;
    hlWrap.innerHTML = "";
    var section = document.getElementById("highlights");
    var items = block().highlights || [];
    if (section) section.hidden = !items.length;
    items.forEach(function (h, i) {
      var card = document.createElement("div");
      card.className = "hl-card";
      var icon = document.createElement("div");
      icon.className = "hl-icon";
      icon.textContent = h.icon;
      var title = document.createElement("h3");
      title.textContent = h.title;
      var text = document.createElement("p");
      text.textContent = h.text;
      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(text);
      hlWrap.appendChild(PF.staggered(card, i));
    });
  }

  /* ---------------- Showcase: rotating hero banner ----------------
     Shows projects flagged `showcase: true`, falling back to `featured`. */

  var showcaseWrap = document.getElementById("showcaseWrap");
  var showTimer = null;          /* lives outside the render so a scope switch can clear it */

  function renderShowcase() {
    if (!showcaseWrap) return;
    if (showTimer) { clearInterval(showTimer); showTimer = null; }
    showcaseWrap.innerHTML = "";
    var section = document.getElementById("showcaseSection");

    var scoped = PF.scope.filter(PROJECTS);
    var showItems = scoped.filter(function (p) { return p.showcase; });
    if (!showItems.length) showItems = scoped.filter(function (p) { return p.featured; });
    if (section) section.hidden = !showItems.length;

    if (showItems.length) {
      var showIdx = 0;
      var AUTO_MS = 6000;
      var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      var stage = document.createElement("div");
      stage.className = "show-stage";
      showcaseWrap.appendChild(stage);

      function arrowBtn(dir) {
        var btn = document.createElement("button");
        btn.className = "show-arrow " + (dir < 0 ? "prev" : "next");
        btn.setAttribute("aria-label", dir < 0 ? "Previous project" : "Next project");
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.innerHTML = dir < 0 ? '<path d="M15 5l-7 7 7 7"/>' : '<path d="M9 5l7 7-7 7"/>';
        btn.appendChild(svg);
        btn.addEventListener("click", function () { goTo(showIdx + dir); restartAuto(); });
        return btn;
      }

      var dots = document.createElement("div");
      dots.className = "show-dots";
      showItems.forEach(function (_, i) {
        var d = document.createElement("button");
        d.className = "show-dot";
        d.setAttribute("aria-label", "Show project " + (i + 1));
        d.addEventListener("click", function () { goTo(i); restartAuto(); });
        dots.appendChild(d);
      });

      if (showItems.length > 1) {
        showcaseWrap.appendChild(arrowBtn(-1));
        showcaseWrap.appendChild(arrowBtn(1));
        showcaseWrap.appendChild(dots);
      }

      function slideMedia(p, slide) {
        var pv = PF.primaryVideo(p);
        var src = p.thumbnail ? PF.asset(p.thumbnail)
                : pv ? PF.ytPoster(pv) : null;
        if (!src) { slide.appendChild(PF.fallbackThumb(p)); return; }
        var img = document.createElement("img");
        img.src = src;
        img.alt = p.title;
        img.onerror = function () {
          // local thumb missing -> try the video poster; no maxres -> hq; else gradient
          if (pv && img.src.indexOf("i.ytimg.com") === -1) {
            img.src = PF.ytPoster(pv);
          } else if (pv && img.src.indexOf("maxresdefault") !== -1) {
            img.src = PF.ytPoster(pv, true);
          } else if (img.parentNode === slide) {
            slide.replaceChild(PF.fallbackThumb(p), img);
          }
        };
        slide.appendChild(img);
      }

      function renderSlide() {
        var p = showItems[showIdx];
        stage.innerHTML = "";

        var slide = document.createElement("div");
        slide.className = "show-slide";
        slideMedia(p, slide);

        var scrim = document.createElement("div");
        scrim.className = "show-scrim";
        slide.appendChild(scrim);
        slide.appendChild(coverLink(p));

        var info = document.createElement("div");
        info.className = "show-info";
        info.appendChild(PF.badgeEl(p.category));
        var h3 = document.createElement("h3");
        h3.textContent = p.title;
        info.appendChild(h3);
        if (p.genre) {
          var genre = document.createElement("p");
          genre.className = "show-genre";
          genre.textContent = p.genre;
          info.appendChild(genre);
        }
        var desc = document.createElement("p");
        desc.className = "show-desc";
        desc.textContent = p.description;
        info.appendChild(desc);

        var actions = document.createElement("div");
        actions.className = "show-actions";
        var details = document.createElement("a");
        details.className = "btn btn-primary btn-sm";
        details.href = PF.projectUrl(p);
        details.textContent = PF.primaryVideo(p) ? "▶ Watch & details" : "View details";
        actions.appendChild(details);
        Object.keys(p.links || {}).slice(0, 1).forEach(function (key) {
          var a = document.createElement("a");
          a.className = "btn btn-ghost btn-sm";
          a.href = p.links[key];
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = PF.LINK_LABELS[key] || key;
          actions.appendChild(a);
        });
        info.appendChild(actions);
        slide.appendChild(info);

        stage.appendChild(slide);

        dots.querySelectorAll(".show-dot").forEach(function (d, i) {
          d.classList.toggle("active", i === showIdx);
        });
      }

      function goTo(i) {
        showIdx = (i + showItems.length) % showItems.length;
        renderSlide();
      }

      function restartAuto() {
        if (showTimer) clearInterval(showTimer);
        if (!reducedMotion && showItems.length > 1) {
          showTimer = setInterval(function () { goTo(showIdx + 1); }, AUTO_MS);
        }
      }

      showcaseWrap.addEventListener("mouseenter", function () { if (showTimer) clearInterval(showTimer); });
      showcaseWrap.addEventListener("mouseleave", restartAuto);

      renderSlide();
      restartAuto();
    }
  }

  /* ---------------- Spotlight ----------------
     Big alternating rows for projects flagged `featured: true`. */

  var spotWrap = document.getElementById("spotlightRows");

  function renderSpotlight() {
    if (!spotWrap) return;
    spotWrap.innerHTML = "";
    var section = document.getElementById("spotlight");
    var items = PF.scope.filter(PROJECTS).filter(function (p) { return p.featured; });
    if (section) section.hidden = !items.length;
    items.forEach(function (p, i) {
      var row = document.createElement("div");
      row.className = "spot-row" + (i % 2 ? " flip" : "");

      var media = document.createElement("a");
      media.className = "spot-media";
      media.href = PF.projectUrl(p);
      media.setAttribute("aria-label", "View details: " + p.title);
      PF.projectImg(p, media);
      if (p.youtubeId) {
        var badge = document.createElement("span");
        badge.className = "play-badge";
        badge.textContent = "Watch";
        media.appendChild(badge);
      }

      var body = document.createElement("div");
      body.className = "spot-body";
      body.appendChild(PF.badgeEl(p.category));
      var h3 = document.createElement("h3");
      h3.textContent = p.title;
      body.appendChild(h3);
      if (p.genre) {
        var genre = document.createElement("p");
        genre.className = "spot-genre";
        genre.textContent = p.genre;
        body.appendChild(genre);
      }
      var desc = document.createElement("p");
      desc.className = "spot-desc";
      desc.textContent = p.description;
      body.appendChild(desc);
      if (p.tech && p.tech.length) body.appendChild(PF.chipList(p.tech, 5));

      var actions = document.createElement("div");
      actions.className = "spot-actions";
      var detailsBtn = document.createElement("a");
      detailsBtn.className = "btn btn-primary btn-sm";
      detailsBtn.href = PF.projectUrl(p);
      detailsBtn.textContent = "View details";
      actions.appendChild(detailsBtn);
      actions.appendChild(PF.linkButtons(p.links));
      body.appendChild(actions);

      row.appendChild(media);
      row.appendChild(body);
      spotWrap.appendChild(PF.staggered(row, i));
    });
  }

  /* ---------------- Board game section ----------------
     Story card on one side, a side-arrow photo carousel on the other. */

  var boardRows = document.getElementById("boardRows");

  /* The board game is a physical game and has its own section, so it belongs to
     the Mobile Games scope rather than appearing under Casino or Apps. */
  function renderBoardGame() {
    if (!boardRows) return;
    boardRows.innerHTML = "";
    var section = document.getElementById("boardgame");
    var items = PF.scope.filter(PROJECTS).filter(function (p) { return p.category === "boardgame"; });
    if (section) section.hidden = !items.length;
    items.forEach(function (p) {
      var row = document.createElement("div");
      row.className = "board-row reveal";

      /* Left: story card */
      var card = document.createElement("div");
      card.className = "board-card";

      var tag = document.createElement("p");
      tag.className = "board-tag";
      tag.textContent = "Board Game";
      card.appendChild(tag);

      var h3 = document.createElement("h3");
      h3.textContent = p.title;
      card.appendChild(h3);

      if (p.genre) {
        var genre = document.createElement("p");
        genre.className = "board-genre";
        genre.textContent = p.genre;
        card.appendChild(genre);
      }

      String(p.description).split(/\n\s*\n/).forEach(function (para) {
        var el = document.createElement("p");
        el.className = "board-para";
        el.textContent = para;
        card.appendChild(el);
      });

      var actions = document.createElement("div");
      actions.className = "board-actions";
      var details = document.createElement("a");
      details.className = "btn btn-primary btn-sm";
      details.href = PF.projectUrl(p);
      details.textContent = "Want to know more…";
      actions.appendChild(details);
      actions.appendChild(PF.linkButtons(p.links));
      card.appendChild(actions);

      /* Right: photo gallery with side arrows */
      var gallery = document.createElement("div");
      gallery.className = "board-gallery";
      var frame = document.createElement("div");
      frame.className = "bg-frame";
      var caption = document.createElement("p");
      caption.className = "bg-caption";
      var dots = document.createElement("div");
      dots.className = "bg-dots";

      var slides = (p.gallery && p.gallery.length)
        ? p.gallery
        : [{ src: p.thumbnail || "", caption: "" }];
      var gi = 0;

      slides.forEach(function (_, i) {
        var d = document.createElement("button");
        d.className = "show-dot";
        d.setAttribute("aria-label", "Photo " + (i + 1));
        d.addEventListener("click", function () { gi = i; renderPhoto(); });
        dots.appendChild(d);
      });

      function renderPhoto() {
        frame.querySelectorAll("img, .thumb-fallback").forEach(function (n) { n.remove(); });
        var s = slides[gi];
        if (s.src) {
          var img = document.createElement("img");
          img.src = PF.asset(s.src);
          img.alt = p.title + (s.caption ? " - " + s.caption : "");
          img.loading = "lazy";
          img.onerror = function () {
            if (img.parentNode === frame) frame.replaceChild(PF.fallbackThumb(p), img);
          };
          frame.insertBefore(img, frame.firstChild);
        } else {
          frame.insertBefore(PF.fallbackThumb(p), frame.firstChild);
        }
        caption.textContent = s.caption || "";
        dots.querySelectorAll(".show-dot").forEach(function (d, i) {
          d.classList.toggle("active", i === gi);
        });
      }

      function galleryArrow(dir) {
        var btn = document.createElement("button");
        btn.className = "show-arrow " + (dir < 0 ? "prev" : "next");
        btn.setAttribute("aria-label", dir < 0 ? "Previous photo" : "Next photo");
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.innerHTML = dir < 0 ? '<path d="M15 5l-7 7 7 7"/>' : '<path d="M9 5l7 7-7 7"/>';
        btn.appendChild(svg);
        btn.addEventListener("click", function () {
          gi = (gi + dir + slides.length) % slides.length;
          renderPhoto();
        });
        return btn;
      }

      if (slides.length > 1) {
        frame.appendChild(galleryArrow(-1));
        frame.appendChild(galleryArrow(1));
      }
      frame.appendChild(coverLink(p));

      renderPhoto();
      gallery.appendChild(frame);
      gallery.appendChild(caption);
      if (slides.length > 1) gallery.appendChild(dots);

      row.appendChild(card);
      row.appendChild(gallery);
      boardRows.appendChild(row);
    });
  }

  /* ---------------- Scope tabs ----------------
     One control for the whole page below the hero. */

  function renderCopy() {
    var b = block();
    var t = document.getElementById("projectsTitle");
    var sub = document.getElementById("projectsSub");
    if (t) t.textContent = b.title || "All Projects";
    if (sub) sub.textContent = b.intro || "";
  }

  function renderScope() {
    renderCopy();
    renderHighlights();
    renderShowcase();
    renderSpotlight();
    renderBoardGame();
  }

  var scopeBar = document.getElementById("projectScope");
  if (scopeBar) {
    var scopes = PF.scope.available();
    /* Counts tell a visitor there is something behind each tab before clicking. */
    var counts = {};
    PROJECTS.forEach(function (p) {
      var k = PF.scope.of(p);
      counts[k] = (counts[k] || 0) + 1;
    });
    if (scopes.length > 1) {
      scopes.forEach(function (sc) {
        var btn = document.createElement("button");
        btn.className = "scope-btn" + (sc.key === PF.scope.current ? " active" : "");
        btn.setAttribute("role", "tab");
        var label = document.createElement("span");
        label.textContent = sc.label;
        btn.appendChild(label);
        var count = document.createElement("span");
        count.className = "scope-count";
        count.textContent = counts[sc.key] || 0;
        btn.appendChild(count);
        btn.addEventListener("click", function () {
          scopeBar.querySelectorAll(".scope-btn").forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          PF.scope.set(sc.key);          /* grid.js listens too */
        });
        scopeBar.appendChild(btn);
      });
    } else {
      scopeBar.hidden = true;
    }
  }

  PF.scope.onChange(renderScope);
  renderScope();
})();
