<template>
  <div class="page-video-section">
    <!-- Header -->
    <div v-if="section.title || section.subtitle" class="page-section-header page-center">
      <span v-if="kicker" class="page-kicker">{{ kicker }}</span>
      <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
      <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
    </div>

    <PageSectionEmpty
      v-if="!hasVideo"
      message="Belum ada video. Set settings.video_file / video_url di CMS."
      icon="las la-play-circle"
      :preview="preview"
    />

    <!-- Video Embed Wrapper -->
    <div v-else class="page-video-wrapper">
      <!-- YouTube embed from video_url -->
      <template v-if="youtubeEmbedUrl">
        <div class="page-video-responsive">
          <iframe
            :src="youtubeEmbedUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            title="Video"
          />
        </div>
      </template>

      <!-- Iframe from content field -->
      <template v-else-if="hasIframeInContent">
        <div
          class="page-video-responsive"
          v-html="section.content"
        />
      </template>
    </div>

    <!-- Optional caption / description -->
    <div
      v-if="captionText"
      class="page-video-caption"
    >
      {{ captionText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageSection } from '~/types/page'
import PageSectionEmpty from './PageSectionEmpty.vue'

const props = defineProps<{
  section: PageSection
  preview?: boolean
}>()

const kicker = computed(() => props.section.settings?.kicker || '')

/**
 * Convert various YouTube URL formats to embed URL
 */
const youtubeEmbedUrl = computed<string | null>(() => {
  const s = props.section.settings
  const settings = s && !Array.isArray(s) && typeof s === 'object' ? s : {}
  const url = settings.video_file
    || settings.video_url
    || settings.youtube_url
    || (props.section as any).video_url
    || props.section.image // some backends store video_url in image field
    || ''

  if (!url) return null

  // Already an embed URL
  if (url.includes('youtube.com/embed/')) return url
  if (url.includes('player.vimeo.com/video/')) return url

  // youtube.com/watch?v=ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0`

  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0`

  // vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
})

const hasIframeInContent = computed(() => {
  return !!(props.section.content && props.section.content.includes('<iframe'))
})

const hasVideo = computed(() => {
  return !!(youtubeEmbedUrl.value || hasIframeInContent.value)
})

const captionText = computed(() => {
  // If content is pure text (no html tags) use as caption
  if (props.section.content && !props.section.content.includes('<')) {
    return props.section.content
  }
  return props.section.settings?.caption || ''
})
</script>
