<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  stats: {
    news_count?: number
    article_count?: number
    activity_count?: number
  }
}>()

// Filter to only display available stats, or at least news if that's all there is
const displayStats = computed(() => {
  const arr = []
  if (props.stats.news_count !== undefined) {
    arr.push({ label: t('sdg_news'), value: props.stats.news_count })
  }
  if (props.stats.article_count !== undefined) {
    arr.push({ label: t('related_articles'), value: props.stats.article_count })
  }
  if (props.stats.activity_count !== undefined) {
    arr.push({ label: t('activities'), value: props.stats.activity_count })
  }
  
  // If nothing is provided, just show 0 Berita to satisfy the requirement "tampilkan minimal: X Berita SDGs"
  if (arr.length === 0) {
    arr.push({ label: t('sdg_news'), value: 0 })
  }
  
  return arr
})
</script>

<template>
  <div class="sdgs-stats-modern">
    <div class="container">
      <div class="row justify-content-center">
        <div 
          class="col-lg-4 col-md-6 mb-4" 
          v-for="(stat, index) in displayStats" 
          :key="index"
        >
          <div class="sdgs-stat-box">
            <h3>{{ stat.value }}</h3>
            <p>{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
