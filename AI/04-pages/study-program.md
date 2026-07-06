# 📚 Study Program Page — Spesifikasi Halaman

## Route

```
id: /program-studi/[slug]
en: /study-program/[slug]
File: app/pages/program-studi/[slug].vue
```

---

## Composable

```typescript
const { currentProgram, loading, error } = useStudyPrograms()
```

---

## Struktur Section

```
1. PageHeader          → Nama Program Studi + Jenjang (S1/S2/D3)
2. OverviewSection     → Deskripsi, profil lulusan
3. CurriculumSection   → Mata kuliah per semester
4. AccreditationBadge  → Status akreditasi BAN-PT
5. CareerSection       → Prospek karir lulusan
6. FacilitySection     → Laboratorium & fasilitas
7. TestimonialSection  → Testimoni mahasiswa/alumni
8. CtaBanner           → Daftar ke program ini
```

---

## SEO

```typescript
useHead({
  title: computed(() => `${currentProgram.value?.name} | UMPKU`),
  meta: [
    {
      name: 'description',
      content: computed(() => currentProgram.value?.description || '')
    }
  ]
})
```

---

## Informasi Wajib yang Harus Ditampilkan

```
✅ Nama program studi
✅ Jenjang (S1, S2, D3, D4, Sp)
✅ Status akreditasi
✅ Gelar yang diperoleh
✅ Masa studi
✅ Kontak / koordinator program
```
