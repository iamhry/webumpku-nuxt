# ♿ Accessibility (A11y) — Website UMPKU

## Tujuan Dokumen

Panduan aksesibilitas untuk memastikan website UMPKU dapat digunakan oleh semua orang, termasuk pengguna dengan disabilitas visual, motorik, dan kognitif.

---

## Standar yang Ditargetkan

- **WCAG 2.1 Level AA** — Minimum wajib
- **WCAG 2.1 Level AAA** — Target untuk komponen kritis (form, navigasi)

---

## Semantic HTML

### Penggunaan Elemen yang Benar

```html
<!-- ✅ Benar -->
<header>
  <nav aria-label="Navigasi Utama">
    <ul>
      <li><a href="/">Beranda</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Judul Berita</h1>
    <p>Konten berita...</p>
  </article>

  <aside aria-label="Artikel Terkait">
    ...
  </aside>
</main>

<footer>
  <nav aria-label="Footer Navigation">...</nav>
</footer>

<!-- ❌ Salah — div soup -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Beranda</div>
  </div>
</div>
```

### Landmark Roles

```html
<header>    <!-- role="banner"      -->
<nav>       <!-- role="navigation"  -->
<main>      <!-- role="main"        -->
<section>   <!-- role="region" (butuh aria-label) -->
<article>   <!-- role="article"     -->
<aside>     <!-- role="complementary" -->
<footer>    <!-- role="contentinfo" -->
```

---

## Heading Hierarchy

```html
<!-- Setiap halaman harus memiliki TEPAT SATU H1 -->
<h1>Judul Halaman Utama</h1>  <!-- Satu per halaman -->
  <h2>Section Title</h2>
    <h3>Sub-section</h3>
      <h4>Card Title</h4>

<!-- ❌ Jangan skip heading level -->
<h1>Judul</h1>
<h3>Sub (skip H2)</h3>  <!-- SALAH -->
```

---

## Color & Contrast

```
Minimum contrast ratio (WCAG AA):
- Normal text (< 18pt): 4.5:1
- Large text (≥ 18pt bold / ≥ 24pt): 3:1
- UI Components & Icons: 3:1

Palet UMPKU yang telah diverifikasi:
✅ #111111 on #FFFFFF → 21:1  (AAA)
✅ #666666 on #FFFFFF → 5.7:1 (AA)
✅ #FFFFFF on #1A4D8F → 8.1:1 (AAA)
⚠️ #C8962A on #FFFFFF → 3.1:1 (AA Large only)
```

---

## Keyboard Navigation

```css
/* ─── Focus Styles (WAJIB) ──────────────── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Jangan hapus focus outline! */
/* ❌ a:focus { outline: none; } */
```

```vue
<!-- Skip to main content link -->
<template>
  <a href="#main-content" class="skip-link">
    Langsung ke konten utama
  </a>
  <!-- ... -->
  <main id="main-content">
    ...
  </main>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  padding: 12px 24px;
  background: var(--color-accent);
  color: white;
  z-index: var(--z-toast);
  transition: top var(--duration-fast);
}

.skip-link:focus {
  top: 0;
}
</style>
```

---

## ARIA Labels

```vue
<template>
  <!-- Icon-only buttons HARUS punya aria-label -->
  <button 
    class="btn-icon" 
    aria-label="Cari konten"
    type="button"
  >
    <span class="icon-search" aria-hidden="true"></span>
  </button>

  <!-- Carousel/Slider -->
  <div 
    class="hero-slider"
    role="region"
    aria-label="Hero Slideshow"
    aria-live="polite"
  >
    <button aria-label="Slide sebelumnya">‹</button>
    <button aria-label="Slide berikutnya">›</button>
    <div role="tablist" aria-label="Slide indicators">
      <button 
        v-for="(slide, i) in slides" 
        :key="i"
        role="tab"
        :aria-selected="currentSlide === i"
        :aria-label="`Slide ${i + 1} dari ${slides.length}`"
      />
    </div>
  </div>

  <!-- Navigation dengan dropdown -->
  <nav aria-label="Navigasi Utama">
    <ul>
      <li>
        <button 
          :aria-expanded="isOpen"
          aria-haspopup="true"
          @click="isOpen = !isOpen"
        >
          Akademik
          <span aria-hidden="true">▾</span>
        </button>
        <ul 
          v-show="isOpen"
          role="menu"
        >
          <li role="menuitem"><a href="/fakultas">Fakultas</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
```

---

## Form Accessibility

```vue
<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <!-- Label HARUS terhubung ke input -->
    <div class="form-group">
      <label for="name" class="form-label">
        Nama Lengkap
        <span class="required" aria-label="wajib diisi">*</span>
      </label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-control"
        autocomplete="name"
        :aria-describedby="nameError ? 'name-error' : undefined"
        :aria-invalid="nameError ? 'true' : 'false'"
        required
      />
      <p 
        v-if="nameError"
        id="name-error"
        class="form-error"
        role="alert"
      >
        {{ nameError }}
      </p>
    </div>
  </form>
</template>
```

---

## Image Accessibility

```vue
<template>
  <!-- Gambar informatif: ALT yang deskriptif -->
  <img 
    :src="article.featured_image"
    :alt="`Foto: ${article.title}`"
    loading="lazy"
  />

  <!-- Gambar dekoratif: ALT kosong -->
  <img 
    src="/assets/pattern.svg"
    alt=""
    aria-hidden="true"
  />

  <!-- Gambar dengan caption -->
  <figure>
    <img :src="photo.url" :alt="photo.description" />
    <figcaption>{{ photo.caption }}</figcaption>
  </figure>
</template>
```

---

## Live Regions (Dynamic Content)

```vue
<template>
  <!-- Loading state -->
  <div 
    v-if="loading"
    role="status"
    aria-live="polite"
    aria-label="Memuat konten"
  >
    <LoadingSpinner />
    <span class="sr-only">Memuat...</span>
  </div>

  <!-- Error state -->
  <div 
    v-if="error"
    role="alert"
    aria-live="assertive"
  >
    {{ error }}
  </div>

  <!-- Notification/Toast -->
  <div
    class="toast"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    {{ toastMessage }}
  </div>
</template>
```

---

## Screen Reader Only (Hidden Visually)

```css
/* Teks yang hanya dapat dibaca screen reader */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Anti-Pattern Aksesibilitas

```
❌ outline: none atau outline: 0 tanpa pengganti
❌ Warna sebagai satu-satunya pembeda informasi
❌ Gambar tanpa alt text
❌ Icon-only button tanpa aria-label
❌ Form tanpa label yang terhubung
❌ Heading yang tidak berurutan (H1 → H3 tanpa H2)
❌ Lebih dari satu H1 per halaman
❌ Link text yang ambigu ("Klik di sini", "Baca lebih lanjut")
❌ Modal yang tidak trap focus
❌ Animasi tanpa prefers-reduced-motion
❌ Auto-play media tanpa kontrol pause
❌ Teks di dalam gambar (tidak dapat dibaca screen reader)
```
