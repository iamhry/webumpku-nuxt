<script setup lang="ts">
import { ref } from 'vue'
import type { NewsArticle } from '~/types/news'
import SdgsModal from '~/components/sdgs/SdgsModal.vue'

const props = defineProps<{ article: NewsArticle }>()

const isModalOpen = ref(false)
const selectedSdgs = ref<any[]>([])

const openSdgsModal = (sdgs: any[]) => {
  selectedSdgs.value = sdgs
  isModalOpen.value = true
}

// Resolve sdgs bullet image using Vite base so it works with different base URLs
let sdgsBulletUrl = '/assets/img/sdgs.png'
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    // import.meta.env.BASE_URL may be undefined in some runtimes (SSR), guard it
    sdgsBulletUrl = new URL('/assets/img/sdgs.png', import.meta.env.BASE_URL).href
  }
} catch (e) {
  // fallback to absolute public path
  sdgsBulletUrl = '/assets/img/sdgs.png'
}
</script>

<template>
  <div class="single-blog-item">
    <div class="blog-bg">
      <img :src="props.article.featured_image" :alt="props.article.title" class="featured-img" />
    </div>
    
    <div class="blog-content">
      <p class="blog-meta">{{ props.article.published_at }}</p>

      <!-- EDIT DI SINI: Tag judul <h5> diberikan class "news-title" -->
      <h5 class="news-title">
        <NuxtLink :to="`/berita/${props.article.slug}`">{{ props.article.title }}</NuxtLink>
      </h5>
      
      <!-- EDIT DI SINI: Tag <p> diberikan class "news-excerpt" untuk memotong teks -->
      <p class="news-excerpt">{{ props.article.excerpt }}</p>
      
      <div v-if="props.article.sdgs && props.article.sdgs.length" class="sdg-container">
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
    </div>
    <SdgsModal :show="isModalOpen" :sdgs="selectedSdgs" @close="isModalOpen = false" />
  </div>
</template>

<style scoped>
.single-blog-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff; /* sesuaikan jika ada background color */
  border-radius: 8px; /* sesuaikan style website */
  overflow: hidden;
}

.featured-img { 
  width: 100%; 
  height: 220px; /* Diubah sedikit agar proporsional */
  object-fit: cover; 
}

.blog-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px; /* sesuaikan padding dalam card */
}

.blog-meta {
  margin-bottom: 10px;
}

.news-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em; /* Mengunci ruang agar judul 1 baris & 2 baris tingginya sama */
  margin-bottom: 10px;
}

.news-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 4.5em; /* Mengunci ruang agar tinggi tulisan seragam */
  margin-bottom: 20px;
  color: #666;
}

.sdg-container { 
  margin-top: auto; 
  display: flex; 
  flex-wrap: wrap; 
  justify-content: flex-start; 
  align-items: center; 
}

.sdg-more { display: inline-block; background: #f1f1f1; color: #333; font-size: 12px; padding: 2px 6px; border-radius: 12px; vertical-align: middle }
.sdgLabelImg { display: block }
.sdgs-banner { display: inline-block }
.mr-1 { margin-right: 8px }
.sdg-number-badge { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 6px; font-weight: 700 }
</style>