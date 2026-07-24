<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n, useSeoMeta, createError } from '#imports'
import { facilitiesService } from '~/services/facilities'
import { useMedia } from '~/composables/useMedia'
import type { Facility } from '~/types/facility'

const route = useRoute()
const { locale } = useI18n()
const { getImageUrl } = useMedia()

const slug = computed(() => route.params.slug as string)

const { data: facility, status, error, refresh } = await useAsyncData<Facility | null>(
  `facility-${slug.value}-${locale.value}`,
  () => facilitiesService.getFacilityBySlug(slug.value, locale.value),
  { watch: [slug, locale] }
)

watch(locale, () => {
  refresh()
})

if (import.meta.server && (error.value || !facility.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Fasilitas tidak ditemukan',
    fatal: true,
  })
}

const pageTitle = computed(() =>
  facility.value?.name ? `${facility.value.name} - Fasilitas UMPKU` : 'Fasilitas - UMPKU'
)
const pageDesc = computed(
  () => facility.value?.excerpt || facility.value?.description?.replace(/<[^>]+>/g, '').slice(0, 160) || ''
)
const pageImage = computed(() =>
  getImageUrl(facility.value?.image || facility.value?.icon || '')
)

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogImage: pageImage,
})

const heroImage = computed(() => getImageUrl(facility.value?.image || ''))
const iconUrl = computed(() => (facility.value?.icon ? getImageUrl(facility.value.icon) : ''))
</script>

<template>
  <div class="facility-detail-page">
    <!-- Loading -->
    <div v-if="status === 'pending' && !facility" class="facility-detail-loading">
      <div class="facility-detail-hero facility-detail-hero--skeleton" />
      <div class="dynamic-page-container py-5">
        <div class="dp-skeleton dp-skeleton-line short mb-4" />
        <div class="dp-skeleton dp-skeleton-line medium mb-3" />
        <div class="dp-skeleton dp-skeleton-line mb-3" />
      </div>
    </div>

    <!-- Not found -->
    <div
      v-else-if="error || !facility"
      class="facility-detail-empty dynamic-page-container py-5 text-center"
    >
      <div style="font-size: 4rem; color: #ccc; margin-bottom: 1.5rem;">404</div>
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin-bottom: 1rem;">
        Fasilitas tidak ditemukan
      </h2>
      <p style="color: #6b7280; margin-bottom: 2rem;">
        Maaf, fasilitas yang Anda cari tidak tersedia.
      </p>
      <NuxtLink to="/" class="btn btn-primary px-5 py-2 rounded-pill fw-bold">
        Kembali ke Beranda
      </NuxtLink>
    </div>

    <!-- Content -->
    <template v-else>
      <section
        class="facility-detail-hero"
        :style="facility.image ? { backgroundImage: `url(${heroImage})` } : undefined"
        :class="{ 'facility-detail-hero--plain': !facility.image }"
      >
        <div class="facility-detail-hero-overlay" />
        <div class="dynamic-page-container facility-detail-hero-inner">
          <nav class="facility-detail-breadcrumb" aria-label="Breadcrumb">
            <NuxtLink to="/">Beranda</NuxtLink>
            <span>/</span>
            <span>{{ facility.name }}</span>
          </nav>

          <div class="facility-detail-hero-content">
            <img
              v-if="iconUrl"
              :src="iconUrl"
              :alt="facility.name || 'Icon'"
              class="facility-detail-hero-icon"
            />
            <h1 class="facility-detail-title">{{ facility.name }}</h1>
            <p v-if="facility.excerpt" class="facility-detail-excerpt">{{ facility.excerpt }}</p>
          </div>
        </div>
      </section>

      <section class="facility-detail-body dynamic-page-section page-bg-white">
        <div class="dynamic-page-container">
          <div
            v-if="facility.description"
            class="facility-detail-prose page-prose dynamic-page-reading"
            v-html="facility.description"
          />
          <div v-else class="facility-detail-prose dynamic-page-reading">
            <p class="text-muted">Deskripsi fasilitas belum tersedia.</p>
          </div>

          <div v-if="facility.category" class="facility-detail-meta">
            <span class="facility-detail-badge">{{ facility.category }}</span>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.facility-detail-hero {
  position: relative;
  min-height: 420px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  color: #fff;
}
.facility-detail-hero--plain {
  background: linear-gradient(135deg, #071b3a 0%, #0b4ea2 100%);
}
.facility-detail-hero--skeleton {
  background: #e5e7eb;
  min-height: 360px;
}
.facility-detail-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 27, 58, 0.25) 0%, rgba(7, 27, 58, 0.85) 100%);
}
.facility-detail-hero--plain .facility-detail-hero-overlay {
  background: transparent;
}
.facility-detail-hero-inner {
  position: relative;
  z-index: 1;
  padding-top: 6rem;
  padding-bottom: 3rem;
  width: 100%;
}
.facility-detail-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}
.facility-detail-breadcrumb a {
  color: #fff;
  text-decoration: none;
}
.facility-detail-breadcrumb a:hover {
  text-decoration: underline;
}
.facility-detail-hero-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: brightness(0) invert(1);
}
.facility-detail-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 0.75rem;
  color: #fff;
}
.facility-detail-excerpt {
  font-size: 1.15rem;
  line-height: 1.6;
  max-width: 720px;
  margin: 0;
  opacity: 0.95;
}
.facility-detail-body {
  padding-top: 4rem;
  padding-bottom: 5rem;
}
.facility-detail-prose {
  margin-bottom: 2rem;
}
.facility-detail-meta {
  margin-top: 2rem;
}
.facility-detail-badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background: #f3f4f6;
  color: #071b3a;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 4px;
}
.facility-detail-empty {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.facility-detail-loading {
  min-height: 60vh;
}
</style>
