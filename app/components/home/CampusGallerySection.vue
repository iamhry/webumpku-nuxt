<template>
  <section v-if="!error && (loading || (galleryData?.data && galleryData.data.length > 0))" class="campus-gallery-section">
    <div class="container">
      <div class="campus-gallery-header" v-reveal data-reveal="fade-up">
        <h2>{{ $t('campus_gallery.title', 'Campus Moments') }}</h2>
        <p>{{ $t('campus_gallery.subtitle', 'Dokumentasi kegiatan, prestasi, kolaborasi, dan kehidupan kampus Universitas Muhammadiyah PKU.') }}</p>
      </div>
    </div>

    <div class="campus-gallery-grid">
      <template v-if="loading">
        <div v-for="i in 6" :key="i" class="campus-gallery-skeleton"></div>
      </template>
      <template v-else-if="galleryData?.data">
        <CampusGalleryItem 
          v-for="(item, index) in galleryData.data" 
          :key="item.id" 
          :item="item" 
          :index="index"
          @open="openLightbox"
          v-reveal
          data-reveal="zoom-in"
          :data-reveal-delay="index * 100"
        />
      </template>
    </div>
    
    <div v-if="!loading && galleryData?.data && galleryData.data.length > 0" class="text-center" style="margin-top: 40px;">
      <NuxtLink :to="localePath('/gallery')" class="theme-btn">
        {{ $t('campus_gallery.view_all', 'Lihat Semua Galeri') }}
      </NuxtLink>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <CampusGalleryLightbox 
        v-if="galleryData?.data"
        :is-open="isLightboxOpen"
        :items="galleryData.data"
        :initial-index="selectedImageIndex"
        @close="closeLightbox"
      />
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGallery } from '~/composables/useGallery'

import CampusGalleryItem from './CampusGalleryItem.vue'
import CampusGalleryLightbox from './CampusGalleryLightbox.vue'

const localePath = useLocalePath()
const { fetchHomepageGallery } = useGallery()

const { data: galleryData, pending: loading, error } = await fetchHomepageGallery(6)

const isLightboxOpen = ref(false)
const selectedImageIndex = ref(0)

const openLightbox = (index: number) => {
  selectedImageIndex.value = index
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
}
</script>
