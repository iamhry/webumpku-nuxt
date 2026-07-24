<template>
  <div class="page-facility-ums-card-inner">
    <div class="page-facility-ums-icon-wrap">
      <img
        v-if="item.icon"
        :src="getImageUrl(item.icon)"
        :alt="item.name || 'Icon'"
        class="page-facility-ums-icon"
        loading="lazy"
      />
      <i v-else class="las la-building page-facility-ums-icon-fallback" />
    </div>

    <h3 v-if="item.name" class="page-facility-ums-title">{{ item.name }}</h3>
    <p v-if="item.excerpt" class="page-facility-ums-excerpt">{{ item.excerpt }}</p>
  </div>
</template>

<script setup lang="ts">
import { useMedia } from '~/composables/useMedia'
import type { Facility } from '~/types/facility'

defineProps<{
  item: Facility
}>()

const { getImageUrl } = useMedia()
</script>
