<template>
  <div
    v-if="hasContent"
    class="page-content-section"
    :class="{
      'page-content-section--centered': isCentered && !hasImage,
      'page-content-section--with-image': hasImage,
      'is-reversed': hasImage && isReverse,
    }"
  >
    <!-- Image + text layout (brand guidelines / CMS content with image) -->
    <template v-if="hasImage">
      <div class="page-content-media">
        <img
          :src="getImageUrl(section.image!)"
          :alt="section.title || 'Section image'"
          class="page-content-media-img"
          loading="lazy"
        />
      </div>

      <div class="page-content-body" :class="{ 'dynamic-page-reading': isNarrow }">
        <header v-if="section.title || section.subtitle" class="page-section-header">
          <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
          <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
          <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
        </header>

        <div
          v-if="hasText"
          class="page-prose"
          v-html="section.content"
        />

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
    </template>

    <!-- Text-only layout -->
    <template v-else>
      <header v-if="section.title || section.subtitle" class="page-section-header" :class="{ 'page-center': isCentered }">
        <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
        <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
        <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
      </header>

      <div class="page-content-body" :class="{ 'dynamic-page-reading': isNarrow }">
        <div
          v-if="hasText"
          class="page-prose"
          v-html="section.content"
        />

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
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection } from '~/types/page'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'
import { hasMeaningfulHtml } from '~/composables/usePageSectionData'

const props = defineProps<{
  section: PageSection
}>()

const { getImageUrl } = useMedia()
const settings = computed(() => normalizeSectionSettings(props.section.settings))
const kicker = computed(() => settings.value.kicker || '')
const isCentered = computed(() => settings.value.align === 'center')
const isNarrow = computed(() => !settings.value.full_width && settings.value.container !== 'wide')
const isExternal = computed(() => props.section.button_url?.startsWith('http') || false)
const isReverse = computed(() => settings.value.reverse === true || settings.value.reverse === 'true')
const hasImage = computed(() => !!props.section.image)
const hasText = computed(() => hasMeaningfulHtml(props.section.content))

const hasContent = computed(() => {
  return !!(
    props.section.title ||
    props.section.subtitle ||
    hasText.value ||
    hasImage.value ||
    (props.section.button_text && props.section.button_url)
  )
})
</script>

<style scoped>
.page-content-section--with-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}

.page-content-section--with-image.is-reversed .page-content-media {
  order: 2;
}

.page-content-section--with-image.is-reversed .page-content-body {
  order: 1;
}

.page-content-media-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .page-content-section--with-image {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .page-content-section--with-image.is-reversed .page-content-media,
  .page-content-section--with-image.is-reversed .page-content-body {
    order: unset;
  }
}
</style>
