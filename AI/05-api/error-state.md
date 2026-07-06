# ❌ Error State — Panduan Implementasi

## Tujuan Dokumen

Mendefinisikan cara menangani dan menampilkan error state yang konsisten dan user-friendly di seluruh website.

---

## Kategori Error

| Kode | Penyebab | Penanganan |
|------|----------|------------|
| 404 | Data tidak ditemukan | Tampilkan pesan & link kembali |
| 500 | Server error | Tampilkan pesan generik + retry |
| Network | Tidak ada koneksi | Tampilkan pesan offline + retry |
| Timeout | Request terlalu lama | Tampilkan retry button |
| Validation | Input tidak valid | Tampilkan error per field |

---

## Pola Error State di Section

```vue
<template>
  <!-- Loading -->
  <div v-if="loading">
    <NewsCardSkeleton v-for="i in 3" :key="i" />
  </div>

  <!-- Error -->
  <div 
    v-else-if="error"
    class="section-error"
    role="alert"
    aria-live="assertive"
  >
    <div class="section-error__icon" aria-hidden="true">⚠️</div>
    <h3 class="section-error__title">Konten tidak dapat dimuat</h3>
    <p class="section-error__message">{{ error }}</p>
    <button 
      class="btn btn-outline"
      @click="retry"
    >
      Coba Lagi
    </button>
  </div>

  <!-- Content -->
  <div v-else>
    <!-- ... -->
  </div>
</template>
```

---

## Error State CSS

```css
.section-error {
  text-align: center;
  padding: var(--space-16) var(--space-8);
  color: var(--color-text-muted);
}

.section-error__icon {
  font-size: 48px;
  margin-bottom: var(--space-4);
}

.section-error__title {
  font-family: var(--font-heading);
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: var(--space-3);
}

.section-error__message {
  font-size: 14px;
  margin-bottom: var(--space-6);
}
```

---

## Halaman 404

```vue
<!-- app/pages/error.vue atau error.vue di root -->
<template>
  <div class="error-page">
    <div class="container">
      <div class="error-page__content">
        <span class="error-page__code">404</span>
        <h1 class="error-page__title">Halaman Tidak Ditemukan</h1>
        <p class="error-page__message">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div class="error-page__actions">
          <NuxtLink to="/" class="btn btn-primary btn-lg">
            Kembali ke Beranda
          </NuxtLink>
          <button class="btn btn-ghost btn-lg" @click="$router.back()">
            Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## Form Validation Error

```vue
<template>
  <!-- Global form error (dari server) -->
  <div 
    v-if="submitError"
    class="form-alert form-alert--error"
    role="alert"
    aria-live="assertive"
  >
    <span class="la la-exclamation-circle" aria-hidden="true"></span>
    {{ submitError }}
  </div>

  <!-- Success state -->
  <div 
    v-if="submitSuccess"
    class="form-alert form-alert--success"
    role="status"
    aria-live="polite"
  >
    <span class="la la-check-circle" aria-hidden="true"></span>
    Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.
  </div>
</template>
```

---

## Error dari Composable

```typescript
// Di composable, error sudah di-handle dengan fallback data
// Di component, cek jika fallback tidak cukup:

const { articles, error, loading } = useNews()

// Pesan error yang user-friendly (bukan technical message)
const userFriendlyError = computed(() => {
  if (!error.value) return null
  if (error.value.includes('404')) return 'Konten tidak ditemukan'
  if (error.value.includes('Network')) return 'Periksa koneksi internet Anda'
  return 'Terjadi kesalahan. Silakan coba lagi.'
})
```

---

## Anti-Pattern Error

```
❌ Menampilkan pesan error teknis kepada user ("500 Internal Server Error")
❌ Tidak ada retry button
❌ Error state tanpa role="alert"
❌ Kosong total (blank page) saat error
❌ Error message yang menyalahkan user
❌ Tidak ada navigasi keluar dari error state
❌ Mengabaikan error dari composable (tidak ada v-else-if="error")
```
