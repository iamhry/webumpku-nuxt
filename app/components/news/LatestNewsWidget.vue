<script setup lang="ts">
import { computed } from 'vue'
import { newsService } from '~/services/news'
import { useNews } from '~/composables/useNews'

const { getImageUrl } = useMedia()

// Fetch latest news from API
const { data: latestNewsResponse } = await useAsyncData('sidebar-latest-news', () => newsService.getLatestNews(5))

// If API is empty/fails, fall back to global news list
const { articles: globalArticles } = await useNews()

const latestArticles = computed(() => {
  if (latestNewsResponse.value && latestNewsResponse.value.data && latestNewsResponse.value.data.length > 0) {
    return latestNewsResponse.value.data.slice(0, 5)
  }
  // Fallback
  return globalArticles.value?.slice(0, 5) || []
})

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="sidebar-widget">
    <div class="widget-header">
      <h3 class="widget-title">
        <i class="las la-fire"></i>
        Berita Terbaru
      </h3>
    </div>
    <div class="widget-content">
      <div v-if="latestArticles.length" class="latest-news-list">
        <article v-for="article in latestArticles" :key="article.id" class="latest-news-item">
          <!-- Thumbnail -->
          <div class="thumbnail">
            <NuxtLink :to="`/berita/${article.slug}`">
              <img
                :src="getImageUrl(article.featured_image)"
                :alt="article.title"
                loading="lazy"
              />
            </NuxtLink>
          </div>

          <!-- Info -->
          <div class="info">
            <h4 class="title">
              <NuxtLink :to="`/berita/${article.slug}`">
                {{ article.title }}
              </NuxtLink>
            </h4>
            <span class="date">{{ formatDate(article.published_at) }}</span>
          </div>
        </article>
      </div>
      <div v-else class="empty-state">
        Tidak ada berita terbaru
      </div>
    </div>
  </div>
</template>
