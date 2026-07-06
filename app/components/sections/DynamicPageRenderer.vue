<script setup lang="ts">
import { resolveComponent } from 'vue'
import type { PageSection } from '~/types/pages'

defineProps<{
  sections: PageSection[]
}>()

const getSectionComponent = (type: string) => {
  const componentMap: Record<string, string> = {
    'hero': 'SectionsHeroSection',
    'content': 'SectionsContentSection',
    'gallery': 'SectionsGallerySection',
    'statistics': 'SectionsStatisticsSection',
    'cta': 'SectionsCtaSection'
  }
  
  return resolveComponent(componentMap[type] || 'div')
}
</script>

<template>
  <div class="dynamic-page-renderer">
    <template v-for="section in sections" :key="section.id">
      <component 
        :is="getSectionComponent(section.type)" 
        :data="section.data" 
      />
    </template>
  </div>
</template>
