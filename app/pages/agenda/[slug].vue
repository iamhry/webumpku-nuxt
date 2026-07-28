<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useAsyncData, useI18n, useSeoMeta, useHead, createError } from '#imports'
import { eventService } from '~/services/events'
import type { EventItem } from '~/types/event'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => route.params.slug as string)

const mockEvent: EventItem = {
  id: 19,
  title: 'International Student Orientation (English)',
  slug: 'international-student-orientation',
  category: 'training',
  featured_image: undefined,
  excerpt: 'Short description about International Student Orientation.',
  event_start: '2026-07-26T20:47:51+00:00',
  event_end: '2026-07-30T20:47:51+00:00',
  location: '3843 Benton Mountain\nSouth Jaimemouth, PA 58438-1029',
  location_type: 'offline',
  registration_url: 'http://bauch.info/ab-est-vel-ullam-consequuntur-quo',
  is_featured: true
} as EventItem & { is_featured?: boolean }

const { data: event, pending } = await useAsyncData(
  `agenda-detail-${slug.value}-${locale.value}`,
  async () => {
    const apiEvent = await eventService.getEventBySlug(slug.value, { locale: locale.value })
    if (apiEvent) return apiEvent
    if (slug.value === mockEvent.slug) return mockEvent
    return null
  },
  { watch: [slug, locale] }
)

if (!pending.value && !event.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Event Not Found',
    fatal: true
  })
}

const monthsEn = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const monthsId = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const dateRangeText = computed(() => {
  if (!event.value?.event_start) return ''
  const start = new Date(event.value.event_start)
  if (Number.isNaN(start.getTime())) return ''

  const months = locale.value === 'en' ? monthsEn : monthsId
  const end = event.value.event_end ? new Date(event.value.event_end) : null
  const hasEnd = end && !Number.isNaN(end.getTime())

  if (!hasEnd) {
    return `${start.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`
  }

  const sameMonth =
    start.getMonth() === end!.getMonth() &&
    start.getFullYear() === end!.getFullYear()

  if (sameMonth) {
    return `${start.getDate()} - ${end!.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`
  }

  return `${start.getDate()} ${months[start.getMonth()]} ${start.getFullYear()} - ${end!.getDate()} ${months[end!.getMonth()]} ${end!.getFullYear()}`
})

const categoryLabel = computed(() => {
  const cat = (event.value?.category || '').toLowerCase()
  const mapId: Record<string, string> = {
    workshop: 'Workshop',
    conference: 'Konferensi',
    community_service: 'Pengabdian',
    webinar: 'Webinar',
    seminar: 'Seminar',
    training: 'Pelatihan',
    other: 'Kegiatan'
  }
  const mapEn: Record<string, string> = {
    workshop: 'Workshop',
    conference: 'Conference',
    community_service: 'Community Service',
    webinar: 'Webinar',
    seminar: 'Seminar',
    training: 'Training',
    other: 'Event'
  }
  const map = locale.value === 'en' ? mapEn : mapId
  return map[cat] || event.value?.category || (locale.value === 'en' ? 'Event' : 'Kegiatan')
})

const locationTypeLabel = computed(() => {
  const type = (event.value?.location_type || 'offline').toLowerCase()
  if (locale.value === 'en') {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }
  const map: Record<string, string> = {
    offline: 'Luring',
    online: 'Daring',
    hybrid: 'Hybrid'
  }
  return map[type] || type
})

const seoTitle = computed(() =>
  event.value ? `${event.value.title} - UMPKU` : 'Detail Agenda - UMPKU'
)
const seoDesc = computed(
  () => event.value?.excerpt || 'Detail agenda dan kegiatan UMPKU'
)
const seoImage = computed(
  () => event.value?.featured_image || '/assets/img/logo.png'
)

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  ogImage: seoImage,
  twitterCard: 'summary_large_image'
})

useHead({ title: seoTitle })
</script>

