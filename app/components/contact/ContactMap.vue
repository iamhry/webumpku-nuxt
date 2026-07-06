<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  mapEmbedUrl: string | null | undefined
}>()

/**
 * Parse the map URL from either:
 * 1. A plain URL string (starts with http)
 * 2. A full <iframe> HTML string — extract the src attribute
 */
const parsedMapSrc = computed<string | null>(() => {
  const raw = props.mapEmbedUrl?.trim()
  if (!raw) return null

  // Already a plain URL
  if (raw.startsWith('http')) return raw

  // Try to extract src="..." from iframe HTML
  const srcMatch = raw.match(/src=["']([^"']+)["']/)
  if (srcMatch?.[1]) return srcMatch[1]

  return null
})

const hasMap = computed(() => !!parsedMapSrc.value)
</script>

<template>
  <div class="contact-map-wrapper">
    <!-- Map iframe -->
    <iframe
      v-if="hasMap"
      :src="parsedMapSrc!"
      class="contact-map-iframe"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Peta Lokasi Kampus Utama"
    ></iframe>

    <!-- Placeholder when no map URL -->
    <div v-else class="contact-map-placeholder">
      <div class="contact-map-placeholder__icon">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="28" fill="currentColor" fill-opacity="0.08"/>
          <path
            d="M28 14C22.477 14 18 18.477 18 24C18 31.5 28 42 28 42C28 42 38 31.5 38 24C38 18.477 33.523 14 28 14ZM28 28C25.791 28 24 26.209 24 24C24 21.791 25.791 20 28 20C30.209 20 32 21.791 32 24C32 26.209 30.209 28 28 28Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p class="contact-map-placeholder__text">Peta lokasi kampus utama belum tersedia.</p>
      <p class="contact-map-placeholder__hint">Silakan tambahkan Google Maps embed URL di panel admin.</p>
    </div>
  </div>
</template>
