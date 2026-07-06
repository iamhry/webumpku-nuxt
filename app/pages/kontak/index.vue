<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useContact } from '~/composables/useContact'
import ContactHero from '~/components/contact/ContactHero.vue'
import ContactMap from '~/components/contact/ContactMap.vue'
import ContactInfoPanel from '~/components/contact/ContactInfoPanel.vue'
import ContactLocationList from '~/components/contact/ContactLocationList.vue'
import ContactForm from '~/components/contact/ContactForm.vue'

const { locale } = useI18n()
const { fetchContact, mainLocation, locations, isLoading, hasError } = useContact()

await fetchContact()

// SEO Meta
useHead({
  title: 'Hubungi Kami | Universitas Muhammadiyah PKU',
  meta: [
    {
      name: 'description',
      content: 'Temukan informasi kontak dan lokasi kampus Universitas Muhammadiyah PKU. Kampus Utama, Kampus 2, Kampus 3 beserta alamat lengkap, telepon, email, dan peta.',
    },
    {
      property: 'og:title',
      content: 'Hubungi Kami | Universitas Muhammadiyah PKU',
    },
    {
      property: 'og:description',
      content: 'Informasi kontak dan lokasi kampus Universitas Muhammadiyah PKU.',
    },
  ],
})
</script>

<template>
  <div class="contact-page">

    <!-- Hero section -->
    <ContactHero />

    <!-- Error state -->
    <div v-if="hasError" class="container py-5 text-center">
      <p>Gagal memuat data kontak. Silakan coba lagi nanti.</p>
    </div>

    <template v-else>

      <!-- Section 1: Main contact + Map -->
      <section class="contact-main-section">
        <div class="container">
          <div class="contact-main-grid">

            <!-- Left: Info Panel -->
            <div class="contact-main-grid__info">
              <ContactInfoPanel
                v-if="mainLocation"
                :location="mainLocation"
              />
              <div v-else-if="!isLoading" class="contact-info-empty">
                <p>Data kontak belum tersedia.</p>
              </div>
              <!-- Skeleton -->
              <div v-if="isLoading" class="contact-skeleton contact-skeleton--panel"></div>
            </div>

            <!-- Right: Map (Kampus Utama only) -->
            <div class="contact-main-grid__map">
              <ContactMap :map-embed-url="mainLocation?.map_embed_url ?? null" />
            </div>

          </div>
        </div>
      </section>

      <!-- Section 2: All campus locations list -->
      <ContactLocationList :locations="locations" />

      <!-- Section 3: Contact form (optional, shown by default) -->
      <ContactForm :visible="true" />

    </template>

  </div>
</template>
