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
        <ReputationSection v-else-if="section.type === 'reputation'" />
        <HomeQuickAccessSection v-else-if="false && section.type === 'campus_services'" />
        <AboutSection v-else-if="section.type === 'about'" :section="section" />
        <QuickAccessSection v-else-if="section.type === 'quick_access'" />
        <StatisticsSection v-else-if="section.type === 'statistics'" />
        <FacultySection v-else-if="section.type === 'faculties'" :section="section" />
        <HomeStudyProgramsSection v-else-if="section.type === 'study_programs'" :section="section" />
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
        <HomeVideoSection v-else-if="section.type === 'video'" :section="section" />
        <CTAOne v-else-if="section.type === 'cta'" :section="section" />
        <TestimonialOne v-else-if="section.type === 'testimonial'" />
        <ChooseOne v-else-if="section.type === 'choose_us'" />
      </template>
    </div>
    
    <div v-else>
      <HeroOne/>
      <ReputationSection/>
      <AboutSection/>
      <FeatureOne/>
      <ProjectOne/>
      <TestimonialOne/>
      <ChooseOne/>
      <StatisticsSection/>
      <HomeStudyProgramsSection/>
      <FacultySection/>
      <HomeEventSection/>
      <!-- <QuickAccessSection/> -->
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
import QuickAccessSection from '~/components/home/QuickAccessSection.vue'
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
import HomeStudyProgramsSection from '~/components/home/HomeStudyProgramsSection.vue'
import HomeEventSection from '~/components/home/HomeEventSection.vue'
import CampusGallerySection from '~/components/home/CampusGallerySection.vue'
import HomeVideoSection from '~/components/home/HomeVideoSection.vue'

const { sections, isLoading, fetchSections } = useHomepage()

const orderedSections = computed(() => {
  if (!sections.value) return []
  const items = [...sections.value]
  
  const statsIndex = items.findIndex(s => s.type === 'statistics')
  const newsIndex = items.findIndex(s => s.type === 'news')
  
  // Reputation immediately below hero, then journey
  const existingReputationIndex = items.findIndex(s => s.type === 'reputation')
  const reputationItem = existingReputationIndex !== -1
    ? items.splice(existingReputationIndex, 1)[0]
    : ({ id: 'injected-reputation', type: 'reputation' } as any)

  const heroIndex = items.findIndex(s => s.type === 'hero')
  if (heroIndex !== -1) {
    items.splice(heroIndex + 1, 0, reputationItem, { id: 'injected-journey', type: 'journey' } as any)
  } else {
    items.unshift(reputationItem, { id: 'injected-journey', type: 'journey' } as any)
  }

  // Jika statistics ada setelah news, pindahkan statistics ke tepat sebelum news
  if (statsIndex !== -1 && newsIndex !== -1 && statsIndex > newsIndex) {
    const statsItem = items.splice(statsIndex, 1)[0]
    const newNewsIndex = items.findIndex(s => s.type === 'news')
    items.splice(newNewsIndex, 0, statsItem)
  }
  
const studyProgramsIndex = items.findIndex(s => s.type === 'study_programs')
if (studyProgramsIndex !== -1) {
  const [studyProgramsItem] = items.splice(studyProgramsIndex, 1)
  const facultiesForPrograms = items.findIndex(s => s.type === 'faculties')
  if (facultiesForPrograms !== -1) {
    // + 1 agar posisinya berada tepat di bawah faculties
    items.splice(facultiesForPrograms + 1, 0, studyProgramsItem)
  } else {
    items.push(studyProgramsItem)
  }
}

  // Campus services stay in the academic block (above faculties), not under hero
  const studyOrFacultiesIndex = items.findIndex(
    s => s.type === 'study_programs' || s.type === 'faculties'
  )
  if (studyOrFacultiesIndex !== -1) {
    items.splice(studyOrFacultiesIndex, 0, { id: 'injected-campus-services', type: 'campus_services' } as any)
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

  // Layanan Cepat UMPKU — directly below agenda/events
  const existingQuickAccessIndex = items.findIndex(s => s.type === 'quick_access')
  const quickAccessItem = existingQuickAccessIndex !== -1
    ? items.splice(existingQuickAccessIndex, 1)[0]
    : ({ id: 'injected-quick-access', type: 'quick_access' } as any)

  const eventsIndex = items.findIndex(s => s.type === 'events')
  if (eventsIndex !== -1) {
    items.splice(eventsIndex + 1, 0, quickAccessItem)
  } else {
    const newsForQuick = items.findIndex(s => s.type === 'news')
    if (newsForQuick !== -1) {
      items.splice(newsForQuick, 0, quickAccessItem)
    } else {
      items.push(quickAccessItem)
    }
  }
  
  // Inject campus gallery after Layanan Cepat (or after events if QA missing)
  const galleryAnchorIndex = items.findIndex(s => s.type === 'quick_access')
  const eventsForGallery = items.findIndex(s => s.type === 'events')
  const galleryInsertAt = galleryAnchorIndex !== -1
    ? galleryAnchorIndex + 1
    : (eventsForGallery !== -1 ? eventsForGallery + 1 : -1)

  if (galleryInsertAt !== -1) {
    const hasGallery = items.some(s => s.type === 'campus_gallery')
    if (!hasGallery) {
      items.splice(galleryInsertAt, 0, { id: 'injected-campus-gallery', type: 'campus_gallery' } as any)
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
