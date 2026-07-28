<template>
  <div class="page-facility-grid-section">
    <div
      v-if="section.title || section.subtitle || hasMeaningfulIntro"
      class="page-facility-grid-intro page-section-header page-center"
    >
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
      <div
        v-if="hasMeaningfulIntro"
        class="page-facility-grid-lead page-prose"
        v-html="section.content"
      />
    </div>

    <PageSectionEmpty
      v-if="!hasFacilities"
      message="Fasilitas belum tersedia untuk section ini."
      icon="las la-building"
      :preview="preview"
    />

    <!-- Modern facility mosaic: accent cards + photo tiles -->
    <div v-else class="page-facility-ums-grid">
      <template v-for="item in facilities" :key="item.id">
        <!-- Photo tile -->
        <div
          v-if="isImageTile(item)"
          class="page-facility-ums-tile page-facility-ums-tile--photo"
          role="img"
          :aria-label="item.name || 'Facility photo'"
        >
          <img
            v-if="item.image"
            :src="getImageUrl(item.image)"
            :alt="item.name || 'Facility'"
            class="page-facility-ums-photo"
            loading="lazy"
          />
          <div v-else class="page-facility-ums-photo-fallback">
            <i class="las la-image" />
          </div>
        </div>

        <!-- Accent card tile -->
        <NuxtLink
          v-else-if="item.url && !isExternal(item.url)"
          :to="item.url"
          class="page-facility-ums-tile page-facility-ums-tile--card"
          :class="accentClass(item)"
        >
          <FacilityCardInner :item="item" />
        </NuxtLink>
        <a
          v-else-if="item.url"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="page-facility-ums-tile page-facility-ums-tile--card"
          :class="accentClass(item)"
        >
          <FacilityCardInner :item="item" />
        </a>
        <div
          v-else
          class="page-facility-ums-tile page-facility-ums-tile--card"
          :class="accentClass(item)"
        >
          <FacilityCardInner :item="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection } from '~/types/page'
import type { Facility } from '~/types/facility'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'
import { hasMeaningfulHtml } from '~/composables/usePageSectionData'
import PageSectionEmpty from './PageSectionEmpty.vue'
import FacilityCardInner from './FacilityCardInner.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const { getImageUrl } = useMedia()
const settings = computed(() => normalizeSectionSettings(props.section.settings))
const kicker = computed(() => settings.value.kicker || '')
const hasMeaningfulIntro = computed(() => hasMeaningfulHtml(props.section.content))

const facilities = computed(() => props.section.facilities || [])
const hasFacilities = computed(() => facilities.value.length > 0)

const isExternal = (url?: string | null) => !!url && /^https?:\/\//i.test(url)
const isImageTile = (item: Facility) => item.tile === 'image'

function accentClass(item: Facility) {
  const accent = (item.accent || 'primary').toString().toLowerCase()
  if (accent === 'secondary' || accent === 'yellow' || accent === 'gold') {
    return 'accent-secondary'
  }
  return 'accent-primary'
}
</script>
