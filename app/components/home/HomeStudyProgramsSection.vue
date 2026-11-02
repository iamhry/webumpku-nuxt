<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAsyncData, useLocalePath } from '#imports'
import { useLocale } from '~/composables/useLocale'
import { studyProgramService } from '~/services/study-programs'
import type { HomepageSection } from '~/types/homepage'

interface StudyProgramItem {
  id: string | number
  name: string
  slug: string
  degree?: string
  degree_level?: string
  faculty?: {
    id?: string | number
    name?: string
    code?: string
  }
  faculty_name?: string
  faculty_code?: string
  accreditation?: string
}

const props = defineProps<{
  section?: HomepageSection
}>()

const { locale } = useLocale()
const localePath = useLocalePath()

const { data: programsData, pending } = await useAsyncData(
  'homepage-study-programs',
  () => studyProgramService.getStudyPrograms({ locale: locale.value }),
  { watch: [locale] }
)

const rawPrograms = computed<StudyProgramItem[]>(() => {
  if (Array.isArray(programsData.value)) return programsData.value
  if (programsData.value && Array.isArray((programsData.value as any).data)) {
    return (programsData.value as any).data
  }
  return []
})

// State Filter & Pencarian
const searchQuery = ref('')
const selectedFaculty = ref('ALL')
const isExpanded = ref(false)
const INITIAL_LIMIT = 6

// Daftar Fakultas Resmi UMPKU beserta Pemetaan Program Studi
const FACULTIES_CONFIG = [
  {
    code: 'FIK',
    name: 'Fakultas Ilmu Kesehatan',
    keywords: [
      'kebidanan',
      'keperawatan',
      'gizi',
      'anestesi',
      'ners',
      'bidan',
      'farmasi',
      'kesehatan'
    ]
  },
  {
    code: 'FST',
    name: 'Fakultas Sains dan Teknologi',
    keywords: [
      'informatika',
      'elektromedis',
      'komputer',
      'sistem informasi',
      'rekayasa'
    ]
  },
  {
    code: 'FESH',
    name: 'Fakultas Ekonomi dan Sosial Humaniora',
    keywords: [
      'psikologi',
      'psikolgi',
      'manajemen',
      'hukum',
      'ekonomi',
      'bisnis',
      'akuntansi'
    ]
  }
]

// Resolver Fakultas berdasarkan konfigurasi resmi di atas
const resolveFaculty = (p: StudyProgramItem) => {
  // 1. Cek kode & nama langsung dari backend jika sudah valid
  if (p.faculty_code && p.faculty_name && p.faculty_code.toUpperCase() !== 'FAKU' && p.faculty_code.toUpperCase() !== 'UMPKU') {
    return { code: p.faculty_code.toUpperCase(), name: p.faculty_name }
  }

  const searchTarget = `${p.name || ''} ${p.faculty_name || ''} ${p.faculty?.name || ''}`.toLowerCase()

  // 2. Cocokkan dengan 3 Fakultas Resmi UMPKU
  for (const fac of FACULTIES_CONFIG) {
    if (fac.keywords.some((kw) => searchTarget.includes(kw))) {
      return { code: fac.code, name: fac.name }
    }
  }

  // 3. Fallback jika ada kata 'sains' / 'teknik' / 'kesehatan' / 'sosial'
  if (searchTarget.includes('sains') || searchTarget.includes('teknologi')) {
    return { code: 'FST', name: 'Fakultas Sains dan Teknologi' }
  }
  if (searchTarget.includes('kesehatan')) {
    return { code: 'FIK', name: 'Fakultas Ilmu Kesehatan' }
  }
  if (searchTarget.includes('ekonomi') || searchTarget.includes('sosial') || searchTarget.includes('humaniora')) {
    return { code: 'FEKOSHUM', name: 'Fakultas Ekonomi dan Sosial Humaniora' }
  }

  return { code: 'FIK', name: 'Fakultas Ilmu Kesehatan' }
}

// Opsi Fakultas yang selalu lengkap sesuai konfigurasi institusi
const facultyOptions = computed(() => {
  return FACULTIES_CONFIG.map((f) => ({ code: f.code, name: f.name }))
})

// Filter data berdasarkan keyword dan fakultas terpilih
const filteredPrograms = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return rawPrograms.value.filter((p) => {
    const faculty = resolveFaculty(p)
    const matchQuery =
      !query ||
      p.name?.toLowerCase().includes(query) ||
      p.degree?.toLowerCase().includes(query) ||
      faculty.name.toLowerCase().includes(query)

    const matchFaculty =
      selectedFaculty.value === 'ALL' ||
      faculty.code === selectedFaculty.value.toUpperCase()

    return matchQuery && matchFaculty
  })
})

