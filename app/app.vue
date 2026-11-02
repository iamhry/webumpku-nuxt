<template>
  <div>
    <PreLoader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useHead } from '#imports'
import { useSettings } from '~/composables/useSettings'

const route = useRoute()
const { settings, fetchSettings } = useSettings()

await fetchSettings()


const bodyClass = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  const name = String(route.name || '')

  // 1. Contact / Form Container
  if (
    path.includes('/contact') || 
    path.includes('/form') || 
    route.params.slug === 'contact' || 
    route.params.slug === 'hubungi-kami'
  ) {
    return 'layout-form'
  }

  // 2. Detail pages: News Detail, SDGs Detail, Profile Detail
  // Checking patterns for news detail (e.g. /berita/[slug] or /news/[slug])
  // and sdgs detail (/sdgs/[slug])
  const parts = path.split('/').filter(Boolean)
  const isI18n = parts[0] === 'en' || parts[0] === 'id'
  const cleanParts = isI18n ? parts.slice(1) : parts

  if (cleanParts.length >= 2) {
    const parent = cleanParts[0]
    // News Detail
    if (parent === 'news' || parent === 'berita') {
      return 'layout-content'
    }
    // SDGs Detail
    if (parent === 'sdgs') {
      return 'layout-content'
    }
    // Profile/General Detail pages (e.g. /profil/[slug] or /profile/[slug])
    if (parent === 'profil' || parent === 'profile') {
      return 'layout-content'
    }
  }

  // General fallback for profile detail or general pages handled by [slug].vue (e.g. /about, /choose-us, etc.)
  if (route.params.slug) {
    return 'layout-content'
  }

  // 3. Homepage (Wide Container)
  if (path === '/' || path === '/en' || path === '/id') {
    return 'layout-homepage'
  }

  // Default fallback
  return 'layout-content'
})

const faviconHref = computed(() => settings.value.favicon || '/favicon.ico')

useHead({
  bodyAttrs: {
    class: bodyClass
  },
  link: computed(() => [{
    rel: 'icon',
    href: faviconHref.value,
    key: 'favicon'
  }])
})
</script>
