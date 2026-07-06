<template>
  <div class="page-hero" :style="heroStyle">
    <div class="page-hero-overlay"></div>
    <div class="page-hero-body">
      <div class="page-hero-container">

        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="page-hero-breadcrumb">
            <li><NuxtLink to="/">Beranda</NuxtLink></li>
            <li>Halaman</li>
            <li class="active" aria-current="page">{{ page.title }}</li>
          </ol>
        </nav>

        <!-- Badge -->
        <div class="page-hero-badge" v-if="pageBadge">
          <i class="las la-university"></i>
          {{ pageBadge }}
        </div>

        <!-- Title -->
        <h1 class="page-hero-title">{{ page.title }}</h1>

        <!-- Subtitle -->
        <p v-if="page.excerpt" class="page-hero-subtitle">
          {{ page.excerpt }}
        </p>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import type { PageDetail } from '~/types/page'

const props = defineProps<{
  page: PageDetail
}>()

const { getImageUrl } = useMedia()

// Badge from page_type
const pageBadge = computed(() => {
  if (props.page.page_type) {
    const map: Record<string, string> = {
      admisi: 'Penerimaan Mahasiswa',
      akademik: 'Akademik',
      profil: 'Profil Kampus',
      lembaga: 'Lembaga',
      fasilitas: 'Fasilitas',
      kemahasiswaan: 'Kemahasiswaan',
    }
    return map[props.page.page_type] || 'Informasi Kampus'
  }
  return 'Informasi Kampus'
})

const heroStyle = computed(() => {
  // Priority: banner_image → featured_image → gradient fallback
  const img = props.page.banner_image || props.page.featured_image

  if (img) {
    const url = (img.startsWith('http') || img.startsWith('/assets/'))
      ? img
      : getImageUrl(img)
    return {
      backgroundImage: `url('${url}')`,
    }
  }

  // Navy gradient fallback
  return {
    background: 'linear-gradient(135deg, #0a192f 0%, #1e3a5f 60%, #112240 100%)',
  }
})
</script>
