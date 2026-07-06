# 📝 Naming Conventions — Nuxt 4

## Tujuan Dokumen

Konvensi penamaan untuk file, komponen, CSS class, dan variabel di proyek UMPKU.

---

## File Naming

| Tipe File | Konvensi | Contoh |
|-----------|----------|--------|
| Vue Component | PascalCase | `NewsCard.vue`, `HeroSlider.vue` |
| Page | kebab-case | `index.vue`, `[slug].vue` |
| Composable | camelCase, prefix `use` | `useNews.ts`, `useEvents.ts` |
| Store | kebab-case | `news.ts`, `hero-sliders.ts` |
| TypeScript Type | PascalCase | `NewsArticle`, `FacultyItem` |
| CSS File | kebab-case | `dynamic-page.css`, `faculty-modern.css` |
| Utility | camelCase | `formatDate.ts`, `sanitizeHtml.ts` |

---

## Komponen Naming

### PascalCase + Domain Prefix

```
NewsCard.vue           → Card untuk berita
NewsCardFeatured.vue   → Varian featured dari NewsCard
NewsList.vue           → List wrapper untuk berita
NewsSection.vue        → Section berita (full section)

EventCard.vue
EventList.vue
EventSection.vue

FacultyCard.vue
FacultyGrid.vue
FacultySection.vue
```

### Jangan Gunakan Suffix yang Ambigu

```
❌ HeroNew.vue, HeroV2.vue, HeroFinal.vue, HeroCopy.vue, Hero2.vue
✅ Hero.vue (improve langsung, jangan buat duplikat)

❌ NewsCardComponent.vue (component sudah jelas)
✅ NewsCard.vue

❌ ContactFormPage.vue (page sudah jelas dari folder)
✅ ContactForm.vue (di pages/kontak/)
```

---

## CSS Class Naming (BEM)

```css
/* Block */
.news-section { }         /* Komponen utama */

/* Element */
.news-section__title { }  /* Anak dari block, dipisah __ */
.news-section__grid  { }
.news-section__card  { }

/* Modifier */
.news-section--dark  { }  /* Variasi, dipisah -- */
.news-section__title--large { }

/* State */
.is-active    { }  /* State yang ditambah via JS */
.is-open      { }
.has-dropdown { }
```

---

## TypeScript Naming

```typescript
// Interface → PascalCase dengan deskripsi jelas
interface NewsArticle { }
interface FacultyItem { }
interface EventDetail { }

// Type alias → PascalCase
type NewsCategory = 'berita' | 'pengumuman' | 'kegiatan'

// Enum → PascalCase
enum LoadingState { Idle, Loading, Success, Error }

// Function → camelCase, verb-first
const fetchNewsDetail = () => { }
const formatDate = () => { }
const validateForm = () => { }

// Variables → camelCase, noun atau adjective
const isLoading = ref(false)
const currentPage = ref(1)
const activeDropdown = ref<number | null>(null)
```

---

## Route Naming (i18n)

Proyek menggunakan URL berbeda untuk id/en:

```typescript
// nuxt.config.ts pages config
'news/index': {
  id: '/berita',      // Indonesia
  en: '/news'         // English
},
'news/[slug]': {
  id: '/berita/[slug]',
  en: '/news/[slug]'
},
```

Gunakan `useLocalePath()` untuk navigasi:

```vue
<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <!-- ✅ Benar — route-aware -->
  <NuxtLink :to="localePath('/berita')">Berita</NuxtLink>
  
  <!-- ❌ Salah — hardcode URL -->
  <NuxtLink to="/berita">Berita</NuxtLink>
</template>
```

---

## Event Naming (defineEmits)

```typescript
// ✅ kebab-case untuk events
defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'slide-change', index: number): void
  (e: 'menu-close'): void
  (e: 'form-submit', data: FormData): void
}>()

// ❌ camelCase events
defineEmits<{
  (e: 'updateModelValue'): void  // SALAH
}>()
```

---

## Prop Naming

```typescript
// ✅ camelCase props
interface Props {
  articleTitle: string
  isVisible: boolean
  onClose: () => void
  maxItems: number
}

// Di template — Vue otomatis handle kebab-case conversion
// <NewsCard article-title="..." />  ← kebab-case di template OK
// <NewsCard :articleTitle="..." />  ← camelCase juga OK
```
