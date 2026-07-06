# 📱 Layout System — Website UMPKU

## Tujuan Dokumen

Mendefinisikan sistem layout: container, breakpoint, dan pola komposisi halaman. Semua layout harus konsisten mengikuti panduan ini.

---

## Container System

```css
:root {
  --container-max: 1440px;
  --container-padding-x: 60px;     /* Desktop */
  --container-padding-x-md: 40px;  /* Tablet */
  --container-padding-x-sm: 24px;  /* Mobile */
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding-x);
  padding-right: var(--container-padding-x);
}

@media (max-width: 1023px) {
  .container {
    padding-left: var(--container-padding-x-md);
    padding-right: var(--container-padding-x-md);
  }
}

@media (max-width: 767px) {
  .container {
    padding-left: var(--container-padding-x-sm);
    padding-right: var(--container-padding-x-sm);
  }
}
```

### Container Variants

```css
/* Container standar */
.container { max-width: 1440px; }

/* Container sempit — untuk teks editorial */
.container--narrow { max-width: 860px; }

/* Container sangat sempit — untuk form, quote */
.container--tight { max-width: 640px; }

/* Container full — tanpa max-width, hanya padding */
.container--full { max-width: none; }
```

---

## Breakpoint System

```css
:root {
  /* ─── Breakpoints ──────────────────────── */
  /* xs: 0 - 479px     → Smartphone kecil   */
  /* sm: 480 - 767px   → Smartphone besar   */
  /* md: 768 - 1023px  → Tablet             */
  /* lg: 1024 - 1279px → Desktop kecil      */
  /* xl: 1280 - 1439px → Desktop standar    */
  /* 2xl: 1440px+      → Desktop besar      */
}

/* Mobile-first media queries */
@media (min-width: 480px)  { /* sm  */ }
@media (min-width: 768px)  { /* md  */ }
@media (min-width: 1024px) { /* lg  */ }
@media (min-width: 1280px) { /* xl  */ }
@media (min-width: 1440px) { /* 2xl */ }
```

---

## Section Layout Patterns

### Pattern 1: Full-Width Hero

```
┌──────────────────────────────────────────────────┐
│  IMAGE/VIDEO BACKGROUND (100vw × 100vh)          │
│                                                  │
│  ┌────────────────── Container ────────────────┐ │
│  │                                             │ │
│  │  EYEBROW                                    │ │
│  │  H1 HEADLINE                                │ │
│  │  Subtitle                                   │ │
│  │  [CTA Button]                               │ │
│  │                                             │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Pattern 2: Split Layout (50/50)

```
┌──────────────────────────────────────────────────┐
│  ┌──────────── Container ─────────────────────┐  │
│  │ ┌────────────────┐ ┌──────────────────────┐│  │
│  │ │                │ │                      ││  │
│  │ │   TEXT COLUMN  │ │   IMAGE COLUMN       ││  │
│  │ │   (6 cols)     │ │   (6 cols)           ││  │
│  │ │                │ │                      ││  │
│  │ └────────────────┘ └──────────────────────┘│  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Pattern 3: Card Grid (3 Columns)

```
┌──────────────────────────────────────────────────┐
│  ┌──────────── Container ─────────────────────┐  │
│  │ ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │
│  │ │  CARD 1  │  │  CARD 2  │  │  CARD 3  │  │  │
│  │ │  (4 col) │  │  (4 col) │  │  (4 col) │  │  │
│  │ └──────────┘  └──────────┘  └──────────┘  │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Pattern 4: Featured + List (8/4)

```
┌──────────────────────────────────────────────────┐
│  ┌──────────── Container ─────────────────────┐  │
│  │ ┌──────────────────────┐  ┌──────────────┐ │  │
│  │ │                      │  │ ITEM 1       │ │  │
│  │ │   FEATURED (8 cols)  │  │──────────────│ │  │
│  │ │                      │  │ ITEM 2       │ │  │
│  │ │                      │  │──────────────│ │  │
│  │ └──────────────────────┘  │ ITEM 3       │ │  │
│  │                           └──────────────┘ │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## Layout CSS Implementation

```css
/* Grid utility */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap-grid);
}

/* Column spans */
.col-4  { grid-column: span 4; }
.col-6  { grid-column: span 6; }
.col-8  { grid-column: span 8; }
.col-12 { grid-column: span 12; }

/* Responsive column collapse */
@media (max-width: 767px) {
  .col-4, .col-6, .col-8 {
    grid-column: span 12; /* Full width mobile */
  }
}
```

---

## Section Anatomy

Setiap section mengikuti struktur ini:

```vue
<template>
  <section class="[name]-section">
    <div class="container">
      <!-- Section Header (optional) -->
      <div class="section-header">
        <span class="text-eyebrow">Label</span>
        <h2 class="text-h2">Section Title</h2>
        <p class="text-body section-header__desc">Description text</p>
      </div>

      <!-- Section Content -->
      <div class="[name]-section__content">
        <!-- Content here -->
      </div>

      <!-- Section Footer / CTA (optional) -->
      <div class="section-footer">
        <NuxtLink class="btn btn-primary" to="/page">
          Lihat Semua
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
```

---

## Z-Index Scale

```css
:root {
  --z-base:    0;
  --z-card:    10;
  --z-overlay: 100;
  --z-sticky:  200;
  --z-dropdown: 300;
  --z-modal:   400;
  --z-toast:   500;
}
```

---

## Anti-Pattern Layout

```
❌ Menggunakan px langsung untuk container padding
❌ Section tanpa container (konten menempel ke edge)
❌ max-width berbeda-beda antar halaman
❌ Menggunakan position:absolute sembarangan untuk layout
❌ Nested container (container di dalam container)
❌ Section padding kurang dari yang ditentukan di mobile
❌ Grid gap tidak konsisten
❌ Tidak ada vertical rhythm antar section
```
