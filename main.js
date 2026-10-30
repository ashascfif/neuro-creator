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

    const formData = new FormData(form);
    formData.append("access_key", "7541468b-9bac-4711-b0f2-6c120e19d9e2");

    const inputs = form.querySelectorAll("input, textarea");
    if (inputs.length >= 3) {
      formData.append("name", inputs[0].value);
      formData.append("contact_info", inputs[1].value);
      formData.append("message", inputs[2].value);
    }

    fetch("https://web3forms.com", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        form.reset();
        if (formNote) {
          formNote.hidden = false;
          setTimeout(() => {
            formNote.hidden = true;
          }, 5000);
        }
      } else {
        alert("Произошла ошибка: " + (data.message || "Не удалось отправить."));
      }
    })
    .catch(error => {
      console.error("Ошибка:", error);
      alert("Не удалось отправить форму. Проверьте интернет-соединение.");
    });
  });
}
