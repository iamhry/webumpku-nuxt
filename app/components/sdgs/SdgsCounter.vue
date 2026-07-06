<template>
  <section id="impact" class="py-5 position-relative z-1" style="background-color: var(--sdg-bg-dark); margin-top: -2px;">
    <div class="sdgs-container">
      <div class="row g-4 justify-content-center">
        <div v-for="(stat, index) in stats" :key="index" class="col-6 col-md-3">
          <div class="sdgs-glass p-4 rounded-4 text-center sdgs-hover-lift h-100 d-flex flex-column justify-content-center border-0" style="background: rgba(255,255,255,0.05);">
            <div class="mb-3">
              <i :class="stat.icon" class="fa-3x" :style="{ color: stat.color }"></i>
            </div>
            <h3 class="fw-bold text-white mb-2" style="font-size: 2.5rem; letter-spacing: -1px;">
              {{ displayedValues[index] }}<span v-if="stat.suffix" style="font-size: 1.5rem; opacity: 0.8;">{{ stat.suffix }}</span>
            </h3>
            <p class="text-white-50 mb-0 fw-medium" style="font-size: 1rem;">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stats = [
  { label: 'Publikasi Riset SDGs', value: 1250, suffix: '+', icon: 'fa fa-book', color: 'var(--sdg-4)' },
  { label: 'Desa Binaan & Pengabdian', value: 85, suffix: '', icon: 'fa fa-map-marker', color: 'var(--sdg-11)' },
  { label: 'Penerima Beasiswa', value: 5000, suffix: '+', icon: 'fa fa-graduation-cap', color: 'var(--sdg-1)' },
  { label: 'Mitra Industri & Global', value: 120, suffix: '', icon: 'fa fa-globe', color: 'var(--sdg-17)' }
]

const displayedValues = ref(stats.map(() => 0))

onMounted(() => {
  // Simple intersection observer to start counter when visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounting();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  
  const element = document.getElementById('impact');
  if (element) {
    observer.observe(element);
  } else {
    startCounting(); // Fallback
  }
})

function startCounting() {
  stats.forEach((stat, index) => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = stat.value / steps
    const stepTime = duration / steps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        displayedValues.value[index] = stat.value
        clearInterval(timer)
      } else {
        displayedValues.value[index] = Math.floor(current)
      }
    }, stepTime)
  })
}
</script>
