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
        
        <!-- Sidebar with Dean Info and Logo -->
        <div class="col-lg-4">
          <div class="faculty-sidebar-card">
            <div class="faculty-logo-wrapper" v-if="faculty.logo">
              <img :src="faculty.logo" :alt="faculty.name">
            </div>
            
            <div class="dean-wrapper" v-if="faculty.dean_name">
              <div class="dean-photo-wrapper">
                <img v-if="faculty.dean_photo" :src="faculty.dean_photo" :alt="faculty.dean_name">
                <img v-else src="/assets/img/team/1.jpg" :alt="faculty.dean_name">
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
