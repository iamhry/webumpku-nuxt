# ⏳ Loading State — Panduan Implementasi

## Tujuan Dokumen

Mendefinisikan cara menampilkan loading state yang konsisten dan accessible di seluruh website.

---

## Prinsip Loading State

1. **Always handle loading** — Tidak boleh ada komponen yang fetch data tanpa loading state
2. **Accessible** — Gunakan `role="status"` dan `aria-live="polite"`
3. **Meaningful** — Loading indicator yang sesuai konteks (skeleton vs spinner)
4. **Performant** — Skeleton lebih baik daripada spinner untuk content area

---

## Tipe Loading State

### 1. Skeleton Loader (Direkomendasikan untuk content)

```vue
<!-- Skeleton untuk News Card -->
<template>
  <div class="news-card-skeleton" aria-busy="true" aria-label="Memuat berita">
    <div class="skeleton skeleton--image"></div>
    <div class="skeleton-body">
      <div class="skeleton skeleton--text skeleton--text-sm"></div>
      <div class="skeleton skeleton--text skeleton--text-lg"></div>
      <div class="skeleton skeleton--text skeleton--text-md"></div>
    </div>
  </div>
</template>
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    #e8e8e8 50%,
    var(--color-surface) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 6px;
}

@keyframes skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton--image   { aspect-ratio: 16/9; width: 100%; }
.skeleton--text    { height: 14px; margin-bottom: 8px; }
.skeleton--text-sm { width: 30%; }
.skeleton--text-lg { width: 90%; height: 20px; }
.skeleton--text-md { width: 70%; }

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
```

### 2. Spinner (Untuk aksi, submit, dll)

```vue
<template>
  <div 
    class="loading-spinner" 
    role="status" 
    aria-live="polite"
    aria-label="Memuat..."
  >
    <div class="spinner" aria-hidden="true"></div>
    <span class="sr-only">Memuat...</span>
  </div>
</template>
```

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Pola Penggunaan di Section

```vue
<template>
  <section class="news-section">
    <div class="container">
      <SectionTitle title="Berita Terkini" />

      <!-- Loading State -->
      <div v-if="loading" class="news-grid" aria-busy="true">
        <NewsCardSkeleton v-for="i in 3" :key="i" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="section-error">
        <p>{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else class="news-grid">
        <NewsCard 
          v-for="article in articles" 
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>
```

---

## Loading untuk Form Submit

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Form fields... -->
    
    <BaseButton 
      type="submit"
      :loading="isSubmitting"
      :disabled="isSubmitting"
    >
      <span v-if="isSubmitting">
        <span class="spinner spinner--sm" aria-hidden="true"></span>
        Mengirim...
      </span>
      <span v-else>Kirim Pesan</span>
    </BaseButton>
  </form>
</template>
```

---

## Loading Page Transition

```vue
<!-- app/app.vue -->
<template>
  <div>
    <NuxtLoadingBar color="#1A4D8F" height="3" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

---

## Anti-Pattern Loading

```
❌ Tidak ada loading state sama sekali
❌ Loading state tanpa role="status" atau aria-live
❌ Spinner untuk konten besar (gunakan skeleton)
❌ Loading yang tidak hilang jika data sudah ada
❌ Flash of content (konten muncul sebentar lalu hilang saat refetch)
❌ Terlalu banyak skeleton di satu halaman (memperparah anxiety)
```
