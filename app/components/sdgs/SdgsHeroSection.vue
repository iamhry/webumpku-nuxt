<script setup lang="ts">
import { computed } from 'vue'

const { locale } = useLocale()

const eyebrow = computed(() =>
  locale.value === 'en' ? 'UMPKU for the World' : 'UMPKU untuk Dunia'
)

const title = computed(() => 'ACT NOW')

const subtitle = computed(() =>
  locale.value === 'en' ? 'Every Action Counts' : 'Setiap Aksi Berarti'
)

const description = computed(() =>
  locale.value === 'en'
    ? 'Join the UMPKU community committed to the UN 2030 Agenda. Be part of a movement creating real change through education, research, and community service.'
    : 'Bergabunglah dengan komunitas UMPKU yang berkomitmen pada Agenda 2030 PBB. Jadilah bagian dari gerakan yang menciptakan perubahan nyata melalui pendidikan, penelitian, dan pengabdian masyarakat.'
)

const ctaLabel = computed(() =>
  locale.value === 'en' ? 'Explore 17 Goals' : 'Jelajahi 17 Goals'
)
</script>

<template>
  <section class="sdgs-actnow-hero" aria-labelledby="sdgs-actnow-title">
    <div
      class="sdgs-actnow-bg"
      style="background-image: url('/assets/img/achievement.jpg')"
      aria-hidden="true"
    ></div>
    <div class="sdgs-actnow-overlay" aria-hidden="true"></div>

    <div class="container content-wide sdgs-actnow-inner">
      <div class="sdgs-actnow-content" v-reveal data-reveal="fade-up">
        <span class="sdgs-actnow-eyebrow">{{ eyebrow }}</span>
        <h1 id="sdgs-actnow-title" class="sdgs-actnow-title">{{ title }}</h1>
        <h2 class="sdgs-actnow-subtitle">{{ subtitle }}</h2>
        <p class="sdgs-actnow-desc">
          {{ description }}
          <strong>#ACTNOW</strong>
        </p>

        <div class="sdgs-actnow-actions">
          <NuxtLink to="#explore-sdgs" class="sdgs-actnow-btn">
            {{ ctaLabel }}
            <i class="las la-arrow-right" aria-hidden="true"></i>
          </NuxtLink>
        </div>
      </div>

      <div class="sdgs-actnow-visual" aria-hidden="true" v-reveal data-reveal="fade-left" data-reveal-delay="120">
        <img
          src="/assets/img/E_SDG_logo_UN_emblem_square_trans_WEB-400x343.png"
          alt=""
          class="sdgs-actnow-wheel"
        >
      </div>
    </div>

    <div class="sdgs-actnow-stripe" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.sdgs-actnow-hero {
  position: relative;
  isolation: isolate;
  min-height: min(88vh, 760px);
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #ffffff;
  background: #000000;
}

.sdgs-actnow-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(1.02);
}

.sdgs-actnow-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  /* Matches Act Now’s dark cinematic wash: solid black at the top fading
     into a lighter veil so the photo still reads underneath. */
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.92) 8%, rgba(0, 0, 0, 0.55) 48%, rgba(0, 0, 0, 0.78) 100%),
    linear-gradient(100deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.2) 70%);
}

.sdgs-actnow-inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: center;
  width: 100%;
  padding-top: 140px;
  padding-bottom: 100px;
}

.sdgs-actnow-content {
  max-width: 640px;
}

.sdgs-actnow-eyebrow {
  display: inline-block;
  margin-bottom: 18px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #f5b301;
}

.sdgs-actnow-title {
  margin: 0 0 10px;
  font-size: clamp(56px, 9vw, 104px);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: #ffffff;
}

.sdgs-actnow-subtitle {
  margin: 0 0 22px;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.15;
  font-weight: 700;
  color: #ffffff;
}

.sdgs-actnow-desc {
  margin: 0 0 32px;
  max-width: 540px;
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

.sdgs-actnow-desc strong {
  color: #f5b301;
  font-weight: 700;
}

.sdgs-actnow-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.sdgs-actnow-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: 999px;
  background: #ffffff;
  color: #111111;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
}

.sdgs-actnow-btn i {
  font-size: 16px;
  transition: transform 0.25s ease;
}

.sdgs-actnow-btn:hover {
  background: #f5b301;
  color: #111111;
  transform: translateY(-2px);
}

.sdgs-actnow-btn:hover i {
  transform: translateX(3px);
}

.sdgs-actnow-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sdgs-actnow-wheel {
  width: min(420px, 100%);
  height: auto;
  filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.45));
  animation: sdgs-actnow-float 6s ease-in-out infinite;
}

/* Rainbow SDG color stripe at the bottom — signature of UN SDG campaign pages */
.sdgs-actnow-stripe {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  height: 8px;
  background: linear-gradient(
    90deg,
    #e5243b 0%,
    #dda63a 8%,
    #4c9f38 16%,
    #c5192d 24%,
    #ff3a21 32%,
    #26bde2 40%,
    #fcc30b 48%,
    #a21942 56%,
    #fd6925 64%,
    #dd1367 72%,
    #fd9d24 80%,
    #3f7e44 88%,
    #0a97d9 94%,
    #19486a 100%
  );
}

@keyframes sdgs-actnow-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@media (max-width: 991px) {
  .sdgs-actnow-hero {
    min-height: 0;
  }

  .sdgs-actnow-inner {
    grid-template-columns: 1fr;
    padding-top: 120px;
    padding-bottom: 72px;
    gap: 32px;
  }

  .sdgs-actnow-visual {
    order: -1;
  }

  .sdgs-actnow-wheel {
    width: min(260px, 70%);
  }
}

@media (max-width: 575px) {
  .sdgs-actnow-inner {
    padding-top: 110px;
    padding-bottom: 56px;
  }

  .sdgs-actnow-desc {
    font-size: 16px;
  }

  .sdgs-actnow-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sdgs-actnow-wheel,
  .sdgs-actnow-btn,
  .sdgs-actnow-btn i {
    animation: none;
    transition: none;
  }
}
</style>
