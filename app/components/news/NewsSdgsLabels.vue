<script setup lang="ts">
import type { SdgGoal } from '~/types/sdgs'

defineProps<{ sdgs: SdgGoal[] }>()

// SDG Colors mapping
const sdgColors: Record<number, string> = {
  1: '#e5243b', // No Poverty - Red
  2: '#dda63b', // Zero Hunger - Yellow
  3: '#4c9f38', // Good Health - Green
  4: '#c5192d', // Quality Education - Red/Dark
  5: '#ff3a21', // Gender Equality - Red
  6: '#26bde2', // Clean Water - Blue
  7: '#fcc30b', // Affordable Energy - Yellow
  8: '#a21942', // Decent Work - Purple
  9: '#dd1c3b', // Innovation - Red
  10: '#dd5b45', // Reduce Inequalities - Orange
  11: '#f3a538', // Sustainable Cities - Orange
  12: '#bf8b2e', // Responsible Consumption - Brown
  13: '#3f7e44', // Climate Action - Green
  14: '#0a97d9', // Life Below Water - Blue
  15: '#56c596', // Life On Land - Green
  16: '#00689d', // Peace Justice - Blue
  17: '#e7aa14'  // Partnerships - Yellow
}

const getSdgColor = (id: number) => sdgColors[id] || '#0b2e59'
</script>

<template>
  <div class="news-sdgs-section">
    <div class="sdgs-header">
      <h3 class="sdgs-title">
        <i class="las la-medal"></i>
        Tujuan Pembangunan Berkelanjutan (SDGs)
      </h3>
    </div>

    <div class="sdgs-badges">
      <div v-for="goal in sdgs" :key="goal.id" class="sdg-badge-wrapper">
        <NuxtLink
          :to="`/sdgs/${goal.slug}`"
          class="sdg-badge"
          :style="{ borderColor: getSdgColor(goal.id) }"
          :title="`${goal.id}. ${goal.title}`"
        >
          <div class="sdg-number" :style="{ backgroundColor: getSdgColor(goal.id) }">
            {{ goal.id }}
          </div>
          <div class="sdg-info">
            <span class="sdg-label">SDG {{ goal.id }}</span>
            <p class="sdg-title-text">{{ goal.title }}</p>
          </div>
          <i class="las la-arrow-right"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-sdgs-section {
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%);
  border-radius: 12px;
  border-left: 4px solid #0b2e59;
}

.sdgs-header {
  margin-bottom: 25px;
}

.sdgs-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #0b2e59;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sdgs-title i {
  color: #ffc107;
  font-size: 1.4rem;
}

.sdgs-badges {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.sdg-badge {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px;
  background: white;
  border: 2px solid;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.sdg-badge:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(11, 46, 89, 0.15);
}

.sdg-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
}

.sdg-info {
  flex: 1;
  min-width: 0;
}

.sdg-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
  margin-bottom: 4px;
}

.sdg-title-text {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
}

.sdg-badge i {
  flex-shrink: 0;
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sdg-badge:hover i {
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .news-sdgs-section {
    padding: 20px;
  }

  .sdgs-badges {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 15px;
  }

  .sdg-badge {
    padding: 14px;
  }

  .sdg-number {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .sdgs-badges {
    grid-template-columns: 1fr;
  }

  .sdgs-title {
    font-size: 1.1rem;
  }

  .sdg-badge {
    padding: 12px;
  }

  .sdg-number {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .sdg-title-text {
    font-size: 0.9rem;
  }
}
</style>

