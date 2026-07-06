# 🔬 Research Page — Spesifikasi Halaman

## Route

```
/penelitian
File: app/pages/penelitian/index.vue
```

---

## Tujuan Halaman

Menampilkan kapasitas penelitian UMPKU untuk membangun kepercayaan akademik dan menarik mitra.

---

## Struktur Section

```
1. PageHeader          → "Penelitian & Pengabdian"
2. ResearchHighlights  → Highlight penelitian terbaru
3. ResearchCategories  → Area penelitian utama
4. PublicationList     → Daftar publikasi ilmiah
5. ResearchCenters     → Pusat studi dan laboratorium
6. PartnerSection      → Mitra penelitian
7. CtaBanner           → Kolaborasi penelitian
```

---

## SEO

```typescript
useHead({
  title: 'Penelitian & Pengabdian | UMPKU',
  meta: [
    { name: 'description', content: 'Pusat penelitian dan pengabdian masyarakat UMPKU. Temukan publikasi ilmiah dan area penelitian unggulan.' }
  ]
})
```

---

## Structured Data

```typescript
// Schema.org untuk institusi penelitian
{
  "@type": "ResearchOrganization",
  "name": "UMPKU Research Center",
  "parentOrganization": {
    "@type": "EducationalOrganization",
    "name": "Universitas Muhammadiyah PKU Surakarta"
  }
}
```
