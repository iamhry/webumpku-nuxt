<template>
  <!-- Gallery only renders if there are items with actual images -->
  <section
    v-if="itemsWithImages.length > 0"
    class="dynamic-page-section page-bg-white"
  >
    <div class="dynamic-page-container">

      <!-- Header -->
      <div v-if="section.title || section.subtitle" class="page-section-header page-center">
        <span v-if="section.settings?.kicker" class="page-kicker">{{ section.settings.kicker }}</span>
        <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
        <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
      </div>

      <!-- Gallery Grid -->
      <div class="page-gallery-grid">
        <div
          class="page-gallery-item"
          v-for="(item, index) in itemsWithImages"
          :key="item.id"
          @click="openLightbox(index)"
          :aria-label="`Lihat gambar: ${item.title || 'Gallery'}`"
          tabindex="0"
          @keydown.enter="openLightbox(index)"
        >
          <img
            :src="getImageUrl(item.image!)"
            :alt="item.title || 'Gallery image'"
            loading="lazy"
          />
          <div class="page-gallery-overlay">
            <i class="las la-search-plus"></i>
            <span v-if="item.title">{{ item.title }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Lightbox -->
    <transition name="dp-fade">
      <div
        v-if="lightboxOpen && activeIndex !== null"
        class="dp-lightbox"
        @click.self="closeLightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="activeItem?.title || 'Gallery'"
      >
        <!-- Close -->
        <button class="dp-lightbox-close" @click="closeLightbox" aria-label="Tutup">
          <i class="las la-times"></i>
        </button>

        <!-- Prev -->
        <button
          v-if="itemsWithImages.length > 1"
          class="dp-lightbox-nav prev"
          @click="prevImage"
          aria-label="Sebelumnya"
        >
          <i class="las la-angle-left"></i>
        </button>

        <!-- Image -->
        <img
          v-if="activeItem?.image"
          :src="getImageUrl(activeItem.image)"
          :alt="activeItem?.title || ''"
          class="dp-lightbox-img"
        />

        <!-- Next -->
        <button
          v-if="itemsWithImages.length > 1"
          class="dp-lightbox-nav next"
          @click="nextImage"
          aria-label="Berikutnya"
        >
          <i class="las la-angle-right"></i>
        </button>

        <!-- Caption -->
        <div
          v-if="activeItem?.title || activeItem?.description"
          class="dp-lightbox-caption"
        >
          <strong v-if="activeItem?.title">{{ activeItem.title }}</strong>
          <p v-if="activeItem?.description" class="mb-0 mt-1" style="opacity:0.7">
            {{ activeItem.description }}
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageSection, PageSectionItem } from '~/types/page'

const props = defineProps<{
  section: PageSection
}>()

const { getImageUrl } = useMedia()

// Only items that actually have an image
const itemsWithImages = computed<PageSectionItem[]>(() => {
  if (!props.section.items) return []
  return props.section.items.filter(item => !!item.image)
})

// Lightbox state
const lightboxOpen = ref(false)
const activeIndex = ref<number | null>(null)

const activeItem = computed(() => {
  if (activeIndex.value === null) return null
  return itemsWithImages.value[activeIndex.value] || null
})

const openLightbox = (index: number) => {
  activeIndex.value = index
  lightboxOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeLightbox = () => {
  lightboxOpen.value = false
  activeIndex.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const nextImage = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % itemsWithImages.value.length
}

const prevImage = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + itemsWithImages.value.length) % itemsWithImages.value.length
}
</script>
