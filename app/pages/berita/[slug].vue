<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '#imports'
import type { NewsArticle } from '~/types/news'
import { newsService } from '~/services/news'

const route = useRoute()
const slug = route.params.slug as string
const { t, locale } = useI18n()

// Fetch news detail using the service with fallback
const newsData = await newsService.getNewsBySlug(slug)
const article = newsData?.news as NewsArticle | null

if (article && newsData?.related_news) {
  article.related_news = newsData.related_news
}

// Mocking prev/next for UI until backend provides it
if (article) {
  if(!(article as any).previous_article) (article as any).previous_article = null;
  if(!(article as any).next_article) (article as any).next_article = null;
}

// Error handling - 404 if not found
if (!article) {
  throw createError({
    statusCode: 404,
    statusMessage: 'News Article Not Found',
    fatal: true
  })
}

// Author helpers (API may return string or { name, photo, bio })
const authorName = computed(() => {
  if (!article?.author) return 'UMPKU'
  if (typeof article.author === 'string') return article.author
  return article.author.name || 'UMPKU'
})

const authorPhoto = computed(() => {
  if (!article?.author || typeof article.author === 'string') return ''
  return article.author.photo?.trim() || ''
})

const authorBio = computed(() => {
  if (!article?.author || typeof article.author === 'string') return ''
  return article.author.bio?.trim() || ''
})

// SEO & Meta Tags
const protocol = useRequestURL().protocol
const host = useRequestURL().host
const canonicalUrl = computed(() => `${protocol}//${host}/berita/${slug}`)

// Schema.org JSON-LD for NewsArticle
const newsSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  description: article.excerpt,
  image: article.featured_image,
  datePublished: article.published_at,
  author: {
    '@type': 'Organization',
    name: authorName.value,
  },
  publisher: {
    '@type': 'Organization',
    name: 'UMPKU',
    logo: {
      '@type': 'ImageObject',
      url: '/assets/img/logo.png',
      width: 250,
      height: 250
    }
  }
}))

useHead({
  title: article.meta_title || article.title || 'Berita UMPKU',
  meta: [
    { name: 'description', content: article.meta_description || article.excerpt || 'Berita terbaru dari Universitas Muhammadiyah Pekajangan Pekalongan' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: article.meta_title || article.title || 'Berita UMPKU' },
    { property: 'og:description', content: article.meta_description || article.excerpt || 'Berita terbaru dari Universitas Muhammadiyah Pekajangan Pekalongan' },
    { property: 'og:image', content: article.og_image || article.featured_image || '/assets/img/logo.png' },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:site_name', content: 'UMPKU - Universitas Muhammadiyah Pekajangan Pekalongan' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article.title || 'Berita UMPKU' },
    { name: 'twitter:description', content: article.excerpt || 'Berita terbaru dari UMPKU' },
    { name: 'twitter:image', content: article.featured_image || '/assets/img/logo.png' }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value }
  ],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(newsSchema.value) }
  ]
})

// SDG Colors mapping for inline badges & contribution grid
const sdgColors: Record<number, string> = {
  1: '#e5243b', 2: '#dda63b', 3: '#4c9f38', 4: '#c5192d', 5: '#ff3a21',
  6: '#26bde2', 7: '#fcc30b', 8: '#a21942', 9: '#dd1c3b', 10: '#dd5b45',
  11: '#f3a538', 12: '#bf8b2e', 13: '#3f7e44', 14: '#0a97d9', 15: '#56c596',
  16: '#00689d', 17: '#e7aa14'
}
const getSdgColor = (id: number) => sdgColors[id] || '#0b2e59'

// Estimated reading time
const estimatedReadingTime = computed(() => {
  if (!article || !article.content) return 1
  const text = article.content.replace(/<[^>]*>/g, '') // remove html tags
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 200)) // 200 words per minute average
})

// TOC Auto generation
interface TocItem {
  id: string
  text: string
  level: number
}
const tocItems = ref<TocItem[]>([])

const generateToc = () => {
  if (typeof document === 'undefined') return
  const contentEl = document.querySelector('.news-content')
  if (!contentEl) return

  const headings = contentEl.querySelectorAll('h2, h3')
  const items: TocItem[] = []

  headings.forEach((heading, index) => {
    let id = heading.id
    if (!id) {
      id = `heading-${index}`
      heading.id = id
    }
    items.push({
      id,
      text: heading.textContent || '',
      level: heading.tagName.toLowerCase() === 'h2' ? 2 : 3
    })
  })

  tocItems.value = items
}

// Copy link logic
const copied = ref(false)
const copyToClipboard = () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(canonicalUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

// Share Links Computed
const shareWhatsapp = computed(() => {
  if (!article) return '#'
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + canonicalUrl.value)}`
})

const shareLinkedin = computed(() => {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl.value)}`
})

