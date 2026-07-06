<script setup lang="ts">
import type { StudyProgram } from '~/types/study-program'

defineProps<{
  program: StudyProgram
}>()
</script>

<template>
  <section class="program-facts-area">
    <div class="container study-program-container">
      <div class="facts-grid">
        <!-- Jenjang -->
        <div class="fact-card" v-if="program.degree">
          <div class="fact-icon">
            <i class="las la-graduation-cap"></i>
          </div>
          <div class="fact-info">
            <h6>Jenjang</h6>
            <p>{{ program.degree }}</p>
          </div>
        </div>

        <!-- Akreditasi -->
        <div class="fact-card" v-if="program.accreditation">
          <div class="fact-icon">
            <i class="las la-certificate"></i>
          </div>
          <div class="fact-info">
            <h6>Akreditasi</h6>
            <p>{{ program.accreditation }}</p>
          </div>
        </div>

        <!-- Mahasiswa Aktif -->
        <div class="fact-card" v-if="program.student_count">
          <div class="fact-icon">
            <i class="las la-users"></i>
          </div>
          <div class="fact-info">
            <h6>Mahasiswa</h6>
            <p>{{ program.student_count }}</p>
          </div>
        </div>

        <!-- Alumni -->
        <div class="fact-card" v-if="program.graduate_count">
          <div class="fact-icon">
            <i class="las la-user-graduate"></i>
          </div>
          <div class="fact-info">
            <h6>Alumni</h6>
            <p>{{ program.graduate_count }}</p>
          </div>
        </div>

        <!-- Fakultas -->
        <div class="fact-card" v-if="program.faculty?.short_name || program.faculty?.name">
          <div class="fact-icon">
            <i class="las la-university"></i>
          </div>
          <div class="fact-info">
            <h6>Fakultas</h6>
            <p>{{ program.faculty?.short_name || program.faculty?.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
