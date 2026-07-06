<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { EventItem } from '~/types/event'
import EventScheduleItem from './EventScheduleItem.vue'
import EventEmptyState from './EventEmptyState.vue'

interface Props {
  events: EventItem[]
  pending: boolean
  errorMsg: string | null
}

const props = defineProps<Props>()
const emit = defineEmits(['reset-filters'])

const { locale } = useLocale()

// Helper to format date header localized
const formatDateHeader = (dateStr: string, activeLocale: string) => {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  const daysID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const monthsID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  const daysEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dayName = activeLocale === 'en' ? daysEN[date.getDay()] : daysID[date.getDay()]
  const dayOfMonth = date.getDate()
  const monthName = activeLocale === 'en' ? monthsEN[date.getMonth()] : monthsID[date.getMonth()]
  const year = date.getFullYear()

  if (activeLocale === 'en') {
    return `${dayName}, ${monthName} ${dayOfMonth}, ${year}`
  } else {
    return `${dayName}, ${dayOfMonth} ${monthName} ${year}`
  }
}

// Group flat list of events by date YYYY-MM-DD
const groupedEvents = computed(() => {
  if (!props.events || props.events.length === 0) return []

  const groups: Record<string, EventItem[]> = {}
  
  props.events.forEach(event => {
    if (!event.event_start) return
    const dateKey = event.event_start.substring(0, 10)
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(event)
  })

  // Sort dates chronologically
  const sortedKeys = Object.keys(groups).sort((a, b) => a.localeCompare(b))

  return sortedKeys.map(key => ({
    dateKey: key,
    formattedDate: formatDateHeader(key, locale.value),
    items: groups[key]
  }))
})
</script>

<template>
  <div class="events-schedule-list-area">
    <!-- Loading State Skeleton -->
    <div v-if="props.pending && props.events.length === 0">
      <div v-for="i in 5" :key="i" class="skeleton-row">
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
            <div class="skeleton-bar skeleton-meta"></div>
          </div>
          <div class="skeleton-bar skeleton-cta"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="props.errorMsg" class="animate__animated animate__fadeIn">
      <EventEmptyState is-error :error-msg="props.errorMsg" />
    </div>

    <!-- Empty State -->
    <div v-else-if="props.events.length === 0" class="animate__animated animate__fadeIn">
      <EventEmptyState @reset-filters="emit('reset-filters')" />
    </div>

    <!-- Grouped Events List -->
    <div v-else class="schedule-groups">
      <div 
        v-for="group in groupedEvents" 
        :key="group.dateKey" 
        class="schedule-group animate__animated animate__fadeIn"
      >
        <!-- Group Header: Localized Date -->
        <h4 class="schedule-group-header">
          <i class="las la-calendar-day"></i>
          <span>{{ group.formattedDate }}</span>
        </h4>

        <!-- Group Items List -->
        <div class="schedule-items-list">
          <EventScheduleItem 
            v-for="event in group.items" 
            :key="event.id" 
            :event="event" 
          />
        </div>
      </div>
    </div>
  </div>
</template>