const shareFacebook = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl.value)}`
})

onMounted(() => {
  nextTick(() => {
    generateToc()
  })
})

onUnmounted(() => {
  // cleanup if necessary
})

// Format date helper
const formatHeroDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div v-if="article" class="editorial-page">
    
    <!-- SECTION 1: FULL WIDTH ARTICLE HERO -->
    <div class="editorial-hero-section" :style="{ backgroundImage: `url(${article.featured_image})` }">
      <div class="editorial-hero-overlay"></div>
      <div class="editorial-hero-content">
        <!-- Badges -->
        <div class="editorial-hero-badges">
        </div>
        
        <!-- Title -->
        <h1 class="editorial-hero-title">{{ article.title }}</h1>
        
    
      </div>
    </div>

    <!-- SECTION 2: ARTICLE INTRODUCTION -->
    <div class="editorial-intro-section" v-if="article.excerpt">
      <p class="editorial-excerpt">{{ article.excerpt }}</p>
    </div>

    <!-- SECTION 3: EDITORIAL LAYOUT (8/4 Grid) -->
    <div class="editorial-container-wide mt-5">
      <div class="row">
        <!-- Main Content 8 -->
        <div class="col-lg-8 col-md-8">
          <div class="editorial-reading-wrapper">
            <!-- Article Content -->
            <NewsContent :content="article.content" />

            <!-- SECTION 5: AUTHOR SECTION -->
            <div class="editorial-author-card">
              <div class="author-avatar-large">
                <img
                  v-if="authorPhoto"
                  :src="authorPhoto"
                  :alt="authorName"
                  class="author-avatar-img"
                >
                <i v-else class="las la-user-alt"></i>
              </div>
              <div class="author-info">
                <h4>{{ authorName }}</h4>
                <p v-if="authorBio" class="author-bio">{{ authorBio }}</p>
              </div>
            </div>

            <!-- SECTION 6: SHARE SECTION -->
            <div class="editorial-share-section">
              <h5 class="share-label">{{ t('share_article') }}</h5>
              <div class="share-buttons-float">
                <a :href="shareWhatsapp" target="_blank" class="btn-share-float wa"><i class="lab la-whatsapp"></i></a>
                <a :href="shareLinkedin" target="_blank" class="btn-share-float li"><i class="lab la-linkedin-in"></i></a>
                <a :href="shareFacebook" target="_blank" class="btn-share-float fb"><i class="lab la-facebook-f"></i></a>
                <button @click="copyToClipboard" class="btn-share-float cp" :title="copied ? t('link_copied') : t('copy_link')">
                  <i class="las" :class="copied ? 'la-check' : 'la-link'"></i>
                </button>
              </div>
            </div>

            <!-- SECTION 8: MAGAZINE STYLE NEXT/PREV -->
            <div class="editorial-magazine-nav">
              <NuxtLink v-if="article.previous_article" :to="`/berita/${article.previous_article.slug}`" class="magazine-nav-card nav-card-prev">
                <span class="nav-label">{{ t('previous_article') }}</span>
                <h4 class="nav-title">{{ article.previous_article.title }}</h4>
              </NuxtLink>
              <div v-else class="magazine-nav-card nav-card-prev" style="opacity: 0.5; pointer-events: none;">
                <span class="nav-label">{{ t('previous_article') }}</span>
                <h4 class="nav-title">{{ t('no_article') }}</h4>
              </div>
              
              <NuxtLink v-if="article.next_article" :to="`/berita/${article.next_article.slug}`" class="magazine-nav-card nav-card-next">
                <span class="nav-label">{{ t('next_article') }}</span>
                <h4 class="nav-title">{{ article.next_article.title }}</h4>
              </NuxtLink>
              <div v-else class="magazine-nav-card nav-card-next" style="opacity: 0.5; pointer-events: none;">
                <span class="nav-label">{{ t('next_article') }}</span>
                <h4 class="nav-title">{{ t('no_article') }}</h4>
              </div>
            </div>

            <!-- SDGs Impact Grid if any -->
            <div v-if="article.sdgs && article.sdgs.length" class="sdgs-impact-section">
              <h3 class="mb-4">{{ t('sdg_contribution') }}</h3>
              <div class="row">
                <div class="col-md-6 mb-4" v-for="goal in article.sdgs" :key="goal.id">
                   <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`" class="d-flex align-items-center p-3 border rounded shadow-sm" style="text-decoration: none; color: inherit; background: #fff;">
                     <div class="me-3 text-white fw-bold d-flex align-items-center justify-content-center" :style="{ backgroundColor: getSdgColor(goal.id), width: '50px', height: '50px', borderRadius: '8px', fontSize: '20px' }">
                       {{ goal.id }}
                     </div>
                     <div>
                       <div class="text-muted small">SDG {{ goal.id }}</div>
                       <div class="fw-bold">{{ goal.title }}</div>
                     </div>
                   </NuxtLink>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Sidebar 4 -->
        <div class="col-lg-4 col-md-4">
          <!-- SECTION 4: STICKY SIDEBAR -->
          <div class="editorial-sidebar-sticky">
            <!-- Article Meta Info -->
            <div class="sidebar-meta-block p-4 border rounded shadow-sm bg-light">
              <span class="editorial-meta-item d-flex align-items-center mb-3">
                <i class="las la-calendar-alt me-2" style="font-size: 1.3rem; color: #0b2e59;"></i>
                <span><strong>{{ t('created_at') }}:</strong><br>{{ formatHeroDate(article.created_at || article.published_at) }}</span>
              </span>
              <hr class="my-3">
              <span class="editorial-meta-item d-flex align-items-center">
                <i class="las la-clock me-2" style="font-size: 1.3rem; color: #0b2e59;"></i>
                <span><strong>{{ t('reading_duration') }}:</strong><br>{{ estimatedReadingTime }} {{ t('reading_time') }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 7: RELATED NEWS -->
      <div class="mt-5 pb-5 border-top pt-5">
        <h3 class="mb-5 text-center" style="font-size: 32px; font-weight: 700;">{{ t('related_news') }}</h3>
        <RelatedNews v-if="article.related_news && article.related_news.length" :articles="article.related_news" />
        <div v-else class="text-center text-muted">{{ t('no_related_news') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped fixes */
.editorial-page {
  background-color: #ffffff;
  min-height: 100vh;
}

.author-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.toc-item-link {
  color: #444;
  transition: color 0.2s ease;
  text-decoration: none;
}

.toc-item-link:hover {
  color: #0b2e59;
}
</style>
