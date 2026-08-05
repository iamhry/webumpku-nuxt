<script setup lang="ts">
import type { Scholarship } from '~/types/scholarship'

defineProps<{
  scholarships: Scholarship[]
}>()

const resolveImageUrl = (imagePath?: string) => {
  if (!imagePath) return '/images/default-thumbnail.jpg'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || ''
  return `${apiBase.replace(/\/api\/?.*$/, '')}/storage/${imagePath.replace(/^\//, '')}`
}
</script>

<template>
  <div class="row g-4">
    <template v-if="scholarships && scholarships.length > 0">
      <div 
        v-for="item in scholarships" 
        :key="item.id" 
        class="col-lg-4 col-md-6 col-sm-12"
      >
        <article class="card scholarship-card border-0 rounded-4 overflow-hidden">
          <NuxtLink :to="`/beasiswa/${item.slug}`" class="d-block w-100 h-100">
            <img 
              :src="resolveImageUrl(item.image)" 
              class="scholarship-img" 
              :alt="item.title"
              loading="lazy"
              @error="($event.target as HTMLImageElement).src = '/images/default-thumbnail.jpg'"
            />
          </NuxtLink>
        </article>
      </div>
    </template>

    <div v-else class="col-12 py-5 text-center">
      <div class="empty-state-wrapper p-5 rounded-4 bg-light border">
        <div class="empty-icon-box mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center">
          <i class="las la-search-minus"></i>
        </div>
        <h5 class="fw-bold text-dark mb-1">Informasi Tidak Ditemukan</h5>
        <p class="text-muted small mb-0">Belum ada program beasiswa yang sesuai saat ini.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scholarship-card {
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  aspect-ratio: 16 / 9;
  width: 100%;
}

.scholarship-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.15);
}

.scholarship-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.scholarship-card:hover .scholarship-img {
  transform: scale(1.04);
}

.empty-icon-box {
  width: 64px;
  height: 64px;
  background-color: #e2e8f0;
  color: #64748b;
  font-size: 2rem;
}
</style>