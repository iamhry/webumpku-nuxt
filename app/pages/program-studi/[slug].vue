<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useI18n, useSeoMeta, useHead } from '#imports'
import { useStudyPrograms } from '~/composables/useStudyPrograms'
import StudyProgramHero from '~/components/study-program/StudyProgramHero.vue'
import StudyProgramOverview from '~/components/study-program/StudyProgramOverview.vue'
import StudyProgramProfile from '~/components/study-program/StudyProgramProfile.vue'
import StudyProgramCareerProspects from '~/components/study-program/StudyProgramCareerProspects.vue'
import StudyProgramFacultyBox from '~/components/study-program/StudyProgramFacultyBox.vue'
import StudyProgramContact from '~/components/study-program/StudyProgramContact.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { getStudyProgram } = useStudyPrograms()

// Fetch dynamically (SSR compatible, lazy loaded on client to support skeleton UI)
const { data: program, error, pending } = await getStudyProgram(slug.value)

// Dynamic SEO
const pageTitle = computed(() => program.value ? `${program.value.name} - UMPKU` : 'Program Studi - UMPKU')
const pageDesc = computed(() => program.value?.seo_description || program.value?.description || 'Website Resmi UMPKU')
const pageImage = computed(() => program.value?.banner || '/assets/img/bread-bg.jpg')

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogImage: pageImage,
  twitterCard: 'summary_large_image'
})

// Schema.org Structured Data
const schema = computed(() => {
  if (!program.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    'name': program.value.name,
    'description': program.value.description,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'UMPKU',
      'url': 'https://umpku.ac.id'
    },
    'programPrerequisites': {
      '@type': 'AlignmentObject',
      'alignmentType': 'educational level',
      'targetName': program.value.degree || 'Bachelor Degree'
    }
  }
})

useHead({
  title: pageTitle,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => schema.value ? JSON.stringify(schema.value) : '{}')
    }
  ]
})
</script>

<template>
  <div :style="{ '--program-accent-color': program?.theme_color || 'var(--brand-accent)' }">
    <!-- Loading State -->
    <div v-if="pending && !program" class="loading-container py-5 mt-5">
      <div class="skeleton-box" style="height: 400px; width: 100%; margin-bottom: 30px;"></div>
      <div class="container study-program-container">
        <div class="row mb-5">
          <div class="col-lg-3 col-md-6 col-sm-12 mb-3" v-for="i in 4" :key="i">
            <div class="skeleton-box" style="height: 100px; width: 100%; border-radius: 12px;"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            <div class="skeleton-box mb-4" style="height: 200px; width: 100%; border-radius: 12px;"></div>
            <div class="skeleton-box" style="height: 150px; width: 100%; border-radius: 12px;"></div>
          </div>
          <div class="col-lg-4">
            <div class="skeleton-box" style="height: 380px; width: 100%; border-radius: 16px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error/404 State -->
    <div v-else-if="error || !program" class="error-container py-130 text-center">
      <div class="container study-program-container">
        <h2>Data program studi tidak ditemukan.</h2>
        <p class="text-muted mt-3">Silakan kembali ke beranda atau hubungi layanan akademik kami.</p>
        <NuxtLink to="/" class="theme-btn mt-4">Kembali ke Beranda</NuxtLink>
      </div>
    </div>

    <!-- Loaded State -->
    <div v-else>
      <StudyProgramHero :program="program" />
      <StudyProgramOverview :program="program" />
      <StudyProgramProfile :program="program" />
      <StudyProgramCareerProspects :careerProspects="program.career_prospects" />
      <StudyProgramFacultyBox :faculty="program.faculty" v-if="program.faculty" />
      <StudyProgramContact :program="program" />
    </div>
  </div>
</template>

<style scoped>
.error-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-container {
  min-height: 600px;
}
</style>