<template>
  <div v-if="pending && !event" class="evd-page">
    <div class="evd-loading">
      <div class="evd-spinner" />
      <p>{{ locale === 'en' ? 'Loading event details...' : 'Sedang memuat detail agenda...' }}</p>
    </div>
  </div>

  <div v-else-if="event" class="evd-page">
    <!-- Hero -->
    <header
      class="evd-hero"
      :class="{ 'evd-hero--image': !!event.featured_image }"
      :style="event.featured_image
        ? { backgroundImage: `url(${event.featured_image})` }
        : undefined"
    >
      <div class="evd-hero-overlay" />
      <div class="evd-hero-inner">
        <nav class="evd-breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">{{ locale === 'en' ? 'Home' : 'Beranda' }}</NuxtLink>
          <span>/</span>
          <NuxtLink to="/agenda">{{ locale === 'en' ? 'Events' : 'Agenda' }}</NuxtLink>
          <span>/</span>
          <span class="current">{{ event.title }}</span>
        </nav>

        <div v-if="!event.featured_image" class="evd-hero-fallback">
          <span class="evd-hero-kicker">UMPKU Agenda</span>
          <p class="evd-hero-fallback-title">{{ event.title }}</p>
        </div>
      </div>
    </header>

    <!-- Body -->
    <div class="evd-container">
      <div class="evd-grid">
        <!-- Main -->
        <main class="evd-main">
          <span class="evd-category">{{ categoryLabel }}</span>
          <h1 class="evd-title">{{ event.title }}</h1>

          <div class="evd-excerpt" v-if="event.excerpt">
            <p>{{ event.excerpt }}</p>
          </div>

          <div
            v-if="event.description"
            class="evd-description"
            v-html="event.description"
          />
        </main>

        <!-- Sidebar -->
        <aside class="evd-sidebar">
          <div class="evd-card">
            <h2 class="evd-card-title">
              {{ locale === 'en' ? 'Event Details' : 'Detail Kegiatan' }}
            </h2>

            <div class="evd-meta-list">
              <div class="evd-meta-item">
                <div class="evd-meta-icon" aria-hidden="true">
                  <i class="las la-calendar-alt" />
                </div>
                <div>
                  <h3>{{ locale === 'en' ? 'Date' : 'Tanggal' }}</h3>
                  <p>{{ dateRangeText }}</p>
                </div>
              </div>

              <div class="evd-meta-item">
                <div class="evd-meta-icon" aria-hidden="true">
                  <i class="las la-map-marker-alt" />
                </div>
                <div>
                  <h3>{{ locale === 'en' ? 'Location' : 'Lokasi' }}</h3>
                  <p class="evd-location">{{ event.location || 'Kampus UMPKU' }}</p>
                </div>
              </div>

              <div class="evd-meta-item">
                <div class="evd-meta-icon" aria-hidden="true">
                  <i class="las la-globe" />
                </div>
                <div>
                  <h3>{{ locale === 'en' ? 'Location Type' : 'Jenis Lokasi' }}</h3>
                  <p>{{ locationTypeLabel }}</p>
                </div>
              </div>
            </div>

            <a
              v-if="event.registration_url"
              :href="event.registration_url"
              target="_blank"
              rel="noopener noreferrer"
              class="evd-cta"
            >
              {{ locale === 'en' ? 'Register Now' : 'Daftar Sekarang' }}
              <i class="las la-arrow-right" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.evd-page {
  min-height: 70vh;
  background: #f7f8fa;
  color: #111827;
}

.evd-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 50vh;
  color: #6b7280;
}

.evd-spinner {
  width: 42px;
  height: 42px;
  border: 3px solid #e5e7eb;
  border-top-color: #0b2e59;
  border-radius: 50%;
  animation: evd-spin 0.8s linear infinite;
}

@keyframes evd-spin {
  to { transform: rotate(360deg); }
}

/* Hero */
.evd-hero {
  position: relative;
  min-height: 280px;
  display: flex;
  align-items: flex-end;
  background:
    radial-gradient(circle at 20% 20%, rgba(245, 179, 1, 0.35), transparent 45%),
    linear-gradient(135deg, #0b2e59 0%, #134e8a 48%, #0f172a 100%);
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.evd-hero--image {
  min-height: 360px;
}

.evd-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11, 46, 89, 0.25) 0%, rgba(11, 46, 89, 0.78) 100%);
  pointer-events: none;
}

.evd-hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 20px 40px;
}

.evd-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 20px;
}

.evd-breadcrumb a {
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  transition: color 0.2s ease;
}

.evd-breadcrumb a:hover {
  color: #EA5501;
}

.evd-breadcrumb .current {
  color: #fff;
  font-weight: 600;
  max-width: 420px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.evd-hero-fallback {
  max-width: 720px;
}

.evd-hero-kicker {
  display: inline-block;
  margin-bottom: 10px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(245, 179, 1, 0.18);
  border: 1px solid rgba(245, 179, 1, 0.45);
  color: #EA5501;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.evd-hero-fallback-title {
  margin: 0;
  color: #fff;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

/* Layout */
.evd-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px 72px;
}

.evd-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-top: 32px;
  position: relative;
  z-index: 2;
}

@media (min-width: 992px) {
  .evd-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 32px;
    margin-top: 40px;
  }

  .evd-main {
    grid-column: span 8;
  }

  .evd-sidebar {
    grid-column: span 4;
  }
}

.evd-main {
  background: #fff;
  border: 1px solid #e8ebf0;
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
}

@media (min-width: 768px) {
  .evd-main {
    padding: 40px 40px;
  }
}

.evd-category {
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #eef4ff;
  color: #0b2e59;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.evd-title {
  margin: 0 0 20px;
  color: #0f172a;
  font-size: clamp(28px, 3.6vw, 40px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.evd-excerpt p {
  margin: 0;
  color: #475569;
  font-size: 18px;
  line-height: 1.7;
}

.evd-description {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid #eef2f7;
  color: #334155;
  font-size: 16px;
  line-height: 1.8;
}

.evd-description :deep(p) {
  margin-bottom: 1rem;
}

.evd-sidebar {
  min-width: 0;
}

.evd-card {
  position: sticky;
  top: 100px;
  background: #fff;
  border: 1px solid #e8ebf0;
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
}

.evd-card-title {
  margin: 0 0 22px;
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
}

.evd-meta-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 28px;
}

.evd-meta-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.evd-meta-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f4f7fb;
  color: #0b2e59;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.evd-meta-item h3 {
  margin: 0 0 4px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.evd-meta-item p {
  margin: 0;
  color: #1e293b;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
}

.evd-location {
  white-space: pre-line;
}

.evd-cta {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, #EA5501 0%, #e09a00 100%);
  color: #111 !important;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-decoration: none !important;
  text-transform: uppercase;
  box-shadow: 0 10px 24px rgba(245, 179, 1, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.evd-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(245, 179, 1, 0.35);
  color: #111 !important;
}

.evd-cta i {
  font-size: 18px;
  transition: transform 0.2s ease;
}

.evd-cta:hover i {
  transform: translateX(3px);
}

@media (max-width: 991px) {
  .evd-card {
    position: static;
  }
}
</style>
