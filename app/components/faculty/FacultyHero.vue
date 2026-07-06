<script setup lang="ts">
import { computed } from 'vue'
import type { Faculty } from '~/types/faculty'

const props = defineProps<{
  faculty: Faculty
}>()

const bgImage = computed(() => {
  return props.faculty.banner || '/assets/img/bread-bg.jpg'
})
</script>

<template>
  <section class="faculty-hero-area" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="container faculty-detail-container">
      <div class="row">
        <div class="col-lg-10">
          <span class="badge-faculty">Fakultas</span>
          <h1>{{ faculty.name }}</h1>
          <span v-if="faculty.short_name" class="short-name">{{ faculty.short_name }}</span>
          <p v-if="faculty.description">{{ faculty.description }}</p>
          
          <div class="faculty-breadcrumb">
            <NuxtLink to="/">Beranda</NuxtLink>
            <span class="separator">/</span>
            <NuxtLink to="/fakultas">Fakultas</NuxtLink>
            <span class="separator">/</span>
            <span>{{ faculty.short_name || faculty.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
