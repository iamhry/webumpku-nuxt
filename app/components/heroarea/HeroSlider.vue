<script setup lang="ts">
import { onMounted, nextTick, computed, watch } from 'vue'
import { useHeroSliders } from '~/composables/useHeroSliders'
import { useLocale } from '~/composables/useLocale'
import type { HeroSlider } from '~/types/hero-slider'
import HeroSliderItem from './HeroSliderItem.vue'

declare var $: any

const { locale } = useLocale()
const { sliders, loading, fetchHeroSliders } = useHeroSliders()

// Fetch data SSR compatible
await fetchHeroSliders()

const isTrue = (val: any): boolean => {
  if (val === false || val === 0 || val === '0' || val === 'false' || val === 'f' || val === null || val === undefined) {
    return false
  }
  return val === true || val === 1 || val === '1' || val === 'true' || val === 't'
}

const rawSliders = computed<HeroSlider[]>(() => {
  if (sliders.value && sliders.value.length > 0) {
    return sliders.value
  }
  return [
    {
      id: 999,
      title: 'Universitas Muhammadiyah PKU',
      title_color: '#ffffff',
      title_font_size: null,
      subtitle: 'We Build only big things',
      subtitle_color: '#ffb800',
      subtitle_font_size: null,
      description: 'Industrial Revolution, in modern history, the process of change from an agrarian \nand handicraft economy to one dominated by industry and machine manufacturing.',
      description_color: '#ffffff',
      description_font_size: null,
      image: '/assets/img/slider/slide-1.jpg',
      mobile_image: null,
      button_text: 'Learn More',
      button_url: '/about',
      locale: locale.value,
      text_align: 'left',
      show_desktop: true,
      show_mobile: true,
      show_title_desktop: true,
      show_title_mobile: true
    }
  ]
})

// Filter hanya slide yang aktif
const finalSliders = computed<HeroSlider[]>(() => {
  return rawSliders.value.filter(slide => isTrue(slide.show_desktop) || isTrue(slide.show_mobile))
})

const initCarousel = () => {
  const $carousel = $('.homepage-slides')
  if ($carousel.length === 0) return

  if ($carousel.hasClass('owl-loaded')) {
    $carousel.trigger('destroy.owl.carousel')
    $carousel.removeClass('owl-hidden')
    $carousel.find('.owl-stage-outer').children().unwrap()
  }

  $carousel.owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    loop: finalSliders.value.length > 1,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    smartSpeed: 500,
    animateOut: 'fadeOut',
    navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"],
    responsive: {
      0: { items: 1, nav: false, dots: false },
      600: { items: 1, nav: false, dots: false },
      768: { items: 1, nav: false, dots: false },
      1100: { items: 1, nav: true, dots: false }
    }
  })

  $carousel.off('translate.owl.carousel').on('translate.owl.carousel', function () {
    $('.single-slide-item h1').removeClass('animated fadeInUp').css('opacity', '1')
    $('.single-slide-item .rs-banner-subtitle').removeClass('animated fadeInDown').css('opacity', '1')
    $('.single-slide-item p').removeClass('animated fadeInDown').css('opacity', '1')
    $('.single-slide-item a.main-btn').removeClass('animated fadeInDown').css('opacity', '1')
  })

  $carousel.off('translated.owl.carousel').on('translated.owl.carousel', function () {
    $('.single-slide-item h1').addClass('animated fadeInUp').css('opacity', '1')
    $('.single-slide-item .rs-banner-subtitle').addClass('animated fadeInDown').css('opacity', '1')
    $('.single-slide-item p').addClass('animated fadeInDown').css('opacity', '1')
    $('.single-slide-item a.main-btn').addClass('animated fadeInDown').css('opacity', '1')
  })
}

onMounted(async () => {
  await nextTick()
  initCarousel()
})

watch(finalSliders, async () => {
  if (import.meta.client) {
    await nextTick()
    initCarousel()
  }
})
</script>

<template>
  <!-- Loading Placeholder -->
  <div v-if="loading" class="homepage-slides">
    <div class="single-slide-item">
      <div class="hero-area-content">
        <div class="hero-fluid-container">
          <div class="row">
            <div class="col-xxl-7 col-xl-8 col-lg-10 wow fadeInUp animated" data-wow-delay=".2s">
              <div class="rs-banner-content align-left">
                <span class="rs-banner-subtitle">
                  <span class="subtitle-text">Loading...</span>
                  <span class="rs-border-line"></span>
                </span>
                <h1 class="rs-banner-title main-title text-3xl font-bold leading-tight md:text-7xl md:max-xl:text-5xl">
                  Memuat Konten...
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Carousel Render -->
  <div v-else class="homepage-slides owl-carousel" :key="locale">
    <HeroSliderItem
      v-for="slide in finalSliders"
      :key="slide.id"
      :slide="slide"
    />
  </div>
</template>

<style scoped>
:deep(.owl-stage-outer),
:deep(.owl-stage),
:deep(.owl-item) {
  height: 100%;
}

.homepage-slides {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #0b0f19;
}

/* Base Slider: Desktop */
:deep(.single-slide-item) {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  /* Rasio banner desktop widescreen */
  aspect-ratio: 16 / 9;
  min-height: 580px;
  height: auto !important;
}

/* Tag Picture & Element Gambar */
:deep(.slide-picture) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

:deep(.slide-img-element) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

/* Overlay Gelap */
:deep(.overlay) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.05) 35%,
    rgba(0, 0, 0, 0.35) 85%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 2;
  pointer-events: none;
}

/* Padding konten desktop */
:deep(.hero-area-content) {
  width: 100%;
  position: relative;
  z-index: 3;
  padding-top: clamp(160px, 18vw, 240px);
  padding-bottom: clamp(40px, 5vw, 80px);
}

