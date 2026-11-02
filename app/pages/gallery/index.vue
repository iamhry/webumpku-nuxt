<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n, useSeoMeta, useHead } from '#imports'
import { useGallery } from '~/composables/useGallery'
import type { GalleryItem, GalleryResponse } from '~/types/gallery'

const { locale } = useI18n()
const { fetchHomepageGallery } = useGallery()

// Ambil data menggunakan composable existing bawaan project
const { data: galleryData, pending, error, refresh } = await fetchHomepageGallery(50)

// Normalisasi list galeri dari response API
const galleries = computed<GalleryItem[]>(() => {
  if (!galleryData.value) return []
  if (Array.isArray(galleryData.value)) return galleryData.value
  if (Array.isArray((galleryData.value as GalleryResponse).data)) {
    return (galleryData.value as GalleryResponse).data
  }
  return []
})

// Filter & UI States
const activeAlbum = ref<string>('ALL')
const searchQuery = ref<string>('')
const displayLimit = ref<number>(12)
const PAGE_INCREMENT = 12

// Modal Lightbox State
const activePreviewItem = ref<GalleryItem | null>(null)

// Ekstraksi album unik secara dinamis dari data
const albums = computed(() => {
  const map = new Map<string, string>()
  galleries.value.forEach((item) => {
    if (item.album_slug && item.album_title) {
      map.set(item.album_slug, item.album_title)
    }
  })

  const list = Array.from(map.entries()).map(([slug, title]) => ({
    slug,
    title
  }))

  return [
    { slug: 'ALL', title: locale.value === 'en' ? 'All Albums' : 'Semua Album' },
    ...list
  ]
})

// Filter data berdasarkan Album & Query Pencarian
const filteredGalleries = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return galleries.value.filter((item) => {
    const matchAlbum =
      activeAlbum.value === 'ALL' || item.album_slug === activeAlbum.value

    const matchQuery =
      !query ||
      item.title?.toLowerCase().includes(query) ||
      item.caption?.toLowerCase().includes(query) ||
      item.album_title?.toLowerCase().includes(query) ||
      item.photographer?.toLowerCase().includes(query)

    return matchAlbum && matchQuery
  })
})

// List item yang tampil di viewport sesuai pagination
const visibleGalleries = computed(() => {
  return filteredGalleries.value.slice(0, displayLimit.value)
})

// Reset batas pagination saat filter berubah
watch([activeAlbum, searchQuery], () => {
  displayLimit.value = PAGE_INCREMENT
})

const loadMore = () => {
  displayLimit.value += PAGE_INCREMENT
}

const openPreview = (item: GalleryItem) => {
  activePreviewItem.value = item
}

const closePreview = () => {
  activePreviewItem.value = null
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

// SEO
const pageTitle = computed(() =>
  locale.value === 'en' ? 'Campus Gallery - UMPKU' : 'Galeri & Dokumentasi - UMPKU'
)
const pageDescription = computed(() =>
  locale.value === 'en'
    ? 'Photo and documentation gallery of campus activities, facilities, and achievements at Universitas Muhammadiyah PKU Surakarta.'
    : 'Dokumentasi foto kegiatan kampus, fasilitas, dan prestasi civitas akademika Universitas Muhammadiyah PKU Surakarta.'
)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: '/assets/img/bread-bg.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  title: pageTitle
})
</script>

