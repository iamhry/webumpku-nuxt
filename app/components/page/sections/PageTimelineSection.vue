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
        message="Timeline belum memiliki langkah."
        icon="las la-stream"
        :preview="preview"
      />

      <!-- Timeline -->
      <div v-else class="page-timeline">
        <div class="page-timeline-line" aria-hidden="true"></div>

        <div
          class="page-timeline-item"
          v-for="(item, index) in sortedItems"
          :key="item.id"
        >
          <!-- Step marker -->
          <div class="page-timeline-marker" :aria-label="`Langkah ${index + 1}`">
            {{ index + 1 }}
          </div>

          <!-- Content -->
          <div class="page-timeline-content">
            <h4 class="page-timeline-title">{{ item.title }}</h4>
            <div
              v-if="item.description"
              class="page-timeline-desc"
              v-html="item.description"
            ></div>
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

const sortedItems = computed(() => {
  if (!props.section.items) return []
  return [...props.section.items].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
})
</script>
