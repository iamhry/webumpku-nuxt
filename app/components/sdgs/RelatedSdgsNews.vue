<script setup lang="ts">
import type { NewsArticle } from '~/types/news'
defineProps<{ articles: NewsArticle[] }>()
</script>
<template>
  <div class="related-sdg-news mt-5">
    <h4 class="mb-4">News Related to this SDG</h4>
    <NewsGrid :articles="articles" />
  </div>
</template>