<template>
  <div class="gallery-page-wrapper bg-white">
    <!-- Header Hero -->
    <section class="gallery-hero">
      <div class="container text-center">
        <h1 class="gallery-hero-title">{{ pageTitle }}</h1>
        <p class="gallery-hero-subtitle">{{ pageDescription }}</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="gallery-content-area">
      <div class="container gallery-container">
        
        <!-- Filter Bar -->
        <div class="gallery-toolbar">
          <!-- Album Pills -->
          <div class="gallery-pills">
            <button
              v-for="album in albums"
              :key="album.slug"
              type="button"
              class="filter-pill"
              :class="{ 'filter-pill--active': activeAlbum === album.slug }"
              @click="activeAlbum = album.slug"
            >
              {{ album.title }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="gallery-search">
            <span class="search-icon-wrapper">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="locale === 'en' ? 'Search title, photographer...' : 'Cari foto, fotografer...'"
              class="search-input"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="clear-btn"
              @click="searchQuery = ''"
              aria-label="Hapus pencarian"
            >
              &times;
            </button>
          </div>
        </div>

        <!-- State: Error -->
        <div v-if="error" class="gallery-feedback gallery-error">
          <p>{{ error.message || 'Gagal memuat galeri.' }}</p>
          <button class="btn-action" @click="() => refresh()">
            {{ locale === 'en' ? 'Try Again' : 'Coba Lagi' }}
          </button>
        </div>

        <!-- State: Loading Skeleton -->
        <div v-else-if="pending && !galleries.length" class="gallery-grid">
          <div v-for="i in 8" :key="i" class="gallery-skeleton-card"></div>
        </div>

        <!-- State: Empty -->
        <div v-else-if="filteredGalleries.length === 0" class="gallery-feedback gallery-empty">
          <p>{{ locale === 'en' ? 'No photos matched your filter.' : 'Tidak ada foto yang cocok dengan pencarian.' }}</p>
          <button class="btn-action" @click="activeAlbum = 'ALL'; searchQuery = ''">
            {{ locale === 'en' ? 'Reset Filter' : 'Reset Filter' }}
          </button>
        </div>

        <!-- State: Cards Grid -->
        <div v-else class="gallery-grid">
          <article
            v-for="item in visibleGalleries"
            :key="item.id"
            class="gallery-card"
            @click="openPreview(item)"
          >
            <!-- Thumbnail & Overlay -->
            <div class="gallery-thumb-wrapper">
              <img
                :src="item.thumbnail || item.image"
                :alt="item.title"
                loading="lazy"
                class="gallery-thumb-img"
              />
              <div class="gallery-overlay">
                <span class="gallery-view-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <span v-if="item.album_title" class="gallery-tag">
                {{ item.album_title }}
              </span>
            </div>

            <!-- Meta Details -->
            <div class="gallery-meta">
              <h3 class="gallery-item-title">{{ item.title }}</h3>
              <p v-if="item.caption" class="gallery-item-caption">
                {{ item.caption }}
              </p>
              <div class="gallery-item-footer">
                <span v-if="item.photographer" class="gallery-photographer">
                  &copy; {{ item.photographer }}
                </span>
                <span v-if="item.taken_at" class="gallery-date">
                  {{ formatDate(item.taken_at) }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More Button -->
        <div
          v-if="!pending && visibleGalleries.length < filteredGalleries.length"
          class="gallery-pagination-wrapper"
        >
          <button class="gallery-loadmore-btn" @click="loadMore">
            {{ locale === 'en' ? 'Load More Photos' : 'Muat Lebih Banyak' }}
            ({{ filteredGalleries.length - visibleGalleries.length }})
          </button>
        </div>

      </div>
    </div>

    <!-- Modal Lightbox Preview -->
    <Teleport to="body">
      <div v-if="activePreviewItem" class="gallery-modal" @click.self="closePreview">
        <div class="gallery-modal-content">
          <button class="gallery-modal-close" @click="closePreview" aria-label="Tutup">&times;</button>
          
          <div class="gallery-modal-img-container">
            <img
              :src="activePreviewItem.image || activePreviewItem.thumbnail"
              :alt="activePreviewItem.title"
              class="gallery-modal-img"
            />
          </div>

          <div class="gallery-modal-info">
            <span class="gallery-modal-tag">{{ activePreviewItem.album_title }}</span>
            <h2 class="gallery-modal-title">{{ activePreviewItem.title }}</h2>
            <p v-if="activePreviewItem.caption" class="gallery-modal-caption">
              {{ activePreviewItem.caption }}
            </p>
            
            <div class="gallery-modal-credits">
              <span v-if="activePreviewItem.photographer">
                <strong>Fotografer:</strong> {{ activePreviewItem.photographer }}
              </span>
              <span v-if="activePreviewItem.taken_at">
                <strong>Tanggal:</strong> {{ formatDate(activePreviewItem.taken_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.gallery-page-wrapper {
  min-height: 80vh;
}

.gallery-hero {
  padding: 64px 20px 48px;
  background-color: #fbfbfa;
  border-bottom: 1px solid #f1f5f9;
}

.gallery-hero-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  margin-bottom: 10px;
}

.gallery-hero-subtitle {
  font-size: 1.05rem;
  color: #64748b;
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
}

.gallery-content-area {
  padding: 48px 16px 88px;
}

.gallery-container {
  max-width: 1240px;
  margin: 0 auto;
}

/* Toolbar & Filters */
.gallery-toolbar {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  margin-bottom: 36px !important;
  width: 100% !important;
}

@media (min-width: 768px) {
  .gallery-toolbar {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
}

.gallery-pills {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 10px !important;
}

.filter-pill {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 44px !important;
  padding: 0 22px !important;
  border-radius: 10px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: normal !important;
  border: 1.5px solid #e2e8f0 !important;
  background-color: #ffffff !important;
  color: #475569 !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
}

.filter-pill:hover {
  border-color: #0f4c81 !important;
  color: #0f4c81 !important;
}

.filter-pill--active {
  background-color: #0f4c81 !important;
  color: #ffffff !important;
  border-color: #0f4c81 !important;
}

/* Search Bar */
.gallery-search {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  height: 44px !important;
  box-sizing: border-box !important;
}

@media (min-width: 768px) {
  .gallery-search {
    width: 320px !important;
  }
}

.search-icon-wrapper {
  position: absolute !important;
  left: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 18px !important;
  height: 18px !important;
  color: #94a3b8 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  pointer-events: none !important;
  z-index: 2 !important;
}

.search-icon-wrapper svg {
  width: 18px !important;
  height: 18px !important;
}

.search-input {
  width: 100% !important;
  height: 44px !important;
  margin: 0 !important;
  padding: 0 38px 0 42px !important; /* Ruang aman agar teks tidak tertimpa ikon di kiri */
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 10px !important;
  background-color: #ffffff !important;
  font-size: 14px !important;
  color: #0f172a !important;
  outline: none !important;
  box-sizing: border-box !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}

.search-input:focus {
  border-color: #0f4c81 !important;
  box-shadow: 0 0 0 3px rgba(15, 76, 129, 0.08) !important;
}

.clear-btn {
  position: absolute !important;
  right: 12px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
  border: none !important;
  font-size: 20px !important;
  line-height: 1 !important;
  color: #94a3b8 !important;
  cursor: pointer !important;
  padding: 2px !important;
}

/* Grid Layout */
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .gallery-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Gallery Cards */
.gallery-card {
  border-radius: 16px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease;
}

.gallery-card:hover {
  transform: translateY(-4px);
  border-color: #cbd5e1;
  box-shadow: 0 16px 32px -6px rgba(15, 76, 129, 0.12);
}

.gallery-thumb-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background-color: #f1f5f9;
}

.gallery-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-card:hover .gallery-thumb-img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 76, 129, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.gallery-card:hover .gallery-overlay {
  opacity: 1;
}

.gallery-view-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.95);
  color: #0f4c81;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.gallery-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: rgba(15, 76, 129, 0.88);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

.gallery-meta {
  padding: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.gallery-item-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 6px;
  line-height: 1.35;
}

.gallery-item-caption {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gallery-item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 10px;
  font-size: 12px;
  color: #94a3b8;
}

.gallery-photographer {
  font-weight: 600;
  color: #64748b;
}

/* Skeletons & Feedbacks */
.gallery-skeleton-card {
  height: 310px;
  border-radius: 16px;
  background-color: #e2e8f0;
}

.gallery-feedback {
  text-align: center;
  padding: 64px 16px;
  color: #64748b;
}

.gallery-error {
  color: #dc2626;
}

.btn-action {
  margin-top: 14px;
  padding: 10px 22px;
  border-radius: 8px;
  background-color: #0f4c81;
  color: #ffffff;
  border: none;
  font-weight: 700;
  cursor: pointer;
}

/* Pagination */
.gallery-pagination-wrapper {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}

.gallery-loadmore-btn {
  padding: 12px 32px;
  border-radius: 10px;
  border: 1.5px solid #0f4c81;
  background-color: #ffffff;
  color: #0f4c81;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.gallery-loadmore-btn:hover {
  background-color: #0f4c81;
  color: #ffffff;
}

/* Modal Lightbox */
.gallery-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.gallery-modal-content {
  position: relative;
  max-width: 900px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.gallery-modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 24px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease;
}

.gallery-modal-close:hover {
  background: rgba(0, 0, 0, 0.7);
}

.gallery-modal-img-container {
  background-color: #020617;
  max-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-modal-img {
  width: 100%;
  max-height: 65vh;
  object-fit: contain;
}

.gallery-modal-info {
  padding: 24px;
}

.gallery-modal-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: #0f4c81;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}

.gallery-modal-title {
  margin: 0 0 10px;
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
}

.gallery-modal-caption {
  margin: 0 0 16px;
  color: #475569;
  font-size: 14.5px;
  line-height: 1.6;
}

.gallery-modal-credits {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #64748b;
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
}
</style>