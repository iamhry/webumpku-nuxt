# 🧱 Component Rules — Nuxt 4

## Tujuan Dokumen

Aturan wajib dalam pembuatan dan pengembangan komponen Vue di proyek UMPKU.

---

## Aturan Wajib

### 1. Script Setup + TypeScript

```vue
<!-- ✅ Wajib -->
<script setup lang="ts">
// Kode di sini
</script>

<!-- ❌ Dilarang -->
<script>
export default { }
</script>
```

### 2. Props dengan Interface TypeScript

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  variant: 'primary',
})
</script>
```

### 3. Emits dengan TypeScript

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', id: number): void
  (e: 'close'): void
}>()
</script>
```

### 4. Scoped CSS

```vue
<!-- ✅ Gunakan <style scoped> untuk CSS yang spesifik ke komponen -->
<style scoped>
.news-card { }
</style>

<!-- Atau CSS module jika perlu -->
<style module>
.card { }
</style>
```

---

## Struktur Komponen (Urutan Wajib)

```vue
<template>
  <!-- Template di atas -->
</template>

<script setup lang="ts">
// 1. Imports
// 2. Props & Emits
// 3. Composables & Store
// 4. Local State (UI only)
// 5. Computed
// 6. Watchers
// 7. Lifecycle Hooks
// 8. Methods/Functions
// 9. useHead (jika page component)
</script>

<style scoped>
/* CSS di bawah */
</style>
```

---

## Komponen Reusable vs Spesifik

```
Reusable (ada di shared/ atau di root komponen):
→ Dapat dipakai di banyak halaman/konteks
→ Menerima data via props, tidak hardcode
→ Contoh: BaseButton, SectionTitle, BreadcrumbNav

Spesifik:
→ Hanya dipakai di satu konteks
→ Boleh memiliki data yang lebih hardcode
→ Contoh: HeroSlider (hanya di homepage)
```

---

## Hindari Prop Drilling Berlebihan

```typescript
// ❌ Prop drilling terlalu dalam (> 3 level)
// Parent → Child → Grandchild → GreatGrandchild

// ✅ Gunakan composable atau provide/inject
// Di parent:
provide('theme', 'dark')

// Di deep child:
const theme = inject('theme')

// Atau gunakan Pinia store untuk state global
```

---

## Komponen yang Tidak Perlu Props

```vue
<!-- ✅ Komponen yang mengakses composable langsung -->
<!-- Baik untuk section component yang besar -->
<script setup lang="ts">
const { articles, loading } = useNews()
// Data langsung dari composable, tidak perlu props
</script>
```

---

## defineExpose (Jika Diperlukan)

```vue
<script setup lang="ts">
const isOpen = ref(false)

// Expose method ke parent yang menggunakan template ref
defineExpose({
  open: () => { isOpen.value = true },
  close: () => { isOpen.value = false }
})
</script>
```

---

## Single Root Element

```vue
<!-- ✅ OK di Vue 3 — multiple root elements diperbolehkan -->
<template>
  <div class="section">...</div>
  <div class="section">...</div>
</template>

<!-- Tapi untuk komponen yang punya CSS scoped, -->
<!-- lebih baik satu root untuk predictability -->
<template>
  <div class="news-section">
    <!-- Semua konten di dalam sini -->
  </div>
</template>
```

---

## Anti-Pattern Komponen

```
❌ Komponen yang terlalu besar (> 300 baris template)
   → Pecah menjadi sub-komponen

❌ Logic bisnis di dalam template
   → Pindahkan ke computed property atau method

❌ Async fetch langsung di komponen tanpa composable
   → Gunakan composable yang sudah ada

❌ Import store langsung di banyak komponen
   → Buat composable sebagai abstraction layer

❌ v-html tanpa sanitasi
   → Selalu gunakan DOMPurify.sanitize()

❌ Komponen duplikat dengan nama berbeda
   → Satu komponen, banyak varian via props

❌ CSS yang tidak scoped (bisa merusak komponen lain)
   → Selalu gunakan <style scoped>
```
