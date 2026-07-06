<template>
  <section class="py-5 overflow-hidden" style="background-color: var(--sdg-bg-dark);">
    <div class="sdgs-container py-5 text-center">
      <h2 class="sdgs-title text-white mb-3" style="font-size: 2rem;">
        Didukung Oleh Kemitraan Global
      </h2>
      <p class="text-white-50 mb-5 mx-auto" style="max-width: 600px; font-size: 1.1rem;">
        Mencapai tujuan pembangunan berkelanjutan membutuhkan kolaborasi dan kemitraan strategis (SDG 17).
      </p>

      <!-- Infinite Marquee -->
      <div class="sdgs-marquee-container position-relative w-100 mt-4">
        <!-- Fade masks -->
        <div class="position-absolute top-0 start-0 h-100 w-15 z-1" style="background: linear-gradient(to right, var(--sdg-bg-dark), transparent);"></div>
        <div class="position-absolute top-0 end-0 h-100 w-15 z-1" style="background: linear-gradient(to left, var(--sdg-bg-dark), transparent);"></div>
        
        <div class="sdgs-marquee d-flex align-items-center gap-5">
          <div class="sdgs-marquee-content d-flex align-items-center gap-5">
            <!-- Repeated logos for infinite effect -->
            <div v-for="n in 2" :key="n" class="d-flex align-items-center gap-5">
              <div v-for="partner in partners" :key="`${n}-${partner.id}`" class="partner-logo-wrapper sdgs-glass rounded-3 p-3 mx-3 d-flex align-items-center justify-content-center" style="width: 160px; height: 100px;">
                <img :src="partner.logo" :alt="partner.name" class="img-fluid" style="max-height: 60px; filter: grayscale(100%) brightness(200%); transition: filter 0.3s;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { id: 1, name: 'Kementerian Pendidikan', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg' },
  { id: 2, name: 'Bappenas', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Logo_Bappenas.png' },
  { id: 3, name: 'WHO', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/WHO_logo.svg' },
  { id: 4, name: 'UNICEF', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/UNICEF_Logo.png' },
  { id: 5, name: 'UNDP', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/UNDP_logo.svg' },
]
</script>

<style scoped>
.w-15 { width: 15%; }

.sdgs-marquee-container {
  overflow: hidden;
  white-space: nowrap;
}

.sdgs-marquee-content {
  animation: scrollLeft 30s linear infinite;
  width: max-content;
}

@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Translate by 50% because we duplicated the content 2 times */
}

.partner-logo-wrapper:hover img {
  filter: grayscale(0%) brightness(100%) !important;
}

/* Pause on hover */
.sdgs-marquee-container:hover .sdgs-marquee-content {
  animation-play-state: paused;
}
</style>
