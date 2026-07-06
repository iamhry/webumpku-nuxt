<script setup lang="ts">
import type { NewsArticle } from '~/types/news'

defineProps<{ article: NewsArticle }>()

// Format date with time
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

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
</script>

<template>
  <div class="news-meta-section">
    <ul class="meta-horizontal">
      <!-- Publish Date -->
      <li class="meta-item-horiz">
        <i class="las la-calendar-alt"></i>
        <span><strong>Dipublikasikan:</strong> {{ formatDate(article.published_at) }}</span>
      </li>

      <!-- Divider -->
      <li class="meta-item-divider">|</li>

      <!-- Category -->
      <li class="meta-item-horiz">
        <i class="las la-folder-open"></i>
        <span><strong>Kategori:</strong> {{ article.category || 'Berita' }}</span>
      </li>

      <!-- Divider -->
      <li class="meta-item-divider">|</li>

      <!-- Author -->
      <li class="meta-item-horiz">
        <i class="las la-user-circle"></i>
        <span><strong>Oleh:</strong> {{ article.author || 'Universitas UMPKU' }}</span>
      </li>

      <!-- Divider (only if SDGs exist) -->
      <template v-if="article.sdgs && article.sdgs.length">
        <li class="meta-item-divider">|</li>

        <!-- SDGs Related badges -->
        <li class="meta-item-horiz">
          <i class="las la-medal"></i>
          <span><strong>SDGs:</strong></span>
          <div class="meta-sdgs-badges">
            <NuxtLink
              v-for="goal in article.sdgs"
              :key="goal.id"
              :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`"
              class="meta-sdg-badge-inline"
              :style="{ backgroundColor: getSdgColor(goal.id) }"
              :title="`SDG ${goal.id}: ${goal.title}`"
            >
              {{ goal.id }}
            </NuxtLink>
          </div>
        </li>
      </template>

      <!-- Divider (only if views exist) -->
      <template v-if="article.views !== undefined">
        <li class="meta-item-divider">|</li>
        
        <!-- Views -->
        <li class="meta-item-horiz">
          <i class="las la-eye"></i>
          <span><strong>Dibaca:</strong> {{ article.views }} kali</span>
        </li>
      </template>
    </ul>

    <!-- Tags Section -->
    <div v-if="article.tags && article.tags.length" class="meta-tags-row mt-3">
      <span class="tag-label">
        <i class="las la-tags"></i>
        Tags:
      </span>
      <div class="tags-list">
        <span v-for="(tag, index) in article.tags" :key="index" class="tag-item">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-meta-section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

/* Tags Section (underlying default styling fallback) */
.meta-tags-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}

.tag-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.tag-label i {
  color: #0b2e59;
  font-size: 1.1rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  display: inline-block;
  background-color: #f3f4f6;
  color: #0b2e59;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tag-item:hover {
  background-color: #0b2e59;
  color: #ffffff;
  border-color: #0b2e59;
}
</style>


