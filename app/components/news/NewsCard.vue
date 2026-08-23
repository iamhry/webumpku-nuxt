<script setup lang="ts">
import { ref } from 'vue'
import type { NewsArticle } from '~/types/news'
import { useI18n, useLocalePath } from '#imports'
import SdgsModal from '~/components/sdgs/SdgsModal.vue'

const props = defineProps<{ article: NewsArticle }>()
const { locale } = useLocale()
const localePath = useLocalePath()
const { getImageUrl } = useMedia()

const isModalOpen = ref(false)
const selectedSdgs = ref<any[]>([])

const openSdgsModal = (sdgs: any[]) => {
  selectedSdgs.value = sdgs
  isModalOpen.value = true
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

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch (e) {
    return dateString
  }
}

let sdgsBulletUrl = '/assets/img/sdgs_web.png'
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    sdgsBulletUrl = new URL('/assets/img/sdgs_web.png', import.meta.env.BASE_URL).href
  }
} catch (e) {
  sdgsBulletUrl = '/assets/img/sdgs_web.png'
}
</script>

<template>
  <div class="single-blog-item news-card-clean">
    <!-- Gambar Utama Berita -->
    <NuxtLink :to="`/berita/${props.article.slug}`" class="blog-bg">
      <img 
        :src="getImageUrl(props.article.featured_image)" 
        :alt="props.article.title" 
        class="featured-img"
        loading="lazy"
      />
    </NuxtLink>

    <!-- Konten Berita -->
    <div class="blog-content">
      <!-- Tag Kategori -->
      <span class="news-card-tag">{{ getCategoryLabel(props.article) }}</span>

      <!-- Judul Berita -->
      <h5>
        <NuxtLink :to="`/berita/${props.article.slug}`">
          {{ props.article.title }}
        </NuxtLink>
      </h5>

      <!-- Excerpt / Ringkasan -->
      <p class="news-card-excerpt">{{ props.article.excerpt }}</p>

      <!-- Meta (Author & Date) -->
      <p class="blog-meta">
        <span>{{ locale === 'en' ? 'By' : 'Oleh' }} <b class="blog-meta-author">{{ getAuthorName(props.article) }}</b></span>
        <span class="blog-meta-dot" aria-hidden="true">&middot;</span>
        <span class="blog-date">{{ formatDate(props.article.published_at) }}</span>
      </p>

      <!-- Footer Kartu: SDGs & Tombol Detail -->
      <div class="news-card-footer">
        <div class="sdg-container">
          <template v-if="props.article.sdgs && props.article.sdgs.length">
            <!-- Logo SDGs -->
            <a class="mr-1" href="/tujuan-pembangunan-berkelanjutan" data-toggle="tooltip" data-placement="bottom" title="Tujuan Pembangunan Berkelanjutan" aria-label="sdg content link">
              <img :src="sdgsBulletUrl" alt="sdgs-label" loading="lazy" class="sdgLabelImg" style="width:90px; height:40px;" />
            </a>

            <!-- Badge SDGs (Maksimal 3) -->
            <div v-for="goal in props.article.sdgs.slice(0, 3)" :key="goal.id" class="sdgs-banner mr-1">
              <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`" data-toggle="tooltip" data-placement="bottom" :title="`${goal.id} ${goal.title || goal.name}`" aria-label="sdg content link">
                <img v-if="goal.icon_image && goal.icon_image.startsWith('http')" :src="goal.icon_image" alt="sdgs-badge" loading="lazy" style="width:40px; height:40px;" />
                <div v-else class="sdg-number-badge" :style="{ backgroundColor: goal.color || '#f5f5f5', color: goal.color ? '#fff' : '#000' }">
                  {{ goal.id }}
                </div>
              </NuxtLink>
            </div>

            <!-- More SDGs (+N) -->
            <div v-if="props.article.sdgs.length > 3" class="sdgs-banner mr-1">
              <div class="sdg-more" style="cursor: pointer;" @click.prevent="openSdgsModal(props.article.sdgs)">
                +{{ props.article.sdgs.length - 3 }}
              </div>
            </div>
          </template>
        </div>

        <!-- Tombol Panah (rs-square-btn) -->
        <NuxtLink :to="`/berita/${props.article.slug}`" class="rs-square-btn" aria-label="Read more">
          <span class="icon-box">
            <i class="las la-arrow-right icon-first"></i>
            <i class="las la-arrow-right icon-second"></i>
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Modal SDGs -->
    <SdgsModal :show="isModalOpen" :sdgs="selectedSdgs" @close="isModalOpen = false" />
  </div>
</template>

<style scoped>
@import '~/assets/css/news-card.css';
</style>