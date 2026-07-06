# ℹ️ About Page — Spesifikasi Halaman

## Routes

```
/profil/[slug]  (id)
/profile/[slug] (en)
File: app/pages/[slug].vue (CMS-driven dynamic page)
```

---

## Tujuan Halaman

Membangun kepercayaan dan menampilkan identitas institusi. Halaman-halaman profil dikelola dari CMS (Filament) sebagai dynamic pages.

---

## Slug yang Umum

| Slug | Konten |
|------|--------|
| `sejarah` | Sejarah berdirinya universitas |
| `visi-misi` | Visi, Misi, Tujuan |
| `struktur-organisasi` | Bagan organisasi |
| `pimpinan` | Daftar pimpinan universitas |
| `fasilitas` | Fasilitas kampus |
| `kerjasama` | Kemitraan institusional |

---

## Struktur Halaman (Dynamic Page)

```
1. PageHeader      → Judul halaman dari CMS
2. DynamicContent  → Konten HTML dari CMS (v-html + DOMPurify)
3. RelatedPages    → Link ke halaman profil terkait
```

---

## Composable

```typescript
// Sudah ada di app/composables/usePages.ts
const { currentPage, loading, fetchPageBySlug } = usePages()
await fetchPageBySlug(slug)
```

---

## SEO

```typescript
useHead({
  title: computed(() => `${currentPage.value?.title} | UMPKU`),
  meta: [
    { name: 'description', content: computed(() => currentPage.value?.meta_description || '') }
  ]
})
```

---

## Structured Data (About Page)

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Tentang UMPKU",
  "url": "https://umpku.ac.id/profil/sejarah",
  "about": {
    "@type": "EducationalOrganization",
    "name": "Universitas Muhammadiyah PKU Surakarta"
  }
}
```
