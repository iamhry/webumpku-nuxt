<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  section?: {
    title?: string | null
    subtitle?: string | null
    content?: string | null
    image?: string | null
    button_text?: string | null
    button_url?: string | null
    settings?: Record<string, any> | any[] | null
  }
}>()

const { locale } = useLocale()

// Same asset AboutSection already ships as a background fallback, so this
// section never renders with an empty/broken background if the CMS hasn't
// set `image` yet.
const fallbackImage = '/assets/img/bg_home.jpeg'
const sectionImage = computed(() => props.section?.image || fallbackImage)

const displaySubtitle = computed(() => {
  return props.section?.subtitle || (locale.value === 'en' ? 'Watch Our Story' : 'Tonton Cerita Kami')
})

const displayTitle = computed(() => {
  return props.section?.title || (locale.value === 'en'
    ? 'Every Story Deserves a Closer Look'
    : 'Setiap Cerita Layak Dilihat Lebih Dekat')
})

// The CMS can send an empty "<p></p>" for content — treat that as "no content"
// rather than rendering a blank paragraph.
const displayContent = computed(() => {
  const raw = props.section?.content || ''
  const stripped = raw.replace(/<[^>]*>/g, '').trim()
  return stripped ? raw : ''
})

const ctaText = computed(() => props.section?.button_text || (locale.value === 'en' ? 'Discover More' : 'Selengkapnya'))
const ctaUrl = computed(() => props.section?.button_url || '')

// `settings` has come back as either {} or [] depending on the payload —
// normalize so property access below never throws.
const settingsObj = computed<Record<string, any>>(() => {
  const s = props.section?.settings
  return s && !Array.isArray(s) ? s : {}
})

/**
 * Resolve a playable embed URL from settings.video_file (the actual CMS
 * field name) — video_url/youtube_url are also checked as aliases in case
 * other sections use a different key. Mirrors the normalizer used by
 * PageVideoSection.vue for consistency.
 */
