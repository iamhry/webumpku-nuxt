# 📐 Spacing System — Website UMPKU

## Tujuan Dokumen

Mendefinisikan sistem spacing yang konsisten untuk margin, padding, gap, dan semua jarak antar elemen. Konsistensi spacing adalah kunci tampilan yang profesional.

---

## Prinsip Spacing

1. **8px Grid** — Semua nilai spacing adalah kelipatan 8
2. **Consistent** — Gunakan variabel, bukan nilai random
3. **Purposeful** — Spacing yang lebih besar = hierarki lebih tinggi
4. **Responsive** — Section padding berkurang di layar kecil

---

## Base Spacing Scale

```css
:root {
  /* ─── Base Unit ─────────────────────────── */
  --space-1:  4px;    /* 0.25rem */
  --space-2:  8px;    /* 0.5rem  */
  --space-3:  12px;   /* 0.75rem */
  --space-4:  16px;   /* 1rem    */
  --space-5:  20px;   /* 1.25rem */
  --space-6:  24px;   /* 1.5rem  */
  --space-8:  32px;   /* 2rem    */
  --space-10: 40px;   /* 2.5rem  */
  --space-12: 48px;   /* 3rem    */
  --space-16: 64px;   /* 4rem    */
  --space-20: 80px;   /* 5rem    */
  --space-24: 96px;   /* 6rem    */
  --space-30: 120px;  /* 7.5rem  */
}
```

---

## Section Padding

Section padding adalah spacing terpenting karena mendefinisikan "napas" halaman.

```css
:root {
  /* Desktop (≥1024px) */
  --section-padding-y: 120px;

  /* Tablet (768px - 1023px) */
  --section-padding-y-md: 80px;

  /* Mobile (<768px) */
  --section-padding-y-sm: 60px;
}

/* ─── Implementasi ────────────────── */
.section {
  padding: var(--section-padding-y) 0;
}

@media (max-width: 1023px) {
  .section {
    padding: var(--section-padding-y-md) 0;
  }
}

@media (max-width: 767px) {
  .section {
    padding: var(--section-padding-y-sm) 0;
  }
}
```

---

## Component Spacing

### Card Internal Spacing

```css
.card {
  padding: var(--space-10);   /* 40px desktop */
}

@media (max-width: 767px) {
  .card {
    padding: var(--space-6);  /* 24px mobile */
  }
}
```

### Section Header Spacing

```css
.section-header {
  margin-bottom: var(--space-16); /* 64px sebelum konten */
}

@media (max-width: 767px) {
  .section-header {
    margin-bottom: var(--space-10); /* 40px mobile */
  }
}
```

### Stack Spacing (Vertical Rhythm)

```css
/* Jarak antar elemen dalam komponen */
.section-header .text-eyebrow {
  margin-bottom: var(--space-3);   /* 12px → eyebrow ke heading */
}

.section-header .text-h2 {
  margin-bottom: var(--space-6);   /* 24px → heading ke deskripsi */
}

.section-header .text-body {
  margin-bottom: 0;
}
```

---

## Gap System (Flexbox & Grid)

```css
:root {
  /* Grid gaps */
  --gap-grid:   32px;  /* Gap utama grid 12 kolom */
  --gap-card:   24px;  /* Gap antar card */
  --gap-tight:  16px;  /* Gap elemen dalam card */
  --gap-loose:  48px;  /* Gap untuk section grid jarang */
}

/* Implementasi */
.card-grid {
  display: grid;
  gap: var(--gap-card); /* 24px */
}

.main-grid {
  display: grid;
  gap: var(--gap-grid); /* 32px */
}
```

---

## Spacing Antar Elemen (Component Gap)

| Elemen | Spacing | Nilai |
|--------|---------|-------|
| Eyebrow → Heading | margin-bottom | 12px |
| Heading → Subheading | margin-bottom | 16px |
| Heading → Body text | margin-bottom | 24px |
| Body → CTA button | margin-top | 40px |
| Section header → Content | margin-bottom | 64px |
| Card → Card (grid) | gap | 24-32px |
| Section → Section | (handled by section padding) | - |

---

## Anti-Pattern Spacing

```
❌ Nilai spacing random: 13px, 17px, 23px
❌ Menggunakan pixel langsung tanpa variabel: margin: 120px 0
❌ Section padding terlalu kecil: < 60px (mobile)
❌ Tidak ada whitespace antar section (padding: 0)
❌ Card terlalu rapat (padding < 20px)
❌ Gap grid tidak konsisten antar halaman
❌ Margin negatif sembarangan (hanya jika ada alasan jelas)
```

---

## Spacing di Vue Component

```vue
<style scoped>
/* ✅ Benar — gunakan variabel */
.news-section {
  padding: var(--section-padding-y) 0;
}

.news-section__header {
  margin-bottom: var(--space-16);
}

.news-grid {
  display: grid;
  gap: var(--gap-card);
}

/* ❌ Salah — hardcode */
.news-section {
  padding: 120px 0;
}

.news-section__header {
  margin-bottom: 64px;
}
</style>
```
