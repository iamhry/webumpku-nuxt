<script setup lang="ts">
import type { NewsArticle } from '~/types/news'
defineProps<{ articles: NewsArticle[] }>()
</script>
<template>
  <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12" v-for="article in articles" :key="article.id">
      <NewsCard :article="article" />
    </div>
  </div>
</template>
