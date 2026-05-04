function toggleTheme() {
  document.body.classList.toggle("light");
}

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function openModal(title, desc, tech) {
  modal.style.display = "flex";
  modalContent.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <p>${tech}</p>
  `;
}

function closeModal() {
  modal.style.display = "none";
}

/* NAV ACTIVE */
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (scrollY >= top) current = section.id;
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});