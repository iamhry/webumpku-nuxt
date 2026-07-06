<script setup lang="ts">
import { useI18n } from '#imports'
import type { NewsArticle } from '~/types/news'

const { t } = useI18n()
defineProps<{ articles: NewsArticle[] }>()
</script>

<template>
  <div class="related-news-section">
    <div v-if="articles.length" class="row">
      <div 
        v-for="article in articles.slice(0, 3)"
        :key="article.id"
        class="col-lg-4 col-md-6 mb-4"
      >
        <NewsCard :article="article" />
      </div>
    </div>

    <div v-else class="empty-state">
      <i class="las la-inbox"></i>
      <p>{{ t('no_related_news') }}</p>
    </div>
  </div>
</template>

<style scoped>
.related-news-section {
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  background-color: #f9fafb;
  border-radius: 12px;
}

.empty-state i {
  font-size: 3rem;
  color: #d1d5db;
  display: block;
  margin-bottom: 15px;
}

.empty-state p {
  color: #9ca3af;
  margin: 0;
  font-size: 1rem;
}
</style>


