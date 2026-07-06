<script setup>
import { useMenus } from '~/composables/useMenus'
import MainMenu from '~/components/navigation/MainMenu.vue'
import MobileMenu from '~/components/navigation/MobileMenu.vue'

const { headerMenus, fetchHeaderMenus, isLoadingHeader } = useMenus()

// Fetch menus for SSR
await fetchHeaderMenus()
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      <span class="navbar-toggler-icon"></span>
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
      <template v-if="isLoadingHeader && (!headerMenus || headerMenus.length === 0)">
        <div class="d-flex justify-content-center w-100 py-3">
           <span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
        </div>
      </template>
      <template v-else>
        <!-- Desktop Menu -->
        <div class="d-none d-lg-block w-100">
          <MainMenu :menus="headerMenus" />
        </div>
        <!-- Mobile Accordion Menu -->
        <div class="d-block d-lg-none w-100 mt-3">
          <MobileMenu :menus="headerMenus" />
        </div>
      </template>
    </div>
  </nav>
</template>
