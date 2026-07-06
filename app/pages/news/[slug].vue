<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useNews } from '~/composables/useNews'
import { createError } from 'nuxt/app'
import { useI18n } from '#imports'

const route = useRoute()
const slug = route.params.slug as string
const { currentArticle, loading, error, fetchNewsDetail } = useNews()
const { t, locale } = useI18n()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

await fetchNewsDetail(slug)

if (!currentArticle.value || error.value) {
    throw createError({ statusCode: 404, statusMessage: 'News Not Found', fatal: true })
}

useHead({
  title: currentArticle.value?.meta_title || currentArticle.value?.title,
  meta: [
    { name: 'description', content: currentArticle.value?.meta_description || currentArticle.value?.excerpt },
    { property: 'og:image', content: currentArticle.value?.og_image || currentArticle.value?.featured_image }
  ]
})
</script>
<template>
  <div class="blog-details-area section-padding" v-if="currentArticle">
    <div class="container content-wide">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="single-blog-details">
            <img :src="currentArticle.featured_image" :alt="currentArticle.title" style="width:100%; border-radius: 8px;" class="mb-4" />
            <p class="blog-meta">{{ t('created_at') }}: {{ formatDate(currentArticle.created_at || currentArticle.published_at) }}</p>
            <h2 class="mb-4">{{ currentArticle.title }}</h2>
            
            <div class="blog-content mt-4" v-html="currentArticle.content"></div>
            
            <div class="related-sdgs mt-5" v-if="currentArticle.sdgs && currentArticle.sdgs.length > 0">
              <h4 class="mb-3">Related SDGs</h4>
              <div class="d-flex gap-3 mt-3">
                 <img v-for="sdg in currentArticle.sdgs" :key="sdg.id" :src="sdg.icon_image" :alt="sdg.title" style="width:50px;" :title="sdg.title" />
              </div>
            </div>

            <NewsRelatedNews v-if="currentArticle.related_news && currentArticle.related_news.length > 0" :articles="currentArticle.related_news" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
