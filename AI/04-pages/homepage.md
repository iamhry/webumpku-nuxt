# 🏠 Homepage — Spesifikasi Halaman

## Tujuan Dokumen

Blueprint lengkap untuk halaman beranda (index.vue) website UMPKU.

---

## Route

```
id: /
en: /
File: app/pages/index.vue
```

---

## Struktur Section (Urutan dari Atas ke Bawah)

```
1. HeroSlider            → Hero fullscreen dengan slider
2. StatsCounter          → Angka statistik universitas
3. FacultySection        → Grid/carousel fakultas unggulan
4. NewsSection           → Berita terkini (3 artikel)
5. EventSection          → Agenda mendatang
6. ReputationSection     → Ranking & akreditasi
7. GallerySection        → Galeri foto kampus
8. CtaBanner             → Ajakan daftar/kontak
```

---

## Composable yang Digunakan

```typescript
const { slides } = useHeroSliders()
const { statistics } = useStatistics()
const { faculties } = useFaculties()
const { articles } = useNews()
const { events } = useEvents()
const { reputations } = useReputations()
const { galleries } = useGallery()
```

---

## SEO

```typescript
useHead({
  title: 'Universitas Muhammadiyah PKU Surakarta',
  meta: [
    {
      name: 'description',
      content: 'Universitas Muhammadiyah PKU Surakarta — Membangun insan cerdas berkarakter Islami, inovatif, dan berdaya saing global.'
    },
    { property: 'og:title', content: 'UMPKU — Universitas Muhammadiyah PKU Surakarta' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://umpku.ac.id' },
  ]
})
```

---

## Spesifikasi Section

### 1. Hero Slider
- Lihat: `AI/03-components/hero.md`
- Data: `useHeroSliders()` → slides dari CMS
- Min 1 slide, max 5 slide
- Fallback: satu slide statis dengan gambar default

### 2. Stats Counter
```
Layout: 4 kolom, teks center
Animasi: counter-up saat masuk viewport (jQuery counterup)
Data: useStatistics() → { label, value, suffix, icon }
Contoh: 
  - 5.000+ Mahasiswa Aktif
  - 8 Program Studi
  - 25 Tahun Pengalaman
  - 95% Tingkat Kelulusan
```

### 3. Faculty Section
```
Layout: Grid 3 kolom (desktop), 2 (tablet), 1 (mobile)
Data: useFaculties() → max 6 fakultas ditampilkan
CTA: "Lihat Semua Fakultas" → /fakultas
Setiap card: icon/gambar + nama + program studi count
Animasi: wow fadeInUp dengan stagger 0.1s
```

### 4. News Section
```
Layout: 1 featured (besar) + 2 kolom kanan
Data: useNews() → 3 artikel terbaru
CTA: "Lihat Semua Berita" → /berita
Fallback: data statis jika API gagal
```

### 5. Event Section
```
Layout: List horizontal, max 4 event
Data: useEvents() → upcoming events
CTA: "Lihat Semua Agenda" → /agenda
```

### 6. Reputation Section
```
Layout: Grid logo + nama lembaga akreditasi
Data: useReputations()
Konten: Logo BAN-PT, Dikti, dll
```

### 7. Gallery Section
```
Layout: Masonry atau grid
Data: useGallery()
Lightbox: Magnific Popup (sudah ada di legacy JS)
```

### 8. CTA Banner
```
Background: Foto kampus dengan dark overlay
Judul: "Siap Bergabung?"
CTA 1: "Daftar Sekarang" → /pendaftaran
CTA 2: "Hubungi Kami" → /kontak
```

---

## Template Halaman

```vue
<template>
  <div>
    <!-- Hero -->
    <HeroSlider />

    <!-- Stats -->
    <StatsSection />

    <!-- Fakultas -->
    <FacultySection :limit="6" />

    <!-- Berita -->
    <NewsSection :limit="3" />

    <!-- Event -->
    <EventSection :limit="4" />

    <!-- Reputasi -->
    <ReputationSection />

    <!-- Galeri -->
    <GallerySection />

    <!-- CTA -->
    <CtaBanner
      title="Siap Memulai Perjalanan Akademikmu?"
      primary-label="Daftar Sekarang"
      primary-url="/pendaftaran"
      secondary-label="Hubungi Kami"
      secondary-url="/kontak"
    />
  </div>
</template>

<script setup lang="ts">
// Data sudah difetch di level composable masing-masing section
useHead({
  title: 'Universitas Muhammadiyah PKU Surakarta',
  meta: [
    { name: 'description', content: 'UMPKU — Membangun insan cerdas berkarakter Islami.' }
  ]
})
</script>
```

---

## Anti-Pattern

```
❌ Fetch semua data di index.vue (delegasikan ke section component)
❌ Section yang terlalu banyak (> 8 section di homepage)
❌ Tidak ada CTA di homepage
❌ Hero tanpa fallback data
❌ Gambar tanpa lazy loading (kecuali hero yang LCP)
❌ Section yang tidak menggunakan composable yang ada
```
