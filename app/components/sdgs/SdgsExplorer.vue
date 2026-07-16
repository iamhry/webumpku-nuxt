<template>
  <section id="explore-sdgs" class="py-5 bg-white">
    <div class="sdgs-container container py-5">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <h2 class="sdgs-title mb-3" style="font-size: 2.5rem; color: var(--sdg-text-dark); font-weight: bold;">
          Eksplorasi 17 Tujuan
        </h2>
        <p class="text-muted mx-auto" style="max-width: 600px; font-size: 1.1rem;">
          Pilih salah satu dari 17 Tujuan Pembangunan Berkelanjutan untuk melihat kontribusi dan aksi nyata kami.
        </p>
      </div>

      <!-- Grid Cards Layout (Mengikuti Struktur Contoh Anda) -->
      <div class="row g-4 justify-content-center">
        <!-- Loader / Fallback if no data -->
        <div v-if="!sdgsData || sdgsData.length === 0" class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-for="goal in sortedSdgs" :key="goal.id" class="col-6 col-md-4 col-lg-3 col-xl-2 mb-3">
          <NuxtLink :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug}`" class="sdgs-related-card text-decoration-none d-block h-100">
            
            <!-- Kotak Gambar / Ikon Berwarna -->
            <div class="img-wrapper position-relative overflow-hidden rounded-3" :style="{ backgroundColor: goal.color || getFallbackColor(goal.number || goal.id) }">
              <img v-if="goal.icon || goal.icon_image" :src="goal.icon || goal.icon_image" :alt="goal.name || goal.title" loading="lazy" />
              <div v-else class="w-100 h-100 d-flex align-items-center justify-content-center text-white" style="font-size: 4rem; font-weight: bold;">
                {{ goal.goal_number || goal.number || goal.id }}
              </div>
              
              <!-- Efek Hover Overlay Elegan di Dalam Kotak Gambar -->
              <div class="sdgs-goal-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <span class="text-white fw-bold d-flex align-items-center gap-2 bg-dark bg-opacity-50 px-3 py-1.5 rounded-pill backdrop-blur">
                  Jelajahi <i class="fa fa-arrow-right style-arrow"></i>
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
/* Struktur Utama Card */
.sdgs-related-card {
  color: #333333;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Pembungkus Gambar Menjadi Kotak Sempurna */
.img-wrapper {
  aspect-ratio: 1 / 1;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

/* Nomor Cadangan Jika Gambar Kosong */
.sdgs-fallback-number {
  font-size: 3.5rem;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

/* Bagian Judul Teks Luar Kotak */
.sdgs-card-title {
  font-size: 0.95rem;
  color: var(--sdg-text-dark, #212529);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.6em; /* Menjaga tinggi baris teks seragam agar grid sejajar */
}

/* Efek Hover Animasi Moderen */
.sdgs-goal-overlay {
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.backdrop-blur {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  font-size: 0.85rem;
}

.style-arrow {
  font-size: 0.8rem;
}

/* Trigger Efek Hover */
.sdgs-related-card:hover {
  transform: translateY(-5px);
}

.sdgs-related-card:hover .img-wrapper {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.sdgs-related-card:hover .sdgs-goal-overlay {
  opacity: 1;
}

.sdgs-related-card:hover .sdgs-card-title {
  color: #000000; /* Sedikit menggelap saat di-hover */
}

/* Responsivitas untuk layar kecil */
@media (max-width: 576px) {
  .sdgs-fallback-number {
    font-size: 2.5rem;
  }
  .sdgs-card-title {
    font-size: 0.85rem;
  }
}
</style>