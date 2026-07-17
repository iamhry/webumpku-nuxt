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

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch (e) {
    return dateString
  }
}

let sdgsBulletUrl = '/assets/img/sdgs.png'
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    sdgsBulletUrl = new URL('/assets/img/sdgs.png', import.meta.env.BASE_URL).href
  }
} catch (e) {
  sdgsBulletUrl = '/assets/img/sdgs.png'
}
</script>

<template>
  <article class="single-blog-item h-100 bg-white d-flex flex-column overflow-hidden border rounded-3 shadow-sm">
    
    <div class="blog-bg position-relative overflow-hidden w-100" style="height: 250px;">
      <img 
        :src="props.article.featured_image" 
        class="featured-img object-fit-cover w-100 h-100" 
        :alt="props.article.title"
        loading="lazy" 
      />
      <span class="blog-date">{{ formatDate(props.article.published_at) }}</span>
    </div>

    <!-- Konten Isi Kartu Berita -->
    <div class="blog-content p-4 d-flex flex-column flex-grow-1 justify-content-between">
      <div>
        <p class="blog-meta text-uppercase font-monospace mb-2">News</p>
        
        <!-- Judul Berita -->
        <h5 class="news-title fw-bold mb-3">
          <NuxtLink :to="`/berita/${props.article.slug}`" class="text-dark text-decoration-none">
            {{ props.article.title }}
          </NuxtLink>
        </h5>
        
        <!-- Excerpt Singkat dengan Batasan Karakter bawaan Proyek Anda -->
        <p class="news-excerpt text-secondary text-sm mb-4">
          {{ props.article.excerpt ? (props.article.excerpt.length > 100 ? props.article.excerpt.substring(0, 100) + '...' : props.article.excerpt) : '' }}
        </p>
      </div>

      <!-- Container Modul Jalur Badges SDGs -->
      <div class="sdg-container mt-auto pt-3 border-top">
        <template v-if="props.article.sdgs && props.article.sdgs.length">
          <!-- Bullet Label Utama SDGs -->
          <a class="mr-1" href="/tujuan-pembangunan-berkelanjutan" data-toggle="tooltip" data-placement="bottom" title="Tujuan Pembangunan Berkelanjutan">
            <img :src="sdgsBulletUrl" alt="sdgs-label" loading="lazy" class="sdgLabelImg" style="width:110px; height:40px;" />
          </a>

          <div v-for="goal in props.article.sdgs.slice(0, 3)" :key="goal.id" class="sdgs-banner mr-1">
            <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`" data-toggle="tooltip" data-placement="bottom" :title="`${goal.id} ${goal.title || goal.name}`" aria-label="sdg content link">
              <!-- Render Ikon Gambar Jika Tersedia -->
              <img v-if="goal.icon_image && goal.icon_image.startsWith('http')" :src="goal.icon_image" alt="sdgs-badge" loading="lazy" class="sdg-icon" style="width:40px; height:40px;" />
              <!-- Render Badge Angka Tekstual sebagai Cadangan -->
              <div v-else class="sdg-number-badge" :style="{ backgroundColor: goal.color || '#f5f5f5', color: goal.color ? '#fff' : '#000' }">
                {{ goal.id }}
              </div>
            </NuxtLink>
          </div>

          <!-- Indikator Angka Tambahan Jika Item Lebih dari 3 -->
          <div v-if="props.article.sdgs.length > 3" class="sdgs-banner mr-1">
            <div class="sdg-more" style="cursor: pointer;" @click.prevent="openSdgsModal(props.article.sdgs)">
              +{{ props.article.sdgs.length - 3 }}
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Dialog Modal SDGs -->
    <SdgsModal :show="isModalOpen" :sdgs="selectedSdgs" @close="isModalOpen = false" />
  </article>
</template>

<style scoped>
@import '~/assets/css/news-card.css';
</style>