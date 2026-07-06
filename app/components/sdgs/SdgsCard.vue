<script setup lang="ts">
import type { SdgGoal } from '~/types/sdgs'
defineProps<{ goal: SdgGoal }>()
</script>
<template>
  <div class="single-service-item">
    <div class="service-icon" style="text-align: center; margin-bottom: 20px;">
      <img :src="goal.icon_image" :alt="goal.title" style="width: 80px;" />
    </div>
    <div class="service-content text-center">
      <h5><NuxtLink :to="`/sdgs/${goal.slug}`">{{ goal.title }}</NuxtLink></h5>
      <p>{{ goal.description }}</p>
      <NuxtLink :to="`/sdgs/${goal.slug}`" class="read-more">View Details</NuxtLink>
    </div>
  </div>
</template>
