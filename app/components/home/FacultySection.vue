<script setup lang="ts">
import { useFaculties } from '~/composables/useFaculties'
import FacultyCard from './FacultyCard.vue'

const { faculties, isLoading, hasError, fetchFaculties } = useFaculties()

// Fetch on server or mount
await fetchFaculties()
</script>

<template>
  <section class="faculty-modern-area pt-130 pb-130 rel z-1">
    <div class="container-fluid faculty-modern-container">
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-10 center-content">
          <div class="section-title text-center mb-70" v-reveal data-reveal="fade-up">
            <span class="sub-title color-primary mb-10">
              Fakultas UMPKU
            </span>
            <h2>
              Jelajahi Fakultas dan Bidang Keilmuan
            </h2>
            <p>
              Temukan lingkungan akademik yang mendukung pembelajaran, riset, inovasi, dan pengabdian masyarakat.
            </p>
          </div>
        </div>
      </div>

      <div v-if="hasError" class="row justify-content-center">
        <div class="col-12 text-center text-muted">
          <p>Terjadi kesalahan saat memuat data fakultas.</p>
        </div>
      </div>
      
      <div v-else-if="isLoading" class="row gx-8 gy-8">
        <div v-for="i in 3" :key="i" class="col-md-6 col-lg-4">
          <div class="skeleton-box"></div>
        </div>
      </div>

      <div v-else-if="faculties.length === 0" class="row justify-content-center">
        <div class="col-12 text-center text-muted">
          <p>Data fakultas belum tersedia.</p>
        </div>
      </div>

      <div v-else class="row gx-8 gy-8">
        <div
          v-for="(faculty, index) in faculties"
          :key="faculty.id"
          class="col-md-6 col-lg-4"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 90"
        >
          <FacultyCard :faculty="faculty" />
        </div>
      </div>
    </div>
  </section>
</template>
