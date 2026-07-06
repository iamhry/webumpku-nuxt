# 📰 News Page — Spesifikasi Halaman

## Routes

```
Listing: /berita (id) atau /news (en)
  File: app/pages/berita/index.vue (atau news/index.vue)

Detail: /berita/[slug] (id)
  File: app/pages/berita/[slug].vue
```

---

## Composable

```typescript
const { articles, meta, loading, error, fetchNewsList, fetchNewsDetail } = useNews()
```

---

## Halaman Listing Berita

### Struktur

```
1. PageHeader    → "Berita & Informasi"
2. NewsGrid      → Grid 3 kolom dengan pagination
3. Sidebar       → Kategori + berita populer (opsional)
```

### Layout

```
Desktop: 3 kolom + sidebar (9/3)
Tablet:  2 kolom tanpa sidebar
Mobile:  1 kolom
```

### Pagination

```vue
<script setup lang="ts">
const page = ref(Number(useRoute().query.page) || 1)
const { articles, meta, loading, fetchNewsList } = useNews()

await fetchNewsList(page.value)

const goToPage = async (newPage: number) => {
  page.value = newPage
  await fetchNewsList(newPage)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
```

---

## Halaman Detail Berita

### Struktur

```
1. PageHeader       → Judul artikel
2. ArticleHeader    → Metadata (tanggal, kategori, penulis)
3. FeaturedImage    → Gambar utama artikel
4. ArticleBody      → Konten HTML dari CMS (sanitize!)
5. ShareButtons     → Tombol share sosmed
6. RelatedNews      → Berita terkait (3 artikel)
```

### Sanitasi HTML

```vue
<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'

const { currentArticle } = useNews()
const sanitizedContent = computed(() =>
  DOMPurify.sanitize(currentArticle.value?.content || '')
)
</script>

<template>
  <div
    class="article-body"
    v-html="sanitizedContent"
  ></div>
</template>
```

### SEO Detail Berita

```typescript
useHead({
  title: computed(() => `${currentArticle.value?.title} | UMPKU`),
  meta: [
    { name: 'description', content: computed(() => currentArticle.value?.excerpt || '') },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: computed(() => currentArticle.value?.title || '') },
    { property: 'og:image', content: computed(() => currentArticle.value?.featured_image || '') },
  ]
})
```

---

## Anti-Pattern

```
❌ Render HTML tanpa DOMPurify (XSS vulnerability)
❌ Halaman detail tanpa Open Graph meta
❌ Tidak ada navigasi kembali ke listing
❌ Tidak ada related articles
❌ Pagination yang tidak update URL
```
