# 🃏 Card Component — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen card yang digunakan untuk menampilkan berita, event, fakultas, dan program studi.

---

## Varian Card

| Varian | Kegunaan |
|--------|----------|
| `NewsCard` | Artikel berita — vertikal dengan gambar |
| `EventCard` | Agenda/event — dengan tanggal prominent |
| `FacultyCard` | Kartu fakultas — dengan ikon/gambar |
| `StudyProgramCard` | Program studi — compact |
| `StatCard` | Angka statistik — full-color |
| `PersonCard` | Profil dosen/staff |

---

## NewsCard

### Spesifikasi

```
Layout: Vertikal (image atas, konten bawah)
Gambar: aspect-ratio 16/9
Hover: Lift up (translateY -4px) + shadow
Link: Seluruh card clickable
Max title: 2 baris (line-clamp: 2)
Max excerpt: 3 baris (line-clamp: 3)
```

### Implementasi

```vue
<template>
  <article class="news-card">
    <NuxtLink :to="localePath(`/berita/${article.slug}`)" class="news-card__link" :aria-label="article.title">
      <!-- Image -->
      <div class="news-card__image-wrapper">
        <img
          :src="article.featured_image || '/assets/img/blog/placeholder.jpg'"
          :alt="article.title"
          class="news-card__image"
          loading="lazy"
          width="400"
          height="225"
        />
        <div v-if="article.category" class="news-card__category">
          {{ article.category }}
        </div>
      </div>

      <!-- Content -->
      <div class="news-card__body">
        <time 
          class="news-card__date"
          :datetime="article.published_at"
        >
          {{ formatDate(article.published_at) }}
        </time>
        <h3 class="news-card__title">{{ article.title }}</h3>
        <p v-if="showExcerpt" class="news-card__excerpt">
          {{ article.excerpt }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { NewsArticle } from '~/types/news'

interface Props {
  article: NewsArticle
  showExcerpt?: boolean
}

withDefaults(defineProps<Props>(), {
  showExcerpt: true,
})

const localePath = useLocalePath()

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(dateStr))
}
</script>
```

### CSS

```css
.news-card {
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}

.news-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.news-card__image-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.news-card:hover .news-card__image {
  transform: scale(1.04);
}

.news-card__category {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--color-accent);
  color: white;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  border-radius: 4px;
}

.news-card__body {
  padding: var(--space-6);
}

.news-card__date {
  display: block;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.news-card__title {
  font-family: var(--font-heading);
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
  margin-bottom: var(--space-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__excerpt {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## EventCard

```vue
<template>
  <article class="event-card">
    <NuxtLink :to="localePath(`/agenda/${event.slug}`)" class="event-card__link">
      <!-- Date Badge -->
      <div class="event-card__date-badge" aria-label="Tanggal acara">
        <span class="event-card__day">{{ formatDay(event.start_date) }}</span>
        <span class="event-card__month">{{ formatMonth(event.start_date) }}</span>
      </div>

      <!-- Content -->
      <div class="event-card__body">
        <span class="event-card__type">{{ event.type || 'Acara' }}</span>
        <h3 class="event-card__title">{{ event.title }}</h3>
        <div class="event-card__meta">
          <span class="la la-map-marker" aria-hidden="true"></span>
          {{ event.location }}
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
```

---

## Anti-Pattern

```
❌ Card tanpa alt text pada gambar
❌ Clickable area hanya pada judul (UX buruk, gunakan area card penuh)
❌ Gambar tanpa aspect-ratio yang konsisten
❌ Title card tanpa line-clamp (overflow visual)
❌ Tidak ada hover state
❌ Card loading tanpa skeleton placeholder
❌ NewsCard dan EventCard yang di-merge (pisahkan tanggung jawab)
```
