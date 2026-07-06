# 🦸 Hero Section — Komponen Dokumentasi

## Tujuan Dokumen

Spesifikasi lengkap untuk komponen Hero yang digunakan di halaman utama dan halaman landing lainnya.

---

## Varian Hero

| Varian | Kegunaan | Contoh Halaman |
|--------|----------|---------------|
| `hero-slider` | Homepage — dengan slider otomatis | index.vue |
| `hero-static` | Halaman dalam — gambar statis | fakultas/[slug].vue |
| `hero-minimal` | Halaman konten — tanpa gambar besar | kontak/index.vue |
| `hero-video` | Campaign page — dengan background video | - |

---

## Hero Slider (Homepage)

### Spesifikasi

```
Ukuran: 100vw × 100vh (min-height 600px)
Background: Gambar fullscreen dengan overlay gelap
Konten: Eyebrow + H1 + Subtitle + 2 CTA button
Slider: Otomatis 5 detik, pause on hover
Indicator: Dot di bawah
Transisi: Fade atau slide
```

### Struktur HTML

```vue
<template>
  <section class="hero-slider" aria-label="Hero Slideshow">
    <!-- Slide Container -->
    <div class="hero-slider__track">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="hero-slider__slide"
        :class="{ 'is-active': currentSlide === index }"
        :aria-hidden="currentSlide !== index"
      >
        <!-- Background Image -->
        <div class="hero-slider__bg">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="hero-slider__image"
            loading="eager"
          />
          <div class="hero-slider__overlay" aria-hidden="true"></div>
        </div>

        <!-- Content -->
        <div class="container">
          <div class="hero-slider__content">
            <span class="text-eyebrow hero-slider__eyebrow">
              {{ slide.eyebrow }}
            </span>
            <h1 class="text-h1 hero-slider__title">
              {{ slide.title }}
            </h1>
            <p class="hero-slider__subtitle">
              {{ slide.subtitle }}
            </p>
            <div class="hero-slider__cta">
              <NuxtLink :to="slide.primary_url" class="btn btn-primary btn-lg">
                {{ slide.primary_label }}
              </NuxtLink>
              <NuxtLink :to="slide.secondary_url" class="btn btn-outline-white btn-lg">
                {{ slide.secondary_label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="hero-slider__nav" role="tablist" aria-label="Pilih slide">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        role="tab"
        class="hero-slider__dot"
        :class="{ 'is-active': currentSlide === index }"
        :aria-selected="currentSlide === index"
        :aria-label="`Slide ${index + 1} dari ${slides.length}`"
        @click="goToSlide(index)"
      />
    </div>

    <!-- Prev/Next -->
    <button
      class="hero-slider__arrow hero-slider__arrow--prev"
      aria-label="Slide sebelumnya"
      @click="prevSlide"
    >
      <span class="la la-angle-left" aria-hidden="true"></span>
    </button>
    <button
      class="hero-slider__arrow hero-slider__arrow--next"
      aria-label="Slide berikutnya"
      @click="nextSlide"
    >
      <span class="la la-angle-right" aria-hidden="true"></span>
    </button>
  </section>
</template>
```

### Script

```vue
<script setup lang="ts">
const { slides, loading } = useHeroSliders()

const currentSlide = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = 
    (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const startTimer = () => {
  timer = setInterval(nextSlide, 5000)
}

const stopTimer = () => {
  if (timer) clearInterval(timer)
}

onMounted(() => startTimer())
onUnmounted(() => stopTimer())
</script>
```

### CSS

```css
.hero-slider {
  position: relative;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
}

.hero-slider__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-default);
}

.hero-slider__slide.is-active {
  opacity: 1;
}

.hero-slider__bg {
  position: absolute;
  inset: 0;
}

.hero-slider__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-slider__overlay {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero);
}

.hero-slider__content {
  position: relative;
  z-index: 2;
  padding: 200px 0 120px;
  max-width: 700px;
  color: white;
}

.hero-slider__eyebrow {
  color: var(--color-secondary);  /* Gold */
  margin-bottom: var(--space-3);
  display: block;
}

.hero-slider__title {
  color: white;
  margin-bottom: var(--space-6);
}

.hero-slider__subtitle {
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: var(--space-10);
  max-width: 540px;
}

.hero-slider__cta {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Navigation dots */
.hero-slider__nav {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.hero-slider__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: none;
  cursor: pointer;
  transition: all var(--duration-fast);
}

.hero-slider__dot.is-active {
  width: 24px;
  border-radius: 4px;
  background: white;
}

@media (max-width: 767px) {
  .hero-slider__content {
    padding: 140px 0 100px;
  }
  
  .hero-slider__cta {
    flex-direction: column;
  }
  
  .hero-slider__cta .btn {
    width: 100%;
    text-align: center;
  }
}
```

---

## Hero Static (Halaman Dalam)

```vue
<template>
  <section class="hero-static" :style="{ backgroundImage: `url(${image})` }">
    <div class="hero-static__overlay" aria-hidden="true"></div>
    <div class="container">
      <div class="hero-static__content">
        <BreadcrumbNav />
        <h1 class="text-h1 hero-static__title">{{ title }}</h1>
        <p v-if="subtitle" class="hero-static__subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  image: string
}
defineProps<Props>()
</script>
```

---

## Anti-Pattern

```
❌ Dua komponen hero terpisah (HeroHomepage.vue + HeroInner.vue yang tidak reusable)
❌ CTA lebih dari 2 dalam satu hero
❌ Gambar hero tanpa overlay (teks tidak terbaca)
❌ H1 tidak ada dalam hero
❌ Slider tanpa kontrol pause
❌ Slider tanpa keyboard navigation
❌ Hero yang terlalu pendek di mobile (< 400px)
❌ Teks hero yang terlalu panjang (max 2 baris untuk H1)
```
