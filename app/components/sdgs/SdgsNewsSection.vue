<template>
  <div class="sdgs-news section-padding">
    <div class="container">
      <div class="row align-items-center mb-5">
        <div class="col-lg-8">
          <div class="section-title">
            <span>Publikasi & Riset</span>
            <h2>Latest SDGs Updates</h2>
          </div>
        </div>
        <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
          <NuxtLink to="/berita" class="main-btn">Lihat Semua Berita</NuxtLink>
        </div>
      </div>
      
      <div class="row g-4">
        <div class="col-lg-4 col-md-6" v-for="item in news" :key="item.id">
          <div class="news-card">
            <div class="news-img">
              <img :src="item.image" :alt="item.title" />
              <div class="sdg-badges">
                <span class="badge" v-for="tag in item.sdgs" :key="tag.id" :style="{ backgroundColor: tag.color }">
                  {{ tag.name }}
                </span>
              </div>
            </div>
            <div class="news-content">
              <span class="date"><i class="las la-calendar"></i> {{ item.date }}</span>
              <h3><NuxtLink :to="`/berita/${item.slug}`">{{ item.title }}</NuxtLink></h3>
              <p>{{ item.excerpt }}</p>
              <NuxtLink :to="`/berita/${item.slug}`" class="read-more">Read More <i class="las la-arrow-right"></i></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  newsData: {
    type: Array,
    default: () => []
  }
})

// Fallback data if API not ready
const fallbackNews = [
  {
    id: 1,
    title: 'Pelatihan Kesehatan Reproduksi Remaja di Desa Binaan',
    slug: 'pelatihan-kesehatan',
    image: '/assets/img/news/1.jpg',
    date: '12 Jun 2026',
    excerpt: 'Mahasiswa FIKES UMPKU mengadakan penyuluhan untuk meningkatkan kesadaran kesehatan reproduksi di desa binaan.',
    sdgs: [{ id: 3, name: 'SDG 3', color: '#4C9F38' }]
  },
  {
    id: 2,
    title: 'Pemasangan Panel Surya di Laboratorium Terpadu UMPKU',
    slug: 'pemasangan-panel-surya',
    image: '/assets/img/news/2.jpg',
    date: '10 Jun 2026',
    excerpt: 'Upaya kampus menuju green energy dengan pemasangan panel surya sebagai sumber energi alternatif di laboratorium.',
    sdgs: [{ id: 7, name: 'SDG 7', color: '#FCC30B' }, { id: 13, name: 'SDG 13', color: '#3F7E44' }]
  },
  {
    id: 3,
    title: 'Beasiswa Penuh untuk 50 Mahasiswa Berprestasi',
    slug: 'beasiswa-penuh',
    image: '/assets/img/news/3.jpg',
    date: '05 Jun 2026',
    excerpt: 'Mewujudkan pendidikan merata dan berkualitas untuk mahasiswa daerah melalui program beasiswa penuh dari mitra strategis.',
    sdgs: [{ id: 4, name: 'SDG 4', color: '#C5192D' }, { id: 10, name: 'SDG 10', color: '#DD1367' }]
  }
]

const news = computed(() => {
  return props.newsData && props.newsData.length > 0 ? props.newsData : fallbackNews
})
</script>

<style scoped>
.news-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  background: white;
  transition: transform 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.news-card:hover {
  transform: translateY(-8px);
}
.news-img {
  position: relative;
  height: 240px;
}
.news-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sdg-badges {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.sdg-badges .badge {
  color: white;
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.news-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.news-content .date {
  color: var(--primary-color, #0b2e59);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.news-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.5;
}
.news-content h3 a {
  color: #1e293b;
  text-decoration: none;
  transition: color 0.3s;
}
.news-content h3 a:hover {
  color: var(--primary-color, #0b2e59);
}
.news-content p {
  color: #64748b;
  margin-bottom: 20px;
  flex: 1;
}
.read-more {
  color: var(--primary-color, #0b2e59);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: gap 0.3s;
}
.read-more:hover {
  gap: 8px;
}
</style>
