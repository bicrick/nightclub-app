export function initPieces() {
  const pieces = document.querySelectorAll(".piece");
  if (!pieces.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pieces.forEach((piece) => piece.classList.add("is-inview"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
        }
      });
    },
    { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
  );

  pieces.forEach((piece) => observer.observe(piece));
}
