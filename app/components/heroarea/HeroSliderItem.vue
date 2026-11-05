<script setup lang="ts">
import type { HeroSlider } from '~/types/hero-slider'

defineProps<{
  slide: HeroSlider
}>()

const isTrue = (val: any): boolean => {
  if (val === false || val === 0 || val === '0' || val === 'false' || val === 'f' || val === null || val === undefined) {
    return false
  }
  return val === true || val === 1 || val === '1' || val === 'true' || val === 't'
}

const formatFontSize = (size?: string | null) => {
  if (!size) return undefined
  return /^\d+$/.test(size.trim()) ? `${size.trim()}px` : size.trim()
}
</script>

<template>
  <div
    class="single-slide-item"
    :class="{
      'hide-on-mobile': !isTrue(slide.show_mobile),
      'hide-on-desktop': !isTrue(slide.show_desktop)
    }"
  >
    <!-- HTML Native Picture: Memaksa browser memilih file sesuai resolusi layar -->
    <picture class="slide-picture">
      <!-- Smartphone (<768px): Membaca gambar mobile potret -->
      <source media="(max-width: 767px)" :srcset="slide.mobile_image || slide.image" />
      <!-- Desktop/Tablet (>=768px): Membaca gambar desktop lanskap -->
      <source media="(min-width: 768px)" :srcset="slide.image" />
      <!-- Tag img utama fallback -->
      <img
        :src="slide.image"
        :alt="slide.title || 'Slide Image'"
        class="slide-img-element"
        loading="eager"
      />
    </picture>

    <!-- Overlay Gelap -->
    <div class="overlay"></div>

    <!-- Hero Area Content Wrapper -->
    <div
      v-if="isTrue(slide.show_title_desktop) || isTrue(slide.show_title_mobile) || slide.subtitle || slide.description || slide.button_text"
      class="hero-area-content"
    >
      <div class="hero-fluid-container">
        <div
          class="row"
          :class="{
            'justify-content-center': slide.text_align === 'center',
            'justify-content-end': slide.text_align === 'right',
            'justify-content-start': slide.text_align === 'left' || !slide.text_align
          }"
        >
          <div class="col-xxl-8 col-xl-9 col-lg-10 wow fadeInUp animated" data-wow-delay=".2s">
            <div
              class="rs-banner-content"
              :class="`align-${slide.text_align || 'left'}`"
            >
              <!-- Subtitle -->
              <span
                v-if="slide.subtitle"
                class="rs-banner-subtitle"
                :style="{
                  color: slide.subtitle_color || undefined,
                  fontSize: formatFontSize(slide.subtitle_font_size)
                }"
              >
                <span v-if="slide.text_align === 'right'" class="rs-border-line" :style="{ background: slide.subtitle_color || undefined }"></span>
                <span class="subtitle-text">{{ slide.subtitle }}</span>
                <span v-if="slide.text_align !== 'right'" class="rs-border-line" :style="{ background: slide.subtitle_color || undefined }"></span>
              </span>

              <!-- Title (Dihormati kontrol show_title_desktop / show_title_mobile) -->
              <h1
                v-if="slide.title && (isTrue(slide.show_title_desktop) || isTrue(slide.show_title_mobile))"
                class="rs-banner-title main-title text-3xl font-bold leading-tight md:text-6xl md:max-xl:text-5xl"
                :class="{
                  'hide-title-desktop': !isTrue(slide.show_title_desktop),
                  'hide-title-mobile': !isTrue(slide.show_title_mobile)
                }"
                :style="{
                  color: slide.title_color || '#ffffff',
                  fontSize: formatFontSize(slide.title_font_size)
                }"
                v-html="slide.title.replace(/\n/g, '<br>')"
              ></h1>

              <!-- Description -->
              <div
                v-if="slide.description"
                class="rs-banner-descrip"
                :style="{
                  color: slide.description_color || undefined,
                  fontSize: formatFontSize(slide.description_font_size)
                }"
              >
                <p v-html="slide.description.replace(/\n/g, '<br>')"></p>
              </div>

              <!-- CTA Button -->
              <div v-if="slide.button_text && slide.button_url" class="rs-banner-btn mt-3">
                <NuxtLink :to="slide.button_url" class="main-btn rs-btn has-theme-yellow has-icon has-bg">
                  {{ slide.button_text }}
                  <span class="icon-box">
                    <svg class="icon-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z" />
                    </svg>
                    <svg class="icon-second" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z" />
                    </svg>
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>