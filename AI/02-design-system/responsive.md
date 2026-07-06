# 📱 Responsive Design — Website UMPKU

## Tujuan Dokumen

Panduan responsive design untuk memastikan website tampil optimal di semua perangkat, dari smartphone 320px hingga monitor besar 1440px+.

---

## Prinsip Responsive

1. **Mobile-First** — Tulis CSS untuk mobile dahulu, tambahkan `min-width` untuk yang lebih besar
2. **Content-First** — Konten penting selalu terlihat di semua ukuran
3. **Touch-Friendly** — Target tap minimal 44×44px
4. **No Horizontal Scroll** — Tidak boleh ada overflow horizontal di mobile

---

## Breakpoint System

```css
/* ─── Breakpoints (Mobile First) ──────────── */

/* xs: 0 - 479px */
/* Default (no media query needed) */

/* sm: 480px+ */
@media (min-width: 480px) { }

/* md: 768px+ */
@media (min-width: 768px) { }

/* lg: 1024px+ */
@media (min-width: 1024px) { }

/* xl: 1280px+ */
@media (min-width: 1280px) { }

/* 2xl: 1440px+ */
@media (min-width: 1440px) { }
```

---

## Section Padding Responsif

```css
.section {
  padding: 60px 0;       /* Mobile default */
}

@media (min-width: 768px) {
  .section {
    padding: 80px 0;     /* Tablet */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: 120px 0;    /* Desktop */
  }
}
```

---

## Typography Responsif

Font heading menggunakan `clamp()` — otomatis responsif:

```css
h1 { font-size: clamp(40px, 8vw, 110px); }
h2 { font-size: clamp(32px, 5vw, 72px); }
h3 { font-size: clamp(24px, 3vw, 44px); }
h4 { font-size: clamp(18px, 2vw, 28px); }
```

Body text:

```css
body {
  font-size: 16px; /* Konsisten di semua breakpoint */
  line-height: 1.8;
}

@media (max-width: 767px) {
  .text-body-lg {
    font-size: 16px; /* Scale down pada mobile */
  }
}
```

---

## Grid Responsif

```css
/* 3 Kolom Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;           /* Mobile: 1 kolom */
  gap: 20px;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 kolom */
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 kolom */
    gap: 32px;
  }
}
```

---

## Navbar Responsif

```
Desktop (≥1024px):
- Logo kiri
- Menu horizontal tengah/kanan
- Bahasa + CTA paling kanan
- Tidak ada hamburger

Tablet (768px - 1023px):
- Logo kiri
- Hamburger kanan
- Menu di drawer/sidebar

Mobile (<768px):
- Logo kiri
- Hamburger kanan
- Full-screen overlay menu
```

---

## Hero Responsif

```css
.hero {
  min-height: 100svh; /* Mobile: safe viewport height */
  padding: 100px 0 60px; /* Accounting for navbar */
}

@media (min-width: 768px) {
  .hero {
    min-height: 90vh;
  }
}

@media (min-width: 1024px) {
  .hero {
    min-height: 100vh;
  }
}
```

---

## Image Responsif

```vue
<template>
  <!-- Gunakan object-fit untuk gambar yang crop dengan benar -->
  <div class="card__image-wrapper">
    <img
      :src="imageUrl"
      :alt="imageAlt"
      class="card__image"
      loading="lazy"
      width="400"
      height="300"
    />
  </div>
</template>

<style scoped>
.card__image-wrapper {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
```

---

## Touch Target Size

```css
/* Semua elemen interaktif minimal 44×44px */
.btn {
  min-height: 44px;
  padding: 12px 24px;
}

.nav-link {
  min-height: 44px;
  display: flex;
  align-items: center;
}

/* Mobile: tambah padding agar lebih mudah di-tap */
@media (max-width: 767px) {
  .btn {
    min-height: 48px;
    width: 100%; /* Full width buttons di mobile */
  }
}
```

---

## Tabel Responsif

```css
/* Tabel dengan horizontal scroll di mobile */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table {
  min-width: 600px; /* Paksa scroll daripada teks menyempit */
  width: 100%;
}
```

---

## Testing Checklist

```
[ ] 320px  — iPhone SE (paling kecil yang disupport)
[ ] 375px  — iPhone 12/13
[ ] 390px  — iPhone 14 Pro
[ ] 414px  — iPhone Plus models
[ ] 768px  — iPad portrait
[ ] 1024px — iPad landscape / Desktop kecil
[ ] 1280px — Laptop standar
[ ] 1440px — Desktop standar
[ ] 1920px — Large desktop

Cek di setiap breakpoint:
[ ] Tidak ada horizontal overflow
[ ] Teks terbaca (tidak terlalu kecil/besar)
[ ] Gambar tidak distorsi
[ ] Navigation accessible
[ ] CTA buttons visible dan tappable
[ ] Form dapat diisi dengan mudah
```

---

## Anti-Pattern Responsive

```
❌ Fixed width (width: 1200px) tanpa max-width
❌ overflow: hidden pada body/html (bisa hide scroll)
❌ Font size < 14px di mobile
❌ Tombol terlalu kecil (< 44px) di mobile
❌ Hover-only interaction (tanpa touch fallback)
❌ Tabel tanpa overflow-x:auto di mobile
❌ Gambar tanpa width/height attribute (CLS issue)
❌ Desktop-first media queries (max-width)
❌ vh tanpa svh fallback (iOS browser chrome issue)
```
