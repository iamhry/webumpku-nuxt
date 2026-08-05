<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNews } from '~/composables/useNews'

const { articles, meta, loading, error, fetchNewsList } = useNews()
const currentPage = ref(1)

// SSR fetch for first page
await fetchNewsList(1)

const changePage = async (page: number) => {
  if (page < 1 || page > meta.value.last_page || page === currentPage.value) return

  currentPage.value = page
  await fetchNewsList(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchNewsList(page)
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


useHead({
  title: 'News & Updates',
  meta: [
    { name: 'description', content: 'Latest news and updates from the university.' }
  ]
})
</script>
<template>
  <div class="blog-area section-padding">
    <div class="container content-wide">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <div class="section-title">
            <h2>Berita Terbaru</h2>
          </div>
        </div>
      </div>
      <div v-if="loading" class="text-center my-5">Loading...</div>
      <div v-else-if="error" class="text-center my-5 text-danger">{{ error }}</div>
      <div v-else>
        <NewsGrid :articles="articles" />
        <nav v-if="meta && meta.last_page > 1" class="pagination-wrap text-center mt-5" aria-label="News pagination">
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
              <button class="page-link page-nav" @click="changePage(currentPage + 1)"
                :disabled="currentPage === meta.last_page">
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
/* ==================== STYLING PAGINATION MODERN & RAPI ==================== */
.pagination-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

:deep(.pagination) {
  display: flex;
  flex-wrap: wrap; /* Mencegah seluruh komponen hancur di layar HP */
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0;
  margin-bottom: 12px;
  list-style: none;
}

:deep(.page-item) {
  margin: 0;
}

/* Common Base Style untuk semua tombol */
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
  box-shadow: none;
  text-decoration: none;
  white-space: nowrap; /* KUNCI: Mencegah teks "Prev" / "Next" patah/break baris */
}

/* Khusus Tombol Angka (Persegi Sama Sisi) */
:deep(.page-link.page-num) {
  width: 40px;
  padding: 0;
}

/* Khusus Tombol Navigasi Prev & Next (Lebar Menyesuaikan Teks) */
:deep(.page-link.page-nav) {
  padding: 0 40px;
  min-width: auto;
}

/* Hover State */
:deep(.page-link:hover:not(:disabled)) {
  color: #fa4729;
  background-color: #eff6ff;
  border-color: #bfdbfe;
  transform: translateY(-1px);
}

/* Active State */
:deep(.page-item.active .page-link) {
  color: #ffffff;
  background-color: #fa4729;
  border-color: #fa4729;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
}

/* Disabled State */
:deep(.page-item.disabled .page-link) {
  color: #94a3b8;
  background-color: #f1f5f9;
  border-color: #e2e8f0;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Ellipsis (...) Khusus */
:deep(.page-item.disabled span.page-link.page-num) {
  background-color: transparent;
  border-color: transparent;
  font-weight: bold;
  width: 28px; /* Lebih ringkas untuk titik-titik */
}

/* Responsive adjustment untuk layar kecil/HP */
@media (max-width: 576px) {
  :deep(.pagination) {
    gap: 4px;
  }
  :deep(.page-link) {
    height: 36px;
    font-size: 13px;
  }
  :deep(.page-link.page-num) {
    width: 36px;
  }
  :deep(.page-link.page-nav) {
    padding: 0 10px;
  }
}

/* ==================== EXISTING STYLES ==================== */
@media (min-width: 992px) {
  .blog-content {
    /* padding: 50px 50px 60px !important; */
  }
}
@media (min-width: 1200px) {
  .container.content-wide {
    max-width: 95% !important;
    width: 95% !important;
    padding-left: 70px !important;
    padding-right: 70px !important;
  }
}
@media (max-width: 1200px) {
  .container.content-wide {
    max-width: 100% !important;
    width: 100% !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

:deep(.row) {
  display: flex;
  flex-wrap: wrap;
}

:deep(.row > [class*='col-']) {
  display: flex;
  flex-direction: column;
}

:deep(.card) { 
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

:deep(.card-body) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

:deep(.card-title), :deep(.card-body h5), :deep(.card-body a) {
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3em; 
}
</style>
