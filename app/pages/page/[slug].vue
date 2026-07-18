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
    <!-- Page banner only when CMS did not add a hero section (avoids double hero) -->
    <PageHero v-if="!hasHeroSection" :page="page" />

    <div v-if="isPreview" class="page-preview-banner" role="status">
      Mode preview aktif — semua section ditampilkan, termasuk yang masih kosong.
    </div>

    <main>
      <PageSectionRenderer
        v-for="(section, index) in activeSections"
        :key="section.id"
        :section="section"
        :page="page"
        :index="index"
        :preview="isPreview"
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
import { usePageSections } from '~/composables/usePageSections'
import PageHero from '~/components/page/PageHero.vue'
import PageSectionRenderer from '~/components/page/PageSectionRenderer.vue'

const route = useRoute()
const slug = route.params.slug as string
const { locale } = useI18n()
const { fetchPageDetail } = usePages()
const { getImageUrl } = useMedia()
const { isPreview, filterSections } = usePageSections()

const { data: page, status, error, refresh } = await fetchPageDetail(slug)

watch(locale, () => {
  refresh()
})

const hasHeroSection = computed(() => {
  return page.value?.sections?.some(s => s?.type === 'hero') || false
})

const activeSections = computed(() => filterSections(page.value?.sections))

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

<style scoped>
.page-preview-banner {
  background: #fff3cd;
  color: #664d03;
  text-align: center;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #ffecb5;
}
</style>
