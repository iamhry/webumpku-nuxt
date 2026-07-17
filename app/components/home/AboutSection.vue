<template>
  <section
    v-if="isValid"
    class="about-spotlight"
  >
    <div class="about-spotlight-grid" aria-hidden="true" />

    <div class="container content-wide about-spotlight-inner">
      <div class="about-spotlight-panel" v-reveal data-reveal="fade-up">
        <div class="row align-items-center g-4 g-xl-5">
          <!-- Text -->
          <div class="col-lg-6 col-md-12">
            <div class="about-spotlight-copy" v-reveal data-reveal="fade-right" data-reveal-delay="120">
              <p v-if="subtitle" class="about-spotlight-kicker">{{ subtitle }}</p>
              <h2 class="about-spotlight-title" v-html="formattedTitle"></h2>

              <div class="about-spotlight-body about-content-wrapper" v-html="content" />

              <div v-if="hasSettings" class="about-spotlight-stats">
                <div v-if="experienceYear" class="about-spotlight-stat">
                  <span class="stat-num">{{ experienceYear }}</span>
                  <span class="stat-label">{{ locale === 'en' ? 'Year of Success' : 'Tahun Prestasi' }}</span>
                </div>
                <p v-if="highlightText" class="about-spotlight-highlight">{{ highlightText }}</p>
              </div>

              <div
                v-if="ctaUrl && ctaText"
                class="about-spotlight-actions"
                v-reveal
                data-reveal="fade-up"
                data-reveal-delay="220"
              >
                <NuxtLink :to="ctaUrl" class="about-spotlight-btn">
                  <span>{{ ctaText }}</span>
                  <i class="las la-arrow-right" aria-hidden="true" />
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Image -->
          <div class="col-lg-6 col-md-12">
            <div
              class="about-spotlight-media"
              v-reveal
              data-reveal="fade-left"
              data-reveal-delay="180"
            >
              <div class="about-spotlight-media-frame">
                <img :src="primaryImage" :alt="plainTitle" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HomepageSection } from '~/types/homepage'
import { useMedia } from '~/composables/useMedia'

const props = defineProps<{
  section?: HomepageSection
}>()

const { getImageUrl } = useMedia()
const { locale } = useLocale()

const title = computed(() =>
  props.section?.title ||
  (locale.value === 'en'
    ? 'Universitas Muhammadiyah\nPKU Surakarta'
    : 'Universitas Muhammadiyah\nPKU Surakarta')
)

const plainTitle = computed(() =>
  String(title.value || '').replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim()
)

