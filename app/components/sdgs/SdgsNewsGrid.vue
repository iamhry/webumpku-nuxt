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
  <div class="sdgs-news-modern">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mb-5">
          <h2 class="section-title">{{ t('sdg_related_news') }}</h2>
        </div>
      </div>
      <div class="row" v-if="news && news.length">
        <!-- 3 columns on desktop, 2 on tablet, 1 on mobile -->
        <div 
          class="col-lg-4 col-md-6 col-sm-12 mb-4" 
          v-for="article in news" 
          :key="article.id"
        >
          <SdgsNewsCard :article="article" />
        </div>
      </div>
      <div v-else class="row">
        <div class="col-12 text-center">
          <p class="text-muted">{{ t('sdg_no_news') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
