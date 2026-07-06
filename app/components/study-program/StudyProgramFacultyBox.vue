<script setup lang="ts">
import type { Faculty } from '~/types/faculty'

defineProps<{
  faculty: Faculty
}>()
</script>

<template>
  <section class="program-faculty-area">
    <div class="container study-program-container">
      <div class="faculty-card-box">
        <h3>Fakultas Induk</h3>
        <p>Program studi ini berada di bawah naungan {{ faculty.name }}. Jelajahi fakultas untuk melihat profil lengkap, kegiatan riset, dan fasilitas penunjang akademik.</p>
        <NuxtLink :to="`/fakultas/${faculty.slug}`" class="faculty-box-btn">
          Lihat Fakultas
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
