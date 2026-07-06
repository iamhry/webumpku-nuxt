# 🌐 API Standard — Website UMPKU

## Tujuan Dokumen

Mendokumentasikan konvensi API yang digunakan oleh frontend untuk berkomunikasi dengan Laravel backend. AI Agent TIDAK BOLEH mengubah endpoint atau format request yang sudah ada.

---

## Base URL

```typescript
const config = useRuntimeConfig()
const apiBase = config.public.apiBase // http://localhost:8000 atau domain production
```

---

## Format Response Laravel

Semua response dari Laravel API mengikuti format berikut:

### List Response (Collection)

```json
{
  "data": [
    { "id": 1, "title": "...", "slug": "...", "..." : "..." }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 58
  },
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  }
}
```

### Single Item Response

```json
{
  "data": {
    "id": 1,
    "title": "...",
    "slug": "...",
    "content": "...",
    "..."
  }
}
```

### Custom Response (Beberapa endpoint)

```json
{
  "news": { ... },
  "related_news": [ ... ]
}
```

---

## Daftar Endpoint yang Tersedia

> ⚠️ **JANGAN UBAH** endpoint ini. Jangan tambah parameter baru tanpa koordinasi dengan tim backend.

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/news` | GET | List berita (query: `page`, `per_page`) |
| `/api/news/{slug}` | GET | Detail berita |
| `/api/events` | GET | List event |
| `/api/events/{slug}` | GET | Detail event |
| `/api/faculties` | GET | List fakultas |
| `/api/faculties/{slug}` | GET | Detail fakultas |
| `/api/study-programs` | GET | List program studi |
| `/api/study-programs/{slug}` | GET | Detail program studi |
| `/api/hero-sliders` | GET | Slides hero |
| `/api/homepage` | GET | Data homepage |
| `/api/settings` | GET | Site settings |
| `/api/menus` | GET | Menu navigasi |
| `/api/pages/{slug}` | GET | Dynamic CMS page |
| `/api/sdgs` | GET | Data SDGs |
| `/api/sdgs/{slug}` | GET | Detail SDGs |
| `/api/reputations` | GET | Rankings & akreditasi |
| `/api/statistics` | GET | Statistik universitas |
| `/api/gallery` | GET | Foto galeri |
| `/api/contact` | POST | Submit form kontak |

---

## Services Layer

Contoh service yang sudah ada (JANGAN diubah):

```typescript
// app/services/news.ts (contoh pola)
import axios from 'axios'

const api = axios.create({
  baseURL: useRuntimeConfig().public.apiBase
})

export const newsService = {
  getNews: (page = 1) => 
    api.get('/api/news', { params: { page } }).then(r => r.data),
  
  getNewsBySlug: (slug: string) =>
    api.get(`/api/news/${slug}`).then(r => r.data),
}
```

---

## Pola Penggunaan di Composable

```typescript
// Di composable (JANGAN GUNAKAN LANGSUNG DI COMPONENT)
const { data, error } = await useAsyncData(
  `news-list-${page}`, 
  () => newsService.getNews(page)
)

if (data.value?.data) {
  newsStore.setArticles(data.value.data, data.value.meta)
}
```

---

## Storage URL

Untuk gambar yang disimpan di Laravel storage:

```typescript
// ✅ Benar
const config = useRuntimeConfig()
const imageUrl = `${config.public.storageUrl}/${path}`

// ❌ Salah
const imageUrl = `http://localhost:8000/storage/${path}`
```

---

## Anti-Pattern API

```
❌ Memanggil API langsung dari component
❌ Menggunakan fetch() langsung (gunakan service layer + axios)
❌ Hardcode API base URL
❌ Menambah endpoint baru tanpa dokumentasi
❌ Mengubah parameter yang ada
❌ Mengabaikan error response dari API
❌ Tidak menggunakan useAsyncData() (SSR issue)
```
