<script setup lang="ts">
import { computed } from 'vue'
import { useNews } from '~/composables/useNews'

const { articles } = await useNews()
const { getImageUrl } = useMedia()

const popularArticles = computed(() => {
  if (!articles.value) return []
  // Sort articles by views descending
  return [...articles.value]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
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
        <i class="las la-chart-line"></i>
        Artikel Populer
      </h3>
    </div>
    <div class="widget-content">
      <div v-if="popularArticles.length" class="latest-news-list">
        <article v-for="article in popularArticles" :key="article.id" class="latest-news-item">
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
        Tidak ada artikel populer
      </div>
    </div>
  </div>
</template>
