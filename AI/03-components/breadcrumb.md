# 🍞 Breadcrumb — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen breadcrumb untuk navigasi halaman-dalam website.

---

## Spesifikasi

```
Posisi: Di bawah hero / di atas konten utama halaman dalam
Style: Text dengan separator (›)
Schema: BreadcrumbList (JSON-LD untuk SEO)
Mobile: Collapse otomatis (tampilkan hanya 2 level terakhir)
```

---

## Implementasi

```vue
<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb__list" role="list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb__item"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <NuxtLink
          v-if="index < items.length - 1"
          :to="item.to"
          class="breadcrumb__link"
          itemprop="item"
        >
          <span itemprop="name">{{ item.label }}</span>
        </NuxtLink>
        <span
          v-else
          class="breadcrumb__current"
          aria-current="page"
          itemprop="name"
        >
          {{ item.label }}
        </span>
        <meta :content="String(index + 1)" itemprop="position" />

        <!-- Separator (tidak ditampilkan untuk item terakhir) -->
        <span
          v-if="index < items.length - 1"
          class="breadcrumb__separator"
          aria-hidden="true"
        >
          ›
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>
```

---

## CSS

```css
.breadcrumb {
  padding: var(--space-4) 0;
}

.breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb__item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.breadcrumb__link {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7); /* Di hero gelap */
  text-decoration: none;
  transition: color var(--duration-fast);
}

.breadcrumb__link:hover {
  color: white;
}

.breadcrumb__current {
  font-size: 13px;
  color: white;
  font-weight: 500;
}

.breadcrumb__separator {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

/* Light variant (di luar hero) */
.breadcrumb--light .breadcrumb__link {
  color: var(--color-text-muted);
}

.breadcrumb--light .breadcrumb__link:hover {
  color: var(--color-accent);
}

.breadcrumb--light .breadcrumb__current {
  color: var(--color-text);
}

.breadcrumb--light .breadcrumb__separator {
  color: var(--color-border);
}
```

---

## Penggunaan di Halaman

```vue
<!-- Di hero halaman dalam -->
<HeroStatic :image="faculty.banner_image" :title="faculty.name">
  <BreadcrumbNav :items="[
    { label: 'Beranda', to: '/' },
    { label: 'Fakultas', to: '/fakultas' },
    { label: faculty.name }
  ]" />
</HeroStatic>
```

---

## Anti-Pattern

```
❌ Breadcrumb tanpa aria-label="Breadcrumb"
❌ Item aktif (current) dengan link yang bisa diklik
❌ Tidak ada aria-current="page" pada item terakhir
❌ Tidak menggunakan <ol> (breadcrumb adalah ordered list)
❌ Tidak ada Schema.org markup
❌ Separator menggunakan gambar (gunakan karakter atau CSS)
```
