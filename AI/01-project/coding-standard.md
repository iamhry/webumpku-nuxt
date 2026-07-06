# 📏 Standar Coding — Website UMPKU

## Tujuan Dokumen

Mendefinisikan aturan coding yang wajib diikuti oleh seluruh kontributor (manusia maupun AI). Konsistensi kode adalah kunci maintainability jangka panjang.

---

## Prinsip Utama

1. **Readability over Cleverness** — Kode harus mudah dibaca oleh developer baru
2. **Single Responsibility** — Setiap komponen/composable punya satu tanggung jawab
3. **DRY (Don't Repeat Yourself)** — Ekstrak logika berulang ke composable/utils
4. **Mobile-First** — Tulis CSS untuk mobile terlebih dahulu

---

## Vue & Nuxt Conventions

### Script Setup (Wajib)

```vue
<!-- ✅ BENAR — Gunakan script setup -->
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  variant: 'primary'
})

const emit = defineEmits<{
  (e: 'click', id: number): void
  (e: 'close'): void
}>()
</script>

<!-- ❌ SALAH — Jangan gunakan Options API -->
<script>
export default {
  props: ['title'],
  data() { return {} }
}
</script>
```

### Urutan Kode di `<script setup>`

```typescript
// 1. Imports (auto-imported, Nuxt handles most)
import { someUtility } from '~/utils/helpers'

// 2. Props & Emits
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 3. Composables
const { articles, loading, fetchNewsList } = useNews()
const { t } = useI18n()
const route = useRoute()

// 4. Reactive State (UI-only state)
const isMenuOpen = ref(false)
const activeTab = ref(0)

// 5. Computed Properties
const filteredArticles = computed(() => 
  articles.value.filter(a => a.published)
)

// 6. Watchers
watch(() => route.params.slug, (newSlug) => {
  fetchNewsDetail(newSlug as string)
})

// 7. Lifecycle Hooks
onMounted(() => {
  // Client-side only initialization
})

// 8. Methods / Functions
const handleTabClick = (index: number) => {
  activeTab.value = index
}

// 9. SEO
useHead({
  title: computed(() => props.title),
  meta: [{ name: 'description', content: '...' }]
})
```

---

## Penamaan

### File dan Komponen

```
# Komponen Vue — PascalCase
HeroSection.vue
NewsCard.vue
PageHeader.vue
BreadcrumbNav.vue

# Pages — kebab-case (Nuxt convention)
pages/news/index.vue
pages/news/[slug].vue
pages/fakultas/[slug].vue

# Composables — camelCase dengan prefix 'use'
useNews.ts
useEvents.ts
useHeroSliders.ts

# Stores — camelCase dengan nama domain
news.ts
events.ts
hero-sliders.ts

# Types — PascalCase
NewsArticle
FacultyItem
EventDetail

# CSS Classes — BEM (kebab-case)
.news-card
.news-card__title
.news-card--featured
```

### Variable Naming

```typescript
// ✅ Benar
const isLoading = ref(false)
const currentPage = ref(1)
const newsArticles = computed(() => store.articles)
const handleSubmit = () => {}

// ❌ Salah
const l = ref(false)
const page = ref(1)
const data = computed(() => store.articles)
const submit = () => {}
```

---

## CSS Standards

### BEM Methodology

```css
/* Block */
.faculty-card { }

/* Element */
.faculty-card__image { }
.faculty-card__title { }
.faculty-card__description { }
.faculty-card__cta { }

/* Modifier */
.faculty-card--featured { }
.faculty-card--horizontal { }
.faculty-card__title--large { }
```

### CSS Custom Properties

```css
/* Gunakan variabel, JANGAN hardcode nilai */

/* ✅ Benar */
.section {
  padding: var(--section-padding-y) 0;
  color: var(--color-text);
  font-family: var(--font-body);
}

/* ❌ Salah */
.section {
  padding: 120px 0;
  color: #111111;
  font-family: Inter, sans-serif;
}
```

### Mobile-First Media Queries

```css
/* ✅ Mobile-first */
.container {
  padding: 0 24px;       /* Mobile default */
}

@media (min-width: 768px) {
  .container {
    padding: 0 40px;     /* Tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 60px;     /* Desktop */
  }
}

/* ❌ Desktop-first — Jangan digunakan */
.container {
  padding: 0 60px;
}
@media (max-width: 768px) {
  .container {
    padding: 0 24px;
  }
}
```

---

## Template Standards

### Semantic HTML

```vue
<!-- ✅ Benar -->
<template>
  <section class="news-section" aria-labelledby="news-heading">
    <div class="container">
      <header class="news-section__header">
        <h2 id="news-heading" class="news-section__title">
          Berita Terkini
        </h2>
      </header>
      <ul class="news-section__list" role="list">
        <li v-for="article in articles" :key="article.id">
          <NewsCard :article="article" />
        </li>
      </ul>
    </div>
  </section>
</template>

<!-- ❌ Salah — Div soup -->
<template>
  <div class="news-section">
    <div class="container">
      <div class="news-section__header">
        <div class="news-section__title">Berita Terkini</div>
      </div>
      <div class="news-section__list">
        <div v-for="article in articles" :key="article.id">
          <NewsCard :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>
```

### v-for dengan Key

```vue
<!-- ✅ Selalu gunakan :key yang unique -->
<NewsCard 
  v-for="article in articles" 
  :key="article.id" 
  :article="article" 
/>

<!-- ❌ Jangan gunakan index sebagai key -->
<NewsCard 
  v-for="(article, index) in articles" 
  :key="index"
  :article="article" 
/>
```

### Conditional Rendering

```vue
<!-- ✅ Benar — v-if vs v-show sesuai kebutuhan -->

<!-- v-if: Untuk kondisi yang jarang berubah -->
<div v-if="isLoggedIn">
  <UserMenu />
</div>

<!-- v-show: Untuk toggle yang sering (misal: dropdown, tab) -->
<div v-show="isDropdownOpen" class="dropdown-menu">
  ...
</div>
```

---

## TypeScript Standards

### Interface untuk Props

```typescript
// ✅ Definisikan interface terpisah untuk props kompleks
interface NewsCardProps {
  article: NewsArticle
  variant?: 'horizontal' | 'vertical'
  showExcerpt?: boolean
  class?: string
}

const props = withDefaults(defineProps<NewsCardProps>(), {
  variant: 'vertical',
  showExcerpt: true,
})
```

### Type untuk API Response

```typescript
// Semua type ada di app/types/
// Gunakan yang sudah ada, jangan buat duplikat

import type { NewsArticle } from '~/types/news'
import type { FacultyItem } from '~/types/faculty'
import type { EventItem } from '~/types/event'
```

---

## Error Handling Standards

```vue
<script setup lang="ts">
const { articles, loading, error, fetchNewsList } = useNews()

// Panggil di onMounted atau di server-side
await fetchNewsList()
</script>

<template>
  <!-- Loading State -->
  <div v-if="loading" class="loading-state" role="status" aria-live="polite">
    <LoadingSpinner />
    <span class="sr-only">Memuat berita...</span>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="error-state" role="alert">
    <p class="error-state__message">{{ error }}</p>
    <button class="btn btn-primary" @click="fetchNewsList()">
      Coba Lagi
    </button>
  </div>

  <!-- Content -->
  <div v-else class="news-grid">
    <NewsCard 
      v-for="article in articles" 
      :key="article.id" 
      :article="article" 
    />
  </div>
</template>
```

---

## Checklist Sebelum Push

```
[ ] Tidak ada console.log() tersisa
[ ] Tidak ada inline style
[ ] Semua gambar punya alt text
[ ] Tidak ada TypeScript error
[ ] Komponen mobile-friendly
[ ] useHead() terpasang di page component
[ ] Error dan loading state ditangani
[ ] Tidak ada CSS duplikat
[ ] Nama file dan class sesuai konvensi
[ ] Tidak ada file duplikat (HeroNew, HeroFinal, dll)
```
