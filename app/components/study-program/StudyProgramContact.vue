<script setup lang="ts">
import type { StudyProgram } from '~/types/study-program'

defineProps<{
  program: StudyProgram
}>()
</script>

<template>
  <section class="program-contact-area">
    <div class="container study-program-container">
      <div class="program-contact-wrapper">
        <!-- Phone -->
        <div class="contact-card" v-if="program.phone">
          <div class="contact-icon">
            <i class="las la-phone"></i>
          </div>
          <div class="contact-details">
            <h5>Telepon</h5>
            <p>{{ program.phone }}</p>
          </div>
        </div>
        
        <!-- Email -->
        <div class="contact-card" v-if="program.email">
          <div class="contact-icon">
            <i class="las la-envelope"></i>
          </div>
          <div class="contact-details">
            <h5>Email Resmi</h5>
            <a :href="`mailto:${program.email}`">{{ program.email }}</a>
          </div>
        </div>
        
        <!-- Website -->
        <div class="contact-card" v-if="program.website">
          <div class="contact-icon">
            <i class="las la-globe"></i>
          </div>
          <div class="contact-details">
            <h5>Website Program Studi</h5>
            <a :href="program.website" target="_blank" rel="noopener noreferrer">{{ program.website }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
