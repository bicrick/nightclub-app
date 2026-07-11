export function initHero() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let index = 0;
  const intervalMs = 5200;

  window.setInterval(() => {
    slides[index].classList.remove("is-active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("is-active");
  }, intervalMs);
}
