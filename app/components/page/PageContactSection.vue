<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'
import { useContact } from '~/composables/useContact'
import ContactMap from '~/components/contact/ContactMap.vue'
import ContactInfoPanel from '~/components/contact/ContactInfoPanel.vue'
import ContactLocationList from '~/components/contact/ContactLocationList.vue'

const props = defineProps<{
  section: PageSection
}>()

const settings = computed(() => props.section.settings ?? {})

// Determine if we should pull data from Contact API
const useApiSource = computed<boolean>(() => settings.value?.source === 'contact_api')
const showMap      = computed<boolean>(() => settings.value?.show_map !== false)
const showAll      = computed<boolean>(() => settings.value?.show_all_locations !== false)

// Only fetch if source = "contact_api"
const { fetchContact, mainLocation, locations, isLoading } = useContact()

if (useApiSource.value) {
  await fetchContact()
}
</script>

<template>
  <div class="page-contact-section">

    <!-- API-driven mode -->
    <template v-if="useApiSource">

      <!-- Map for main campus only -->
      <div v-if="showMap" class="page-contact-section__map-wrapper container">
        <ContactMap :map-embed-url="mainLocation?.map_embed_url ?? null" />
      </div>

      <!-- Main info panel + optional all locations -->
      <div class="container">
        <div v-if="mainLocation" class="contact-main-grid">
          <div class="contact-main-grid__info">
            <ContactInfoPanel :location="mainLocation" />
          </div>
          <div v-if="showMap" class="contact-main-grid__map">
            <ContactMap :map-embed-url="mainLocation.map_embed_url" />
          </div>
        </div>

        <ContactLocationList v-if="showAll" :locations="locations" />
      </div>

    </template>

    <!-- Static items mode (from page section items) -->
    <template v-else>
      <div class="container py-4">
        <h2 v-if="section.title" class="contact-section-header__title">{{ section.title }}</h2>
        <p  v-if="section.content" class="contact-section-header__subtitle" v-html="section.content"></p>

        <div v-if="section.items && section.items.length > 0" class="contact-location-grid">
          <div
            v-for="item in section.items"
            :key="item.id"
            class="contact-location-card"
          >
            <h3 v-if="item.title"    class="contact-location-card__name">{{ item.title }}</h3>
            <p  v-if="item.subtitle" class="contact-location-card__label">{{ item.subtitle }}</p>
            <p  v-if="item.content"  class="contact-location-card__address" v-html="item.content"></p>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>
