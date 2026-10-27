<template>
  <section
    class="quick-access-section"
    aria-labelledby="quick-access-title"
  >
    <div class="container content-wide">
      <h2
        id="quick-access-title"
        class="quick-access-heading"
        v-reveal
        data-reveal="fade-up"
      >
        {{ heading }}
      </h2>

      <div class="quick-access-grid">
        <NuxtLink
          v-for="(item, index) in items"
          :key="item.id"
          :to="item.url"
          :external="item.url.startsWith('http')"
          :target="item.url.startsWith('http') ? '_blank' : undefined"
          :rel="item.url.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="qa-card"
          :class="`qa-card--${item.variant}`"
          v-reveal
          data-reveal="fade-up"
          :data-reveal-delay="100 + index * 80"
        >
          <span
            class="qa-card-arrow"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>

          <div class="qa-card-copy">
            <h3 class="qa-card-title">{{ item.title }}</h3>
            <p class="qa-card-desc">{{ item.description }}</p>
          </div>

          <div class="qa-card-media">
            <img
              :src="item.image"
              :alt="item.title"
              width="640"
              height="480"
              loading="lazy"
              decoding="async"
            >
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

/**
 * Local seed data — structure mirrors future GET /api/v1/quick-links.
 * Swap this array for API response without changing the template.
 */
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
.quick-access-section {
  --qa-navy: #1b3c6b;
  --qa-navy-deep: #102a4c;
  --qa-navy-mid: #27558b;
  --qa-orange: #f7941d;
  --qa-text: #1a1a1a;
  --qa-muted: rgba(27, 60, 107, 0.72);

  padding: clamp(3.5rem, 6vw, 5.5rem) 0;
  background: #fff;
}

.quick-access-heading {
  margin: 0 0 clamp(1.75rem, 3.5vw, 2.75rem);
  text-align: center;
  font-family: var(--font-heading, sans-serif);
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--qa-navy);
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  max-width: 1320px;
  margin: 0 auto;
}

.qa-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  padding: 28px 28px 0;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 10px 32px rgba(16, 42, 76, 0.07);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.qa-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(16, 42, 76, 0.12);
}

.qa-card:focus-visible {
  outline: 3px solid var(--qa-orange);
  outline-offset: 3px;
}

/* Light cards */
.qa-card--light {
  background: linear-gradient(180deg, #ffffff 35%, #edf4fb 100%);
  color: var(--qa-text);
}

.qa-card--light .qa-card-desc {
  color: var(--qa-muted);
}

.qa-card--light .qa-card-arrow {
  color: var(--qa-navy);
}

/* Dot pattern on campus-style light cards (decorative, non-interactive) */
.qa-card--light::before {
  content: '';
  position: absolute;
  left: 18px;
  bottom: 18px;
  width: 72px;
  height: 56px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
  background-image: radial-gradient(
    circle,
    rgba(27, 60, 107, 0.25) 1.4px,
    transparent 1.6px
  );
  background-size: 10px 10px;
}

/* Primary / navy feature card */
.qa-card--primary {
  background: linear-gradient(
    135deg,
    var(--qa-navy-deep) 0%,
    var(--qa-navy) 55%,
    var(--qa-navy-mid) 100%
  );
  color: #fff;
}

.qa-card--primary::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 88% 18%, rgba(247, 148, 29, 0.18), transparent 42%),
    radial-gradient(circle at 12% 88%, rgba(255, 255, 255, 0.22) 0 1.5px, transparent 1.8px),
    radial-gradient(circle at 18% 80%, rgba(255, 255, 255, 0.16) 0 1.5px, transparent 1.8px),
    radial-gradient(circle at 8% 74%, rgba(255, 255, 255, 0.12) 0 1.5px, transparent 1.8px);
}

.qa-card--primary .qa-card-desc {
  color: rgba(255, 255, 255, 0.88);
}

.qa-card--primary .qa-card-arrow {
  color: #fff;
}

.qa-card-arrow {
  position: absolute;
  top: 28px;
  right: 28px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 30px;
  line-height: 1;
  transition: transform 0.3s ease;
}

.qa-card:hover .qa-card-arrow {
  transform: translate(3px, -3px);
}

.qa-card-copy {
  position: relative;
  z-index: 2;
  max-width: calc(100% - 48px);
  padding-right: 8px;
}

.qa-card-title {
  margin: 0 0 0.55rem;
  font-size: clamp(24px, 2vw, 31px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.qa-card-desc {
  margin: 0;
  max-width: 290px;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
}

.qa-card-media {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 58%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
}

.qa-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
  transition: transform 0.35s ease;
}

.qa-card--primary .qa-card-media img {
  object-fit: cover;
  object-position: center 22%;
  mask-image: linear-gradient(
    180deg,
    transparent 0%,
    #000 18%,
    #000 100%
  );
}

.qa-card--light .qa-card-media img {
  mask-image: linear-gradient(
    180deg,
    transparent 0%,
    #000 22%,
    #000 100%
  );
}

.qa-card:hover .qa-card-media img {
  transform: scale(1.025);
}

@media (max-width: 1199px) {
  .quick-access-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .qa-card:last-child {
    grid-column: 1 / -1;
    max-width: 520px;
    width: 100%;
    justify-self: center;
  }
}

@media (max-width: 767px) {
  .quick-access-section {
    padding: 3rem 0;
  }

  .quick-access-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .qa-card,
  .qa-card:last-child {
    min-height: 340px;
    max-width: none;
    padding: 22px 22px 0;
  }

  .qa-card-title {
    font-size: clamp(23px, 5.5vw, 26px);
  }

  .qa-card-desc {
    font-size: 16px;
  }

  .qa-card-arrow {
    top: 22px;
    right: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .qa-card,
  .qa-card-arrow,
  .qa-card-media img {
    transition: none;
  }

  .qa-card:hover {
    transform: none;
  }

  .qa-card:hover .qa-card-arrow,
  .qa-card:hover .qa-card-media img {
    transform: none;
  }
}
</style>
