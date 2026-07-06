<template>
  <div class="sdgs-page">
    <SdgsHeroSection />
    <SdgsStatistics />
    <SdgsGoalsGrid :sdgsData="sdgsData?.data || sdgsData" />
    <SdgsPriorityGoals />
    <SdgsImpactBlock />
    <SdgsPartnerships />
    <SdgsDashboard />
    <SdgsNewsSection :newsData="newsData?.data || newsData" />
  </div>
</template>

<script setup lang="ts">
// Components and Composables are auto-imported by Nuxt

// SEO Integration
useHead({
  title: 'Sustainable Development Goals (SDGs) UMPKU',
  meta: [
    {
      name: 'description',
      content: 'Kontribusi UMPKU terhadap pencapaian Sustainable Development Goals (SDGs) melalui Pendidikan, Penelitian, dan Pengabdian kepada Masyarakat.'
    }
  ]
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase || ''

// Fetch SDGs list (silent fallback to empty, so dummy data kicks in if API is unavailable)
const { data: sdgsData } = await useFetch(`${apiBase}/api/v1/sdgs`, {
  lazy: true,
  server: false // Avoid throwing hard errors on server if API is unreachable
})

// Fetch Latest News related to SDGs
const { data: newsData } = await useFetch(`${apiBase}/api/v1/news/latest`, {
  query: { category: 'sdgs', limit: 3 },
  lazy: true,
  server: false
})
</script>

<style scoped>
.sdgs-page {
  overflow-x: hidden;
}
</style>
