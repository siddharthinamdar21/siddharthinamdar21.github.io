/* ==========================================================================
   PROJECT DETAIL PAGE (pages/project/index.html)
   One template renders every project, chosen by the ?id= query parameter:
   pages/project/?id=sweet-merge
   Requires: data/profile.js, data/projects.js, js/core.js
   ========================================================================== */

(function () {
  "use strict";

  var projectRoot = document.getElementById("projectRoot");
  if (!projectRoot) return;

  /* ---------------- Back link ----------------
     The markup hardcodes "All projects", so arriving from the home page sent
     you somewhere you had never been. Point the link at wherever you actually
     came from, and go through history rather than a fresh navigation so the
     grid you left is restored at the scroll position you left it. */

  (function retargetBack() {
    var back = projectRoot.querySelector(".pd-back");
    if (!back || !document.referrer) return;

    var from;
    try { from = new URL(document.referrer, window.location.href); } catch (e) { return; }
    if (from.origin !== window.location.origin) return;        /* arrived from elsewhere */
    if (/\/pages\/project\//.test(from.pathname)) return;      /* another detail page */

    var label =
      /\/pages\/projects\//.test(from.pathname) ? "All projects" :
      /\/pages\/about\//.test(from.pathname)    ? "Back to about" :
      /\/pages\/contact\//.test(from.pathname)  ? "Back to contact" :
      "Back to home";

    back.textContent = "← " + label;
    back.href = document.referrer;   /* real href, so middle-click still works */
    back.addEventListener("click", function (e) {
      if (window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
  })();

  /* ---------------- Media ---------------- */

  /* Click-to-play YouTube: shows a thumbnail until clicked, so the page
     never loads the YouTube player (and its cookies) unless asked. */
  function ytFacade(youtubeId, title, container) {
    var btn = document.createElement("button");
    btn.className = "yt-facade";
    btn.setAttribute("aria-label", "Play video: " + title);

    var img = document.createElement("img");
    img.src = PF.ytPoster(youtubeId);
    img.alt = "";
    img.onerror = function () { img.src = PF.ytPoster(youtubeId, true); };
    btn.appendChild(img);

    var play = document.createElement("span");
    play.className = "play";
    btn.appendChild(play);

    btn.addEventListener("click", function () {
      /* Opened straight from disk there is no http(s) origin, and YouTube
         rejects the embed with "error 153". Send the viewer to YouTube itself
         rather than showing them a broken player. */
      if (PF.isFile) {
        window.open("https://youtu.be/" + youtubeId, "_blank", "noopener");
        return;
      }
      var iframe = document.createElement("iframe");
      /* playsinline keeps iOS from hijacking the video into fullscreen. */
      iframe.src = "https://www.youtube-nocookie.com/embed/" + youtubeId +
        "?autoplay=1&rel=0&playsinline=1";
      iframe.title = title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      container.replaceChild(iframe, btn);
    });
    return btn;
  }

  /* Gradient stand-in for projects with no video and no thumbnail yet.
     It deliberately carries no title or category badge: the page renders both
     directly beneath the hero, so repeating them here read as a duplicate. */
  function projectPoster(p, host) {
    host.innerHTML = "";
    host.classList.add("poster");
    var g = PF.FALLBACK_GRADIENTS[PF.hashCode(p.id) % PF.FALLBACK_GRADIENTS.length];
    host.style.background = "linear-gradient(135deg, " + g[0] + ", " + g[1] + ")";
    var box = document.createElement("div");
    box.className = "pd-poster";
    var note = document.createElement("span");
    note.className = "pd-poster-note";
    note.textContent = "🎬 Gameplay video & screenshots coming soon";
    box.appendChild(note);
    host.appendChild(box);
  }

  function projectHeroMedia(p, host) {
    host.innerHTML = "";
    host.classList.remove("poster");
    host.style.background = "";
    var vid = PF.primaryVideo(p);
    if (vid) {
      host.appendChild(ytFacade(vid, p.title, host));
    } else if (p.thumbnail) {
      var img = document.createElement("img");
      img.src = PF.asset(p.thumbnail);
      img.alt = p.title;
      img.onerror = function () { projectPoster(p, host); };
      host.appendChild(img);
    } else {
      projectPoster(p, host);
    }
  }

  /* Grouped projects (six Plinko builds, five Slots, …) carry a list of
     variants. A thumbnail row swaps which one the hero plays. */
  function buildVariantRow(p, host) {
    var wrap = document.getElementById("pdVariants");
    if (!wrap || !p.videos || p.videos.length < 2) return;
    wrap.hidden = false;
    p.videos.forEach(function (v, i) {
      var label = v.label || ("Variant " + (i + 1));
      var btn = document.createElement("button");
      btn.className = "pd-variant" + (i === 0 ? " active" : "");
      var img = document.createElement("img");
      img.src = PF.ytPoster(v.id, true);
      img.alt = "";
      img.loading = "lazy";
      btn.appendChild(img);
      var cap = document.createElement("span");
      cap.textContent = label;
      btn.appendChild(cap);
      btn.addEventListener("click", function () {
        wrap.querySelectorAll(".pd-variant").forEach(function (x) { x.classList.remove("active"); });
        btn.classList.add("active");
        host.innerHTML = "";
        host.classList.remove("poster");
        host.style.background = "";
        host.appendChild(ytFacade(v.id, p.title + " - " + label, host));
      });
      wrap.appendChild(btn);
    });
  }

  /* ---------------- Screenshot gallery ---------------- */

  function buildGallery(p, mount) {
    var slides = p.gallery;
    var gi = 0;
    var frame = document.createElement("div");
    frame.className = "bg-frame";
    var caption = document.createElement("p");
    caption.className = "bg-caption";
    var dots = document.createElement("div");
    dots.className = "bg-dots";

    slides.forEach(function (_, i) {
      var d = document.createElement("button");
      d.className = "show-dot";
      d.setAttribute("aria-label", "Photo " + (i + 1));
      d.addEventListener("click", function () { gi = i; render(); });
      dots.appendChild(d);
    });

    function render() {
      frame.querySelectorAll("img, .thumb-fallback").forEach(function (n) { n.remove(); });
      var s = slides[gi];
      if (s.src) {
        var img = document.createElement("img");
        img.src = PF.asset(s.src);
        img.alt = p.title + (s.caption ? " - " + s.caption : "");
        img.loading = "lazy";
        img.onerror = function () { if (img.parentNode === frame) frame.replaceChild(PF.fallbackThumb(p), img); };
        frame.insertBefore(img, frame.firstChild);
      } else {
        frame.insertBefore(PF.fallbackThumb(p), frame.firstChild);
      }
      caption.textContent = s.caption || "";
      dots.querySelectorAll(".show-dot").forEach(function (d, i) { d.classList.toggle("active", i === gi); });
    }

    function arrow(dir) {
      var btn = document.createElement("button");
      btn.className = "show-arrow " + (dir < 0 ? "prev" : "next");
      btn.setAttribute("aria-label", dir < 0 ? "Previous photo" : "Next photo");
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.innerHTML = dir < 0 ? '<path d="M15 5l-7 7 7 7"/>' : '<path d="M9 5l7 7-7 7"/>';
      btn.appendChild(svg);
      btn.addEventListener("click", function () { gi = (gi + dir + slides.length) % slides.length; render(); });
      return btn;
    }

    if (slides.length > 1) { frame.appendChild(arrow(-1)); frame.appendChild(arrow(1)); }
    render();
    mount.appendChild(frame);
    mount.appendChild(caption);
    if (slides.length > 1) mount.appendChild(dots);
  }

  /* ---------------- Page ---------------- */

  function renderProjectPage() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];

    if (!p) {
      projectRoot.innerHTML =
        '<div class="container pd-notfound"><h1>Project not found</h1>' +
        '<p class="muted">That project doesn\'t exist or has been moved.</p>' +
        '<p style="margin-top:20px"><a class="btn btn-primary" href="' + PF.page("projects") +
        '">Browse all projects</a></p></div>';
      return;
    }

    /* SEO / share metadata. og:image is made absolute - several link-preview
       scrapers (LinkedIn, WhatsApp) ignore relative image URLs. */
    document.title = p.title + " - Siddharth Inamdar";
    var shortDesc = String(p.description).split(/\n\s*\n/)[0];
    var setMeta = function (elId, attr, val) {
      var el = document.getElementById(elId);
      if (el) el.setAttribute(attr, val);
    };
    var absolute = function (path) { return new URL(path, window.location.href).href; };
    setMeta("metaDesc", "content", shortDesc);
    setMeta("ogTitle", "content", p.title + " - Siddharth Inamdar");
    setMeta("ogDesc", "content", shortDesc);
    if (p.thumbnail) setMeta("ogImage", "content", absolute(PF.asset(p.thumbnail)));
    else if (PF.primaryVideo(p)) setMeta("ogImage", "content", PF.ytPoster(PF.primaryVideo(p)));

    var heroHost = document.getElementById("pdHero");
    projectHeroMedia(p, heroHost);
    buildVariantRow(p, heroHost);

    var badges = document.getElementById("pdBadges");
    badges.appendChild(PF.badgeEl(p.category));
    document.getElementById("pdTitle").textContent = p.title;
    var genreEl = document.getElementById("pdGenre");
    if (p.genre) genreEl.textContent = p.genre; else genreEl.style.display = "none";

    var descBox = document.getElementById("pdDesc");
    String(p.description).split(/\n\s*\n/).forEach(function (para) {
      var el = document.createElement("p");
      el.textContent = para;
      descBox.appendChild(el);
    });

    /* Optional cards - each stays hidden unless the project supplies data. */
    /* role takes either a single sentence or a list of points. A list reads
       far better once a project has more than one thing worth naming. */
    if (p.role && (!Array.isArray(p.role) || p.role.length)) {
      document.getElementById("pdRoleCard").hidden = false;
      var roleBox = document.getElementById("pdRole");
      if (Array.isArray(p.role)) {
        var ul = document.createElement("ul");
        ul.className = "pd-role-list";
        p.role.forEach(function (point) {
          var li = document.createElement("li");
          li.textContent = point;
          ul.appendChild(li);
        });
        roleBox.appendChild(ul);
      } else {
        var para = document.createElement("p");
        para.textContent = p.role;
        roleBox.appendChild(para);
      }
    }
    if (p.tech && p.tech.length) {
      document.getElementById("pdTechCard").hidden = false;
      var techUl = document.getElementById("pdTech");
      p.tech.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        techUl.appendChild(li);
      });
    }
    if (p.links && Object.keys(p.links).some(function (k) { return p.links[k]; })) {
      document.getElementById("pdLinksCard").hidden = false;
      document.getElementById("pdLinks").appendChild(PF.linkButtons(p.links));
    }
    if (p.gallery && p.gallery.length) {
      document.getElementById("pdGalleryWrap").hidden = false;
      buildGallery(p, document.getElementById("pdGallery"));
    }

    /* Prev / next (wraps around) */
    var i = PROJECTS.indexOf(p);
    var n = PROJECTS.length;
    if (n > 1) {
      var nav = document.getElementById("pdNav");
      [[-1, "Previous"], [1, "Next"]].forEach(function (pair) {
        var np = PROJECTS[(i + pair[0] + n) % n];
        var a = document.createElement("a");
        a.className = "pd-nav-item" + (pair[0] > 0 ? " next" : "");
        a.href = PF.projectUrl(np);
        var dir = document.createElement("span");
        dir.className = "pd-nav-dir";
        dir.textContent = pair[1];
        var title = document.createElement("span");
        title.className = "pd-nav-title";
        title.textContent = np.title;
        a.appendChild(dir);
        a.appendChild(title);
        nav.appendChild(a);
      });
    }
  }

  renderProjectPage();
})();
