<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SdgTarget } from '~/types/sdgs'

const props = defineProps<{
  targets: SdgTarget[]
  color?: string
}>()

const { t } = useI18n()
const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section v-if="targets?.length" class="sdgs-targets-section">
    <div class="container">
      <div class="sdgs-targets-header">
        <h2 class="section-title">{{ t('sdg_targets') }}</h2>
        <p class="sdgs-targets-subtitle">{{ t('sdg_targets_subtitle') }}</p>
      </div>

      <div class="sdgs-targets-list">
        <div
          v-for="(target, index) in targets"
          :key="target.code"
          class="sdgs-target-item"
          :class="{ open: openIndex === index }"
        >
          <button
            type="button"
            class="sdgs-target-toggle"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <span
              class="sdgs-target-code"
              :style="{ backgroundColor: color || '#0b2e59' }"
            >
              {{ target.code }}
            </span>
            <span class="sdgs-target-title">{{ target.title }}</span>
            <i
              class="fa sdgs-target-chevron"
              :class="openIndex === index ? 'fa-angle-up' : 'fa-angle-down'"
            ></i>
          </button>
          <div v-show="openIndex === index" class="sdgs-target-body">
            <p>{{ target.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
