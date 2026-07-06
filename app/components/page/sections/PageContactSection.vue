<template>
  <section
    v-if="hasContent"
    class="dynamic-page-section page-bg-soft"
  >
    <div class="dynamic-page-container">

      <!-- Header -->
      <div v-if="section.title || section.subtitle" class="page-section-header page-center">
        <span v-if="section.settings?.kicker" class="page-kicker">{{ section.settings.kicker }}</span>
        <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
        <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
      </div>

      <!-- Optional intro content -->
      <div
        v-if="section.content"
        class="dynamic-page-reading page-prose mb-5 mx-auto"
        v-html="section.content"
      ></div>

      <!-- Contact Cards -->
      <div v-if="section.items && section.items.length > 0" class="page-contact-grid">
        <component
          :is="getContactHref(item) ? 'a' : 'div'"
          v-for="item in section.items"
          :key="item.id"
          :href="getContactHref(item) || undefined"
          :target="isExternalUrl(item.url) ? '_blank' : undefined"
          :rel="isExternalUrl(item.url) ? 'noopener noreferrer' : undefined"
          class="page-contact-card"
        >
          <!-- Icon -->
          <div class="page-contact-icon">
            <i :class="getContactIcon(item)"></i>
          </div>

          <!-- Info -->
          <div>
            <p class="page-contact-label">{{ item.title }}</p>
            <p class="page-contact-value">{{ item.description }}</p>
          </div>
        </component>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection, PageSectionItem } from '~/types/page'

const props = defineProps<{
  section: PageSection
}>()

const hasContent = computed(() => {
  return !!(props.section.title || props.section.content || (props.section.items && props.section.items.length > 0))
})

/** Smart URL detection for contact items */
const getContactHref = (item: PageSectionItem): string | null => {
  const desc = (item.description || '').trim()
  const url  = (item.url || '').trim()
  const title = (item.title || '').toLowerCase()

  // If explicit url provided
  if (url) {
    if (url.startsWith('http') || url.startsWith('//')) return url
    if (url.includes('@')) return `mailto:${url}`
    return url
  }

  // Auto-detect from description
  if (desc.includes('@')) return `mailto:${desc}`

  // Phone / WhatsApp detection
  if (title.includes('wa') || title.includes('whatsapp')) {
    const cleaned = desc.replace(/\D/g, '')
    if (cleaned) return `https://wa.me/${cleaned}`
  }

  if (title.includes('telp') || title.includes('phone') || title.includes('fax') || title.includes('hp')) {
    const cleaned = desc.replace(/[^\d+]/g, '')
    if (cleaned) return `tel:${cleaned}`
  }

  if (desc.startsWith('http') || desc.startsWith('www.')) {
    return desc.startsWith('http') ? desc : `https://${desc}`
  }

  return null
}

const getContactIcon = (item: PageSectionItem): string => {
  if (item.icon) return item.icon
  const title = (item.title || '').toLowerCase()
  if (title.includes('email') || title.includes('mail')) return 'las la-envelope'
  if (title.includes('wa') || title.includes('whatsapp')) return 'lab la-whatsapp'
  if (title.includes('telp') || title.includes('phone') || title.includes('hp')) return 'las la-phone'
  if (title.includes('fax')) return 'las la-fax'
  if (title.includes('web') || title.includes('site')) return 'las la-globe'
  if (title.includes('alamat') || title.includes('address') || title.includes('lokasi')) return 'las la-map-marker'
  if (title.includes('instagram') || title.includes('ig')) return 'lab la-instagram'
  if (title.includes('youtube')) return 'lab la-youtube'
  if (title.includes('facebook') || title.includes('fb')) return 'lab la-facebook'
  return 'las la-info-circle'
}

const isExternalUrl = (url?: string): boolean => {
  return url?.startsWith('http') || url?.startsWith('//') || false
}
</script>
