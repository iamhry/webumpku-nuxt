<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMenus } from '~/composables/useMenus'
import { useSettings } from '~/composables/useSettings'
import type { MenuItem as MenuItemType, MenuPromo, MenuType } from '~/types/menu'
import { isExternalUrl, resolveMenuType } from '~/utils/menu'

// ─── Types ──────────────────────────────────────────────────────────────────
type HeaderMenu = {
  id: number | string
  label: string
  to: string
  target?: string
  subtitle?: string | null
  menu_type: MenuType
  columns?: number | null
  icon?: string | null
  is_featured?: boolean
  promos: MenuPromo[]
  children: HeaderMenu[]
}

// ─── Composables ────────────────────────────────────────────────────────────
const route = useRoute()
const router = useRouter()
const { locale, setLocale } = useLocale()
const { settings, fetchSettings } = useSettings()
const { headerMenus, fetchHeaderMenus } = useMenus()

await Promise.all([fetchSettings(), fetchHeaderMenus()])

// ─── Fallback Settings ───────────────────────────────────────────────────────
const fallback = {
  email: 'info@umpku.ac.id',
  phone: '+62 271 857762',
  schedule: 'Senin - Sabtu 08.00 - 16.00',
  logo: '/assets/img/logo.png',
  pmbUrl: 'https://pmb.umpku.ac.id'
}

const siteLogo = computed(() => settings.value?.logo || fallback.logo)
// Compact dark logotype for solid/white header states
const scrolledLogo = '/assets/img/umpku_logotype.png'
const openMegaId = ref<number | string | null>(null)
const isMegaOpen = computed(() => openMegaId.value !== null)
// Prefer compact (dark) logotype whenever the bar is solid white
const useCompactLogo = computed(() => scrolled.value || isMegaOpen.value)
// Kept for any legacy single-src bindings
const headerLogo = computed(() =>
  useCompactLogo.value ? scrolledLogo : siteLogo.value,
)

// Debounced mega close — prevents flicker when the pointer briefly leaves
// the trigger while moving into the panel (or crossing a 1px gap).
let megaCloseTimer: ReturnType<typeof setTimeout> | null = null
const MEGA_CLOSE_DELAY_MS = 160

const clearMegaCloseTimer = () => {
  if (megaCloseTimer !== null) {
    clearTimeout(megaCloseTimer)
    megaCloseTimer = null
  }
}

const openMega = (id: number | string) => {
  clearMegaCloseTimer()
  openMegaId.value = id
}
const closeMega = () => {
  clearMegaCloseTimer()
  openMegaId.value = null
  if (import.meta.client) {
    const el = document.activeElement as HTMLElement | null
    if (el?.closest?.('.has-mega-menu')) el.blur()
  }
}

/** Close mega when any link inside the panel is clicked. */
const onMegaPanelClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  if (!target) return
  if (target.closest('a')) closeMega()
}
const scheduleCloseMega = () => {
  clearMegaCloseTimer()
  megaCloseTimer = setTimeout(() => {
    openMegaId.value = null
    megaCloseTimer = null
  }, MEGA_CLOSE_DELAY_MS)
}
const onMegaFocusOut = (event: FocusEvent, id: number | string) => {
  const next = event.relatedTarget as Node | null
  const current = event.currentTarget as HTMLElement | null
  if (current && next && current.contains(next)) return
  if (openMegaId.value === id) scheduleCloseMega()
}
const siteEmail = computed(() => settings.value?.email || fallback.email)
const sitePhone = computed(() => settings.value?.phone || fallback.phone)
const siteSchedule = computed(() => settings.value?.schedule || fallback.schedule)
const pmbUrl = computed(() => fallback.pmbUrl)

// ─── Helper: normalize menu title (supports i18n object or string) ───────────
const getTitle = (item: MenuItemType): string => {
  if (!item) return ''
  if (typeof item.title === 'string') return item.title
  if (typeof item.title === 'object' && item.title !== null) {
    return item.title[locale.value] || item.title['id'] || Object.values(item.title)[0] || ''
  }
  return ''
}

