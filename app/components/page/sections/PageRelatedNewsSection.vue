<template>
  <div class="page-related-news-section">
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <div v-if="displayItems.length" class="page-news-grid">
      <article
        v-for="item in displayItems"
        :key="item.id"
        class="page-news-card"
      >
        <div v-if="item.image" class="page-news-card-img-wrap">
          <img
            :src="getImageUrl(item.image)"
            :alt="item.title || 'Berita'"
            class="page-news-card-img"
            loading="lazy"
          >
        </div>
        <div v-else class="page-news-card-no-img">
          <i class="las la-newspaper" />
        </div>

        <div class="page-news-card-body">
          <div v-if="item.subtitle" class="page-news-date">
            <i class="las la-clock" />
            {{ item.subtitle }}
          </div>
          <h3 class="page-news-card-title">{{ item.title }}</h3>
          <p v-if="item.description" class="page-news-card-desc">
            {{ truncate(item.description, 140) }}
          </p>
          <NuxtLink
            v-if="item.url && !isExternal(item.url)"
            :to="item.url"
            class="page-news-card-link"
          >
            Selengkapnya <i class="las la-arrow-right" />
          </NuxtLink>
          <a
            v-else-if="item.url"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="page-news-card-link"
          >
            Selengkapnya <i class="las la-arrow-right" />
          </a>
        </div>
      </article>
    </div>

    <PageSectionEmpty
      v-else
      message="Berita terkait akan ditampilkan di sini."
      icon="las la-newspaper"
      :preview="preview"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import { newsService } from '~/services/news'
import type { PageSection, PageSectionItem } from '~/types/page'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const { getImageUrl } = useMedia()
const { locale } = useLocale()
const kicker = computed(() => props.section.settings?.kicker || '')
const limit = computed(() => Number(props.section.settings?.limit) || 3)

const cmsItems = computed(() => props.section.items || [])

const { data: fetchedNews } = await useAsyncData(
  () => `page-related-news-${props.section.id}-${locale.value}-${limit.value}`,
  async () => {
    if (cmsItems.value.length > 0) return []
    const res = await newsService.getLatestNews(limit.value)
    const list = res?.data || (res as any)?.latest || []
    return Array.isArray(list) ? list : []
  },
  { watch: [locale, () => props.section.id] }
)

const displayItems = computed<PageSectionItem[]>(() => {
  if (cmsItems.value.length) return cmsItems.value

  return (fetchedNews.value || []).slice(0, limit.value).map((article: any) => {
    const news = article.attributes || article
    const slug = news.slug || article.id
    const date = news.published_at || news.created_at
    let subtitle = ''
    if (date) {
      subtitle = new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }

    return {
      id: article.id || news.id,
      title: news.title || 'Berita',
      subtitle,
      description: news.excerpt || '',
      image: news.featured_image || news.image || '',
      url: slug ? `/berita/${slug}` : '',
      sort_order: 0,
    }
  })
})

const isExternal = (url?: string) => !!url?.startsWith('http')
const truncate = (text: string, len: number) =>
  text.length > len ? text.slice(0, len) + '…' : text
</script>
