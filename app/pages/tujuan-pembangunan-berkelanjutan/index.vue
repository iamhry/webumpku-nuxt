<template>
  <div class="sdgs-modern-wrapper bg-white">
    <!-- Main Hero Section -->
    <SdgsHeroSection />

    <!-- Impact Counters Section -->
    <!-- <SdgsCounter /> -->

    <!-- 17 SDGs Grid Explorer -->
    <SdgsExplorer :sdgsData="sdgsData?.data || sdgsData" />
    <!-- Priority Goals Section -->
    <!-- <SdgsPriority /> -->
    <!-- Global Partnerships Section -->
    <!-- <SdgsPartnership /> -->
    <!-- SDGs Related News Section -->
    <SdgsNews :newsData="newsData?.latest || newsData?.data || newsData" />
    <!-- Call to Action Section -->
    <SdgsCTA />
  </div>
</template>

<script setup lang="ts">
import { useHead, useFetch, useRuntimeConfig } from '#imports'

useHead({
  title: 'Tujuan Pembangunan Berkelanjutan (SDGs) | Universitas Muhammadiyah PKU Surakarta',
  meta: [
    {
      name: 'description',
      content: 'Komitmen UMPKU terhadap pencapaian Sustainable Development Goals (SDGs) melalui Pendidikan, Penelitian, dan Pengabdian kepada Masyarakat.'
    }
  ],
  link: [
    { rel: 'stylesheet', href: '/assets/css/sdgs-modern.css' }
  ]
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase || ''

// Fetch SDGs list
const { data: sdgsData } = await useFetch(`${apiBase}/api/v1/sdgs`, {
  lazy: true,
  server: false
})

// Fetch Latest News related to SDGs
const { data: newsData } = await useFetch(`${apiBase}/api/v1/news/latest`, {
  query: { category: 'sdgs', limit: 3,populate: 'sdgs' },
  lazy: true,
  server: false
})
</script>

<style scoped>
/* Scoped styles are handled globally via sdgs-modern.css or inline utility classes */
</style>
