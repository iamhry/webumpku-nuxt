# 📌 Page Header — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen page header yang digunakan untuk halaman-dalam (non-homepage).

---

## Spesifikasi

```
Tujuan: Menggantikan hero besar untuk halaman konten
Height: 300-400px
Background: Gambar dengan overlay atau gradient solid
Konten: Breadcrumb + H1 + Subtitle opsional
Posisi: Tepat setelah navbar
```

---

## Implementasi

```vue
<template>
  <section
    class="page-header"
    :class="[`page-header--${variant}`, hasImage && 'page-header--with-image']"
    :style="hasImage ? { backgroundImage: `url(${image})` } : undefined"
    role="banner"
  >
    <div class="page-header__overlay" aria-hidden="true"></div>

    <div class="container">
      <div class="page-header__content">
        <!-- Breadcrumb -->
        <BreadcrumbNav v-if="breadcrumbs?.length" :items="breadcrumbs" />

        <!-- Title -->
        <h1 class="page-header__title">{{ title }}</h1>

        <!-- Subtitle -->
        <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  title: string
  subtitle?: string
  image?: string
  variant?: 'dark' | 'brand' | 'gradient'
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
})

const hasImage = computed(() => !!props.image)
</script>
```

---

## CSS

```css
.page-header {
  position: relative;
  padding: 160px 0 80px; /* Top padding accounts for navbar */
  background-color: #0A1628; /* Dark default */
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.page-header__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 22, 40, 0.92) 0%,
    rgba(26, 77, 143, 0.85) 100%
  );
}

.page-header__content {
  position: relative;
  z-index: 2;
}

.page-header__title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-top: var(--space-4);
  margin-bottom: 0;
}

.page-header__subtitle {
  font-size: clamp(15px, 1.5vw, 18px);
  color: rgba(255, 255, 255, 0.8);
  margin-top: var(--space-4);
  max-width: 600px;
}

/* Variants */
.page-header--brand {
  background-color: var(--color-accent);
}

.page-header--gradient {
  background: linear-gradient(135deg, var(--color-accent) 0%, #0A1628 100%);
}

@media (max-width: 767px) {
  .page-header {
    padding: 130px 0 60px;
  }
}
```

---

## Penggunaan

```vue
<!-- Di pages/fakultas/[slug].vue -->
<PageHeader
  :title="faculty.name"
  :subtitle="faculty.short_description"
  :image="faculty.banner_image"
  :breadcrumbs="[
    { label: 'Beranda', to: '/' },
    { label: 'Fakultas', to: '/fakultas' },
    { label: faculty.name }
  ]"
/>
```

---

## Anti-Pattern

```
❌ Page header tanpa H1
❌ Dua H1 dalam satu halaman
❌ Background gambar tanpa overlay (teks tidak terbaca)
❌ Page header yang terlalu pendek (< 200px)
❌ Tidak ada breadcrumb di halaman dalam
```
