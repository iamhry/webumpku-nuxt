# ✨ Animation System — Website UMPKU

## Tujuan Dokumen

Mendefinisikan sistem animasi dan transisi yang digunakan di seluruh website. Animasi harus halus, purposeful, dan tidak mengganggu pengalaman pengguna.

---

## Prinsip Animasi

1. **Purposeful** — Animasi memandu perhatian, bukan sekadar dekorasi
2. **Subtle** — Durasi pendek, intensitas rendah
3. **Performant** — Gunakan `transform` dan `opacity`, hindari `width/height`
4. **Accessible** — Hormati `prefers-reduced-motion`

---

## Duration Scale

```css
:root {
  --duration-instant:  100ms;  /* Hover state feedback */
  --duration-fast:     200ms;  /* Button, link, small UI */
  --duration-normal:   300ms;  /* Default — modal, dropdown */
  --duration-slow:     500ms;  /* Page transitions, reveals */
  --duration-slower:   700ms;  /* Hero entrances */
  --duration-slowest: 1000ms;  /* Staggered list, complex */
}
```

---

## Easing Functions

```css
:root {
  /* Standard */
  --ease-default:  cubic-bezier(0.4, 0, 0.2, 1);    /* Material standard */
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);       /* Accelerate */
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);       /* Decelerate */
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);     /* Both */

  /* Custom */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1); /* Slight overshoot */
  --ease-smooth:   cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smooth */
}
```

---

## CSS Transition Classes

```css
/* Base transition */
.transition {
  transition-property: all;
  transition-duration: var(--duration-normal);
  transition-timing-function: var(--ease-default);
}

/* Specific transitions */
.transition-opacity {
  transition: opacity var(--duration-normal) var(--ease-default);
}

.transition-transform {
  transition: transform var(--duration-normal) var(--ease-default);
}

.transition-colors {
  transition: color var(--duration-fast) var(--ease-default),
              background-color var(--duration-fast) var(--ease-default),
              border-color var(--duration-fast) var(--ease-default);
}

.transition-shadow {
  transition: box-shadow var(--duration-normal) var(--ease-default);
}
```

---

## Keyframe Animations

```css
/* Fade In Up — untuk card dan section reveal */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade In — untuk overlay dan modal */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Slide In From Left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale In — untuk modal */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## Scroll Reveal Animation

Proyek menggunakan WOW.js untuk scroll-triggered animations:

```html
<!-- Tambahkan class wow + animation class -->
<div class="wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.6s">
  <NewsCard />
</div>
```

### Panduan WOW.js

```
data-wow-delay    : Jarak delay antar elemen (0.1s, 0.2s, 0.3s)
data-wow-duration : Durasi animasi (0.6s untuk normal, 0.8s untuk slow)
data-wow-offset   : Berapa px sebelum masuk viewport (default: 0)

Animasi yang direkomendasikan:
- fadeInUp    : Untuk card, content block
- fadeIn      : Untuk overlay, section title
- slideInLeft : Untuk list item dari kiri
- slideInRight: Untuk list item dari kanan
```

---

## Hover Effects

```css
/* Card hover */
.card {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

/* Link hover */
a {
  transition: color var(--duration-fast) var(--ease-default);
}

/* Button hover */
.btn {
  transition: background-color var(--duration-fast) var(--ease-default),
              transform var(--duration-fast) var(--ease-spring);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* Image zoom on card hover */
.card__image {
  overflow: hidden;
}

.card__image img {
  transition: transform var(--duration-slow) var(--ease-out);
}

.card:hover .card__image img {
  transform: scale(1.05);
}
```

---

## Accessibility — Reduced Motion

```css
/* WAJIB diimplementasikan */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Nonaktifkan WOW.js secara CSS */
  .wow {
    visibility: visible !important;
    animation: none !important;
  }
}
```

---

## Anti-Pattern Animasi

```
❌ Animasi menggunakan width, height, top, left (layout thrashing)
❌ Duration > 1000ms untuk interaksi biasa
❌ Animasi yang loop terus tanpa henti (kecuali loading indicator)
❌ Terlalu banyak elemen beranimasi bersamaan (> 5 sekaligus)
❌ Animasi tanpa @prefers-reduced-motion fallback
❌ Keyframe yang tidak smooth (abrupt jump)
❌ Hover animation yang lambat (> 300ms)
❌ Parallax yang membuat mual (scroll parallax ekstrem)
❌ Auto-play video dengan suara
```
