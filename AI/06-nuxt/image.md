# 🖼️ Image Handling — Panduan

## Tujuan Dokumen

Panduan penanganan gambar di website UMPKU untuk memastikan performa, aksesibilitas, dan tampilan yang konsisten.

---

## Sumber Gambar

### 1. Gambar dari Laravel Storage

```typescript
// Gunakan storageUrl dari runtime config
const config = useRuntimeConfig()

// Membentuk URL gambar
const getImageUrl = (path: string | null) => {
  if (!path) return '/assets/img/placeholder.jpg'
  if (path.startsWith('http')) return path  // URL absolut
  return `${config.public.storageUrl}/${path}`
}
```

### 2. Gambar Statis (di public/assets/img/)

```vue
<!-- Gambar yang sudah ada di proyek -->
<img src="/assets/img/logo/logo-umpku.png" alt="Logo UMPKU" />
```

---

## Implementasi Standar

### Gambar dalam Card

```vue
<template>
  <div class="news-card__image-wrapper">
    <img
      :src="article.featured_image || '/assets/img/blog/placeholder.jpg'"
      :alt="article.title"
      class="news-card__image"
      loading="lazy"
      width="800"
      height="450"
      @error="handleImageError"
    />
  </div>
</template>

<script setup lang="ts">
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/assets/img/blog/placeholder.jpg'
}
</script>

<style scoped>
.news-card__image-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-surface);
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}
</style>
```

### Gambar Hero (LCP Critical)

```vue
<template>
  <img
    :src="slide.image"
    :alt="slide.title"
    class="hero__image"
    loading="eager"          <!-- JANGAN lazy untuk hero -->
    fetchpriority="high"     <!-- Prioritas tinggi untuk LCP -->
    width="1440"
    height="810"
  />
</template>
```

---

## Aspect Ratios yang Digunakan

| Konteks | Aspect Ratio | CSS |
|---------|-------------|-----|
| News card | 16:9 | `aspect-ratio: 16 / 9` |
| Faculty card | 4:3 | `aspect-ratio: 4 / 3` |
| Event card | 3:2 | `aspect-ratio: 3 / 2` |
| Person/Avatar | 1:1 | `aspect-ratio: 1 / 1` |
| Hero fullscreen | Auto | `min-height: 100vh` |
| Gallery | Mixed | `aspect-ratio: 4 / 3` (konsisten) |

---

## Fallback Gambar

```typescript
// Utility function untuk gambar dengan fallback
export const getImageWithFallback = (
  path: string | null | undefined,
  context: 'news' | 'event' | 'faculty' | 'person' = 'news'
) => {
  const fallbacks = {
    news: '/assets/img/blog/placeholder.jpg',
    event: '/assets/img/event/placeholder.jpg',
    faculty: '/assets/img/faculty/placeholder.jpg',
    person: '/assets/img/team/placeholder.jpg',
  }
  
  if (!path) return fallbacks[context]
  
  const config = useRuntimeConfig()
  if (path.startsWith('http')) return path
  return `${config.public.storageUrl}/${path}`
}
```

---

## Gambar Galeri dengan Lightbox

```vue
<template>
  <div class="gallery-grid">
    <button
      v-for="(photo, index) in photos"
      :key="photo.id"
      class="gallery-item"
      :aria-label="`Lihat foto: ${photo.caption}`"
      @click="openLightbox(index)"
    >
      <div class="gallery-item__wrapper">
        <img
          :src="photo.thumbnail_url"
          :alt="photo.caption"
          class="gallery-item__image"
          loading="lazy"
          width="400"
          height="300"
        />
      </div>
    </button>
  </div>
</template>
```

---

## Logo

```vue
<!-- Logo UMPKU -->
<!-- Versi terang (di navbar saat scrolled, footer light) -->
<img
  src="/assets/img/logo/logo-umpku.png"
  alt="Universitas Muhammadiyah PKU Surakarta"
  width="180"
  height="60"
/>

<!-- Versi putih (di navbar transparent, footer dark) -->
<img
  src="/assets/img/logo/logo-umpku-white.png"
  alt="Universitas Muhammadiyah PKU Surakarta"
  width="180"
  height="60"
/>
```

---

## Anti-Pattern Gambar

```
❌ Gambar tanpa alt text
❌ Gambar tanpa width + height (menyebabkan CLS)
❌ Hero image dengan loading="lazy" (memperlambat LCP)
❌ Gambar tanpa aspect-ratio container (layout jump)
❌ Hardcode URL storage (gunakan runtimeConfig)
❌ Tidak ada fallback saat gambar gagal load
❌ Gambar dekoratif tanpa alt="" (bukan alt="dekoratif")
❌ Background image di CSS tanpa fallback color
❌ Gambar sangat besar (> 500KB) tanpa kompresi
```