const visiblePrograms = computed(() => {
  if (isExpanded.value) return filteredPrograms.value
  return filteredPrograms.value.slice(0, INITIAL_LIMIT)
})

const getDegree = (p: StudyProgramItem) => {
  if (p.degree) return p.degree
  if (p.degree_level) return p.degree_level
  const name = p.name || ''
  if (/^D3|D-III/i.test(name)) return 'D3'
  if (/^D4|D-IV|Sarjana Terapan/i.test(name)) return 'D4'
  if (/^S1|Sarjana/i.test(name)) return 'S1'
  if (/^Profesi/i.test(name)) return 'Profesi'
  if (/^S2|Magister/i.test(name)) return 'S2'
  return 'Program Studi'
}

const getAccreditation = (p: StudyProgramItem) => {
  return p.accreditation || 'Unggul'
}

const sectionBadge = computed(() =>
  locale.value === 'en' ? 'Featured Study Programs' : 'Program Studi Unggulan'
)

const title = computed(() => {
  if (props.section?.title) return props.section.title
  return locale.value === 'en'
    ? 'Find the Right Study Program for You'
    : 'Temukan Program Studi yang Tepat untukmu'
})

const subtitle = computed(() => {
  const raw = props.section?.subtitle || props.section?.content || ''
  const plain = raw.replace(/<[^>]*>/g, '').trim()
  if (plain) return plain
  const total = rawPrograms.value.length || '12'
  return locale.value === 'en'
    ? `${total} academic programs designed in collaboration with healthcare institutions and industries.`
    : `${total} program studi berorientasi industri dan kesehatan holistik masa depan.`
})

const roles = computed(() => [
  { label: locale.value === 'en' ? 'Student' : 'Mahasiswa', href: 'https://myakademik.umpku.ac.id' },
  { label: locale.value === 'en' ? 'Admission' : 'Calon Mahasiswa', href: 'https://pmb.umpku.ac.id' },
  { label: 'Alumni', href: 'https://cdc.umpku.ac.id' }
])
</script>

