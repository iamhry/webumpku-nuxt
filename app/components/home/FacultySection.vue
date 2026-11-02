<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import { useLocale } from '~/composables/useLocale'
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
    ? 'Faculties & Study Programs'
    : 'Fakultas & Program Studi'
})

const description = computed(() => {
  const content = props.section?.subtitle || props.section?.content
  if (content) {
    const plain = content.replace(/<[^>]*>/g, '').trim()
    if (plain) return plain
  }
  return locale.value === 'en'
    ? 'Superior national-standard curriculum to foster competence and professional future.'
    : 'Kurikulum unggul berstandar nasional untuk membina kompetensi dan masa depan profesional.'
})

// Mengambil semua kemungkinan field URL dari database / API
const getFacultyUrl = (faculty: any): string => {
  if (!faculty) return ''

  const candidate = 
    faculty.website ||
    faculty.web ||
    faculty.url ||
    faculty.link ||
    faculty.website_url ||
    faculty.link_website ||
    faculty.site ||
    faculty.external_url ||
    faculty.domain ||
    faculty.meta?.website ||
    faculty.meta?.url ||
    ''

  if (!candidate || typeof candidate !== 'string') return ''

  const trimmed = candidate.trim()
  if (!trimmed) return ''

  // Jika berupa tautan eksternal tanpa protokol, tambahkan https://
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

// Pemetaan tema clean berbasis top-accent stripe: FIK = Forest Emerald, FEKOSHUM = Warm Rust/Orange, FST = Deep Navy
const getCardThemeClass = (faculty: any, index: number) => {
  const text = `${faculty?.name || ''} ${faculty?.title || ''} ${faculty?.code || ''} ${faculty?.slug || ''}`.toLowerCase()

  if (text.includes('sains') || text.includes('teknologi') || text.includes('fst')) {
    return 'card-theme-fst'
  }
  if (text.includes('ekonomi') || text.includes('sosial') || text.includes('humaniora') || text.includes('fesh') || text.includes('feb')) {
    return 'card-theme-fekoshum'
  }
  if (text.includes('kesehatan') || text.includes('fik')) {
    return 'card-theme-fik'
  }

  const fallbacks = ['card-theme-fik', 'card-theme-fekoshum', 'card-theme-fst']
  return fallbacks[index % fallbacks.length]
}
</script>

<template>
  <section class="faculty-section-wrap">
    <div class="faculty-container">
      
      <!-- Editorial Header -->
      <header class="faculty-header" v-reveal data-reveal="fade-up">
        <h2 class="faculty-title">{{ title }}</h2>
        <p class="faculty-subtitle">{{ description }}</p>
      </header>

      <!-- State: Error -->
      <div v-if="hasError" class="faculty-status faculty-status-error">
        <p>{{ t('faculty_section.error') }}</p>
      </div>

      <!-- State: Loading Skeleton -->
      <div v-else-if="isLoading" class="faculty-cards-grid">
        <div v-for="i in 3" :key="i" class="faculty-skeleton"></div>
      </div>

      <!-- State: Kosong -->
      <div v-else-if="faculties.length === 0" class="faculty-status">
        <p>{{ t('faculty_section.empty') }}</p>
      </div>

      <!-- State: Grid 3 Kolom Sejajar -->
      <div v-else class="faculty-cards-grid">
        <div 
          v-for="(faculty, index) in faculties" 
          :key="faculty.id"
          class="faculty-card-wrapper"
          :class="getCardThemeClass(faculty, index)"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 100"
        >
          <!-- Structural Color Stripe -->
          <div class="card-accent-line"></div>
          
          <!-- Faculty Card Component -->
          <div class="card-inner-body">
            <!-- Jika memiliki link website / eksternal -->
            <a 
              v-if="getFacultyUrl(faculty)" 
              :href="getFacultyUrl(faculty)" 
              target="_blank" 
              rel="noopener noreferrer"
              class="faculty-card-link"
            >
              <FacultyCard :faculty="faculty" />
            </a>
            
            <!-- Fallback ke halaman detail internal fakultas jika URL tidak ditemukan -->
            <NuxtLink 
              v-else 
              :to="`/fakultas/${faculty.slug || faculty.id}`"
              class="faculty-card-link"
            >
              <FacultyCard :faculty="faculty" />
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.faculty-section-wrap {
  width: 100%;
  padding: 96px 24px 112px;
  background-color: #fcfcfb;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .faculty-section-wrap {
    padding-left: 48px;
    padding-right: 48px;
  }
}

