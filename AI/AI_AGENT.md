# 🤖 AI_AGENT.md — Aturan Utama untuk AI Agent

> **WAJIB DIBACA SEBELUM MELAKUKAN APAPUN.**
> Dokumen ini adalah kontrak kerja antara AI Agent dan proyek UMPKU.

---

## ✅ Aturan Wajib (Tidak Dapat Dikecualikan)

### 1. Baca Handbook Sebelum Coding

```
SEBELUM menulis kode apapun, AI WAJIB:
1. Membaca README.md
2. Membaca file yang relevan di 01-project/
3. Membaca file yang relevan di 02-design-system/
4. Membaca file spesifik komponen/halaman yang akan dikerjakan
5. Membaca aturan Nuxt di 06-nuxt/
```

**Tidak ada pengecualian.** Bahkan untuk perubahan kecil sekalipun.

---

### 2. Fokus Utama AI

AI Agent pada proyek ini **hanya** bertanggung jawab atas:

| ✅ Boleh | ❌ Tidak Boleh |
|---------|--------------|
| UI/UX — struktur visual, layout, styling | Mengubah endpoint API |
| Komponen Vue — markup, CSS | Mengubah business logic di composable |
| Performa frontend — lazy load, code split | Menghapus composable/store yang ada |
| SEO — meta tags, structured data | Membuat ulang composable yang sudah ada |
| Aksesibilitas — ARIA, keyboard nav | Mengubah schema database |
| Animasi & transisi | Mengubah konfigurasi server |
| Responsive layout | Membuat file duplikat (HeroNew.vue, dll) |

---

### 3. Jangan Ubah API dan Business Logic

```
❌ DILARANG:
- Mengubah URL endpoint di services/
- Mengubah parameter request/response
- Mengubah logika validasi data
- Menghapus atau memodifikasi stores/
- Menghapus atau memodifikasi composables/

✅ BOLEH:
- Membaca data dari composable yang ada
- Menggunakan store state untuk UI
- Menambahkan computed property untuk presentasi data
- Menambahkan ref() untuk state UI (open/close, active, dll)
```

---

### 4. Kode Harus Production-Ready

Setiap kode yang ditulis AI HARUS:

- [ ] **Tidak ada `console.log()`** yang tertinggal
- [ ] **TypeScript** digunakan bila memungkinkan
- [ ] **Tidak ada inline style** (`style="..."`)
- [ ] **Tidak ada CSS duplikat** dengan file yang sudah ada
- [ ] **Aksesibel** — ARIA labels, keyboard navigation, semantic HTML
- [ ] **SEO-ready** — `useHead()` pada setiap page component
- [ ] **Error handling** — loading state dan error state ditangani
- [ ] **Responsive** — mobile-first, semua breakpoint tercakup
- [ ] **Performant** — lazy loading gambar, tidak ada blocking resource

---

### 5. Wajib Menjelaskan Perubahan

Setiap kali AI membuat atau mengubah file, **WAJIB** menyertakan penjelasan:

```markdown
## Perubahan yang Dilakukan

### File Baru
- `app/components/hero/HeroMain.vue` — Komponen hero utama homepage dengan slider

### File Diubah
- `app/pages/index.vue` — Menambahkan HeroMain component

### File TIDAK Diubah (Sengaja)
- `app/composables/useHeroSliders.ts` — Business logic tidak disentuh
- `app/stores/hero-sliders.ts` — State management tidak disentuh
```

---

## 🎯 Prinsip Kerja AI

### Prinsip 1: Single Source of Truth

```
Jika composable sudah ada → GUNAKAN, jangan buat ulang
Jika store sudah ada → GUNAKAN, jangan buat ulang  
Jika komponen sudah ada → PERLUAS, jangan duplikasi
```

### Prinsip 2: Design System First

```
SELALU ikuti design system di 02-design-system/ untuk:
- Ukuran typography
- Warna dan variabel CSS
- Spacing dan padding
- Breakpoint responsive
- Durasi animasi
```

### Prinsip 3: Semantic HTML

