const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function openModal(title, desc, tech) {
  modal.style.display = "flex";
  modalContent.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <p><strong>${tech}</strong></p>
  `;
}

function closeModal() {
  modal.style.display = "none";
}

/* SCROLL ANIMATION */
const sections = document.querySelectorAll("section");
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  sections.forEach((sec) => {
    if (sec.getBoundingClientRect().top < trigger) {
      sec.classList.add("show");
    }
  });

  cards.forEach((card, i) => {
    if (card.getBoundingClientRect().top < trigger) {
      setTimeout(() => card.classList.add("show"), i * 150);
    }
  });
});

/* NAV ACTIVE */
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
