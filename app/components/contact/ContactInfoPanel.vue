<script setup lang="ts">
import type { CampusLocation } from '~/types/contact'

defineProps<{
  location: CampusLocation
}>()

/**
 * Formats a whatsapp number for wa.me links.
 * Strips leading zeros and non-digits.
 */
function whatsappHref(number: string | null): string {
  if (!number) return '#'
  const cleaned = number.replace(/\D/g, '').replace(/^0+/, '')
  return `https://wa.me/${cleaned}`
}
</script>

<template>
  <div class="contact-info-panel">

    <!-- Header -->
    <div class="contact-info-panel__header">
      <div class="contact-info-panel__badge-main">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L8.545 5.146L13 5.854L9.786 8.854L10.635 13L7 10.854L3.365 13L4.214 8.854L1 5.854L5.455 5.146L7 1Z" fill="currentColor"/>
        </svg>
        Kampus Utama
      </div>
      <h2 class="contact-info-panel__name">{{ location.name }}</h2>
      <p v-if="location.label" class="contact-info-panel__label">{{ location.label }}</p>
    </div>

    <!-- Contact items -->
    <ul class="contact-info-panel__list">

      <!-- Address -->
      <li v-if="location.address" class="contact-info-panel__item">
        <span class="contact-info-panel__icon contact-info-panel__icon--address">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2ZM12 11.5C10.619 11.5 9.5 10.381 9.5 9C9.5 7.619 10.619 6.5 12 6.5C13.381 6.5 14.5 7.619 14.5 9C14.5 10.381 13.381 11.5 12 11.5Z" fill="currentColor"/>
          </svg>
        </span>
        <div class="contact-info-panel__detail">
          <span class="contact-info-panel__detail-label">Alamat</span>
          <span class="contact-info-panel__detail-value">{{ location.address }}</span>
          <span v-if="location.city || location.province" class="contact-info-panel__detail-sub">
            {{ [location.city, location.province, location.postal_code].filter(Boolean).join(', ') }}
          </span>
        </div>
      </li>

      <!-- Phone -->
      <li v-if="location.phone" class="contact-info-panel__item">
        <span class="contact-info-panel__icon contact-info-panel__icon--phone">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4L14 14.6C14.2 14.4 14.6 14.4 14.8 14.6C15.8 14.9 16.9 15.1 18 15.1C18.6 15.1 19 15.5 19 16.1V18C19 18.6 18.6 19 18 19C9.7 19 3 12.3 3 4C3 3.4 3.4 3 4 3H5.9C6.5 3 6.9 3.4 6.9 4C6.9 5.1 7.1 6.2 7.4 7.2C7.5 7.5 7.4 7.8 7.2 8L5.4 9.8C5.6 10.2 6.1 10.6 6.6 10.8Z" fill="currentColor"/>
          </svg>
        </span>
        <div class="contact-info-panel__detail">
          <span class="contact-info-panel__detail-label">Telepon</span>
          <a :href="`tel:${location.phone}`" class="contact-info-panel__link">{{ location.phone }}</a>
        </div>
      </li>

      <!-- WhatsApp -->
      <li v-if="location.whatsapp" class="contact-info-panel__item">
        <span class="contact-info-panel__icon contact-info-panel__icon--whatsapp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 13.89 2.525 15.66 3.438 17.168L2 22L6.832 20.562C8.34 21.475 10.11 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM16.563 15.563C16.375 16.063 15.5 16.5 15 16.5C14.25 16.5 11.5 15.5 9.5 13.5C7.5 11.5 6.5 8.75 6.5 8C6.5 7.5 6.937 6.625 7.437 6.437C7.875 6.25 8.375 6.375 8.75 6.875L9.75 8.375C10.125 8.875 10 9.5 9.625 9.875L9.25 10.25C9.25 10.25 9.75 11.25 10.5 12C11.25 12.75 12.25 13.25 12.25 13.25L12.625 12.875C13 12.5 13.625 12.375 14.125 12.75L15.625 13.75C16.125 14.125 16.25 14.625 16.063 15.063L16.563 15.563Z" fill="currentColor"/>
          </svg>
        </span>
        <div class="contact-info-panel__detail">
          <span class="contact-info-panel__detail-label">WhatsApp</span>
          <a :href="whatsappHref(location.whatsapp)" target="_blank" rel="noopener noreferrer" class="contact-info-panel__link">
            {{ location.whatsapp }}
          </a>
        </div>
      </li>

      <!-- Email -->
      <li v-if="location.email" class="contact-info-panel__item">
        <span class="contact-info-panel__icon contact-info-panel__icon--email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
          </svg>
        </span>
        <div class="contact-info-panel__detail">
          <span class="contact-info-panel__detail-label">Email</span>
          <a :href="`mailto:${location.email}`" class="contact-info-panel__link">{{ location.email }}</a>
        </div>
      </li>

      <!-- Website -->
      <li v-if="location.website" class="contact-info-panel__item">
        <span class="contact-info-panel__icon contact-info-panel__icon--website">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.77 20 8.65 20 12C20 14.08 19.19 15.98 17.9 17.39Z" fill="currentColor"/>
          </svg>
        </span>
        <div class="contact-info-panel__detail">
          <span class="contact-info-panel__detail-label">Website</span>
          <a :href="location.website" target="_blank" rel="noopener noreferrer" class="contact-info-panel__link">{{ location.website }}</a>
        </div>
      </li>

      <!-- Office Hours -->
      <li v-if="location.office_hours" class="contact-info-panel__item">
        <span class="contact-info-panel__icon contact-info-panel__icon--hours">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
          </svg>
        </span>
        <div class="contact-info-panel__detail">
          <span class="contact-info-panel__detail-label">Jam Operasional</span>
          <span class="contact-info-panel__detail-value">{{ location.office_hours }}</span>
        </div>
      </li>

    </ul>
  </div>
</template>
