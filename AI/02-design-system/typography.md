# 🔤 Typography System — Website UMPKU

## Tujuan Dokumen

Mendefinisikan sistem tipografi yang konsisten untuk seluruh website UMPKU. Setiap penggunaan teks harus mengikuti skala yang didefinisikan di sini.

---

## Font Family

```css
:root {
  --font-heading: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-fallback: system-ui, -apple-system, sans-serif;
}
```

### Sora — Font Heading

- **Karakter:** Geometric, modern, confident
- **Kegunaan:** H1, H2, H3, H4, display text, judul section
- **Weight:** 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Inter — Font Body

- **Karakter:** Humanist, highly readable, versatile
- **Kegunaan:** Body text, caption, label, form, navigation
- **Weight:** 300 (light), 400 (regular), 500 (medium), 600 (semibold)

---

## Type Scale (Skala Tipografi)

### Heading Scale

```css
:root {
  /* H1 — Hero/Page Title */
  --text-h1-size: clamp(54px, 8vw, 110px);
  --text-h1-line-height: 1.05;
  --text-h1-letter-spacing: -0.04em;
  --text-h1-weight: 700;
  --text-h1-font: var(--font-heading);

  /* H2 — Section Title */
  --text-h2-size: clamp(40px, 5vw, 72px);
  --text-h2-line-height: 1.1;
  --text-h2-letter-spacing: -0.03em;
  --text-h2-weight: 700;
  --text-h2-font: var(--font-heading);

  /* H3 — Subsection / Card Title */
  --text-h3-size: clamp(28px, 3vw, 44px);
  --text-h3-line-height: 1.2;
  --text-h3-letter-spacing: -0.02em;
  --text-h3-weight: 600;
  --text-h3-font: var(--font-heading);

  /* H4 — Component Title */
  --text-h4-size: clamp(20px, 2vw, 28px);
  --text-h4-line-height: 1.3;
  --text-h4-letter-spacing: -0.01em;
  --text-h4-weight: 600;
  --text-h4-font: var(--font-heading);
}
```

### Body Scale

```css
:root {
  /* Body Regular */
  --text-body-size: 16px;
  --text-body-line-height: 1.8;
  --text-body-weight: 400;
  --text-body-font: var(--font-body);

  /* Body Large */
  --text-body-lg-size: 18px;
  --text-body-lg-line-height: 1.75;
  --text-body-lg-weight: 400;

  /* Body Small / Caption */
  --text-small-size: 14px;
  --text-small-line-height: 1.6;
  --text-small-weight: 400;

  /* Label / Eyebrow */
  --text-label-size: 13px;
  --text-label-line-height: 1;
  --text-label-letter-spacing: 0.08em;
  --text-label-weight: 500;
  --text-label-transform: uppercase;
}
```

---

## CSS Classes Implementasi

```css
/* Heading Classes */
.text-h1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1-size);
  line-height: var(--text-h1-line-height);
  letter-spacing: var(--text-h1-letter-spacing);
  font-weight: var(--text-h1-weight);
}

.text-h2 {
  font-family: var(--font-heading);
  font-size: var(--text-h2-size);
  line-height: var(--text-h2-line-height);
  letter-spacing: var(--text-h2-letter-spacing);
  font-weight: var(--text-h2-weight);
}

.text-h3 {
  font-family: var(--font-heading);
  font-size: var(--text-h3-size);
  line-height: var(--text-h3-line-height);
  letter-spacing: var(--text-h3-letter-spacing);
  font-weight: var(--text-h3-weight);
}

/* Eyebrow / Label */
.text-eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-label-size);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  font-weight: var(--text-label-weight);
  text-transform: var(--text-label-transform);
  color: var(--color-accent);
}

/* Body */
.text-body { font-size: var(--text-body-size); line-height: var(--text-body-line-height); }
.text-body-lg { font-size: var(--text-body-lg-size); line-height: var(--text-body-lg-line-height); }
.text-small { font-size: var(--text-small-size); line-height: var(--text-small-line-height); }
```

---

## Pola Penggunaan (Usage Patterns)

### Hero Section

```vue
<template>
  <section class="hero">
    <!-- Eyebrow label (opsional) -->
    <span class="text-eyebrow">Universitas Muhammadiyah PKU Surakarta</span>

    <!-- H1 — Hanya satu per halaman -->
    <h1 class="text-h1">
      Membentuk Pemimpin<br>
      Masa Depan
    </h1>

    <!-- Subtitle / Lead -->
    <p class="text-body-lg hero__subtitle">
      Bergabunglah dengan komunitas akademik Islam yang dinamis,
      inovatif, dan berkarakter.
    </p>
  </section>
</template>
```

### Section dengan Eyebrow

```vue
<template>
  <section class="faculty-section">
    <div class="section-header">
      <span class="text-eyebrow">Akademik</span>
      <h2 class="text-h2">Fakultas Unggulan</h2>
      <p class="text-body">
        Temukan program studi yang sesuai dengan minat dan passionmu.
      </p>
    </div>
  </section>
</template>
```

---

## Responsive Typography

Gunakan `clamp()` untuk heading agar responsif tanpa media query tambahan:

```css
/* ✅ Responsive otomatis */
h1 { font-size: clamp(54px, 8vw, 110px); }
h2 { font-size: clamp(40px, 5vw, 72px); }
h3 { font-size: clamp(28px, 3vw, 44px); }

/* ❌ Fixed size — tidak responsif */
h1 { font-size: 96px; }
```

---

## Anti-Pattern Tipografi

```
❌ Menggunakan font selain Sora dan Inter
❌ Font size di bawah 13px untuk teks yang dibaca
❌ Line-height di bawah 1.5 untuk body text
❌ Letter-spacing positif pada heading besar
❌ ALL CAPS pada body text panjang
❌ Bold pada semua teks (loss of hierarchy)
❌ Lebih dari dua font weight per komponen
❌ Text-overflow tanpa ellipsis pada card title
❌ Hardcode font-size (harus gunakan variabel atau clamp)
```

---

## Aksesibilitas Tipografi

```css
/* Pastikan contrast ratio terpenuhi */
/* Teks gelap (#111111) pada background putih: ratio ~21:1 ✅ */
/* Teks muted (#666666) pada background putih: ratio ~5.7:1 ✅ */
/* Minimum untuk WCAG AA: 4.5:1 untuk normal text */

/* Minimum font size untuk keterbacaan */
body { font-size: 16px; } /* Jangan di bawah ini */
.text-small { font-size: 14px; } /* Minimum untuk secondary text */
.text-label { font-size: 13px; } /* Minimum absolute untuk labels */
```