```html
<!-- ✅ Benar -->
<article class="news-card">
  <h2 class="news-card__title">...</h2>
  <p class="news-card__excerpt">...</p>
</article>

<!-- ❌ Salah -->
<div class="news-card">
  <div class="news-card__title">...</div>
  <div class="news-card__excerpt">...</div>
</div>
```

### Prinsip 4: Composition API Only

```vue
<!-- ✅ Benar -->
<script setup lang="ts">
const { articles, loading } = useNews()
</script>

<!-- ❌ Salah — Options API tidak digunakan -->
<script>
export default {
  data() { return {} }
}
</script>
```

### Prinsip 5: BEM untuk CSS Class

```css
/* ✅ Benar */
.hero { }
.hero__title { }
.hero__title--large { }
.hero__cta-group { }

/* ❌ Salah */
.heroTitle { }
.hero-title-large { }
#heroTitle { }
```

---

## 🚫 Anti-Pattern yang Dilarang

### Dilarang: File Duplikat

```
❌ HeroNew.vue, HeroV2.vue, HeroFinal.vue, HeroCopy.vue
✅ Hero.vue (satu file, di-improve langsung)
```

### Dilarang: Inline Style

```vue
<!-- ❌ -->
<div style="margin-top: 20px; color: red;">

<!-- ✅ -->
<div class="section-header">
```

### Dilarang: Magic Number

```css
/* ❌ */
.section { padding: 120px 0; }

/* ✅ — Gunakan CSS custom property */
.section { padding: var(--section-padding-y) 0; }
```

### Dilarang: Hardcode URL

```vue
<!-- ❌ -->
<img src="http://localhost:8000/storage/image.jpg">

<!-- ✅ -->
<img :src="useStorageUrl(item.image)">
```

### Dilarang: Hapus Composable yang Ada

```typescript
// ❌ JANGAN hapus atau modifikasi composable ini:
// useNews.ts, useEvents.ts, useFaculties.ts, dll
// Mereka adalah business logic yang sudah berjalan di production
```

---

## 📋 Checklist Sebelum Submit

Sebelum menyerahkan kode, verifikasi semua poin ini:

```
UI & Design:
[ ] Mengikuti typography scale dari design system
[ ] Menggunakan variabel warna (bukan hardcode hex)
[ ] Spacing mengikuti panduan (8px grid)
[ ] Responsive di semua breakpoint (320px - 1440px+)
[ ] Animasi menggunakan durasi dari design system

Kode:
[ ] Composition API + script setup
[ ] TypeScript (interface/type untuk props)
[ ] Tidak ada inline style
[ ] Tidak ada console.log
[ ] Nama file dan komponen mengikuti konvensi

SEO & Aksesibilitas:
[ ] useHead() terpasang di page component
[ ] Semantic HTML (article, section, nav, main)
[ ] Alt text pada semua gambar
[ ] ARIA label pada elemen interaktif
[ ] Keyboard navigable

Integrasi:
[ ] Menggunakan composable yang sudah ada
[ ] Error state ditangani
[ ] Loading state ditangani
[ ] Tidak ada endpoint baru yang tidak terdokumentasi
```

---

## 🗺️ Navigasi Handbook

Gunakan tabel ini untuk menemukan dokumentasi yang relevan:

| Kebutuhan | File yang Dibaca |
|-----------|-----------------|
| Membuat komponen baru | `02-design-system/` + `03-components/[nama].md` + `06-nuxt/component-rules.md` |
| Membuat halaman baru | `04-pages/[nama].md` + `06-nuxt/naming.md` + `05-api/seo.md` |
| Styling & layout | `02-design-system/typography.md` + `colors.md` + `spacing.md` + `layout.md` |
| Fetch data API | `05-api/api-standard.md` + `composable.md` |
| Loading & error | `05-api/loading-state.md` + `error-state.md` |
| Animasi | `02-design-system/animation.md` |
| Responsivitas | `02-design-system/responsive.md` |
| Aksesibilitas | `02-design-system/accessibility.md` |
| Performa | `06-nuxt/performance.md` + `image.md` |
| SSR/Hydration | `06-nuxt/ssr.md` |

---

*Dokumen ini adalah hukum. Tidak ada pengecualian tanpa persetujuan eksplisit dari tim frontend.*
