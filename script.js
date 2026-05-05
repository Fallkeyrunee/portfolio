// ===============================
// THEME TOGGLE
// ===============================
function toggleTheme() {
  document.body.classList.toggle("light");
}

// ===============================
// SMOOTH PARALLAX (APPLE-LIKE)
// ===============================
let current = 0;
let target = 0;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function animate() {
  target = window.scrollY;
  current = lerp(current, target, 0.08);

  const hero = document.querySelector(".hero-inner");
  if (hero) {
    hero.style.transform = `translateY(${current * 0.12}px)`;
  }

  requestAnimationFrame(animate);
}
animate();

// ===============================
// FADE-IN SECTIONS (FIXED)
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

// Run on load + scroll
window.addEventListener("load", revealSections);
window.addEventListener("scroll", revealSections);

// ===============================
// ACTIVE NAV LINK
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 200;
    if (window.scrollY >= top) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// ===============================
// CURSOR GLOW (FIXED CENTER)
// ===============================
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (!glow) return;

  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ===============================
// SMOOTH SCROLL (MOBILE SAFE)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// ===============================
// CASE STUDY STEP REVEAL + UI SWITCH
// ===============================
const steps = document.querySelectorAll(".step");
const before = document.querySelector(".visual-before");
const after = document.querySelector(".visual-after");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.6;

  steps.forEach((step, i) => {
    const rect = step.getBoundingClientRect();

    if (rect.top < trigger) {
      step.classList.add("active");

      // 🔥 BEFORE → AFTER SWITCH
      if (i <= 1) {
        if (before) before.classList.add("active");
        if (after) after.classList.remove("active");
      } else {
        if (before) before.classList.remove("active");
        if (after) after.classList.add("active");
      }
    }
  });
});

// ===============================
// PARALLAX DEPTH (MULTI-LAYER)
// ===============================
const layers = document.querySelectorAll(".layer");

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  layers.forEach((layer, i) => {
    const speed = (i + 1) * 0.04;
    layer.style.transform = `translateY(${scroll * speed}px)`;
  });
});

// ===============================
// CHART ANIMATION (RUN ONCE)
// ===============================
const bars = document.querySelectorAll(".bar");
const chart = document.querySelector(".chart");

let chartPlayed = false;

function animateChart() {
  if (chartPlayed) return;
  chartPlayed = true;

  bars.forEach((bar, i) => {
    setTimeout(() => {
      bar.classList.add("animate");
    }, i * 200);
  });
}

window.addEventListener("scroll", () => {
  if (!chart) return;

  const rect = chart.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.8) {
    animateChart();
  }
});

// Ensure first step + visuals show immediately
window.addEventListener("load", () => {
  const firstStep = document.querySelector(".step");
  if (firstStep) firstStep.classList.add("active");

  const before = document.querySelector(".visual-before");
  if (before) before.classList.add("active");
});