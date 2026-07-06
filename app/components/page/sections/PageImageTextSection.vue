<template>
  <div class="page-imagetext" :class="{ 'is-reversed': isReverse }">
    <!-- Image Column -->
    <div class="page-imagetext-img-wrapper">
      <img
        v-if="section.image"
        :src="getImageUrl(section.image)"
        :alt="section.title || 'Image'"
        class="page-imagetext-img"
      />
      <!-- Fallback gradient pattern visual when no image -->
      <div v-else class="page-imagetext-placeholder">
        <i class="las la-image"></i>
      </div>
    </div>

    <!-- Content Column -->
    <div class="page-imagetext-content">
      <span v-if="settings.kicker" class="page-kicker">{{ settings.kicker }}</span>

      <h2 v-if="section.title" class="page-imagetext-title">{{ section.title }}</h2>

      <p v-if="section.subtitle" class="page-section-subtitle mb-4">{{ section.subtitle }}</p>

      <div
        v-if="section.content"
        class="page-imagetext-prose"
        v-html="section.content"
      ></div>

      <!-- Button -->
      <template v-if="section.button_text">
        <a
          v-if="isExternal"
          :href="section.button_url || '#'"
          target="_blank"
          rel="noopener noreferrer"
          class="page-imagetext-btn"
        >
          {{ section.button_text }}
          <i class="las la-external-link-alt"></i>
        </a>
        <NuxtLink
          v-else
          :to="section.button_url || '#'"
          class="page-imagetext-btn"
        >
          {{ section.button_text }}
          <i class="las la-arrow-right"></i>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection } from '~/types/page'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'

const props = defineProps<{
  section: PageSection
}>()

const { getImageUrl } = useMedia()

const settings = computed(() => normalizeSectionSettings(props.section.settings))

const isReverse = computed(() => {
  return settings.value.reverse === true || settings.value.reverse === 'true'
})

const isExternal = computed(() => {
  return props.section.button_url?.startsWith('http') || false
})
</script>
