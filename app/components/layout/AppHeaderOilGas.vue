<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMenus } from '~/composables/useMenus'
import { useSettings } from '~/composables/useSettings'
import type { MenuItem as MenuItemType } from '~/types/menu'

// ─── Types ──────────────────────────────────────────────────────────────────
type HeaderMenu = {
  id: number | string
  label: string
  to: string
  target?: string
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

const siteLogo  = computed(() => settings.value?.logo  || fallback.logo)
const siteEmail = computed(() => settings.value?.email || fallback.email)
const sitePhone = computed(() => settings.value?.phone || fallback.phone)
const pmbUrl    = computed(() => fallback.pmbUrl)

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
    .sort((a, b) => ((a as any).order ?? (a as any).sort_order ?? 0) - ((b as any).order ?? (b as any).sort_order ?? 0))
    .map((item) => ({
      id: item.id,
      label: getTitle(item) || 'Menu',
      to: item.url || '#',
      target: item.target || '_self',
      children: Array.isArray(item.children) && item.children.length
        ? normalizeMenus(item.children)
        : []
    }))
}

const menus = computed<HeaderMenu[]>(() => normalizeMenus(headerMenus.value || []))

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
const scrolled          = ref(false)       // shrink main-nav (scrollY > 8)
const hideUtilityBar    = ref(false)       // collapse topbar (direction + threshold)
const lastScrollY       = ref(0)
const isSearchOpen      = ref(false)
const isMobileOpen      = ref(false)
const searchKeyword     = ref('')
const openedMobileMenus = ref<Record<string | number, boolean>>({})

// ─── Shrink-on-scroll (rAF-throttled, direction-aware) ───────────────────────
const SCROLL_SHRINK_THRESHOLD = 140
const UTILITY_HIDE_THRESHOLD  = 80
const DIRECTION_DELTA         = 6 // ignore tiny scroll noise / jitter

const headerRef = ref<HTMLElement | null>(null)

let scrollTicking = false

const updateScrollState = () => {
  const y = Math.max(0, window.scrollY)
  const delta = y - lastScrollY.value

  // Mobile drawer open → keep full-size header
  if (isMobileOpen.value) {
    scrolled.value = false
    hideUtilityBar.value = false
    lastScrollY.value = y
    scrollTicking = false
    return
  }

  scrolled.value = y > SCROLL_SHRINK_THRESHOLD

  if (Math.abs(delta) >= DIRECTION_DELTA) {
    if (delta > 0 && y > UTILITY_HIDE_THRESHOLD) {
      hideUtilityBar.value = true
    } else if (delta < 0) {
      hideUtilityBar.value = false
    }
  }

  // Near top: always restore utility bar
  if (y <= SCROLL_SHRINK_THRESHOLD) {
    hideUtilityBar.value = false
  }

  lastScrollY.value = y
  scrollTicking = false
}

const onScroll = () => {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(updateScrollState)
}

