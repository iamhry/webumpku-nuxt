<script setup lang="ts">
import CampusServiceCard from './CampusServiceCard.vue'

const services = [
  {
    id: 1,
    title: 'Sistem Akademik Terintegrasi',
    description: 'Akses layanan akademik, jadwal, nilai, dan administrasi mahasiswa secara digital.',
    link: 'https://siakad.umpku.ac.id',
    image: '/assets/img/service/01.jpg',
    icon: 'la-laptop-code'
  },
  {
    id: 2,
    title: 'E-Learning & Pembelajaran Digital',
    description: 'Platform pembelajaran online untuk mendukung aktivitas kuliah, tugas, kuis, dan diskusi.',
    link: 'https://mylms.umpku.ac.id',
    image: '/assets/img/service/02.jpg',
    icon: 'la-chalkboard-teacher'
  },
  {
    id: 3,
    title: 'Riset dan Publikasi Ilmiah',
    description: 'Dukungan repository, jurnal, dan publikasi ilmiah untuk dosen dan mahasiswa.',
    link: 'https://journals.umpku.ac.id',
    image: '/assets/img/service/03.jpg',
    icon: 'la-book-reader'
  }
]
</script>

<template>
  <div class="campus-services-area">
    <div class="container content-wide">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="section-title text-center reveal reveal-up">
            <h2>Layanan dan Ekosistem Digital Kampus</h2>
            <p>Solusi layanan akademik, kemahasiswaan, riset, dan transformasi digital untuk mendukung pengalaman belajar yang unggul.</p>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <!-- 3 columns desktop, 2 tablet, 1 mobile -->
        <div 
          class="col-lg-4 col-md-6 col-sm-12 mb-4 reveal reveal-up stagger" 
          v-for="(service, index) in services" 
          :key="service.id"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <CampusServiceCard 
            :title="service.title"
            :description="service.description"
            :link="service.link"
            :image="service.image"
            :icon="service.icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>
