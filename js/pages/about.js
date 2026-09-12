/* ==========================================================================
   ABOUT PAGE (pages/about/index.html) — photo, summary, quick facts,
   experience timeline, education, skills and strengths.
   Requires: data/profile.js, data/about.js, js/core.js
   ========================================================================== */

(function () {
  "use strict";

  var aboutSummary = document.getElementById("aboutSummary");
  if (!aboutSummary) return;

  var aboutPhoto = document.getElementById("aboutPhoto");
  if (PROFILE.photo) aboutPhoto.src = PF.asset(PROFILE.photo);
  else aboutPhoto.style.display = "none";

  ABOUT.summary.forEach(function (para, i) {
    var p = document.createElement("p");
    p.textContent = para;
    aboutSummary.appendChild(PF.staggered(p, i));
  });

  /* ---------------- Quick facts ---------------- */

  var facts = document.getElementById("quickFacts");
  function fact(iconKey, label, value, href) {
    if (!value) return;
    var li = document.createElement("li");
    li.appendChild(PF.svgIcon(iconKey));

    var lab = document.createElement("span");
    lab.className = "fact-label";
    lab.textContent = label;
    li.appendChild(lab);

    var val;
    if (href) {
      val = document.createElement("a");
      val.href = href;
      if (/^https?:/.test(href)) { val.target = "_blank"; val.rel = "noopener"; }
    } else {
      val = document.createElement("span");
    }
    val.className = "fact-value";
    val.textContent = value;
    li.appendChild(val);

    facts.appendChild(li);
  }
  fact("location", "Location", PROFILE.location);
  fact("email", "Email", PROFILE.email, "mailto:" + PROFILE.email);
  fact("phone", "Phone", PROFILE.phone, PROFILE.phone ? "tel:" + PROFILE.phone.replace(/\s/g, "") : null);
  fact("openTo", "Open to", PROFILE.openTo);
  /* Label is derived from the URL so it can never drift out of sync with
     data/profile.js — the old hardcoded one no longer matched the real link. */
  var linkedinHandle = (PROFILE.socials.linkedin || "").replace(/\/+$/, "").split("/").pop();
  fact("linkedin", "LinkedIn", linkedinHandle, PROFILE.socials.linkedin);

  /* ---------------- Experience timeline ---------------- */

  var tl = document.getElementById("expTimeline");
  ABOUT.experience.forEach(function (job, i) {
    var item = document.createElement("div");
    item.className = "tl-item";

    var head = document.createElement("div");
    head.className = "tl-head";
    var h3 = document.createElement("h3");
    h3.textContent = job.role;
    head.appendChild(h3);
    var period = document.createElement("span");
    period.className = "tl-period";
    period.textContent = job.period;
    head.appendChild(period);
    item.appendChild(head);

    var org = document.createElement("p");
    org.className = "tl-org";
    org.textContent = job.company + (job.location ? " · " + job.location : "");
    item.appendChild(org);

    if (job.points && job.points.length) {
      var ul = document.createElement("ul");
      ul.className = "tl-points";
      job.points.forEach(function (pt) {
        var li = document.createElement("li");
        li.textContent = pt;
        ul.appendChild(li);
      });
      item.appendChild(ul);
    }
    tl.appendChild(PF.staggered(item, i));
  });

  /* ---------------- Education ---------------- */

  var edu = document.getElementById("eduList");
  ABOUT.education.forEach(function (ed, i) {
    var card = document.createElement("div");
    card.className = "edu-card";
    var h3 = document.createElement("h3");
    h3.textContent = ed.degree;
    card.appendChild(h3);
    var school = document.createElement("p");
    school.className = "edu-school";
    school.textContent = ed.school;
    card.appendChild(school);
    var period = document.createElement("span");
    period.className = "tl-period";
    period.textContent = ed.period;
    card.appendChild(period);
    edu.appendChild(PF.staggered(card, i));
  });

  /* ---------------- Skills & strengths ---------------- */

  /* Skills may carry a level as "Unity (Advanced)". Split it out so the level
     reads as a small tag rather than parenthetical noise inside the chip.
     Entries with no level render as an ordinary chip. */
  function skillChips(items) {
    var ul = document.createElement("ul");
    ul.className = "chips";
    (items || []).forEach(function (raw) {
      var m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(raw);
      var li = document.createElement("li");
      li.textContent = m ? m[1] : raw;
      if (m) {
        var level = document.createElement("span");
        level.className = "skill-level";
        level.textContent = m[2];
        li.appendChild(level);
      }
      ul.appendChild(li);
    });
    return ul;
  }

  var sg = document.getElementById("skillGroups");
  Object.keys(ABOUT.skills).forEach(function (groupName, i) {
    var group = document.createElement("div");
    group.className = "skill-group";
    var h3 = document.createElement("h3");
    h3.textContent = groupName;
    group.appendChild(h3);
    group.appendChild(skillChips(ABOUT.skills[groupName]));
    sg.appendChild(PF.staggered(group, i));
  });

  var strengths = document.getElementById("strengthChips");
  ABOUT.strengths.forEach(function (s) {
    var li = document.createElement("li");
    li.textContent = s;
    strengths.appendChild(li);
  });

  var ctaOpenTo = document.getElementById("ctaOpenTo");
  if (ctaOpenTo) ctaOpenTo.textContent = PROFILE.openTo + " · " + PROFILE.location;
})();
