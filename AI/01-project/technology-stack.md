# 🛠️ Technology Stack — Website UMPKU

## Tujuan Dokumen

Dokumentasi lengkap tentang teknologi yang digunakan dalam proyek ini. AI Agent harus memahami ekosistem ini untuk menulis kode yang kompatibel dan menggunakan fitur yang tersedia.

---

## Stack Utama

| Layer | Teknologi | Versi | Keterangan |
|-------|-----------|-------|------------|
| **Framework** | Nuxt | ^4.4.8 | Meta-framework Vue |
| **Runtime** | Vue | ^3.5.35 | Composition API |
| **State** | Pinia | ^3.0.4 | State management |
| **i18n** | @nuxtjs/i18n | ^10.4.0 | Multi-language |
| **HTTP** | Axios | ^1.17.0 | API client |
| **Router** | Vue Router | ^5.1.0 | Client-side routing |
| **Security** | isomorphic-dompurify | ^3.17.0 | HTML sanitization |

---

## Backend (Read-Only untuk AI Frontend)

| Komponen | Teknologi |
|----------|-----------|
| **API Server** | Laravel 13 |
| **CMS** | Filament |
| **Database** | MySQL |
| **Storage** | Laravel Storage (public disk) |
| **Auth** | Laravel Sanctum |

---

## CSS Framework & Libraries

Proyek menggunakan **Bootstrap 5** sebagai base CSS grid, dengan **custom CSS** untuk styling komponen:

```
public/assets/css/
├── bootstrap.min.css        # Base grid & utilities
├── font-awesome.min.css     # Icon library
├── line-awesome.min.css     # Icon library (extended)
├── flaticon.css             # Custom icon set
├── animate.css              # CSS animations (WOW.js)
├── owl.carousel.css         # Slider library
├── style.css                # Main custom styles
├── responsive.css           # Responsive overrides
├── layout.css               # Layout utilities
├── dynamic-page.css         # CMS dynamic pages
└── ... (feature-specific CSS files)
```

---

## JavaScript Libraries (Legacy, via CDN)

Proyek menggunakan jQuery-based libraries yang diload via `<script>` tag:

```
public/assets/js/
├── jquery-1.12.4.min.js    # ⚠️ Foundation library
├── bootstrap.min.js         # Bootstrap JS
├── owl.carousel.min.js      # Carousel/slider
├── wow.min.js               # Scroll animations
├── jquery.waypoints.min.js  # Scroll triggers
├── jquery.counterup.min.js  # Number counter
├── magnific-popup.min.js    # Lightbox
├── jquery.sticky.js         # Sticky elements
└── main.js                  # Custom initializations
```

> **⚠️ Penting:** Library jQuery dan legacy JS ini diload di `bodyClose`. Hindari konflik dengan Vue reactivity. Jangan gunakan `$()` selector pada elemen yang dikelola Vue.

---

## Fitur Nuxt yang Digunakan

### Auto-imports (Tidak Perlu Import Manual)
```typescript
// Tersedia secara global tanpa import:
ref()                // Vue reactivity
computed()           // Vue computed
watch()              // Vue watch
useAsyncData()       // SSR-safe data fetching
useHead()            // SEO head management
useRoute()           // Current route
useRouter()          // Router navigation
useI18n()            // Translations
useRuntimeConfig()   // Environment config
usePinia()           // Access to pinia instance
```

### Modules yang Aktif
```typescript
// nuxt.config.ts
modules: [
  '@pinia/nuxt',    // State management
  '@nuxtjs/i18n',  // Internationalization
]
```

---

## TypeScript Configuration

```json
// tsconfig.json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

Gunakan TypeScript untuk:
- Props interface: `defineProps<{ title: string; count: number }>()`
- Emits: `defineEmits<{ (e: 'update', id: number): void }>()`
- Composable return types
- API response types di `app/types/`

---

## Font System

Font diload via Google Fonts (tambahkan di `nuxt.config.ts` atau `app.vue`):

```typescript
// nuxt.config.ts - head links
link: [
  { 
    rel: 'preconnect', 
    href: 'https://fonts.googleapis.com' 
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap'
  }
]
```

| Font | Kegunaan | Weight yang Digunakan |
|------|----------|----------------------|
| **Sora** | Semua heading (H1-H4) | 300, 500, 600, 700, 800 |
| **Inter** | Body text, caption, label | 300, 400, 500, 600 |
| **sans-serif** | Fallback | - |

---

## Composables yang Tersedia

Jangan buat ulang. Gunakan yang sudah ada:

```typescript
// Data fetching composables
useNews()           // Berita/news
useEvents()         // Agenda/events
useFaculties()      // Data fakultas
useStudyPrograms()  // Program studi
useHeroSliders()    // Hero slider homepage
useHomepage()       // Section homepage
useSettings()       // Site settings
useMenu()           // Navigation menu
useMenus()          // Full menu structure
useMedia()          // Media files
usePages()          // Dynamic CMS pages
useContact()        // Contact form
useReputations()    // Rankings & reputations
useSdgs()           // SDGs programs
useStatistics()     // University statistics
useSectionSettings() // Section visibility settings
useStatisticIcon()  // Statistics icons
useGallery()        // Gallery photos
```

---

## Stores yang Tersedia

```typescript
// Pinia stores
useNewsStore()         // stores/news.ts
useEventsStore()       // stores/events.ts
useHomepageStore()     // stores/homepage.ts
useMenuStore()         // stores/menu.ts
useHeroSlidersStore()  // stores/hero-sliders.ts
usePagesStore()        // stores/pages.ts
useReputationStore()   // stores/reputation.ts
useSdgsStore()         // stores/sdgs.ts
useSettingsStore()     // stores/settings.ts
useStatisticsStore()   // stores/statistics.ts
useAccessibilityStore() // stores/accessibility.ts
useQuickAccessStore()  // stores/quickAccess.ts
```

---

## Environment Variables

```bash
# .env (buat lokal, jangan commit)
NUXT_PUBLIC_API_BASE=http://localhost:8000
NUXT_PUBLIC_STORAGE_URL=http://localhost:8000/storage
```

---

## Deployment

| Lingkungan | Mode | Perintah |
|-----------|------|---------|
| Development | SSR + HMR | `npm run dev` |
| Production | SSR | `npm run build && npm run preview` |
| Static | SSG | `npm run generate` |
