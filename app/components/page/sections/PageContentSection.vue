<template>
  <div
    v-if="hasContent"
    class="page-content-section"
    :class="{ 'page-content-section--centered': isCentered }"
  >
    <!-- Section Header -->
    <header v-if="section.title || section.subtitle" class="page-section-header" :class="{ 'page-center': isCentered }">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </header>

    <!-- Body -->
    <div class="page-content-body" :class="{ 'dynamic-page-reading': isNarrow }">
      <div
        v-if="section.content"
        class="page-prose"
        v-html="section.content"
      />

      <!-- CTA Button -->
      <div v-if="section.button_text && section.button_url" class="page-content-btn-wrap">
        <a
          v-if="isExternal"
          :href="section.button_url"
          target="_blank"
          rel="noopener noreferrer"
          class="page-content-btn"
        >
          {{ section.button_text }}
          <i class="las la-external-link-alt" />
        </a>
        <NuxtLink
          v-else
          :to="section.button_url"
          class="page-content-btn"
        >
          {{ section.button_text }}
          <i class="las la-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'

const props = defineProps<{
  section: PageSection
}>()

const settings = computed(() => normalizeSectionSettings(props.section.settings))
const kicker = computed(() => props.section.settings?.kicker || '')
const isCentered = computed(() => settings.value.align === 'center')
const isNarrow = computed(() => !settings.value.full_width && settings.value.container !== 'wide')
const isExternal = computed(() => props.section.button_url?.startsWith('http') || false)

const hasContent = computed(() => {
  return !!(props.section.title || props.section.content || props.section.subtitle)
})
</script>
