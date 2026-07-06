# 🔘 Button Component — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen button yang digunakan di seluruh website. Gunakan varian button yang tepat sesuai konteks.

---

## Varian Button

| Varian | Kegunaan | Warna |
|--------|----------|-------|
| `btn-primary` | CTA utama, aksi penting | Biru UMPKU |
| `btn-secondary` | CTA sekunder, aksi alternatif | Gold |
| `btn-outline` | Aksi tersier, less prominent | Border biru |
| `btn-outline-white` | Di atas background gelap | Border putih |
| `btn-ghost` | Inline action, minimal | Transparent |
| `btn-text` | Link-like, no background | Text only |

---

## Size Variants

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `btn-sm` | 36px | 8px 16px | 13px |
| `btn` (default) | 44px | 12px 24px | 15px |
| `btn-lg` | 54px | 16px 32px | 16px |
| `btn-xl` | 64px | 20px 48px | 18px |

---

## CSS Implementasi

```css
/* ─── Base Button ────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: 12px 24px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color var(--duration-fast) var(--ease-default),
              color var(--duration-fast) var(--ease-default),
              border-color var(--duration-fast) var(--ease-default),
              transform var(--duration-fast) var(--ease-spring),
              box-shadow var(--duration-fast) var(--ease-default);
  user-select: none;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  pointer-events: none;
}

/* ─── Primary ────────────────────────────── */
.btn-primary {
  background-color: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.btn-primary:hover {
  background-color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
  color: white;
}

/* ─── Secondary (Gold) ───────────────────── */
.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}

.btn-secondary:hover {
  background-color: var(--color-secondary-dark);
  border-color: var(--color-secondary-dark);
}

/* ─── Outline ────────────────────────────── */
.btn-outline {
  background-color: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn-outline:hover {
  background-color: var(--color-accent);
  color: white;
}

/* ─── Outline White (dark bg) ────────────── */
.btn-outline-white {
  background-color: transparent;
  color: white;
  border-color: white;
}

.btn-outline-white:hover {
  background-color: white;
  color: var(--color-accent);
}

/* ─── Ghost ──────────────────────────────── */
.btn-ghost {
  background-color: transparent;
  color: var(--color-text);
  border-color: transparent;
}

.btn-ghost:hover {
  background-color: var(--color-surface);
}

/* ─── Sizes ──────────────────────────────── */
.btn-sm {
  min-height: 36px;
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 6px;
}

.btn-lg {
  min-height: 54px;
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 10px;
}

.btn-xl {
  min-height: 64px;
  padding: 20px 48px;
  font-size: 18px;
  border-radius: 12px;
}

/* ─── Full Width ─────────────────────────── */
.btn-block {
  width: 100%;
}

/* ─── With Icon ──────────────────────────── */
.btn .btn-icon {
  font-size: 1.1em;
}
```

---

## Vue Component Implementation

```vue
<!-- BaseButton.vue -->
<template>
  <component
    :is="to ? NuxtLink : tag"
    class="btn"
    :class="[
      `btn-${variant}`,
      size !== 'md' && `btn-${size}`,
      block && 'btn-block',
      loading && 'btn-loading',
    ]"
    :to="to"
    :type="!to ? type : undefined"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn-spinner" aria-hidden="true"></span>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tag?: 'button' | 'a' | 'div'
  type?: 'button' | 'submit' | 'reset'
  to?: string
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
})
</script>
```

---

## Contoh Penggunaan

```vue
<!-- CTA Primary -->
<BaseButton to="/pendaftaran" variant="primary" size="lg">
  Daftar Sekarang
</BaseButton>

<!-- CTA Sekunder di dark background -->
<BaseButton to="/tentang" variant="outline-white">
  Pelajari Lebih Lanjut
</BaseButton>

<!-- Submit Form -->
<BaseButton type="submit" :loading="isSubmitting" :disabled="isSubmitting">
  Kirim Pesan
</BaseButton>

<!-- Icon Button -->
<button class="btn btn-ghost btn-sm" aria-label="Bagikan artikel">
  <span class="la la-share" aria-hidden="true"></span>
  Bagikan
</button>
```

---

## Anti-Pattern

```
❌ Menggunakan <a> untuk aksi (submit, toggle) — gunakan <button>
❌ Menggunakan <div> sebagai button tanpa role="button"
❌ Inline style untuk warna button
❌ Tidak ada disabled state
❌ Tidak ada loading state pada form submit
❌ Button tanpa type="button" (bisa trigger form submit)
❌ Teks button yang ambigu ("Klik di sini", "Submit")
❌ CTA lebih dari 2 pada satu section
❌ Button terlalu kecil di mobile (< 44px height)
```