// ─── Helper: normalize to HeaderMenu ────────────────────────────────────────
const normalizeMenus = (items: MenuItemType[] = []): HeaderMenu[] => {
  return [...items]
    .sort((a, b) => ((a as any).sort_order ?? (a as any).order ?? 0) - ((b as any).sort_order ?? (b as any).order ?? 0))
    .map((item) => ({
      id: item.id,
      label: getTitle(item) || 'Menu',
      to: item.url || '#',
      target: item.target || '_self',
      subtitle: item.subtitle || null,
      menu_type: resolveMenuType(item),
      columns: item.columns ?? null,
      icon: item.icon || null,
      is_featured: !!item.is_featured,
      promos: Array.isArray(item.promos) ? [...item.promos].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) : [],
      children: Array.isArray(item.children) && item.children.length
        ? normalizeMenus(item.children)
        : [],
    }))
}

const menus = computed<HeaderMenu[]>(() => normalizeMenus(headerMenus.value || []))

const isMegaMenuItem = (menu: HeaderMenu) => menu.menu_type === 'mega'
const isGroupMenuItem = (menu: HeaderMenu) => menu.menu_type === 'group'
const megaColumns = (menu: HeaderMenu) => {
  const n = Number(menu.columns)
  if (!Number.isFinite(n)) return 3
  return Math.min(5, Math.max(2, Math.round(n)))
}

/** Prefer group columns; flat links → 2 Telkomsel-style columns. */
const megaColumnGroups = (menu: HeaderMenu): HeaderMenu[] => {
  const children = menu.children || []
  const onlyGroups = children.filter(child => isGroupMenuItem(child))
  if (onlyGroups.length) return onlyGroups

  const withNested = children.filter(child => child.children.length > 0)
  if (withNested.length) return withNested

  if (!children.length) return []

  // Flat mega children: split into two balanced columns (Telkomsel-like)
  const mid = Math.ceil(children.length / 2)
  const chunks = [children.slice(0, mid), children.slice(mid)].filter(c => c.length)
  return chunks.map((chunk, index) => ({
    id: `${menu.id}-col-${index + 1}`,
    label: '',
    to: '#',
    menu_type: 'group' as const,
    promos: [],
    children: chunk,
  }))
}

const megaPanelMeta = (menu: HeaderMenu) => {
  const groups = megaColumnGroups(menu)
  const colCount = groups.length > 1
    ? Math.min(5, Math.max(2, groups.length))
    : megaColumns(menu)
  return {
    groups,
    colCount,
    hasPromos: menu.promos.length > 0,
  }
}

const hasNavigableUrl = (to?: string) => !!to && to !== '#'

const toggleMega = (id: number | string) => {
  clearMegaCloseTimer()
  openMegaId.value = openMegaId.value === id ? null : id
}

// ─── Internal link helper ────────────────────────────────────────────────────
const isInternalLink = (url?: string): boolean => {
  if (!url) return false
  return url.startsWith('/') && !url.startsWith('//')
}

// ─── Active menu ─────────────────────────────────────────────────────────────
const isActiveMenu = (menu: HeaderMenu): boolean => {
  if (menu.to && menu.to !== '#' && route.path === menu.to) return true
  return !!menu.children?.some(child => isActiveMenu(child))
}

// ─── Reactive state ──────────────────────────────────────────────────────────
const scrolled = ref(false)       // shrink main-nav (scrollY > 8)
const hideUtilityBar = ref(false)       // collapse topbar (direction + threshold)
const lastScrollY = ref(0)
const isSearchOpen = ref(false)
const isMobileOpen = ref(false)
const searchKeyword = ref('')
const openedMobileMenus = ref<Record<string | number, boolean>>({})

// ─── Shrink-on-scroll (rAF-throttled, direction-aware) ───────────────────────
// Hysteresis: each toggled state uses two different thresholds (enter/leave)
// instead of one shared value. A single shared threshold makes the class
// flap on/off whenever scrollY oscillates by a pixel around that number
// (trackpad micro-movements, momentum scroll, sub-pixel deltas) — that flapping
// is what produces the "berkedip / meloncat" flicker-jump during scroll.
const SCROLLED_ON_THRESHOLD = 12  // scrolled state turns ON past this
const SCROLLED_OFF_THRESHOLD = 4   // scrolled state turns OFF below this
const UTILITY_HIDE_THRESHOLD = 80
const UTILITY_SHOW_THRESHOLD = 40
const NEAR_TOP_THRESHOLD = 4   // always restore utility bar near the very top
const DIRECTION_DELTA = 6   // ignore tiny scroll noise / jitter

