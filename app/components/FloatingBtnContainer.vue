<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const route = useRoute()
const { locale } = useLocale()

const isVisible = ref(false)
const isSupportOpen = ref(false)

const isHomepage = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  return path === '/' || path === '/en' || path === '/id'
})

const startLabel = computed(() =>
  locale.value === 'en' ? 'Start Here' : 'Mulai Dari Sini'
)

const supportLabel = computed(() =>
  locale.value === 'en' ? 'Get Support' : 'Bantuan'
)

const askAdmissionLabel = computed(() =>
  locale.value === 'en' ? 'Ask Admission' : 'Tanya PMB'
)

const helpdeskLabel = computed(() =>
  locale.value === 'en' ? 'Contact Support' : 'Hubungi Kami'
)

const updateVisibility = () => {
  if (!import.meta.client || !isHomepage.value) {
    isVisible.value = false
    return
  }

  const doc = document.documentElement
  const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1)
  const progress = window.scrollY / scrollable
  isVisible.value = progress >= 0.5
}

const onScroll = () => {
  updateVisibility()
}

const toggleSupport = () => {
  isSupportOpen.value = !isSupportOpen.value
}

watch(isHomepage, () => {
  isSupportOpen.value = false
  updateVisibility()
})

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="isHomepage"
      class="floating-btn-container"
      :class="{ 'is-visible': isVisible }"
      aria-hidden="false"
    >
      <!-- Start Here / PMB -->
      <div class="floating-btn-umpku floating-start-umpku">
        <a
          href="https://pmb.umpku.ac.id"
          target="_blank"
          rel="noopener noreferrer"
          class="head-float-btn group-float-btn"
        >
          <span class="float-icon-wrap float-icon-wrap--logo">
            <img src="/assets/img/logogram_umpku.webp" alt="UMPKU" class="float-logo">
          </span>
          <span class="float-label">{{ startLabel }}</span>
        </a>
      </div>

      <!-- Get Support (expandable) -->
      <div
        class="floating-btn-umpku floating-support-umpku"
        :class="{ 'is-open': isSupportOpen }"
      >
        <button
          type="button"
          class="head-float-btn group-float-btn"
          :aria-expanded="isSupportOpen"
          aria-controls="floating-support-body"
          @click="toggleSupport"
        >
          <span class="float-icon-wrap float-icon-wrap--support">
            <i class="las la-headset" aria-hidden="true"></i>
          </span>
          <span class="float-label">{{ supportLabel }}</span>
        </button>

        <div
          id="floating-support-body"
          class="body-float-btn"
          :hidden="!isSupportOpen"
        >
          <div class="border-top" aria-hidden="true"></div>
          <a
            href="https://pmb.umpku.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            class="group-float-btn"
          >
            <span class="float-icon-wrap float-icon-wrap--wa">
              <i class="las la-user-graduate" aria-hidden="true"></i>
            </span>
            <span class="float-label">{{ askAdmissionLabel }}</span>
          </a>
          <div class="border-top" aria-hidden="true"></div>
          <a
            href="/kontak"
            class="group-float-btn bg-bottom-radius"
          >
            <span class="float-icon-wrap float-icon-wrap--help">
              <i class="las la-life-ring" aria-hidden="true"></i>
            </span>
            <span class="float-label">{{ helpdeskLabel }}</span>
          </a>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.floating-btn-container {
  position: fixed;
  right: 16px;
  bottom: 110px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(24px);
  pointer-events: none;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    visibility 0.35s ease;
}

.floating-btn-container.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  pointer-events: auto;
}

.floating-btn-umpku {
  background: #e8f1fb;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(11, 46, 89, 0.16);
  overflow: hidden;
  min-width: 168px;
}

.group-float-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px 12px 12px;
  border: 0;
  background: transparent;
  color: #111111;
  text-decoration: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;
}

.group-float-btn:hover {
  background: rgba(255, 255, 255, 0.55);
}

.head-float-btn {
  font: inherit;
}

.float-icon-wrap {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(11, 46, 89, 0.12);
  overflow: hidden;
}

.float-icon-wrap--logo {
  background: #ffffff;
}

.float-logo {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.float-icon-wrap--support {
  background: linear-gradient(160deg, #2f7fd4 0%, #0b2e59 100%);
  color: #ffffff;
  font-size: 22px;
}

.float-icon-wrap--wa {
  background: #25d366;
  color: #ffffff;
  font-size: 22px;
}

.float-icon-wrap--help {
  background: #EA5501;
  color: #111111;
  font-size: 20px;
}

.float-label {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
  color: #111111;
}

.body-float-btn {
  background: #e8f1fb;
}

.body-float-btn[hidden] {
  display: none !important;
}

.border-top {
  height: 1px;
  background: rgba(11, 46, 89, 0.12);
  margin: 0 12px;
}

.bg-bottom-radius {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.floating-support-umpku.is-open {
  box-shadow: 0 12px 28px rgba(11, 46, 89, 0.2);
}

@media (max-width: 575px) {
  .floating-btn-container {
    right: 10px;
    bottom: 96px;
  }

  .floating-btn-umpku {
    min-width: 152px;
  }

  .float-label {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-btn-container {
    transition: none;
  }
}
</style>
