<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  careerProspects?: string | string[]
}>()

const isHtml = computed(() => {
  if (typeof props.careerProspects !== 'string') return false
  return /<[a-z][\s\S]*>/i.test(props.careerProspects)
})

const prospectsList = computed(() => {
  if (!props.careerProspects) return []
  if (Array.isArray(props.careerProspects)) return props.careerProspects
  // If it's a string split by newlines or commas
  if (typeof props.careerProspects === 'string' && !isHtml.value) {
    return props.careerProspects
      .split(/\r?\n|,/)
      .map(item => item.trim().replace(/^-\s*/, ''))
      .filter(item => item.length > 0)
  }
  return []
})
</script>

<template>
  <section class="program-career-area" v-if="careerProspects">
    <div class="container study-program-container reading-section">
      <h3>Prospek Karier Lulusan</h3>
      
      <!-- If HTML content -->
      <div v-if="isHtml" v-html="careerProspects" class="career-html-content mt-4"></div>
      
      <!-- If text/list content -->
      <ul v-else-if="prospectsList.length > 0" class="career-list">
        <li v-for="(prospect, index) in prospectsList" :key="index">
          {{ prospect }}
        </li>
      </ul>
    </div>
  </section>
</template>
