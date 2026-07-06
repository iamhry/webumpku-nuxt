<script setup lang="ts">
import type { StudyProgram } from '~/types/study-program'

defineProps<{
  program: StudyProgram
}>()
</script>

<template>
  <section class="program-profile-area">
    <div class="container study-program-container">
      <div class="row">
        <!-- Visi, Misi, Deskripsi -->
        <div class="col-lg-8 pr-50">
          <div class="program-profile-content">
            <h3>Profil Program Studi</h3>
            <p>{{ program.description }}</p>
            
            <div class="program-vision-mission">
              <div v-if="program.vision" class="program-vision-box">
                <h4>Visi</h4>
                <p>{{ program.vision }}</p>
              </div>
              
              <div v-if="program.mission" class="program-mission-box">
                <h4>Misi</h4>
                <p>{{ program.mission }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Kaprodi Details -->
        <div class="col-lg-4" v-if="program.head_name">
          <div class="program-sidebar-card">
            <div class="head-photo-wrapper">
              <img v-if="program.head_photo" :src="program.head_photo" :alt="program.head_name">
              <img v-else src="/assets/img/team/1.jpg" :alt="program.head_name">
            </div>
            
            <div class="head-info">
              <h5>{{ program.head_name }}</h5>
              <span>{{ program.head_title || 'Ketua Program Studi' }}</span>
            </div>
            
            <div class="head-contact" v-if="program.email || program.phone">
              <div class="head-contact-item" v-if="program.email">
                <i class="las la-envelope"></i>
                <span>{{ program.email }}</span>
              </div>
              <div class="head-contact-item" v-if="program.phone">
                <i class="las la-phone"></i>
                <span>{{ program.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