onMounted(() => {
  lastScrollY.value = window.scrollY
  updateScrollState()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
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

// Close mobile on route change
watch(() => route.fullPath, () => {
  isMobileOpen.value = false
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
  <div class="rs-header-root">
    <!-- ── TOPBAR (utility-bar) ────────────────────── -->
    <div
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

        <!-- Right: Social + Lang -->
        <div class="rs-header-top-right">
          <div class="rs-topbar-social">
            <a v-if="settings?.facebook" :href="settings.facebook" target="_blank" rel="noopener" aria-label="Facebook">
              <i class="lab la-facebook-f"></i>
            </a>
            <a v-if="settings?.instagram" :href="settings.instagram" target="_blank" rel="noopener" aria-label="Instagram">
              <i class="lab la-instagram"></i>
            </a>
            <a v-if="settings?.youtube" :href="settings.youtube" target="_blank" rel="noopener" aria-label="YouTube">
              <i class="lab la-youtube"></i>
            </a>
            <a v-if="settings?.linkedin" :href="settings.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i class="lab la-linkedin-in"></i>
            </a>
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
    <div
      ref="headerRef"
      class="rs-header-area"
      :class="{ 'rs-header-area--scrolled': scrolled && !isMobileOpen }"
    >
      <div class="rs-header-inner">

        <!-- LEFT: Logo in yellow block -->
        <div class="rs-header-left">
          <div class="rs-header-logo-wrapper">
            <div class="rs-header-logo">
              <NuxtLink to="/">
                <img :src="siteLogo" :alt="settings?.site_name || 'UMPKU'" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- CENTER: Social strip + Desktop Menu -->
        <div class="rs-header-menu">


          <!-- Desktop menu -->
          <nav class="rs-main-nav" aria-label="Main Navigation">
            <ul class="multipage-menu">
              <li
                v-for="menu in menus"
                :key="menu.id"
                :class="{ 'menu-item-has-children': menu.children.length > 0 }"
              >
                <!-- No children -->
                <template v-if="menu.children.length === 0">
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

                <!-- Has children -->
                <template v-else>
                  <a
                    href="#"
                    @click.prevent
                    :class="{ 'router-link-active': isActiveMenu(menu) }"
                  >
                    {{ menu.label }}
                    <i class="fa fa-angle-down rs-arrow"></i>
                  </a>
                  <ul class="rs-submenu">
                    <li v-for="child in menu.children" :key="child.id">
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

        <!-- RIGHT: Search + CTA + Hamburger -->
        <div class="rs-header-right">
          <!-- Search -->
          <div class="rs-header-search-wrapper" ref="searchWrapperRef">
            <button
              class="rs-search-icon-btn"
              :aria-label="isSearchOpen ? 'Tutup Pencarian' : 'Buka Pencarian'"
              @click.stop="isSearchOpen = !isSearchOpen"
            >
              <i v-if="!isSearchOpen" class="las la-search"></i>
              <i v-else class="las la-times"></i>
            </button>
            <div class="rs-header-search-inner" :class="{ open: isSearchOpen }">
              <form class="rs-header-search-form" @submit.prevent="submitSearch">
                <input
                  v-model="searchKeyword"
                  type="text"
                  placeholder="Cari..."
                  autofocus
                  @keydown.esc="isSearchOpen = false"
                />
                <button type="submit" aria-label="Cari">
                  <i class="las la-search"></i>
                </button>
              </form>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="rs-header-btn">
            <NuxtLink v-if="isInternalLink(pmbUrl)" :to="pmbUrl" class="rs-btn" style="color: white !important;">
              {{ $t('admission') }}
              <span class="rs-btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="currentColor">
                  <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"/>
                </svg>
              </span>
            </NuxtLink>
            <a v-else :href="pmbUrl" target="_blank" rel="noopener" class="rs-btn" style="color: white !important;">
              {{ $t('admission') }}
              <span class="rs-btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="currentColor">
                  <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"/>
                </svg>
              </span>
            </a>
          </div>

          <QuickAccessToggle />

          <!-- Hamburger (mobile only) -->
          <div class="rs-header-hamburger">
            <button
              class="rs-hamburger-btn"
              :class="{ 'is-open': isMobileOpen }"
              aria-label="Toggle Menu"
              @click="isMobileOpen = !isMobileOpen"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

      </div><!-- /.rs-header-inner -->
    </div>
    <!-- /.rs-header-area -->

    <!-- ── MOBILE BACKDROP ────────────────────────── -->
    <div
      class="rs-mobile-backdrop"
      :class="{ open: isMobileOpen }"
      @click="closeMobileDrawer"
    />

    <!-- ── MOBILE DRAWER ──────────────────────────── -->
    <div class="rs-mobile-drawer" :class="{ open: isMobileOpen }" role="dialog" aria-modal="true" aria-label="Mobile Navigation">

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
            <!-- Has children -->
            <template v-if="menu.children.length > 0">
              <button
                class="rs-mobile-menu-link"
                @click="toggleMobileMenu(menu.id)"
                :aria-expanded="!!openedMobileMenus[menu.id]"
              >
                <span>{{ menu.label }}</span>
                <i
                  class="fa fa-angle-down rs-mobile-arrow"
                  :class="{ open: openedMobileMenus[menu.id] }"
                ></i>
              </button>
              <ul v-show="openedMobileMenus[menu.id]" class="rs-mobile-submenu">
                <li v-for="child in menu.children" :key="child.id">
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
              </ul>
            </template>

            <!-- No children -->
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
        <NuxtLink v-if="isInternalLink(pmbUrl)" :to="pmbUrl" class="rs-drawer-cta" @click="closeMobileDrawer" style="color: white !important;">
          {{ $t('admission') }}
          <i class="las la-arrow-right"></i>
        </NuxtLink>
        <a v-else :href="pmbUrl" class="rs-drawer-cta" target="_blank" rel="noopener" style="color: white !important;">
          {{ $t('admission') }}
          <i class="las la-arrow-right"></i>
        </a>
      </div>

    </div><!-- /.rs-mobile-drawer -->

  </div><!-- /.rs-header-root -->
</template>
