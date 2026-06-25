# Ooh La La Brasserie — Website Menu Brand Guidelines

## Purpose

Use this document as the **single design reference** for the Ooh La La website menu section.

The website menu must reflect the brand shown in the printed menu and the approved dark menu-screen design:

- **Warm, stylish, playful London brasserie**
- Feminine and premium, but not overly luxury or formal
- Modern and digital-friendly, not a generic restaurant template
- Dark evening ambience balanced with soft pink handwritten personality
- Easy to scan, especially on mobile

> **Primary website visual reference:** the dark menu screenshot.  
> **Brand personality reference:** the printed menu PDF.

---

## 1. Core Brand Personality

The visual style should feel like:

- A warm espresso-toned café / cocktail bar in the evening
- Soft pink neon-style branding and handwritten accents
- A contemporary London brunch and dining destination
- Friendly and expressive, but still polished
- Premium through detail, typography, spacing and restraint — not through excessive gold, shadows or effects

### Avoid

Do **not** create a generic food-delivery layout, a corporate menu system or a heavy nightclub aesthetic.

Avoid:

- Pure black backgrounds
- Cold grey surfaces
- Bright gradients
- Full-card food photography
- Heavy drop shadows
- Large glowing elements everywhere
- Too many icons
- Overly rounded, oversized UI components
- Bright white borders
- Excessive pink across every element
- Serif typography inside menu cards
- Large empty gaps between menu sections

---

## 2. Colour System

### Primary Website Palette

```css
:root {
  /* Main dark interface */
  --bg-main: #1C1B19;
  --bg-card: #2E2C29;
  --bg-card-hover: #34312D;
  --border-subtle: #453E33;

  /* Typography */
  --text-primary: #FAF6F1;
  --text-secondary: #AAA6A1;
  --text-muted: #7E7973;

  /* Ooh La La brand accents */
  --brand-pink: #C8476A;
  --brand-pink-light: #E788B0;
  --price-gold: #C9A96E;

  /* Dietary labels */
  --dietary-green: #419273;
  --dietary-green-text: #BDEBD6;

  /* Printed-menu / light-mode reference */
  --paper-cream: #ECEBE6;
  --ink-black: #1A1A18;
}
```

### Colour Usage Rules

| Element | Recommended colour |
|---|---|
| Main page background | `#1C1B19` |
| Menu card background | `#2E2C29` |
| Card border / divider | `#453E33` |
| Dish names / key headings | `#FAF6F1` |
| Descriptions | `#AAA6A1` |
| Secondary / muted text | `#7E7973` |
| Selected tabs, active states, search focus | `#C8476A` |
| Handwritten display headings | `#E788B0` or `#C8476A` |
| Prices | `#C9A96E` |
| Vegetarian / vegan labels | green only |

### Important Rules

- Pink is an **accent**, not the default text colour.
- Gold is reserved primarily for **prices** and very small premium details.
- Use cream rather than pure white for headings and main text.
- All borders should be subtle, warm and low-contrast.
- Avoid blue, purple and cold neutral tones.

---

## 3. Typography

### A. Brand / Display Typeface

Use a handwritten brush-script font only for:

- The Ooh La La wordmark
- Major page headings
- Large category section headings
- Decorative short messages

Suggested web-friendly options:

```css
font-family: "Caveat", "Kalam", cursive;
font-weight: 700;
letter-spacing: 0.04em;
text-transform: uppercase;
```

Use pink for this typography.

> Do not use the handwritten font for dish names, descriptions, filter buttons, prices, navigation or body copy.

### B. Interface / Menu Typeface

Use a clean, modern sans-serif for the functional website UI.

Preferred order:

```css
font-family: "Manrope", "Inter", sans-serif;
```

Use this for:

- Dish names
- Prices
- Ingredient descriptions
- Search
- Category chips
- Filter controls
- Dietary labels
- Buttons
- Navigation

### C. Typography Hierarchy

