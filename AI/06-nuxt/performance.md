# ⚡ Performance — Panduan Optimasi

## Tujuan Dokumen

Panduan optimasi performa frontend untuk memastikan website UMPKU memenuhi target Core Web Vitals.

---

## Target Core Web Vitals

| Metrik | Target | Kritis |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image |
| FID (First Input Delay) | < 100ms | - |
| CLS (Cumulative Layout Shift) | < 0.1 | Gambar tanpa dimensi |
| INP (Interaction to Next Paint) | < 200ms | - |

---

## 1. Image Optimization

### Selalu Gunakan Dimensi Gambar

```vue
<!-- ✅ Benar — mencegah CLS -->
<img 
  :src="article.featured_image"
  :alt="article.title"
  width="800"
  height="450"
  loading="lazy"
/>

<!-- ❌ Salah — menyebabkan layout shift -->
<img :src="article.featured_image" />
```

### Lazy Loading

```vue
<!-- Gambar "above the fold" (terlihat langsung): eager -->
<img loading="eager" />  <!-- Hero images -->

<!-- Gambar "below the fold": lazy -->
<img loading="lazy" />   <!-- Card images, gallery -->
```

### Aspect Ratio Container

```css
/* Mencegah CLS saat gambar belum load */
.card__image-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-surface); /* Placeholder color */
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 2. Code Splitting

Nuxt otomatis melakukan code splitting per halaman. Untuk komponen berat, gunakan lazy import:

```vue
<script setup lang="ts">
// ✅ Lazy load komponen berat (map, chart, dll)
const MapSection = defineAsyncComponent(() => 
  import('~/components/contact/MapSection.vue')
)

const GalleryLightbox = defineAsyncComponent({
  loader: () => import('~/components/shared/GalleryLightbox.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
})
</script>
```

---

## 3. CSS Performance

```css
/* ✅ Gunakan transform (GPU-accelerated) untuk animasi */
.card:hover {
  transform: translateY(-4px); /* OK */
}

/* ❌ Hindari animasi yang trigger layout */
.card:hover {
  margin-top: -4px; /* BURUK — reflow */
  top: -4px;        /* BURUK jika position:static */
}

/* ✅ will-change hanya untuk animasi yang sering terjadi */
.hero-slider__slide {
  will-change: opacity; /* Hanya jika benar-benar perlu */
}
/* Hapus will-change setelah animasi selesai */
```

---

## 4. Avoid Render-Blocking

```typescript
// nuxt.config.ts — sudah dikonfigurasi dengan benar
// Script legacy diload di bodyClose:
script: [
  { src: '...', tagPosition: 'bodyClose' }
]

// CSS kritis diload di head (via link rel=stylesheet)
// Tidak ada CSS yang di-import langsung di JS
```

---

## 5. Font Loading

```html
<!-- preconnect terlebih dahulu -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Muat font dengan display=swap untuk mencegah FOIT -->
<link href="...&display=swap" rel="stylesheet">
```

---

## 6. Virtual Scrolling (Untuk List Panjang)

```vue
<!-- Jika ada list > 50 item, pertimbangkan pagination -->
<!-- Atau gunakan Intersection Observer untuk infinite scroll -->

<script setup lang="ts">
const { articles, meta, fetchNewsList } = useNews()
const loadMoreRef = ref<HTMLElement | null>(null)

// Intersection Observer untuk load more
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && meta.value.current_page < meta.value.last_page) {
        fetchNewsList(meta.value.current_page + 1)
      }
    },
    { threshold: 0.5 }
  )
  
  if (loadMoreRef.value) observer.observe(loadMoreRef.value)
})
</script>
```

---

## 7. Pinia Store — Avoid Over-fetching

```typescript
// Cek apakah data sudah ada sebelum fetch ulang
const fetchNewsList = async (page: number = 1) => {
  // Skip fetch jika data sudah ada untuk page ini
  if (newsStore.articles.length > 0 && newsStore.meta?.current_page === page) {
    return
  }
  
  newsStore.setLoading(true)
  // ... fetch
}
```

---

## Checklist Performa

```
Images:
[ ] Semua gambar punya width + height attribute
[ ] Hero images: loading="eager"
[ ] Non-hero images: loading="lazy"
[ ] Gambar menggunakan aspect-ratio container

Code:
[ ] Komponen berat di-lazy load
[ ] Tidak ada unused import
[ ] Tidak ada console.log di production

CSS:
[ ] Animasi menggunakan transform, bukan top/left/margin
[ ] Tidak ada CSS @import di file CSS
[ ] CSS yang tidak digunakan dihapus

Fonts:
[ ] Google Fonts di-preconnect
[ ] Font display=swap digunakan
```

---

## Anti-Pattern Performa

```
❌ Gambar tanpa width/height (menyebabkan CLS)
❌ Import semua komponen di root (tidak code-split)
❌ Animasi menggunakan width/height/margin/top
❌ Fetch data di setiap render (tidak ada caching)
❌ CSS file yang tidak pernah dipakai di-load
❌ Google Fonts tanpa preconnect
❌ Gambar resolusi sangat tinggi tanpa resize
```
