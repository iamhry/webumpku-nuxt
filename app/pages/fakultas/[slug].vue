<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useAsyncData, useI18n, useSeoMeta, useHead } from '#imports'
import { facultyService } from '~/services/faculties'
import FacultyHero from '~/components/faculty/FacultyHero.vue'
import FacultyProfile from '~/components/faculty/FacultyProfile.vue'
import FacultyStudyPrograms from '~/components/faculty/FacultyStudyPrograms.vue'
import FacultyContact from '~/components/faculty/FacultyContact.vue'
import type { Faculty } from '~/types/faculty'
import type { StudyProgram } from '~/types/study-program'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => route.params.slug as string)

// Fetch Faculty Detail (SSR compatible, lazy load on client to show skeletons)
const { data: faculty, error, pending } = await useAsyncData<Faculty | null>(
  `faculty-detail-${slug.value}-${locale.value}`,
  async () => {
    const data = await facultyService.getFacultyBySlug(slug.value, { locale: locale.value })
    if (data && (!data.study_programs || data.study_programs.length === 0)) {
      // Fetch study programs if not returned nested
      const programs = await facultyService.getFacultyStudyPrograms(slug.value, { locale: locale.value })
      data.study_programs = programs
    }
    return data
  },
  {
    lazy: true,
    watch: [locale, slug]
  }
)

// Dynamic SEO
const pageTitle = computed(() => faculty.value ? `${faculty.value.name} - UMPKU` : 'Fakultas - UMPKU')
const pageDesc = computed(() => faculty.value?.seo_description || faculty.value?.description || 'Website Resmi UMPKU')
const pageImage = computed(() => faculty.value?.banner || '/assets/img/bread-bg.jpg')

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogImage: pageImage,
  twitterCard: 'summary_large_image'
})

useHead({
  title: pageTitle
})

const studyPrograms = computed<StudyProgram[]>(() => {
  return faculty.value?.study_programs || []
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending && !faculty" class="loading-container">
      <div class="skeleton-hero"></div>
      <div class="container faculty-detail-container py-5 mt-5">
        <div class="row">
          <div class="col-lg-8">
            <div class="skeleton-box mb-4" style="height: 180px; width: 100%;"></div>
            <div class="skeleton-box mb-4" style="height: 100px; width: 100%;"></div>
          </div>
          <div class="col-lg-4">
            <div class="skeleton-box" style="height: 320px; width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error or 404 state -->
    <div v-else-if="error || !faculty" class="error-container py-130 text-center">
      <div class="container faculty-detail-container">
        <h2>Data fakultas tidak ditemukan.</h2>
        <p class="text-muted mt-3">Silakan kembali ke beranda atau periksa kembali tautan Anda.</p>
        <NuxtLink to="/" class="theme-btn mt-4">Kembali ke Beranda</NuxtLink>
      </div>
    </div>
    
    <!-- Loaded State -->
    <div v-else>
      <FacultyHero :faculty="faculty" />
      <FacultyProfile :faculty="faculty" />
      <FacultyStudyPrograms 
        v-if="studyPrograms.length > 0" 
        :facultyName="faculty.name" 
        :programs="studyPrograms" 
      />
      <FacultyContact :faculty="faculty" />
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
