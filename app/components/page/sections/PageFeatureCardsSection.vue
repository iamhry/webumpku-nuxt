<template>
  <section class="dynamic-page-section page-bg-white">
    <div class="dynamic-page-container">

      <!-- Header -->
      <div v-if="section.title || section.subtitle" class="page-section-header page-center">
        <span v-if="section.settings?.kicker" class="page-kicker">{{ section.settings.kicker }}</span>
        <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
        <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
      </div>

      <PageSectionEmpty
        v-if="!hasItems"
        message="Kartu fitur belum memiliki items dari CMS."
        icon="las la-th-large"
        :preview="preview"
      />

      <!-- Cards Grid -->
      <div v-else class="page-cards-grid">
        <article
          class="page-card"
          v-for="(item, index) in section.items"
          :key="item.id"
        >
          <!-- Icon or number badge -->
          <div v-if="item.icon" class="page-card-icon">
            <i :class="item.icon"></i>
          </div>
          <div v-else class="page-card-number">
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <!-- Title -->
          <h3 v-if="item.title" class="page-card-title">{{ item.title }}</h3>

          <!-- Description — only if has content -->
          <p v-if="item.description" class="page-card-desc">{{ item.description }}</p>

          <!-- Button — only if url + button_text present -->
          <template v-if="item.url && item.button_text">
            <a
              v-if="isExternal(item.url)"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="page-card-btn"
            >
              {{ item.button_text }}
              <i class="las la-external-link-alt"></i>
            </a>
            <NuxtLink
              v-else
              :to="item.url"
              class="page-card-btn"
            >
              {{ item.button_text }}
              <i class="las la-arrow-right"></i>
            </NuxtLink>
          </template>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection } from '~/types/page'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const { getImageUrl } = useMedia()

const hasItems = computed(() => !!(props.section.items && props.section.items.length > 0))

const isExternal = (url?: string) => url?.startsWith('http') || false
</script>
