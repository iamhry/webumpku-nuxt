<template>
  <div class="page-related-events-section">
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <div v-if="displayItems.length" class="page-events-grid">
      <article
        v-for="item in displayItems"
        :key="item.id"
        class="page-event-card"
      >
        <div v-if="item.image" class="page-event-card-img-wrap">
          <img
            :src="getImageUrl(item.image)"
            :alt="item.title || 'Event'"
            class="page-event-card-img"
            loading="lazy"
          >
        </div>
        <div v-else class="page-event-card-img-placeholder">
          <i class="las la-calendar-alt" />
        </div>

        <div class="page-event-card-body">
          <div v-if="item.subtitle" class="page-event-date-badge">
            <i class="las la-calendar" />
            {{ item.subtitle }}
          </div>

          <h3 class="page-event-card-title">{{ item.title }}</h3>
          <p v-if="item.description" class="page-event-card-desc">{{ item.description }}</p>

          <NuxtLink
            v-if="item.url && !isExternal(item.url)"
            :to="item.url"
            class="page-event-card-link"
          >
            {{ item.button_text || 'Lihat Event' }}
            <i class="las la-arrow-right" />
          </NuxtLink>
          <a
            v-else-if="item.url"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="page-event-card-link"
          >
            {{ item.button_text || 'Lihat Event' }}
            <i class="las la-arrow-right" />
          </a>
        </div>
      </article>
    </div>

    <PageSectionEmpty
      v-else
      message="Event terkait akan ditampilkan di sini."
      icon="las la-calendar-alt"
      :preview="preview"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import { eventService } from '~/services/events'
import type { PageSection, PageSectionItem } from '~/types/page'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const { getImageUrl } = useMedia()
const { locale } = useLocale()
const kicker = computed(() => props.section.settings?.kicker || '')
const limit = computed(() => Number(props.section.settings?.limit) || 3)

const cmsItems = computed(() => props.section.items || [])

const { data: fetchedEvents } = await useAsyncData(
  () => `page-related-events-${props.section.id}-${locale.value}-${limit.value}`,
  async () => {
    if (cmsItems.value.length > 0) return []
    const res = await eventService.getEvents({ per_page: limit.value, locale: locale.value })
    const list = res?.data || []
    return Array.isArray(list) ? list : []
  },
  { watch: [locale, () => props.section.id] }
)

const displayItems = computed<PageSectionItem[]>(() => {
  if (cmsItems.value.length) return cmsItems.value

  return (fetchedEvents.value || []).slice(0, limit.value).map((event: any) => {
    const item = event.attributes || event
    const slug = item.slug || event.id
    const date = item.event_start || item.start_date || item.published_at || item.date
    let subtitle = ''
    if (date) {
      subtitle = new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }

    return {
      id: event.id || item.id,
      title: item.title || item.name || 'Event',
      subtitle,
      description: item.excerpt || item.description || '',
      image: item.featured_image || item.image || '',
      url: slug ? `/agenda/${slug}` : '',
      button_text: 'Lihat Event',
      sort_order: 0,
    }
  })
})

const isExternal = (url?: string) => !!url?.startsWith('http')
</script>
