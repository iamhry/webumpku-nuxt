<template>
  <section class="dynamic-page-section page-bg-white">
    <div class="dynamic-page-container">

      <!-- Header -->
      <div v-if="section.title || section.subtitle" class="page-section-header page-center">
        <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
        <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
        <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
      </div>

      <PageSectionEmpty
        v-if="!hasItems"
        message="Statistik belum memiliki data."
        icon="las la-chart-line"
        :preview="preview"
      />

      <!-- Stats Grid -->
      <div v-else class="page-stats-wrapper">
        <div class="page-stats-grid">
          <div
            class="page-stat-item"
            v-for="item in stats"
            :key="item.id"
          >
            <!-- title = number/value -->
            <span class="page-stat-number">{{ item.title }}</span>

            <!-- description = label -->
            <span class="page-stat-label">
              {{ item.description || item.subtitle }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PageSection } from '~/types/page'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'
import { resolveSectionItems } from '~/composables/usePageSectionData'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const { locale } = useI18n()
const settings = computed(() => normalizeSectionSettings(props.section.settings))
const kicker = computed(() => settings.value.kicker || '')

const stats = computed(() => resolveSectionItems(props.section, locale.value))
const hasItems = computed(() => stats.value.length > 0)
</script>
