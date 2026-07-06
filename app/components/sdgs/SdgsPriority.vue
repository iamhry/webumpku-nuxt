<template>
  <section class="py-5 bg-light">
    <div class="sdgs-container py-5">
      <div class="row align-items-center mb-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <span class="text-uppercase fw-bold mb-2 d-block" style="color: var(--sdg-4); letter-spacing: 2px; font-size: 0.9rem;">
            Fokus Utama Kami
          </span>
          <h2 class="sdgs-title" style="font-size: 2.5rem; color: var(--sdg-text-dark);">
            Prioritas Pembangunan Berkelanjutan UMPKU
          </h2>
        </div>
        <div class="col-lg-6">
          <p class="text-muted mb-0" style="font-size: 1.1rem;">
            Sebagai institusi pendidikan tinggi, UMPKU menetapkan prioritas strategis pada beberapa tujuan utama yang selaras dengan kekuatan Tri Dharma Perguruan Tinggi kami, memberikan dampak maksimal bagi masyarakat luas.
          </p>
        </div>
      </div>

      <div class="row g-4">
        <div v-for="priority in priorityGoals" :key="priority.id" class="col-md-4">
          <div class="card h-100 border-0 shadow-sm sdgs-hover-lift rounded-4 overflow-hidden bg-white">
            <div class="card-img-top position-relative" style="height: 200px; background-color: #f8f9fa;">
              <img :src="priority.image" class="w-100 h-100 object-fit-cover" :alt="priority.title" style="object-fit: cover;" />
              <div class="position-absolute top-0 end-0 p-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow" 
                     :style="{ width: '50px', height: '50px', backgroundColor: priority.color, fontSize: '1.2rem' }">
                  {{ priority.number }}
                </div>
              </div>
            </div>
            <div class="card-body p-4 d-flex flex-column">
              <h4 class="fw-bold mb-3" :style="{ color: priority.color }">{{ priority.title }}</h4>
              <p class="text-muted mb-4 flex-grow-1">{{ priority.description }}</p>
              <NuxtLink :to="`/sdgs/${priority.slug}`" class="text-decoration-none fw-bold" :style="{ color: priority.color }">
                Pelajari Lebih Lanjut <i class="fa fa-arrow-right ms-2"></i>
              </NuxtLink>
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
    color: '#4c9f38', // var(--sdg-3)
    description: 'Fakultas Kesehatan kami secara aktif mengadakan program pengabdian masyarakat, klinik kesehatan gratis, dan riset epidemiologi.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    number: 4,
    slug: 'quality-education',
    title: 'Pendidikan Bermutu',
    color: '#c5192d', // var(--sdg-4)
    description: 'Berkomitmen menyediakan akses pendidikan tinggi yang inklusif dan berkualitas melalui berbagai program beasiswa dan inovasi pembelajaran.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    number: 8,
    slug: 'decent-work-and-economic-growth',
    title: 'Pekerjaan Layak & Pertumbuhan Ekonomi',
    color: '#a21942', // var(--sdg-8)
    description: 'Mencetak lulusan siap kerja dan wirausahawan tangguh melalui inkubator bisnis dan program magang bersertifikat.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80'
  }
]
</script>
