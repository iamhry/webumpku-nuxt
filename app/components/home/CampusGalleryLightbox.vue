<template>
  <div 
    class="campus-gallery-lightbox" 
    :class="{ active: isOpen }"
    @click.self="close"
  >
    <button class="lightbox-close" @click="close" aria-label="Close">
      <i class="las la-times"></i>
    </button>
    
    <button v-if="items.length > 1" class="lightbox-prev" @click.stop="prev" aria-label="Previous">
      <i class="las la-angle-left"></i>
    </button>

    <div v-if="currentItem" class="lightbox-content" @click.stop>
      <div class="lightbox-img-wrapper">
        <img 
          :src="currentItem.image || currentItem.thumbnail || '/assets/img/project/project-1-1.jpg'" 
          :alt="currentItem.title || currentItem.caption"
        >
      </div>
      <div class="lightbox-info">
        <h3>{{ currentItem.title }}</h3>
        <p v-if="currentItem.caption">{{ currentItem.caption }}</p>
        <small v-if="currentItem.album_title">{{ currentItem.album_title }}</small>
        <small v-if="currentItem.photographer"> | 📷 {{ currentItem.photographer }}</small>
      </div>
    </div>

    <button v-if="items.length > 1" class="lightbox-next" @click.stop="next" aria-label="Next">
      <i class="las la-angle-right"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { GalleryItem } from '~/types/gallery'

const props = defineProps<{
  items: GalleryItem[]
  isOpen: boolean
  initialIndex: number
}>()

const emit = defineEmits(['close'])

const currentIndex = ref(props.initialIndex)

const currentItem = computed(() => props.items[currentIndex.value])

watch(() => props.initialIndex, (newVal) => {
  currentIndex.value = newVal
})

const close = () => {
  emit('close')
}

const next = () => {
  if (currentIndex.value < props.items.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.items.length - 1
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