const embedUrl = computed<string | null>(() => {
  const url = settingsObj.value.video_file || settingsObj.value.video_url || settingsObj.value.youtube_url || ''
  if (!url) return null

  if (url.includes('youtube.com/embed/')) return url
  if (url.includes('player.vimeo.com/video/')) return url

  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0&autoplay=1`

  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&autoplay=1`

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`

  return null
})

const isVideoOpen = ref(false)
const openVideo = () => { isVideoOpen.value = true }
const closeVideo = () => { isVideoOpen.value = false }

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeVideo()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <section
    class="home-video-section"
    :style="{ backgroundImage: `url(${sectionImage})` }"
  >
    <div class="home-video-overlay"></div>

    <div class="container content-wide">
      <div class="home-video-content" v-reveal data-reveal="fade-up">
        <span class="home-video-subtitle">
          <span class="home-video-subtitle-bar" aria-hidden="true"></span>
          {{ displaySubtitle }}
        </span>

        <h2 class="home-video-title">{{ displayTitle }}</h2>

        <div v-if="displayContent" class="home-video-description" v-html="displayContent"></div>

        <div class="home-video-actions">
          <NuxtLink v-if="ctaUrl" :to="ctaUrl" class="rs-btn has-icon">
            {{ ctaText }}
            <span class="icon-box">
              <svg class="icon-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
              </svg>
              <svg class="icon-second" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
              </svg>
            </span>
          </NuxtLink>

          <button
            v-if="embedUrl"
            type="button"
            class="home-video-play-btn"
            :aria-label="locale === 'en' ? 'Play video' : 'Putar video'"
            @click="openVideo"
          >
            <i class="las la-play"></i>
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isVideoOpen && embedUrl"
        class="home-video-modal-overlay"
        @click.self="closeVideo"
      >
        <button
          type="button"
          class="home-video-modal-close"
          :aria-label="locale === 'en' ? 'Close video' : 'Tutup video'"
          @click="closeVideo"
        >&times;</button>
        <div class="home-video-modal-frame">
          <iframe
            :src="embedUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            title="Video"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.home-video-section {
  position: relative;
  isolation: isolate;
  min-height: 560px;
  display: flex;
  align-items: center;
  padding: 100px 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: scroll;
  overflow: hidden;
}

/* True fixed background on desktop only — background-attachment: fixed is
   unreliable on iOS/Android, so it's kept as scroll below 992px (same
   approach as AboutSection.vue). */
@media (min-width: 992px) {
  .home-video-section {
    background-attachment: fixed;
  }
}

.home-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, rgba(10, 10, 12, 0.86) 0%, rgba(10, 10, 12, 0.6) 48%, rgba(10, 10, 12, 0.3) 100%);
  z-index: 0;
}

.home-video-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  color: #ffffff;
}

.home-video-subtitle {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--rs-theme-yellow, #f5b301);
  margin-bottom: 20px;
}

.home-video-subtitle-bar {
  width: 40px;
  height: 2px;
  background: var(--rs-theme-yellow, #f5b301);
  display: inline-block;
}

.home-video-title {
  font-size: 42px;
  line-height: 1.2;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 20px;
}

.home-video-description {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 32px;
}

.home-video-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.rs-btn.has-icon {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 30px;
  background: var(--rs-theme-yellow, #f5b301);
  color: #111111;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 4px;
  text-decoration: none;
  border: 2px solid var(--rs-theme-yellow, #f5b301);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.rs-btn.has-icon:hover {
  background: transparent;
  color: var(--rs-theme-yellow, #f5b301);
}

.rs-btn .icon-box {
  position: relative;
  width: 14px;
  height: 14px;
  display: inline-flex;
  overflow: hidden;
}

.rs-btn .icon-first,
.rs-btn .icon-second {
  width: 14px;
  height: 14px;
  fill: currentColor;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}

.rs-btn .icon-second {
  transform: translateX(-100%);
}

.rs-btn:hover .icon-first {
  transform: translateX(100%);
}

.rs-btn:hover .icon-second {
  transform: translateX(0);
}

/* Circular play button — matches the reference's .rs-play-btn.has-theme-yellow:
   solid yellow circle, black icon, by default (not just on hover). */
.home-video-play-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  flex-shrink: 0;
  border-radius: 50%;
  border: none;
  background: var(--rs-theme-yellow, #f5b301);
  color: #111111;
  font-size: 20px;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0 8px 24px rgba(245, 179, 1, 0.35), 0 0 0 0 rgba(245, 179, 1, 0.5);
  /* Simple heartbeat-style pulse — scale + glow throb on a loop, the classic
     "click me" CTA cue. Kept deliberately simple rather than simulating a
     full hover/press sequence, so it reads as an inviting pulse rather than
     a busy demo animation. */
  animation: home-video-btn-pulse 1.8s ease-in-out infinite;
  transition: box-shadow 0.3s ease;
}

.home-video-play-btn i {
  position: relative;
  display: inline-flex;
  animation: home-video-icon-pulse 1.8s ease-in-out infinite;
  transition: transform 0.3s ease;
}

/* Two rings pulsing outward with a staggered delay ("sonar" effect) instead
   of a single ring — reads as more alive/inviting on a static hero image. */
.home-video-play-btn::before,
.home-video-play-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  background: var(--rs-theme-yellow, #f5b301);
  animation: home-video-pulse 2000ms ease-out infinite;
}

.home-video-play-btn::after {
  animation-delay: 1000ms;
}

.home-video-play-btn:hover {
  animation-play-state: paused;
  transform: scale(1.16);
  box-shadow: 0 14px 34px rgba(245, 179, 1, 0.6), 0 0 0 14px rgba(245, 179, 1, 0.16);
}

.home-video-play-btn:hover i {
  animation-play-state: paused;
  transform: scale(1.15) translateX(1px);
}

.home-video-play-btn:active {
  animation-play-state: paused;
  transform: scale(0.94);
}

.home-video-play-btn:active i {
  animation-play-state: paused;
  transform: scale(0.9);
}

/* Outer sonar rings — two concentric pulses fading outward with a staggered
   delay, on top of the button's own heartbeat pulse below. */
@keyframes home-video-pulse {
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.9); opacity: 0; }
}

/* Heartbeat-style scale + glow throb — deliberately simple and rhythmic so
   it reads as "click me" rather than a busy demo. */
@keyframes home-video-btn-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 24px rgba(245, 179, 1, 0.35), 0 0 0 0 rgba(245, 179, 1, 0.5);
  }
  50% {
    transform: scale(1.12);
    box-shadow: 0 14px 34px rgba(245, 179, 1, 0.6), 0 0 0 14px rgba(245, 179, 1, 0.12);
  }
}

@keyframes home-video-icon-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

/* Lightbox */
.home-video-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.home-video-modal-frame {
  position: relative;
  width: min(960px, 100%);
  aspect-ratio: 16 / 9;
  background: #000;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.home-video-modal-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.home-video-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.home-video-modal-close:hover {
  background: var(--rs-theme-yellow, #f5b301);
  color: #111111;
}

@media (max-width: 991px) {
  .home-video-section {
    background-attachment: scroll;
    padding: 72px 0;
    min-height: 0;
  }

  .home-video-title {
    font-size: 30px;
  }
}

@media (max-width: 575px) {
  .home-video-actions {
    gap: 16px;
  }

  .home-video-play-btn {
    width: 54px;
    height: 54px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-video-play-btn,
  .home-video-play-btn i,
  .home-video-play-btn::before,
  .home-video-play-btn::after {
    animation: none;
  }

  .home-video-play-btn:hover,
  .home-video-play-btn:hover i {
    transform: none;
  }
}
</style>