<template>
  <section class="prodi-section">
    <div class="prodi-container">
      
      <!-- Section Header -->
      <header class="prodi-header">
        <!-- <div class="prodi-tag">
          <span class="prodi-tag-bullet"></span>
          <span>{{ sectionBadge }}</span>
        </div> -->
        <h2 class="prodi-title">{{ title }}</h2>
        <p class="prodi-subtitle">{{ subtitle }}</p>
      </header>

      <!-- Filter & Search Toolbar -->
      <div class="prodi-toolbar">
        <div class="prodi-filters">
          <button
            type="button"
            class="filter-pill"
            :class="{ 'filter-pill--active': selectedFaculty === 'ALL' }"
            @click="selectedFaculty = 'ALL'"
          >
            {{ locale === 'en' ? 'All' : 'Semua' }}
          </button>

          <div class="select-box">
            <select v-model="selectedFaculty" class="select-field" aria-label="Filter Fakultas">
              <option value="ALL">{{ locale === 'en' ? 'Filter by Faculty' : 'Pilih Fakultas' }}</option>
              <option v-for="f in facultyOptions" :key="f.code" :value="f.code">
                {{ f.name }}
              </option>
            </select>
            <svg class="select-arrow" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-container">
          <span class="search-icon-wrapper">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="locale === 'en' ? 'Search study program...' : 'Cari program studi...'"
            class="search-input-field"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="search-clear-btn"
            @click="searchQuery = ''"
            aria-label="Hapus pencarian"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading Skeleton Grid -->
      <div v-if="pending && !rawPrograms.length" class="prodi-grid">
        <div v-for="i in 6" :key="i" class="prodi-skeleton-card"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredPrograms.length === 0" class="prodi-empty">
        <p>{{ locale === 'en' ? 'No study program matched your search.' : 'Tidak ada program studi yang cocok dengan kriteria pencarian.' }}</p>
      </div>

      <!-- Cards Grid -->
      <div v-else class="prodi-grid">
        <article
          v-for="program in visiblePrograms"
          :key="program.id"
          class="prodi-card"
        >
          <!-- Top Card Meta -->
          <div class="prodi-card-top">
            <span
              class="accreditation-badge"
              :class="{
                'accreditation-badge--gold': getAccreditation(program).toLowerCase().includes('unggul'),
                'accreditation-badge--neutral': !getAccreditation(program).toLowerCase().includes('unggul')
              }"
            >
              {{ getAccreditation(program) }}
            </span>
            <span class="faculty-code-tag">{{ resolveFaculty(program).code }}</span>
          </div>

          <!-- Body Info -->
          <div class="prodi-card-body">
            <h3 class="prodi-card-title">{{ program.name }}</h3>
            <p class="prodi-card-meta">
              <!-- <span>{{ getDegree(program) }}</span> -->
              <!-- <span class="meta-dot">·</span> -->
              <span>{{ resolveFaculty(program).name }}</span>
            </p>
          </div>

          <!-- Bottom Action Link -->
          <div class="prodi-card-action">
            <NuxtLink
              :to="localePath(`/program-studi/${program.slug}`)"
              class="prodi-card-link"
            >
              <span>{{ locale === 'en' ? 'Learn More' : 'Pelajari Selengkapnya' }}</span>
              <svg class="link-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Bottom Bar -->
      <footer class="prodi-footer">
        <div class="footer-left">
          <button
            v-if="filteredPrograms.length > INITIAL_LIMIT"
            type="button"
            class="btn-toggle"
            @click="isExpanded = !isExpanded"
          >
            {{
              isExpanded
                ? (locale === 'en' ? 'Show Less' : 'Tampilkan Lebih Sedikit')
                : (locale === 'en' ? `Show More (${filteredPrograms.length})` : `Lihat Semua Program (${filteredPrograms.length})`)
            }}
          </button>
        </div>

        <div class="footer-right">
          <div class="consult-group">
            <span class="consult-text">
              {{ locale === 'en' ? 'Need academic guidance?' : 'Belum menemukan pilihan yang cocok?' }}
            </span>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20PMB%20UMPKU"
              target="_blank"
              rel="noopener noreferrer"
              class="consult-link"
            >
              {{ locale === 'en' ? 'Consult via WhatsApp' : 'Konsultasi via WhatsApp' }}
            </a>
          </div>

          <span class="divider-line">|</span>

          <div class="role-inline-group">
            <span class="role-label">{{ locale === 'en' ? 'Portal:' : 'Akses:' }}</span>
            <div class="role-links">
              <a
                v-for="role in roles"
                :key="role.label"
                :href="role.href"
                target="_blank"
                rel="noopener noreferrer"
                class="role-inline-link"
              >
                {{ role.label }}
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  </section>
</template>

<style scoped>
/* Reset Container */
.prodi-section {
  width: 100%;
  padding: 60px 16px 88px;
  background-color: #fbfbfa;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .prodi-section {
    padding: 80px 32px 104px;
  }
}

.prodi-container {
  max-width: 1240px;
  margin: 0 auto;
}

/* Header */
.prodi-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 40px;
}

.prodi-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background-color: #0f4c81;
  color: #ffffff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 16px;
}

.prodi-tag-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #eab308;
  flex-shrink: 0;
}

.prodi-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  line-height: 1.25;
  margin: 0 0 14px;
}

@media (min-width: 768px) {
  .prodi-title {
    font-size: 2.6rem;
  }
}

