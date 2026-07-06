<template>
  <div v-if="isValid" class="about-area section-padding">
    <div class="container content-wide">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="about-img-wrap image-zoom" v-reveal data-reveal="fade-left">
            <div class="image-one">
              <img :src="primaryImage" :alt="title">
            </div>                                                                      
          </div> 					
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="info-content-area" v-reveal data-reveal="fade-right" data-reveal-delay="150">
            <div class="section-title">
              <h6>{{ subtitle }}</h6>
              <h2 v-html="title"></h2>
            </div>
            
            <div v-html="content" class="about-content-wrapper"></div>

            <div v-if="hasSettings" class="row founded mt-4">
              <div v-if="experienceYear" class="col-lg-4 col-md-6 col-12">
                <div class="years"><span>{{ experienceYear }}</span>Year of Success</div>
              </div>
              <div v-if="highlightText" class="col-lg-8 col-md-6 col-12">
                <div class="text">{{ highlightText }}</div>
              </div>
            </div>
            
            <div v-if="buttonUrl && buttonText" class="mt-4" v-reveal data-reveal="fade-up" data-reveal-delay="250">
              <NuxtLink :to="buttonUrl" class="main-btn">{{ buttonText }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import type { HomepageSection } from '~/types/homepage'
import { useMedia } from '~/composables/useMedia'

const props = defineProps<{
  section?: HomepageSection
}>()

const { getImageUrl } = useMedia()
const { locale } = useLocale()

// Fallbacks matching real university profile
const title = computed(() => props.section?.title || (locale.value === 'en' ? "Universitas Muhammadiyah PKU Surakarta" : "Universitas Muhammadiyah PKU"))
const subtitle = computed(() => props.section?.subtitle || (locale.value === 'en' ? "Welcome to Universitas Muhammadiyah PKU Surakarta" : "Universitas Muhammadiyah PKU Surakarta"))

const content = computed(() => {
  if (props.section?.content) {
    return props.section.content
  }
  
  if (locale.value === 'en') {
    return `
      <p>Welcome to Universitas Muhammadiyah PKU Surakarta. We are committed to presenting higher education that is excellent, adaptive, and based on Islamic values. Through innovation, collaboration, and a quality academic culture, we prepare graduates who are ready to face global challenges and make real contributions to community development.</p>
      <p>We present this website as an open information center for prospective students, students, alumni, partners, and the wider community to get to know more closely the journey, achievements, and contributions of Universitas Muhammadiyah PKU in the fields of education, research, community service, and international cooperation.</p>
      <p>Together with UMPKU Surakarta, let's build a better future through education, innovation, and service.</p>
      <p style="margin-top: 25px;"><strong>Weni Hastuti, M.Kes., Ph.D.</strong><br><span style="color: #6c757d; font-size: 0.9em;">Rector of Universitas Muhammadiyah PKU</span></p>
    `
  }
  
  return `
    <p>Selamat datang di Universitas Muhammadiyah PKU Surakarta. Kami berkomitmen menghadirkan pendidikan tinggi yang unggul, adaptif, dan berlandaskan nilai-nilai Islam. Melalui inovasi, kolaborasi, serta budaya akademik yang berkualitas, kami mempersiapkan lulusan yang siap menghadapi tantangan global dan memberikan kontribusi nyata bagi pembangunan masyarakat.</p>
    <p>Website ini kami hadirkan sebagai pusat informasi yang terbuka bagi calon mahasiswa, mahasiswa, alumni, mitra, dan masyarakat luas untuk mengenal lebih dekat perjalanan, prestasi, serta kontribusi Universitas Muhammadiyah PKU dalam bidang pendidikan, penelitian, pengabdian kepada masyarakat, dan kerja sama internasional.</p>
    <p>Bersama UMPKU Surakarta, mari membangun masa depan yang lebih baik melalui pendidikan, inovasi, dan pengabdian.</p>
    <p style="margin-top: 25px;"><strong>Weni Hastuti, M.Kes., Ph.D.</strong><br><span style="color: #6c757d; font-size: 0.9em;">Rektor Universitas Muhammadiyah PKU</span></p>
  `
})

const primaryImage = computed(() => {
  if (props.section?.image) {
    return getImageUrl(props.section.image)
  }
  return '/assets/img/about/about-page-1.jpg'
})

const hasSettings = computed(() => {
  return props.section?.settings && (props.section.settings.experience_year || props.section.settings.highlight_text)
})

const experienceYear = computed(() => props.section?.settings?.experience_year)
const highlightText = computed(() => props.section?.settings?.highlight_text)

const buttonText = computed(() => props.section?.button_text)
const buttonUrl = computed(() => props.section?.button_url)

const isValid = computed(() => {
  if (!props.section) return true // Show fallback if no section passed but used statically
  // Check if all essential data is empty to hide
  if (!props.section.title && !props.section.content && !props.section.image) {
    return false
  }
  return true
})
</script>

<style scoped>
.section-title h6 {
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #3b6580 !important; /* Desaturated blue matching screenshot */
  text-transform: uppercase !important;
  letter-spacing: 0.15em !important;
  margin-bottom: 12px !important;
  font-family: var(--font-body, 'Inter', sans-serif) !important;
}

.section-title h2 {
  font-family: var(--font-heading, 'Inter', sans-serif) !important;
  font-weight: 700 !important;
  color: #0f172a !important; /* Very dark navy/black */
  font-size: clamp(32px, 4vw, 44px) !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em !important;
  margin-top: 0 !important;
  margin-bottom: 24px !important;
}

.about-content-wrapper:deep(p) {
  margin-bottom: 15px;
}
.about-content-wrapper:deep(ul) {
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 15px;
}
.about-content-wrapper:deep(li) {
  margin-bottom: 5px;
}
</style>
