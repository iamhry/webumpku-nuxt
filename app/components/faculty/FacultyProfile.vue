<script setup lang="ts">
import type { Faculty } from '~/types/faculty'

defineProps<{
  faculty: Faculty
}>()
</script>

<template>
  <section class="faculty-profile-area">
    <div class="container faculty-detail-container">
      <div class="row">
        <!-- Profile details -->
        <div class="col-lg-8 pr-50">
          <div class="faculty-profile-content">
            <h3>Profil Fakultas</h3>
            <p>{{ faculty.description }}</p>
            
            <div class="faculty-vision-mission">
              <div v-if="faculty.vision" class="vision-box">
                <h4>Visi</h4>
                <p>{{ faculty.vision }}</p>
              </div>
              <div v-if="faculty.mission" class="mission-box">
                <h4>Misi</h4>
                <p>{{ faculty.mission }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Sidebar with Dean Info and Image -->
        <div class="col-lg-4">
          <div class="faculty-sidebar-card">
            <!-- Banner / Gambar Fakultas -->
            <div class="faculty-banner-wrapper" v-if="faculty.logo">
              <img :src="faculty.logo" :alt="faculty.name" loading="lazy">
            </div>
            
            <div class="dean-wrapper" v-if="faculty.dean_name">
              <div class="dean-photo-wrapper">
                <img 
                  v-if="faculty.dean_photo" 
                  :src="faculty.dean_photo" 
                  :alt="faculty.dean_name"
                  loading="lazy"
                >
                <img 
                  v-else 
                  src="/assets/img/team/1.jpg" 
                  :alt="faculty.dean_name"
                  loading="lazy"
                >
              </div>
              
              <div class="dean-info">
                <h5>{{ faculty.dean_name }}</h5>
                <span>{{ faculty.dean_title || 'Dekan' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Card Sidebar */
.faculty-sidebar-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden; /* Memastikan sudut gambar mengikuti border-radius kartu */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

/* Gambar Utama / Fasilitas / Banner Fakultas */
.faculty-banner-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9; /* Rasio landscape standar untuk foto gedung/ruangan */
  position: relative;
  background-color: #f1f3f5;
}

.faculty-banner-wrapper img {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: cover !important; /* Gambar mengisi penuh card tanpa gepeng */
  object-position: center !important;
  display: block;
}

/* Wrapper Dekan & Konten di Bawah Banner */
.dean-wrapper {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.dean-photo-wrapper {
  width: 100%;
  max-width: 220px;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f1f3f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

.dean-photo-wrapper img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: top center !important;
  display: block;
}

.dean-info h5 {
  margin: 0 0 4px 0;
  font-weight: 600;
  color: #1f2937;
}

.dean-info span {
  font-size: 0.9rem;
  color: #6b7280;
}
</style>