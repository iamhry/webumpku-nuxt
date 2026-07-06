<template>
  <div class="achievement-area">
    <div class="overlay-2"></div>
    <div class="container">
      <div class="row">
        <div 
          v-for="(stat, index) in statistics" 
          :key="stat.id" 
          class="col-lg-3 col-md-6 col-sm-6"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 150"
        >
          <div class="single-counter-box">
            <div class="fact-icon">
              <i :class="getIcon(stat.icon)"></i>
            </div>
            <p class="counter-number">
              <span>{{ loading ? 0 : stat.value }}</span>{{ stat.suffix || '' }}
            </p>
            <h6>{{ stat.title }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUpdated } from 'vue'
import { useStatistics } from '~/composables/useStatistics'
import { useStatisticIcon } from '~/composables/useStatisticIcon'

const { statistics, loading, fetchStatistics } = useStatistics()
const { getIcon } = useStatisticIcon()

await fetchStatistics()



declare const $: any

onUpdated(() => {
  if (typeof $ !== 'undefined') {
    $('.counter-number span').counterUp({
      delay: 10,
      time: 1000,
    })
  }
})
</script>
