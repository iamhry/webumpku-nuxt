<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAsyncData, useSeoMeta, useRuntimeConfig, createError } from '#imports'
import { useI18n } from 'vue-i18n'

import SdgsHero from '~/components/sdgs/SdgsHero.vue'
import SdgsAbout from '~/components/sdgs/SdgsAbout.vue'
import SdgsStatistics from '~/components/sdgs/SdgsStatistics.vue'
import SdgsNewsGrid from '~/components/sdgs/SdgsNewsGrid.vue'
import SdgsRelatedGoals from '~/components/sdgs/SdgsRelatedGoals.vue'
import SdgsGoalNav from '~/components/sdgs/SdgsGoalNav.vue'
import { mergeSdgDetail, getAdjacentGoals } from '~/utils/mergeSdgDetail'
import type { SdgGoal } from '~/types/sdgs'
import '~/assets/css/sdgs-detail-modern.css'

const route = useRoute()
const slug = route.params.slug as string
const config = useRuntimeConfig()
const { t, locale } = useI18n()

const apiRoot = String(config.public.apiBase || 'https://cms.umpku.ac.id').replace(/\/$/, '')
const apiBase = apiRoot.includes('/api/v1') ? apiRoot : `${apiRoot}/api/v1`

const { data: sdgPayload, error: detailError } = await useAsyncData(
  `sdg-detail-page-${slug}`,
  () => $fetch(`${apiBase}/sdgs/${slug}`)
)

if (detailError.value || !sdgPayload.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('page_not_found') || 'SDG Not Found',
    fatal: true
  })
}

const apiSdg = ((sdgPayload.value as any).data || sdgPayload.value) as SdgGoal
const sdg = computed(() => mergeSdgDetail(apiSdg, locale.value))

const { data: newsData } = await useAsyncData(`sdg-news-${slug}`, () =>
  $fetch(`${apiBase}/sdgs/${slug}/news?per_page=6`)
)
const newsArticles = newsData.value ? ((newsData.value as any).news?.data || []) : []

const { data: allSdgsData } = await useAsyncData('all-sdgs-detail', () =>
  $fetch(`${apiBase}/sdgs`)
)
const allSdgs = (allSdgsData.value ? ((allSdgsData.value as any).data || []) : []) as SdgGoal[]

const adjacent = computed(() => getAdjacentGoals(allSdgs, sdg.value.goal_number))

const stats = (newsData.value as any)?.statistics || {
  news_count: apiSdg.news_count || newsArticles.length,
  article_count: apiSdg.article_count,
  activity_count: apiSdg.activity_count
}

useSeoMeta({
  title: `${sdg.value.name} — ${sdg.value.short_name}`,
  description: sdg.value.description,
  ogTitle: `${sdg.value.name} — ${sdg.value.short_name}`,
  ogDescription: sdg.value.description,
  ogImage: sdg.value.image || '/assets/img/logo.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="sdgs-detail-page">
    <SdgsHero :sdg="sdg" />

    <div id="sdgs-content">
      <SdgsAbout
        :title="sdg.name"
        :description="sdg.description"
        :color="sdg.color"
      />

      <SdgsStatistics :stats="stats" />

      <SdgsNewsGrid :news="newsArticles" />

      <SdgsGoalNav :prev="adjacent.prev" :next="adjacent.next" />

      <SdgsRelatedGoals :currentSdgId="sdg.id" :allSdgs="allSdgs" />
    </div>

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
