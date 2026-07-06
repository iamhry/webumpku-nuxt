<script setup lang="ts">
import { useQuickAccessStore } from '~/stores/quickAccess'

const store = useQuickAccessStore()
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="store.isOpen" 
      class="quick-access-overlay" 
      @click="store.close()"
    ></div>
  </Transition>
</template>

<style scoped>
.quick-access-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 46, 89, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
}

/* Fade Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
