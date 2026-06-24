# Ooh La La Brasserie — New Website Plan

## Context
The client has an existing basic website (oohlalabrasserie.com) that needs a complete redesign. The goal is a modern, warm, premium website taking layout/atmosphere inspiration from decafes.nl while applying the Ooh La La brand identity (pink/magenta logo, French café positioning, Enfield North London).

The CircularGallery React component requires a **Vite + React + TypeScript + Tailwind + shadcn/ui** project — this supersedes the original single `index.html` approach.

**Navigation (5 items):** About · Menu · Gallery · Visit · Contact

**Brand assets available locally:**
- `Brand Assets/Ohh La la logo.webp` — 1500×260px pink/magenta script wordmark
- `www.decafes.nl_.png` + `www.decafes.nl_ (5).png` — design reference screenshots

---

## Step 0 — Project Scaffold

The existing directory has only `serve.mjs`, `screenshot.mjs`, and `package.json` (puppeteer only). A full React project needs to be scaffolded **in the same directory**.

```bash
# 1. Scaffold Vite React TS project (into current dir)
npm create vite@latest . -- --template react-ts

# 2. Install dependencies
npm install

# 3. Install Tailwind CSS v3 + PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Install shadcn/ui CLI and init
npx shadcn@latest init
# → choose: TypeScript, Default style, CSS variables, src/app, etc.

# 5. Install React Router for multi-page navigation
npm install react-router-dom
```

**shadcn init choices:**
- Style: Default
- Base color: derived (we override with brand tokens)
- CSS variables: Yes
- Components path: `src/components/ui` (default — correct)

---

## Step 1 — Project Structure

```
src/
  components/
    ui/
      circular-gallery.tsx    ← paste provided component here
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Concept.tsx
      About.tsx
      MenuPreview.tsx
      Visit.tsx
      ContactCTA.tsx
  pages/
    Home.tsx                  ← all sections except Gallery
    Gallery.tsx               ← CircularGallery full-page demo
  App.tsx                     ← React Router routes
  main.tsx
  index.css                   ← Tailwind directives + CSS vars
```

---

## Step 2 — Design System (Tailwind Config)

File: `tailwind.config.ts`

```ts
colors: {
  rose:     { DEFAULT: '#C8476A', dark: '#A33558', light: '#D97090' },
  cream:    { DEFAULT: '#FAF6F1', dark: '#F0E9DF' },
  charcoal: { DEFAULT: '#1C1B19', light: '#2E2C29' },
  gold:     { DEFAULT: '#C9A96E', light: '#DEC48D' },
},
fontFamily: {
  display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
  body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
},
```

**Google Fonts** loaded via `<link>` in `index.html`:
- `Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,400`
- `DM+Sans:wght@300;400;500`

**shadcn CSS variables** in `index.css` mapped to brand tokens:
```css
:root {
  --background: #FAF6F1;
  --foreground: #1C1B19;
  --primary: #C8476A;
  --muted: #F0E9DF;
  --card: rgba(28,27,25,0.7);
  --border: rgba(200,71,106,0.2);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Step 3 — Routing (App.tsx)

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

---

## Step 4 — Navbar Component

- Logo (left): `<img src="/brand-assets/logo.webp" />` (copy logo to `public/brand-assets/`)
- Desktop links (right): About · Menu · Gallery · Visit · Contact — using `<NavLink>` from react-router-dom
- About / Menu / Visit / Contact → `/#about`, `/#menu`, `/#visit`, `/#contact` (hash anchors on Home)
- Gallery → `/gallery` (separate route)
- Transparent on hero; `scrolled` class adds `backdrop-blur + bg-charcoal/85` via `useEffect` scroll listener
- Mobile: hamburger → full-screen dark drawer, `aria-expanded`, Escape closes, focus trap
- All touch targets ≥ 44×44px

---

## Step 5 — Home Page Sections

### Hero
- Full-bleed background image (Unsplash café: `https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1440`)
- `bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent` overlay
- Rose tint: `bg-rose/8 mix-blend-multiply`
- Gold italic: *"Your neighbourhood brasserie"*
- H1: `OOH LA LA` — `clamp(4rem,10vw,9rem)`, uppercase, Cormorant Bold
- Tagline: `BREAKFAST · BRUNCH · LUNCH · COFFEE · COCKTAILS`
- CTAs: "View Menu" (rose pill) + "Find Us" (ghost border)
- Scroll-reveal via IntersectionObserver (never fires on load)

### Concept Strip
- Dark bg + grain + dual radial glow (rose + gold)
- `"Parisian Charm Meets North London Soul"` — large centered heading
- One paragraph of positioning copy

### About `id="about"`
- 2-col: story text (left) + image (right)
- Image: Unsplash café interior with rose tint overlay + decorative offset border frame

