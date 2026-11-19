# Design Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 32 issues from the 2026-11-19 design/performance audit so mobile Lighthouse performance reaches ≥85 and the mobile layout has no covered or see-through content.

**Architecture:** Static Vite + React 19 single page. Fixes are spread across `index.html`, `public/`, `src/index.css`, layout components and sections. Heavy third-party assets (Font Awesome CDN, GSAP, MUI, PNG images) are replaced with lighter equivalents (inline SVG icons, an IntersectionObserver reveal hook, plain CSS, WebP with `srcset`).

**Tech Stack:** React 19, Vite 8, framer-motion (kept), `@fortawesome/free-*-svg-icons` (icon data only), `sharp` (dev-only image script).

**Spec:** The issue list in the "Issues" section below, from the audit run on 2026-11-19 (baseline numbers included).

## Issues (spec)

Baseline (production build, Lighthouse 12.2.1, mobile preset): Perf 63 · A11y 95 · BP 100 · SEO 92 · FCP 5.0 s · LCP 8.3 s · weight 1,883 KiB.

| # | Issue | Task |
|---|---|---|
| 1 | `pharmacy_hero.png` 600 KB PNG, not resized | 2 |
| 2 | `pharmacy_logo.png` 261 KB 1024² shown at 44–54 px | 2 |
| 3 | `dr_kabir_banner.jpeg` 279 KB, no resizing | 2 |
| 4 | No `loading="lazy"` on below-fold images | 2 |
| 5 | Images missing `width`/`height` | 2 |
| 6 | Full Font Awesome CDN (~280 KB fonts) for ~40 icons | 3 |
| 7 | GSAP + framer-motion both shipped | 4 |
| 8 | gtag (179 KB) loads eagerly | 4 |
| 9 | Maps iframe eager — **already `loading="lazy"`, no change; verify only** | 9 |
| 10 | ~150 KB unused JS (incl. MUI/emotion used only for `CssBaseline`; root `motion.div` fades whole app from opacity 0, delaying LCP) | 4 |
| 11 | 13 Google Font weights loaded | 1 |
| 12 | 3 floating buttons cover content on mobile | 6 |
| 13 | Mobile drawer see-through | 5 |
| 14 | No overlay behind mobile drawer | 5 |
| 15 | Mobile hero image below fold | 7 |
| 16 | Mobile page 11,856 px tall at 390 px | 7 |
| 17 | About stats stack as 3 tall cards on mobile | 7 |
| 18 | Storefront photo shown twice in a row | 2 |
| 19 | Desktop hero CTAs wrap 2+1 | 7 |
| 20 | No Bengali web font | 1 |
| 21 | Dr. Kabir card uses poster, others use avatar | 2 |
| 22 | Every section uses identical header pattern | 8 |
| 23 | Footer brand "STATE" vs header "M/S STATE" | 8 |
| 24 | Logo text unreadable at 44–54 px | 2 |
| 25 | Address/phone/email duplicated in Contact + footer | 8 |
| 26 | Contrast fail: inactive lang button, `#order` subtitle | 8 |
| 27 | Touch targets < 44 px on mobile | 5, 8 |
| 28 | Text < 12 px | 5, 8 |
| 29 | Stats use `h4` with no `h3` | 7 |
| 30 | No `robots.txt` / sitemap | 1 |
| 31 | Favicon points at 600 KB PNG with svg type | 1 |
| 32 | `<html lang="en">` while default content is Bengali | 1 |

## Global Constraints

