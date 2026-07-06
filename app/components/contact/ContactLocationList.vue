<script setup lang="ts">
import type { CampusLocation } from '~/types/contact'
import ContactLocationCard from './ContactLocationCard.vue'

defineProps<{
  locations: CampusLocation[]
}>()
</script>

<template>
  <section class="contact-location-list-section">
    <div class="container">
      <div class="contact-section-header">
        <h2 class="contact-section-header__title">Lokasi Kampus</h2>
        <p class="contact-section-header__subtitle">
          Temukan seluruh kampus kami yang tersebar di wilayah Surakarta dan sekitarnya.
        </p>
      </div>

      <!-- Empty state -->
      <div v-if="locations.length === 0" class="contact-location-empty">
        <p>Data lokasi kampus belum tersedia.</p>
      </div>

      <!-- Grid -->
      <div v-else class="contact-location-grid">
        <ContactLocationCard
          v-for="location in locations"
          :key="location.id"
          :location="location"
        />
      </div>
    </div>
  </section>
</template>
