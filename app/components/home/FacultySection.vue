<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import { useFaculties } from '~/composables/useFaculties'
import FacultyCard from './FacultyCard.vue'
import type { HomepageSection } from '~/types/homepage'

const props = defineProps<{
  section?: HomepageSection
}>()

const { t } = useI18n()
const { faculties, isLoading, hasError, fetchFaculties } = useFaculties()

await fetchFaculties()

const eyebrow = computed(() => props.section?.subtitle || t('faculty_section.eyebrow'))
const title = computed(() => props.section?.title || t('faculty_section.title'))
const description = computed(() => {
  const content = props.section?.content
  if (!content) return t('faculty_section.subtitle')
  const plain = content.replace(/<[^>]*>/g, '').trim()
  return plain || t('faculty_section.subtitle')
})
</script>

<template>
  <section class="faculty-modern-area pt-130 pb-130 rel z-1">
    <div class="container-fluid faculty-modern-container">
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-10">
          <div class="section-title text-center mb-70" v-reveal data-reveal="fade-up">
            <span class="sub-title color-primary mb-10">
              {{ eyebrow }}
            </span>
            <h2>
              {{ title }}
            </h2>
            <p class="faculty-section-desc">
              {{ description }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="hasError" class="row justify-content-center">
        <div class="col-12 text-center text-muted">
          <p>{{ t('faculty_section.error') }}</p>
        </div>
      </div>

      <div v-else-if="isLoading" class="row gx-8 gy-8 justify-content-center">
        <div v-for="i in 3" :key="i" class="col-md-6 col-lg-4">
          <div class="skeleton-box"></div>
        </div>
      </div>

      <div v-else-if="faculties.length === 0" class="row justify-content-center">
        <div class="col-12 text-center text-muted">
          <p>{{ t('faculty_section.empty') }}</p>
        </div>
      </div>

      <div v-else class="row gx-8 gy-8 justify-content-center">
        <div
          v-for="(faculty, index) in faculties"
          :key="faculty.id"
          class="col-md-6 col-lg-4"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 90"
        >
          <FacultyCard :faculty="faculty" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faculty-modern-area {
  padding-top: 130px;
  padding-bottom: 130px;
}

.faculty-modern-area .section-title {
  margin-bottom: 70px;
  text-align: center;
}

.faculty-modern-area .section-title .sub-title {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 10px;
}

.faculty-modern-area .section-title h2 {
  margin-top: 0;
}

.faculty-modern-area .section-title .faculty-section-desc {
  margin-top: 15px;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
  text-align: center;
}

@media (max-width: 767px) {
  .faculty-modern-area {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .faculty-modern-area .section-title {
    margin-bottom: 40px;
  }
}
</style>
