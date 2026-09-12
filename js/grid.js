/* ==========================================================================
   PROJECT GRID - category filters + project cards.
   Shared by the home page and the projects page, which ask for different
   things via attributes on #projectGrid:

     data-limit="9"     cap the number of cards (home page)
     data-scope="true"  follow the page-level scope tab (see PF.scope in core.js)

   The projects page sets neither, so it renders every project with the
   full category filter bar.
   Requires: data/projects.js, js/core.js
   ========================================================================== */

(function () {
  "use strict";

  var grid = document.getElementById("projectGrid");
  if (!grid) return;

  var filterBar = document.getElementById("filters");      /* optional */
  var moreBar = document.getElementById("projectMore");    /* optional */

  var limit = parseInt(grid.getAttribute("data-limit"), 10) || 0;
  var useScope = grid.getAttribute("data-scope") === "true";

  var activeFilter = "all";

  function matches(p) {
    if (useScope && PF.scope.of(p) !== PF.scope.current) return false;
    return activeFilter === "all" || p.category === activeFilter;
  }

  function renderCards() {
    grid.innerHTML = "";
    var list = PROJECTS.filter(matches);
    var shown = limit ? list.slice(0, limit) : list;

    shown.forEach(function (p, i) {
      var card = document.createElement("a");
      card.className = "card";
      card.href = PF.projectUrl(p);

      var thumb = document.createElement("div");
      thumb.className = "card-thumb";
      PF.projectImg(p, thumb);

      /* Tell the visitor there is footage behind the card before they click. */
      if (PF.primaryVideo(p)) {
        var play = document.createElement("span");
        play.className = "play-badge";
        play.textContent = "Watch";
        thumb.appendChild(play);
      }
      /* Grouped projects (six Plinko builds, five Slots) say so up front -
         the count is the interesting part, not the single poster frame. */
      if (p.videos && p.videos.length > 1) {
        var variants = document.createElement("span");
        variants.className = "variant-badge";
        variants.textContent = p.videos.length + " variants";
        thumb.appendChild(variants);
      }
      card.appendChild(thumb);

      var body = document.createElement("div");
      body.className = "card-body";
      body.appendChild(PF.badgeEl(p.category));
      var h3 = document.createElement("h3");
      h3.textContent = p.title;
      body.appendChild(h3);
      if (p.genre) {
        var genre = document.createElement("p");
        genre.className = "card-genre";
        genre.textContent = p.genre;
        body.appendChild(genre);
      }
      var desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = p.description;
      body.appendChild(desc);
      if (p.tech && p.tech.length) body.appendChild(PF.chipList(p.tech, 4));

      card.appendChild(body);
      grid.appendChild(PF.staggered(card, i));
    });

    if (moreBar) {
      moreBar.hidden = list.length <= shown.length;
    }
    /* Cards are rebuilt on every change, so re-arm the reveals. */
    PF.watchReveals();
  }

  /* ---------------- Category filters ---------------- */

  function buildFilters() {
    filterBar.innerHTML = "";
    /* Only offer categories that actually have projects in the current scope. */
    var used = {};
    PROJECTS.forEach(function (p) {
      if (useScope && PF.scope.of(p) !== PF.scope.current) return;
      used[p.category] = true;
    });
    var keys = Object.keys(CATEGORIES).filter(function (k) { return used[k]; });
    /* One category needs no filter bar - and an empty bar would still take up
       its margin, leaving a gap above the grid. */
    filterBar.hidden = keys.length < 2;
    if (filterBar.hidden) return;

    ["all"].concat(keys).forEach(function (key) {
      var btn = document.createElement("button");
      btn.className = "filter-btn" + (key === activeFilter ? " active" : "");
      btn.textContent = key === "all" ? "All" : CATEGORIES[key];
      btn.setAttribute("role", "tab");
      btn.addEventListener("click", function () {
        activeFilter = key;
        filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderCards();
      });
      filterBar.appendChild(btn);
    });
  }

  if (filterBar) buildFilters();

  /* The scope tab lives on the page, not in this module - react to it. */
  if (useScope) {
    PF.scope.onChange(function () {
      activeFilter = "all";
      if (filterBar) buildFilters();
      renderCards();
    });
  }

  /* ---------------- "View all" link (home page) ---------------- */

  if (moreBar) {
    var a = document.createElement("a");
    a.className = "btn btn-outline";
    a.href = PF.page("projects");
    a.textContent = "View all " + PROJECTS.length + " projects →";
    moreBar.appendChild(a);
  }

  renderCards();
})();
