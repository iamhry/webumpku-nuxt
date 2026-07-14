<template>
  <section id="explore-sdgs" class="py-5 bg-white">
    <div class="sdgs-container py-5">
      <div class="text-center mb-5">
        <h2 class="sdgs-title mb-3" style="font-size: 2.5rem; color: var(--sdg-text-dark);">
          Eksplorasi 17 Tujuan
        </h2>
        <p class="text-muted mx-auto" style="max-width: 600px; font-size: 1.1rem;">
          Pilih salah satu dari 17 Tujuan Pembangunan Berkelanjutan untuk melihat kontribusi dan aksi nyata kami.
        </p>
      </div>

      <div class="row g-3 justify-content-center">
        <!-- Loader / Fallback if no data -->
        <div v-if="!sdgsData || sdgsData.length === 0" class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-for="goal in sortedSdgs" :key="goal.id" class="col-6 col-md-4 col-lg-3 col-xl-2">
          <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug}`" class="text-decoration-none">
            <div 
              class="sdgs-goal-card position-relative overflow-hidden rounded-3 sdgs-hover-lift h-100"
              :style="{ backgroundColor: goal.color || getFallbackColor(goal.number || goal.id) }"
            >
              <!-- Card Image / Icon -->
              <template v-if="goal.image">
                <img :src="goal.image" :alt="goal.name || goal.title" class="w-100 h-100 object-fit-cover" />
              </template>
              <template v-else>
                <div class="d-flex flex-column h-100 p-3">
                  <div class="d-flex justify-content-between align-items-start mb-2 text-white">
                    <span class="fw-bold fs-5">{{ goal.number || goal.id }}</span>
                  </div>
                  
                  <div class="mt-auto pt-4 text-white">
                    <h3 class="fw-bold m-0" style="font-size: 1.1rem; line-height: 1.2;">
                      {{ goal.short_name || goal.name || goal.title }}
                    </h3>
                  </div>
                </div>
              </template>
              
              <!-- Hover Overlay -->
              <div class="sdgs-goal-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <span class="text-white fw-bold d-flex align-items-center gap-2">
                  Jelajahi <i class="fa fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  sdgsData: {
    type: Array as () => any[],
    default: () => []
  }
})

// Ensure they are sorted by number
const sortedSdgs = computed(() => {
  if (!props.sdgsData) return []
  return [...props.sdgsData].sort((a, b) => {
    const numA = a.number || a.id || 0
    const numB = b.number || b.id || 0
    return numA - numB
  })
})

function getFallbackColor(id: number) {
  const colors = [
    '#e5243b', '#dda63a', '#4c9f38', '#c5192d', '#ff3a21', '#26bde2', '#fcc30b',
    '#a21942', '#fd6925', '#dd1367', '#fd9d24', '#bf8b2e', '#3f7e44', '#0a97d9',
    '#56c02b', '#00689d', '#19486a'
  ]
  return colors[(id - 1) % colors.length] || '#000000'
}
</script>

<style scoped>
.sdgs-goal-card {
  aspect-ratio: 1 / 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.sdgs-goal-overlay {
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sdgs-goal-card:hover .sdgs-goal-overlay {
  opacity: 1;
}

.sdgs-goal-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
</style>
