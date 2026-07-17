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
          <div class="single-blog-item news-card-clean">
              <NuxtLink :to="`/berita/${article.slug}`" class="blog-bg">
               <img :src="getImageUrl(article.featured_image)" :alt="article.title" class="featured-img">
             </NuxtLink>
            <div class="blog-content">
              <p class="blog-meta">
                <span>News</span>
                <span class="blog-meta-dot" aria-hidden="true">&middot;</span>
                <span class="blog-date">{{ formatDate(article.published_at) }}</span>
              </p>

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
/* Clean minimal news card (image / title / excerpt), no overlay badges */
.news-card-clean {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  box-shadow: none !important;
  margin-bottom: 0;
}

.news-card-clean:hover {
  transform: none !important;
  box-shadow: none !important;
  border-color: transparent !important;
}

.news-card-clean .blog-bg {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  aspect-ratio: 3 / 2;
}

.news-card-clean .featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card-clean:hover .featured-img {
  transform: scale(1.05);
}

.news-card-clean .blog-content {
  padding: 20px 0 0;
}

.news-card-clean .blog-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #84888c;
  text-transform: none;
  letter-spacing: normal;
  margin: 0 0 10px;
}

.news-card-clean .blog-meta-dot {
  color: #c4c7ca;
}

.news-card-clean h5 {
  margin: 0 0 10px;
  font-size: 18px;
  line-height: 1.35;
}

.news-card-clean h5 a {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #171717;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.news-card-clean h5 a:hover {
  color: #0b2e59;
}

.news-card-clean .blog-content > p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.6;
  color: #84888c;
  margin: 0;
}

.news-card-clean .sdg-container {
  margin-top: 14px;
  min-height: 0;
}

.featured-img{ width:100%; height:250px; object-fit:cover }
.sdg-badges{ margin-bottom:8px }
.sdg-item{ margin-right:6px; display:inline-block; vertical-align:middle }
.sdg-icon{ width:24px; height:24px; border-radius:50%; object-fit:cover; display:block }
.sdg-more{ display:inline-block; background:#f1f1f1; color:#333; font-size:12px; padding:2px 6px; border-radius:12px; vertical-align:middle }
.sdgs-bullet{ width:18px; height:18px; object-fit:contain; margin-right:6px; vertical-align:middle }
.sdg-number{ font-size:13px; font-weight:600; margin-right:6px; vertical-align:middle }

/* Tooltip styles for SDG icons */
.tooltip{ position:relative }
.tooltip .tooltip-text{ visibility:hidden; opacity:0; position:absolute; bottom:130%; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.75); color:#fff; padding:6px 8px; border-radius:4px; font-size:12px; white-space:nowrap; transition:opacity .12s ease; z-index:20 }
.tooltip .tooltip-text::after{ content:""; position:absolute; top:100%; left:50%; transform:translateX(-50%); border-width:6px; border-style:solid; border-color: rgba(0,0,0,0.75) transparent transparent transparent }
.tooltip:hover .tooltip-text, .tooltip:focus-within .tooltip-text{ visibility:visible; opacity:1 }
.sdg-container{ display:flex; flex-wrap:wrap; justify-content:flex-start; align-items:center; min-height:40px; }
.sdgLabelImg{ display:block }
.sdgs-banner{ display:inline-block }
.mr-1{ margin-right:8px }
.sdg-number-badge{ width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:#f5f5f5; border-radius:6px; font-weight:700 }

.home-news-header-btn {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: var(--color-primary, #0b2e59);
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  padding-bottom: 4px;
}

.home-news-header-btn:hover {
  color: var(--color-secondary, #0b7a75);
  border-color: var(--color-secondary, #0b7a75);
  transform: translateX(4px);
  text-decoration: none;
}
</style>

