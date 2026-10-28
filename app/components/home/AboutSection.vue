<template>
  <section
    v-if="isValid"
    class="about-spotlight"
  >
    <div class="container about-spotlight-inner">
      <div class="row align-items-center g-4 g-lg-5">
        <!-- Kolom Teks -->
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

        <!-- Kolom Gambar -->
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
                decoding="async"
                width="700"
                height="600"
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
  padding: 56px 60px;
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

/* Overlay gradient seimbang agar teks kontras dan background kanan tetap hidup */
.about-spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(6, 23, 49, 0.96) 0%,
    rgba(6, 23, 49, 0.88) 45%,
    rgba(6, 23, 49, 0.55) 75%,
    rgba(6, 23, 49, 0.35) 100%
  );
}

.about-spotlight-inner {
  position: relative;
  z-index: 2;
}

/* Kicker / Subtitle Atas */
.about-spotlight-kicker {
  margin: 0 0 10px;
  color: #ea5501;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Judul Utama */
.about-spotlight-title {
  margin: 0 0 1.5rem;
  color: #fff;
  font-size: clamp(2rem, 3.2vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.about-spotlight-title :deep(span),
.about-spotlight-title :deep(p) {
  display: block;
  margin: 0;
  color: #fff;
}

/* Badge Tahun Prestasi */
.about-spotlight-stat {
  display: inline-flex;
  flex-direction: column;
  margin: 0 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
}

.stat-num {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1;
  color: var(--brand-accent, #ea5501);
}

.stat-label {
  margin-top: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Paragraf / Konten Utama */
.about-spotlight-body {
  color: #f8fafc;
  font-size: clamp(0.95rem, 1.05vw, 1.0625rem);
  line-height: 1.75;
  max-width: 38rem;
  text-rendering: optimizeLegibility;
}

.about-spotlight-body :deep(p),
.about-spotlight-body :deep(span),
.about-spotlight-body :deep(li),
.about-spotlight-body :deep(div) {
  color: #f1f5f9;
  margin: 0 0 1rem;
}

.about-spotlight-body :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.about-spotlight-body :deep(.about-signoff) {
  margin-top: 1.75rem;
  color: #fff;
  border-left: 3px solid #ea5501;
  padding-left: 1rem;
}

.about-spotlight-body :deep(.about-signoff strong) {
  font-weight: 700;
  color: #fff;
  display: block;
}

.about-spotlight-body :deep(.about-signoff span) {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.875rem;
}

/* Button CTA */
.about-spotlight-actions {
  margin-top: 2rem;
}

.about-spotlight-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background-color: var(--brand-accent, #ea5501);
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.about-spotlight-btn:hover {
  background-color: #d04900;
  color: #fff;
  transform: translateY(-2px);
}

.about-spotlight-btn i {
  font-size: 1.1em;
  transition: transform 0.25s ease;
}

.about-spotlight-btn:hover i {
  transform: translateX(4px);
}

/* Media Kolom Gambar: Alami & Bottom Aligned */
.about-spotlight-media {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
}

.about-spotlight-media-frame {
  position: relative;
  width: 100%;
  max-width: 540px;
  /* Hilangkan aspek rasio kaku & background kotak */
  background: transparent;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.about-spotlight-media-frame img {
  width: 100%;
  max-height: 520px;
  height: auto;
  object-fit: contain;
  object-position: bottom center;
  display: block;
  /* Drop shadow halus agar figur mahasiswa kontras dengan background gelap */
  filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.45));
  transition: transform 0.4s ease;
}

.about-spotlight-media:hover .about-spotlight-media-frame img {
  transform: scale(1.02);
}

/* Responsive Breakpoints */
@media (max-width: 991px) {
  .about-spotlight {
    padding: 56px 0;
    background-attachment: scroll;
  }

  .about-spotlight::before {
    background: linear-gradient(
      180deg,
      rgba(6, 23, 49, 0.95) 0%,
      rgba(6, 23, 49, 0.88) 100%
    );
  }

  .about-spotlight-body {
    max-width: 100%;
  }

  .about-spotlight-media {
    margin-top: 1.5rem;
  }

  .about-spotlight-media-frame {
    max-width: 440px;
  }

  .about-spotlight-media-frame img {
    max-height: 400px;
  }
}

@media (max-width: 575px) {
  .about-spotlight-title {
    font-size: 1.85rem;
  }

  .about-spotlight-body {
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .about-spotlight-media-frame img {
    max-height: 320px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-spotlight-btn,
  .about-spotlight-btn i,
  .about-spotlight-media-frame img {
    transition: none;
    transform: none !important;
  }
}
</style>