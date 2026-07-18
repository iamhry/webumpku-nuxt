<template>
  <template v-if="resolvedComponent">
    <!-- Hero: tidak dibungkus PageSectionWrapper — punya full-screen wrapper sendiri -->
    <component
      v-if="section.type === 'hero'"
      :is="resolvedComponent"
      :section="section"
      :page="page"
      :is-dark="isDark"
      :preview="preview"
    />

    <!-- Semua section lain dibungkus PageSectionWrapper agar appearance engine berjalan -->
    <PageSectionWrapper v-else :section="section">
      <component
        :is="resolvedComponent"
        :section="section"
        :page="page"
        :is-dark="isDark"
        :preview="preview"
      />
    </PageSectionWrapper>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import type { PageDetail, PageSection } from '~/types/page'

// ─── Section Components ────────────────────────────────────────────────────
import PageHeroSection            from './sections/PageHeroSection.vue'
import PageContentSection         from './sections/PageContentSection.vue'
import PageRichTextSection        from './sections/PageRichTextSection.vue'
import PageGallerySection         from './sections/PageGallerySection.vue'
import PageCardsSection           from './sections/PageCardsSection.vue'
import PageStatisticsSection      from './sections/PageStatisticsSection.vue'
import PageStatsSection           from './sections/PageStatsSection.vue'
import PageFeatureCardsSection    from './sections/PageFeatureCardsSection.vue'
import PageTimelineSection        from './sections/PageTimelineSection.vue'
import PageImageTextSection       from './sections/PageImageTextSection.vue'
import PageVideoSection           from './sections/PageVideoSection.vue'
import PageFaqSection             from './sections/PageFaqSection.vue'
import PageDownloadsSection       from './sections/PageDownloadsSection.vue'
import PageContactSection         from './sections/PageContactSection.vue'
import PageRelatedNewsSection     from './sections/PageRelatedNewsSection.vue'
import PageRelatedEventsSection   from './sections/PageRelatedEventsSection.vue'
import PageRelatedSdgsSection     from './sections/PageRelatedSdgsSection.vue'
import PageRelatedResearchSection from './sections/PageRelatedResearchSection.vue'
import PageRelatedPartnershipSection from './sections/PageRelatedPartnershipSection.vue'
import PageCtaSection             from './sections/PageCtaSection.vue'
import PageFallbackSection        from './sections/PageFallbackSection.vue'
import PageSectionWrapper         from './PageSectionWrapper.vue'

// ─── Registry Pattern ──────────────────────────────────────────────────────
// Tambahkan section type baru di sini — tidak perlu refactor lagi.
const sectionRegistry: Record<string, Component> = {
  hero:                  PageHeroSection,
  content:               PageContentSection,
  rich_text:             PageRichTextSection,
  gallery:               PageGallerySection,
  cards:                 PageCardsSection,
  statistics:            PageStatisticsSection,
  stats:                 PageStatsSection,
  feature_cards:         PageFeatureCardsSection,
  timeline:              PageTimelineSection,
  image_text:            PageImageTextSection,
  video:                 PageVideoSection,
  faq:                   PageFaqSection,
  downloads:             PageDownloadsSection,
  contact:               PageContactSection,
  related_news:          PageRelatedNewsSection,
  related_events:        PageRelatedEventsSection,
  related_sdgs:          PageRelatedSdgsSection,
  related_research:      PageRelatedResearchSection,
  related_partnerships:  PageRelatedPartnershipSection,
  cta:                   PageCtaSection,
}

// ─── Props ─────────────────────────────────────────────────────────────────
const props = defineProps<{
  section: PageSection
  page: PageDetail
  index?: number
  preview?: boolean
}>()

// ─── Resolved component ───────────────────────────────────────────────────
const resolvedComponent = computed<Component>(() => {
  const component = sectionRegistry[props.section.type]

  if (!component) {
    // PageFallbackSection handles dev warning internally
    return PageFallbackSection
  }

  return component
})

// CTA selalu dark/navy terlepas dari posisinya
const isDark = computed(() => props.section.type === 'cta')
</script>
