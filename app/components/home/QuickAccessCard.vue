<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import type { QuickAccessItem } from '~/types/quickAccess'

interface Props {
  item: QuickAccessItem
}

const props = defineProps<Props>()

const { locale } = useLocale()

// Check if link is external
const isExternal = computed(() => {
  if (props.item.is_external !== undefined) {
    return props.item.is_external
  }
  return props.item.target === '_blank' || props.item.url.startsWith('http')
})

// Map RemixIcons or category titles to line awesome icons
const mappedIcon = computed(() => {
  const iconStr = (props.item.icon || '').toLowerCase()
  const titleStr = (props.item.title || '').toLowerCase()

  // 1. Keyword mapping based on service title
  if (titleStr.includes('pmb') || titleStr.includes('mahasiswa baru')) return 'las la-graduation-cap'
  if (titleStr.includes('siakad')) return 'las la-book-open'
  if (titleStr.includes('lms') || titleStr.includes('learning')) return 'las la-desktop'
  if (titleStr.includes('repository')) return 'las la-database'
  if (titleStr.includes('jurnal') || titleStr.includes('journal')) return 'las la-file-alt'
  if (titleStr.includes('email') || titleStr.includes('mail')) return 'las la-envelope'
  if (titleStr.includes('library') || titleStr.includes('perpustakaan')) return 'las la-university'
  if (titleStr.includes('international') || titleStr.includes('io') || titleStr.includes('internasional')) return 'las la-globe'
  if (titleStr.includes('research') || titleStr.includes('penelitian')) return 'las la-flask'
  if (titleStr.includes('service') || titleStr.includes('layanan')) return 'las la-users'
  if (titleStr.includes('tracer') || titleStr.includes('alumni')) return 'las la-briefcase'

  // 2. Keyword mapping based on API icon name
  if (iconStr.includes('graduation-cap') || iconStr.includes('graduation') || iconStr.includes('cap')) return 'las la-graduation-cap'
  if (iconStr.includes('computer') || iconStr.includes('monitor') || iconStr.includes('laptop') || iconStr.includes('desktop') || iconStr.includes('fill')) {
    if (iconStr.includes('computer') || iconStr.includes('monitor') || iconStr.includes('laptop')) return 'las la-desktop'
  }
  if (iconStr.includes('book-open') || iconStr.includes('book')) return 'las la-book-open'
  if (iconStr.includes('database')) return 'las la-database'
  if (iconStr.includes('newspaper') || iconStr.includes('file-text') || iconStr.includes('file') || iconStr.includes('document')) return 'las la-file-alt'
  if (iconStr.includes('mail') || iconStr.includes('envelope')) return 'las la-envelope'
  if (iconStr.includes('building') || iconStr.includes('library') || iconStr.includes('bank')) return 'las la-university'
  if (iconStr.includes('global') || iconStr.includes('globe') || iconStr.includes('earth')) return 'las la-globe'
  if (iconStr.includes('briefcase')) return 'las la-briefcase'
  if (iconStr.includes('flask') || iconStr.includes('science')) return 'las la-flask'
  if (iconStr.includes('users') || iconStr.includes('user') || iconStr.includes('people')) return 'las la-users'

  // 3. Fallback to LineAwesome external icon
  return 'las la-external-link-alt'
})
</script>

<template>
  <!-- External Link Card -->
  <a 
    v-if="isExternal"
    :href="props.item.url" 
    :target="props.item.target || '_blank'" 
    rel="noopener noreferrer" 
    class="quick-access-card"
    :aria-label="`${props.item.title} - ${props.item.description}`"
  >
    <div class="quick-access-icon-box">
      <i :class="mappedIcon" aria-hidden="true"></i>
    </div>
    
    <div class="quick-access-card-details">
      <h3 class="quick-access-card-title">{{ props.item.title }}</h3>
      <p class="quick-access-card-desc">{{ props.item.description }}</p>
      
      <span class="quick-access-card-arrow" aria-hidden="true">
        {{ locale === 'en' ? 'Access Portal' : 'Akses Layanan' }} 
        <i class="las la-arrow-right ml-1"></i>
      </span>
    </div>
  </a>

  <!-- Internal Link Card -->
  <NuxtLink 
    v-else
    :to="props.item.url" 
    class="quick-access-card"
    :aria-label="`${props.item.title} - ${props.item.description}`"
  >
    <div class="quick-access-icon-box">
      <i :class="mappedIcon" aria-hidden="true"></i>
    </div>
    
    <div class="quick-access-card-details">
      <h3 class="quick-access-card-title">{{ props.item.title }}</h3>
      <p class="quick-access-card-desc">{{ props.item.description }}</p>
      
      <span class="quick-access-card-arrow" aria-hidden="true">
        {{ locale === 'en' ? 'Access Portal' : 'Akses Layanan' }} 
        <i class="las la-arrow-right ml-1"></i>
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Scoped overrides if needed, but styling is loaded via home-quick-access.css */
</style>