/** Split title into two visual lines like Bappenas awards block */
const formattedTitle = computed(() => {
  const raw = String(title.value || '')
  if (raw.includes('<')) return raw
  const parts = raw.split(/\n/).map(s => s.trim()).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]} <span>${parts.slice(1).join(' ')}</span>`
  }
  const words = raw.trim().split(/\s+/)
  if (words.length <= 2) return raw
  const mid = Math.ceil(words.length / 2)
  return `${words.slice(0, mid).join(' ')} <span>${words.slice(mid).join(' ')}</span>`
})

const subtitle = computed(() =>
  props.section?.subtitle ||
  (locale.value === 'en'
    ? 'Welcome to Universitas Muhammadiyah PKU Surakarta'
    : 'Selamat Datang di Universitas Muhammadiyah PKU Surakarta')
)

const content = computed(() => {
  if (props.section?.content) return props.section.content

  if (locale.value === 'en') {
    return `
      <p>Welcome to Universitas Muhammadiyah PKU Surakarta. We are committed to presenting higher education that is excellent, adaptive, and based on Islamic values. Through innovation, collaboration, and a quality academic culture, we prepare graduates who are ready to face global challenges and make real contributions to community development.</p>
      <p>We present this website as an open information center for prospective students, students, alumni, partners, and the wider community to get to know more closely the journey, achievements, and contributions of Universitas Muhammadiyah PKU in the fields of education, research, community service, and international cooperation.</p>
      <p>Together with UMPKU Surakarta, let's build a better future through education, innovation, and service.</p>
      <p class="about-signoff"><strong>Weni Hastuti, M.Kes., Ph.D.</strong><br><span>Rector of Universitas Muhammadiyah PKU</span></p>
    `
  }

  return `
    <p>Selamat datang di Universitas Muhammadiyah PKU Surakarta. Kami berkomitmen menghadirkan pendidikan tinggi yang unggul, adaptif, dan berlandaskan nilai-nilai Islam. Melalui inovasi, kolaborasi, serta budaya akademik yang berkualitas, kami mempersiapkan lulusan yang siap menghadapi tantangan global dan memberikan kontribusi nyata bagi pembangunan masyarakat.</p>
    <p>Website ini kami hadirkan sebagai pusat informasi yang terbuka bagi calon mahasiswa, mahasiswa, alumni, mitra, dan masyarakat luas untuk mengenal lebih dekat perjalanan, prestasi, serta kontribusi Universitas Muhammadiyah PKU dalam bidang pendidikan, penelitian, pengabdian kepada masyarakat, dan kerja sama internasional.</p>
    <p>Bersama UMPKU Surakarta, mari membangun masa depan yang lebih baik melalui pendidikan, inovasi, dan pengabdian.</p>
    <p class="about-signoff"><strong>Weni Hastuti, M.Kes., Ph.D.</strong><br><span>Rektor Universitas Muhammadiyah PKU</span></p>
  `
})

const primaryImage = computed(() => {
  if (props.section?.image) return getImageUrl(props.section.image)
  return '/assets/img/about/about-page-1.jpg'
})

const hasSettings = computed(() =>
  !!(props.section?.settings && (props.section.settings.experience_year || props.section.settings.highlight_text))
)

const experienceYear = computed(() => props.section?.settings?.experience_year)
const highlightText = computed(() => props.section?.settings?.highlight_text)

const ctaText = computed(() =>
  props.section?.button_text || (locale.value === 'en' ? 'Explore' : 'Jelajahi')
)
const ctaUrl = computed(() => props.section?.button_url || '/profil')

const isValid = computed(() => {
  if (!props.section) return true
  if (!props.section.title && !props.section.content && !props.section.image) return false
  return true
})
</script>

<style scoped>
.about-spotlight {
  position: relative;
  padding: 88px 0;
  color: #1a1a1a;
  overflow: hidden;
  isolation: isolate;

  background-image: url('/assets/img/new_umpku.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: scroll;
}

/* True fixed background — desktop only. `background-attachment: fixed` is
   unreliable on iOS Safari and some mobile/Android browsers, so it's kept
   as `scroll` below 992px (see the max-width: 991px block) instead of being
   forced everywhere. */
@media (min-width: 992px) {
  .about-spotlight {
    background-attachment: fixed;
  }
}

/* Purple overlay via ::before — keep existing overlay, no new layer */
.about-spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    125deg,
    rgba(88, 28, 135, 0.82) 0%,
    rgba(124, 58, 237, 0.72) 42%,
    rgba(76, 29, 149, 0.78) 100%
  );
}

.about-spotlight-grid {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85), transparent 78%);
}

.about-spotlight-inner {
  position: relative;
  z-index: 3;
}

.about-spotlight-panel {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.86) 100%);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 28px;
  padding: 36px 28px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
}

@media (min-width: 992px) {
  .about-spotlight-panel {
    padding: 52px 48px;
  }
}

.about-spotlight-kicker {
  margin: 0 0 12px;
  color: #3b6580;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.about-spotlight-title {
  margin: 0 0 22px;
  color: #0f172a;
  font-size: clamp(30px, 4.2vw, 48px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.about-spotlight-title :deep(span),
.about-spotlight-title :deep(p) {
  display: block;
  margin: 0;
  color: #0b2e59;
}

.about-spotlight-body {
  color: #475569;
  font-size: 16px;
  line-height: 1.75;
}

.about-spotlight-body :deep(p) {
  margin: 0 0 14px;
}

.about-spotlight-body :deep(ul) {
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 14px;
}

.about-spotlight-body :deep(.about-signoff) {
  margin-top: 22px;
  color: #0f172a;
}

.about-spotlight-body :deep(.about-signoff span) {
  color: #6c757d;
  font-size: 0.9em;
}

.about-spotlight-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
  margin-top: 22px;
}

.about-spotlight-stat {
  display: flex;
  flex-direction: column;
  min-width: 110px;
}

.stat-num {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  color: #0b2e59;
}

.stat-label {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.about-spotlight-highlight {
  flex: 1;
  margin: 0;
  min-width: 200px;
  color: #475569;
  font-size: 15px;
  line-height: 1.55;
}

.about-spotlight-actions {
  margin-top: 28px;
}

.about-spotlight-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  border-radius: 999px;
  background: #0b2e59;
  color: #fff !important;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none !important;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 28px rgba(11, 46, 89, 0.28);
}

.about-spotlight-btn:hover {
  background: #f5b301;
  color: #111 !important;
  transform: translateY(-2px);
}

.about-spotlight-btn i {
  font-size: 18px;
  transition: transform 0.2s ease;
}

.about-spotlight-btn:hover i {
  transform: translateX(3px);
}

.about-spotlight-media-frame {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: #eef2f7;
  aspect-ratio: 1 / 1;
  box-shadow: 0 18px 40px rgba(11, 46, 89, 0.18);
}

.about-spotlight-media-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.about-spotlight-media:hover .about-spotlight-media-frame img {
  transform: scale(1.04);
}

@media (max-width: 991px) {
  .about-spotlight {
    padding: 64px 0;
    background-attachment: scroll;
  }

  .about-spotlight-media {
    max-width: 420px;
    margin: 8px auto 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-spotlight-btn,
  .about-spotlight-media-frame img {
    transition: none;
  }
}
</style>
