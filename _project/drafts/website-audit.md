# Ooh La La Brasserie — Website Audit
*Prepared: June 2026 · Auditor: Claude Code*
*Last updated: June 2026 — Phases 1 & 2 complete*

---

## Status Legend
- ✅ Done
- ⏭️ Skipped (intentional — see note)
- ❌ Pending (Phase 3 or 4)

---

## Phase 1 — Critical Fixes ✅ COMPLETE

| # | Item | File | Status | Notes |
|---|---|---|---|---|
| 1 | Opening hours synced | `Visit.tsx`, `footer-section.tsx` | ✅ | Mon–Sun 8am–5pm everywhere |
| 2 | ContactCTA added to Home.tsx | `Home.tsx` | ✅ | `#contact` anchor restored — footer link works |
| 3 | Unsplash images replaced with real food photos | `MenuPreview.tsx` | ✅ | All 5 category images now use `/brand-assets/` |
| 4 | "Download Full Menu" button | `MenuPreview.tsx` | ✅ | Disabled, shows "Menu Coming Soon" — awaiting menu list from client |
| 5 | Gallery II in nav | `Navbar.tsx` | ⏭️ | Kept — client is choosing between the two gallery styles |
| 6 | Cocktails sub-label | `MenuPreview.tsx` | ✅ | Changed "Evening Selection" → "Afternoon Selection" |
| 7 | `og:image` meta tag | `index.html` | ✅ | Points to `/brand-assets/menu-1.jpg` |
| 8 | `viewport-shot.mjs` port | `viewport-shot.mjs` | ✅ | Fixed 3001 → 5173 |

---

## Phase 2 — Conversion & UX ✅ COMPLETE

| # | Item | File | Status | Notes |
|---|---|---|---|---|
| 9 | LocalBusiness JSON-LD schema | `index.html` | ✅ | `CafeOrCoffeeShop` type, correct hours, address, phone, social links |
| 10 | `robots.txt` and `sitemap.xml` | `public/` | ✅ | All 3 routes included |
| 11 | Menu card "Explore →" removed | `MenuPreview.tsx` | ✅ | Removed — no link destination until /menu page built in Phase 3 |
| 12 | "Book a Table" CTA | `Navbar.tsx`, `Hero.tsx` | ✅ | Navbar CTA + hero primary button — both `mailto:` with Table Booking subject. Mobile drawer also has Book a Table button |
| 13 | Real testimonials | `Testimonials.tsx` | ✅ | 5 real Google reviews (names anonymised to first name + initial). Google rating pill (4.6 · 384 reviews) added above carousel. "Read all 384 reviews" link added below |
| 14 | Sticky mobile CTA bar | `mobile-sticky-cta.tsx` | ✅ | New component — slides up after 85% of hero scrolled. Call Us + Directions + dismiss button |
| 15 | Newsletter "Coming Soon" | `footer-section.tsx` | ✅ | Form visually dimmed, non-interactive, gold "Coming Soon" badge |
| 16 | Per-page titles for gallery routes | `Gallery.tsx`, `Gallery2.tsx` | ✅ | "Gallery — Ooh La La Brasserie" / "Food Gallery — Ooh La La Brasserie" |
| 17 | Mobile menu stagger animation | `Navbar.tsx` | ✅ | Items now stagger in individually on open; reset instantly on close |

---

## Bonus Fixes Applied (outside original plan)

| Item | File | Notes |
|---|---|---|
| Coffee image corrected to `menu-9.jpg` (actual cappuccino) | `MenuPreview.tsx` | Previous assignment was wrong |
| Cocktails image corrected to `menu-11.jpg` (actual cocktails photo) | `MenuPreview.tsx` | Previous assignment was wrong |
| All 13 slider image alt texts updated with specific descriptions | `image-auto-slider.tsx` | Now accurate (mushrooms, cappuccino, pistachio pancakes, cocktails, eggs benedict, avocado toast) |
| `aria-hidden="true"` removed from slider wrapper | `image-auto-slider.tsx` | Slider now visible to screen readers |
| `prefers-reduced-motion` check added to testimonials auto-advance | `Testimonials.tsx` | Phase 4 item, done early |
| Favicon fixed | `index.html` | Changed `/brand-assets/logo.webp` → `/favicon.svg` |
| `robots` meta + canonical link added | `index.html` | `index, follow` + canonical to production URL |
| `og:url` meta added | `index.html` | |

