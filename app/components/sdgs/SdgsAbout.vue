<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  title: string
  description: string
  color?: string
}>()

const { t } = useI18n()
</script>

<template>
  <section class="sdgs-about-section">
    <div class="container">
      <div class="sdgs-about-card">
        <span class="sdgs-about-eyebrow" :style="{ color: color || '#0b2e59' }">
          {{ t('about_this_goal') }}
        </span>
        <h2 class="sdgs-about-title">{{ title }}</h2>
        <p class="sdgs-about-body">{{ description }}</p>
      </div>
    </div>
  </section>
</template>
