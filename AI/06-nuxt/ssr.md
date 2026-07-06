# 🖥️ SSR (Server-Side Rendering) — Panduan

## Tujuan Dokumen

Panduan penanganan SSR di Nuxt 4 untuk menghindari hydration mismatch dan memastikan data tersedia saat server render.

---

## Prinsip SSR di Nuxt 4

1. **Server renders first** — HTML digenerate di server
2. **Client hydrates** — Vue "mengambil alih" HTML statis
3. **No mismatch** — Output server dan client HARUS identik

---

## useAsyncData — SSR-Safe Data Fetching

### ✅ Cara yang Benar

```typescript
// Di composable atau page:
const { data, error, pending } = await useAsyncData(
  'unique-key',           // WAJIB unik per data
  () => newsService.getNews(page)
)
```

### ❌ Cara yang Salah

```typescript
// JANGAN fetch di onMounted untuk data yang perlu SSR
onMounted(async () => {
  const data = await newsService.getNews()  // Tidak dirender di server!
})

// JANGAN gunakan fetch/axios langsung di setup
const data = await axios.get('/api/news')  // Bisa gagal di server
```

---

## Client-Only Code

Gunakan `onMounted` atau `<ClientOnly>` untuk kode yang hanya berjalan di browser:

```vue
<script setup lang="ts">
// ✅ Kode yang butuh window/document
onMounted(() => {
  // jQuery initialization
  // WOW.js init
  // window.addEventListener
})
</script>

<template>
  <!-- Komponen yang tidak bisa SSR (butuh browser API) -->
  <ClientOnly>
    <GoogleMapEmbed />
    <template #fallback>
      <div class="map-placeholder">Memuat peta...</div>
    </template>
  </ClientOnly>
</template>
```

---

## Hydration Mismatch — Pencegahan

Hydration mismatch terjadi ketika output server ≠ output client:

```vue
<!-- ❌ Penyebab mismatch: Math.random() berbeda di server vs client -->
<template>
  <div :class="`card-${Math.random()}`"></div>
</template>

<!-- ❌ Penyebab mismatch: Date berbeda di server vs client -->
<template>
  <div>{{ new Date().toLocaleString() }}</div>
</template>

<!-- ✅ Gunakan data yang deterministik -->
<template>
  <div :class="`card-${article.id}`"></div>
  <time :datetime="article.published_at">
    {{ formatDate(article.published_at) }}
  </time>
</template>
```

---

## useNuxtApp() — Akses Context

```typescript
const nuxtApp = useNuxtApp()

// Cek apakah di server atau client
if (import.meta.server) {
  // Server-only code
}

if (import.meta.client) {
  // Client-only code
}
```

---

## useCookie — State yang Persist

```typescript
// Untuk state yang perlu persist dan SSR-safe
const locale = useCookie('locale', { default: () => 'id' })
const token = useCookie('auth-token')
```

---

## Legacy jQuery dan SSR

Proyek menggunakan jQuery-based libraries (owl carousel, wow.js, dll). Mereka diload di `bodyClose` di `nuxt.config.ts`.

```typescript
// ✅ Inisialisasi jQuery plugin di onMounted
onMounted(() => {
  // jQuery sudah tersedia setelah DOM ready
  if (typeof window !== 'undefined' && (window as any).$) {
    (window as any).$('.owl-carousel').owlCarousel({
      items: 3,
      loop: true,
    })
  }
})

// ❌ Jangan akses $ di setup synchronous
const $ = (window as any).$  // Gagal di server (window undefined)
```

---

## useHead() dan SSR

`useHead()` aman digunakan di `<script setup>` karena Nuxt mengelola ini:

```typescript
// ✅ SSR-safe — Nuxt handle ini dengan benar
useHead({
  title: computed(() => currentArticle.value?.title + ' | UMPKU'),
})
```

---

## Anti-Pattern SSR

```
❌ Fetch data di onMounted untuk konten yang perlu terindex SEO
❌ Akses window/document di setup (bukan onMounted)
❌ Math.random() atau Date.now() di template (hydration mismatch)
❌ Conditional rendering yang berbeda di server vs client
❌ localStorage/sessionStorage di setup
❌ Tidak menggunakan useAsyncData() untuk data fetching
❌ Key yang tidak unik di useAsyncData (cache collision)
```
