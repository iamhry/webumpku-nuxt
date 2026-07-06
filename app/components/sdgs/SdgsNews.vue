<template>
  <section class="py-5 bg-white">
    <div class="sdgs-container py-5">
      <div class="d-flex justify-content-between align-items-end mb-5">
        <div>
          <span class="text-uppercase fw-bold mb-2 d-block text-primary" style="letter-spacing: 2px; font-size: 0.9rem;">
            Berita Terkini
          </span>
          <h2 class="sdgs-title m-0" style="font-size: 2.5rem; color: var(--sdg-text-dark);">
            Kabar Aksi SDGs
          </h2>
        </div>
        <NuxtLink to="/berita?category=sdgs" class="btn btn-outline-primary rounded-pill px-4 py-2 d-none d-md-inline-block fw-bold">
          Lihat Semua Berita
        </NuxtLink>
      </div>

      <div class="row g-4">
        <!-- Loader / Fallback -->
        <div v-if="!newsData || newsData.length === 0" class="col-12 text-center py-5">
          <p class="text-muted">Belum ada berita terkait SDGs saat ini.</p>
        </div>

        <div v-for="article in formattedNews" :key="article.id" class="col-md-4">
          <article class="card border-0 shadow-sm h-100 sdgs-hover-lift rounded-4 overflow-hidden">
            <div class="position-relative">
              <img :src="article.image" class="card-img-top object-fit-cover" :alt="article.title" style="height: 220px;" />
              <div class="position-absolute top-0 start-0 m-3">
                <span class="badge bg-primary rounded-pill px-3 py-2 shadow-sm">SDGs</span>
              </div>
            </div>
            <div class="card-body p-4 d-flex flex-column">
              <div class="text-muted small mb-2 d-flex align-items-center gap-2">
                <i class="fa fa-calendar"></i> {{ article.date }}
              </div>
              <h4 class="fw-bold mb-3" style="font-size: 1.25rem; line-height: 1.4;">
                <NuxtLink :to="`/berita/${article.slug}`" class="text-dark text-decoration-none hover-primary">
                  {{ article.title }}
                </NuxtLink>
              </h4>
              <p class="text-muted mb-4 flex-grow-1" style="font-size: 0.95rem;">
                {{ article.excerpt }}
              </p>
              <div class="mt-auto">
                <NuxtLink :to="`/berita/${article.slug}`" class="text-primary fw-bold text-decoration-none">
                  Baca Selengkapnya <i class="fa fa-arrow-right ms-1"></i>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
      
      <div class="text-center mt-5 d-md-none">
        <NuxtLink to="/berita?category=sdgs" class="btn btn-outline-primary rounded-pill px-5 py-3 fw-bold w-100">
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
    type: Array as () => any[],
    default: () => []
  }
})

const formattedNews = computed(() => {
  if (!props.newsData) return []
  return props.newsData.map(news => ({
    id: news.id,
    slug: news.slug,
    title: news.title || news.judul, // handle both EN and ID structure if any
    excerpt: news.excerpt || (news.content ? news.content.substring(0, 100) + '...' : ''),
    image: news.image || news.cover_image || 'https://images.unsplash.com/photo-1531206715517-5c5610815fdf?auto=format&fit=crop&q=80',
    date: formatDate(news.created_at || news.published_at || new Date().toISOString())
  })).slice(0, 3) // show only latest 3
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
.hover-primary {
  transition: color 0.2s ease;
}
.card:hover .hover-primary {
  color: var(--sdg-14) !important;
}
</style>
