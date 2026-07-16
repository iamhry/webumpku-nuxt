<template>
  <section class="section-news py-6 bg-canvas border-top border-light">
    <div class="container">
      
      <!-- HEADER LAYOUT: Clean Editorial & Align-End -->
      <div class="header-block mb-5">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end g-3">
          <div>
            <span class="tagline text-uppercase fw-bold mb-2 d-block">Berita Terkini</span>
            <h2 class="section-title fw-black tracking-tight mb-0">
              Kabar Aksi SDGs
            </h2>
          </div>
          <div>
            <NuxtLink to="/berita?category=sdgs" class="btn-editorial d-none d-md-inline-block fw-bold text-decoration-none">
              <span>Lihat Semua Berita</span> <i class="fa fa-arrow-right arrow-icon-top"></i>
            </NuxtLink>
          </div>
        </div>
        <div class="header-line mt-4"></div>
      </div>

      <!-- GRID CARDS AREA -->
      <div class="row g-4 justify-content-center">
        <!-- Loader / Fallback reaktif jika data murni berita kosong setelah disaring -->
        <div v-if="!formattedNews || formattedNews.length === 0" class="col-12 text-center py-5">
          <p class="text-secondary font-monospace">Belum ada berita terkait SDGs saat ini.</p>
        </div>

        <div v-for="article in formattedNews" :key="article.id" class="col-md-6 col-lg-4">
          <article class="news-card h-100 bg-white d-flex flex-column overflow-hidden">
            
            <!-- Image Frame dengan Anchor Ratio Tetap -->
            <div class="card-media position-relative overflow-hidden w-100">
              <img :src="article.image" class="w-100 h-100 object-fit-cover transition-image position-absolute top-0 start-0" :alt="article.title" loading="lazy" />
              <div class="media-overlay position-absolute inset-0"></div>
              
              <!-- Badge Kategori Solid SDGs -->
              <div class="position-absolute top-0 start-0 p-3 z-3">
                <span class="sdgs-badge text-uppercase fw-bold font-monospace">SDGs</span>
              </div>
            </div>
            
            <!-- Content Frame dengan Flex-Grow agar tinggi selalu sama rata -->
            <div class="card-content p-4 d-flex flex-column flex-grow-1 justify-content-between">
              <div>
                <!-- Metadata Tanggal -->
                <div class="text-secondary font-monospace text-xs mb-2 d-flex align-items-center gap-2">
                  <i class="fa fa-calendar-o opacity-75"></i> {{ article.date }}
                </div>
                
                <!-- Judul Artikel Kontras Tinggi -->
                <h3 class="card-title fw-bold mb-3">
                  <NuxtLink :to="`/berita/${article.slug}`" class="text-dark-title text-decoration-none">
                    {{ article.title }}
                  </NuxtLink>
                </h3>
                
                <!-- Excerpt Singkat -->
                <p class="card-desc text-secondary mb-4">{{ article.excerpt }}</p>
              </div>
              
              <!-- Action Button Link -->
              <div class="card-action mt-auto">
                <NuxtLink :to="`/berita/${article.slug}`" class="action-link fw-bold d-inline-flex align-items-center gap-2">
                  <span>Baca Selengkapnya</span>
                  <i class="fa fa-arrow-right arrow-icon"></i>
                </NuxtLink>
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
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  newsData: {
    type: [Array, Object] as any,
    default: () => []
  }
})

const formattedNews = computed(() => {
  // 1. Ambil data dari props, tangani jika dibungkus .data oleh axios/strapi/NuxtFetch
  const rawData = props.newsData?.data || props.newsData || []
  if (!Array.isArray(rawData)) return []
  
  // 2. FILTER FLEXIBEL: Keluarkan hanya item yang merusak (seperti injected-events)
  // dan pertahankan item berita asli walaupun dari API tidak tertulis type: 'news'
  const cleanNewsData = rawData.filter((item: any) => {
    if (!item) return false
    
    // Singkirkan objek suntikan event
    if (item.type === 'events' || item.id === 'injected-events') {
      return false
    }
    
    // Pastikan objek memiliki parameter judul atau title agar valid sebagai konten berita
    return !!(item.title || item.judul || item.slug)
  })
  
  // 3. Map data berita ke struktur layout
  return cleanNewsData.map((news: any) => ({
    id: news.id,
    slug: news.slug || news.id,
    title: news.title || news.judul || 'Berita SDGs',
    excerpt: news.excerpt || (news.content ? news.content.replace(/<[^>]*>/g, '').substring(0, 90) + '...' : 'Klik untuk membaca detail aksi pelaksanaan SDGs.'),
    image: news.image || news.cover_image || 'https://images.unsplash.com/photo-1531206715517-5c5610815fdf?auto=format&fit=crop&q=80',
    date: formatDate(news.created_at || news.published_at || news.date || new Date().toISOString())
  })).slice(0, 3) // Batasi maksimal 3 item
})

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return dateString
  }
}
</script>

<style scoped>
/* Desain Tokens */
.bg-canvas { background-color: #ffffff; }
.py-6 { padding-top: 5.5rem; padding-bottom: 5.5rem; }
.fw-black { font-weight: 900; }
.tracking-tight { letter-spacing: -0.03em; }
.text-secondary { color: #64748b !important; }
.text-xs { font-size: 0.8rem; }
.inset-0 { top: 0; left: 0; right: 0; bottom: 0; }

/* ==========================================================================
   STYLE EDITORIAL HEADER
   ========================================================================== */
.tagline {
  color: var(--primary-color, #0b2e59);
  letter-spacing: 0.15em;
  font-size: 0.8rem;
}

.section-title {
  font-size: clamp(2rem, 3.8vw, 2.5rem);
  color: #0f172a;
}

.header-line {
  width: 100%;
  height: 1px;
  background-color: #f1f5f9;
}

.btn-editorial {
  color: #0f172a;
  font-size: 0.95rem;
  border-bottom: 2px solid #0f172a;
  padding-bottom: 4px;
  transition: all 0.2s ease;
}
.btn-editorial:hover {
  opacity: 0.7;
}
.arrow-icon-top {
  font-size: 0.8rem;
  margin-left: 4px;
}

/* ==========================================================================
   STYLE PREMIUM MINIMALIST NEWS CARD
   ========================================================================== */
.news-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-media {
  height: 220px;
  width: 100%;
}

.media-overlay {
  background: rgba(15, 23, 42, 0.01);
  z-index: 2;
}

.transition-image {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.sdgs-badge {
  background-color: var(--primary-color, #0b2e59);
  color: #ffffff;
  font-size: 0.72rem;
  padding: 5px 12px;
  letter-spacing: 1px;
  border-radius: 4px;
}

.card-content {
  flex-grow: 1;
}

.text-dark-title {
  color: #0f172a;
  transition: color 0.2s ease;
}

.card-title {
  font-size: 1.15rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-title:hover .text-dark-title {
  color: var(--primary-color, #0b2e59);
}

.card-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Action Link Interaktif */
.action-link {
  font-size: 0.9rem;
  color: var(--primary-color, #0b2e59) !important;
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  display: inline-flex;
}

.action-link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--primary-color, #0b2e59);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.arrow-icon {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

/* HOVER MUTATIONS */
.news-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-4px);
}

.news-card:hover .transition-image {
  transform: scale(1.03);
}

.news-card:hover .action-link::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.news-card:hover .arrow-icon {
  transform: translateX(4px);
}
</style>