.prodi-subtitle {
  font-size: 1.05rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Toolbar & Kesejajaran Flexbox */
.prodi-toolbar {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  margin-bottom: 36px !important;
  width: 100% !important;
}

@media (min-width: 768px) {
  .prodi-toolbar {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
}

/* PRODI FILTERS: flex dengan align-items: stretch memastikan semua child memiliki tinggi dan baseline yang rata */
.prodi-filters {
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 12px !important;
  height: 44px !important;
  flex-wrap: nowrap !important;
}

/* 1. Tombol 'Semua' */
.filter-pill {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 44px !important;
  margin: 0 !important;
  padding: 0 24px !important;
  border-radius: 10px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: normal !important;
  border: 1.5px solid #0f4c81 !important;
  background-color: #ffffff !important;
  color: #0f4c81 !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
  vertical-align: middle !important;
}

.filter-pill--active {
  background-color: #0f4c81 !important;
  color: #ffffff !important;
}

/* 2. Dropdown Fakultas */
.select-box {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  height: 44px !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  vertical-align: middle !important;
}

.select-field {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  display: inline-flex !important;
  align-items: center !important;
  height: 44px !important;
  margin: 0 !important;
  background-color: #ffffff !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 10px !important;
  padding: 0 40px 0 16px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #1e293b !important;
  cursor: pointer !important;
  outline: none !important;
  box-sizing: border-box !important;
  line-height: normal !important;
  transition: border-color 0.2s ease !important;
  vertical-align: middle !important;
}

.select-field:focus {
  border-color: #0f4c81 !important;
}

.select-arrow {
  position: absolute !important;
  right: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 16px !important;
  height: 16px !important;
  color: #64748b !important;
  pointer-events: none !important;
}

/* 3. Search Box */
.search-container {
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  max-width: 100% !important;
  height: 44px !important;
  margin: 0 !important;
  background-color: #ffffff !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 10px !important;
  padding: 0 14px !important;
  box-sizing: border-box !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}

@media (min-width: 768px) {
  .search-container {
    max-width: 360px !important;
  }
}

.search-container:focus-within {
  border-color: #0f4c81 !important;
  box-shadow: 0 0 0 3px rgba(15, 76, 129, 0.08) !important;
}

.search-icon-wrapper {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
  margin-right: 8px !important;
  color: #94a3b8 !important;
}

.search-icon-wrapper svg {
  width: 18px !important;
  height: 18px !important;
}

.search-input-field {
  flex: 1 1 auto !important;
  height: 100% !important;
  border: none !important;
  outline: none !important;
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  font-size: 13.5px !important;
  color: #0f172a !important;
  box-shadow: none !important;
}

.search-input-field::placeholder {
  color: #94a3b8 !important;
}

.search-clear-btn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
  border: none !important;
  padding: 4px !important;
  margin: 0 !important;
  color: #94a3b8 !important;
  cursor: pointer !important;
}

.search-clear-btn svg {
  width: 16px !important;
  height: 16px !important;
}

/* Card Grid Layout */
.prodi-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .prodi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .prodi-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
}

/* Card Detail */
.prodi-card {
  background-color: #ffffff;
  border: 1.5px solid #facc15;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .prodi-card {
    padding: 24px;
    border-radius: 16px;
    min-height: 195px;
  }
}

.prodi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px -6px rgba(234, 179, 8, 0.18);
  border-color: #ca8a04;
}

.prodi-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.accreditation-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.accreditation-badge--gold {
  background-color: #fef08a;
  color: #854d0e;
}

.accreditation-badge--neutral {
  background-color: #fef9c3;
  color: #713f12;
}

.faculty-code-tag {
  font-size: 12px;
  font-weight: 800;
  color: #0f4c81;
  letter-spacing: 0.05em;
}

.prodi-card-body {
  flex: 1;
  margin-bottom: 16px;
}

.prodi-card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
  line-height: 1.35;
}

@media (min-width: 768px) {
  .prodi-card-title {
    font-size: 1.25rem;
  }
}

.prodi-card-meta {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  line-height: 1.45;
}

.meta-dot {
  margin: 0 5px;
  color: #cbd5e1;
}

.prodi-card-action {
  border-top: 1px solid #f1f5f9;
  padding-top: 14px;
}

.prodi-card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #0f4c81;
  text-decoration: none;
  transition: transform 0.2s ease, color 0.2s ease;
}

.prodi-card-link:hover {
  color: #082d4d;
  transform: translateX(3px);
}

.link-arrow {
  width: 15px;
  height: 15px;
}

/* Skeleton & Empty */
.prodi-skeleton-card {
  height: 180px;
  border-radius: 14px;
  background-color: #e2e8f0;
}

.prodi-empty {
  text-align: center;
  padding: 48px 16px;
  color: #64748b;
  font-size: 14.5px;
}

/* Footer */
.prodi-footer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

@media (min-width: 900px) {
  .prodi-footer {
    flex-direction: row;
    justify-content: space-between;
  }
}

.btn-toggle {
  padding: 10px 24px;
  border: 1.5px solid #0f4c81;
  background-color: #ffffff;
  color: #0f4c81;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-toggle:hover {
  background-color: #0f4c81;
  color: #ffffff;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #475569;
  text-align: center;
}

@media (min-width: 640px) {
  .footer-right {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.consult-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.consult-link {
  font-weight: 700;
  color: #0f4c81;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.divider-line {
  display: none;
  color: #cbd5e1;
}

@media (min-width: 640px) {
  .divider-line {
    display: inline-block;
  }
}

.role-inline-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.role-label {
  font-weight: 600;
  color: #64748b;
}

.role-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.role-inline-link {
  font-weight: 700;
  color: #1e293b;
  text-decoration: none;
  padding: 3px 8px;
  border-radius: 6px;
  background-color: #edf2f7;
  font-size: 12px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.role-inline-link:hover {
  background-color: #0f4c81;
  color: #ffffff;
}
</style>