<script setup lang="ts">
import AppHeaderUmpku from '~/components/layout/AppHeaderUmpku.vue'
</script>

<template>
  <div>
    <AppHeaderUmpku />
    <main>
      <slot />
    </main>
    <AppFooter />
    <QuickAccessSidebar />
    <QuickAccessOverlay />
    <FloatingBtnContainer />
    <ClientOnly>
      <AccessibilityWidget />
    </ClientOnly>
  </div>
</template>
