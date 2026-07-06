<template>
  <div class="page-related-sdgs-section">
    <!-- Header -->
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <!-- SDG Badge Grid (from items) -->
    <div v-if="hasItems" class="page-sdgs-grid">
      <div
        v-for="item in section.items"
        :key="item.id"
        class="page-sdg-badge"
        :style="getSdgStyle(item)"
        :title="item.title"
      >
        <!-- SDG Image if available -->
        <img
          v-if="item.image"
          :src="getImageUrl(item.image)"
          :alt="item.title || 'SDG'"
          class="page-sdg-badge-img"
          loading="lazy"
        />
        <!-- SDG Number + Label fallback -->
        <div v-else class="page-sdg-badge-inner">
          <span class="page-sdg-number">{{ item.subtitle || getSdgNumber(item.title) }}</span>
          <span class="page-sdg-label">{{ item.title }}</span>
        </div>
      </div>
    </div>

    <!-- Placeholder -->
    <div v-else class="page-related-placeholder">
      <div class="page-related-placeholder-icon">
        <i class="las la-globe" />
      </div>
      <p class="page-related-placeholder-text">SDG terkait akan ditampilkan di sini.</p>
    </div>

    <!-- Optional description -->
    <div
      v-if="section.content"
      class="page-sdgs-content page-prose dynamic-page-reading mx-auto mt-5"
      v-html="section.content"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection, PageSectionItem } from '~/types/page'

const props = defineProps<{
  section: PageSection
}>()

const { getImageUrl } = useMedia()
const kicker = computed(() => props.section.settings?.kicker || '')
const hasItems = computed(() => !!(props.section.items && props.section.items.length > 0))

// Official SDG colors per goal number
const SDG_COLORS: Record<number, string> = {
  1: '#E5243B', 2: '#DDA63A', 3: '#4C9F38', 4: '#C5192D',
  5: '#FF3A21', 6: '#26BDE2', 7: '#FCC30B', 8: '#A21942',
  9: '#FD6925', 10: '#DD1367', 11: '#FD9D24', 12: '#BF8B2E',
  13: '#3F7E44', 14: '#0A97D9', 15: '#56C02B', 16: '#00689D',
  17: '#19486A',
}

const getSdgNumber = (title?: string): string => {
  if (!title) return '?'
  const match = title.match(/\d+/)
  return match ? match[0] : title.charAt(0)
}

const getSdgStyle = (item: PageSectionItem) => {
  const num = parseInt(item.subtitle || getSdgNumber(item.title) || '0')
  const color = SDG_COLORS[num] || '#0a192f'
  return { backgroundColor: color }
}
</script>