// A single wheel/trackpad tick can easily move scrollY by 40-100px — enough to
// cross the *entire* hysteresis gap in one go right as the boundary is
// reached. Without a cooldown, hovering near that point re-triggers the
// hide/show (or logo-swap) transition mid-flight over and over, which is what
// reads as "berkedip" (flicker) exactly at the scroll boundary. Locking each
// toggle for roughly its own transition duration lets it finish once, cleanly,
// before it's allowed to reverse.
const SCROLLED_TOGGLE_COOLDOWN_MS = 280
const UTILITY_TOGGLE_COOLDOWN_MS = 340

const headerRef = ref<HTMLElement | null>(null)
const topbarRef = ref<HTMLElement | null>(null)
const topbarHeight = ref(40)

// Reflects `scrolled` but also folds in the mobile-drawer guard, so template
// bindings + CSS class toggling only ever depend on one boolean.
const isHeaderWide = computed(() => scrolled.value && !isMobileOpen.value)

/** Pages whose first viewport is a full-bleed hero — header sits on top of it. */
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

/** Transparent white-on-hero look — only before scroll, never with blur/white fill. */
const isHeaderTransparent = computed(
  () => isHeroOverlayPage.value && !isHeaderWide.value && !isMobileOpen.value && !isMegaOpen.value
)

/** Spacer so hero starts below the orangered topbar (not under it).
 *  Layout-only — must stay stable while mega menu is open (no content jump). */
const showHeroOffset = computed(
  () => isHeroOverlayPage.value && !isHeaderWide.value && !isMobileOpen.value && topbarHeight.value > 0
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

let scrollTicking = false
let rafId: number | null = null
let scrolledLockedUntil = 0
let utilityLockedUntil = 0

const updateScrollState = () => {
  rafId = null
  const y = Math.max(0, window.scrollY)
  const delta = y - lastScrollY.value
  const now = performance.now()

  // Mobile drawer open → keep full-size header
  if (isMobileOpen.value) {
    scrolled.value = false
    hideUtilityBar.value = false
    lastScrollY.value = y
    scrollTicking = false
    return
  }

  // Hysteresis + cooldown: only flip `scrolled` when crossing the ON/OFF band
  // AND the previous toggle's transition has had time to finish — never on
  // every frame while hovering around a single boundary value.
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

  // Near top: always restore utility bar — a firm, deliberate boundary, not
  // subject to jitter, so it intentionally bypasses the cooldown lock.
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
  if (import.meta.client) {
    requestAnimationFrame(syncTopbarHeight)
  }
})

// Re-evaluate when mobile drawer closes
watch(isMobileOpen, (open) => {
  if (!open && import.meta.client) {
    requestAnimationFrame(updateScrollState)
  }
})

// Close search when clicking outside
const searchWrapperRef = ref<HTMLElement | null>(null)
const onDocumentClick = (e: MouseEvent) => {
  if (searchWrapperRef.value && !searchWrapperRef.value.contains(e.target as Node)) {
    isSearchOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})

// Close mobile / mega on route change
watch(() => route.fullPath, () => {
  isMobileOpen.value = false
  closeMega()
  document.body.style.overflow = ''
})