---

## Phase 3 — Visual Polish & Advanced Features ✅ COMPLETE

| # | Item | File | Status | Notes |
|---|---|---|---|---|
| 18 | Hero image WebP conversion | `Hero.tsx`, `/brand-assets/` | ✅ | `hero-640/1280/1920.webp` generated via sharp; `<picture>` srcset + `fetchPriority="high"` on fallback |
| 19 | `/menu` page | — | ⏭️ | Skipped — awaiting menu content from client |
| 20 | Private hire enquiry page | `PrivateHire.tsx` | ✅ | Mailto-fallback form; feature cards; routed `/private-hire`; linked from footer + FAQ |
| 21 | FAQ accordion section | `FAQ.tsx`, `Home.tsx` | ✅ | 7 Q&As; CSS max-height animation; added between Visit and ContactCTA |
| 22 | Instagram static grid | `InstagramGrid.tsx`, `Home.tsx` | ✅ | 9-photo grid; hover overlay; "Follow Us" CTA; added between Testimonials and Visit |
| 23 | Concept Strip `data-reveal` stagger | `Concept.tsx` | ✅ | Subtitle delay-1, heading delay-2, paragraph delay-3 |
| 24 | "Pause on hover" for ImageAutoSlider | `image-auto-slider.tsx` | ✅ | `animation-play-state: paused` on group hover; `prefers-reduced-motion` guard |
| 25 | "View Gallery" CTA on Gallery Strip | `GalleryStrip.tsx` | ✅ | Overlay fades in on strip hover; rose gradient button links to `/gallery` |
| 26 | Custom 404 page | `NotFound.tsx` | ✅ | Ghost "404" outline text; "You've Wandered Off the Menu"; Back to Home + phone CTAs |
| 27 | Deduplicate `InstagramIcon` / `FacebookIcon` | `social-icons.tsx` | ✅ | Single shared component; size prop; all three consumers updated |
| 28 | Extract `galleryData` to shared file | `src/data/galleryData.ts` | ⏭️ | Skipped — client still deciding between Gallery I and II |

---

## Phase 4 — SEO, Performance & Final QA ❌ PENDING

| # | Item | File | Notes |
|---|---|---|---|
| 29 | Compress + convert all images to WebP | `/brand-assets/` | Descriptive filenames for image SEO |
| 30 | `fetchpriority="high"` on hero image | `Hero.tsx` | LCP element — should load first |
| 31 | `prefers-reduced-motion` on testimonials | `Testimonials.tsx` | ✅ Done early (Phase 2 bonus) |
| 32 | `aria-labelledby` on mobile menu dialog | `Navbar.tsx` | Needs a visible heading inside the drawer |
| 33 | WCAG AA contrast review | Site-wide | Audit all text/background combinations |
| 34 | Alt text audit | Site-wide | ✅ Done (Phases 1 & 2) |
| 35 | Cookie consent banner | New component | Google Maps iframe + Google Fonts require this for UK/EU |
| 36 | Privacy Policy page | New page | Required for newsletter form |
| 37 | Final cross-browser + device QA | — | Chrome, Safari, Firefox; iOS Safari; Android Chrome |
| 38 | Lighthouse audit | — | Target: 90+ Performance, 100 Accessibility, 100 Best Practices, 90+ SEO |

---

## Missing Features — Still Pending

| Feature | Priority | Notes |
|---|---|---|
| Full Menu page (`/menu`) | High | Blocked — awaiting menu content from client |
| Booking / Reservation system | High | Currently using mailto CTA as minimum viable. Consider OpenTable/Resy when ready |
| Private hire enquiry page | High | Phase 3 |
| FAQ section | Medium | Phase 3 |
| Dietary / Allergen info | Medium | Goes with the /menu page |
| Events / Specials section | Medium | Phase 3+ |
| Instagram feed embed | Medium | Phase 3 |
| Google Reviews widget | Medium | Rating pill + "Read all" link added as minimum. Full widget is optional |
| Custom 404 page | Medium | Phase 3 |
| Cookie consent (GDPR) | Medium | Phase 4 |
| Privacy Policy page | Low | Phase 4 |
| Interior / atmosphere photos | Low | All 13 brand assets are food shots — client to supply |

---

*Phases 1, 2 & 3 complete. Begin Phase 4 (SEO, Performance & Final QA) when ready.*
