<script setup lang="ts">
import { useScholarship } from '~/composables/useScholarship'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

const { getScholarshipDetail } = useScholarship()
const { data: scholarship, status, error } = await getScholarshipDetail(slug.value)

// Tangani HTTP 404 pada SSR secara aman
if (!scholarship.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Beasiswa Tidak Ditemukan', fatal: true })
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

useSeoMeta({
  title: () => scholarship.value ? `${scholarship.value.title} - Beasiswa UMPKU` : 'Detail Beasiswa',
  description: () => scholarship.value?.description || 'Informasi lengkap pendaftaran beasiswa.'
})
</script>

<template>
  <div class="scholarship-detail-page py-5 bg-light-subtle">
    <div class="container content-wide">
      
      <!-- Back Button -->
      <div class="mb-4">
        <button @click="router.back()" class="btn btn-link text-decoration-none text-muted p-0 d-inline-flex align-items-center gap-2 back-btn">
          <i class="las la-arrow-left fs-5"></i>
          <span class="fw-semibold">Kembali ke Daftar Beasiswa</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="status === 'pending'" class="text-center my-5 py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Memuat informasi beasiswa...</p>
      </div>

      <!-- Content State -->
      <div v-else-if="scholarship" class="row g-4">
        <div class="col-lg-8">
          <article class="card border-0 shadow-sm rounded-4 overflow-hidden p-4 p-md-5 bg-white">
            
            <div class="border-bottom pb-4 mb-4">
              <span v-if="scholarship.coverage_discount" class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
                <i class="las la-percentage me-1"></i> {{ scholarship.coverage_discount }}
              </span>
              <h1 class="fw-bold text-dark display-6 mb-3 h2">{{ scholarship.title }}</h1>
              
              <div class="d-flex flex-wrap gap-4 text-muted small" v-if="scholarship.created_at">
                <div class="d-flex align-items-center gap-2">
                  <i class="las la-calendar-check text-primary fs-5"></i>
                  <span>Dipublikasikan: {{ formatDate(scholarship.created_at) }}</span>
                </div>
              </div>
            </div>

            <!-- Image Banner -->
            <div v-if="scholarship.flyer_image || scholarship.image" class="detail-banner-wrapper rounded-4 overflow-hidden mb-4 bg-light">
              <img 
                :src="scholarship.flyer_image || scholarship.image" 
                :alt="scholarship.title"
                class="img-fluid w-100 detail-banner-img"
              />
            </div>

            <div v-if="scholarship.description" class="mb-4">
              <h2 class="h5 fw-bold text-dark mb-2">Deskripsi Program</h2>
              <p class="text-secondary lh-lg">{{ scholarship.description }}</p>
            </div>

            <div v-if="scholarship.requirements" class="scholarship-content mt-4 lh-lg text-secondary">
              <h2 class="h5 fw-bold text-dark mb-3">Syarat & Ketentuan Pendaftaran</h2>
              <div v-html="scholarship.requirements" class="rich-text-body"></div>
            </div>

          </article>
        </div>

        <!-- Sidebar Action -->
        <div class="col-lg-4">
          <div class="sticky-top" style="top: 100px;">
            <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
              <h3 class="h5 fw-bold text-dark mb-3">Tertarik Mendaftar?</h3>
              <p class="text-muted small mb-4">Pastikan Anda telah memenuhi kriteria dan menyiapkan dokumen persyaratan sebelum pendaftaran ditutup.</p>
              
              <a 
                v-if="scholarship.registration_url" 
                :href="scholarship.registration_url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn btn-primary btn-lg rounded-pill fw-bold w-100 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3"
              >
                <span>Daftar Sekarang</span>
                <i class="las la-external-link-alt"></i>
              </a>

              <NuxtLink to="/beasiswa" class="btn btn-outline-secondary rounded-pill w-100 fw-semibold">
                Lihat Beasiswa Lain
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.back-btn { transition: color 0.2s ease; }
.back-btn:hover { color: #2563eb !important; }
.detail-banner-wrapper { max-height: 480px; display: flex; align-items: center; justify-content: center; }
.detail-banner-img { width: 100%; height: 100%; object-fit: cover; }

:deep(.rich-text-body) { font-size: 1.05rem; line-height: 1.8; color: #334155; }
:deep(.rich-text-body h2), :deep(.rich-text-body h3) { font-weight: 700; color: #0f172a; margin-top: 1.8rem; margin-bottom: 0.8rem; }
:deep(.rich-text-body ul), :deep(.rich-text-body ol) { padding-left: 1.25rem; margin-bottom: 1.5rem; }
:deep(.rich-text-body p) { margin-bottom: 1.25rem; }
</style>