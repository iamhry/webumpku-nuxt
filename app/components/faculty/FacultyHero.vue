<script setup lang="ts">
import { computed } from 'vue'
import type { Faculty } from '~/types/faculty'

const props = defineProps<{
  faculty: Faculty & Record<string, any>
}>()

const bgImage = computed(() => {
  return props.faculty.banner || '/assets/img/bread-bg.jpg'
})

const rawLink = computed(() => {
  const f = props.faculty
  if (!f) return ''
  return (
    f.website ||
    f.web ||
    f.url ||
    f.link ||
    f.website_url ||
    f.link_website ||
    f.site ||
    ''
  )
})

const websiteUrl = computed(() => {
  if (!rawLink.value || typeof rawLink.value !== 'string') return ''
  const trimmed = rawLink.value.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
})
</script>

<template>
  <section class="faculty-hero-area" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="hero-overlay"></div>

    <div class="container faculty-detail-container">
      <div class="row align-items-end">
        <div class="col-lg-12">
          <div class="hero-content">
            <!-- Header Meta: Badge dan Singkatan Bersanding Rapi -->
            <div class="faculty-meta-top">
              <span class="badge-faculty">FAKULTAS</span>
              <span v-if="faculty.short_name" class="short-name-badge">{{ faculty.short_name }}</span>
            </div>

            <!-- Judul Utama -->
            <h1 class="faculty-title">{{ faculty.name }}</h1>

            <!-- Footer Meta: Breadcrumb di Kiri, Tombol Kunjungi Kami di Kanan -->
            <div class="faculty-bottom-bar">
              <div class="faculty-breadcrumb">
                <NuxtLink to="/">Beranda</NuxtLink>
                <span class="separator">/</span>
                <NuxtLink to="/fakultas">Fakultas</NuxtLink>
                <span class="separator">/</span>
                <span class="current">{{ faculty.short_name || faculty.name }}</span>
              </div>

              <div v-if="websiteUrl" class="faculty-action-btn">
                <a 
                  :href="websiteUrl" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-visit"
                >
                  <span>Kunjungi Website</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="15" 
                    height="15" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2.2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    class="external-icon"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faculty-hero-area {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 90px 0 50px;
  color: #ffffff;
}

/* Overlay agar teks terbaca jelas */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(13, 27, 42, 0.72) 0%, rgba(13, 27, 42, 0.92) 100%);
  z-index: 1;
}

.faculty-detail-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  display: flex;
  flex-direction: column;
}

/* Meta Top */
.faculty-meta-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.badge-faculty {
  background-color: #f95700;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  padding: 5px 14px;
  border-radius: 20px;
  text-transform: uppercase;
}

.short-name-badge {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Judul */
.faculty-title {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 24px 0;
  color: #ffffff;
  letter-spacing: -0.5px;
}

/* Bottom Bar (Breadcrumb + Button) */
.faculty-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.faculty-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

.faculty-breadcrumb a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
}

.faculty-breadcrumb a:hover {
  color: #ffffff;
}

.faculty-breadcrumb .separator {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
}

.faculty-breadcrumb .current {
  color: #ffffff;
  font-weight: 500;
}

/* Tombol Kunjungi Website */
.btn-visit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0066ff;
  color: #ffffff;
  padding: 9px 20px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(0, 102, 255, 0.35);
}

.btn-visit:hover {
  background: #0052cc;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 102, 255, 0.45);
}

.external-icon {
  transition: transform 0.2s ease;
}

.btn-visit:hover .external-icon {
  transform: translate(2px, -2px);
}

/* Responsif Mobile */
@media (max-width: 768px) {
  .faculty-hero-area {
    padding: 60px 0 40px;
  }
  
  .faculty-bottom-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .btn-visit {
    width: 100%;
    justify-content: center;
  }
}
</style>