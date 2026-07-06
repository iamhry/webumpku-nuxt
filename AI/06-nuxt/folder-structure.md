# 📁 Folder Structure — Nuxt 4

## Tujuan Dokumen

Mendefinisikan struktur folder proyek dan aturan penempatan file. Konsistensi penempatan file krusial untuk maintainability.

---

## Struktur Lengkap Proyek

```
webumpku/
│
├── app/                        # Source utama aplikasi
│   ├── app.vue                 # Root component (layout wrapper)
│   │
│   ├── components/             # Komponen UI
│   │   ├── about/              # Komponen halaman About
│   │   ├── accessibility/      # Komponen aksesibilitas
│   │   ├── blog/               # Blog/news components
│   │   ├── common/             # Komponen umum (shared utilities)
│   │   ├── contact/            # Komponen halaman kontak
│   │   ├── counter/            # Komponen statistik counter
│   │   ├── cta/                # Call-to-action sections
│   │   ├── event/              # Komponen event/agenda
│   │   ├── faculty/            # Komponen fakultas
│   │   ├── footer/             # Footer components
│   │   ├── header/             # Header/navbar components
│   │   ├── heroarea/           # Hero section components
│   │   ├── home/               # Section-section homepage
│   │   ├── layout/             # Layout wrapper components
│   │   ├── navigation/         # Navigasi (menu, breadcrumb)
│   │   ├── news/               # Komponen berita
│   │   ├── page/               # Komponen halaman dinamis CMS
│   │   │   └── sections/       # Section types untuk dynamic page
│   │   ├── sdgs/               # Komponen SDGs
│   │   ├── sections/           # Reusable section components
│   │   ├── services/           # Komponen layanan kampus
│   │   ├── shared/             # Shared/reusable components
│   │   ├── study-program/      # Komponen program studi
│   │   └── testimonial/        # Komponen testimonial
│   │
│   ├── composables/            # ⚠️ Business logic — JANGAN UBAH
│   │   ├── useContact.ts
│   │   ├── useEvents.ts
│   │   ├── useFaculties.ts
│   │   └── ... (lihat technology-stack.md)
│   │
│   ├── layouts/                # Layout templates
│   │   └── default.vue         # Layout utama dengan navbar + footer
│   │
│   ├── locales/                # Terjemahan i18n
│   │   ├── id.json             # Bahasa Indonesia
│   │   └── en.json             # English
│   │
│   ├── pages/                  # Route-based pages
│   │   ├── index.vue           # Homepage (/)
│   │   ├── berita/
│   │   │   ├── index.vue       # Listing berita (/berita)
│   │   │   └── [slug].vue      # Detail berita (/berita/[slug])
│   │   ├── agenda/
│   │   │   ├── index.vue       # Listing agenda
│   │   │   └── [slug].vue      # Detail agenda
│   │   ├── fakultas/
│   │   │   └── [slug].vue      # Detail fakultas
│   │   ├── program-studi/
│   │   │   └── [slug].vue      # Detail program studi
│   │   ├── kontak/
│   │   │   └── index.vue       # Halaman kontak
│   │   └── [slug].vue          # Dynamic CMS pages
│   │
│   ├── services/               # ⚠️ API services — JANGAN UBAH
│   │   ├── news.ts
│   │   ├── events.ts
│   │   └── ...
│   │
│   ├── stores/                 # ⚠️ Pinia stores — JANGAN UBAH
│   │   ├── news.ts
│   │   ├── events.ts
│   │   └── ...
│   │
│   ├── types/                  # TypeScript interfaces
│   │   ├── news.ts
│   │   ├── event.ts
│   │   └── ...
│   │
│   └── views/                  # Complex view components
│       └── (halaman yang sangat kompleks)
│
├── public/                     # Static files (langsung diakses)
│   └── assets/
│       ├── css/                # CSS files (bootstrap, custom, dll)
│       ├── js/                 # Legacy JS files
│       └── img/                # Gambar statis
│
├── plugins/                    # Nuxt plugins
├── i18n/                       # i18n config
├── nuxt.config.ts              # Konfigurasi Nuxt
└── AI/                         # Handbook ini (JANGAN hapus)
```

---

## Aturan Penempatan File

### Komponen Baru

```
1. Identifikasi modul: news? event? faculty? → masuk ke folder yang sesuai
2. Jika reusable di banyak modul → masuk ke shared/
3. Jika hanya untuk section homepage → masuk ke home/
4. Jika untuk dynamic page CMS → masuk ke page/sections/
```

### Page Baru

```
Ikuti konvensi Nuxt:
- Route /berita → pages/berita/index.vue
- Route /berita/:slug → pages/berita/[slug].vue
- Route /profil/:slug → pages/[slug].vue (sudah ada, CMS dynamic)
```

---

## Nuxt 4 App Directory

Proyek ini menggunakan **app directory** Nuxt 4, bukan root-level:
- Semua source code ada di `/app/`
- Nuxt otomatis mengenali `/app/pages/`, `/app/components/`, dll
