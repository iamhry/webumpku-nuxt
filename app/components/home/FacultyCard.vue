<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import type { Faculty } from '~/types/faculty'

const props = defineProps<{
  faculty: Faculty
}>()

const { t } = useI18n()

const imageUrl = computed(() => {
  if (props.faculty.banner) return props.faculty.banner
  if (props.faculty.logo) return props.faculty.logo
  return '/assets/img/feature/feat-bg-1.jpg'
})

const description = computed(() => {
  if (props.faculty.description) return props.faculty.description
  return t('faculty_section.fallback_desc', { name: props.faculty.name })
})
</script>

<template>
  <div class="feature-item style-two hover-content faculty-card">
    <div class="image">
      <img :src="imageUrl" :alt="faculty.name">
    </div>

    <div class="content">
      <div class="tags">
        <NuxtLink to="/fakultas">
          {{ t('faculty_section.label') }}
        </NuxtLink>
        <NuxtLink v-if="faculty.short_name" :to="`/fakultas/${faculty.slug}`">
          {{ faculty.short_name }}
        </NuxtLink>
      </div>

      <h3 class="title">
        <NuxtLink :to="`/fakultas/${faculty.slug}`">
          {{ faculty.name }}
        </NuxtLink>
      </h3>

      <div class="inner-content">
        <p>
          {{ description }}
        </p>

        <NuxtLink
          class="details-btn"
          :to="`/fakultas/${faculty.slug}`"
          :aria-label="t('faculty_section.view_detail')"
        >
          <i class="las la-arrow-right"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
