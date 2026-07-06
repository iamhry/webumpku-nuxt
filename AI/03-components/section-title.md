# 🏷️ Section Title — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen Section Title yang digunakan di awal setiap section untuk memberikan konteks dan hierarki visual.

---

## Varian

| Varian | Alignment | Kegunaan |
|--------|-----------|----------|
| `left` | Kiri | Section dengan konten di sebelah kanan |
| `center` | Tengah | Section grid simetris (default) |
| `split` | Kiri + deskripsi kanan | Section dengan banyak teks |

---

## Implementasi

```vue
<template>
  <div
    class="section-title"
    :class="[
      `section-title--${align}`,
      hasEyebrow && 'section-title--has-eyebrow'
    ]"
  >
    <!-- Eyebrow / Label -->
    <span v-if="eyebrow" class="section-title__eyebrow text-eyebrow">
      {{ eyebrow }}
    </span>

    <!-- Heading -->
    <component
      :is="headingTag"
      class="section-title__heading"
    >
      {{ title }}
    </component>

    <!-- Description -->
    <p v-if="description" class="section-title__description">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  eyebrow?: string
  description?: string
  align?: 'left' | 'center' | 'split'
  headingTag?: 'h1' | 'h2' | 'h3'
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  headingTag: 'h2',
})

const hasEyebrow = computed(() => !!props.eyebrow)
</script>
```

---

## CSS

```css
.section-title {
  margin-bottom: var(--space-16);
}

.section-title--center {
  text-align: center;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.section-title--left {
  text-align: left;
  max-width: 600px;
}

.section-title--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: end;
  max-width: none;
}

.section-title__eyebrow {
  display: block;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}

.section-title__heading {
  font-family: var(--font-heading);
  font-size: var(--text-h2-size);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 var(--space-5);
}

.section-title__description {
  font-size: clamp(15px, 1.5vw, 17px);
  line-height: 1.7;
  color: var(--color-text-muted);
  margin: 0;
}

/* Split: description di kolom kanan */
.section-title--split .section-title__heading {
  grid-column: 1;
  grid-row: 1 / 3;
  margin-bottom: 0;
}

.section-title--split .section-title__description {
  grid-column: 2;
  align-self: end;
}

@media (max-width: 767px) {
  .section-title--split {
    grid-template-columns: 1fr;
  }
}
```

---

## Penggunaan

```vue
<!-- Section Grid Simetris (center) -->
<SectionTitle
  eyebrow="Program Akademik"
  title="Fakultas & Program Studi"
  description="Temukan program studi yang sesuai dengan passion dan karirmu."
/>

<!-- Section dengan konten asimetris (left) -->
<SectionTitle
  align="left"
  eyebrow="Berita Terkini"
  title="Informasi Kampus"
/>

<!-- Split layout (judul kiri, deskripsi kanan) -->
<SectionTitle
  align="split"
  title="Kenapa UMPKU?"
  description="Kami berkomitmen memberikan pendidikan berkualitas..."
/>
```

---

## Anti-Pattern

```
❌ Menulis eyebrow + heading + description langsung di setiap section (tidak reusable)
❌ Section title tanpa margin-bottom yang cukup
❌ Terlalu banyak teks dalam description (max 2-3 kalimat)
❌ Eyebrow tanpa warna accent (kehilangan visual cue)
❌ Heading tag yang salah (H3 untuk judul section utama)
```
