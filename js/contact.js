/* ==========================================================================
   CONTACT - contact sidebar links + the message form.
   Used by the home page (contact section) and the contact page.
   Requires: data/profile.js, js/core.js
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Contact sidebar ---------------- */

  var contactSide = document.getElementById("contactSide");
  if (contactSide) {
    var contactLink = function (iconKey, text, href, sub) {
      var a = document.createElement("a");
      a.className = "contact-link";
      if (href) { a.href = href; if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; } }
      a.appendChild(PF.svgIcon(iconKey));
      var label = document.createElement("span");
      label.className = "contact-label";
      label.textContent = text;
      if (sub) {
        var small = document.createElement("small");
        small.textContent = sub;
        label.appendChild(small);
      }
      a.appendChild(label);
      return a;
    };

    contactSide.appendChild(contactLink("email", PROFILE.email, "mailto:" + PROFILE.email));
    if (PROFILE.phone) contactSide.appendChild(contactLink("phone", PROFILE.phone, "tel:" + PROFILE.phone.replace(/\s/g, "")));
    if (PROFILE.location) contactSide.appendChild(contactLink("location", PROFILE.location, null, PROFILE.openTo));
    Object.keys(PROFILE.socials).forEach(function (key) {
      if (!PROFILE.socials[key]) return;
      var name = key.charAt(0).toUpperCase() + key.slice(1);
      contactSide.appendChild(contactLink(key, name, PROFILE.socials[key]));
    });
  }

  /* ---------------- Message form ----------------
     Posts to Formspree once profile.formspreeId is filled in; until then it
     falls back to opening the visitor's email client. */

  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);

      if (PROFILE.formspreeId) {
        status.textContent = "Sending…";
        fetch("https://formspree.io/f/" + PROFILE.formspreeId, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        })
          .then(function (res) {
            if (res.ok) {
              form.reset();
              status.textContent = "Thanks! Your message has been sent.";
            } else {
              throw new Error("Formspree error");
            }
          })
          .catch(function () {
            status.textContent = "Something went wrong - please email me directly instead.";
          });
      } else {
        var subject = encodeURIComponent("Portfolio contact from " + data.get("name"));
        var body = encodeURIComponent(data.get("message") + "\n\n- " + data.get("name") + " (" + data.get("email") + ")");
        window.location.href = "mailto:" + PROFILE.email + "?subject=" + subject + "&body=" + body;
      }
    });
  }
})();
