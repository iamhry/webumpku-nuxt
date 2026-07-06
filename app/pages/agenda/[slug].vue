<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useAsyncData, useI18n, useSeoMeta, useHead } from '#imports'
import { eventService } from '~/services/events'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => route.params.slug as string)

const { data: event, error, pending } = await useAsyncData(
  `agenda-detail-${slug.value}-${locale.value}`,
  () => eventService.getEventBySlug(slug.value, { locale: locale.value }),
  {
    lazy: true,
    watch: [slug, locale]
  }
)

const dateText = computed(() => {
  if (!event.value) return ''
  const start = new Date(event.value.event_start)
  if (isNaN(start.getTime())) return ''

  const formatFullDate = (d: Date) => {
    let days, months
    if (locale.value === 'en') {
      days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const hours = String(d.getHours()).padStart(2, '0')
      const minutes = String(d.getMinutes()).padStart(2, '0')
      return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} (${hours}.${minutes} WIB)`
    } else {
      days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      const hours = String(d.getHours()).padStart(2, '0')
      const minutes = String(d.getMinutes()).padStart(2, '0')
      return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} (${hours}.${minutes} WIB)`
    }
  }

  let text = formatFullDate(start)
  if (event.value.event_end) {
    const end = new Date(event.value.event_end)
    if (!isNaN(end.getTime())) {
      text += ` s/d ${formatFullDate(end)}`
    }
  }
  return text
})

