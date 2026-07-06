<template>
  <div v-if="section.title || section.button_text" class="page-cta-wrapper" :class="{ 'is-fullwidth': isFullWidth }">
    <!-- Background image if available -->
    <div v-if="ctaImage" class="page-cta-bg" :style="{ backgroundImage: `url('${ctaImage}')` }"></div>

    <!-- Body Container -->
    <div :class="{ 'dynamic-page-container': isFullWidth }">
      <div class="page-cta-content">
        <div>
          <span v-if="settings.kicker" class="page-kicker" style="color:rgba(255,255,255,0.6)">
            {{ settings.kicker }}
          </span>
          <h2 v-if="section.title" class="page-cta-title">{{ section.title }}</h2>
          <p v-if="section.subtitle" class="page-cta-subtitle">{{ section.subtitle }}</p>
        </div>

        <div v-if="section.button_text && section.button_url">
          <NuxtLink
            v-if="!isExternal"
            :to="section.button_url"
            class="page-cta-btn"
          >
            {{ section.button_text }}
            <i class="las la-arrow-right"></i>
          </NuxtLink>
          <a
            v-else
            :href="section.button_url"
            target="_blank"
            rel="noopener noreferrer"
            class="page-cta-btn"
          >
            {{ section.button_text }}
            <i class="las la-external-link-alt"></i>
          </a>
        </div>
      </div>
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

const isExternal = computed(() => {
  return props.section.button_url?.startsWith('http') || false
})

const isFullWidth = computed(() => {
  return settings.value.full_width === true || settings.value.full_width === 'true'
})

const ctaImage = computed(() => {
  const img = props.section.image
  if (!img) return null
  return (img.startsWith('http') || img.startsWith('/assets/')) ? img : getImageUrl(img)
})
</script>
