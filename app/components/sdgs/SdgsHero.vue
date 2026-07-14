<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SdgDetailView } from '~/types/sdgs'

const props = defineProps<{
  sdg: SdgDetailView
}>()

const { t } = useI18n()

/** Title split into 1–2 lines like Bappenas (e.g. TANPA / KEMISKINAN) */
const titleLines = computed(() => {
  const words = props.sdg.name.toUpperCase().split(/\s+/).filter(Boolean)
  if (words.length <= 1) return words
  if (words.length === 2) return words
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
})

const scrollToContent = () => {
  if (typeof document === 'undefined') return
  const el = document.getElementById('sdgs-content')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section
    class="sdgs-hero-bappenas"
    :style="{ backgroundColor: sdg.color || '#E5243B' }"
  >
    <div class="sdgs-hero-bappenas-inner">
      <!-- Row: giant number + title -->
      <div class="sdgs-hero-headline">
        <span class="sdgs-hero-goal-number" aria-hidden="true">
          {{ sdg.goal_number }}
        </span>
        <h1 class="sdgs-hero-goal-title">
          <span
            v-for="(line, i) in titleLines"
            :key="i"
            class="sdgs-hero-title-line"
          >{{ line }}</span>
        </h1>
      </div>

      <!-- Tagline + Pelajari -->
      <div class="sdgs-hero-footer">
        <h3 v-if="sdg.tagline" class="sdgs-hero-tagline">{{ sdg.tagline }}</h3>
        <button
          type="button"
          class="sdgs-hero-learn"
          @click="scrollToContent"
        >
          <span class="sdgs-hero-learn-icon" aria-hidden="true">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-143.6-28.9L288 302.6V120c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24v182.6l-72.4-75.5c-9.3-9.7-24.8-9.9-34.3-.4l-10.9 11c-9.4 9.4-9.4 24.6 0 33.9L239 404.3c9.4 9.4 24.6 9.4 33.9 0l132.7-132.7c9.4-9.4 9.4-24.6 0-33.9l-10.9-11c-9.5-9.5-25-9.3-34.3.4z" />
            </svg>
          </span>
          <span>{{ t('sdg_learn_more') }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
