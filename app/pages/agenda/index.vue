<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n, useSeoMeta, useHead } from '#imports'
import { useEvents } from '~/composables/useEvents'
import type { GetEventsParams } from '~/types/event'

import EventListHero from '~/components/event/EventListHero.vue'
import EventFilterBar from '~/components/event/EventFilterBar.vue'
import EventScheduleList from '~/components/event/EventScheduleList.vue'

// Import custom styling
import '~/assets/css/event-schedule.css'

const { t, locale } = useI18n()
const { events, meta, loading, error, fetchEventsList } = useEvents()

// Filter States
const activeCategory = ref<string>('')
const activeTimeframe = ref<'all' | 'upcoming' | 'past'>('upcoming')
const activeMonth = ref<number | null>(null)
const activeYear = ref<number | null>(null)
const currentPage = ref<number>(1)

// Fetch Events List Function
const loadEvents = async (append = false) => {
  const params: GetEventsParams = {
    locale: locale.value,
    category: activeCategory.value || undefined,
    month: activeMonth.value || undefined,
    year: activeYear.value || undefined,
    page: currentPage.value,
    per_page: 10
  }

  if (activeTimeframe.value === 'upcoming') {
    params.upcoming = true
  } else if (activeTimeframe.value === 'past') {
    params.past = true
  }

  await fetchEventsList(params, append)
}

// Reset filters back to default
const resetFilters = () => {
  activeCategory.value = ''
  activeTimeframe.value = 'upcoming'
  activeMonth.value = null
  activeYear.value = null
  currentPage.value = 1
  loadEvents(false)
}

// Watch filters to trigger reloading events
watch([activeCategory, activeTimeframe, activeMonth, activeYear], () => {
  currentPage.value = 1
  loadEvents(false)
})

// Watch language change to reload translation keys
watch(locale, () => {
  loadEvents(false)
})

// Trigger on mount
onMounted(() => {
  loadEvents(false)
})

// Load more paginated events
const loadMore = () => {
  if (currentPage.value < meta.value.last_page) {
    currentPage.value++
    loadEvents(true)
  }
}

// Handle change event from filter bar
const onFilterChange = () => {
  // Let the watcher handle it, but can place extra analytics/logging here if needed
}

// SEO
const pageTitle = computed(() => locale.value === 'en' ? 'Events & Agenda - UMPKU' : 'Agenda & Kegiatan - UMPKU')
const pageDescription = computed(() => locale.value === 'en' 
  ? 'List of events, seminars, workshops, webinars, and other campus activities at Universitas Muhammadiyah PKU.' 
  : 'Daftar agenda, seminar, workshop, webinar, dan kegiatan kampus Universitas Muhammadiyah PKU.'
)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: '/assets/img/bread-bg.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  title: pageTitle
})
</script>

<template>
  <div class="event-page-wrapper bg-white">
    <!-- Hero Section -->
    <EventListHero />

    <!-- Filter & Schedule List Main Block -->
    <div class="event-filter-area">
      <div class="container event-schedule-container">
        <!-- Filter Row Bar -->
        <EventFilterBar
          v-model:activeCategory="activeCategory"
          v-model:activeTimeframe="activeTimeframe"
          v-model:activeMonth="activeMonth"
          v-model:activeYear="activeYear"
          @change="onFilterChange"
        />

        <!-- Grouped Schedule List -->
        <EventScheduleList
          :events="events"
          :pending="loading"
          :error-msg="error"
          @reset-filters="resetFilters"
        />

        <!-- Load More Pagination -->
        <div 
          v-if="!loading && events.length > 0 && meta.current_page < meta.last_page" 
          class="event-pagination-wrapper animate__animated animate__fadeIn"
        >
          <button 
            class="event-loadmore-btn" 
            :disabled="loading" 
            @click="loadMore"
          >
            <span v-if="loading">
              <i class="las la-spinner la-spin mr-2"></i> {{ locale === 'en' ? 'Loading...' : 'Memuat...' }}
            </span>
            <span v-else>
              {{ t('event_load_more') }} <i class="las la-angle-down ml-1"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-page-wrapper {
  min-height: 80vh;
}
</style>
