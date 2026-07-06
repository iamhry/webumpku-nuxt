<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { locale } = useLocale()
</script>

<template>
  <section class="event-hero-section" style="background-image: url('/assets/img/bread-bg.jpg');">
    <div class="event-hero-content container">
      <div class="event-breadcrumb mb-3">
        <NuxtLink to="/">{{ t('home') }}</NuxtLink>
        <span class="separator">/</span>
        <span>{{ t('event_breadcrumb') }}</span>
      </div>
      <h1 class="event-hero-title animate__animated animate__fadeInDown">
        {{ t('event_title') }}
      </h1>
      <p class="event-hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">
        {{ t('event_subtitle') }}
      </p>
    </div>
  </section>
</template>