```css
/* Major menu page / section heading */
font-family: "Caveat", "Kalam", cursive;
font-size: clamp(2rem, 4vw, 3.5rem);
font-weight: 700;
line-height: 0.95;
letter-spacing: 0.04em;
text-transform: uppercase;

/* Dish title */
font-family: "Manrope", "Inter", sans-serif;
font-size: 16px;
line-height: 1.3;
font-weight: 700;

/* Price */
font-family: "Manrope", "Inter", sans-serif;
font-size: 18px;
line-height: 1.2;
font-weight: 700;

/* Dish description */
font-family: "Manrope", "Inter", sans-serif;
font-size: 14px;
line-height: 1.55;
font-weight: 400;

/* Halal / dietary note */
font-family: "Manrope", "Inter", sans-serif;
font-size: 12px;
line-height: 1.4;
font-style: italic;

/* Category chips / navigation */
font-family: "Manrope", "Inter", sans-serif;
font-size: 14px;
font-weight: 600;
```

---

## 4. Page Structure

The menu should have a clear, scan-friendly hierarchy.

### Level 1: Main Menu Areas

Use a visually prominent but compact navigation for:

- Food
- Hot Drinks
- Cold Drinks
- Cocktails & Bar

### Level 2: Food Categories

When “Food” is selected, show horizontally scrollable category chips such as:

- Breakfast
- Brunch
- La La Bites
- Signature
- Omelettes
- Ooh La La Pancakes
- Salads
- Sandwiches
- Burgers
- Mains
- Pasta
- Seafood
- Kids
- Extra Sides

### Level 3: Menu Item Cards

Each selected category displays food and drink cards in a responsive grid.

---

## 5. Navigation and Category Chips

### Main Navigation

Use pill-shaped controls.

```css
.menu-primary-tab {
  height: 48px;
  padding: 0 18px;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary);
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
}
```

### Active Main Navigation Tab

```css
.menu-primary-tab.is-active {
  background: var(--brand-pink);
  border-color: var(--brand-pink);
  color: var(--text-primary);
}
```

### Secondary Category Chips

```css
.menu-category-chip {
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary);
  white-space: nowrap;
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
}
```

### Active Category Chip

```css
.menu-category-chip.is-active {
  background: var(--brand-pink);
  border-color: var(--brand-pink);
  color: var(--text-primary);
}
```

### Mobile Rule

Category chips must be horizontally scrollable on mobile.

```css
.menu-category-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;
}

.menu-category-scroll::-webkit-scrollbar {
  display: none;
}
```

Do not wrap category chips into multiple untidy rows.

---

## 6. Search and Dietary Filters

### Search Field

The search should be compact, rounded and elegant.

```css
.menu-search {
  height: 52px;
  min-width: 230px;
  padding: 0 18px;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-primary);
  outline: none;
}
```

### Search Focus State

```css
.menu-search:focus {
  border-color: var(--brand-pink);
  box-shadow: 0 0 0 3px rgba(200, 71, 106, 0.16);
}
```

### Filter Buttons

Use compact, circular controls for filters such as vegetarian and vegan.

```css
.menu-filter-button {
  width: 48px;
  height: 48px;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary);
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 13px;
  font-weight: 700;
}
```

Do not make filters look like large CTA buttons.

---

## 7. Menu Card Design

### Card Layout

```css
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.menu-card {
  display: flex;
  flex-direction: column;
  min-height: 156px;
  padding: 22px;
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  background: var(--bg-card);
}
```

### Responsive Grid

```css
@media (max-width: 1024px) {
  .menu-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .menu-card {
    min-height: auto;
    padding: 18px;
  }
}
```

### Card Content Structure

Every dish card must use the same hierarchy:

```text
Dish name                                      Price
Short ingredient description across 1–3 lines

Optional halal note or dietary label
```

### Card Header

```css
.menu-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.menu-card-title {
  color: var(--text-primary);
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.menu-card-price {
  flex: 0 0 auto;
  color: var(--price-gold);
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}
```

### Description

```css
.menu-card-description {
  margin-top: 14px;
  color: var(--text-secondary);
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.55;
}
```

### Supporting Note

