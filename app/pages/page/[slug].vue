<template>
  <!-- Loading State -->
  <div v-if="status === 'pending'" class="dp-loading">
    <div class="dynamic-page-container" style="width:100%">
      <div class="dp-skeleton dp-skeleton-hero mb-0"></div>
      <div class="dynamic-page-container py-5">
        <div class="dp-skeleton dp-skeleton-line short mb-4"></div>
        <div class="dp-skeleton dp-skeleton-line medium mb-3"></div>
        <div class="dp-skeleton dp-skeleton-line mb-3"></div>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error || !page" class="py-5 text-center" style="min-height:60vh;display:flex;align-items:center;justify-content:center">
    <div class="dynamic-page-container py-5">
      <div style="font-size:4rem;color:#ccc;margin-bottom:1.5rem;">404</div>
      <h2 style="font-size:1.5rem;font-weight:700;color:#1a1a2e;margin-bottom:1rem;">
        Halaman tidak ditemukan
      </h2>
      <p style="color:#6b7280;margin-bottom:2rem;">
        Maaf, halaman yang Anda cari tidak tersedia atau terjadi kesalahan.
      </p>
      <NuxtLink to="/" class="btn btn-primary px-5 py-2 rounded-pill fw-bold">
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>

  <!-- Page Content -->
  <div v-else-if="page" class="dynamic-page">
    <!-- Page Header (always uses page.banner_image) -->
    <PageHero :page="page" />

    <!-- Sections (including hero sections placed correctly according to sort_order) -->
    <main>
      <PageSectionRenderer
        v-for="(section, index) in activeSections"
        :key="section.id"
        :section="section"
        :page="page"
        :index="index"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '#imports'
import { usePages } from '~/composables/usePages'
import { useMedia } from '~/composables/useMedia'
import PageHero from '~/components/page/PageHero.vue'
import PageSectionRenderer from '~/components/page/PageSectionRenderer.vue'
import type { PageSection } from '~/types/page'

const route = useRoute()
const slug = route.params.slug as string
const { locale } = useI18n()
const { fetchPageDetail } = usePages()
const { getImageUrl } = useMedia()

const { data: page, status, error, refresh } = await fetchPageDetail(slug)

watch(locale, () => {
  refresh()
})

const hasHeroSection = computed(() => {
  return page.value?.sections?.some(s => s?.type === 'hero') || false
})

const activeSections = computed(() => {
  if (!page.value || !page.value.sections) return []

  return [...page.value.sections]
    .filter(section => {
      if (!section) return false

      const type = section.type

      // ── Sections yang butuh items ─────────────────────────────────
      const itemOnlySections = [
        'feature_cards', 'timeline', 'downloads',
        'cards', 'statistics', 'stats',
      ]
      if (itemOnlySections.includes(type)) {
        return !!(section.items && section.items.length > 0)
      }

      // ── Gallery: butuh items dengan image ─────────────────────────
      if (type === 'gallery') {
        return !!(section.items?.some(item => !!item.image))
      }

      // ── Sections yang selalu tampil (placeholder jika kosong) ─────
      const alwaysShowSections = [
        'related_news', 'related_events', 'related_sdgs',
        'related_research', 'related_partnerships', 'contact',
      ]
      if (alwaysShowSections.includes(type)) {
        // Tampilkan jika ada title ATAU ada items (placeholder akan muncul jika items kosong)
        return !!(section.title || section.subtitle || (section.items && section.items.length > 0))
      }

      // ── rich_text / content: butuh konten atau judul ──────────────
      if (type === 'rich_text' || type === 'content') {
        return !!(section.content || section.title || section.subtitle)
      }

      // ── FAQ: butuh items ──────────────────────────────────────────
      if (type === 'faq') {
        return !!(section.items && section.items.length > 0)
      }

      // ── CTA: cukup title atau button_text ─────────────────────────
      if (type === 'cta') {
        return !!(section.title || section.button_text)
      }

      // ── Video: hanya tampil jika ada video_url atau iframe ────────
      if (type === 'video') {
        const videoUrl = section.settings?.video_url || (section as any).video_url || section.image
        const hasIframe = section.content?.includes('<iframe')
        return !!(videoUrl || hasIframe)
      }

      // ── Hero: selalu tampil ───────────────────────────────────────
      if (type === 'hero') return true

      // ── Default: ada konten, items, judul, atau gambar ────────────
      return !!(section.content || (section.items && section.items.length > 0) || section.title || section.image)
    })
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
})

const getMetaImage = () => {
  if (!page.value) return ''
  const img = page.value.seo?.og_image || page.value.banner_image || page.value.featured_image
  if (img && !img.startsWith('http') && !img.startsWith('/assets/')) {
    return getImageUrl(img)
  }
  return img || ''
}

const plainTextExcerpt = computed(() => {
  if (!page.value) return ''
  if (page.value.seo?.description) return page.value.seo.description
  if (page.value.excerpt) return page.value.excerpt

  if (page.value.content) {
    const text = page.value.content.replace(/<[^>]+>/g, '').trim()
    return text.substring(0, 160) + (text.length > 160 ? '...' : '')
  }
  return ''
})

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title || 'Loading...',
  description: () => plainTextExcerpt.value,
  ogTitle: () => page.value?.seo?.title || page.value?.title || '',
  ogDescription: () => plainTextExcerpt.value,
  ogImage: () => getMetaImage(),
})
</script>
