<script setup lang="ts">
import { useAsyncData } from '#imports'
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
      <div class="reputation-header text-left" v-reveal data-reveal="fade-up">
        <h2 class="reputation-main-title">
          {{ locale === 'en' ? 'Accreditation & Rankings' : 'Akreditasi & Reputasi' }}
        </h2>
      </div>

      <!-- Loading State (Skeleton) -->
      <div v-if="isLoading" class="reputation-grid">
        <div v-for="i in 4" :key="i" class="skeleton-entry">
          <div class="skeleton-icon"></div>
          <div class="skeleton-title"></div>
          <div class="skeleton-desc"></div>
          <div class="skeleton-desc short"></div>
        </div>
      </div>

      <!-- Content Grid (Satu Baris Tanpa Wrap) -->
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

.reputation-header {
  margin-bottom: 2.5rem;
}

.reputation-main-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* KUNCI: flex-wrap dimatikan, deretan rata 4 kolom di desktop */
.reputation-grid {
  display: flex;
  flex-wrap: nowrap; /* <-- Mematikan wrap */
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  width: 100%;
}

/* Memastikan setiap item ReputationCard membagi porsi rata */
.reputation-grid :deep(> *) {
  flex: 1 1 0;
  min-width: 0; /* Mencegah item meluap jika ada teks panjang */
}

/* SKELETON LOADING */
.skeleton-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.skeleton-icon {
  width: 70px;
  height: 50px;
  background: #f1f5f9;
  border-radius: 6px;
}

.skeleton-title {
  width: 75%;
  height: 16px;
  background: #f1f5f9;
  border-radius: 4px;
}

.skeleton-desc {
  width: 90%;
  height: 12px;
  background: #f8fafc;
  border-radius: 4px;
}

.skeleton-desc.short {
  width: 60%;
}

/* RESPONSIVE: Di HP & Tablet tetap 1 baris via horizontal smooth swipe tanpa gepeng */
@media (max-width: 991px) {
  .reputation-grid {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
    scrollbar-width: none; /* Firefox */
  }

  .reputation-grid::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  .reputation-grid :deep(> *) {
    flex: 0 0 220px; /* Lebar minimum per kartu saat di HP agar tidak gepeng */
    scroll-snap-align: start;
  }
}
</style>