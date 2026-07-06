<template>
  <button 
    class="accessibility-button" 
    @click="store.togglePanel"
    aria-label="Toggle Accessibility Menu"
    title="Accessibility Options"
    :aria-expanded="store.isPanelOpen"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="7" r="2"></circle>
      <path d="M16 11h-8"></path>
      <path d="M12 11v6"></path>
      <path d="M10 20l2-3 2 3"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useAccessibilityStore } from '~/stores/accessibility'

const store = useAccessibilityStore()
</script>

<style scoped>
.accessibility-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f5b301;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s;
}

.accessibility-button:hover, .accessibility-button:focus-visible {
  transform: scale(1.1);
  background-color: #e5a801;
  outline: 3px solid #111; /* High contrast outline for focus */
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .accessibility-button {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
}
</style>
