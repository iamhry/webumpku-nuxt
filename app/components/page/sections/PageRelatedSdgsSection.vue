<template>
  <div class="page-related-sdgs-section">
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <div v-if="displayItems.length" class="page-sdgs-grid">
      <NuxtLink
        v-for="item in displayItems"
        :key="item.id"
        :to="item.url || '/tujuan-pembangunan-berkelanjutan'"
        class="page-sdg-badge"
        :style="getSdgStyle(item)"
        :title="item.title"
      >
        <img
          v-if="item.image"
          :src="getImageUrl(item.image)"
          :alt="item.title || 'SDG'"
          class="page-sdg-badge-img"
          loading="lazy"
        >
        <div v-else class="page-sdg-badge-inner">
          <span class="page-sdg-number">{{ item.subtitle || getSdgNumber(item.title) }}</span>
          <span class="page-sdg-label">{{ item.title }}</span>
        </div>
      </NuxtLink>
    </div>

    <PageSectionEmpty
      v-else
      message="SDG terkait akan ditampilkan di sini."
      icon="las la-globe"
      :preview="preview"
    />

    <div
      v-if="section.content"
      class="page-sdgs-content page-prose dynamic-page-reading mx-auto mt-5"
      v-html="section.content"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMedia } from '~/composables/useMedia'
import { sdgsService } from '~/services/sdgs'
import type { PageSection, PageSectionItem } from '~/types/page'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const { getImageUrl } = useMedia()
const { locale } = useLocale()
const kicker = computed(() => props.section.settings?.kicker || '')
const limit = computed(() => Number(props.section.settings?.limit) || 6)

const cmsItems = computed(() => props.section.items || [])

const { data: fetchedSdgs } = await useAsyncData(
  () => `page-related-sdgs-${props.section.id}-${locale.value}-${limit.value}`,
  async () => {
    if (cmsItems.value.length > 0) return []
    const res = await sdgsService.getSdgs(1)
    const list = res?.data || []
    return Array.isArray(list) ? list : []
  },
  { watch: [locale, () => props.section.id] }
)

const displayItems = computed<PageSectionItem[]>(() => {
  if (cmsItems.value.length) return cmsItems.value

  return (fetchedSdgs.value || []).slice(0, limit.value).map((goal: any) => {
    const g = goal.attributes || goal
    const num = g.goal_number || g.number || g.id
    const slug = g.slug || num

    return {
      id: goal.id || g.id || num,
      title: g.name || g.title || `SDG ${num}`,
      subtitle: String(num),
      image: g.icon || g.icon_image || g.image || '',
      url: `/tujuan-pembangunan-berkelanjutan/${slug}`,
      sort_order: Number(num) || 0,
      settings: { color: g.color },
    }
  })
})

const SDG_COLORS: Record<number, string> = {
  1: '#E5243B', 2: '#DDA63A', 3: '#4C9F38', 4: '#C5192D',
  5: '#FF3A21', 6: '#26BDE2', 7: '#FCC30B', 8: '#A21942',
  9: '#FD6925', 10: '#DD1367', 11: '#FD9D24', 12: '#BF8B2E',
  13: '#3F7E44', 14: '#0A97D9', 15: '#56C02B', 16: '#00689D',
  17: '#19486A',
}

const getSdgNumber = (title?: string): string => {
  if (!title) return '?'
  const match = title.match(/\d+/)
  return match ? match[0] : title.charAt(0)
}

const getSdgStyle = (item: PageSectionItem) => {
  const num = parseInt(item.subtitle || getSdgNumber(item.title) || '0')
  const color = (item.settings as any)?.color || SDG_COLORS[num] || '#0a192f'
  return { backgroundColor: color }
}
</script>
