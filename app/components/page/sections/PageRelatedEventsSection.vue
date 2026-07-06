<template>
  <div class="page-related-events-section">
    <!-- Header -->
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <!-- Events from API items -->
    <div v-if="hasItems" class="page-events-grid">
      <article
        v-for="item in section.items"
        :key="item.id"
        class="page-event-card"
      >
        <!-- Event image -->
        <div v-if="item.image" class="page-event-card-img-wrap">
          <img
            :src="getImageUrl(item.image)"
            :alt="item.title || 'Event'"
            class="page-event-card-img"
            loading="lazy"
          />
        </div>
        <div v-else class="page-event-card-img-placeholder">
          <i class="las la-calendar-alt" />
        </div>

        <div class="page-event-card-body">
          <!-- Date badge -->
          <div v-if="item.subtitle" class="page-event-date-badge">
            <i class="las la-calendar" />
            {{ item.subtitle }}
          </div>

          <h3 class="page-event-card-title">{{ item.title }}</h3>
          <p v-if="item.description" class="page-event-card-desc">{{ item.description }}</p>

          <a
            v-if="item.url"
            :href="item.url"
            :target="isExternal(item.url) ? '_blank' : '_self'"
            :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
            class="page-event-card-link"
          >
            {{ item.button_text || 'Lihat Event' }}
            <i class="las la-arrow-right" />
          </a>
        </div>
      </article>
    </div>

    <!-- Placeholder jika tidak ada items -->
    <div v-else class="page-related-placeholder">
      <div class="page-related-placeholder-icon">
        <i class="las la-calendar-alt" />
      </div>
      <p class="page-related-placeholder-text">Event terkait akan ditampilkan di sini.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection } from '~/types/page'

const props = defineProps<{
  section: PageSection
}>()

const { getImageUrl } = useMedia()
const kicker = computed(() => props.section.settings?.kicker || '')
const hasItems = computed(() => !!(props.section.items && props.section.items.length > 0))
const isExternal = (url?: string) => url?.startsWith('http') || false
</script>
