<template>
  <div class="page-research-grid-section">
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <PageSectionEmpty
      v-if="!hasResearch"
      message="Penelitian belum tersedia untuk section ini."
      icon="las la-microscope"
      :preview="preview"
    />

    <div v-else class="page-research-grid">
      <article
        v-for="item in researchs"
        :key="item.id"
        class="page-research-card"
      >
        <div v-if="item.image" class="page-research-card-img-wrap">
          <img
            :src="getImageUrl(item.image)"
            :alt="item.title || 'Research'"
            class="page-research-card-img"
            loading="lazy"
          />
        </div>
        <div v-else class="page-research-card-no-img">
          <i class="las la-microscope" />
        </div>

        <div class="page-research-card-body">
          <div v-if="item.category || item.year" class="page-research-meta">
            <span v-if="item.category" class="page-research-category">{{ item.category }}</span>
            <span v-if="item.year" class="page-research-year">{{ item.year }}</span>
          </div>

          <h3 v-if="item.title" class="page-research-card-title">{{ item.title }}</h3>

          <div
            v-if="item.description"
            class="page-research-card-desc"
            v-html="truncateHtml(item.description, 160)"
          />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection } from '~/types/page'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const { getImageUrl } = useMedia()
const settings = computed(() => normalizeSectionSettings(props.section.settings))
const kicker = computed(() => settings.value.kicker || '')

const researchs = computed(() => props.section.researchs || [])
const hasResearch = computed(() => researchs.value.length > 0)

function truncateHtml(html: string, len: number) {
  const text = html.replace(/<[^>]*>/g, '').trim()
  if (text.length <= len) return html
  return text.slice(0, len) + '…'
}
</script>
