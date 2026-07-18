<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocalePath } from '#imports'
import SdgsModal from '~/components/sdgs/SdgsModal.vue'

const { locale } = useLocale()
const localePath = useLocalePath()
const { getImageUrl } = useMedia()

const isModalOpen = ref(false)
const selectedSdgs = ref<any[]>([])

const openSdgsModal = (sdgs: any[]) => {
  selectedSdgs.value = sdgs
  isModalOpen.value = true
}

const props = defineProps({
  newsData: {
    type: [Array, Object] as any,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 3
  }
})

let sdgsBulletUrl = '/assets/img/sdgs_web.png'
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    sdgsBulletUrl = new URL('/assets/img/sdgs_web.png', import.meta.env.BASE_URL).href
  }
} catch (e) {
  sdgsBulletUrl = '/assets/img/sdgs_web.png'
}

const displayTitle = computed(() => {
  if (props.title) return props.title
  return locale.value === 'en' ? 'SDG Action News' : 'Kabar Aksi SDGs'
})

const displaySubtitle = computed(() => {
  if (props.subtitle) return props.subtitle
  return locale.value === 'en' ? 'Latest Updates' : 'Berita Terkini'
})

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getAuthorName = (article: any) => {
  if (!article?.author) return 'UMPKU'
  if (typeof article.author === 'string') return article.author
  return article.author.name || 'UMPKU'
}

const getCategoryLabel = (article: any) => {
  const cat = article?.category
  if (!cat) return locale.value === 'en' ? 'News' : 'Berita'
  if (typeof cat === 'string') return cat
  return cat.name || cat.slug || (locale.value === 'en' ? 'News' : 'Berita')
}

const getSdgIcon = (goal: any): string => {
  const url = goal?.icon || goal?.icon_image || ''
  return typeof url === 'string' && url.startsWith('http') ? url : ''
}

const displayArticles = computed(() => {
  const rawData = props.newsData?.latest || props.newsData?.data || props.newsData || []
  if (!Array.isArray(rawData)) return []

  const cleanNewsData = rawData.filter((item: any) => {
    if (!item) return false
    const actualItem = item.attributes || item
    if (actualItem.type === 'events' || actualItem.id === 'injected-events') return false
    return !!(actualItem.title || actualItem.judul || actualItem.slug)
  })

  return cleanNewsData.map((item: any) => {
    const news = item.attributes || item
    const newsId = item.id || news.id

    let rawSdgs = news.sdgs || item.sdgs || []
    if (rawSdgs && rawSdgs.data) {
      rawSdgs = rawSdgs.data
    }

    const formattedSdgs = Array.isArray(rawSdgs)
      ? rawSdgs.map((s: any) => {
        const sActual = s.attributes || s
        const targetId = s.id
          || sActual.id
          || sActual.goal_number
          || sActual.goal_no
          || sActual.number
          || sActual.code
          || ''

        return {
          id: targetId,
          slug: sActual.slug || s.id || targetId,
          title: sActual.title || sActual.name || '',
          name: sActual.name || sActual.title || '',
          icon: sActual.icon || s.icon || null,
          icon_image: sActual.icon_image || sActual.icon || s.icon_image || null,
          color: sActual.color || s.color || null
        }
      })
      : []

    return {
      id: newsId,
      slug: news.slug || newsId,
      title: news.title || news.judul || 'Berita SDGs',
      excerpt: news.excerpt
        || (news.content
          ? news.content.replace(/<[^>]*>/g, '').substring(0, 140).trim()
          : ''),
      featured_image: news.featured_image || news.image || news.cover_image || '',
      published_at: news.published_at || news.created_at || news.date || '',
      author: news.author || 'UMPKU',
      category: news.category || null,
      sdgs: formattedSdgs
    }
  }).slice(0, props.limit)
})
</script>

