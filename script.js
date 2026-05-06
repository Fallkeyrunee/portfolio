// ===============================
// THEME TOGGLE
// ===============================
function toggleTheme() {
  document.body.classList.toggle("light");
}

// ===============================
// FADE SECTIONS
// ===============================
const fadeSections = document.querySelectorAll(".fade-section");

function revealSections() {
  const trigger = window.innerHeight * 0.85;

  fadeSections.forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("show");
    }
  });
}

// ===============================
// NAV ACTIVE + HIDE/SHOW
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("nav");

let lastScrollNav = 0;

function updateNav() {
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // hide/show nav
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollNav && currentScroll > 100) {
    nav.style.transform = "translateX(-50%) translateY(80px)";
    nav.style.opacity = "0";
  } else {
    nav.style.transform = "translateX(-50%) translateY(0)";
    nav.style.opacity = "1";
  }

  lastScrollNav = currentScroll;
}

// ===============================
// CASE STUDY (FIXED MULTI SECTION)
// ===============================
const caseSections = document.querySelectorAll(".case-section");

function updateCaseStudy() {
  const trigger = window.innerHeight * 0.6;

  caseSections.forEach((section) => {
    const sectionRect = section.getBoundingClientRect();

    // 👉 Only run when section is visible
    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
      const steps = section.querySelectorAll(".step");
      const before = section.querySelector(".visual-before");
      const after = section.querySelector(".visual-after");
      const bars = section.querySelectorAll(".bar");

      steps.forEach((step, i) => {
        const top = step.getBoundingClientRect().top;

        if (top < trigger && top > 0) {
          step.classList.add("active");

          // BEFORE / AFTER toggle
          if (i <= 1) {
            before?.classList.add("active");
            after?.classList.remove("active");
          } else {
            before?.classList.remove("active");
            after?.classList.add("active");
          }

          // Chart animation (last step only)
          if (i === steps.length - 1) {
            bars.forEach((bar) => bar.classList.add("animate"));
          }
        } else {
          // ✅ RESET when scrolling away
          step.classList.remove("active");
        }
      });
    }
  });
}

// ===============================
// SUMMARY + TITLES
// ===============================
const reveals = document.querySelectorAll(".reveal");
const titles = document.querySelectorAll(".section-title");

function revealExtras() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("show");
    }
  });

  titles.forEach((title) => {
    if (title.getBoundingClientRect().top < trigger) {
      title.classList.add("show");
    }
  });
}

// ===============================
// TIMELINE
// ===============================
const timeline = document.querySelector(".timeline");

function animateTimeline() {
  if (!timeline) return;

  let progress = timeline.querySelector(".timeline-progress");

  if (!progress) {
    progress = document.createElement("div");
    progress.classList.add("timeline-progress");
    timeline.appendChild(progress);
  }

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let height = windowHeight - rect.top;
  height = Math.max(0, Math.min(height, rect.height));
  progress.style.height = height + "px";

  const items = document.querySelectorAll(".timeline-item");

  items.forEach((item) => {
    if (item.getBoundingClientRect().top < windowHeight * 0.85) {
      item.classList.add("show");
    }
  });
}

// ===============================
// SKILLS
// ===============================
const skillCards = document.querySelectorAll(".skill-card");

function animateSkills() {
  const trigger = window.innerHeight * 0.85;

  skillCards.forEach((card) => {
    if (card.getBoundingClientRect().top < trigger) {
      const value = card.dataset.skill;
      const bar = card.querySelector(".skill-bar span");

      if (bar && !bar.classList.contains("loaded")) {
        bar.style.width = value + "%";
        bar.classList.add("loaded");
      }
    }
  });
}

// ===============================
// PARALLAX
// ===============================
const layers = document.querySelectorAll(".layer");

function updateParallax() {
  const scrollY = window.scrollY;

  layers.forEach((layer, i) => {
    const depth = (i + 1) * 20;
    layer.style.transform = `translateY(${scrollY * depth * 0.0008}px)`;
  });
}

// ===============================
// HERO EFFECT
// ===============================
const hero = document.querySelector(".hero");

function updateHero() {
  if (!hero) return;

  const scrolled = window.scrollY;
  hero.style.transform = `scale(${1 - scrolled * 0.0003})`;
  hero.style.opacity = `${1 - scrolled * 0.0015}`;
}

// ===============================
// MASTER SCROLL LOOP (PERFORMANCE)
// ===============================
let ticking = false;

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      revealSections();
      updateNav();
      updateCaseStudy();
      revealExtras();
      animateTimeline();
      animateSkills();
      updateParallax();
      updateHero();

      ticking = false;
    });

    ticking = true;
  }
}

window.addEventListener("scroll", handleScroll);

// ===============================
// INIT
// ===============================
window.addEventListener("load", () => {
  revealSections();
  updateNav();
  updateCaseStudy();
  revealExtras();
  animateTimeline();
  animateSkills();
});
