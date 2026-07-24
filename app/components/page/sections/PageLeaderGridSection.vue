<template>
  <div class="page-leader-grid-section">
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <PageSectionEmpty
      v-if="!hasLeaders"
      message="Pimpinan belum tersedia untuk section ini."
      icon="las la-user-tie"
      :preview="preview"
    />

    <div v-else class="page-leader-grid">
      <article
        v-for="item in leaders"
        :key="item.id"
        class="page-leader-card"
      >
        <div class="page-leader-photo-wrap">
          <img
            v-if="item.photo"
            :src="getImageUrl(item.photo)"
            :alt="item.name || 'Leader'"
            class="page-leader-photo"
            loading="lazy"
          />
          <div v-else class="page-leader-photo-fallback">
            <i class="las la-user" />
          </div>
        </div>

        <div class="page-leader-body">
          <h3 v-if="item.name" class="page-leader-name">{{ item.name }}</h3>
          <p v-if="item.position" class="page-leader-position">{{ item.position }}</p>
          <p v-if="item.category" class="page-leader-category">{{ item.category }}</p>
          <div
            v-if="item.description"
            class="page-leader-desc"
            v-html="item.description"
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

const leaders = computed(() => props.section.leaders || [])
const hasLeaders = computed(() => leaders.value.length > 0)
</script>
