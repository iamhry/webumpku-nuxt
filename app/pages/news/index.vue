<script setup lang="ts">
import { useNews } from '~/composables/useNews'

const { articles, meta, loading, error, fetchNewsList } = useNews()

// SSR fetch for first page
await fetchNewsList(1)

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
        <div class="pagination-wrap text-center mt-5" v-if="meta.last_page > 1">
          <!-- Placeholder for Pagination -->
          <p>Page {{ meta.current_page }} of {{ meta.last_page }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  height: 100%; /* Memaksa card mengisi tinggi maksimal kolom */
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