```css
.menu-card-note {
  margin-top: auto;
  padding-top: 14px;
  color: var(--text-muted);
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 12px;
  font-style: italic;
}
```

---

## 8. Dietary Labels

Use compact labels only where needed.

```css
.dietary-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  padding: 3px 6px;
  border: 1px solid rgba(65, 146, 115, 0.55);
  border-radius: 4px;
  background: rgba(65, 146, 115, 0.18);
  color: var(--dietary-green-text);
  font-family: "Manrope", "Inter", sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
}
```

Supported labels:

- `V` = Vegetarian
- `VF` = Vegan friendly

Do not use oversized colourful badges, illustrations or emoji for dietary tags.

---

## 9. Interaction and Hover States

Interactions should be subtle and premium.

```css
.menu-card,
.menu-category-chip,
.menu-primary-tab,
.menu-filter-button {
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease;
}
```

### Card Hover

```css
.menu-card:hover {
  transform: translateY(-2px);
  border-color: rgba(200, 71, 106, 0.65);
  background: var(--bg-card-hover);
}
```

### Chip / Filter Hover

```css
.menu-category-chip:hover,
.menu-primary-tab:hover,
.menu-filter-button:hover {
  border-color: rgba(200, 71, 106, 0.65);
  color: var(--text-primary);
}
```

### Important Interaction Rules

- No bounce animations.
- No large scaling.
- No flashy neon effect on every component.
- A pink glow may be used very lightly for the active search state or logo area only.
- Hover lift should never exceed `2px`.

---

## 10. Spacing and Layout Rules

### Main Menu Container

```css
.menu-container {
  width: min(1240px, 100%);
  margin: 0 auto;
  padding: 28px 24px 72px;
}
```

### Spacing

Use a compact, refined spacing rhythm:

- Main navigation to category navigation: `20px`
- Category navigation to menu grid: `16px–24px`
- Grid gap desktop: `18px`
- Grid gap mobile: `14px`
- Card padding desktop: `22px`
- Card padding mobile: `18px`

### Do Not

- Leave huge vertical blank areas.
- Make cards too tall when a menu item has a short description.
- Place important menu content too close to the edge on mobile.
- Force desktop spacing onto mobile layouts.

---

## 11. Mobile-First Requirements

On mobile:

- Menu cards are one column.
- Category chips scroll horizontally.
- Search field should take full available width where possible.
- Filters should remain compact next to or below search.
- Dish name and price must remain readable without overlapping.
- Keep at least 16px page-side padding.
- Do not create large empty spaces between category controls and menu cards.
- Ensure active selected chips are clearly visible.

Suggested mobile structure:

```text
Page heading
Main category pills (horizontal scroll)
Search and dietary filters
Secondary category chips (horizontal scroll)
Single-column menu cards
```

---

## 12. Implementation Checklist

Before considering the menu section complete, confirm:

- [ ] Background is warm espresso, not pure black.
- [ ] Cards use warm dark brown-grey, not cold charcoal.
- [ ] The active category uses Ooh La La pink.
- [ ] Prices use muted gold.
- [ ] Main UI uses Manrope or Inter.
- [ ] Handwritten pink font is used only for display headings and logo accents.
- [ ] Cards have subtle borders and no heavy shadow.
- [ ] Food cards do not rely on images.
- [ ] Dietary labels are compact green tags.
- [ ] Desktop uses a three-column card grid.
- [ ] Tablet uses two columns.
- [ ] Mobile uses one column.
- [ ] Category chips scroll horizontally on mobile.
- [ ] Menu remains compact with no excessive blank gaps.
- [ ] Hover effects are minimal and polished.
- [ ] Search focus uses a restrained pink border/glow.
- [ ] All content has enough contrast for comfortable reading.

---

## 13. Claude Code Direction

When building or updating the menu section:

> Treat this document as the required design system. Match the dark Ooh La La menu style: espresso background, warm dark cards, cream typography, muted description text, pink active states, gold prices and compact green dietary badges. Use a modern sans-serif for menu UI and cards, with handwritten pink typography only for display headings. The result should feel like a polished London brasserie menu, not a generic restaurant template.

