<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n, useLocalePath, useAsyncData } from '#imports'
import { useEvents } from '~/composables/useEvents'
import EventCard from '~/components/event/EventCard.vue'

// Import custom homepage event styling (UNSW Key dates style)
import '~/assets/css/event-home.css'

const { locale } = useLocale()
const localePath = useLocalePath()
const { events, loading, fetchEventsList } = useEvents()

// Filter category state
const activeCategory = ref<string>('')

// Define category filters
const filterItems = computed(() => [
  { value: '', label: locale.value === 'en' ? 'All' : 'Semua' },
  { value: 'seminar', label: locale.value === 'en' ? 'Seminar' : 'Seminar' },
  { value: 'workshop', label: locale.value === 'en' ? 'Workshop' : 'Workshop' },
  { value: 'webinar', label: locale.value === 'en' ? 'Webinar' : 'Webinar' },
  { value: 'competition', label: locale.value === 'en' ? 'Competitions' : 'Kompetisi' }
])

// Fetch initial events (3 upcoming events)
await useAsyncData('homepage-new-events-data', async () => {
  await fetchEventsList({
    upcoming: true,
    per_page: 3,
    locale: locale.value,
    category: activeCategory.value || undefined
  })
  return true
})

// Filter click handler (fetches from API without page reload)
const selectCategory = async (val: string) => {
  activeCategory.value = val
  await fetchEventsList({
    upcoming: true,
    per_page: 3,
    category: val || undefined,
    locale: locale.value
  })
}

// Slice to maximum 3 items
const homepageEvents = computed(() => {
  if (!events.value) return []
  return events.value.slice(0, 3)
})

// Watch language change to reload translations/events
watch(locale, async (newLoc) => {
  await fetchEventsList({
    upcoming: true,
    per_page: 3,
    category: activeCategory.value || undefined,
    locale: newLoc
  })
})
</script>

<template>
  <div class="homepage-events-area section-padding bg-white">
    <div class="container event-schedule-container">
      
      <!-- Section Header -->
      <div class="row home-event-header">
        <div class="col-12" v-reveal data-reveal="fade-up">
          <span class="home-event-subtitle">
            {{ locale === 'en' ? 'Campus Agenda' : 'Agenda & Kegiatan Kampus' }}
          </span>
          <h2 class="home-event-title">
            {{ locale === 'en' ? 'Key dates' : 'Agenda Mendatang' }}
          </h2>
        </div>
      </div>

      <!-- Filter Buttons Bar -->
      <div class="home-event-filter-bar">
        <button 
          v-for="item in filterItems" 
          :key="item.value"
          class="home-event-filter-btn"
          :class="{ active: activeCategory === item.value }"
          @click="selectCategory(item.value)"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Loading State Skeleton Grid -->
      <div v-if="loading" class="home-event-cards-grid">
        <div v-for="i in 3" :key="i" class="home-event-skeleton-unsw-card">
          <div class="home-event-skeleton-unsw-date"></div>
          <div class="home-event-skeleton-unsw-content">
            <div class="home-event-skeleton-line tag"></div>
            <div class="home-event-skeleton-line title-l1"></div>
            <div class="home-event-skeleton-line title-l2"></div>
            <div class="home-event-skeleton-line cta"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="homepageEvents.length === 0" class="home-event-cards-grid">
        <div class="home-event-empty-state">
          <i class="las la-calendar-times home-event-empty-icon"></i>
          <p class="home-event-empty-text">
            {{ locale === 'en' ? 'No events found for this category.' : 'Belum ada agenda terdekat untuk kategori ini.' }}
          </p>
        </div>
      </div>

      <!-- Events Cards Grid -->
      <div v-else class="home-event-cards-grid">
        <EventCard 
          v-for="(event, index) in homepageEvents" 
          :key="event.id" 
          :event="event"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 110"
        />
      </div>

      <!-- Bottom Show More Outlined Button -->
      <div class="row">
        <div class="col-12 home-event-footer-action">
          <NuxtLink :to="localePath('/agenda')" class="home-event-more-btn">
            {{ locale === 'en' ? 'Show more' : 'Lihat Semua Agenda' }}
            <i class="las la-arrow-right"></i>
          </NuxtLink>
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
