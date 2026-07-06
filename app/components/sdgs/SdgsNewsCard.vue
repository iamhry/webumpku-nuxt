<script setup lang="ts">
import { ref } from 'vue'
import type { NewsArticle } from '~/types/news'
import SdgsModal from '~/components/sdgs/SdgsModal.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ article: NewsArticle }>()

const isModalOpen = ref(false)
const selectedSdgs = ref<any[]>([])

const openSdgsModal = (sdgs: any[]) => {
  selectedSdgs.value = sdgs
  isModalOpen.value = true
}

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
  <div class="single-blog-item">
    <div class="blog-bg">
      <img :src="props.article.featured_image" :alt="props.article.title" class="featured-img" />
      <span class="blog-date">{{ formatDate(props.article.published_at) }}</span>
    </div>
    <div class="blog-content">
      <p class="blog-meta">News</p>
      <h5><NuxtLink :to="`/berita/${props.article.slug}`">{{ props.article.title }}</NuxtLink></h5>
      <p>{{ props.article.excerpt ? (props.article.excerpt.length > 100 ? props.article.excerpt.substring(0, 100) + '...' : props.article.excerpt) : '' }}</p>
      
      <div v-if="props.article.sdgs && props.article.sdgs.length" class="sdg-container mt-3">
        <a class="mr-1" href="/tujuan-pembangunan-berkelanjutan" data-toggle="tooltip" data-placement="bottom" title="Tujuan Pembangunan Berkelanjutan" aria-label="sdg content link">
          <img :src="sdgsBulletUrl" alt="sdgs-label" loading="lazy" class="sdgLabelImg" style="width:110px; height:40px;" />
        </a>

        <div v-for="goal in props.article.sdgs.slice(0,3)" :key="goal.id" class="sdgs-banner mr-1">
          <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`" data-toggle="tooltip" data-placement="bottom" :title="`${goal.id} ${goal.title || goal.name}`" aria-label="sdg content link">
            <img v-if="goal.icon_image && goal.icon_image.startsWith('http')" :src="goal.icon_image" alt="sdgs-badge" loading="lazy" style="width:40px; height:40px;" />
            <div v-else class="sdg-number-badge" :style="{ backgroundColor: goal.color || '#f5f5f5', color: goal.color ? '#fff' : '#000' }">{{ goal.id }}</div>
          </NuxtLink>
        </div>

        <div v-if="props.article.sdgs.length > 3" class="sdgs-banner mr-1">
          <div class="sdg-more" style="cursor: pointer;" @click.prevent="openSdgsModal(props.article.sdgs)">+{{ props.article.sdgs.length - 3 }}</div>
        </div>
      </div>
      
      <div class="mt-4">
        <NuxtLink :to="`/berita/${props.article.slug}`" class="sdgs-read-more-btn">
          {{ t('read_more') }} <i class="las la-arrow-right"></i>
        </NuxtLink>
      </div>
    </div>
    <SdgsModal :show="isModalOpen" :sdgs="selectedSdgs" @close="isModalOpen = false" />
  </div>
</template>

<style scoped>
.featured-img{ width:100%; height:250px; object-fit:cover; }
.blog-date{ position:absolute; top:20px; left:20px; background:#007bff; color:#fff; padding:5px 15px; border-radius:20px; font-size:14px; font-weight:600; }
.sdg-more{ display:inline-block; background:#f1f1f1; color:#333; font-size:12px; padding:2px 6px; border-radius:12px; vertical-align:middle; font-weight: bold; }
.sdg-container{ display:flex; flex-wrap:wrap; justify-content:flex-start; align-items:center }
.sdgLabelImg{ display:block }
.sdgs-banner{ display:inline-block }
.mr-1{ margin-right:8px }
.sdg-number-badge{ width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:#f5f5f5; border-radius:6px; font-weight:700 }
.sdgs-read-more-btn{ display:inline-block; font-weight:600; color:#007bff; text-decoration:none; transition:all 0.3s ease; }
.sdgs-read-more-btn:hover{ color:#0056b3; transform:translateX(5px); }
</style>
