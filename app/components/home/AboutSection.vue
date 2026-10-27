<template>
  <section
    v-if="isValid"
    class="about-spotlight"
  >
    <div class="container content-wide about-spotlight-inner">
      <div class="row align-items-center g-4 g-xl-5">
        <!-- Text -->
        <div class="col-lg-6 col-md-12">
          <div
            class="about-spotlight-copy"
            v-reveal
            data-reveal="fade-up"
          >
            <p
              v-if="kicker"
              class="about-spotlight-kicker"
            >
              {{ kicker }}
            </p>

            <h2
              class="about-spotlight-title"
              v-html="formattedTitle"
            />

            <div
              v-if="experienceYear"
              class="about-spotlight-stat"
            >
              <span class="stat-num">{{ experienceYear }}</span>
              <span class="stat-label">{{ locale === 'en' ? 'Years of excellence' : 'Tahun prestasi' }}</span>
            </div>

            <div
              class="about-spotlight-body about-content-wrapper"
              v-html="content"
            />

            <div
              v-if="ctaUrl && ctaText"
              class="about-spotlight-actions"
            >
              <NuxtLink
                :to="ctaUrl"
                class="about-spotlight-btn"
              >
                <span>{{ ctaText }}</span>
                <i
                  class="las la-arrow-right"
                  aria-hidden="true"
                />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="col-lg-6 col-md-12">
          <div
            class="about-spotlight-media"
            v-reveal
            data-reveal="fade-up"
            data-reveal-delay="120"
          >
            <div class="about-spotlight-media-frame">
              <img
                :src="primaryImage"
                :alt="plainTitle"
                loading="lazy"
              >
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
  'Universitas Muhammadiyah\nPKU Surakarta'
)

const plainTitle = computed(() =>
  String(title.value || '').replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim()
)

/** Two-line title when CMS uses a line break; otherwise keep as-is. */
const formattedTitle = computed(() => {
  const raw = String(title.value || '')
  if (raw.includes('<')) return raw
  const parts = raw.split(/\n/).map(s => s.trim()).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]} <span>${parts.slice(1).join(' ')}</span>`
  }
  return raw
})

/** Short institutional kicker — not a long welcome sentence. */
const kicker = computed(() => {
  if (props.section?.subtitle) return props.section.subtitle
  return locale.value === 'en' ? 'About UMPKU' : 'Tentang UMPKU'
})

const content = computed(() => {
  if (props.section?.content) return props.section.content

  if (locale.value === 'en') {
    return `
      <p>Universitas Muhammadiyah PKU Surakarta delivers higher education that is excellent, adaptive, and grounded in Islamic values—preparing graduates who contribute to society through education, research, and service.</p>
      <p class="about-signoff"><strong>Weni Hastuti, M.Kes., Ph.D.</strong><br><span>Rector of Universitas Muhammadiyah PKU</span></p>
    `
  }

  return `
    <p>Universitas Muhammadiyah PKU Surakarta menghadirkan pendidikan tinggi yang unggul, adaptif, dan berlandaskan nilai-nilai Islam—menyiapkan lulusan yang berkontribusi bagi masyarakat melalui pendidikan, penelitian, dan pengabdian.</p>
    <p class="about-signoff"><strong>Weni Hastuti, M.Kes., Ph.D.</strong><br><span>Rektor Universitas Muhammadiyah PKU</span></p>
  `
})

const primaryImage = computed(() => {
  if (props.section?.image) return getImageUrl(props.section.image)
  return '/assets/img/about/about-page-1.jpg'
})

const experienceYear = computed(() => props.section?.settings?.experience_year)

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
  padding: 96px 0;
  color: #fff;
  overflow: hidden;
  isolation: isolate;
  background-image: url('/assets/img/new_umpku.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: scroll;
}

@media (min-width: 992px) {
  .about-spotlight {
    background-attachment: fixed;
  }
}

/* Navy wash — brand, not purple */
.about-spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    115deg,
    rgba(7, 27, 58, 0.92) 0%,
    rgba(7, 27, 58, 0.78) 48%,
    rgba(7, 27, 58, 0.55) 100%
  );
}

.about-spotlight-inner {
  position: relative;
  z-index: 2;
}

.about-spotlight-kicker {
  margin: 0 0 14px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.about-spotlight-title {
  margin: 0 0 1.25rem;
  color: #fff;
  font-size: clamp(1.85rem, 3.6vw, 2.75rem);
  font-weight: 750;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-transform: none;
}

.about-spotlight-title :deep(span),
.about-spotlight-title :deep(p) {
  display: block;
  margin: 0;
  color: #fff;
}

.about-spotlight-stat {
  display: inline-flex;
  flex-direction: column;
  margin: 0 0 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-num {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  color: var(--brand-accent, #ea5501);
}

.stat-label {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}

.about-spotlight-body {
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 36rem;
}

.about-spotlight-body :deep(p) {
  margin: 0 0 0.9rem;
}

.about-spotlight-body :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  margin-bottom: 0.9rem;
}

.about-spotlight-body :deep(.about-signoff) {
  margin-top: 1.5rem;
  color: #fff;
}

.about-spotlight-body :deep(.about-signoff strong) {
  font-weight: 700;
}

.about-spotlight-body :deep(.about-signoff span) {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.9em;
}

.about-spotlight-actions {
  margin-top: 1.75rem;
}

/* Visual system from buttons.css (.about-spotlight-btn) — keep local hover polish */
.about-spotlight-btn i {
  font-size: 1.1em;
  transition: transform 0.25s ease;
}

.about-spotlight-btn:hover i {
  transform: translateX(3px);
}

.about-spotlight-media-frame {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  aspect-ratio: 4 / 5;
  border-radius: 2px;
}

.about-spotlight-media-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.about-spotlight-media:hover .about-spotlight-media-frame img {
  transform: scale(1.03);
}

@media (max-width: 991px) {
  .about-spotlight {
    padding: 64px 0;
    background-attachment: scroll;
  }

  .about-spotlight-media {
    max-width: 420px;
    margin: 0.5rem auto 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-spotlight-btn i,
  .about-spotlight-media-frame img {
    transition: none;
  }
}
</style>
