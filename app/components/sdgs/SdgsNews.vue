<template>
  <section class="section-news py-6 bg-canvas border-top border-light mb-5">
    <div class="container">

      <!-- HEADER LAYOUT -->
      <div class="header-block mb-5">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end g-3">
          <div>
            <span class="tagline text-uppercase fw-bold mb-2 d-block">Berita Terkini</span>
            <h2 class="section-title fw-black tracking-tight mb-0">
              Kabar Aksi SDGs
            </h2>
          </div>
          <div>
            <NuxtLink to="/berita?category=sdgs" class="home-news-header-btn d-none d-md-inline-flex mt-3 mt-md-0">
              <span>Lihat Semua Berita</span> <i class="fa fa-arrow-right ml-2"></i>
            </NuxtLink>
          </div>
        </div>
        <div class="header-line mt-4"></div>
      </div>

      <!-- GRID CARDS AREA -->
      <div class="row g-4 justify-content-center">
        <!-- Fallback reaktif jika data kosong -->
        <div v-if="!formattedNews || formattedNews.length === 0" class="col-12 text-center py-5">
          <p class="text-secondary font-monospace">Belum ada berita terkait SDGs saat ini.</p>
        </div>

        <div v-for="article in formattedNews" :key="article.id" class="col-md-6 col-lg-4">
          <article
            class="single-blog-item h-100 bg-white d-flex flex-column overflow-hidden border rounded-3 shadow-sm">

            <!-- Image Frame dengan Tanggal & CSS .featured-img -->
            <div class="blog-bg position-relative overflow-hidden w-100" style="height: 250px;">
              <img :src="article.image" class="featured-img object-fit-cover w-100 h-100" :alt="article.title"
                loading="lazy" />
              <!-- Sesuai kelas .blog-date milik CSS eksternal Anda -->
              <span class="blog-date">{{ article.date }}</span>
            </div>

            <!-- Konten Kartu Berita -->
            <div class="blog-content p-4 d-flex flex-column flex-grow-1 justify-content-between">
              <div>
                <p class="blog-meta text-uppercase font-monospace mb-2">News</p>
                <p>{{ article.excerpt ? (article.excerpt.length > 100 ? article.excerpt.substring(0, 100) + '...' :
                  article.excerpt) : '' }}</p>
              </div>

              <!-- Container SDGs: Sesuai struktur data map terbaru yang telah diperbaiki -->
              <div class="sdg-container mt-auto pt-3 border-top">
                <template v-if="article.sdgs && article.sdgs.length">
                  <!-- Bullet Label Utama SDGs -->
                  <a class="mr-1" href="/tujuan-pembangunan-berkelanjutan" data-toggle="tooltip" data-placement="bottom"
                    title="Tujuan Pembangunan Berkelanjutan">
                    <img :src="sdgsBulletUrl" alt="sdgs-label" loading="lazy" class="sdgLabelImg"
                      style="width:110px; height:40px;" />
                  </a>

                  <div v-for="goal in article.sdgs.slice(0, 3)" :key="goal.id" class="sdgs-banner mr-1">
                    <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`" data-toggle="tooltip"
                      data-placement="bottom" :title="`${goal.id} ${goal.title || goal.name}`"
                      aria-label="sdg content link">
                      <img v-if="goal.icon_image && goal.icon_image.startsWith('http')" :src="goal.icon_image"
                        alt="sdgs-badge" loading="lazy" style="width:40px; height:40px;" />
                      <div v-else class="sdg-number-badge"
                        :style="{ backgroundColor: goal.color || '#f5f5f5', color: goal.color ? '#fff' : '#000' }">{{
                        goal.id }}</div>
                    </NuxtLink>
                  </div>

                  <!-- Indikator Angka Jika Lebih dari 3 item -->
                  <div v-if="article.sdgs.length > 3" class="sdgs-banner mr-1">
                    <div class="sdg-more" style="cursor: pointer;" @click.prevent="openSdgsModal(article.sdgs)">
                      +{{ article.sdgs.length - 3 }}
                    </div>
                  </div>
                </template>
              </div>
            </div>

          </article>
        </div>
      </div>

      <!-- Tombol Tampil Mobile Saja -->
      <div class="text-center mt-4 d-md-none">
        <NuxtLink to="/berita?category=sdgs" class="btn btn-outline-dark rounded-pill py-3 fw-bold w-100">
          Lihat Semua Berita
        </NuxtLink>
      </div>

    </div>
    <SdgsModal :show="isModalOpen" :sdgs="selectedSdgs" @close="isModalOpen = false" />
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import SdgsModal from '~/components/sdgs/SdgsModal.vue'

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
  }
})

let sdgsBulletUrl = '/assets/img/sdgs.png'
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    sdgsBulletUrl = new URL('/assets/img/sdgs.png', import.meta.env.BASE_URL).href
  }
} catch (e) {
  sdgsBulletUrl = '/assets/img/sdgs.png'
}

const formattedNews = computed(() => {
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

    // Mengambil array mentah sdgs
    let rawSdgs = news.sdgs || item.sdgs || []
    if (rawSdgs && rawSdgs.data) {
      rawSdgs = rawSdgs.data
    }

    const formattedSdgs = Array.isArray(rawSdgs)
      ? rawSdgs.map((s: any) => {
        const sActual = s.attributes || s;

        // CRITICAL TRACKING: Pastikan mengambil angka nomor SDG dari segala kemungkinan nama field API
        const targetId = s.id ||
          sActual.id ||
          sActual.goal_number ||
          sActual.goal_no ||
          sActual.number ||
          sActual.code ||
          '';

        return {
          id: targetId, // Nilai ini yang dicetak pada {{ goal.id }} di template
          slug: sActual.slug || s.id || targetId,
          title: sActual.title || sActual.name || '',
          icon_image: sActual.icon_image || s.icon_image || null,
          color: sActual.color || s.color || null
        }
      })
      : []

    return {
      id: newsId,
      slug: news.slug || newsId,
      title: news.title || news.judul || 'Berita SDGs',
      excerpt: news.excerpt || (news.content ? news.content.replace(/<[^>]*>/g, '').substring(0, 90) + '...' : 'Klik untuk membaca detail aksi pelaksanaan SDGs.'),
      image: news.image || news.cover_image || news.featured_image || 'https://images.unsplash.com/photo-1531206715517-5c5610815fdf?auto=format&fit=crop&q=80',
      date: formatDate(news.published_at || news.created_at || news.date || new Date().toISOString()),
      sdgs: formattedSdgs
    }
  }).slice(0, 3)
})

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch (e) {
    return dateString
  }
}
</script>

<style scoped>
@import '~/assets/css/news-card.css';
</style>