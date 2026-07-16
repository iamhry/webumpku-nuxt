<template>
  <div>
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="animate-pulse flex flex-col items-center">
        <div class="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent animate-spin"></div>
        <p class="mt-4 text-gray-500">Loading Homepage...</p>
      </div>
    </div>
    
    <div v-else-if="orderedSections.length > 0">
      <template v-for="section in orderedSections" :key="section.id">
        <HeroOne v-if="section.type === 'hero'" />
        <HomeJourneySection v-else-if="section.type === 'journey'" />
        <AboutSection v-else-if="section.type === 'about'" :section="section" />
        <StatisticsSection v-else-if="section.type === 'statistics'" />
        <ReputationSection v-else-if="section.type === 'reputation'" />
        <HomeQuickAccessSection v-else-if="false && section.type === 'campus_services'" />
        <FacultySection v-else-if="section.type === 'faculties'" :section="section" />
        <ServicesOne v-else-if="false && section.type === 'study_programs'" />
        <HomeEventSection v-else-if="section.type === 'events'" />
        <CampusGallerySection v-else-if="section.type === 'campus_gallery'" />
        <NewsSection 
          v-else-if="section.type === 'news'"
          :title="section.title"
          :subtitle="section.subtitle"
          :limit="section.settings?.limit || 3"
        />
        <ProjectOne v-else-if="section.type === 'gallery'" />
        <FeatureOne v-else-if="section.type === 'sdgs' || section.type === 'partners'" />
        <CTAOne v-else-if="section.type === 'cta'" :section="section" />
        <TestimonialOne v-else-if="section.type === 'testimonial'" />
        <ChooseOne v-else-if="section.type === 'choose_us'" />
      </template>
    </div>
    
    <div v-else>
      <HeroOne/>
      <HomeJourneySection/>
      <AboutSection/>
      <!-- <ServicesOne/> -->
      <FeatureOne/>
      <ProjectOne/>
      <TestimonialOne/>
      <ChooseOne/>
      <StatisticsSection/>
      <ReputationSection/>
      <!-- <HomeQuickAccessSection/> -->
      <FacultySection/>
      <HomeEventSection/>
      <CampusGallerySection/>
      <NewsSection/>
      <CTAOne/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHomepage } from '~/composables/useHomepage'
import HeroOne from '~/components/heroarea/HeroOne.vue'
import HomeJourneySection from '~/components/home/HomeJourneySection.vue'
import AboutSection from '~/components/home/AboutSection.vue'
import ServicesOne from '~/components/services/ServicesOne.vue'
import FeatureOne from '~/components/feature/FeatureOne.vue'
import StatisticsSection from '~/components/home/StatisticsSection.vue'
import ProjectOne from '~/components/project/ProjectOne.vue'
import TestimonialOne from '~/components/testimonial/TestimonialOne.vue'
import ChooseOne from '~/components/chooseus/ChooseOne.vue'
import NewsSection from '~/components/home/NewsSection.vue'
import CTAOne from '~/components/cta/CTAOne.vue'
import ReputationSection from '~/components/home/ReputationSection.vue'
import HomeQuickAccessSection from '~/components/home/HomeQuickAccessSection.vue'
import FacultySection from '~/components/home/FacultySection.vue'
import HomeEventSection from '~/components/home/HomeEventSection.vue'
import CampusGallerySection from '~/components/home/CampusGallerySection.vue'

const { sections, isLoading, fetchSections } = useHomepage()

const orderedSections = computed(() => {
  if (!sections.value) return []
  const items = [...sections.value]
  
  const statsIndex = items.findIndex(s => s.type === 'statistics')
  const newsIndex = items.findIndex(s => s.type === 'news')
  
  // Inject journey section right after hero, or at the top if no hero found
  const heroIndex = items.findIndex(s => s.type === 'hero')
  if (heroIndex !== -1) {
    items.splice(heroIndex + 1, 0, { id: 'injected-journey', type: 'journey' } as any)
  } else {
    items.unshift({ id: 'injected-journey', type: 'journey' } as any)
  }

  // Jika statistics ada setelah news, pindahkan statistics ke tepat sebelum news
  if (statsIndex !== -1 && newsIndex !== -1 && statsIndex > newsIndex) {
    const statsItem = items.splice(statsIndex, 1)[0]
    const newNewsIndex = items.findIndex(s => s.type === 'news')
    items.splice(newNewsIndex, 0, statsItem)
  }
  
  // Inject reputation section
  const currentStatsIndex = items.findIndex(s => s.type === 'statistics')
  if (currentStatsIndex !== -1) {
    items.splice(currentStatsIndex + 1, 0, { id: 'injected-reputation', type: 'reputation' } as any)
  } else {
    const targetIndex = items.findIndex(s => s.type === 'faculties' || s.type === 'study_programs' || s.type === 'news')
    if (targetIndex !== -1) {
      items.splice(targetIndex, 0, { id: 'injected-reputation', type: 'reputation' } as any)
    } else {
      items.push({ id: 'injected-reputation', type: 'reputation' } as any)
    }
  }
  
  // Inject campus services section
  const finalReputationIndex = items.findIndex(s => s.type === 'reputation')
  if (finalReputationIndex !== -1) {
    items.splice(finalReputationIndex + 1, 0, { id: 'injected-campus-services', type: 'campus_services' } as any)
  } else {
    items.push({ id: 'injected-campus-services', type: 'campus_services' } as any)
  }

  // Inject events section before news section
  const currentNewsIndex = items.findIndex(s => s.type === 'news')
  if (currentNewsIndex !== -1) {
    const hasEvents = items.some(s => s.type === 'events')
    if (!hasEvents) {
      items.splice(currentNewsIndex, 0, { id: 'injected-events', type: 'events' } as any)
    }
  } else {
    items.push({ id: 'injected-events', type: 'events' } as any)
  }
  
  // Inject campus gallery section after events
  const currentEventsIndex = items.findIndex(s => s.type === 'events')
  if (currentEventsIndex !== -1) {
    const hasGallery = items.some(s => s.type === 'campus_gallery')
    if (!hasGallery) {
      items.splice(currentEventsIndex + 1, 0, { id: 'injected-campus-gallery', type: 'campus_gallery' } as any)
    }
  } else {
    items.push({ id: 'injected-campus-gallery', type: 'campus_gallery' } as any)
  }
  
  return items
})

await useAsyncData('homepage-data', async () => {
  await fetchSections()
  return true
})
</script>
