# 🚀 CTA (Call to Action) — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen CTA section yang digunakan untuk mendorong konversi — pendaftaran, kontak, atau eksplorasi lebih lanjut.

---

## Varian CTA Section

| Varian | Background | Kegunaan |
|--------|------------|----------|
| `cta-banner` | Dark brand + background image | Section akhir halaman |
| `cta-inline` | Surface (#F8F8F8) | Tengah-tengah konten |
| `cta-minimal` | White | Di antara section |

---

## CTA Banner (Full Width)

```vue
<template>
  <section
    class="cta-banner"
    :style="image ? { backgroundImage: `url(${image})` } : undefined"
    aria-labelledby="cta-heading"
  >
    <div class="cta-banner__overlay" aria-hidden="true"></div>
    <div class="container">
      <div class="cta-banner__content">
        <span v-if="eyebrow" class="text-eyebrow cta-banner__eyebrow">
          {{ eyebrow }}
        </span>
        <h2 id="cta-heading" class="cta-banner__title">
          {{ title }}
        </h2>
        <p v-if="description" class="cta-banner__description">
          {{ description }}
        </p>
        <div class="cta-banner__actions">
          <NuxtLink :to="primaryUrl" class="btn btn-secondary btn-lg">
            {{ primaryLabel }}
          </NuxtLink>
          <NuxtLink v-if="secondaryUrl" :to="secondaryUrl" class="btn btn-outline-white btn-lg">
            {{ secondaryLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  eyebrow?: string
  image?: string
  primaryLabel: string
  primaryUrl: string
  secondaryLabel?: string
  secondaryUrl?: string
}

defineProps<Props>()
</script>
```

---

## CSS

```css
.cta-banner {
  position: relative;
  padding: var(--section-padding-y) 0;
  background-color: var(--color-accent);
  background-size: cover;
  background-position: center;
  text-align: center;
}

.cta-banner__overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 22, 40, 0.75);
}

.cta-banner__content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 0 auto;
}

.cta-banner__eyebrow {
  color: var(--color-secondary);
  margin-bottom: var(--space-4);
  display: block;
}

.cta-banner__title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 4vw, 60px);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-6);
}

.cta-banner__description {
  font-size: clamp(15px, 1.5vw, 18px);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: var(--space-10);
}

.cta-banner__actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 767px) {
  .cta-banner__actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-banner__actions .btn {
    width: 100%;
    max-width: 320px;
  }
}
```

---

## Penggunaan Standar

```vue
<!-- Di halaman homepage, fakultas, program studi -->
<CtaBanner
  eyebrow="Bergabunglah Bersama Kami"
  title="Siap Memulai Perjalanan Akademikmu?"
  description="Daftarkan diri sekarang dan jadilah bagian dari komunitas akademik UMPKU yang dinamis."
  primary-label="Daftar Sekarang"
  primary-url="/pendaftaran"
  secondary-label="Hubungi Kami"
  secondary-url="/kontak"
  image="/assets/img/cta-bg.jpg"
/>
```

---

## Posisi CTA dalam Halaman

```
Homepage:
  → CTA Banner setelah section Reputasi (sebelum footer)

Halaman Fakultas:
  → CTA Banner di akhir (ajak daftar)

Halaman Berita:
  → CTA Inline di tengah artikel (subscribe newsletter)

Halaman Kontak:
  → CTA Minimal di atas form (agar tidak redundant dengan form)
```

---

## Anti-Pattern

```
❌ CTA tanpa heading yang jelas (harus komunikatif)
❌ Terlalu banyak CTA dalam satu halaman (max 2-3 CTA section)
❌ Primary dan secondary CTA dengan urgency yang sama
❌ CTA yang hanya berupa tombol tanpa konteks (heading/deskripsi)
❌ Warna CTA yang tidak kontras dengan background
❌ CTA yang tidak relevan dengan konten halaman
❌ Tombol CTA dengan teks generik ("Klik di sini", "Lihat lebih lanjut")
```
