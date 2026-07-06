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

      <!-- SDG badges previously here were moved to replace the Read More link -->

      <h5><NuxtLink :to="`/berita/${props.article.slug}`">{{ props.article.title }}</NuxtLink></h5>
      <p>{{ props.article.excerpt }}</p>
      <!-- SDG label + badges (UMS-like layout) - placed instead of Read More -->
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
.featured-img{ width:100%; height:250px; object-fit:cover; }
.sdg-more{ display:inline-block; background:#f1f1f1; color:#333; font-size:12px; padding:2px 6px; border-radius:12px; vertical-align:middle }
.sdg-container{ display:flex; flex-wrap:wrap; justify-content:flex-start; align-items:center }
.sdgLabelImg{ display:block }
.sdgs-banner{ display:inline-block }
.mr-1{ margin-right:8px }
.sdg-number-badge{ width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:#f5f5f5; border-radius:6px; font-weight:700 }
</style>

