<template>
  <div v-if="hasCards" class="page-cards-section">
    <!-- Header -->
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <!-- Cards Grid -->
    <div class="page-modern-cards-grid" :class="`cols-${columnCount}`">
      <article
        v-for="item in section.items"
        :key="item.id"
        class="page-modern-card"
      >
        <!-- Card Image -->
        <div v-if="item.image" class="page-modern-card-img-wrap">
          <img
            :src="getImageUrl(item.image)"
            :alt="item.title || 'Card image'"
            class="page-modern-card-img"
            loading="lazy"
          />
        </div>

        <!-- Card Body -->
        <div class="page-modern-card-body">
          <!-- Icon -->
          <div v-if="item.icon && !item.image" class="page-modern-card-icon">
            <i :class="item.icon" />
          </div>

          <h3 v-if="item.title" class="page-modern-card-title">{{ item.title }}</h3>
          <p v-if="item.subtitle" class="page-modern-card-subtitle">{{ item.subtitle }}</p>
          <div
            v-if="item.description"
            class="page-modern-card-desc"
            v-html="item.description"
          />

          <!-- Link -->
          <template v-if="item.url">
            <a
              v-if="isExternal(item.url)"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="page-modern-card-link"
            >
              {{ item.button_text || 'Selengkapnya' }}
              <i class="las la-external-link-alt" />
            </a>
            <NuxtLink
              v-else
              :to="item.url"
              class="page-modern-card-link"
            >
              {{ item.button_text || 'Selengkapnya' }}
              <i class="las la-arrow-right" />
            </NuxtLink>
          </template>
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

const props = defineProps<{
  section: PageSection
}>()

const { getImageUrl } = useMedia()
const settings = computed(() => normalizeSectionSettings(props.section.settings))
const kicker = computed(() => props.section.settings?.kicker || '')

const hasCards = computed(() => !!(props.section.items && props.section.items.length > 0))

// Responsive column count from settings or auto by count
const columnCount = computed(() => {
  if (settings.value.columns) return Number(settings.value.columns)
  const count = props.section.items?.length || 0
  if (count <= 2) return 2
  if (count <= 4) return 3
  return 4
})

const isExternal = (url?: string) => url?.startsWith('http') || false
</script>
