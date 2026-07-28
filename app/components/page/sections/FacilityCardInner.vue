<template>
  <div class="facility-card-modern">
    <div class="facility-card-modern__top">
      <div class="facility-card-modern__icon" aria-hidden="true">
        <img
          v-if="item.icon"
          :src="getImageUrl(item.icon)"
          :alt="item.name || 'Icon'"
          class="facility-card-modern__icon-img"
          loading="lazy"
        />
        <i v-else class="las la-building facility-card-modern__icon-fallback" />
      </div>

      <span v-if="item.category" class="facility-card-modern__chip">
        {{ formatCategory(item.category) }}
      </span>
    </div>

    <div class="facility-card-modern__body">
      <h3 v-if="item.name" class="facility-card-modern__title">{{ item.name }}</h3>
      <p v-if="item.excerpt" class="facility-card-modern__excerpt">{{ item.excerpt }}</p>
    </div>

    <div v-if="item.url" class="facility-card-modern__footer">
      <span class="facility-card-modern__cta">
        Selengkapnya
        <i class="las la-arrow-right" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMedia } from '~/composables/useMedia'
import type { Facility } from '~/types/facility'

defineProps<{
  item: Facility
}>()

const { getImageUrl } = useMedia()

function formatCategory(category: string) {
  return category
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
</script>
