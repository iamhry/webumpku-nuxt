<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useScholarship } from '~/composables/useScholarship'

const route = useRoute()
const router = useRouter()
const { getScholarships } = useScholarship()

// Direct state initialization
const currentPage = ref(Number(route.query.page) || 1)
const searchQuery = ref((route.query.search as string) || '')
const debouncedSearch = ref(searchQuery.value)

let searchTimeout: ReturnType<typeof setTimeout> | null = null

// Debounce & Watcher KHUSUS CLIENT (Mencegah SSR Memory Leak)
watch(searchQuery, (newVal) => {
  if (import.meta.client) {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      debouncedSearch.value = newVal
      currentPage.value = 1
    }, 350)
  }
})

// Sync URL query KHUSUS CLIENT
watch([currentPage, debouncedSearch], ([page, search]) => {
  if (import.meta.client) {
    router.replace({
      query: {
        ...route.query,
        page: page > 1 ? page : undefined,
        search: search || undefined
      }
    })
  }
})

// Cleanup Memory saat Komponen Di-unmount
onUnmounted(() => {
  if (searchTimeout) clearTimeout(searchTimeout)
})

// Fetching Data aman SSR
const { data: scholarshipData, status, error } = await getScholarships({
  page: currentPage,
  search: debouncedSearch
})

const scholarships = computed(() => scholarshipData.value?.data || [])
const meta = computed(() => scholarshipData.value?.meta)
const isLoading = computed(() => status.value === 'pending')

const changePage = (page: number) => {
  if (page < 1 || page > (meta.value?.last_page || 1) || page === currentPage.value) return
  currentPage.value = page
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const visiblePages = computed(() => {
  const last = meta.value?.last_page || 1
  const current = currentPage.value
  const delta = 1
  const range: (number | string)[] = []

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }
  return range
})

useSeoMeta({
  title: 'Informasi Beasiswa - UMPKU',
  description: 'Temukan berbagai peluang beasiswa untuk mendukung studi Anda.'
})
</script>

<template>
  <div class="scholarship-area section-padding">
    <div class="container content-wide">
      
      <!-- Header Section -->
      <div class="row align-items-end mb-5 g-4">
        <div class="col-lg-7 col-md-6 col-12">
          <div class="section-title text-start mb-0">
            <h2 class="mb-1">Informasi Beasiswa</h2>
            <p class="text-muted mb-0">Temukan berbagai peluang beasiswa untuk mendukung studi Anda.</p>
          </div>
        </div>

        <div class="col-lg-5 col-md-6 col-12">
          <div class="search-input-group">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control custom-input"
              placeholder="Cari beasiswa ..."
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''" 
              class="btn-clear"
              type="button"
              aria-label="Hapus pencarian"
            >
              <i class="las la-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <ScholarshipSkeleton v-if="isLoading" :count="6" />

      <!-- Error State -->
      <div v-else-if="error" class="text-center my-5 text-danger alert alert-danger" role="alert">
        <p class="mb-0">Gagal mengambil data beasiswa. Silakan coba beberapa saat lagi.</p>
      </div>

      <!-- Data State -->
      <div v-else>
        <ScholarshipGrid :scholarships="scholarships" />

        <!-- Pagination -->
        <nav v-if="meta && meta.last_page > 1" class="pagination-wrap text-center mt-5" aria-label="Scholarship pagination">
          <ul class="pagination justify-content-center mb-2">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link page-nav" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                &laquo; Prev
              </button>
            </li>

            <template v-for="(page, index) in visiblePages" :key="index">
              <li v-if="typeof page === 'number'" class="page-item" :class="{ active: page === currentPage }">
                <button class="page-link page-num" @click="changePage(page)">
                  {{ page }}
                </button>
              </li>
              <li v-else class="page-item disabled">
                <span class="page-link page-num">&hellip;</span>
              </li>
            </template>

            <li class="page-item" :class="{ disabled: currentPage === meta.last_page }">
              <button class="page-link page-nav" @click="changePage(currentPage + 1)" :disabled="currentPage === meta.last_page">
                Next &raquo;
              </button>
            </li>
          </ul>

          <p class="text-muted small">
            Menampilkan Halaman {{ currentPage }} dari {{ meta.last_page }}
          </p>
        </nav>
      </div>

    </div>
  </div>
</template>

<style scoped>
.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.custom-input {
  width: 100%;
  height: 50px;
  padding-left: 20px !important;
  padding-right: 48px !important;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
  transition: all 0.2s ease-in-out;
}

.custom-input:focus {
  border-color: #2563eb;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12) !important;
  outline: none;
}

.btn-clear {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  z-index: 2;
}

.pagination-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

:deep(.pagination) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0;
  margin-bottom: 12px;
  list-style: none;
}

:deep(.page-link) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

:deep(.page-link.page-num) {
  width: 40px;
}

:deep(.page-link.page-nav) {
  padding: 0 14px;
}

:deep(.page-item.active .page-link) {
  color: #ffffff;
  background-color: #2563eb;
  border-color: #2563eb;
  font-weight: 600;
}

:deep(.page-item.disabled .page-link) {
  color: #94a3b8;
  background-color: #f1f5f9;
  cursor: not-allowed;
  opacity: 0.7;
}

@media (min-width: 1200px) {
  .container.content-wide {
    max-width: 95% !important;
    width: 95% !important;
    padding-left: 70px !important;
    padding-right: 70px !important;
  }
}
</style>