<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useLocalePath } from '#imports'
import type { Faculty } from '~/types/faculty'

const props = defineProps<{
  faculty: Faculty
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const imageUrl = computed(() => {
  if (props.faculty.banner) return props.faculty.banner
  if (props.faculty.logo) return props.faculty.logo
  return '/assets/img/feature/feat-bg-1.jpg'
})

const description = computed(() => {
  if (props.faculty.description) return props.faculty.description
  return t('faculty_section.fallback_desc', { name: props.faculty.name })
})

const badgeLabel = computed(() =>
  props.faculty.short_name || t('faculty_section.label')
)

const detailTo = computed(() => localePath(`/fakultas/${props.faculty.slug}`))
</script>

<template>
  <article class="faculty-hl-card">
    <NuxtLink :to="detailTo" class="faculty-hl-card-media">
      <img :src="imageUrl" :alt="faculty.name" loading="lazy">
      <span class="faculty-hl-card-badge">{{ badgeLabel }}</span>
    </NuxtLink>

    <div class="faculty-hl-card-body">
      <p v-if="faculty.short_name" class="faculty-hl-card-meta">
        {{ faculty.short_name }}
      </p>

      <h3 class="faculty-hl-card-title">
        <NuxtLink :to="detailTo">{{ faculty.name }}</NuxtLink>
      </h3>

      <p class="faculty-hl-card-excerpt">{{ description }}</p>
    </div>
  </article>
</template>
