<template>
  <section class="dynamic-page-section page-bg-soft">
    <div class="dynamic-page-container">
      <div class="dynamic-page-reading">

        <!-- Header -->
        <div v-if="section.title || section.subtitle" class="page-section-header">
          <span v-if="section.settings?.kicker" class="page-kicker">{{ section.settings.kicker }}</span>
          <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
          <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
        </div>

        <PageSectionEmpty
          v-if="!hasItems"
          message="Belum ada file unduhan."
          icon="las la-download"
          :preview="preview"
        />

        <!-- Download List -->
        <div v-else class="page-download-list">
          <a
            v-for="item in section.items"
            :key="item.id"
            :href="item.url || '#'"
            :target="isExternal(item.url) ? '_blank' : '_self'"
            :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
            :download="!isExternal(item.url) && !!item.url ? '' : undefined"
            class="page-download-item"
          >
            <!-- Icon -->
            <div class="page-download-icon">
              <i :class="getFileIcon(item.icon, item.url)"></i>
            </div>

            <!-- Info -->
            <div class="page-download-info">
              <p class="page-download-title">{{ item.title }}</p>
              <p v-if="item.description" class="page-download-desc">{{ item.description }}</p>
            </div>

            <!-- Download button -->
            <span class="page-download-btn">
              Unduh
            </span>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const hasItems = computed(() => !!(props.section.items && props.section.items.length > 0))

const isExternal = (url?: string) => url?.startsWith('http') || false

const getFileIcon = (icon?: string, url?: string): string => {
  if (icon) return icon
  if (!url) return 'las la-file-alt'
  const ext = url.split('.').pop()?.toLowerCase()
  const iconMap: Record<string, string> = {
    pdf: 'las la-file-pdf',
    doc: 'las la-file-word',
    docx: 'las la-file-word',
    xls: 'las la-file-excel',
    xlsx: 'las la-file-excel',
    ppt: 'las la-file-powerpoint',
    pptx: 'las la-file-powerpoint',
    zip: 'las la-file-archive',
    rar: 'las la-file-archive',
    jpg: 'las la-file-image',
    jpeg: 'las la-file-image',
    png: 'las la-file-image',
  }
  return iconMap[ext || ''] || 'las la-file-alt'
}
</script>
