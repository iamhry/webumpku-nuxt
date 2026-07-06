<template>
  <div class="page-related-partnerships-section">
    <!-- Header -->
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <!-- Partners Logo Grid -->
    <div v-if="hasItems" class="page-partners-grid">
      <div
        v-for="item in section.items"
        :key="item.id"
        class="page-partner-item"
      >
        <component
          :is="item.url ? 'a' : 'div'"
          :href="item.url || undefined"
          :target="item.url && isExternal(item.url) ? '_blank' : undefined"
          :rel="item.url && isExternal(item.url) ? 'noopener noreferrer' : undefined"
          class="page-partner-card"
          :title="item.title"
        >
          <!-- Logo image -->
          <img
            v-if="item.image"
            :src="getImageUrl(item.image)"
            :alt="item.title || 'Partner'"
            class="page-partner-logo"
            loading="lazy"
          />
          <!-- Text fallback if no logo -->
          <div v-else class="page-partner-text-logo">
            <span>{{ item.title }}</span>
          </div>
        </component>

        <!-- Optional partner name below logo -->
        <p v-if="item.title && item.image" class="page-partner-name">{{ item.title }}</p>
      </div>
    </div>

    <!-- Placeholder -->
    <div v-else class="page-related-placeholder">
      <div class="page-related-placeholder-icon">
        <i class="las la-handshake" />
      </div>
      <p class="page-related-placeholder-text">Mitra terkait akan ditampilkan di sini.</p>
    </div>

    <!-- Optional content -->
    <div
      v-if="section.content"
      class="page-prose dynamic-page-reading mx-auto mt-5"
      v-html="section.content"
    />
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
const kicker = computed(() => props.section.settings?.kicker || '')
const hasItems = computed(() => !!(props.section.items && props.section.items.length > 0))
const isExternal = (url?: string) => url?.startsWith('http') || false
</script>
