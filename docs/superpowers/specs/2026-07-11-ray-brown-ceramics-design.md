# Ray Brown Ceramics — Portfolio Redesign Spec

## Goal

A minimalist, motion-forward static portfolio for ceramic artist Ray Brown, deployed on GitHub Pages. Photography leads; UI stays quiet. Mobile and desktop are co-equal.

## Audience & Purpose

Visitors should feel the work first — contemplative utilitarian pottery with graphic surface language. Bio, statement, and contact support the gallery. No shop in v1.

## Visual Direction

- **Palette:** Warm cream base (`#FAF6F1`), charcoal (`#1F1E1C`), soft stone, terracotta/teal/gold accents drawn from the work. No purple theme.
- **Type:** Expressive serif for brand/display (Fraunces); geometric sans for UI/body (Outfit).
- **Layout:** Single scroll; one job per section; full-bleed hero; no cards in the hero; sparse nav.
- **Motion:** Hero crossfade, scroll-reveal on work, restrained lightbox. Lighter motion on mobile; honor `prefers-reduced-motion`.

## Site Map

1. Hero — brand, one line, dominant photo
2. Work — gallery + lightbox
3. Statement — artist statement
4. About — bio + highlights
5. Contact — email, Instagram, mailto

## Technical Constraints

- Static HTML/CSS/JS, relative asset paths (works locally and on GitHub Pages)
- Mobile-first CSS; no hover-only interactions
- Modular files under `css/` and `js/`
- Content sourced from `assets/content/artist.json` and `assets/photos/`

## Success Criteria

- Usable on ~375px and ~1280px without horizontal scroll
- Hero reads as one composition on both viewports
- Images lazy-load; reduced-motion disables non-essential animation
- Live mockup on GitHub Pages
