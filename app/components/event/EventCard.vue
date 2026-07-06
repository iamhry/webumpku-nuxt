<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useLocalePath } from '#imports'
import type { EventItem } from '~/types/event'

interface Props {
  event: EventItem
}

const props = defineProps<Props>()

const { locale } = useLocale()
const localePath = useLocalePath()

// Detail page URL
const eventDetailUrl = computed(() => {
  return localePath(`/agenda/${props.event.slug}`)
})

// Format Day of Week (e.g. Thu, Tue / Sen, Sel)
const dayName = computed(() => {
  const start = new Date(props.event.event_start)
  if (isNaN(start.getTime())) return 'EVT'
  
  const daysID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
  const daysEN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const list = locale.value === 'en' ? daysEN : daysID
  return list[start.getDay()]
})

// Format Day Number (e.g. 2, 14, 15)
const dayNum = computed(() => {
  const start = new Date(props.event.event_start)
  if (isNaN(start.getTime())) return '0'
  return String(start.getDate())
})

// Format Month Abbreviation (e.g. JUL, AGT)
const monthName = computed(() => {
  const start = new Date(props.event.event_start)
  if (isNaN(start.getTime())) return 'EVT'
  
  const monthsID = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGT', 'SEP', 'OKT', 'NOV', 'DES']
  const monthsEN = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  
  const list = locale.value === 'en' ? monthsEN : monthsID
  return list[start.getMonth()]
})

// Format time range (e.g. 07.30 - 11.30 WIB)
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

// Category label mappings
const categoryLabel = computed(() => {
  const cat = (props.event.category || '').toLowerCase().trim()
  if (cat === 'seminar') return 'SEMINAR'
  if (cat === 'workshop' || cat === 'training') return 'WORKSHOP'
  if (cat === 'webinar') return 'WEBINAR'
  if (cat === 'lomba' || cat === 'competition' || cat === 'competisi') return 'LOMBA'
  if (cat === 'community_service' || cat === 'community-service' || cat === 'pengabdian') return 'PENGABDIAN'
  return 'AKADEMIK'
})
</script>

<template>
  <div class="home-event-unsw-card fade-up-item">
    
    <!-- Left: Solid Yellow Date Box -->
    <div class="home-event-unsw-date-box">
      <span class="home-event-unsw-date-day">{{ dayName }}</span>
      <span class="home-event-unsw-date-num">{{ dayNum }}</span>
      <span class="home-event-unsw-date-month">{{ monthName }}</span>
    </div>

    <!-- Right: Content Details -->
    <div class="home-event-unsw-content">
      <span class="home-event-unsw-category">{{ categoryLabel }}</span>
      
      <h3 class="home-event-unsw-title">
        <NuxtLink :to="eventDetailUrl" class="text-dark d-block stretched-link" style="text-decoration: none;">
          {{ props.event.title }}
        </NuxtLink>
      </h3>

      <!-- CTA link -->
      <div style="position: relative; z-index: 5; margin-top: auto; display: flex; flex-direction: column; gap: 0.25rem;">
        <span class="home-event-unsw-time">
          <i class="las la-clock"></i>
          {{ timeRangeText }}
        </span>
        
        <div>
          <a 
            v-if="props.event.registration_url" 
            :href="props.event.registration_url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="home-event-unsw-cta"
            style="text-decoration: none;"
          >
            {{ locale === 'en' ? 'Register now' : 'Daftar sekarang' }}
            <i class="las la-arrow-right"></i>
          </a>
          
          <NuxtLink 
            v-else 
            :to="eventDetailUrl" 
            class="home-event-unsw-cta"
            style="text-decoration: none;"
          >
            {{ locale === 'en' ? 'Learn more' : 'Lihat detail' }}
            <i class="las la-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Expand link to overlay the card for clicking */
.stretched-link::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}
</style>
