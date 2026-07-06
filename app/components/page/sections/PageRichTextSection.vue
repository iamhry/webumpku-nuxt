<template>
  <section
    v-if="section.content || section.title"
    class="dynamic-page-section page-bg-white"
  >
    <div class="dynamic-page-container">
      <div class="dynamic-page-reading">

        <!-- Section Header -->
        <header v-if="section.title || section.subtitle" class="page-section-header">
          <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
          <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
          <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
        </header>

        <!-- Lead paragraph (short content) -->
        <div
          v-if="isLead && section.content"
          class="page-richtext-lead"
          v-html="section.content"
        ></div>

        <!-- Full editorial prose -->
        <div
          v-else-if="section.content"
          class="page-prose"
          v-html="section.content"
        ></div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'

const props = defineProps<{
  section: PageSection
}>()

// Treat as lead if stripped content is under ~300 chars
const isLead = computed(() => {
  if (!props.section.content) return false
  const stripped = props.section.content.replace(/<[^>]+>/g, '').trim()
  return stripped.length < 300
})

const kicker = computed(() => {
  return props.section.settings?.kicker || ''
})
</script>
