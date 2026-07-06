<template>
  <!-- Dev-only: visible banner to help developers identify unregistered section types -->
  <div v-if="isDev" class="page-fallback-dev-banner" role="alert">
    <div class="page-fallback-dev-icon">
      <i class="las la-exclamation-triangle" />
    </div>
    <div class="page-fallback-dev-body">
      <strong>Unknown Section:</strong>
      <code class="page-fallback-dev-type">{{ section.type }}</code>
      <span class="page-fallback-dev-hint">
        — Tambahkan ke <code>sectionRegistry</code> di <code>PageSectionRenderer.vue</code>
      </span>
    </div>
  </div>
  <!-- Production: hidden -->
  <div v-else style="display:none;" :data-section-type="section.type" />
</template>

<script setup lang="ts">
import type { PageSection } from '~/types/page'

const props = defineProps<{
  section: PageSection
}>()

// Dev-only warning
const isDev = import.meta.env.DEV

if (isDev) {
  console.warn(
    `[PageSectionRenderer] Unknown section type: "${props.section.type}". ` +
    `Register it in the sectionRegistry inside PageSectionRenderer.vue.`
  )
}
</script>
