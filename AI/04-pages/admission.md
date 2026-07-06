# 🎓 Admission (Penerimaan) — Spesifikasi Halaman

## Route

```
id: /pendaftaran
en: /admission
File: app/pages/pendaftaran/index.vue
```

---

## Tujuan Halaman

Mendorong calon mahasiswa untuk mendaftar. Ini adalah halaman konversi paling penting di website.

---

## Struktur Section

```
1. PageHeader           → "Penerimaan Mahasiswa Baru"
2. AdmissionHero        → Info cepat jalur masuk & deadline
3. RequirementsSection  → Persyaratan pendaftaran
4. ProgramsSection      → Daftar program studi (grid)
5. TimelineSection      → Tahapan pendaftaran
6. CostSection          → Info biaya (UKT/SPP)
7. ScholarshipSection   → Info beasiswa
8. FaqSection           → FAQ pendaftaran
9. CtaBanner            → Tombol daftar ke portal PMB
```

---

## Konten Kritis

```
✅ Tombol "Daftar Online" yang prominent di atas fold
✅ Deadline pendaftaran (dengan countdown timer jika perlu)
✅ Jalur masuk yang tersedia
✅ Syarat dokumen yang clear
✅ Nomor kontak panitia PMB
```

---

## SEO

```typescript
useHead({
  title: 'Penerimaan Mahasiswa Baru | UMPKU',
  meta: [
    { name: 'description', content: 'Informasi pendaftaran mahasiswa baru Universitas Muhammadiyah PKU Surakarta. Jalur masuk, syarat, dan biaya kuliah.' }
  ]
})
```

---

## Anti-Pattern

```
❌ Link daftar yang tersembunyi atau sulit ditemukan
❌ Informasi biaya yang tidak transparan
❌ Proses pendaftaran yang tidak jelas
❌ Halaman tanpa nomor kontak PMB
```
