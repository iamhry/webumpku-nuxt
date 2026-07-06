<script setup lang="ts">
import type { StudyProgram } from '~/types/study-program'
import StudyProgramCard from './StudyProgramCard.vue'

defineProps<{
  facultyName: string
  programs: StudyProgram[]
}>()
</script>

<template>
  <section class="faculty-study-programs-area">
    <div class="container faculty-detail-container">
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-10">
          <div class="section-title text-center mb-70">
            <span class="sub-title color-primary mb-10">Program Studi</span>
            <h2>Pilihan Program Akademik</h2>
            <p>Pilihan program akademik di bawah {{ facultyName }}</p>
          </div>
        </div>
      </div>
      
      <div class="row gx-8 gy-8">
        <div v-for="program in programs" :key="program.id" class="col-md-6 col-lg-4 mb-4">
          <StudyProgramCard :program="program" />
        </div>
      </div>
    </div>
  </section>
</template>
