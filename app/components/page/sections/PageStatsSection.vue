<template>
  <section class="dynamic-page-section page-bg-white">
    <div class="dynamic-page-container">

      <!-- Header -->
      <div v-if="section.title || section.subtitle" class="page-section-header page-center">
        <span v-if="section.settings?.kicker" class="page-kicker">{{ section.settings.kicker }}</span>
        <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
        <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
      </div>

      <PageSectionEmpty
        v-if="!hasItems"
        message="Statistik belum memiliki data."
        icon="las la-chart-line"
        :preview="preview"
      />

      <!-- Stats Grid (Wrapped in Soft Background) -->
      <div v-else class="page-stats-wrapper">
        <div class="page-stats-grid">
          <div
            class="page-stat-item"
            v-for="item in section.items"
            :key="item.id"
          >
            <!-- Number (description field = the big number) -->
            <span class="page-stat-number">{{ item.description || item.title }}</span>

            <!-- Label (title field = label text) -->
            <span class="page-stat-label">
              {{ item.description ? item.title : item.subtitle }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const hasItems = computed(() => !!(props.section.items && props.section.items.length > 0))
</script>
