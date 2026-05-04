function toggleTheme() {
  document.body.classList.toggle("light");
}

/* PARALLAX + SMOOTH */
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
    hero.style.transform = `translateY(${current * 0.15}px)`;
  }

  requestAnimationFrame(animate);
}
animate();

/* FADE */
const fade = document.querySelectorAll(".fade-section");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  fade.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("show");
    }
  });
});

/* NAV ACTIVE */
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (scrollY >= top) {
      currentSection = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

/* CURSOR FIXED (CENTERED) */
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

// SMOOTH SCROLL (iOS-like)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});