<script setup lang="ts">
import type { NewsArticle } from '~/types/news'
import SdgsNewsCard from './SdgsNewsCard.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  news: NewsArticle[]
}>()
</script>

<template>
  <section class="sdgs-news-highlight">
    <div class="container">
      <div class="sdgs-news-highlight-header text-center">
        <h2 class="sdgs-news-highlight-title">News</h2>
      </div>

      <div v-if="news && news.length" class="row g-4">
        <div
          v-for="article in news"
          :key="article.id"
          class="col-lg-4 col-md-6 col-12"
        >
          <SdgsNewsCard :article="article" />
        </div>
      </div>

      <div v-else class="text-center">
        <p class="text-muted mb-0">{{ t('sdg_no_news') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sdgs-news-highlight {
  padding: 80px 0;
  background: #fff;
}

.sdgs-news-highlight-header {
  margin-bottom: 48px;
}

.sdgs-news-highlight-title {
  margin: 0;
  color: #1a1a1a;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.1;
}
</style>
