<template>
  <div class="page-statistics-section">
    <!-- Header -->
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <PageSectionEmpty
      v-if="!hasStats"
      message="Statistik belum memiliki data."
      icon="las la-chart-bar"
      :preview="preview"
    />

    <template v-else>
      <!-- Institutional Metrics Grid -->
      <div class="page-institutional-metrics">
        <div
          v-for="item in section.items"
          :key="item.id"
          class="page-institutional-metric"
        >
          <!-- Icon (optional) -->
          <div v-if="item.icon" class="page-institutional-metric-icon">
            <i :class="item.icon" />
          </div>

          <!-- Number / Value -->
          <div class="page-institutional-metric-value">
            {{ item.description || item.title }}
          </div>

          <!-- Label -->
          <div class="page-institutional-metric-label">
            {{ item.description ? item.title : item.subtitle }}
          </div>

          <!-- Optional sublabel -->
          <div v-if="item.description && item.subtitle" class="page-institutional-metric-sub">
            {{ item.subtitle }}
          </div>
        </div>
      </div>

      <!-- Optional intro text -->
      <div
        v-if="section.content"
        class="page-statistics-content page-prose dynamic-page-reading mx-auto mt-5"
        v-html="section.content"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const settings = computed(() => normalizeSectionSettings(props.section.settings))
const kicker = computed(() => props.section.settings?.kicker || '')
const hasStats = computed(() => !!(props.section.items && props.section.items.length > 0))
</script>
