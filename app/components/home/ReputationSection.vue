<script setup lang="ts">
import { useI18n, useAsyncData } from '#imports'
import { useReputations } from '~/composables/useReputations'
import ReputationCard from '~/components/home/ReputationCard.vue'

const { locale } = useLocale()
const { reputations, isLoading, fetchReputations } = useReputations()

// Fetch reputations data
await useAsyncData('homepage-reputations-data', async () => {
  await fetchReputations()
  return true
})
</script>

<template>
  <div class="reputation-section bg-white">
    <div class="container reputation-container-narrow">
      
      <!-- Section Header -->
      <div class="reputation-header text-center" v-reveal data-reveal="fade-up">
        <span class="reputation-subtitle text-primary">
          {{ locale === 'en' ? 'OUR REPUTATION' : 'REPUTASI KAMI' }}
        </span>
        <h2 class="reputation-main-title">
          {{ locale === 'en' ? 'Accreditation & Rankings' : 'Akreditasi & Reputasi' }}
        </h2>
        <p class="reputation-description text-muted">
          {{ locale === 'en' 
            ? 'Commitment to high-quality education recognized by national and international institutions.' 
            : 'Komitmen kami terhadap pendidikan berkualitas tinggi yang diakui secara nasional maupun internasional.' 
          }}
        </p>
      </div>

      <!-- Loading State (Skeleton) -->
      <div v-if="isLoading" class="reputation-grid">
        <div v-for="i in 3" :key="i" class="provern-card skeleton-card">
          <div class="reputation-card-inner">
            <div class="skeleton-icon"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-desc"></div>
            <div class="skeleton-desc short"></div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div v-else class="reputation-grid">
        <ReputationCard 
          v-for="(item, index) in reputations" 
          :key="item.id" 
          :item="item" 
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 150"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
.reputation-section {
  position: relative;
  z-index: 10;
}
</style>