### Menu Preview `id="menu"`
- 5 cards: Breakfast · Brunch · Lunch · Coffee · Cocktails
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`
- Each: `aspect-[3/4]`, gradient overlay, hover `translateY(-6px) scale(1.015)` spring
- PDF download CTA below

### Visit `id="visit"`
- 3-col: Opening Hours · Location · Get in Touch
- Hours: Mon–Sun 8am–5pm
- Address: 238 Hertford Road, Enfield EN3 5BL + "Get Directions →"
- Phone: 020 8374 5097 · Email: info@oohlalabrasserie.com

### Contact CTA `id="contact"`
- Full-bleed dark + grain + dual radial glow
- `"Come Find Us"` large heading
- Instagram + Facebook circular icon buttons (lucide-react `Instagram` + `Facebook` icons)
- "Send Us a Message" mailto CTA

---

## Step 6 — Gallery Page (`/gallery`)

File: `src/pages/Gallery.tsx`

Adapt the provided demo with **café/brasserie Unsplash imagery** instead of animals:

```tsx
const galleryData: GalleryItem[] = [
  { common: 'Morning Coffee',   binomial: 'Espresso & Latte Art',   photo: { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900', text: 'latte art closeup', by: 'Unsplash' } },
  { common: 'Soufflé Pancakes', binomial: 'Signature Brunch',       photo: { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900', text: 'fluffy pancakes', by: 'Unsplash' } },
  { common: 'The Interior',     binomial: 'Warm Atmosphere',        photo: { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900', text: 'café interior', by: 'Unsplash' } },
  { common: 'Cocktail Hour',    binomial: 'Evening Selection',      photo: { url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900', text: 'cocktails on bar', by: 'Unsplash' } },
  { common: 'Brunch Table',     binomial: 'Weekend Ritual',         photo: { url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=900', text: 'brunch spread', by: 'Unsplash' } },
  { common: 'Avocado Toast',    binomial: 'All-Day Brunch',         photo: { url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900', text: 'avocado toast', by: 'Unsplash' } },
  { common: 'Fresh Pastries',   binomial: 'Morning Bakes',          photo: { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900', text: 'croissants and pastries', by: 'Unsplash' } },
  { common: 'Garden Terrace',   binomial: 'Al Fresco Dining',       photo: { url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=900', text: 'outdoor café seating', by: 'Unsplash' } },
];
```

Page wrapper matches the demo structure (sticky scroll-driven rotation):
```tsx
export default function Gallery() {
  return (
    <div className="w-full bg-charcoal text-cream" style={{ height: '500vh' }}>
      {/* Section header — absolute positioned above gallery */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center absolute top-24 z-10">
          <span className="font-body text-rose text-sm tracking-[0.2em] uppercase">Our Space</span>
          <h1 className="font-display font-bold uppercase text-cream text-5xl md:text-7xl leading-[0.92] tracking-tightest mt-3">
            Gallery
          </h1>
          <p className="font-body text-cream/50 mt-4">Scroll to explore</p>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} radius={600} autoRotateSpeed={0.02} />
        </div>
      </div>
    </div>
  );
}
```

---

## Step 7 — circular-gallery.tsx Placement

Copy the provided component verbatim to `src/components/ui/circular-gallery.tsx`.

**No modifications needed** — the component is self-contained. The shadcn `cn` utility is already inline in the component (no external import needed).

**shadcn CSS variable mapping** (already set in Step 2):
- `border-border` → maps to `rgba(200,71,106,0.2)`
- `bg-card/70` → maps to `rgba(28,27,25,0.7)` — gives the dark glass card look

---

## Step 8 — Scroll Reveal System

Custom hook `src/hooks/useScrollReveal.ts`:
```ts
// Attaches IntersectionObserver to [data-reveal] elements
// Adds 'revealed' class on entry — fires once per element
```

CSS in `index.css`:
```css
[data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out); }
[data-reveal].revealed { opacity: 1; transform: translateY(0); }
```

---

## Step 9 — Accessibility & Quality
- WCAG AA: `#FAF6F1` on `#1C1B19` = 17.5:1 · `#C8476A` on `#FAF6F1` = 4.7:1
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>`
- `focus-visible:ring-2 ring-rose` on all interactive elements
- All touch targets ≥ 44×44px
- Images: descriptive `alt` text, decorative images `alt=""`

---

## Critical Files

| File | Action |
|---|---|
| `src/components/ui/circular-gallery.tsx` | **Create** — paste provided component |
| `src/pages/Gallery.tsx` | **Create** — circular gallery page |
| `src/pages/Home.tsx` | **Create** — all home sections |
| `src/components/layout/Navbar.tsx` | **Create** |
| `src/components/layout/Footer.tsx` | **Create** |
| `src/App.tsx` | **Create** — router |
| `src/index.css` | **Edit** — brand CSS vars + Tailwind |
| `tailwind.config.ts` | **Edit** — brand tokens |
| `index.html` | **Edit** — Google Fonts link tags |
| `public/brand-assets/logo.webp` | **Copy** from `Brand Assets/Ohh La la logo.webp` |

---

## Verification
1. `npm run dev` — Vite dev server at `http://localhost:5173` (or update `serve.mjs` port)
2. Desktop screenshot: `node screenshot.mjs http://localhost:5173 desktop`
3. Mobile screenshot: `node screenshot.mjs http://localhost:5173 mobile`
4. Navigate to `/gallery` — verify 3D circular gallery rotates on scroll
5. Minimum 2 comparison rounds per page; stop only when no visible differences remain
