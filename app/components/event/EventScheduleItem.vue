<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useLocalePath } from '#imports'
import type { EventItem } from '~/types/event'

interface Props {
  event: EventItem
}

const props = defineProps<Props>()

const { t } = useI18n()
const { locale } = useLocale()
const localePath = useLocalePath()

// Format event time (e.g. 07.30 - 11.30 WIB)
const timeRangeText = computed(() => {
  const start = new Date(props.event.event_start)
  if (isNaN(start.getTime())) return '00.00'
  
  const formatTime = (d: Date) => {
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${hours}.${minutes}`
  }
  
  let range = formatTime(start)
  if (props.event.event_end) {
    const end = new Date(props.event.event_end)
    if (!isNaN(end.getTime())) {
      range += ` - ${formatTime(end)}`
    }
  }
  return range + ' WIB'
})

// Format short date for small screens or badges
const dateTextFormatted = computed(() => {
  const start = new Date(props.event.event_start)
  if (isNaN(start.getTime())) return ''
  
  if (locale.value === 'en') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`
  } else {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des']
    return `${start.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`
  }
})

// Translate and map category labels
const categoryLabel = computed(() => {
  const cat = props.event.category || ''
  const mappingID: Record<string, string> = {
    seminar: 'Seminar',
    workshop: 'Workshop',
    webinar: 'Webinar',
    conference: 'Konferensi',
    community_service: 'Pengabdian',
    international: 'Internasional',
    other: 'Kegiatan'
  }
  const mappingEN: Record<string, string> = {
    seminar: 'Seminar',
    workshop: 'Workshop',
    webinar: 'Webinar',
    conference: 'Conference',
    community_service: 'Community Service',
    international: 'International',
    other: 'Event'
  }
  const mapping = locale.value === 'en' ? mappingEN : mappingID
  return mapping[cat.toLowerCase()] || cat || (locale.value === 'en' ? 'Event' : 'Kegiatan')
})

// Accents based on category for CSS styling
const categoryClass = computed(() => {
  const cat = props.event.category || 'other'
  return `cat-${cat.toLowerCase().replace(/\s+/g, '_')}`
})

// Detail link resolving
const eventDetailUrl = computed(() => {
  return localePath(`/agenda/${props.event.slug}`)
})

// Dynamic calendar sheet month abbreviation based on locale
const badgeMonthText = computed(() => {
  const start = new Date(props.event.event_start)
  if (isNaN(start.getTime())) return 'EVT'
  
  const monthsID = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGT', 'SEP', 'OKT', 'NOV', 'DES']
  const monthsEN = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  
  const list = locale.value === 'en' ? monthsEN : monthsID
  return list[start.getMonth()]
})

// Dynamic calendar sheet day digit
const badgeDayText = computed(() => {
  const start = new Date(props.event.event_start)
  if (isNaN(start.getTime())) return '00'
  return String(start.getDate()).padStart(2, '0')
})
</script>

<template>
  <div class="schedule-listing animate__animated animate__fadeIn" :class="categoryClass">
    <!-- Time & Category Slot -->
    <div class="schedule-slot-time">
      <span>{{ timeRangeText }}</span>
      <span class="schedule-date-text">{{ dateTextFormatted }}</span>
      <div class="schedule-category-label">{{ categoryLabel }}</div>
    </div>

    <!-- Info Detail Slot -->
    <div class="schedule-slot-info">
      <!-- Thumbnail/Speaker image -->
      <NuxtLink :to="eventDetailUrl">
        <img 
          class="schedule-slot-speakers" 
          :src="props.event.featured_image || '/assets/img/event/default-event.jpg'" 
          :alt="props.event.title"
          @error="($event.target as HTMLImageElement).src = '/assets/img/event/default-event.jpg'"
          loading="lazy"
        />
      </NuxtLink>

      <!-- Content -->
      <div class="schedule-slot-info-content">
        <!-- Title and Organizer -->
        <h3 class="schedule-slot-title">
          <NuxtLink :to="eventDetailUrl">{{ props.event.title }}</NuxtLink>
          <strong v-if="props.event.organizer">@ {{ props.event.organizer }}</strong>
        </h3>

        <!-- Excerpt -->
        <p class="schedule-slot-excerpt">{{ props.event.excerpt }}</p>

        <!-- Meta Details list -->
        <div class="schedule-meta-list">
          <!-- Calendar for Mobile Only -->
          <div class="schedule-meta-item d-md-none">
            <i class="las la-calendar"></i>
            <span>{{ dateTextFormatted }}</span>
          </div>

          <!-- Location -->
          <div v-if="props.event.location" class="schedule-meta-item">
            <i class="las la-map-marker"></i>
            <span>
              {{ props.event.location }}
              <span class="schedule-badge-loc" :class="props.event.location_type || 'offline'">
                {{ props.event.location_type || 'offline' }}
              </span>
            </span>
          </div>

          <!-- Registration URL -->
          <div v-if="props.event.registration_url" class="schedule-meta-item">
            <i class="las la-external-link-alt"></i>
            <a :href="props.event.registration_url" target="_blank" rel="noopener noreferrer" style="color: var(--color-secondary); font-weight: 500;">
              {{ t('event_register') }}
            </a>
          </div>
        </div>

        <!-- SDGs Badges if available -->
        <div v-if="props.event.sdgs && props.event.sdgs.length > 0" class="schedule-sdg-list">
          <div 
            v-for="sdg in props.event.sdgs" 
            :key="sdg.id" 
            class="schedule-sdg-badge"
            :title="sdg.title"
          >
            <i class="las la-leaf text-success"></i>
            <span>SDG {{ sdg.id }}</span>
          </div>
        </div>
      </div>

      <!-- Action Button CTA (Desktop only) -->
      <div class="schedule-slot-cta">
        <NuxtLink :to="eventDetailUrl" class="schedule-cta-btn">
          {{ t('event_view_detail') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
