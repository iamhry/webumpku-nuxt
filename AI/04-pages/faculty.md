# 🏛️ Faculty Page — Spesifikasi Halaman

## Route

```
id: /fakultas/[slug]
en: /faculty/[slug]
File: app/pages/fakultas/[slug].vue
```

---

## Tujuan Halaman

Mempresentasikan fakultas secara lengkap untuk meyakinkan calon mahasiswa.

---

## Composable

```typescript
const { currentFaculty, loading, error, fetchFacultyBySlug } = useFaculties()
const slug = useRoute().params.slug as string
await fetchFacultyBySlug(slug)
```

---

## Struktur Section

```
1. PageHeader          → Nama Fakultas + banner image + breadcrumb
2. OverviewSection     → Deskripsi, visi misi, dekan
3. StudyProgramsGrid   → Program studi dalam fakultas ini
4. AccreditationBadge  → Status akreditasi
5. FacultyStats        → Jumlah dosen, mahasiswa, lab
6. ResearchSection     → Penelitian/publikasi
7. NewsSection         → Berita terkait fakultas
8. CtaBanner           → Ajakan daftar
```

---

## SEO

```typescript
useHead({
  title: computed(() => `${currentFaculty.value?.name} | UMPKU`),
  meta: [
    {
      name: 'description',
      content: computed(() => currentFaculty.value?.short_description || '')
    }
  ]
})
```

---

## Error Handling

```vue
<div v-if="loading">Loading...</div>
<div v-else-if="error">
  <p>Fakultas tidak ditemukan.</p>
  <NuxtLink to="/fakultas">← Kembali ke Daftar Fakultas</NuxtLink>
</div>
<div v-else>
  <!-- Konten fakultas -->
</div>
```

---

## Anti-Pattern

```
❌ Tidak ada error state saat slug tidak valid
❌ Halaman tanpa breadcrumb
❌ Program studi tidak ditampilkan di halaman fakultas
❌ Tidak ada CTA untuk daftar
```
