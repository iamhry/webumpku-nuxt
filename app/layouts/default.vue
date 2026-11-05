<script setup lang="ts">
import AppHeader from '~/components/header/AppHeader.vue';

</script>

<template>
  <div>
    <AppHeader />
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
