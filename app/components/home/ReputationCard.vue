<template>
  <component
    :is="item.url ? NuxtLink : 'div'"
    :to="item.url || undefined"
    :target="item.url ? (item.target || '_self') : undefined"
    class="reputation-card provern-card"
  >
    <div class="reputation-card-inner">
      <div class="reputation-icon-wrapper ico">
        <img v-if="item.image" :src="item.image" :alt="item.title" class="reputation-image" />
        <i v-else :class="['las', `la-${fallbackIcon}`]" class="reputation-icon"></i>
      </div>
      
      <div class="reputation-content relative text-center">
        <h6 class="reputation-title">
          <span v-if="item.value">{{ item.value }} </span>
          {{ item.title }}
        </h6>
        <p class="reputation-desc">{{ item.description }}</p>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'
import type { Reputation } from '~/types/reputation'

const props = defineProps<{
  item: Reputation
}>()

const fallbackIcon = computed(() => {
  if (props.item.icon && props.item.icon !== '') {
    return props.item.icon
  }
  
  const mapping: Record<string, string> = {
    accreditation: 'award',
    ranking: 'chart-bar',
    achievement: 'trophy',
    publication: 'book',
    research: 'flask',
    innovation: 'lightbulb',
    partnership: 'handshake',
    alumni: 'users',
    sdgs: 'globe',
    international: 'globe'
  }
  
  return mapping[props.item.type] || 'star'
})
</script>
