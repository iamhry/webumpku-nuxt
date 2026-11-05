<template>
  <section class="qa-modern-section" aria-labelledby="qa-title">
    <div class="container content-wide">
      <div class="qa-header" v-reveal data-reveal="fade-up">
        <h2 id="qa-title" class="qa-title">{{ heading }}</h2>
        <p class="qa-subtitle">
          {{ locale === 'en' ? 'Quick access to university portals and services' : 'Akses cepat ke portal dan layanan universitas' }}
        </p>
      </div>

      <div class="qa-grid">
        <component
          :is="item.url.startsWith('http') ? 'a' : resolveComponent('NuxtLink')"
          v-for="(item, index) in items"
          :key="item.id"
          :href="item.url.startsWith('http') ? item.url : undefined"
          :to="!item.url.startsWith('http') ? item.url : undefined"
          :target="item.url.startsWith('http') ? '_blank' : undefined"
          :rel="item.url.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="qa-card"
          :class="`qa-card--${item.variant}`"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="100 + index * 80"
        >
          <!-- Ikon panah di kanan atas -->
          <div class="qa-card-arrow" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>

          <div class="qa-card-content">
            <h3 class="qa-card-title">{{ item.title }}</h3>
            <p class="qa-card-desc">{{ item.description }}</p>
          </div>

          <div class="qa-card-media" v-if="item.image">
            <img 
              :src="item.image" 
              :alt="item.title" 
              width="640" 
              height="480" 
              loading="lazy" 
              decoding="async" 
            />
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
// import { useLocale } from '#imports' // Aktifkan jika diperlukan

export interface QuickAccessItem {
  id: number
  title: string
  description: string
  image: string
  url: string
  variant: 'light' | 'primary'
}

const { locale } = useLocale()

const heading = computed(() =>
  locale.value === 'en' ? 'UMPKU Quick Services' : 'Layanan Cepat UMPKU'
)

const items = computed<QuickAccessItem[]>(() => {
  if (locale.value === 'en') {
    return [
      {
        id: 1,
        title: 'Ask UMPKU',
        description: 'Get campus information and support quickly.',
        image: '/images/home/quick-access/help.webp',
        url: '/kontak',
        variant: 'light',
      },
      {
        id: 2,
        title: 'Online Academic Services',
        description: 'Access UMPKU academic services anytime, anywhere.',
        image: '/images/home/quick-access/digital-service.webp',
        url: 'https://pmb.umpku.ac.id',
        variant: 'primary',
      },
      {
        id: 3,
        title: 'Find UMPKU Campus',
        description: 'Explore location, facilities, and campus life.',
        image: '/images/home/quick-access/campus.jpg',
        url: '/kontak',
        variant: 'light',
      },
    ]
  }

  return [
    {
      id: 1,
      title: 'Tanya UMPKU',
      description: 'Informasi dan bantuan layanan kampus dengan cepat.',
      image: '/images/home/quick-access/help.webp',
      url: '/kontak',
      variant: 'light',
    },
    {
      id: 2,
      title: 'Layanan Akademik Online',
      description: 'Akses layanan akademik UMPKU kapan saja dan di mana saja.',
      image: '/images/home/quick-access/digital-service.webp',
      url: 'https://pmb.umpku.ac.id',
      variant: 'primary',
    },
    {
      id: 3,
      title: 'Temukan Kampus UMPKU',
      description: 'Lihat lokasi, fasilitas, dan lingkungan kampus UMPKU.',
      image: '/images/home/quick-access/campus.jpg',
      url: '/kontak',
      variant: 'light',
    },
  ]
})
</script>

<style scoped>
/* Variabel Warna Modern */
.qa-modern-section {
  --qa-bg: #ffffff;
  --qa-border: #eaedf1;
  --qa-border-hover: #cbd5e1;
  
  --qa-navy: #1b3c6b;
  --qa-navy-deep: #102a4c;
  --qa-orange: #f7941d;
  
  --qa-text-main: #111827;
  --qa-text-muted: #64748b;

  padding: 5rem 0;
  background-color: var(--qa-bg);
  font-family: var(--font-body, sans-serif);
}

/* Header */
.qa-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.qa-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--qa-navy);
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.qa-subtitle {
  font-size: 1.125rem;
  color: var(--qa-text-muted);
  margin: 0;
}

/* Grid Layout */
.qa-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  max-width: 1280px;
  margin: 0 auto;
}

/* Base Card Style (Linear & Clean) */
.qa-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 420px;
  background: #fff;
  border: 1px solid var(--qa-border);
  border-radius: 20px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.qa-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px -8px rgba(27, 60, 107, 0.08);
}

.qa-card:focus-visible {
  outline: 2px solid var(--qa-orange);
  outline-offset: 2px;
}

/* Panah Navigasi */
.qa-card-arrow {
  position: absolute;
  top: 32px;
  right: 32px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 2;
}

.qa-card:hover .qa-card-arrow {
  transform: translate(4px, -4px);
}

/* Card Content Area (Bagian Teks) */
.qa-card-content {
  padding: 32px 32px 0 32px;
  padding-right: 70px; /* Menyediakan ruang agar teks tidak menabrak panah */
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

/* Typography (Judul & Deskripsi) */
.qa-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
}

.qa-card-desc {
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0;
}

/* Media/Image Area */
.qa-card-media {
  height: 180px;
  width: 100%;
  margin-top: 32px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.qa-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}

.qa-card:hover .qa-card-media img {
  transform: scale(1.05);
}

/* =========================================
   VARIANT: LIGHT (Kartu Putih Standar)
   ========================================= */
.qa-card--light {
  background: #ffffff;
  color: var(--qa-text-main);
}

.qa-card--light:hover {
  border-color: var(--qa-border-hover);
}

.qa-card--light .qa-card-title {
  color: var(--qa-navy) !important;
}

.qa-card--light .qa-card-arrow {
  color: var(--qa-navy);
  border: 1px solid var(--qa-border);
}

.qa-card--light:hover .qa-card-arrow {
  background: var(--qa-navy);
  color: #fff;
  border-color: var(--qa-navy);
}

.qa-card--light .qa-card-desc {
  color: var(--qa-text-muted);
}

/* =========================================
   VARIANT: PRIMARY (Kartu Biru UMPKU)
   ========================================= */
.qa-card--primary {
  background: var(--qa-navy);
  border-color: var(--qa-navy-deep);
}

.qa-card--primary:hover {
  border-color: var(--qa-navy-deep);
  box-shadow: 0 12px 32px -8px rgba(16, 42, 76, 0.4);
}

/* Memaksa Teks di Kartu Biru menjadi Putih */
.qa-card--primary .qa-card-title,
.qa-card--primary .qa-card-desc {
  color: #ffffff !important; 
}

.qa-card--primary .qa-card-desc {
  opacity: 0.9;
}

.qa-card--primary .qa-card-arrow {
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.qa-card--primary:hover .qa-card-arrow {
  background: #ffffff;
  color: var(--qa-navy);
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .qa-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .qa-modern-section {
    padding: 3rem 0;
  }
  
  .qa-grid {
    grid-template-columns: 1fr;
  }
  
  .qa-card {
    min-height: auto;
  }
  
  .qa-card-content {
    padding-right: 32px; /* Kembalikan padding karena panah akan dipindah letaknya jika diperlukan */
  }

  .qa-card-arrow {
    width: 32px;
    height: 32px;
    top: 24px;
    right: 24px;
  }

  .qa-card-media {
    height: 200px;
  }
}
</style>