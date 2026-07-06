<template>
  <div class="page-related-research-section">
    <!-- Header -->
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <!-- Research Cards -->
    <div v-if="hasItems" class="page-research-grid">
      <article
        v-for="item in section.items"
        :key="item.id"
        class="page-research-card"
      >
        <!-- Image -->
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
          <!-- Category / Subtitle badge -->
          <div v-if="item.subtitle" class="page-research-category">
            {{ item.subtitle }}
          </div>

          <h3 class="page-research-card-title">{{ item.title }}</h3>

          <p v-if="item.description" class="page-research-card-desc">
            {{ truncate(item.description, 160) }}
          </p>

          <a
            v-if="item.url"
            :href="item.url"
            :target="isExternal(item.url) ? '_blank' : '_self'"
            :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
            class="page-research-card-link"
          >
            {{ item.button_text || 'Lihat Penelitian' }}
            <i class="las la-arrow-right" />
          </a>
        </div>
      </article>
    </div>

    <!-- Placeholder -->
    <div v-else class="page-related-placeholder">
      <div class="page-related-placeholder-icon">
        <i class="las la-microscope" />
      </div>
      <p class="page-related-placeholder-text">Penelitian terkait akan ditampilkan di sini.</p>
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
const kicker = computed(() => props.section.settings?.kicker || '')
const hasItems = computed(() => !!(props.section.items && props.section.items.length > 0))
const isExternal = (url?: string) => url?.startsWith('http') || false
const truncate = (text: string, len: number) => text.length > len ? text.slice(0, len) + '…' : text
</script>
