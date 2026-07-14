<script setup lang="ts">
import { useSdgs } from '~/composables/useSdgs'
import { computed, onMounted } from 'vue'

const props = defineProps<{
  sdgs?: any[]
}>()

const { goals, fetchSdgsList } = useSdgs()

onMounted(async () => {
  // If no sdgs passed, fetch the global list from API to show fallback SDGs
  if (!props.sdgs || props.sdgs.length === 0) {
    if (goals.value.length === 0) {
      await fetchSdgsList()
    }
  }
})

// SDG Colors mapping
const sdgColors: Record<number, string> = {
  1: '#e5243b', // No Poverty
  2: '#dda63b', // Zero Hunger
  3: '#4c9f38', // Good Health
  4: '#c5192d', // Quality Education
  5: '#ff3a21', // Gender Equality
  6: '#26bde2', // Clean Water
  7: '#fcc30b', // Affordable Energy
  8: '#a21942', // Decent Work
  9: '#dd1c3b', // Innovation
  10: '#dd5b45', // Reduce Inequalities
  11: '#f3a538', // Sustainable Cities
  12: '#bf8b2e', // Responsible Consumption
  13: '#3f7e44', // Climate Action
  14: '#0a97d9', // Life Below Water
  15: '#56c596', // Life On Land
  16: '#00689d', // Peace Justice
  17: '#e7aa14'  // Partnerships
}

const getSdgColor = (id: number) => sdgColors[id] || '#0b2e59'

const relatedSdgs = computed(() => {
  if (props.sdgs && props.sdgs.length > 0) {
    return props.sdgs
  }
  // Fallback to top 4 goals from global list
  return goals.value.slice(0, 4)
})

// Dummy categories
const categories = [
  { id: 1, name: 'Pendidikan', count: 24 },
  { id: 2, name: 'Penelitian', count: 18 },
  { id: 3, name: 'Pengabdian Masyarakat', count: 15 },
  { id: 4, name: 'Beasiswa', count: 12 },
  { id: 5, name: 'Acara', count: 10 }
]

// Dummy popular tags
const populartags = [
  'UMPKU', 'Pendidikan', 'Penelitian', 'Inovasi', 'Kehidupan Kampus',
  'SDGs', 'Teknologi', 'Workshop', 'Seminar', 'Beasiswa'
]
</script>

<template>
  <aside class="news-sidebar">
    <!-- Widget 1: Latest News (UMS-style layout) -->
    <LatestNewsWidget />

    <!-- Widget: Popular Articles -->
    <PopularArticlesWidget />

    <!-- Widget 2: Kategori -->
    <div class="sidebar-widget">
      <div class="widget-header">
        <h3 class="widget-title">
          <i class="las la-list"></i>
          Kategori
        </h3>
      </div>
      <div class="widget-content">
        <ul v-if="categories.length" class="categories-list">
          <li v-for="category in categories" :key="category.id" class="category-item">
            <a href="#" class="category-link">
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">{{ category.count }}</span>
            </a>
          </li>
        </ul>
        <div v-else class="empty-state">
          Tidak ada kategori
        </div>
      </div>
    </div>

    <!-- Widget 3: SDGs Terkait -->
    <div class="sidebar-widget">
      <div class="widget-header">
        <h3 class="widget-title">
          <i class="las la-medal"></i>
          SDGs Terkait
        </h3>
      </div>
      <div class="widget-content">
        <div v-if="relatedSdgs.length" class="sdgs-sidebar-list">
          <NuxtLink
            v-for="goal in relatedSdgs"
            :key="goal.id"
            :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug}`"
            class="sdg-sidebar-item"
            :style="{ borderColor: getSdgColor(goal.id) }"
          >
            <div class="sdg-sidebar-number" :style="{ backgroundColor: getSdgColor(goal.id) }">
              {{ goal.id }}
            </div>
            <div class="sdg-sidebar-info">
              <span class="sdg-sidebar-label">SDG {{ goal.id }}</span>
              <p class="sdg-sidebar-title">{{ goal.title }}</p>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="empty-state">
          Tidak ada SDGs terkait
        </div>
      </div>
    </div>

    <!-- Widget 4: Tags -->
    <div class="sidebar-widget">
      <div class="widget-header">
        <h3 class="widget-title">
          <i class="las la-tags"></i>
          Tag Populer
        </h3>
      </div>
      <div class="widget-content">
        <div v-if="populartags.length" class="tags-cloud">
          <a v-for="(tag, index) in populartags" :key="index" href="#" class="tag-cloud-item">
            {{ tag }}
          </a>
        </div>
        <div v-else class="empty-state">
          Tidak ada tag populer
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Scoped styles are kept minimal to delegate layout and look and feel to news-ums-style.css */
.news-sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>

