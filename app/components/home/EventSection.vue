<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useLocalePath } from '#imports'
import { useEvents } from '~/composables/useEvents'
import EventScheduleItem from '~/components/event/EventScheduleItem.vue'

// Import schedule stylesheet so it is loaded on the homepage
import '~/assets/css/event-schedule.css'

const { t } = useI18n()
const { locale } = useLocale()
const localePath = useLocalePath()
const { events, loading, fetchEventsList } = useEvents()

// Fetch the 3 latest upcoming events
await useAsyncData('homepage-events-data', async () => {
  await fetchEventsList({
    upcoming: true,
    per_page: 3,
    locale: locale.value
  })
  return true
})

// Slice to maximum 3 items (just in case)
const homepageEvents = computed(() => {
  if (!events.value) return []
  return events.value.slice(0, 3)
})
</script>

<template>
  <div class="homepage-events-area section-padding bg-white">
    <div class="container event-schedule-container">
      <div class="row align-items-end mb-4">
        <!-- Section Header -->
        <div class="col-md-8 col-12">
          <div class="section-title mb-0">
            <h6 style="color: var(--color-secondary); text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
              {{ locale === 'en' ? 'Campus Agenda' : 'Agenda & Kegiatan Kampus' }}
            </h6>
            <h2 class="mb-0" style="font-size: 36px; font-weight: 700; color: var(--color-primary);">
              {{ locale === 'en' ? 'Upcoming Events' : 'Agenda Mendatang' }}
            </h2>
          </div>
        </div>
        
        <!-- View All link -->
        <div class="col-md-4 col-12 text-md-right mt-3 mt-md-0">
          <NuxtLink :to="localePath('/agenda')" class="schedule-cta-btn">
            {{ locale === 'en' ? 'View All Events' : 'Lihat Semua Agenda' }} <i class="las la-arrow-right ml-2"></i>
          </NuxtLink>
        </div>
      </div>

      <!-- Loading State Skeleton -->
      <div v-if="loading && homepageEvents.length === 0" class="row mt-30">
        <div class="col-12">
          <div v-for="i in 3" :key="i" class="skeleton-row">
            <div class="skeleton-time">
              <div class="skeleton-bar skeleton-bar-time1"></div>
              <div class="skeleton-bar skeleton-bar-time2"></div>
            </div>
            <div class="skeleton-info">
              <div class="skeleton-bar skeleton-img"></div>
              <div class="skeleton-content">
                <div class="skeleton-bar skeleton-title"></div>
                <div class="skeleton-bar skeleton-text"></div>
                <div class="skeleton-bar skeleton-text-sub"></div>
              </div>
              <div class="skeleton-bar skeleton-cta"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state inside homepage -->
      <div v-else-if="homepageEvents.length === 0" class="row mt-30">
        <div class="col-12 text-center py-5" style="border: 1px dashed #cbd5e0; border-radius: 12px; background: #f7fafc;">
          <i class="las la-calendar-times text-muted mb-3" style="font-size: 48px;"></i>
          <h5 class="text-muted">{{ locale === 'en' ? 'No upcoming events at the moment.' : 'Belum ada agenda terdekat dalam waktu dekat.' }}</h5>
        </div>
      </div>

      <!-- Events List -->
      <div v-else class="row mt-30">
        <div class="col-12">
          <div class="schedule-items-list">
            <EventScheduleItem 
              v-for="event in homepageEvents" 
              :key="event.id" 
              :event="event" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage-events-area {
  position: relative;
  z-index: 10;
}
</style>
