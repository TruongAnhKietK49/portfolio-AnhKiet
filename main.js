(function () {
  "use strict";

  // ---------- back to top button ----------
  const backBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  });
  backBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------- reveal on scroll (fade up) ----------
  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealThreshold = 120; // offset from bottom

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // if element enters viewport (with some offset)
      if (rect.top < windowHeight - revealThreshold && rect.bottom > 0) {
        el.classList.add("active");
      } else {
        // optional: remove class to re-hide when out of view?
        // i prefer to keep them visible after first reveal, so we don't remove
        // but we could add a condition if we want re-trigger. For better UX, keep visible.
        // uncomment next line if you want to hide again (more dramatic)
        // el.classList.remove('active');
      }
    });
  }

  // ---------- dark mode toggle ----------
  const toggle = document.getElementById("toggleDark");

  // load saved mode
  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
  }

  toggle.onclick = () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "on");
    } else {
      localStorage.setItem("darkMode", "off");
    }
  };

  // run on load and on scroll
  window.addEventListener("load", checkReveal);
  window.addEventListener("scroll", checkReveal);
  // also run after small delay to catch any layout shifts
  setTimeout(checkReveal, 200);

  // ---------- active nav link on scroll (highlight) ----------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";
    const scrollPos = window.scrollY + 200; // offset

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").replace("#", "");
      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("load", updateActiveNav);

  // ---------- smooth click for nav links (bootstrap already has preventDefault?) we add extra smoothness
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault(); // prevent default jump
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
})();
