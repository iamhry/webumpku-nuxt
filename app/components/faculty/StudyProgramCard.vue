<script setup lang="ts">
import type { StudyProgram } from '~/types/study-program'

defineProps<{
  program: StudyProgram
}>()
</script>

<template>
  <div class="study-program-card">
    <div class="study-program-header">
      <span class="study-program-degree" v-if="program.degree">{{ program.degree }}</span>
      <span class="study-program-accreditation" v-if="program.accreditation">Akreditasi: {{ program.accreditation }}</span>
    </div>
    
    <h4>{{ program.name }}</h4>
    
    <p>{{ program.description || 'Program studi unggulan untuk menghasilkan lulusan yang kompeten dan berintegritas.' }}</p>
    
    <div class="study-program-stats" v-if="program.student_count || program.graduate_count">
      <div class="stat-item" v-if="program.student_count">
        <span class="stat-value">{{ program.student_count }}</span>
        <span class="stat-label">Mahasiswa</span>
      </div>
      <div class="stat-item" v-if="program.graduate_count">
        <span class="stat-value">{{ program.graduate_count }}</span>
        <span class="stat-label">Lulusan</span>
      </div>
    </div>
    
    <NuxtLink :to="`/program-studi/${program.slug}`" class="study-program-btn">
      Lihat Program Studi
    </NuxtLink>
  </div>
</template>
