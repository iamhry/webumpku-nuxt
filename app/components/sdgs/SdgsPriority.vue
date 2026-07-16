<template>
  <section class="section-priorities py-6 bg-canvas">
    <div class="container">
      
      <!-- HEADER & CAPTION: Minimalis, Tegas, Editorial -->
      <div class="header-block mb-5">
        <div class="row align-items-end g-4">
          <div class="col-lg-7">
            <span class="tagline text-uppercase fw-bold mb-2 d-block">Fokus Utama Kami</span>
            <h2 class="section-title fw-black tracking-tight mb-0">
              Prioritas Pembangunan Berkelanjutan UMPKU
            </h2>
          </div>
          <div class="col-lg-5">
            <p class="section-caption text-secondary mb-1">
              Sebagai institusi pendidikan tinggi, UMPKU menetapkan prioritas strategis pada beberapa tujuan utama yang selaras dengan kekuatan Tri Dharma Perguruan Tinggi kami, memberikan dampak maksimal bagi masyarakat luas.
            </p>
          </div>
        </div>
        <div class="header-line mt-4"></div>
      </div>

      <!-- GRID CARDS: Clean Border, Tanpa Drop Shadow Berlebihan -->
      <div class="row g-4">
        <div v-for="priority in priorityGoals" :key="priority.id" class="col-md-6 col-lg-4">
          <div class="priority-card h-100 bg-white">
            
            <!-- Image Area dengan Corner Badge -->
            <div class="card-media position-relative overflow-hidden">
              <img :src="priority.image" class="w-100 h-100 object-fit-cover transition-image" :alt="priority.title" />
              <div class="media-overlay position-absolute inset-0"></div>
              
              <!-- SDGs Style Badge (Kotak Tegas & Presisi) -->
              <div class="position-absolute top-0 end-0 p-3 z-1">
                <div class="sdgs-badge fw-black d-flex align-items-center justify-content-center text-white" 
                     :style="{ backgroundColor: priority.color }">
                  {{ priority.number }}
                </div>
              </div>
            </div>

            <!-- Content Area -->
            <div class="card-content p-4 d-flex flex-column justify-content-between">
              <div>
                <h3 class="card-title fw-bold mb-2" :style="{ color: '#1e293b' }">
                  {{ priority.title }}
                </h3>
                <p class="card-desc text-secondary mb-4">{{ priority.description }}</p>
              </div>
              
              <div class="card-action">
                <NuxtLink 
                  :to="`/tujuan-pembangunan-berkelanjutan/${priority.slug}`" 
                  class="action-link fw-bold d-inline-flex align-items-center gap-2" 
                  :style="{ '--accent-color': priority.color, color: '#1e293b' }"
                >
                  <span>Pelajari Lebih Lanjut</span>
                  <i class="fa fa-arrow-right arrow-icon"></i>
                </NuxtLink>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const priorityGoals = [
  {
    id: 3,
    number: 3,
    slug: 'good-health-and-well-being',
    title: 'Kehidupan Sehat & Sejahtera',
    color: '#4c9f38',
    description: 'Fakultas Kesehatan kami secara aktif mengadakan program pengabdian masyarakat, klinik kesehatan gratis, dan riset epidemiologi.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    number: 4,
    slug: 'quality-education',
    title: 'Pendidikan Bermutu',
    color: '#c5192d',
    description: 'Berkomitmen menyediakan akses pendidikan tinggi yang inklusif dan berkualitas melalui berbagai program beasiswa dan inovasi pembelajaran.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    number: 8,
    slug: 'decent-work-and-economic-growth',
    title: 'Pekerjaan Layak & Pertumbuhan Ekonomi',
    color: '#a21942',
    description: 'Mencetak lulusan siap kerja dan wirausahawan tangguh melalui inkubator bisnis dan program magang bersertifikat.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80'
  }
]
</script>

<style scoped>
/* Reset & Global Tokens */
.bg-canvas {
  background-color: #f8fafc;
}
.py-6 {
  padding-top: 6rem;
  padding-bottom: 6rem;
}
.fw-black { font-weight: 900; }
.tracking-tight { letter-spacing: -0.03em; }
.text-secondary { color: #64748b !important; }
.inset-0 { top: 0; left: 0; right: 0; bottom: 0; }

/* ==========================================================================
   HEADER SECTION EDITORIAL STYLE
   ========================================================================== */
.tagline {
  color: #c5192d;
  letter-spacing: 0.15em;
  font-size: 0.8rem;
}

.section-title {
  font-size: clamp(2rem, 3.8vw, 2.6rem);
  color: #0f172a;
  line-height: 1.15;
}

.section-caption {
  font-size: 1rem;
  line-height: 1.6;
}

.header-line {
  width: 100%;
  height: 1px;
  background-color: #e2e8f0;
}

/* ==========================================================================
   MINIMALIST PREMIUM CARD
   ========================================================================== */
.priority-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-media {
  height: 230px;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
}

.media-overlay {
  background: rgba(15, 23, 42, 0.03);
}

.transition-image {
  transition: transform 0.5s ease;
}

/* SDGs Official Badge Style */
.sdgs-badge {
  width: 46px;
  height: 46px;
  font-size: 1.45rem;
  font-family: 'Arial Black', -apple-system, sans-serif;
  line-height: 1;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 1.2rem;
  line-height: 1.3;
}

.card-desc {
  font-size: 0.92rem;
  line-height: 1.6;
}

/* Action Link Interaktif */
.action-link {
  font-size: 0.9rem;
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
}

.action-link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--accent-color);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.arrow-icon {
  font-size: 0.8rem;
  color: var(--accent-color);
  transition: transform 0.3s ease;
}

/* HOVER INTERACTIONS */
.priority-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-4px);
}

.priority-card:hover .transition-image {
  transform: scale(1.03);
}

.priority-card:hover .action-link::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.priority-card:hover .arrow-icon {
  transform: translateX(3px);
}

/* Responsive Grid Adjustments */
@media (max-width: 991.98px) {
  .header-block {
    text-align: center;
  }
  .section-caption {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>