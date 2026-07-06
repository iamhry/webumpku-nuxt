<script setup lang="ts">
import { computed } from 'vue'
import type { Faculty } from '~/types/faculty'

const props = defineProps<{
  faculty: Faculty
}>()

const imageUrl = computed(() => {
  if (props.faculty.banner) return props.faculty.banner
  if (props.faculty.logo) return props.faculty.logo
  return '/assets/img/feature/feat-bg-1.jpg'
})
</script>

<template>
  <div class="feature-item style-two hover-content faculty-card">
    <div class="image">
      <img :src="imageUrl" :alt="faculty.name">
    </div>

    <div class="content">
      <div class="tags">
        <NuxtLink to="/fakultas">
          Fakultas
        </NuxtLink>
        <NuxtLink v-if="faculty.short_name" :to="`/fakultas/${faculty.slug}`">
          {{ faculty.short_name }}
        </NuxtLink>
      </div>

      <h3 class="title">
        <NuxtLink :to="`/fakultas/${faculty.slug}`">
          {{ faculty.name }}
        </NuxtLink>
      </h3>

      <div class="inner-content">
        <p>
          {{ faculty.description || `Lingkungan akademik yang mendukung keunggulan di bidang ${faculty.name}.` }}
        </p>

        <NuxtLink
          class="details-btn"
          :to="`/fakultas/${faculty.slug}`"
          aria-label="Lihat detail fakultas"
        >
          <i class="las la-arrow-right"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