<template>
  <div class="blog-area gray-bg section-padding">
    <div class="container content-wide">
      <div class="row align-items-end mb-4">
        <div class="col-md-8 col-12">
          <div class="section-title mb-0" v-reveal data-reveal="fade-up">
            <h6>{{ displaySubtitle }}</h6>
            <h2 class="mb-0">{{ displayTitle }}</h2>
          </div>
        </div>
        <div
          class="col-md-4 col-12 text-md-right mt-3 mt-md-0"
          v-reveal
          data-reveal="fade-right"
          data-reveal-delay="150"
        >
          <NuxtLink :to="localePath('/berita?category=sdgs')" class="home-news-header-btn">
            {{ locale === 'en' ? 'View All News' : 'Lihat Semua Berita' }}
            <i class="las la-arrow-right ml-2"></i>
          </NuxtLink>
        </div>
      </div>

      <div v-if="!displayArticles.length" class="row mt-30">
        <div class="col-12 text-center py-5">
          <p class="text-secondary">
            {{ locale === 'en' ? 'No SDG-related news yet.' : 'Belum ada berita terkait SDGs saat ini.' }}
          </p>
        </div>
      </div>

      <div v-else class="row mt-30">
        <div
          class="col-lg-4 col-md-6 col-sm-12"
          v-for="(article, index) in displayArticles"
          :key="article.id"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 100"
        >
          <div class="single-blog-item news-card-clean">
            <NuxtLink :to="localePath(`/berita/${article.slug}`)" class="blog-bg">
              <img
                :src="getImageUrl(article.featured_image) || article.featured_image"
                :alt="article.title"
                class="featured-img"
              >
            </NuxtLink>

            <div class="blog-content">
              <span class="news-card-tag">{{ getCategoryLabel(article) }}</span>

              <h5>
                <NuxtLink :to="localePath(`/berita/${article.slug}`)">
                  {{ article.title }}
                </NuxtLink>
              </h5>
              <p class="news-card-excerpt">{{ article.excerpt }}</p>
              <p class="blog-meta">
                <span>
                  {{ locale === 'en' ? 'By' : 'Oleh' }}
                  <b class="blog-meta-author">{{ getAuthorName(article) }}</b>
                </span>
                <span class="blog-meta-dot" aria-hidden="true">&middot;</span>
                <span class="blog-date">{{ formatDate(article.published_at) }}</span>
              </p>

              <div class="news-card-footer">
                <div class="sdg-container">
                  <template v-if="article.sdgs && article.sdgs.length">
                    <a
                      class="mr-1"
                      href="/tujuan-pembangunan-berkelanjutan"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Tujuan Pembangunan Berkelanjutan"
                      aria-label="sdg content link"
                    >
                      <img
                        :src="sdgsBulletUrl"
                        alt="sdgs-label"
                        loading="lazy"
                        class="sdgLabelImg"
                        style="width:90px; height:40px;"
                      >
                    </a>

                    <div
                      v-for="goal in article.sdgs.slice(0, 3)"
                      :key="goal.id"
                      class="sdgs-banner mr-1"
                    >
                      <NuxtLink
                        :to="localePath(`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`)"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        :title="`${goal.id} ${goal.title || goal.name}`"
                        aria-label="sdg content link"
                      >
                        <div
                          class="sdg-number-badge"
                          :style="{
                            backgroundColor: goal.color || '#f5f5f5',
                            backgroundImage: getSdgIcon(goal) ? `url(${getSdgIcon(goal)})` : 'none',
                            color: goal.color ? '#fff' : '#000'
                          }"
                        >
                          <span v-if="!getSdgIcon(goal)">{{ goal.id }}</span>
                        </div>
                      </NuxtLink>
                    </div>

                    <div v-if="article.sdgs.length > 3" class="sdgs-banner mr-1">
                      <div
                        class="sdg-more"
                        style="cursor: pointer;"
                        @click.prevent="openSdgsModal(article.sdgs)"
                      >
                        +{{ article.sdgs.length - 3 }}
                      </div>
                    </div>
                  </template>
                </div>

                <NuxtLink
                  :to="localePath(`/berita/${article.slug}`)"
                  class="rs-square-btn"
                  aria-label="Read more"
                >
                  <span class="icon-box">
                    <i class="las la-arrow-right icon-first"></i>
                    <i class="las la-arrow-right icon-second"></i>
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SdgsModal :show="isModalOpen" :sdgs="selectedSdgs" @close="isModalOpen = false" />
  </div>
</template>

<style scoped>
@import '~/assets/css/news-card.css';
</style>
