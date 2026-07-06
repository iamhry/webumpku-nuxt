<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description: string
  link: string
  image: string
  icon?: string
}>()

const isExternal = computed(() => props.link.startsWith('http'))
const resolvedIcon = computed(() => props.icon || 'la-laptop')
</script>

<template>
  <div class="campus-service-card">
    <div class="campus-service-img">
      <img :src="image" :alt="title">
    </div>
    <div class="campus-service-content">
      <div class="campus-service-icon">
        <i :class="['las', resolvedIcon]"></i>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      
      <a v-if="isExternal" :href="link" target="_blank" class="campus-service-readmore">
        Baca Selengkapnya <i class="las la-angle-right"></i>
      </a>
      <NuxtLink v-else :to="link" class="campus-service-readmore">
        Baca Selengkapnya <i class="las la-angle-right"></i>
      </NuxtLink>
    </div>
  </div>
</template>
