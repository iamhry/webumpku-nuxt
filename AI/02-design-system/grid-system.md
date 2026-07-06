# 📊 Grid System — Website UMPKU

## Tujuan Dokumen

Dokumentasi sistem grid 12 kolom yang digunakan di seluruh website. Grid adalah tulang punggung layout yang rapi dan konsisten.

---

## Spesifikasi Grid

| Properti | Nilai |
|----------|-------|
| **Kolom** | 12 |
| **Gap** | 32px |
| **Max Width** | 1440px |
| **Margin Horizontal** | 60px (desktop), 40px (tablet), 24px (mobile) |

---

## CSS Grid Implementation

```css
/* Base grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap-grid); /* 32px */
}

/* Column spans */
.col-1  { grid-column: span 1; }
.col-2  { grid-column: span 2; }
.col-3  { grid-column: span 3; }
.col-4  { grid-column: span 4; }
.col-5  { grid-column: span 5; }
.col-6  { grid-column: span 6; }
.col-7  { grid-column: span 7; }
.col-8  { grid-column: span 8; }
.col-9  { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Column offset */
.col-start-2  { grid-column-start: 2; }
.col-start-3  { grid-column-start: 3; }
.col-start-4  { grid-column-start: 4; }
```

---

## Pola Grid per Komponen

### Hero (Full Width)

```css
.hero-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap-grid);
  align-items: center;
  min-height: 100vh;
}

.hero-grid__content {
  grid-column: 1 / 8; /* 7 kolom */
}

.hero-grid__media {
  grid-column: 8 / 13; /* 5 kolom */
}

@media (max-width: 1023px) {
  .hero-grid__content,
  .hero-grid__media {
    grid-column: 1 / 13; /* Full width tablet */
  }
}
```

### Card Grid 3 Kolom

```css
.card-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-card); /* 24px */
}

@media (max-width: 1023px) {
  .card-grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .card-grid-3 {
    grid-template-columns: 1fr;
  }
}
```

### Card Grid 4 Kolom

```css
.card-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-card);
}

@media (max-width: 1023px) {
  .card-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 479px) {
  .card-grid-4 {
    grid-template-columns: 1fr;
  }
}
```

### Split Layout (Content + Image)

```css
/* 60/40 split */
.split-layout {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: var(--gap-grid);
  align-items: center;
}

/* 50/50 split */
.split-layout--equal {
  grid-template-columns: 1fr 1fr;
}

/* Reverse (image left, text right) */
.split-layout--reverse {
  direction: rtl;
}
.split-layout--reverse > * {
  direction: ltr;
}

@media (max-width: 767px) {
  .split-layout,
  .split-layout--equal {
    grid-template-columns: 1fr;
  }
}
```

### Featured + Sidebar

```css
/* 8/4 split */
.featured-layout {
  display: grid;
  grid-template-columns: 8fr 4fr;
  gap: var(--gap-grid);
}

@media (max-width: 1023px) {
  .featured-layout {
    grid-template-columns: 1fr;
  }
}
```

---

## Pola Layout per Halaman

| Halaman | Pola Grid Utama |
|---------|----------------|
| Homepage | Full-width hero + 3 col cards |
| Berita | 8/4 featured + list + sidebar |
| Fakultas | 3 atau 4 col cards |
| Program Studi | 3 col cards |
| Detail Berita | Narrow container + sidebar |
| Kontak | 7/5 form + info |
| Tentang | Split layout berbagai kombinasi |

---

## Anti-Pattern Grid

```
❌ Grid kurang dari 12 kolom (kehilangan fleksibilitas)
❌ Gap tidak konsisten dalam satu halaman
❌ Nested grid lebih dari 2 level (gunakan flexbox untuk inner layout)
❌ Hardcode pixel untuk grid column
❌ Grid yang tidak collapse di mobile
❌ Menggunakan float untuk layout (legacy, jangan dipakai)
❌ Bootstrap col-* digunakan di luar komponen yang sudah ada
```
