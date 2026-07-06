<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  sdg: {
    id: number
    name: string
    short_name?: string
    description?: string
    color?: string
    image?: string
  }
}>()

const heroStyle = computed(() => {
  if (props.sdg.image) {
    return { backgroundImage: `url(${props.sdg.image})` }
  }
  return { backgroundColor: props.sdg.color || '#0b2e59' }
})
</script>

<template>
  <div class="sdgs-hero-modern" :style="heroStyle">
    <div v-if="props.sdg.image" class="sdgs-hero-overlay"></div>
    <div class="container">
      <div class="sdg-number">SDG {{ props.sdg.id }}</div>
      <h1 class="sdg-title">{{ props.sdg.short_name || props.sdg.name }}</h1>
      <p class="sdg-desc">{{ props.sdg.description }}</p>
    </div>
  </div>
</template>
