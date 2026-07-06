<script setup lang="ts">
import type { Faculty } from '~/types/faculty'

defineProps<{
  faculty: Faculty
}>()
</script>

<template>
  <section class="faculty-contact-area">
    <div class="container faculty-detail-container">
      <div class="faculty-contact-wrapper">
        <!-- Address -->
        <div class="contact-card" v-if="faculty.address">
          <div class="contact-icon">
            <i class="las la-map-marker"></i>
          </div>
          <div class="contact-details">
            <h5>Alamat</h5>
            <p>{{ faculty.address }}</p>
          </div>
        </div>
        
        <!-- Phone -->
        <div class="contact-card" v-if="faculty.phone">
          <div class="contact-icon">
            <i class="las la-phone"></i>
          </div>
          <div class="contact-details">
            <h5>Telepon</h5>
            <p>{{ faculty.phone }}</p>
          </div>
        </div>
        
        <!-- Email -->
        <div class="contact-card" v-if="faculty.email">
          <div class="contact-icon">
            <i class="las la-envelope"></i>
          </div>
          <div class="contact-details">
            <h5>Email</h5>
            <a :href="`mailto:${faculty.email}`">{{ faculty.email }}</a>
          </div>
        </div>
        
        <!-- Website -->
        <div class="contact-card" v-if="faculty.website">
          <div class="contact-icon">
            <i class="las la-globe"></i>
          </div>
          <div class="contact-details">
            <h5>Website Resmi</h5>
            <a :href="faculty.website" target="_blank" rel="noopener noreferrer">{{ faculty.website }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
