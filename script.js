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

window.addEventListener("load", revealSections);
window.addEventListener("scroll", revealSections);

// ===============================
// ACTIVE NAV
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
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
});


// ===============================
// NAV HIDE / SHOW (ADD HERE)
// ===============================
let lastScrollNav = 0; // 🔥 use different variable name
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollNav && currentScroll > 100) {
    // hide
    nav.style.transform = "translateX(-50%) translateY(80px)";
    nav.style.opacity = "0";
  } else {
    // show
    nav.style.transform = "translateX(-50%) translateY(0)";
    nav.style.opacity = "1";
  }

  lastScrollNav = currentScroll;
});


// ===============================
// CASE STUDY SWITCH
// ===============================
const steps = document.querySelectorAll(".step");
const before = document.querySelector(".visual-before");
const after = document.querySelector(".visual-after");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.6;

  steps.forEach((step, i) => {
    if (step.getBoundingClientRect().top < trigger) {
      step.classList.add("active");

      if (i <= 1) {
        before?.classList.add("active");
        after?.classList.remove("active");
      } else {
        before?.classList.remove("active");
        after?.classList.add("active");
      }
    }
  });
});

// ===============================
// INIT STATE (IMPORTANT FIX)
// ===============================
window.addEventListener("load", () => {
  document.querySelector(".step")?.classList.add("active");
  document.querySelector(".visual-before")?.classList.add("active");
});

// ===============================
// PREMIUM CURSOR PRO SYSTEM
// ===============================
const glow = document.querySelector(".cursor-glow");
const glow2 = document.querySelector(".glow-2");

let mouseX = 0;
let mouseY = 0;

let trailX = 0;
let trailY = 0;

let lastMoveTime = Date.now();
let lastScroll = window.scrollY;

// sizes
const baseSize = 220;
const trailSize = 400;

// ===============================
// TRACK MOUSE
// ===============================
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lastMoveTime = Date.now();
});

// ===============================
// GET ACTIVE SECTION
// ===============================
function getActiveSection() {
  const sections = document.querySelectorAll("section");

  for (let sec of sections) {
    const rect = sec.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      return sec;
    }
  }
  return null;
}

// ===============================
// ANIMATION LOOP
// ===============================
function animate() {
  const now = Date.now();

  // ===============================
  // 🎯 ACTIVE SECTION
  // ===============================
  const section = getActiveSection();

  if (section) {
    const glowMode = section.dataset.glow;
    const color = section.dataset.glowColor;

    // 🌙 SHOW ONLY ON DARK
    if (glowMode === "light") {
      glow.style.opacity = "0";
      glow2.style.opacity = "0";
    } else {
      glow.style.opacity = "1";
      glow2.style.opacity = "1";
    }

    // 🎨 COLOR CHANGE
    if (color) {
      glow.style.background = `radial-gradient(circle, rgba(${color},0.25), transparent 70%)`;
      glow2.style.background = `radial-gradient(circle, rgba(${color},0.12), transparent 75%)`;
    }
  }

  // ===============================
  // 😴 IDLE EXPAND
  // ===============================
  const idleTime = now - lastMoveTime;
  let scale = 1;

  if (idleTime > 1000) {
    scale = 1.4; // expand when idle
  }

  // ===============================
  // 🚀 SCROLL SPEED REACTION
  // ===============================
  const scrollNow = window.scrollY;
  const speed = Math.abs(scrollNow - lastScroll);
  lastScroll = scrollNow;

  const stretch = Math.min(speed * 0.02, 0.4);

  // ===============================
  // ⚡ MAIN GLOW (NO DELAY)
  // ===============================
  glow.style.transform = `
    translate3d(${mouseX - baseSize / 2}px, ${mouseY - baseSize / 2}px, 0)
    scale(${scale + stretch}, ${scale - stretch})
  `;

  // ===============================
  // 🌊 TRAIL
  // ===============================
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;

  glow2.style.transform = `
    translate3d(${trailX - trailSize / 2}px, ${trailY - trailSize / 2}px, 0)
    scale(${scale})
  `;

  requestAnimationFrame(animate);
}

animate();
// ===============================
// Hover buttons
// ===============================

const interactive = document.querySelectorAll("a, button, .card");

interactive.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    glow.style.transform = "translate(-50%, -50%) scale(1.2)";
    glow.style.opacity = "1";
  });

  el.addEventListener("mouseleave", () => {
    glow.style.transform = "translate(-50%, -50%) scale(1)";
    glow.style.opacity = "0.7";
  });
});

// ===============================
// CURSOR BOOST ON TIMELINE HOVER
// ===============================
document.querySelectorAll(".timeline-content").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    glow.style.transform = "translate(-50%, -50%) scale(0.7)";
  });

  el.addEventListener("mouseleave", () => {
    glow.style.transform = "translate(-50%, -50%) scale(1)";
  });
});


// ===============================
// SUMMARY STAGGER REVEAL
// ===============================
const reveals = document.querySelectorAll(".reveal");

function revealSummary() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSummary);
window.addEventListener("load", revealSummary);

// ===============================
// SECTION TITLE REVEAL
// ===============================
const titles = document.querySelectorAll(".section-title");

function revealTitles() {
  const trigger = window.innerHeight * 0.85;

  titles.forEach((title) => {
    const top = title.getBoundingClientRect().top;

    if (top < trigger) {
      title.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealTitles);
window.addEventListener("load", revealTitles);

// ===============================
// PREMIUM TIMELINE ENGINE
// ===============================
const timeline = document.querySelector(".timeline");

if (timeline) {
  const progress = document.createElement("div");
  progress.classList.add("timeline-progress");
  timeline.appendChild(progress);

  const items = document.querySelectorAll(".timeline-item");

  function animateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // PROGRESS LINE
    let height = windowHeight - rect.top;
    height = Math.max(0, Math.min(height, rect.height));
    progress.style.height = height + "px";

    // REVEAL ITEMS
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < windowHeight * 0.85) {
        item.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", animateTimeline);
  window.addEventListener("load", animateTimeline);
}