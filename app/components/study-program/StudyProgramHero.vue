<script setup lang="ts">
import { computed } from 'vue'
import type { StudyProgram } from '~/types/study-program'

const props = defineProps<{
  program: StudyProgram
}>()

const bgImage = computed(() => {
  return props.program.banner || '/assets/img/bread-bg.jpg'
})
</script>

<template>
  <section class="program-hero-area" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="container study-program-container">
      <div class="row">
        <div class="col-lg-10">
          <div>
            <span class="badge-degree" v-if="program.degree">{{ program.degree }}</span>
            <span class="badge-accreditation" v-if="program.accreditation">Akreditasi: {{ program.accreditation }}</span>
          </div>
          <h1>{{ program.name }}</h1>
          <span v-if="program.faculty?.name" class="parent-faculty">
            {{ program.faculty.name }}
          </span>
          <p v-if="program.description">{{ program.description }}</p>
          
          <div class="program-hero-ctas">
            <a href="https://pmb.umpku.ac.id" target="_blank" class="cta-btn primary">Daftar Sekarang</a>
            <a :href="`https://wa.me/${program.phone}`" target="_blank" v-if="program.phone" class="cta-btn secondary">Hubungi Prodi</a>
          </div>

          <div class="faculty-breadcrumb">
            <NuxtLink to="/">Beranda</NuxtLink>
            <span class="separator">/</span>
            <NuxtLink to="/program-studi">Program Studi</NuxtLink>
            <span class="separator">/</span>
            <span>{{ program.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