- Work on branch `fix/design-audit` (repo is on `main`; branch first).
- Both languages (`bn` default, `en`) must render correctly after every task.
- Keep existing breakpoints: `1024px`, `992px`, `768px`, `480px` in `src/index.css`.
- Desktop (≥1024 px) appearance must not regress except where an issue explicitly changes it (#19, #22, #23, #25).
- New runtime deps allowed: `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons`, `@fortawesome/free-brands-svg-icons` (all `^6.7.2`). New dev dep allowed: `sharp` (`^0.33.5`). No others.
- Removed deps: `gsap`, `@gsap/react`, `@mui/material`, `@emotion/react`, `@emotion/styled`.
- Phone `+917501482099`, WhatsApp `https://wa.me/917501482099`, domain from `public/CNAME` stay unchanged.
- Touch targets on touch layouts (≤768 px): min 44×44 px. Text: min 12 px everywhere.
- Contrast: all text ≥ 4.5:1 (Lighthouse `color-contrast` passes).

## Verification tooling (used by every task)

No unit-test framework exists; each task's "test" is a scripted browser check plus build.

- Audit scripts live in the session scratchpad: `$AUDIT=/private/tmp/claude-501/-Users-suvo-Developer-Project-StateMS/933169b2-f15b-4dd3-bd76-02c12e58aef7/scratchpad/audit` (`shots.mjs` = 5-viewport screenshots + overflow/touch-target/small-text/image report; `seg.mjs` = scrolled segments + mobile menu screenshot). If the scratchpad is gone, recreate them: Playwright-core 1.49.1 driving `~/Library/Caches/ms-playwright/chromium-1243`.
- Build + serve: `npx vite build --outDir $AUDIT/../dist --emptyOutDir && npx vite preview --outDir $AUDIT/../dist --port 4173 --strictPort` (background).
- Every task ends with: `npm run build` succeeds, `npm run lint` adds no new errors, and the task's specific checks pass. **Look at the screenshots** — a passing script with a broken render is a fail.

## Review Focus

1. **English mode at 360 px** — longer English strings in header, hero buttons and doctor tabs must not overflow or wrap into broken layouts. Task 9 runs `shots.mjs` with `language=en` (set `localStorage` key used by `LanguageContext` before load).
2. **Reveal content with no IntersectionObserver / reduced motion** — content must be visible, never stuck at opacity 0. Task 4 adds a check that emulates `prefers-reduced-motion: reduce` and asserts every `.reveal` element has computed opacity `1`.
3. **Drawer close paths** — Escape key, overlay tap, link tap and resize past 768 px all close the drawer and restore `body` scroll. Task 5 checks each.
4. **Hero slider second image** — lazy second slide must still appear when the slider advances (no blank frame). Task 2 waits 5.5 s and screenshots.
5. **Icons that are built from strings dynamically** (`fa-xmark`/`fa-bars` toggle, file-type icons in `PrescriptionOrder.jsx`) — every icon still renders after FA CDN removal. Task 3 asserts zero `<i>` elements left with a `fa-` class and zero empty `.icon` elements.

---

### Task 1: Head, fonts and SEO files (#11, #20, #30, #31, #32)

**Files:**
- Modify: `index.html`
- Modify: `src/index.css:71-72` (font vars)
- Create: `public/robots.txt`, `public/sitemap.xml`

**Interfaces:** Produces CSS vars `--font-heading`, `--font-body` (names unchanged).

- [ ] **Step 1:** `index.html`: `<html lang="bn">`; favicon → `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`; Google Fonts URL → `family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap`.
- [ ] **Step 2:** `src/index.css`: `--font-heading: 'Outfit', 'Hind Siliguri', sans-serif;` `--font-body: 'Plus Jakarta Sans', 'Hind Siliguri', sans-serif;`. Grep for `font-weight: 300` and `900`; if found, map to 400 / 800.
- [ ] **Step 3:** `public/robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://<CNAME domain>/sitemap.xml`. `public/sitemap.xml`: single `<url>` for the root with `<lastmod>2026-11-19</lastmod>`.
- [ ] **Step 4: Verify.** Build + preview. `curl -s localhost:4173/robots.txt` returns the text, not HTML. In browser: `document.fonts.check('16px "Hind Siliguri"', 'আ')` is `true` after load; Lighthouse SEO = 100.
- [ ] **Step 5: Commit** `fix: bengali web font, favicon, lang, robots and sitemap`.

### Task 2: Images (#1–5, #18, #21, #24)

**Files:**
- Create: `scripts/optimize-images.mjs`; add `"images": "node scripts/optimize-images.mjs"` to `package.json` scripts; `sharp` devDep.
- Move originals: `public/assets/*.{png,jpeg}` → `assets-src/` (outside `public`, so they are not deployed).
- Generate into `public/assets/`: `<name>-<w>.webp`.
- Create: `src/components/ResponsiveImage.jsx`
- Modify: `src/sections/Hero.jsx`, `src/sections/About.jsx`, `src/sections/Doctors.jsx`, `src/components/layout/Nav.jsx`, `src/components/layout/Footer.jsx`

**Interfaces:**
- Produces: `ResponsiveImage({ name: string, widths: number[], sizes: string, alt: string, width: number, height: number, priority?: boolean, className?, style? })` → `<img src="/assets/{name}-{max}.webp" srcSet="… {w}w" sizes width height loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async">`.

Variants (name → widths): `pharmacy_hero` → 640, 1024 · `dr_kabir_banner` → 800, 1600 · `shop_counter`, `shop_shelves`, `waiting_area`, `consultation_room` → 640, 1024 · `logo-mark` → 64, 128. WebP quality 78. `logo-mark` is the cross symbol cropped from `pharmacy_logo.png` without the small text underneath; choose the crop box by viewing the image, and check the result by looking at it.

- [ ] **Step 1:** Write the script (reads `assets-src/`, writes `public/assets/`, never upscales). Run `npm run images`. Expected: every generated file < 120 KB; `logo-mark-128.webp` < 15 KB.
- [ ] **Step 2:** Hero: first slide `priority`, `sizes="(max-width: 992px) 100vw, 560px"`; second slide lazy. Nav logo + footer logo → `logo-mark` (footer lazy). About gallery: **remove the storefront entry** (#18), so the gallery starts at `shop_counter`. Doctors: Dr. Kabir gets the same avatar + name + qualification header as the other doctors. Remove `bannerImage` rendering and put a text link "পোস্টার দেখুন / View poster" under the qualification, opening `/assets/dr_kabir_banner-1600.webp` in a new tab (add translation key `doctors.viewPoster`). Delete the `.doctor-banner-card`/`.doc-banner-container` CSS if unused.
- [ ] **Step 3: Verify.** `shots.mjs`: image report shows every `<img>` with `.webp` src and non-empty `width`/`height`; the only non-lazy images are the hero first slide and the nav logo. Wait 5.5 s on hero and screenshot: second slide visible (Review Focus 4). Lighthouse: `uses-responsive-images`, `modern-image-formats`, `unsized-images` pass.
- [ ] **Step 4: Commit** `perf: webp responsive images, logo mark, consistent doctor cards`.

### Task 3: Replace Font Awesome CDN with inline SVG icons (#6)

**Files:**
- Create: `src/components/Icon.jsx`
- Modify: every file using `<i className="fa-…">` (Nav, Hero, About, Services, PrescriptionOrder, Doctors, FAQ, Contact, Footer, WhatsAppWidget, ShareWidget, ScrollToTop, TermsModal) and `src/context/LanguageContext.jsx` if icon names are stored there.
- Modify: `index.html` (remove FA `<link>`), `src/index.css` (add `.icon` rule)

**Interfaces:**
- Produces: `Icon({ name: string, className?: string })` → `<i className={"icon " + className} aria-hidden="true"><svg viewBox="0 0 {w} {h}" fill="currentColor"><path d={path}/></svg></i>`. `name` is the FA name without prefix (`'phone'`, `'whatsapp'`, `'clock-regular'` for regular style). The map lives in the same file, built from named imports `faPhone`, `faWhatsapp`, `faClock as faClockRegular`, … (`icon` tuple: `[w, h, , , path]`).
- CSS: `.icon { display:inline-flex; width:1em; height:1em; line-height:1; vertical-align:-0.125em } .icon svg { width:100%; height:100% }`. The `<i>` wrapper is kept so existing `… i { font-size; color }` selectors keep working.

- [ ] **Step 1:** `grep -rn "fa-" src` gives the full icon list (about 40 names: solid, regular `clock` `circle-check` `calendar-check`, brands `whatsapp` `facebook-f`). Add each to the map. Also `grep -n "\.fa-" src/index.css` and move any rule found onto `.icon`/the parent selector.
- [ ] **Step 2:** Replace all usages, including the dynamic `isMobileOpen ? 'xmark' : 'bars'` and the file-type icons in `PrescriptionOrder.jsx`. Remove the FA `<link>`.
- [ ] **Step 3: Verify.** In the browser at 390 and 1280: `document.querySelectorAll('i[class*="fa-"]').length === 0` and `[...document.querySelectorAll('.icon')].every(i => i.querySelector('path'))` (Review Focus 5). Screenshots: icons the same size and colour as before. Network: no `cdnjs` requests.
- [ ] **Step 4: Commit** `perf: inline svg icons instead of font awesome cdn`.

### Task 4: JS diet: drop GSAP and MUI, stop the app fade-in, defer GA (#7, #8, #10)

**Files:**
- Create: `src/hooks/useReveal.js`
- Modify: `src/main.jsx`, `src/App.jsx`, `src/sections/About.jsx`, `src/sections/Services.jsx`, `src/sections/Contact.jsx`, `src/context/ThemeContext.jsx`, `src/utils/analytics.js`, `vite.config.js`, `src/index.css`
- Delete: `src/theme.js`
- `npm uninstall gsap @gsap/react @mui/material @emotion/react @emotion/styled`

**Interfaces:**
- Produces: `useReveal(ref: RefObject<HTMLElement>)`. It observes `.reveal` descendants with one IntersectionObserver (`rootMargin: '0px 0px -10% 0px'`) and adds `.is-visible` once, using `transitionDelay = index*120ms` (cap 600 ms). If IntersectionObserver is missing, or `matchMedia('(prefers-reduced-motion: reduce)')` matches, it adds `.is-visible` to all of them at once.
- CSS: `.reveal { opacity:0; transform:translateY(28px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1) } .reveal.is-visible { opacity:1; transform:none }`, plus a `@media (prefers-reduced-motion: reduce)` rule that sets `.reveal` to `opacity:1; transform:none; transition:none`.
- Produces: `initGA()` unchanged signature. New `scheduleGA()` calls `initGA` from `requestIdleCallback(…, { timeout: 4000 })` after `window` `load` (fallback `setTimeout(…, 2000)`). `App.jsx` calls `scheduleGA()`.

- [ ] **Step 1:** Rename `gsap-reveal` → `reveal` in the 3 sections and swap `useGSAP` for `useReveal`. Remove the ScrollTrigger refresh effect from `App.jsx` and the gsap imports from `main.jsx`.
- [ ] **Step 2:** `App.jsx`: replace the root `motion.div` (initial opacity 0) and the empty footer `motion.div` with plain fragments. `ThemeContext.jsx`: keep the `ThemeCtx` provider and drop the MUI provider + `CssBaseline`. Check that `src/index.css` already has `box-sizing: border-box` and a `body { margin:0 }` reset, and add them if missing. `vite.config.js`: the `animation` chunk only matches `framer-motion`; remove the `mui` chunk rule.
- [ ] **Step 3: Verify.** Build output: no `mui-*.js` chunk; `animation-*.js` gzip < 45 KB. Screenshots at 390/1280 are unchanged apart from animation timing. With reduced motion emulated (`page.emulateMedia({ reducedMotion: 'reduce' })`), every `.reveal` has computed opacity `"1"` without scrolling (Review Focus 2). Without emulation, scroll through and every `.reveal` ends at opacity 1. Network: the `gtag/js` request starts after the `load` event.
- [ ] **Step 4: Commit** `perf: replace gsap and mui, remove app fade-in, defer analytics`.

### Task 5: Mobile header and drawer (#13, #14, #27 header, #28 header)

**Files:**
- Modify: `src/components/layout/Nav.jsx`, `src/index.css` (header block ~278–440, mobile block 2056+)

**Interfaces:**
- Nav renders `<header>` (desktop `<nav className="nav">`, hidden ≤768) and, **as a sibling outside `<header>`**, `<div className="drawer-overlay" />` + `<nav className="mobile-drawer" aria-label="Mobile Navigation">` (links + the existing `mobile-lang-switcher`). Toggle class `open` on both.
- One `closeMenu()` restores `document.body.style.overflow = ''`. It is called by link click, overlay click, `keydown` Escape, and `matchMedia('(min-width: 769px)')` change.

- [ ] **Step 1:** Build the drawer: background `#ffffff` (solid, no backdrop-filter), width `min(82vw, 320px)`, `transform: translateX(100%)` → `none` when open, `z-index` above header. Overlay: `rgba(10,25,41,.45)` with fade. Drawer links are min 48 px tall.
- [ ] **Step 2:** ≤768: hide the header `.lang-switcher` (it already lives in the drawer). Header `.cta-btn` becomes icon-only 44×44 (keep `aria-label` = `t('nav.call')`). `.mobile-menu-btn` 44×44. `.logo-subtitle` ≥ 12 px at every breakpoint (lines 344, 2081, 2279).
- [ ] **Step 3: Verify.** `seg.mjs` menu screenshot at 390: drawer is opaque, overlay dims the page. Script checks (Review Focus 3): after open, each of Escape / overlay click / link click / resizing to 1024 sets `.mobile-drawer` without `open` and `body.style.overflow === ''`. `shots.mjs` at 360/390: header has no touch target under 44 px and no text under 12 px.
- [ ] **Step 4: Commit** `fix: opaque mobile drawer with overlay, 44px header targets`.

### Task 6: Floating buttons (#12)

**Files:**
- Modify: `src/App.jsx`, `src/components/layout/ScrollToTop.jsx`, `src/components/layout/ShareWidget.jsx`, `src/components/layout/Footer.jsx`, `src/index.css` (1751–1930, 2321–2360)

**Interfaces:**
- `ShareWidget` gets a prop `variant: 'floating' | 'inline'`. `'inline'` renders a 44×44 `.social-btn` for the footer `.social-links`, with the same share/copy logic and toast.

- [ ] **Step 1:** ≤768: hide the floating share widget and `.floating-scroll-top` with `display:none`; WhatsApp FAB is 52×52 at `right:16px; bottom:16px`. Add `<ShareWidget variant="inline" />` to the footer social links (all widths). Add `.footer-bottom { padding-bottom: 84px }` at ≤768 so the FAB never covers the copyright.
- [ ] **Step 2:** Above 768 keep the 3-button stack, but `ScrollToTop` shows only after `scrollY > 1200`.
- [ ] **Step 3: Verify.** 390 segments: no text or button sits under a FAB. Scripted check: for every element with text or a link within 80 px of the FAB, `document.elementFromPoint` at the element centre returns the element itself, not the FAB. The footer share button works: the toast appears in headless mode, using the clipboard fallback.
- [ ] **Step 4: Commit** `fix: single whatsapp fab on mobile, share moved to footer`.

### Task 7: Hero and About layout (#15, #16, #17, #19, #29)

**Files:**
- Modify: `src/sections/Hero.jsx`, `src/sections/About.jsx`, `src/index.css` (hero, `.stats-grid`, `.stat-box h4` at 882)

- [ ] **Step 1:** Hero: remove the `btn-secondary` "call" button. Two CTAs remain (Order and WhatsApp), on one row from 480 px up and stacked full-width below 480. ≤768: `.quick-info-pills` become a compact single wrapped row (12–13 px chips, 32 px tall, 6 px gap), and `.trust-indicators` become a 2×2 grid at 13 px.
- [ ] **Step 2:** About stats: `h4` → `h3` (CSS selector `.stat-box h3`, same styles). ≤768: `.stats-grid` is `grid-template-columns: repeat(3, 1fr)`, compact padding (12 px), number 1.25 rem, label 12 px.
- [ ] **Step 3: Verify.** At 390×844, the top edge of the hero image is < 844 px from the top (inside the first screen). Page height at 390 ≤ 9,500 px (baseline 11,856). At 1280, hero CTAs are on one row. Lighthouse `heading-order` passes.
- [ ] **Step 4: Commit** `fix: compact mobile hero and stats, single-row ctas`.

### Task 8: Visual polish and accessibility (#22, #23, #25, #26, #27 rest, #28 rest)

**Files:**
- Modify: `src/index.css` (`.lang-btn` 403, `.section-header p` 497, `.gallery-dot-btn` 783, `.tab-btn`), `src/components/layout/Footer.jsx`, `src/sections/PrescriptionOrder.jsx`

- [ ] **Step 1:** Contrast: darken the inactive `.lang-btn` colour and the `#order .section-header p` colour until each is ≥ 4.5:1 against its actual background (measure with Lighthouse or a contrast calc and record the values in the commit body).
- [ ] **Step 2:** ≤768: `.gallery-dot-btn` and `.tab-btn` are min 44 px tall with 12.5 px+ text.
- [ ] **Step 3:** Footer: logo title "M/S STATE" (#23). The contact column keeps phone + email and drops the address line (#25; the full address stays in the Contact section).
- [ ] **Step 4:** #22: the Order section header gets a variant `section-header--left` (left-aligned, no eyebrow pill, accent left border 4 px `var(--accent)`) so it breaks the repeated centred pattern. Other sections are unchanged.
- [ ] **Step 5: Verify.** Lighthouse mobile: `color-contrast` passes and accessibility = 100. `shots.mjs` at 360/390: smallTargets list contains no touch-layout element under 44 px; smallText is empty.
- [ ] **Step 6: Commit** `fix: contrast, touch targets, footer brand, section variety`.

### Task 9: Final verification

- [ ] **Step 1:** Fresh build + preview. Run `shots.mjs` and `seg.mjs` in `bn`, then again in `en` (Review Focus 1). No overflow, no console errors, and screenshots reviewed at all 5 widths.
- [ ] **Step 2:** Lighthouse mobile + desktop. Targets: mobile Perf ≥ 85, LCP ≤ 3.0 s, A11y 100, SEO 100, BP 100, total weight ≤ 700 KiB; desktop Perf ≥ 95. Confirm the Maps iframe is not requested on initial load (#9).
- [ ] **Step 3:** Write the before/after table into the PR description. Stop the preview server.
