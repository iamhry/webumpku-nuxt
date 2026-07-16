<template>
  <section id="impact" class="py-5 position-relative overflow-hidden section-stat" style="background-color: var(--sdg-bg-dark); margin-top: -2px;">
    <!-- Dekorasi background pencahayaan subtle -->
    <div class="glow-backdrop position-absolute top-50 start-50 translate-middle"></div>

    <div class="sdgs-container container position-relative z-1 py-3">
      <div class="row g-4 justify-content-center">
        <div v-for="(stat, index) in stats" :key="index" class="col-6 col-md-3">
          <!-- Mengikat variabel warna ke CSS variable lokal (--hover-glow dan --sdg-color) -->
          <div 
            class="sdgs-glass-card p-4 rounded-4 text-center h-100 d-flex flex-column justify-content-between position-relative"
            :style="{ '--hover-glow': stat.color, '--sdg-color': stat.color }"
          >
            <!-- Border berkilau tipis khas UI modern -->
            <div class="card-border-inside rounded-4"></div>

            <div class="mb-3 mt-2 icon-box d-inline-flex align-items-center justify-content-center mx-auto rounded-3">
              <i :class="stat.icon" class="fa-2xl stat-icon"></i>
            </div>
            
            <div class="mt-auto">
              <!-- MENGUBAH WARNA COUNTER: Menghapus class 'text-white' agar css gradient bekerja -->
              <h3 class="fw-extrabold mb-2 tracking-tight display-number text-gradient-sdg">
                {{ displayedValues[index] }}<span v-if="stat.suffix" class="stat-suffix">{{ stat.suffix }}</span>
              </h3>
              <p class="text-stat-label mb-2 fw-medium">{{ stat.label }}</p>
            </div>
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
    startCounting();
  }
})

function startCounting() {
  stats.forEach((stat, index) => {
    const duration = 2000 
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

<style scoped>
.section-stat {
  position: relative;
}

.glow-backdrop {
  width: 600px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.sdgs-glass-card {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  min-height: 190px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              background-color 0.4s ease, 
              box-shadow 0.4s ease;
  z-index: 1;
}

.card-border-inside {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
  pointer-events: none;
  transition: border-color 0.4s ease;
  z-index: -1;
}

.icon-box {
  width: 54px;
  height: 54px;
  background: rgba(255, 255, 255, 0.04);
  transition: background-color 0.4s ease;
}

.stat-icon {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.6rem !important;
  transition: color 0.4s ease, transform 0.4s ease;
}

/* ==========================================================================
   OPTIMASI WARNA ANGKA COUNTER (GRADIENT TEXT)
   ========================================================================== */
.display-number {
  font-size: clamp(2rem, 3.5vw, 2.6rem);
  letter-spacing: -0.03em;
  line-height: 1;
}

.text-gradient-sdg {
  /* Memadukan warna asli SDG dengan warna putih terang di bagian atas agar menghasilkan efek glossy */
  background: linear-gradient(to bottom, #ffffff 20%, var(--sdg-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.fw-extrabold {
  font-weight: 800;
}

.stat-suffix {
  font-size: 1.4rem;
  margin-left: 2px;
  /* Membuat suffix mengikuti gradasi warna dasar */
  background: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-stat-label {
  font-size: 0.88rem;
  color: #94a3b8;
  letter-spacing: 0.1px;
  line-height: 1.4;
}

/* ==========================================================================
   DYNAMIC HOVER EFFECTS
   ========================================================================== */
.sdgs-glass-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.04) !important;
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5), 
              0 0 20px -5px var(--hover-glow);
}

.sdgs-glass-card:hover .card-border-inside {
  border-color: rgba(255, 255, 255, 0.15);
}

.sdgs-glass-card:hover .icon-box {
  background-color: var(--hover-glow);
}

.sdgs-glass-card:hover .stat-icon {
  color: #ffffff;
  transform: scale(1.1);
}

@media (max-width: 576px) {
  .sdgs-glass-card {
    padding: 20px 12px !important;
    min-height: 175px;
  }
  .display-number {
    font-size: 1.8rem;
  }
}
</style>