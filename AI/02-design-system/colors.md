# 🎨 Color System — Website UMPKU

## Tujuan Dokumen

Mendefinisikan palet warna resmi website UMPKU. Semua penggunaan warna HARUS menggunakan CSS custom properties yang didefinisikan di sini.

---

## Prinsip Warna

1. **Minimal** — Maksimal 3 warna berbeda per section
2. **Purposeful** — Setiap warna punya fungsi, bukan sekadar dekorasi
3. **Accessible** — Semua kombinasi text/background memenuhi WCAG AA
4. **Consistent** — Variabel CSS, tidak boleh hardcode hex

---

## Palet Utama

```css
:root {
  /* ─── Neutral ──────────────────────────── */
  --color-white:      #FFFFFF;
  --color-background: #FFFFFF;
  --color-surface:    #F8F8F8;   /* Subtle background untuk card */
  --color-border:     #ECECEC;   /* Garis pemisah, outline */

  /* ─── Text ─────────────────────────────── */
  --color-text:       #111111;   /* Primary text */
  --color-text-muted: #666666;   /* Secondary, caption, meta */
  --color-text-light: #999999;   /* Placeholder, disabled */

  /* ─── Accent (UMPKU Brand) ──────────────── */
  --color-accent:     #1A4D8F;   /* Biru UMPKU — primary brand */
  --color-accent-dark: #0F3060;  /* Hover/active state */
  --color-accent-light: #E8F0FB; /* Subtle accent background */

  /* ─── Secondary Accent ──────────────────── */
  --color-secondary:  #C8962A;   /* Gold — untuk highlight & aksen */
  --color-secondary-dark: #A67A1E;
  --color-secondary-light: #FBF3E0;

  /* ─── Semantic ──────────────────────────── */
  --color-success:    #22C55E;
  --color-warning:    #F59E0B;
  --color-error:      #EF4444;
  --color-info:       #3B82F6;

  /* ─── Overlay ───────────────────────────── */
  --color-overlay-dark:  rgba(0, 0, 0, 0.6);
  --color-overlay-light: rgba(255, 255, 255, 0.9);
  --color-overlay-accent: rgba(26, 77, 143, 0.85);
}
```

---

## Penggunaan Warna per Konteks

### Background Colors

```css
/* Halaman/Section utama */
.section            { background-color: var(--color-background); }

/* Section alternatif (zebra pattern) */
.section--alt       { background-color: var(--color-surface); }

/* Section dengan brand color */
.section--accent    { background-color: var(--color-accent); }
.section--dark      { background-color: #0A1628; }

/* Card background */
.card               { background-color: var(--color-white); }
.card--surface      { background-color: var(--color-surface); }
```

### Text Colors

```css
/* Teks utama */
.text-primary   { color: var(--color-text); }

/* Teks sekunder/deskripsi */
.text-muted     { color: var(--color-text-muted); }

/* Teks pada background gelap */
.text-on-dark   { color: var(--color-white); }

/* Accent text (link, label) */
.text-accent    { color: var(--color-accent); }

/* Gold highlight */
.text-gold      { color: var(--color-secondary); }
```

### Border Colors

```css
.border-default { border-color: var(--color-border); }
.border-accent  { border-color: var(--color-accent); }
```

---

## Pola Kombinasi Warna

### Section Terang (Default)

```
Background: #FFFFFF
Text: #111111
Heading: #111111
Muted: #666666
Accent: #1A4D8F
```

### Section Abu (Surface)

```
Background: #F8F8F8
Text: #111111
Heading: #111111
Border: #ECECEC
```

### Section Gelap (Dark Mode)

```
Background: #0A1628
Text: #FFFFFF
Muted: rgba(255,255,255,0.7)
Accent: #C8962A (gold lebih cocok di dark bg)
```

### Section Brand Biru

```
Background: #1A4D8F
Text: #FFFFFF
Muted: rgba(255,255,255,0.75)
CTA: #C8962A (gold untuk kontras)
```

---

## Gradient System

```css
:root {
  /* Hero gradient overlay */
  --gradient-hero: linear-gradient(
    160deg,
    rgba(26, 77, 143, 0.95) 0%,
    rgba(10, 22, 40, 0.85) 100%
  );

  /* Subtle section gradient */
  --gradient-subtle: linear-gradient(
    180deg,
    var(--color-surface) 0%,
    var(--color-white) 100%
  );

  /* Accent gradient */
  --gradient-accent: linear-gradient(
    135deg,
    var(--color-accent) 0%,
    #2563EB 100%
  );

  /* Gold gradient */
  --gradient-gold: linear-gradient(
    135deg,
    #C8962A 0%,
    #E8B84B 100%
  );
}
```

---

## Contrast Ratio Reference

| Kombinasi | Ratio | WCAG Level |
|-----------|-------|-----------|
| #111111 on #FFFFFF | 21:1 | ✅ AAA |
| #666666 on #FFFFFF | 5.7:1 | ✅ AA |
| #FFFFFF on #1A4D8F | 8.1:1 | ✅ AAA |
| #FFFFFF on #0A1628 | 18.8:1 | ✅ AAA |
| #111111 on #F8F8F8 | 19.6:1 | ✅ AAA |
| #C8962A on #FFFFFF | 3.1:1 | ⚠️ AA Large only |
| #C8962A on #0A1628 | 6.2:1 | ✅ AA |

> **Catatan:** Warna gold (#C8962A) jangan digunakan untuk teks kecil di background putih. Gunakan untuk heading besar atau pada background gelap.

---

## Anti-Pattern Warna

```
❌ Hardcode hex (#1A4D8F) langsung di CSS class
❌ Menggunakan warna merah untuk aksen utama
❌ Lebih dari 4 warna berbeda dalam satu section
❌ Teks abu-abu terlalu terang (#AAAAAA) pada background putih
❌ Warna gold (#C8962A) sebagai teks kecil di background putih
❌ Gradient yang terlalu kontras atau neon
❌ Warna yang tidak konsisten antar halaman
❌ Opacity terlalu rendah sehingga teks tidak terbaca
```

---

## Implementasi di Vue Component

```vue
<style scoped>
/* ✅ Gunakan CSS custom properties */
.faculty-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.faculty-card__title {
  color: var(--color-text);
}

.faculty-card__category {
  color: var(--color-accent);
}

.faculty-card__excerpt {
  color: var(--color-text-muted);
}

/* ❌ Jangan hardcode */
.faculty-card {
  background-color: #ffffff;
  border: 1px solid #ECECEC;
  color: #111111;
}
</style>
```
