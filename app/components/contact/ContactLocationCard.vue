<script setup lang="ts">
import type { CampusLocation } from '~/types/contact'

defineProps<{
  location: CampusLocation
}>()

function whatsappHref(number: string | null): string {
  if (!number) return '#'
  const cleaned = number.replace(/\D/g, '').replace(/^0+/, '')
  return `https://wa.me/${cleaned}`
}
</script>

<template>
  <article class="contact-location-card">

    <!-- Card header -->
    <div class="contact-location-card__header">
      <div class="contact-location-card__title-row">
        <h3 class="contact-location-card__name">{{ location.name }}</h3>
        <span v-if="location.is_main" class="contact-location-card__badge-main">
          Kampus Utama
        </span>
      </div>
      <p v-if="location.label" class="contact-location-card__label">{{ location.label }}</p>
    </div>

    <!-- Card body -->
    <ul class="contact-location-card__list">

      <li v-if="location.address" class="contact-location-card__item">
        <span class="contact-location-card__icon" aria-hidden="true">📍</span>
        <span>{{ location.address }}<template v-if="location.city">, {{ location.city }}</template></span>
      </li>

      <li v-if="location.phone" class="contact-location-card__item">
        <span class="contact-location-card__icon" aria-hidden="true">📞</span>
        <a :href="`tel:${location.phone}`" class="contact-location-card__link">{{ location.phone }}</a>
      </li>

      <li v-if="location.whatsapp" class="contact-location-card__item">
        <span class="contact-location-card__icon" aria-hidden="true">💬</span>
        <a
          :href="whatsappHref(location.whatsapp)"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-location-card__link contact-location-card__link--whatsapp"
        >
          {{ location.whatsapp }}
        </a>
      </li>

      <li v-if="location.email" class="contact-location-card__item">
        <span class="contact-location-card__icon" aria-hidden="true">✉️</span>
        <a :href="`mailto:${location.email}`" class="contact-location-card__link">{{ location.email }}</a>
      </li>

      <li v-if="location.office_hours" class="contact-location-card__item">
        <span class="contact-location-card__icon" aria-hidden="true">🕐</span>
        <span>{{ location.office_hours }}</span>
      </li>

    </ul>

  </article>
</template>