:deep(.hero-fluid-container) {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-6, 40px);
  padding-right: var(--space-6, 40px);
  box-sizing: border-box;
}

/* Banner Content */
:deep(.rs-banner-content) {
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
}

/* Alignment Rules */
:deep(.rs-banner-content.align-left) {
  text-align: left;
  align-items: flex-start;
}
:deep(.rs-banner-content.align-left .rs-banner-btn) {
  display: flex;
  justify-content: flex-start;
}

:deep(.rs-banner-content.align-center) {
  text-align: center;
  align-items: center;
}
:deep(.rs-banner-content.align-center .rs-banner-subtitle) {
  justify-content: center;
}
:deep(.rs-banner-content.align-center .rs-banner-btn) {
  display: flex;
  justify-content: center;
  padding: 10px 40px;
}

:deep(.rs-banner-content.align-right) {
  text-align: right;
  align-items: flex-end;
}
:deep(.rs-banner-content.align-right .rs-banner-subtitle) {
  justify-content: flex-end;
}
:deep(.rs-banner-content.align-right .rs-banner-btn) {
  display: flex;
  justify-content: flex-end;
}

/* Elemen Subtitle, Title, Deskripsi */
:deep(.rs-banner-subtitle) {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(12px, 1.1vw, 16px);
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
}

:deep(.rs-border-line) {
  width: 48px;
  height: 2px;
  background: var(--brand-accent, #ffb800);
  display: inline-block;
  flex-shrink: 0;
}

:deep(.rs-banner-title) {
  margin-bottom: clamp(10px, 1.5vw, 18px);
  background: none !important;
  -webkit-text-fill-color: initial !important;
  line-height: 1.15;
}

:deep(.rs-banner-descrip) {
  display: none;
  max-width: 780px;
}

:deep(.rs-banner-descrip p) {
  margin-bottom: clamp(15px, 2vw, 24px);
  font-size: clamp(14px, 1.1vw, 18px);
  line-height: 1.6;
}

/* Tombol CTA dan Ikon Sesuai Template Asli */
:deep(.rs-banner-btn .rs-btn) {
  gap: 12px;
}

:deep(.icon-box) {
  position: relative;
  width: 14px;
  height: 14px;
  display: inline-flex;
  overflow: hidden;
}

:deep(.icon-first),
:deep(.icon-second) {
  width: 14px;
  height: 14px;
  fill: currentColor;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}

:deep(.icon-second) {
  transform: translateX(-100%);
}

:deep(.rs-btn:hover .icon-first) {
  transform: translateX(100%);
}

:deep(.rs-btn:hover .icon-second) {
  transform: translateX(0);
}

/* Navigasi Panah Owl Carousel */
:deep(.owl-nav) {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  pointer-events: none;
  z-index: 10;
}

:deep(.owl-prev),
:deep(.owl-next) {
  pointer-events: auto;
  width: 48px;
  height: 48px;
  line-height: 48px !important;
  border-radius: 50% !important;
  background: rgba(0, 0, 0, 0.45) !important;
  color: #fff !important;
  text-align: center;
  transition: background 0.3s ease;
}

:deep(.owl-prev:hover),
:deep(.owl-next:hover) {
  background: var(--brand-accent, #ffb800) !important;
  color: #111 !important;
}

/* Responsif: Layar Desktop & Tablet Lebar */
@media (min-width: 768px) {
  :deep(.single-slide-item.hide-on-desktop),
  :deep(.hide-title-desktop) {
    display: none !important;
  }
  :deep(.rs-banner-descrip) {
    display: block;
  }
}

@media (max-width: 1200px) {
  :deep(.single-slide-item) {
    aspect-ratio: 16 / 8;
    min-height: 520px;
  }
  :deep(.rs-banner-content) {
    padding: 0 10px;
  }
  :deep(.hero-fluid-container) {
    padding-left: var(--space-4, 24px);
    padding-right: var(--space-4, 24px);
  }
}

@media (max-width: 992px) {
  :deep(.single-slide-item) {
    aspect-ratio: 16 / 9;
    min-height: 460px;
  }
  :deep(.hero-area-content) {
    padding-top: 140px;
    padding-bottom: 40px;
  }
  :deep(.hero-fluid-container) {
    padding-left: var(--space-3, 16px);
    padding-right: var(--space-3, 16px);
  }
}

/* ========================================================
   RESPONSIF MODE MOBILE (PORTRAIT)
   ======================================================== */
@media (max-width: 767px) {
  :deep(.single-slide-item.hide-on-mobile),
  :deep(.hide-title-mobile) {
    display: none !important;
  }

  /* 1. Ganti rasio ke 9 / 16 (Full Portrait / Story / Banner HP Standar) */
  :deep(.single-slide-item) {
    aspect-ratio: 9 / 16;
    min-height: unset !important;
    height: auto !important;
    align-items: flex-end;
  }

  /* 2. Pastikan gambar tidak di-zoom berlebih */
  :deep(.slide-img-element) {
    object-position: center top;
  }

  :deep(.hero-area-content) {
    padding-top: 0;
    padding-bottom: 24px;
  }

  :deep(.rs-banner-content) {
    padding: 0;
  }

  :deep(.hero-fluid-container) {
    padding-left: 16px;
    padding-right: 16px;
  }

  :deep(.owl-nav) {
    display: none;
  }

  :deep(.rs-banner-title) {
    font-size: clamp(20px, 6vw, 28px) !important;
    line-height: 1.2 !important;
    margin-bottom: 8px !important;
  }

  :deep(.rs-banner-subtitle) {
    font-size: 12px !important;
    letter-spacing: 1px !important;
    margin-bottom: 6px !important;
  }

  :deep(.rs-border-line) {
    width: 28px !important;
  }
}
</style>