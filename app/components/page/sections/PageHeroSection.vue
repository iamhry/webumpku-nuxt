<template>
  <div class="page-hero is-section" :style="heroStyle">
    <div class="page-hero-overlay"></div>
    <div class="page-hero-body">
      <div class="page-hero-container">
        <!-- Badge -->
        <div class="page-hero-badge" v-if="section.settings?.badge">
          <i class="las la-star"></i>
          {{ section.settings.badge }}
        </div>

        <!-- Title -->
        <h2 class="page-hero-title">{{ section.title }}</h2>

        <!-- Subtitle -->
        <p v-if="section.subtitle" class="page-hero-subtitle">
          {{ section.subtitle }}
        </p>

        <!-- Button -->
        <div v-if="section.button_url" class="mt-4">
          <NuxtLink
            v-if="!isExternal"
            :to="section.button_url"
            class="page-hero-btn"
          >
            {{ section.button_text }}
            <i class="las la-arrow-right"></i>
          </NuxtLink>
          <a
            v-else
            :href="section.button_url"
            target="_blank"
            rel="noopener noreferrer"
            class="page-hero-btn"
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

const props = defineProps<{
  section: PageSection
}>()

const { getImageUrl } = useMedia()

const isExternal = computed(() => {
  return props.section.button_url?.startsWith('http') || false
})

const heroStyle = computed(() => {
  const img = props.section.image
  if (img) {
    const url = (img.startsWith('http') || img.startsWith('/assets/'))
      ? img
      : getImageUrl(img)
    return {
      backgroundImage: `url('${url}')`,
    }
  }

  // Navy gradient fallback
  return {
    background: 'linear-gradient(135deg, #0a192f 0%, #1e3a5f 60%, #112240 100%)',
  }
})
</script>
