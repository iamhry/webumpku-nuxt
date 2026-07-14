<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  currentSdgId: number
  allSdgs: any[]
}>()

const sdgColors: Record<number, string> = {
  1: '#e5243b', 2: '#dda63b', 3: '#4c9f38', 4: '#c5192d', 5: '#ff3a21',
  6: '#26bde2', 7: '#fcc30b', 8: '#a21942', 9: '#dd1c3b', 10: '#dd5b45',
  11: '#f3a538', 12: '#bf8b2e', 13: '#3f7e44', 14: '#0a97d9', 15: '#56c596',
  16: '#00689d', 17: '#e7aa14'
}

const getSdgColor = (id: number) => sdgColors[id] || '#0b2e59'

// Get 4 random related SDGs excluding the current one
const relatedSdgs = computed(() => {
  if (!props.allSdgs || !props.allSdgs.length) return []
  const filtered = props.allSdgs.filter(sdg => sdg.id !== props.currentSdgId)
  
  // Shuffle array and take 4
  const shuffled = [...filtered].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4)
})
</script>

<template>
  <div class="sdgs-related-modern">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mb-5">
          <h2 class="section-title">{{ t('explore_other_sdgs') }}</h2>
        </div>
      </div>
      <div class="row" v-if="relatedSdgs.length">
        <div class="col-lg-3 col-md-6 col-sm-6 col-12 mb-4" v-for="sdg in relatedSdgs" :key="sdg.id">
          <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${sdg.slug || sdg.id}`" class="sdgs-related-card">
            <div class="img-wrapper" :style="{ backgroundColor: getSdgColor(sdg.goal_number || sdg.number || sdg.id) }">
              <img v-if="sdg.icon || sdg.icon_image" :src="sdg.icon || sdg.icon_image" :alt="sdg.name || sdg.title" loading="lazy" />
              <div v-else class="w-100 h-100 d-flex align-items-center justify-content-center text-white" style="font-size: 4rem; font-weight: bold;">
                {{ sdg.goal_number || sdg.number || sdg.id }}
              </div>
            </div>
            <div class="card-body">
              <h5 class="text-center">{{ sdg.short_name || sdg.name || sdg.title }}</h5>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
