# 🧩 Composable Pattern — Website UMPKU

## Tujuan Dokumen

Panduan cara menggunakan dan memahami composable yang ada di proyek ini. JANGAN buat composable baru jika yang dibutuhkan sudah ada.

---

## Daftar Composable yang Tersedia

```typescript
app/composables/
├── useContact.ts        // Form kontak
├── useEvents.ts         // Agenda/events
├── useFaculties.ts      // Data fakultas
├── useGallery.ts        // Galeri foto
├── useHeroSliders.ts    // Hero slider
├── useHomepage.ts       // Data homepage
├── useMedia.ts          // Media files
├── useMenu.ts           // Navigasi menu
├── useMenus.ts          // Full menu tree
├── useNews.ts           // Berita
├── usePages.ts          // CMS dynamic pages
├── useReputations.ts    // Rankings
├── useSdgs.ts           // SDGs programs
├── useSectionSettings.ts // Visibilitas section
├── useSettings.ts       // Site settings
├── useStatisticIcon.ts  // Ikon statistik
├── useStatistics.ts     // Data statistik
└── useStudyPrograms.ts  // Program studi
```

---

## Pola Standar Composable

Setiap composable mengikuti pola ini:

```typescript
// Pattern: composable menggunakan store + service
export const useNews = () => {
  const newsStore = useNewsStore()

  // Fetch list
  const fetchNewsList = async (page: number = 1) => {
    newsStore.setLoading(true)
    newsStore.setError(null)

    const { data, error } = await useAsyncData(
      `news-list-${page}`,        // Unique key untuk caching
      () => newsService.getNews(page)
    )

    if (data.value?.data) {
      newsStore.setArticles(data.value.data, data.value.meta)
    } else {
      newsStore.setArticles(fallbackData, fallbackMeta) // Fallback jika API gagal
    }

    newsStore.setLoading(false)
  }

  // Expose computed refs dan methods
  return {
    articles: computed(() => newsStore.articles),
    meta: computed(() => newsStore.meta),
    loading: computed(() => newsStore.loading),
    error: computed(() => newsStore.error),
    fetchNewsList,
    fetchNewsDetail
  }
}
```

---

## Cara Menggunakan Composable

### Di Page Component

```vue
<script setup lang="ts">
// ✅ Cara yang benar
const { articles, loading, error, fetchNewsList } = useNews()

// Fetch data (SSR-safe)
const page = ref(1)
await fetchNewsList(page.value)
</script>
```

### Di Child Component (hanya baca data)

```vue
<script setup lang="ts">
// Jika data sudah di-fetch di parent/page, tinggal baca dari composable
const { articles, loading } = useNews()
// Data sudah ada di store, tidak perlu fetch ulang
</script>
```

---

## useAsyncData — SSR-Safe Fetching

```typescript
// ✅ Gunakan useAsyncData untuk SSR
const { data, error } = await useAsyncData(
  'unique-key',           // Key unik — penting untuk caching
  () => service.getData() // Fetch function
)

// ❌ Jangan gunakan ini untuk data yang perlu SSR
const data = await service.getData() // Tidak SSR-safe
```

### Key Strategy untuk useAsyncData

```typescript
// Key harus unik dan deterministik
`news-list-${page}`           // List dengan pagination
`news-detail-${slug}`         // Detail dengan slug
`faculty-${slug}`             // Detail fakultas
`events-${year}-${month}`     // Events per bulan
```

---

## Fallback Data Pattern

Composable menyediakan fallback data jika API tidak tersedia:

```typescript
const fallbackNewsList: NewsArticle[] = [
  { 
    id: 1, 
    title: 'Berita Contoh',
    slug: 'berita-contoh',
    excerpt: '...',
    featured_image: '/assets/img/blog/1.jpg',
    published_at: '2026-01-01'
  }
]

// Gunakan fallback jika API gagal
if (data.value?.data) {
  store.setArticles(data.value.data, data.value.meta)
} else {
  store.setArticles(fallbackNewsList, { current_page: 1, last_page: 1, total: 1 })
}
```

---

## Jangan Buat Composable Duplikat

```
❌ useNewsData.ts  (duplikat useNews.ts)
❌ useNewsV2.ts    (duplikat)
❌ useArticles.ts  (duplikat useNews.ts)

✅ Jika butuh data news → gunakan useNews.ts yang ada
✅ Jika butuh fungsionalitas baru → extend useNews.ts yang ada
   (koordinasikan dengan tim jika butuh perubahan business logic)
```
