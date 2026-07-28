<template>
  <section 
    :class="wrapperClasses" 
    :style="wrapperStyles" 
    v-reveal
    :data-reveal="animation" 
    :data-reveal-delay="delay"
  >
    <div :class="containerClass">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'
import { normalizeSectionSettings } from '~/composables/useSectionSettings'

const props = defineProps<{
  section: PageSection
}>()

const settings = computed(() => normalizeSectionSettings(props.section.settings))

const wrapperClasses = computed(() => {
  return [
    'dynamic-page-section',
    `page-bg-${settings.value.background}`,
    `page-pt-${settings.value.padding_top}`,
    `page-pb-${settings.value.padding_bottom}`,
    settings.value.variant !== 'default' ? `page-variant-${settings.value.variant}` : '',
    settings.value.pattern !== 'none' ? `page-pattern-${settings.value.pattern}` : '',
    // Add lightweight CSS animation if project doesn't fully rely on AOS
    settings.value.animation !== 'none' ? `page-animate-${settings.value.animation}` : ''
  ].filter(Boolean)
})

const wrapperStyles = computed(() => {
  // Can be extended if shape dividers or custom images are applied inline
  return {}
})

const containerClass = computed(() => {
  if (settings.value.full_width) return 'layout-full'
  return `layout-${settings.value.container}`
})

const animation = computed(() => settings.value.animation !== 'none' ? settings.value.animation : null)
const delay = computed(() => settings.value.delay > 0 ? settings.value.delay : null)
</script>