// Body scroll lock when drawer open
watch(isMobileOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

// ─── Search ──────────────────────────────────────────────────────────────────
const submitSearch = async () => {
  const q = searchKeyword.value.trim()
  if (!q) return
  isSearchOpen.value = false
  searchKeyword.value = ''
  await navigateTo(`/search?q=${encodeURIComponent(q)}`)
}

// ─── Mobile menu toggle ───────────────────────────────────────────────────────
const toggleMobileMenu = (id: string | number) => {
  openedMobileMenus.value[id] = !openedMobileMenus.value[id]
}

const closeMobileDrawer = () => {
  isMobileOpen.value = false
}
</script>

<template>
  <div
    class="rs-header-root"
    :class="{
      'rs-header-root--overlay': isHeroOverlayPage,
      'rs-header-root--transparent': isHeaderTransparent,
      'rs-header-root--scrolled': isHeaderWide,
      'rs-header-root--mega-open': isMegaOpen,
    }"
    :style="{ '--rs-header-top-height': `${topbarHeight}px` }"
  >
    <!-- ── TOPBAR (utility-bar) ────────────────────── -->
    <div
      ref="topbarRef"
      class="rs-header-top"
      :class="{ 'rs-header-top--hidden': hideUtilityBar && !isMobileOpen }"
    >
      <div class="rs-header-top-inner">
        <!-- Left: Email + Phone -->
        <div class="rs-header-info-wrapper">
          <div class="rs-header-info-item" v-if="siteEmail">
            <div class="rs-header-contact-item">
              <span>Email.</span>
              <h6><a :href="`mailto:${siteEmail}`">{{ siteEmail }}</a></h6>
            </div>
          </div>
          <div class="rs-header-info-item" v-if="sitePhone">
            <div class="rs-header-contact-item">
              <span>Telp.</span>
              <h6><a :href="`tel:${sitePhone}`">{{ sitePhone }}</a></h6>
            </div>
          </div>
        </div>

        <!-- Right: Schedule + Lang -->
        <div class="rs-header-top-right">
          <div class="rs-header-info-item" v-if="siteSchedule">
            <div class="rs-header-contact-item">
              <div class="rs-theme-social"
                v-if="settings?.facebook || settings?.instagram || settings?.youtube || settings?.linkedin">
                <a v-if="settings?.facebook" :href="settings.facebook" target="_blank" rel="noopener"
                  aria-label="Facebook">
                  <i class="lab la-facebook-f"></i>
                </a>
                <a v-if="settings?.instagram" :href="settings.instagram" target="_blank" rel="noopener"
                  aria-label="Instagram">
                  <i class="lab la-instagram"></i>
                </a>
                <a v-if="settings?.youtube" :href="settings.youtube" target="_blank" rel="noopener"
                  aria-label="YouTube">
                  <i class="lab la-youtube"></i>
                </a>
                <a v-if="settings?.linkedin" :href="settings.linkedin" target="_blank" rel="noopener"
                  aria-label="LinkedIn">
                  <i class="lab la-linkedin-in"></i>
                </a>
              </div>
              <!-- <span>Jadwal.</span> -->
              <!-- <h6>{{ siteSchedule }}</h6> -->
            </div>
          </div>
          <div class="rs-lang-switcher">
            <a :class="{ active: locale === 'id' }" @click.prevent="setLocale('id')">ID</a>
            <span class="rs-lang-divider">|</span>
            <a :class="{ active: locale === 'en' }" @click.prevent="setLocale('en')">EN</a>
          </div>
        </div>
      </div>
    </div>

    <!-- ── MAIN HEADER (main-nav) ──────────────────── -->
    <div ref="headerRef" class="rs-header-area" :class="{ 'rs-header-area--scrolled': isHeaderWide }">
      <div class="rs-header-inner">

        <!-- LEFT: Logo in yellow block -->
        <div class="rs-header-left">
          <div class="rs-header-logo-wrapper">
            <div class="rs-header-logo">
              <NuxtLink to="/" class="rs-header-logo-link">
                <img
                  class="rs-header-logo-img rs-header-logo-img--full"
                  :class="{ 'is-hidden': useCompactLogo }"
                  :src="siteLogo"
                  :alt="settings?.site_name || 'UMPKU'"
                />
                <img
                  class="rs-header-logo-img rs-header-logo-img--compact"
                  :class="{ 'is-visible': useCompactLogo }"
                  :src="scrolledLogo"
                  alt=""
                  aria-hidden="true"
                />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- CENTER: Desktop Menu -->
        <div class="rs-header-menu">
          <!-- Desktop menu -->
          <nav class="rs-main-nav" aria-label="Main Navigation">
            <ul class="multipage-menu">
              <li
                v-for="menu in menus"
                :key="menu.id"
                :class="{
                  'menu-item-has-children': menu.children.length > 0 || isMegaMenuItem(menu),
                  'has-mega-menu': isMegaMenuItem(menu),
                  'is-mega-open': isMegaMenuItem(menu) && openMegaId === menu.id,
                }"
                @mouseenter="isMegaMenuItem(menu) && openMega(menu.id)"
                @mouseleave="isMegaMenuItem(menu) && scheduleCloseMega()"
                @focusin="isMegaMenuItem(menu) && openMega(menu.id)"
                @focusout="isMegaMenuItem(menu) && onMegaFocusOut($event, menu.id)"
              >
                <!-- Leaf -->
                <template v-if="menu.children.length === 0 && !isMegaMenuItem(menu)">
                  <a
                    v-if="!isInternalLink(menu.to)"
                    :href="menu.to"
                    :target="menu.target"
                    rel="noopener"
                    :class="{ 'router-link-active': isActiveMenu(menu) }"
                  >{{ menu.label }}</a>
                  <NuxtLink
                    v-else
                    :to="menu.to"
                    :class="{ 'router-link-active': isActiveMenu(menu) }"
                  >{{ menu.label }}</NuxtLink>
                </template>

                <!-- Mega menu -->
                <template v-else-if="isMegaMenuItem(menu)">
                  <a
                    href="#"
                    :class="{ 'router-link-active': isActiveMenu(menu) }"
                    :aria-expanded="openMegaId === menu.id"
                    @click.prevent="toggleMega(menu.id)"
                  >
                    {{ menu.label }}
                    <i class="fa fa-angle-down rs-arrow" />
                  </a>
                  <div
                    class="rs-mega-menu"
                    @click="onMegaPanelClick"
                    :class="[
                      `rs-mega-cols-${megaColumnGroups(menu).length > 1 ? Math.min(5, Math.max(2, megaColumnGroups(menu).length)) : megaColumns(menu)}`,
                      { 'rs-mega-menu--has-promos': menu.promos.length > 0 },
                    ]"
                  >
                    <div
                      class="rs-mega-inner"
                      :class="{ 'rs-mega-inner--with-promos': menu.promos.length > 0 }"
                    >
                      <div class="rs-mega-columns">
                        <div
                          v-for="group in megaColumnGroups(menu)"
                          :key="group.id"
                          class="rs-mega-column"
                        >
                          <h5
                            v-if="group.label"
                            class="rs-mega-heading"
                          >
                            {{ group.label }}
                          </h5>
                          <ul class="rs-mega-links">
                            <li
                              v-for="link in group.children"
                              :key="link.id"
                            >
                              <a
                                v-if="!isInternalLink(link.to) || isExternalUrl(link.to)"
                                :href="link.to"
                                :target="link.target || '_blank'"
                                rel="noopener noreferrer"
                              >
                                <span>{{ link.label }}</span>
                                <small v-if="link.subtitle">{{ link.subtitle }}</small>
                              </a>
                              <NuxtLink
                                v-else
                                :to="link.to"
                              >
                                <span>{{ link.label }}</span>
                                <small v-if="link.subtitle">{{ link.subtitle }}</small>
                              </NuxtLink>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div
                        v-if="menu.promos.length"
                        class="rs-mega-promos"
                      >
                        <article
                          v-for="promo in menu.promos"
                          :key="promo.id"
                          class="rs-mega-promo-card"
                        >
                          <div
                            v-if="promo.image"
                            class="rs-mega-promo-media"
                          >
                            <img
                              :src="promo.image"
                              :alt="promo.title"
                              loading="lazy"
                            >
                          </div>
                          <div class="rs-mega-promo-body">
                            <h6>{{ promo.title }}</h6>
                            <p v-if="promo.description">{{ promo.description }}</p>
                            <a
                              v-if="promo.url"
                              :href="promo.url"
                              class="rs-mega-promo-cta"
                              :target="isExternalUrl(promo.url) ? '_blank' : undefined"
                              :rel="isExternalUrl(promo.url) ? 'noopener noreferrer' : undefined"
                            >
                              {{ promo.button_text || 'Selengkapnya' }}
                              <i class="fa fa-arrow-right" />
                            </a>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Standard dropdown -->
                <template v-else>
                  <a
                    href="#"
                    @click.prevent
                    :class="{ 'router-link-active': isActiveMenu(menu) }"
                  >
                    {{ menu.label }}
                    <i class="fa fa-angle-down rs-arrow" />
                  </a>
                  <ul class="rs-submenu">
                    <li
                      v-for="child in menu.children"
                      :key="child.id"
                    >
                      <a
                        v-if="!isInternalLink(child.to)"
                        :href="child.to"
                        :target="child.target"
                        rel="noopener"
                        :class="{ 'router-link-active': isActiveMenu(child) }"
                      >{{ child.label }}</a>
                      <NuxtLink
                        v-else
                        :to="child.to"
                        :class="{ 'router-link-active': isActiveMenu(child) }"
                      >{{ child.label }}</NuxtLink>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </nav>
        </div>

        <!-- RIGHT: CTA + Search + Hamburger -->
        <div class="rs-header-right">
          <!-- Admission CTA (beside menu, right side) -->
          

          <!-- Search -->
          <div class="rs-header-search-wrapper" ref="searchWrapperRef">
            <button class="rs-search-icon-btn" :aria-label="isSearchOpen ? 'Tutup Pencarian' : 'Buka Pencarian'"
              @click.stop="isSearchOpen = !isSearchOpen">
              <i v-if="!isSearchOpen" class="las la-search"></i>
              <i v-else class="las la-times"></i>
            </button>
            <div class="rs-header-search-inner" :class="{ open: isSearchOpen }">
              <form class="rs-header-search-form" @submit.prevent="submitSearch">
                <input v-model="searchKeyword" type="text" placeholder="Cari..." autofocus
                  @keydown.esc="isSearchOpen = false" />
                <button type="submit" aria-label="Cari">
                  <i class="las la-search"></i>
                </button>
              </form>
            </div>
          </div>

          <QuickAccessToggle />

          <!-- Hamburger (mobile only) -->
          <div class="rs-header-hamburger">
            <button class="rs-hamburger-btn" :class="{ 'is-open': isMobileOpen }" aria-label="Toggle Menu"
              @click="isMobileOpen = !isMobileOpen">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

      </div><!-- /.rs-header-inner -->
    </div><!-- /.rs-header-area -->

    <!-- ── MOBILE BACKDROP ────────────────────────── -->
    <div class="rs-mobile-backdrop" :class="{ open: isMobileOpen }" @click="closeMobileDrawer" />

    <!-- ── MOBILE DRAWER ──────────────────────────── -->
    <div class="rs-mobile-drawer" :class="{ open: isMobileOpen }" role="dialog" aria-modal="true"
      aria-label="Mobile Navigation">

      <!-- Drawer header -->
      <div class="rs-drawer-header">
        <div class="rs-drawer-logo">
          <NuxtLink to="/" @click="closeMobileDrawer">
            <img :src="siteLogo" :alt="settings?.site_name || 'UMPKU'" />
          </NuxtLink>
        </div>
        <button class="rs-drawer-close" @click="closeMobileDrawer" aria-label="Tutup Menu">
          <i class="las la-times"></i>
        </button>
      </div>

      <!-- Drawer body: mobile menu -->
      <div class="rs-drawer-body">
        <ul class="rs-mobile-menu-list">
          <li
            v-for="menu in menus"
            :key="menu.id"
            class="rs-mobile-menu-item"
          >
            <template v-if="menu.children.length > 0 || isMegaMenuItem(menu)">
              <button
                class="rs-mobile-menu-link"
                :aria-expanded="!!openedMobileMenus[menu.id]"
                @click="toggleMobileMenu(menu.id)"
              >
                <span>{{ menu.label }}</span>
                <i
                  class="fa fa-angle-down rs-mobile-arrow"
                  :class="{ open: openedMobileMenus[menu.id] }"
                />
              </button>

              <ul
                v-show="openedMobileMenus[menu.id]"
                class="rs-mobile-submenu"
              >
                <!-- Mega hierarchy -->
                <template v-if="isMegaMenuItem(menu)">
                  <li
                    v-for="group in menu.children"
                    :key="group.id"
                    class="rs-mobile-mega-group"
                  >
                    <div class="rs-mobile-mega-heading">{{ group.label }}</div>
                    <ul class="rs-mobile-mega-links">
                      <li
                        v-for="link in group.children"
                        :key="link.id"
                      >
                        <a
                          v-if="!isInternalLink(link.to) || isExternalUrl(link.to)"
                          :href="link.to"
                          :target="link.target || '_blank'"
                          rel="noopener noreferrer"
                          @click="closeMobileDrawer"
                        >
                          <span>{{ link.label }}</span>
                          <small v-if="link.subtitle">{{ link.subtitle }}</small>
                        </a>
                        <NuxtLink
                          v-else
                          :to="link.to"
                          @click="closeMobileDrawer"
                        >
                          <span>{{ link.label }}</span>
                          <small v-if="link.subtitle">{{ link.subtitle }}</small>
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>

                  <li
                    v-for="promo in menu.promos"
                    :key="`promo-${promo.id}`"
                    class="rs-mobile-promo"
                  >
                    <a
                      v-if="promo.url"
                      :href="promo.url"
                      class="rs-mobile-promo-card"
                      :target="isExternalUrl(promo.url) ? '_blank' : undefined"
                      :rel="isExternalUrl(promo.url) ? 'noopener noreferrer' : undefined"
                      @click="closeMobileDrawer"
                    >
                      <img
                        v-if="promo.image"
                        :src="promo.image"
                        :alt="promo.title"
                        loading="lazy"
                      >
                      <div class="rs-mobile-promo-body">
                        <strong>{{ promo.title }}</strong>
                        <p v-if="promo.description">{{ promo.description }}</p>
                        <span>{{ promo.button_text || 'Selengkapnya' }}</span>
                      </div>
                    </a>
                  </li>
                </template>

                <!-- Standard dropdown -->
                <template v-else>
                  <li
                    v-for="child in menu.children"
                    :key="child.id"
                  >
                    <a
                      v-if="!isInternalLink(child.to)"
                      :href="child.to"
                      :target="child.target"
                      rel="noopener"
                      @click="closeMobileDrawer"
                    >{{ child.label }}</a>
                    <NuxtLink
                      v-else
                      :to="child.to"
                      @click="closeMobileDrawer"
                    >{{ child.label }}</NuxtLink>
                  </li>
                </template>
              </ul>
            </template>

            <template v-else>
              <a
                v-if="!isInternalLink(menu.to)"
                :href="menu.to"
                :target="menu.target"
                rel="noopener"
                class="rs-mobile-menu-link"
                @click="closeMobileDrawer"
              >
                <span>{{ menu.label }}</span>
              </a>
              <NuxtLink
                v-else
                :to="menu.to"
                class="rs-mobile-menu-link"
                @click="closeMobileDrawer"
              >
                <span>{{ menu.label }}</span>
              </NuxtLink>
            </template>
          </li>
        </ul>
      </div>

      <!-- Drawer footer: CTA -->
      <div class="rs-drawer-footer">
        <NuxtLink v-if="isInternalLink(pmbUrl)" :to="pmbUrl" class="rs-drawer-cta" @click="closeMobileDrawer">
          {{ $t('admission') }}
          <i class="las la-arrow-right"></i>
        </NuxtLink>
        <a v-else :href="pmbUrl" class="rs-drawer-cta" target="_blank" rel="noopener" @click="closeMobileDrawer">
          {{ $t('admission') }}
          <i class="las la-arrow-right"></i>
        </a>
      </div>

    </div><!-- /.rs-mobile-drawer -->

  </div><!-- /.rs-header-root -->

  <!-- Pushes hero below orangered topbar; main nav still overlays hero top -->
  <div
    class="rs-header-hero-offset"
    :class="{ 'is-active': showHeroOffset }"
    :style="showHeroOffset ? { height: `${topbarHeight}px` } : undefined"
    aria-hidden="true"
  />
</template>
