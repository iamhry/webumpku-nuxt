<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncData, useHead, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

import SdgsBreadcrumb from '~/components/sdgs/SdgsBreadcrumb.vue'
import SdgsHero from '~/components/sdgs/SdgsHero.vue'
import SdgsStatistics from '~/components/sdgs/SdgsStatistics.vue'
import SdgsNewsGrid from '~/components/sdgs/SdgsNewsGrid.vue'
import SdgsRelatedGoals from '~/components/sdgs/SdgsRelatedGoals.vue'
import '~/assets/css/sdgs-detail-modern.css' // Import custom CSS for this page

const route = useRoute()
const slug = route.params.slug as string
const config = useRuntimeConfig()
const apiUrl = config.public.apiBase || 'http://localhost:8000/api/v1'
const { t, locale } = useI18n()

// Fetch SDG Detail
const { data: sdgData, error: sdgError } = await useAsyncData(`sdg-detail-${slug}`, () => 
  $fetch(`${apiUrl}/sdgs/${slug}`)
)

// If SDG not found, throw 404
if (sdgError.value || !sdgData.value) {
  throw createError({ statusCode: 404, statusMessage: t('page_not_found') || 'SDG Not Found', fatal: true })
}

// The backend returns the SDG object directly (or inside data if wrapped, but curl shows direct object)
const sdg = (sdgData.value as any).data || sdgData.value

// Fetch News for this SDG
const { data: newsData } = await useAsyncData(`sdg-news-${slug}`, () => 
  $fetch(`${apiUrl}/sdgs/${slug}/news?per_page=6`) // fetch some news
)
const newsArticles = newsData.value ? ((newsData.value as any).news?.data || []) : []

// Fetch All SDGs for Related Goals section
const { data: allSdgsData } = await useAsyncData('all-sdgs', () => 
  $fetch(`${apiUrl}/sdgs`)
)
const allSdgs = allSdgsData.value ? ((allSdgsData.value as any).data || []) : []

// Set SEO Meta
useSeoMeta({
  title: `${sdg.short_name || sdg.name} - ${sdg.name}`,
  description: sdg.description,
  ogTitle: `${sdg.short_name || sdg.name} - ${sdg.name}`,
  ogDescription: sdg.description,
  ogImage: sdg.image || '/assets/img/logo.png',
  twitterCard: 'summary_large_image',
})

// Statistics object
const stats = (newsData.value as any)?.statistics || {
  news_count: sdg.news_count || newsArticles.length,
  article_count: sdg.article_count,
  activity_count: sdg.activity_count
}
</script>

<template>
  <div class="sdgs-detail-page">
    <SdgsBreadcrumb :sdgName="sdg.short_name || sdg.name" />
    
    <SdgsHero :sdg="sdg" />
    
    <SdgsStatistics :stats="stats" />
    
    <SdgsNewsGrid :news="newsArticles" />
    
    <SdgsRelatedGoals :currentSdgId="sdg.id" :allSdgs="allSdgs" />
    
    <div class="sdgs-cta-modern">
      <div class="container">
        <h2>{{ t('umpku_contribution_sdgs') }}</h2>
        <NuxtLink to="/tujuan-pembangunan-berkelanjutan" class="sdgs-cta-btn">
          {{ t('view_all_sdgs') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sdgs-detail-page {
  background-color: #fff;
}
</style>
