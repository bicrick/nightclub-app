function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initPieces() {
  const pieces = document.querySelectorAll(".piece");
  const rail = document.querySelector(".chapter-rail");
  const fill = document.querySelector(".chapter-rail-fill");
  const meta = document.querySelector(".chapter-rail-meta");

  if (!pieces.length) return;

  if (prefersReducedMotion()) {
    pieces.forEach((piece) => piece.classList.add("is-inview"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    pieces.forEach((piece) => observer.observe(piece));
  }

  const pieceChapters = Array.from(pieces);

  const syncRail = () => {
    if (!rail || !fill || !meta || !pieceChapters.length) return;

    let activeIndex = -1;
    let best = 0;

    pieceChapters.forEach((chapter, index) => {
      const rect = chapter.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const ratio = visible / Math.max(rect.height, 1);
      if (ratio > best && ratio > 0.35) {
        best = ratio;
        activeIndex = index;
      }
    });

    if (activeIndex < 0) {
      rail.classList.remove("is-active");
      meta.classList.remove("is-active");
      return;
    }

    const active = pieceChapters[activeIndex];
    const label =
      active.dataset.chapterLabel ||
      active.getAttribute("aria-label") ||
      `Piece ${activeIndex + 1}`;
    const total = pieceChapters.length;
    const current = String(activeIndex + 1).padStart(2, "0");
    const totalLabel = String(total).padStart(2, "0");

    fill.style.width = `${((activeIndex + 1) / total) * 100}%`;
    meta.textContent = `${current} / ${totalLabel} — ${label}`;
    rail.classList.add("is-active");
    meta.classList.add("is-active");
  };

  window.addEventListener("scroll", syncRail, { passive: true });
  window.addEventListener("resize", syncRail);
  syncRail();
}