const timeText = computed(() => {
  if (!event.value) return '00.00 WIB'
  const start = new Date(event.value.event_start)
  if (isNaN(start.getTime())) return '00.00 WIB'
  
  const formatTime = (d: Date) => {
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${hours}.${minutes}`
  }
  
  let range = formatTime(start)
  if (event.value.event_end) {
    const end = new Date(event.value.event_end)
    if (!isNaN(end.getTime())) {
      range += ` - ${formatTime(end)}`
    }
  }
  return range + ' WIB'
})

const categoryLabel = computed(() => {
  if (!event.value) return ''
  const cat = event.value.category || ''
  const mapping: Record<string, string> = {
    workshop: 'Workshop',
    conference: 'Konferensi',
    community_service: 'Pengabdian',
    webinar: 'Webinar',
    seminar: 'Seminar',
    training: 'Pelatihan',
    other: 'Kegiatan'
  }
  return mapping[cat.toLowerCase()] || cat || 'Kegiatan'
})

// SEO
const seoTitle = computed(() => event.value ? `${event.value.title} - UMPKU` : 'Detail Agenda - UMPKU')
const seoDesc = computed(() => event.value?.excerpt || 'Detail agenda dan kegiatan UMPKU')
const seoImage = computed(() => event.value?.featured_image || '/assets/img/bread-bg.jpg')

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  ogImage: seoImage,
  twitterCard: 'summary_large_image'
})

useHead({
  title: seoTitle
})
</script>

<template>
  <div class="events-detail-area">
    <div class="container event-schedule-container">
      
      <!-- Loading State -->
      <div v-if="pending && !event" class="text-center py-5">
        <div class="spinner-border" role="status" style="width: 3rem; height: 3rem; color: #0b7a75;">
          <span class="sr-only">Loading...</span>
        </div>
        <p class="text-muted mt-3">Sedang memuat detail agenda...</p>
      </div>

      <!-- Error / 404 State -->
      <div v-else-if="error || !event" class="text-center py-5 text-danger">
        <i class="las la-exclamation-triangle" style="font-size: 64px;"></i>
        <h4 class="mt-4 font-weight-bold">Agenda tidak ditemukan.</h4>
        <p class="text-muted">Tautan mungkin sudah kedaluwarsa atau agenda telah dihapus.</p>
        <NuxtLink to="/agenda" class="event-btn register-btn mt-4">Kembali ke Agenda</NuxtLink>
      </div>

      <!-- Loaded Content -->
      <div v-else>
        <!-- Header & Breadcrumbs -->
        <div class="event-detail-header">
          <div class="faculty-breadcrumb mb-4">
            <NuxtLink to="/">{{ locale === 'en' ? 'Home' : 'Beranda' }}</NuxtLink>
            <span class="separator" style="margin: 0 10px; color: #a0aec0;">/</span>
            <NuxtLink to="/agenda">{{ locale === 'en' ? 'Events' : 'Agenda' }}</NuxtLink>
            <span class="separator" style="margin: 0 10px; color: #a0aec0;">/</span>
            <span>{{ event.title }}</span>
          </div>

          <span class="event-category-badge mb-3">{{ categoryLabel }}</span>
          <h1 class="event-detail-title">{{ event.title }}</h1>
          
          <div class="event-meta-info">
            <div class="event-meta-info-item">
              <i class="las la-calendar"></i>
              <span>{{ dateText }}</span>
            </div>
            <div class="event-meta-info-item" v-if="event.location">
              <i class="las la-map-marker"></i>
              <span>{{ event.location }} ({{ event.location_type || 'offline' }})</span>
            </div>
          </div>
        </div>

        <!-- Banner / Image -->
        <div class="event-detail-banner">
          <img v-if="event.featured_image" :src="event.featured_image" :alt="event.title">
          <div v-else class="event-img-placeholder h-100 d-flex align-items-center justify-content-center">
            UMPKU
          </div>
        </div>

        <!-- Main Body -->
        <div class="row">
          <!-- Content Left -->
          <div class="col-lg-8 pr-lg-5">
            <div class="event-detail-content" v-html="event.description || event.excerpt"></div>
            
            <!-- Tags if any -->
            <div class="event-tag-section" v-if="event.tags && event.tags.length > 0">
              <h5 class="text-muted">Tags:</h5>
              <div class="event-tag-list">
                <span class="event-tag" v-for="(tag, index) in event.tags" :key="index">
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Sidebar Right -->
          <div class="col-lg-4 mt-5 mt-lg-0">
            <div class="event-detail-sidebar">
              <div class="sidebar-event-info">
                <div class="sidebar-info-item">
                  <div class="sidebar-info-icon">
                    <i class="las la-clock"></i>
                  </div>
                  <div class="sidebar-info-text">
                    <h5>{{ locale === 'en' ? 'Time' : 'Waktu' }}</h5>
                    <p>{{ timeText }}</p>
                  </div>
                </div>

                <div class="sidebar-info-item">
                  <div class="sidebar-info-icon">
                    <i class="las la-map-pin"></i>
                  </div>
                  <div class="sidebar-info-text">
                    <h5>{{ locale === 'en' ? 'Location' : 'Lokasi' }}</h5>
                    <p>{{ event.location || 'Kampus UMPKU' }}</p>
                  </div>
                </div>

                <div class="sidebar-info-item" v-if="event.organizer">
                  <div class="sidebar-info-icon">
                    <i class="las la-university"></i>
                  </div>
                  <div class="sidebar-info-text">
                    <h5>{{ locale === 'en' ? 'Organizer' : 'Penyelenggara' }}</h5>
                    <p>{{ event.organizer }}</p>
                  </div>
                </div>

                <div class="sidebar-info-item">
                  <div class="sidebar-info-icon">
                    <i class="las la-tags"></i>
                  </div>
                  <div class="sidebar-info-text">
                    <h5>{{ locale === 'en' ? 'Location Type' : 'Jenis Event' }}</h5>
                    <p style="text-transform: capitalize;">{{ event.location_type || 'offline' }}</p>
                  </div>
                </div>

                <!-- SDGs widget -->
                <div class="sidebar-info-item" v-if="event.sdgs && event.sdgs.length > 0">
                  <div class="sidebar-info-icon">
                    <i class="las la-leaf"></i>
                  </div>
                  <div class="sidebar-info-text">
                    <h5>SDGs</h5>
                    <p style="font-size: 13px;">
                      {{ event.sdgs.map(s => `SDG ${s.order || s.id}`).join(', ') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Registration Button -->
              <a 
                v-if="event.registration_url" 
                :href="event.registration_url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="event-btn register-btn w-100 text-center py-3"
                style="font-size: 16px; border-radius: 12px; display: block;"
              >
                {{ locale === 'en' ? 'Register Now' : 'Daftar Sekarang' }} <i class="las la-external-link-alt ml-2"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
