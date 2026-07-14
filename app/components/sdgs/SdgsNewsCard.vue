<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NewsArticle } from '~/types/news'
import SdgsModal from '~/components/sdgs/SdgsModal.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps<{ article: NewsArticle }>()

const isModalOpen = ref(false)
const selectedSdgs = ref<any[]>([])

const openSdgsModal = (sdgs: any[]) => {
  selectedSdgs.value = sdgs
  isModalOpen.value = true
}

const sdgsBulletUrl = '/assets/img/sdgs.png'

const categoryLabel = computed(() => {
  const cat = props.article.category as any
  if (!cat) return 'NEWS'
  if (typeof cat === 'string') return cat.toUpperCase()
  return String(cat.name || cat.slug || 'NEWS').toUpperCase()
})

const articleUrl = computed(() => `/berita/${props.article.slug}`)

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

const imageSrc = computed(() => {
  return props.article.featured_image || '/assets/img/logo.png'
})

const goalLabel = (goal: any) =>
  `${goal.goal_number || goal.number || goal.id} ${goal.title || goal.name || ''}`.trim()
</script>

<template>
  <article class="sdgs-highlight-card">
    <div class="sdgs-highlight-media">
      <NuxtLink :to="articleUrl" class="sdgs-highlight-image-link">
        <img
          :src="imageSrc"
          :alt="article.title"
          class="sdgs-highlight-image"
          loading="lazy"
        >
      </NuxtLink>
      <span class="sdgs-highlight-badge">{{ categoryLabel }}</span>
    </div>

    <div class="sdgs-highlight-body">
      <h3 class="sdgs-highlight-title">
        <NuxtLink :to="articleUrl">{{ article.title }}</NuxtLink>
      </h3>

      <div v-if="article.sdgs && article.sdgs.length" class="sdg-container">
        <NuxtLink
          to="/tujuan-pembangunan-berkelanjutan"
          class="sdg-label-link"
          title="Tujuan Pembangunan Berkelanjutan"
          aria-label="sdg content link"
        >
          <img
            :src="sdgsBulletUrl"
            alt="sdgs-label"
            loading="lazy"
            class="sdgLabelImg"
          >
        </NuxtLink>

        <div
          v-for="goal in article.sdgs.slice(0, 3)"
          :key="goal.id"
          class="sdgs-banner"
        >
          <NuxtLink
            :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`"
            :title="goalLabel(goal)"
            aria-label="sdg content link"
          >
            <img
              v-if="goal.icon_image && String(goal.icon_image).startsWith('http')"
              :src="goal.icon_image"
              alt="sdgs-badge"
              loading="lazy"
              class="sdg-icon-img"
            >
            <div
              v-else
              class="sdg-number-badge"
              :style="{
                backgroundColor: goal.color || '#f5f5f5',
                color: goal.color ? '#fff' : '#000'
              }"
            >
              {{ goal.goal_number || goal.number || goal.id }}
            </div>
          </NuxtLink>
        </div>

        <div
          v-if="article.sdgs.length > 3"
          class="sdgs-banner"
        >
          <button
            type="button"
            class="sdg-more"
            @click.prevent="openSdgsModal(article.sdgs)"
          >
            +{{ article.sdgs.length - 3 }}
          </button>
        </div>
      </div>

      <NuxtLink :to="articleUrl" class="sdgs-highlight-more">
        {{ t('sdg_read_more') }} »
      </NuxtLink>

      <div class="sdgs-highlight-footer">
        <time class="sdgs-highlight-date" :datetime="article.published_at">
          {{ formatDate(article.published_at) }}
        </time>
      </div>
    </div>

    <SdgsModal
      :show="isModalOpen"
      :sdgs="selectedSdgs"
      @close="isModalOpen = false"
    />
  </article>
</template>

<style scoped>
.sdgs-highlight-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.sdgs-highlight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.sdgs-highlight-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #f3f3f3;
  overflow: hidden;
}

.sdgs-highlight-image-link {
  display: block;
  width: 100%;
  height: 100%;
}

.sdgs-highlight-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sdgs-highlight-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(40, 40, 40, 0.72);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
}

.sdgs-highlight-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px 22px 18px;
}

.sdgs-highlight-title {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: #1a1a1a;
}

.sdgs-highlight-title a {
  color: inherit;
  text-decoration: none;
}

.sdgs-highlight-title a:hover {
  color: #e6a12c;
}

.sdg-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.sdg-label-link {
  display: inline-flex;
  line-height: 0;
}

.sdgLabelImg {
  display: block;
  width: 110px;
  height: 40px;
  object-fit: contain;
}

.sdgs-banner {
  display: inline-flex;
  line-height: 0;
}

.sdg-icon-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}

.sdg-number-badge {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
}

.sdg-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 8px;
  border: 0;
  border-radius: 6px;
  background: #f1f1f1;
  color: #333;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.sdgs-highlight-more {
  display: inline-block;
  margin-bottom: 18px;
  color: #e6a12c;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}

.sdgs-highlight-more:hover {
  color: #c88812;
}

.sdgs-highlight-footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid #eee;
}

.sdgs-highlight-date {
  color: #9a9a9a;
  font-size: 13px;
  font-weight: 400;
}
</style>
