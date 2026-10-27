<template>
  <section class="journey-section">
    <div class="container content-wide">
      <h2
        class="journey-heading"
        v-reveal
        data-reveal="fade-up"
      >
        {{ heading }}
      </h2>

      <div class="journey-grid">
        <template
          v-for="(card, index) in cards"
          :key="card.id"
        >
          <a
            v-if="card.external"
            :href="card.to"
            target="_blank"
            rel="noopener noreferrer"
            class="journey-card"
            :class="[
              `journey-card--${card.variant}`,
              { 'journey-card--full-bg': card.fullBg },
            ]"
            v-reveal
            data-reveal="fade-up"
            :data-reveal-delay="100 + index * 80"
          >
            <img
              v-if="card.fullBg"
              class="journey-card-bg"
              :src="card.image"
              alt=""
              aria-hidden="true"
              loading="lazy"
            >
            <span class="journey-card-arrow" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
            <div class="journey-card-copy">
              <h3 class="journey-card-title">{{ card.title }}</h3>
              <p class="journey-card-desc">{{ card.description }}</p>
            </div>
            <div
              v-if="!card.fullBg"
              class="journey-card-visual"
            >
              <img
                :src="card.image"
                :alt="card.title"
                loading="lazy"
              >
            </div>
          </a>

          <NuxtLink
            v-else
            :to="card.to"
            class="journey-card"
            :class="[
              `journey-card--${card.variant}`,
              { 'journey-card--full-bg': card.fullBg },
            ]"
            v-reveal
            data-reveal="fade-up"
            :data-reveal-delay="100 + index * 80"
          >
            <img
              v-if="card.fullBg"
              class="journey-card-bg"
              :src="card.image"
              alt=""
              aria-hidden="true"
              loading="lazy"
            >
            <span class="journey-card-arrow" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
            <div class="journey-card-copy">
              <h3 class="journey-card-title">{{ card.title }}</h3>
              <p class="journey-card-desc">{{ card.description }}</p>
            </div>
            <div
              v-if="!card.fullBg"
              class="journey-card-visual"
            >
              <img
                :src="card.image"
                :alt="card.title"
                loading="lazy"
              >
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { locale } = useLocale()

type JourneyCard = {
  id: string
  title: string
  description: string
  to: string
  external: boolean
  image: string
  variant: 'soft' | 'accent' | 'light'
  fullBg?: boolean
}

const ADMISSION_IMAGE = '/assets/img/journey-admission.webp'
const SCHOLARSHIP_IMAGE = '/assets/img/journey-scholarship.webp'

const heading = computed(() =>
  locale.value === 'en'
    ? 'Start your UMPKU journey'
    : 'Mulai perjalanan UMPKU Anda'
)

const cards = computed<JourneyCard[]>(() => {
  if (locale.value === 'en') {
    return [
      {
        id: 'apply',
        title: 'Student Admission',
        description: 'Apply online for undergraduate programs',
        to: 'https://pmb.umpku.ac.id',
        external: true,
        image: ADMISSION_IMAGE,
        variant: 'soft',
        fullBg: true,
      },
      {
        id: 'scholarship',
        title: 'Scholarships',
        description: 'Explore funding and support options',
        to: '/beasiswa',
        external: false,
        image: SCHOLARSHIP_IMAGE,
        variant: 'accent',
        fullBg: true,
      },
      {
        id: 'contact',
        title: 'Contact Us',
        description: 'Reach academic and admission support',
        to: '/kontak',
        external: false,
        image: '/assets/img/new_umpku.jpg',
        variant: 'light',
      },
    ]
  }

  return [
    {
      id: 'apply',
      title: 'Pendaftaran Mahasiswa',
      description: 'Daftar online program sarjana UMPKU',
      to: 'https://pmb.umpku.ac.id',
      external: true,
      image: ADMISSION_IMAGE,
      variant: 'soft',
      fullBg: true,
    },
    {
      id: 'scholarship',
      title: 'Beasiswa',
      description: 'Temukan peluang bantuan biaya studi',
      to: '/beasiswa',
      external: false,
      image: SCHOLARSHIP_IMAGE,
      variant: 'accent',
      fullBg: true,
    },
    {
      id: 'contact',
      title: 'Hubungi Kami',
      description: 'Bantuan akademik dan informasi admisi',
      to: '/kontak',
      external: false,
      image: '/assets/img/new_umpku.jpg',
      variant: 'light',
    },
  ]
})
</script>

<style scoped>
.journey-section {
  padding: clamp(3.5rem, 6vw, 5rem) 0;
  background: #fff;
}

.journey-heading {
  margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
  text-align: center;
  font-family: var(--font-heading, sans-serif);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--brand-navy, #071b3a);
}

.journey-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.journey-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 1.35rem 1.35rem 0;
  border-radius: 18px;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(7, 27, 58, 0.06);
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.journey-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 36px rgba(7, 27, 58, 0.1);
}