.faculty-container {
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Header */
.faculty-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 64px;
}

.faculty-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 16px;
}

@media (min-width: 768px) {
  .faculty-title {
    font-size: 2.75rem;
  }
}

.faculty-subtitle {
  font-size: 1.05rem;
  color: #4b5563;
  line-height: 1.6;
  font-weight: 400;
  margin: 0;
}

/* Grid Structure */
.faculty-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  align-items: stretch;
}

@media (max-width: 1024px) {
  .faculty-cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (max-width: 640px) {
  .faculty-cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* Base Card Wrapper */
.faculty-card-wrapper {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.faculty-card-wrapper:hover {
  transform: translateY(-4px);
  border-color: #d1d5db;
  box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
}

/* Top Accent Line */
.card-accent-line {
  height: 4px;
  width: 100%;
  flex-shrink: 0;
  transition: height 0.2s ease;
}

.faculty-card-wrapper:hover .card-accent-line {
  height: 5px;
}

/* Color Accents */
.card-theme-fik .card-accent-line {
  background-color: #0d9488;
}

.card-theme-fekoshum .card-accent-line {
  background-color: #ea580c;
}

.card-theme-fst .card-accent-line {
  background-color: #1e3a8a;
}

/* Card Body Inner Containment & Link Wrap */
.card-inner-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.faculty-card-link {
  text-decoration: none !important;
  color: inherit !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.card-inner-body :deep(> *) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Hindari nested link di dalam child card */
.faculty-card-link :deep(a) {
  pointer-events: none;
}

/* Image Cleaning & Fitting */
.card-inner-body :deep(.faculty-hl-card-media),
.card-inner-body :deep(figure),
.card-inner-body :deep(div:has(> img)) {
  background: #f3f4f6 !important;
  height: 210px !important;
  aspect-ratio: unset !important;
  overflow: hidden;
  position: relative;
  margin: 0 !important;
  padding: 0 !important;
}

.card-inner-body :deep(img) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  transition: transform 0.4s ease;
}

.faculty-card-wrapper:hover .card-inner-body :deep(img) {
  transform: scale(1.03);
}

/* Hilangkan garis pemisah bawaan yang tidak rapi */
.card-inner-body :deep(hr),
.card-inner-body :deep(.border-b),
.card-inner-body :deep([class*="border-b"]) {
  display: none !important;
}

.card-inner-body :deep(span:has(+ h2)),
.card-inner-body :deep(span:has(+ h3)),
.card-inner-body :deep(span:has(+ h4)),
.card-inner-body :deep(p:has(+ h2)),
.card-inner-body :deep(p:has(+ h3)),
.card-inner-body :deep(p:has(+ h4)),
.card-inner-body :deep(.faculty-card-eyebrow),
.card-inner-body :deep(.faculty-code-label) {
  display: none !important;
}

/* Typography Inside Child Card */
.card-inner-body :deep(h2),
.card-inner-body :deep(h3),
.card-inner-body :deep(h4) {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #111827 !important;
  letter-spacing: -0.02em !important;
  line-height: 1.35 !important;
  margin-bottom: 8px !important;
}

.card-inner-body :deep(p) {
  font-size: 0.925rem !important;
  color: #4b5563 !important;
  line-height: 1.55 !important;
}

/* Skeleton & Status Feedback */
.faculty-skeleton {
  height: 440px;
  border-radius: 20px;
  background-color: #e5e7eb;
}

.faculty-status {
  text-align: center;
  padding: 64px 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.faculty-status-error {
  color: #dc2626;
}
</style>