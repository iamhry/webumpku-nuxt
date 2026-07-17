<script setup lang="ts">
import { useNews } from '~/composables/useNews'
import { computed, ref } from 'vue'
import { useI18n, useLocalePath } from '#imports'
import SdgsModal from '~/components/sdgs/SdgsModal.vue'

const { t } = useI18n()
const { locale } = useLocale()
const localePath = useLocalePath()

const isModalOpen = ref(false)
const selectedSdgs = ref<any[]>([])

const openSdgsModal = (sdgs: any[]) => {
  selectedSdgs.value = sdgs
  isModalOpen.value = true
}

const props = defineProps({
  title: {
    type: String,
    default: 'Berita Terbaru'
  },
  subtitle: {
    type: String,
    default: 'Informasi dan pengumuman kampus'
  },
  limit: {
    type: Number,
    default: 3
  }
})

const { articles, loading, fetchNewsList } = useNews()

// Fetch news for SSR
await useAsyncData('homepage-news-data', async () => {
  await fetchNewsList(1)
  return true
})

// Limit displayed articles based on props
const displayArticles = computed(() => {
  if (!articles.value) return []
  return articles.value.slice(0, props.limit)
})


const displayTitle = computed(() => {
  if (!props.title || props.title === 'Berita Terbaru' || props.title.includes('What <b>happen</b>')) {
    return t('news')
  }
  return props.title
})

const displaySubtitle = computed(() => {
  if (!props.subtitle || props.subtitle === 'Informasi dan pengumuman kampus') {
    return t('news_subtitle')
  }
  return props.subtitle
})

const { getImageUrl } = useMedia()

// Resolve sdgs bullet image using Vite base so it works with different base URLs
let sdgsBulletUrl = '/assets/img/sdgs.png'
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    sdgsBulletUrl = new URL('/assets/img/sdgs.png', import.meta.env.BASE_URL).href
  }
} catch (e) {
  sdgsBulletUrl = '/assets/img/sdgs.png'
}

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="blog-area gray-bg section-padding">
    <div class="container content-wide">
      <div class="row align-items-end mb-4">
        <div class="col-md-8 col-12">
          <div class="section-title mb-0" v-reveal data-reveal="fade-up">
            <h6>{{ displaySubtitle }}</h6>
            <h2 v-html="displayTitle" class="mb-0"></h2>
          </div>
        </div>
        <div class="col-md-4 col-12 text-md-right mt-3 mt-md-0" v-reveal data-reveal="fade-right" data-reveal-delay="150">
          <NuxtLink :to="localePath('/berita')" class="home-news-header-btn">
            {{ locale === 'en' ? 'View All News' : 'Lihat Semua Berita' }} <i class="las la-arrow-right ml-2"></i>
          </NuxtLink>
        </div>
      </div>
      
      <!-- Skeleton Loading -->
      <div v-if="loading" class="row mt-30">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="i in props.limit" :key="i">
          <div class="single-blog-item animate-pulse">
            <div class="blog-bg bg-gray-300" style="height: 250px; width: 100%;"></div>
            <div class="blog-content">
              <div class="h-4 bg-gray-300 w-1/4 mb-3 rounded"></div>
              <div class="h-6 bg-gray-300 w-full mb-3 rounded"></div>
              <div class="h-4 bg-gray-300 w-3/4 mb-4 rounded"></div>
              <div class="h-4 bg-gray-300 w-1/4 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Actual Content -->
      <div v-else class="row mt-30">
        <div 
          class="col-lg-4 col-md-6 col-sm-12"
          v-for="(article, index) in displayArticles" 
          :key="article.id"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 100"
        >
          <div class="single-blog-item hover-lift">
              <div class="blog-bg image-zoom">
               <img :src="getImageUrl(article.featured_image)" :alt="article.title" class="featured-img">
               <span class="blog-date">{{ formatDate(article.published_at) }}</span>
             </div>
            <div class="blog-content">
              <p class="blog-meta">News</p>

              <!-- SDG label + badges (UMS-like layout) -->
              
              <h5><NuxtLink :to="`/berita/${article.slug}`">{{ article.title }}</NuxtLink></h5>
              <p>{{ article.excerpt ? (article.excerpt.length > 100 ? article.excerpt.substring(0, 100) + '...' : article.excerpt) : '' }}</p>
              <div class="sdg-container">
                <template v-if="article.sdgs && article.sdgs.length">
                  <a class="mr-1" href="/tujuan-pembangunan-berkelanjutan" data-toggle="tooltip" data-placement="bottom" title="Tujuan Pembangunan Berkelanjutan" aria-label="sdg content link">
                    <img :src="sdgsBulletUrl" alt="sdgs-label" loading="lazy" class="sdgLabelImg" style="width:110px; height:40px;" />
                  </a>

                  <div v-for="goal in article.sdgs.slice(0,3)" :key="goal.id" class="sdgs-banner mr-1">
                    <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`" data-toggle="tooltip" data-placement="bottom" :title="`${goal.id} ${goal.title || goal.name}`" aria-label="sdg content link">
                      <img v-if="goal.icon_image && goal.icon_image.startsWith('http')" :src="goal.icon_image" alt="sdgs-badge" loading="lazy" style="width:40px; height:40px;" />
                      <div v-else class="sdg-number-badge" :style="{ backgroundColor: goal.color || '#f5f5f5', color: goal.color ? '#fff' : '#000' }">{{ goal.id }}</div>
                    </NuxtLink>
                  </div>

                  <div v-if="article.sdgs.length > 3" class="sdgs-banner mr-1">
                    <div class="sdg-more" style="cursor: pointer;" @click.prevent="openSdgsModal(article.sdgs)">+{{ article.sdgs.length - 3 }}</div>
                  </div>
                </template>
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

