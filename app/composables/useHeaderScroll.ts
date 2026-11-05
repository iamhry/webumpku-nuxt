// composables/useHeaderScroll.ts
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

const SCROLLED_ON_THRESHOLD = 12
const SCROLLED_OFF_THRESHOLD = 4
const UTILITY_HIDE_THRESHOLD = 80
const UTILITY_SHOW_THRESHOLD = 40
const NEAR_TOP_THRESHOLD = 4
const DIRECTION_DELTA = 6
const SCROLLED_TOGGLE_COOLDOWN_MS = 280
const UTILITY_TOGGLE_COOLDOWN_MS = 340

export function useHeaderScroll(options: {
  isMobileOpen: Ref<boolean>
  isMegaOpen: Ref<boolean>
}) {
  const route = useRoute()
  const scrolled = ref(false)
  const hideUtilityBar = ref(false)
  const lastScrollY = ref(0)

  const topbarRef = ref<HTMLElement | null>(null)
  const topbarHeight = ref(40)

  let scrollTicking = false
  let rafId: number | null = null
  let scrolledLockedUntil = 0
  let utilityLockedUntil = 0

  const isHeaderWide = computed(() => scrolled.value && !options.isMobileOpen.value)

  const isHeroOverlayPage = computed(() => {
    const raw = (route.path || '/').replace(/\/+$/, '') || '/'
    const path = raw.replace(/^\/(id|en)(?=\/|$)/, '') || '/'
    if (path === '/') return true
    return (
      path.startsWith('/page/') ||
      path.startsWith('/fasilitas/') ||
      path.startsWith('/facilities/') ||
      path.startsWith('/program-studi/') ||
      path.startsWith('/fakultas/') ||
      path.startsWith('/agenda/')
    )
  })

  const isHeaderTransparent = computed(
    () => isHeroOverlayPage.value && !isHeaderWide.value && !options.isMobileOpen.value && !options.isMegaOpen.value
  )

  const showHeroOffset = computed(
    () => isHeroOverlayPage.value && !isHeaderWide.value && !options.isMobileOpen.value && topbarHeight.value > 0
  )

  const syncTopbarHeight = () => {
    if (!import.meta.client) return
    const el = topbarRef.value
    if (!el) return
    const style = window.getComputedStyle(el)
    if (style.display === 'none' || el.classList.contains('rs-header-top--hidden')) {
      topbarHeight.value = 0
      return
    }
    topbarHeight.value = el.offsetHeight || 0
  }

  const updateScrollState = () => {
    rafId = null
    const y = Math.max(0, window.scrollY)
    const delta = y - lastScrollY.value
    const now = performance.now()

    if (options.isMobileOpen.value) {
      scrolled.value = false
      hideUtilityBar.value = false
      lastScrollY.value = y
      scrollTicking = false
      return
    }

    if (now >= scrolledLockedUntil) {
      if (!scrolled.value && y > SCROLLED_ON_THRESHOLD) {
        scrolled.value = true
        scrolledLockedUntil = now + SCROLLED_TOGGLE_COOLDOWN_MS
      } else if (scrolled.value && y < SCROLLED_OFF_THRESHOLD) {
        scrolled.value = false
        scrolledLockedUntil = now + SCROLLED_TOGGLE_COOLDOWN_MS
      }
    }

    if (now >= utilityLockedUntil && Math.abs(delta) >= DIRECTION_DELTA) {
      if (delta > 0 && y > UTILITY_HIDE_THRESHOLD && !hideUtilityBar.value) {
        hideUtilityBar.value = true
        utilityLockedUntil = now + UTILITY_TOGGLE_COOLDOWN_MS
      } else if (delta < 0 && y < UTILITY_SHOW_THRESHOLD && hideUtilityBar.value) {
        hideUtilityBar.value = false
        utilityLockedUntil = now + UTILITY_TOGGLE_COOLDOWN_MS
      }
    }

    if (y <= NEAR_TOP_THRESHOLD) {
      hideUtilityBar.value = false
    }

    lastScrollY.value = y
    scrollTicking = false
  }

  const onScroll = () => {
    if (scrollTicking) return
    scrollTicking = true
    rafId = requestAnimationFrame(updateScrollState)
  }

  onMounted(() => {
    lastScrollY.value = window.scrollY
    updateScrollState()
    window.addEventListener('scroll', onScroll, { passive: true })
    syncTopbarHeight()
    window.addEventListener('resize', syncTopbarHeight, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', syncTopbarHeight)
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  watch([isHeaderTransparent, hideUtilityBar], () => {
    if (import.meta.client) requestAnimationFrame(syncTopbarHeight)
  })

  watch(options.isMobileOpen, (open) => {
    if (!open && import.meta.client) requestAnimationFrame(updateScrollState)
  })

  return {
    scrolled,
    hideUtilityBar,
    topbarRef,
    topbarHeight,
    isHeaderWide,
    isHeroOverlayPage,
    isHeaderTransparent,
    showHeroOffset
  }
}