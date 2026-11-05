<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenus } from '~/composables/useMenus'
import { useSettings } from '~/composables/useSettings'
import { useHeaderScroll } from '~/composables/useHeaderScroll'
import { useHeaderMenu } from '~/composables/useHeaderMenu'

import HeaderTopBar from './HeaderTopBar.vue'
import HeaderDesktopNav from './HeaderDesktopNav.vue'
import HeaderSearch from './HeaderSearch.vue'
import HeaderHamburgerBtn from './HeaderHamburgerBtn.vue'
import HeaderMobileDrawer from './HeaderMobileDrawer.vue'

const route = useRoute()
const { settings, fetchSettings } = useSettings()
const { headerMenus, fetchHeaderMenus } = useMenus()

await Promise.all([fetchSettings(), fetchHeaderMenus()])

const fallback = {
  email: 'info@umpku.ac.id',
  phone: '+62 271 857762',
  schedule: 'Senin - Sabtu 08.00 - 16.00',
  logo: '/assets/img/logo.png',
  pmbUrl: 'https://pmb.umpku.ac.id'
}

const isMobileOpen = ref(false)

const {
  menus,
  openMegaId,
  isMegaOpen,
  openMega,
  closeMega,
  toggleMega,
  scheduleCloseMega,
  onMegaFocusOut,
  isMegaMenuItem,
  megaColumns,
  megaColumnGroups,
  isInternalLink,
  isActiveMenu
} = useHeaderMenu(headerMenus)

const {
  hideUtilityBar,
  topbarRef,
  topbarHeight,
  isHeaderWide,
  isHeroOverlayPage,
  isHeaderTransparent,
  showHeroOffset
} = useHeaderScroll({ isMobileOpen, isMegaOpen })

const siteLogo = computed(() => settings.value?.logo || fallback.logo)
const scrolledLogo = '/assets/img/umpku_logotype.png'
const useCompactLogo = computed(() => isHeaderWide.value || isMegaOpen.value)

watch(() => route.fullPath, () => {
  isMobileOpen.value = false
  closeMega()
  if (import.meta.client) document.body.style.overflow = ''
})

watch(isMobileOpen, (val) => {
  if (import.meta.client) document.body.style.overflow = val ? 'hidden' : ''
})
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
    <!-- TOPBAR -->
    <div
      ref="topbarRef"
      class="rs-header-top"
      :class="{ 'rs-header-top--hidden': hideUtilityBar && !isMobileOpen }"
    >
      <HeaderTopBar
        :email="settings?.email || fallback.email"
        :phone="settings?.phone || fallback.phone"
        :facebook="settings?.facebook"
        :instagram="settings?.instagram"
        :youtube="settings?.youtube"
        :linkedin="settings?.linkedin"
      />
    </div>

    <!-- MAIN HEADER -->
    <div class="rs-header-area" :class="{ 'rs-header-area--scrolled': isHeaderWide }">
      
      <div class="rs-header-inner">
        <!-- Logo -->
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

        <!-- Desktop Navigation -->
        <HeaderDesktopNav
          :menus="menus"
          :open-mega-id="openMegaId"
          :is-mega-menu-item="isMegaMenuItem"
          :mega-columns="megaColumns"
          :mega-column-groups="megaColumnGroups"
          :is-internal-link="isInternalLink"
          :is-active-menu="isActiveMenu"
          @open-mega="openMega"
          @close-mega="closeMega"
          @toggle-mega="toggleMega"
          @schedule-close-mega="scheduleCloseMega"
          @mega-focus-out="onMegaFocusOut"
        />

        <!-- Action Controls -->
        <div class="rs-header-right">
          <HeaderSearch />
          <QuickAccessToggle />
          <HeaderHamburgerBtn v-model="isMobileOpen" />
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <HeaderMobileDrawer
      :is-open="isMobileOpen"
      :menus="menus"
      :site-logo="siteLogo"
      :site-name="settings?.site_name"
      :pmb-url="fallback.pmbUrl"
      @close="isMobileOpen = false"
    />
  </div>

  <div
    class="rs-header-hero-offset"
    :class="{ 'is-active': showHeroOffset }"
    :style="showHeroOffset ? { height: `${topbarHeight}px` } : undefined"
    aria-hidden="true"
  />
</template>

<style scoped>
@media (max-width: 1199.98px) {
  :deep(.rs-header-menu) {
    display: none !important;
  }

  .rs-header-inner {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    flex-wrap: nowrap !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .rs-header-left {
    flex-shrink: 0;
    max-width: 55%;
  }

  .rs-header-logo-link {
    display: inline-flex;
    align-items: center;
  }

  .rs-header-logo-img {
    height: 38px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }

  .rs-header-right {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 8px !important;
    flex-shrink: 0 !important;
  }
}

@media (max-width: 575.98px) {
  .rs-header-inner {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  .rs-header-logo-img {
    height: 32px;
  }

  .rs-header-right {
    gap: 6px !important;
  }
}
</style>