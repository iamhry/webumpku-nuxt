<template>
  <div class="page-sections-wrapper">
    <template v-for="section in sections" :key="section.id || Math.random()">
      <!-- related_news -->
      <PageRelatedNews 
        v-if="section.type === 'related_news'"
        :title="section.title"
        :content="section.content"
      />
      
      <!-- contact -->
      <PageContactSection
        v-else-if="section.type === 'contact'"
        :section="section"
      />

      <!-- cta -->
      <PageCtaSection 
        v-else-if="section.type === 'cta'"
        :title="section.title"
        :content="section.content"
        :buttonText="section.button_text || section.buttonText"
        :link="section.link"
      />

      <!-- text -->
      <div v-else-if="section.type === 'text'" class="container py-5">
        <div v-html="section.content" class="dynamic-page-content"></div>
      </div>

      <!-- image_text -->
      <div v-else-if="section.type === 'image_text'" class="container py-5">
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0" :class="{ 'order-md-2': section.imagePosition === 'right' }">
            <img :src="getImageUrl(section.image)" alt="Section Image" class="img-fluid rounded shadow" v-if="section.image" />
          </div>
          <div class="col-md-6" :class="{ 'order-md-1': section.imagePosition === 'right' }">
            <h3 v-if="section.title" class="mb-3">{{ section.title }}</h3>
            <div v-html="section.content" class="dynamic-page-content"></div>
          </div>
        </div>
      </div>

      <!-- fallback -->
      <div v-else-if="section.content" class="container py-5">
        <div v-html="section.content" class="dynamic-page-content"></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PageSection } from '~/types/page'
import PageRelatedNews from './PageRelatedNews.vue'
import PageCtaSection from './PageCtaSection.vue'
import PageContactSection from './PageContactSection.vue'
import { useMedia } from '~/composables/useMedia'

defineProps<{
  sections: PageSection[]
}>()

const { getImageUrl } = useMedia()
</script>
