<template>
  <div class="campus-gallery-item" @click="$emit('open', index)">
    <img 
      :src="item.thumbnail || item.image || '/assets/img/project/project-1-1.jpg'" 
      :alt="item.title || item.caption"
      loading="lazy"
      decoding="async"
    >
    <div class="campus-gallery-overlay">
      <div class="campus-gallery-caption">
        <span v-if="item.album_title">{{ item.album_title }}</span>
        <h4>{{ item.title }}</h4>
        <div class="zoom-icon">
          <i class="las la-plus"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryItem } from '~/types/gallery'

defineProps<{
  item: GalleryItem
  index: number
}>()

defineEmits(['open'])
</script>
