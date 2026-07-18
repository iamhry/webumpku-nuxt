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
const { locale } = useLocale()
const { faculties, isLoading, hasError, fetchFaculties } = useFaculties()

await fetchFaculties()

const title = computed(() => {
  if (props.section?.title) return props.section.title
  return locale.value === 'en'
    ? 'Know more.\nChoose smarter.'
    : 'Kenali lebih dekat.\nPilih dengan tepat.'
})

const titleLines = computed(() => title.value.split('\n'))

const description = computed(() => {
  const content = props.section?.subtitle || props.section?.content
  if (content) {
    const plain = content.replace(/<[^>]*>/g, '').trim()
    if (plain) return plain
  }
  return locale.value === 'en'
    ? 'Explore our faculties and find the right academic home.'
    : 'Jelajahi fakultas kami dan temukan rumah akademik yang tepat.'
})
</script>

<template>
  <section class="faculty-highlight-area">
    <div class="faculty-highlight-band">
      <div class="container content-wide faculty-highlight-band-inner">
        <div class="faculty-highlight-header" v-reveal data-reveal="fade-up">
          <h2 class="faculty-highlight-title">
            <span v-for="(line, i) in titleLines" :key="i">
              {{ line }}<br v-if="i < titleLines.length - 1">
            </span>
          </h2>
          <p class="faculty-highlight-subtitle">{{ description }}</p>
        </div>

        <div class="faculty-highlight-decor" aria-hidden="true">
        </div>
      </div>
    </div>

    <div class="container content-wide faculty-highlight-body">
      <div v-if="hasError" class="faculty-highlight-empty">
        <p>{{ t('faculty_section.error') }}</p>
      </div>

      <div v-else-if="isLoading" class="faculty-highlight-grid">
        <div v-for="i in 3" :key="i" class="faculty-highlight-skeleton"></div>
      </div>

      <div v-else-if="faculties.length === 0" class="faculty-highlight-empty">
        <p>{{ t('faculty_section.empty') }}</p>
      </div>

      <div v-else class="faculty-highlight-grid">
        <FacultyCard
          v-for="(faculty, index) in faculties"
          :key="faculty.id"
          :faculty="faculty"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 90"
        />
      </div>
    </div>
  </section>
</template>
