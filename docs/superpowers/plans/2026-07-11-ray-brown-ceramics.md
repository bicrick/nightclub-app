# Ray Brown Ceramics Portfolio Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Ship a mobile-first static portfolio site for Ray Brown Ceramics on GitHub Pages.

**Architecture:** Single-page static site with modular CSS/JS. Relative paths. Content from `assets/`. Deploy via GitHub Actions Pages workflow.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (Intersection Observer), GitHub Pages

---

### Task 1: Scaffold site shell

**Files:**
- Create: `index.html`, `css/*.css`, `js/*.js`, `.github/workflows/pages.yml`

- [ ] Build HTML structure (hero, work, statement, about, contact)
- [ ] Wire mobile-first tokens and base styles
- [ ] Add Pages workflow

### Task 2: Hero + gallery + motion

- [ ] Hero with crossfade using archived photos
- [ ] Work gallery with lightbox
- [ ] Scroll reveal + reduced-motion support

### Task 3: Content sections + deploy

- [ ] Statement, about, contact from artist.json content
- [ ] Verify mobile/desktop layout
- [ ] Commit, push, enable Pages
