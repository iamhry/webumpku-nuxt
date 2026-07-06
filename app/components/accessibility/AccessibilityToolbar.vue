<template>
  <div class="accessibility-toolbar">
    <!-- Reading Guide -->
    <div 
      v-if="store.isReadingGuide"
      class="reading-guide-line"
      :style="{ top: `${mouseY}px` }"
    ></div>

    <!-- Reading Mask -->
    <div v-if="store.isReadingMask" class="reading-mask-overlay">
      <div class="reading-mask-top" :style="{ height: `${Math.max(0, mouseY - 50)}px` }"></div>
      <div class="reading-mask-clear" :style="{ top: `${Math.max(0, mouseY - 50)}px`, height: '100px' }"></div>
      <div class="reading-mask-bottom" :style="{ top: `${mouseY + 50}px` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAccessibilityStore } from '~/stores/accessibility'

const store = useAccessibilityStore()
const mouseY = ref(0)

const updateMousePosition = (e: MouseEvent) => {
  if (store.isReadingGuide || store.isReadingMask) {
    mouseY.value = e.clientY
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', updateMousePosition)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', updateMousePosition)
  }
})
</script>

<style scoped>
.reading-guide-line {
  position: fixed;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #f39c12;
  z-index: 100000;
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.reading-mask-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  pointer-events: none;
}

.reading-mask-top, .reading-mask-bottom {
  position: absolute;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  pointer-events: none;
}

.reading-mask-top {
  top: 0;
}

.reading-mask-bottom {
  bottom: 0;
}

.reading-mask-clear {
  position: absolute;
  left: 0;
  right: 0;
  background: transparent;
  pointer-events: none;
}
</style>
