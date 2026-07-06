<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useLocalePath, useAsyncData } from '#imports'
import { quickAccessService } from '~/services/quickAccess'
import QuickAccessCard from './QuickAccessCard.vue'

// Import the new home quick access stylesheet
import '~/assets/css/home-quick-access.css'

const { locale } = useLocale()
const localePath = useLocalePath()

// Fetch quick-access portals from API
const { data, pending, error } = await useAsyncData('homepage-quick-access-list', async () => {
  return await quickAccessService.getQuickAccess()
})

// Extract items safely
const quickAccessList = computed(() => {
  if (!data.value || !data.value.data) return []
  // Sort by sort_order if available, otherwise preserve API ordering
  return [...data.value.data].sort((a, b) => {
    const orderA = a.sort_order ?? 0
    const orderB = b.sort_order ?? 0
    return orderA - orderB
  })
})
</script>

<template>
  <div class="home-quick-access-area">
    <div class="container content-wide">
      
      <!-- Section Header -->
      <div class="row align-items-end quick-access-header">
        <div class="col-lg-8 col-md-7 col-12" v-reveal data-reveal="fade-up">
          <span class="quick-access-subtitle-tag">
            {{ locale === 'en' ? 'DIGITAL PORTAL' : 'PORTAL DIGITAL' }}
          </span>
          <h2 class="quick-access-title">
            {{ locale === 'en' ? 'Portal & Digital Services' : 'Portal & Layanan Digital' }}
          </h2>
          <p class="quick-access-desc">
            {{ locale === 'en'
                ? 'Quick access to all digital services of Universitas Muhammadiyah PKU for students, lecturers, academic staff, alumni, and the public.'
                : 'Akses cepat ke seluruh layanan digital Universitas Muhammadiyah PKU untuk mahasiswa, dosen, tenaga kependidikan, alumni, dan masyarakat.' }}
          </p>
        </div>
        
        <div class="col-lg-4 col-md-5 col-12 text-md-right mt-3 mt-md-0" v-reveal data-reveal="fade-right" data-reveal-delay="150">
          <NuxtLink :to="localePath('/')" class="quick-access-header-btn">
            {{ locale === 'en' ? 'View All Services' : 'Lihat Semua Layanan' }}
            <i class="las la-arrow-right ml-1"></i>
          </NuxtLink>
        </div>
      </div>

      <!-- Loading State Skeleton Grid -->
      <div v-if="pending && quickAccessList.length === 0" class="quick-access-grid">
        <div v-for="i in 4" :key="i" class="quick-access-skeleton-card">
          <div class="quick-access-skeleton-circle"></div>
          <div class="quick-access-skeleton-line quick-access-skeleton-title"></div>
          <div class="quick-access-skeleton-line quick-access-skeleton-desc1"></div>
          <div class="quick-access-skeleton-line quick-access-skeleton-desc2"></div>
          <div class="quick-access-skeleton-line quick-access-skeleton-arrow"></div>
        </div>
      </div>

      <!-- Empty State / Error state -->
      <div v-else-if="error || quickAccessList.length === 0" class="quick-access-grid">
        <div class="quick-access-empty-state animate__animated animate__fadeIn">
          <i class="las la-server quick-access-empty-icon"></i>
          <p class="quick-access-empty-text">
            {{ locale === 'en' ? 'Digital services are currently being updated.' : 'Layanan digital sedang diperbarui.' }}
          </p>
        </div>
      </div>

      <!-- Dynamic Grid of Services -->
      <div v-else class="quick-access-grid">
        <div 
          v-for="(item, index) in quickAccessList" 
          :key="item.id"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="index * 80"
        >
          <QuickAccessCard :item="item" />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Scoped styles are kept clean as styling is loaded from home-quick-access.css */
</style>
