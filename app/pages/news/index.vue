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
            <h2>Latest News</h2>
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
