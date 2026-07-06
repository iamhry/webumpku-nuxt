<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSdgs } from '~/composables/useSdgs'
import { createError } from 'nuxt/app'

const route = useRoute()
const slug = route.params.slug as string
const { currentGoal, loading, error, fetchSdgDetail } = useSdgs()

await fetchSdgDetail(slug)

if (!currentGoal.value || error.value) {
    throw createError({ statusCode: 404, statusMessage: 'SDG Not Found', fatal: true })
}

useHead({
  title: currentGoal.value?.meta_title || currentGoal.value?.title,
  meta: [
    { name: 'description', content: currentGoal.value?.meta_description || currentGoal.value?.description },
    { property: 'og:image', content: currentGoal.value?.og_image || currentGoal.value?.banner_image }
  ]
})
</script>
<template>
  <div v-if="currentGoal">
    <div class="sdg-banner" :style="`background-image: url(${currentGoal.banner_image}); padding: 150px 0; background-size: cover; background-position: center;`">
       <div class="container content-wide text-center">
         <div style="background: rgba(255,255,255,0.9); padding: 40px; border-radius: 8px; display: inline-block;">
            <img :src="currentGoal.icon_image" :alt="currentGoal.title" style="width: 80px;" class="mb-3" />
            <h2>{{ currentGoal.title }}</h2>
         </div>
       </div>
    </div>
    
    <div class="sdg-details-area section-padding">
      <div class="container content-wide">
         <div class="row">
            <div class="col-lg-8">
               <h3>About this SDG</h3>
               <p class="mt-3">{{ currentGoal.description }}</p>
            </div>
            <div class="col-lg-4">
               <div class="statistics-box" style="background: #f4f5f8; padding: 30px; border-radius: 8px;">
                  <h4 class="mb-4">Key Statistics</h4>
                  <ul class="list-unstyled mt-3">
                     <li v-for="(value, key) in currentGoal.statistics" :key="key" class="mb-2">
                        <strong>{{ String(key).replace(/_/g, ' ').toUpperCase() }}:</strong> {{ value }}
                     </li>
                  </ul>
               </div>
            </div>
         </div>

          <RelatedSdgsNews v-if="currentGoal.related_news && currentGoal.related_news.length > 0" :articles="currentGoal.related_news" />
      </div>
    </div>
  </div>
</template>
