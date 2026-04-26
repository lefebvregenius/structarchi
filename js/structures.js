// Animation apparition douce du texte
const sections = document.querySelectorAll(".content p, .section-title");

window.addEventListener("scroll", () => {
  sections.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// initial style
sections.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 1s ease";
});