.journey-card--soft {
  background:
    radial-gradient(circle at 12% 88%, rgba(234, 85, 1, 0.12) 0 2px, transparent 2.5px),
    radial-gradient(circle at 18% 80%, rgba(234, 85, 1, 0.1) 0 2px, transparent 2.5px),
    radial-gradient(circle at 8% 74%, rgba(234, 85, 1, 0.08) 0 2px, transparent 2.5px),
    linear-gradient(180deg, #fff7f0 0%, #ffe8d6 100%);
  color: var(--brand-navy, #071b3a);
}

.journey-card--soft .journey-card-desc {
  color: rgba(7, 27, 58, 0.65);
}

.journey-card--soft .journey-card-arrow {
  color: var(--brand-navy, #071b3a);
  background: rgba(7, 27, 58, 0.06);
}

.journey-card--accent {
  background:
    radial-gradient(circle at 14% 86%, rgba(255, 255, 255, 0.28) 0 2px, transparent 2.5px),
    radial-gradient(circle at 20% 78%, rgba(255, 255, 255, 0.22) 0 2px, transparent 2.5px),
    linear-gradient(165deg, var(--brand-accent, #ea5501) 0%, #c74401 100%);
  color: #fff;
}

.journey-card--accent .journey-card-desc {
  color: rgba(255, 255, 255, 0.88);
}

.journey-card--accent .journey-card-arrow {
  color: #fff;
  background: rgba(255, 255, 255, 0.35);
}

/* Full-bleed photo — white fade from top so dark text stays readable */
.journey-card--full-bg {
  padding: 1.35rem;
  background: #f5f5f5;
  color: var(--brand-navy, #071b3a);
  justify-content: flex-start;
}

.journey-card--full-bg .journey-card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  z-index: 0;
  transition: transform 0.55s ease;
}

.journey-card--full-bg.journey-card--soft .journey-card-bg {
  object-position: center 35%;
}

.journey-card--full-bg.journey-card--accent .journey-card-bg {
  object-position: center 22%;
}

.journey-card--full-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #ffffff 28%,
    rgba(255, 255, 255, 0.92) 38%,
    rgba(255, 255, 255, 0.45) 52%,
    rgba(255, 255, 255, 0) 68%
  );
}

.journey-card--full-bg:hover .journey-card-bg {
  transform: scale(1.06);
}

.journey-card--full-bg .journey-card-copy,
.journey-card--full-bg .journey-card-arrow {
  position: relative;
  z-index: 2;
}

.journey-card--full-bg .journey-card-copy {
  max-width: 88%;
  padding-right: 2.5rem;
}

.journey-card--full-bg .journey-card-title {
  color: var(--brand-navy, #071b3a);
}

.journey-card--full-bg .journey-card-desc {
  color: rgba(7, 27, 58, 0.68);
}

.journey-card--full-bg .journey-card-arrow {
  color: var(--brand-navy, #071b3a);
  background: rgba(7, 27, 58, 0.06);
  backdrop-filter: none;
}

/* Soft full-bg: slight warm tint in the white fade */
.journey-card--full-bg.journey-card--soft::after {
  background: linear-gradient(
    180deg,
    #fff7f0 0%,
    #fff7f0 26%,
    rgba(255, 247, 240, 0.94) 36%,
    rgba(255, 232, 214, 0.5) 50%,
    rgba(255, 255, 255, 0) 66%
  );
}

.journey-card--light {
  background:
    radial-gradient(circle at 12% 88%, rgba(7, 27, 58, 0.12) 0 2px, transparent 2.5px),
    radial-gradient(circle at 18% 80%, rgba(7, 27, 58, 0.1) 0 2px, transparent 2.5px),
    #fff;
  color: var(--brand-navy, #071b3a);
  border: 1px solid rgba(7, 27, 58, 0.06);
}

.journey-card--light .journey-card-desc {
  color: rgba(7, 27, 58, 0.62);
}

.journey-card--light .journey-card-arrow {
  color: var(--brand-navy, #071b3a);
  background: rgba(7, 27, 58, 0.06);
}

.journey-card-arrow {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  transition: transform 0.25s ease;
  z-index: 2;
}

.journey-card:hover .journey-card-arrow {
  transform: translate(2px, -2px);
}

.journey-card-copy {
  position: relative;
  z-index: 2;
  max-width: 78%;
  padding-right: 2rem;
}

.journey-card-title {
  margin: 0 0 0.45rem;
  font-size: clamp(1.15rem, 1.5vw, 1.35rem);
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.journey-card-desc {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  font-weight: 500;
}

.journey-card-visual {
  position: relative;
  z-index: 1;
  margin-top: auto;
  margin-left: auto;
  width: min(72%, 220px);
  aspect-ratio: 1 / 1;
  border-radius: 14px 14px 0 0;
  overflow: hidden;
  transform: translateY(10px);
}

.journey-card-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}

.journey-card:hover .journey-card-visual img {
  transform: scale(1.05);
}

@media (max-width: 991px) {
  .journey-grid {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin: 0 auto;
  }

  .journey-card {
    min-height: 260px;
  }

  .journey-card--full-bg {
    min-height: 300px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .journey-card,
  .journey-card-arrow,
  .journey-card-visual img,
  .journey-card-bg {
    transition: none;
  }

  .journey-card:hover {
    transform: none;
  }
}
</style>
