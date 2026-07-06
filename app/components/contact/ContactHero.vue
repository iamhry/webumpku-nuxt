<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="contact-hero">
    <div class="contact-hero__overlay"></div>
    <div class="contact-hero__content container">
      <div class="contact-hero__badge">
        <span class="contact-hero__badge-dot"></span>
        <span>{{ $t('contact.hero.badge', 'Hubungi Kami') }}</span>
      </div>
      <h1 class="contact-hero__title">
        {{ $t('contact.hero.title', 'Informasi Kontak') }}
        <span class="contact-hero__title-accent">&amp; Lokasi Kampus</span>
      </h1>
      <p class="contact-hero__subtitle">
        {{ $t('contact.hero.subtitle', 'Temukan informasi lengkap lokasi kampus dan layanan kontak Universitas Muhammadiyah PKU.') }}
      </p>

      <!-- Breadcrumb -->
      <nav class="contact-breadcrumb" aria-label="breadcrumb">
        <ol>
          <li>
            <NuxtLink :to="$localePath('/')">
              {{ $t('common.home', 'Beranda') }}
            </NuxtLink>
          </li>
          <li class="contact-breadcrumb__separator">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2L8 6L4 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </li>
          <li class="contact-breadcrumb__active" aria-current="page">
            {{ $t('contact.hero.title', 'Kontak') }}
          </li>
        </ol>
      </nav>
    </div>

    <!-- Decorative shape -->
    <div class="contact-hero__shape"></div>
  </section>
</template>
