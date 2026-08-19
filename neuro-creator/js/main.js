const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => observer.observe(el));

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    if (formNote) {
      formNote.hidden = false;
      setTimeout(() => {
        formNote.hidden = true;
      }, 5000);
    }
  });
}
