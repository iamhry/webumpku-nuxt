<template>
  <div class="accessibility-wrapper">
    <AccessibilityButton />
    <AccessibilityPanel />
    <AccessibilityToolbar />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAccessibilityStore } from '~/stores/accessibility'
import AccessibilityButton from './AccessibilityButton.vue'
import AccessibilityPanel from './AccessibilityPanel.vue'
import AccessibilityToolbar from './AccessibilityToolbar.vue'

const store = useAccessibilityStore()

// Text to speech selection handler
const handleMouseUp = () => {
  if (store.isTextToSpeech && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const text = window.getSelection()?.toString().trim()
    if (text) {
      window.speechSynthesis.cancel() // stop current
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }
}

// Keyboard nav enhancements
const handleKeyDown = (e: KeyboardEvent) => {
  if (store.isKeyboardNavigation) {
    // Keyboard shortcut to toggle the panel
    if (e.altKey && e.key.toLowerCase() === 'a') {
      store.togglePanel()
      e.preventDefault()
    }
  }
}

onMounted(() => {
  // Client-only initialization to prevent hydration mismatch and read localStorage
  if (typeof window !== 'undefined') {
    store.init()
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<style>
/* Global Accessibility Classes applied to <body> */

/* 1. Large Text (Font Size scaling) */
:root {
  --a11y-font-multiplier: 1;
}

body.large-text p, 
body.large-text span, 
body.large-text a, 
body.large-text li, 
body.large-text div, 
body.large-text h1, 
body.large-text h2, 
body.large-text h3, 
body.large-text h4, 
body.large-text h5, 
body.large-text h6 {
  font-size: calc(inherit * var(--a11y-font-multiplier)) !important;
  line-height: calc(1.5 * var(--a11y-font-multiplier)) !important;
}

/* 2. High Contrast */
body.high-contrast {
  background-color: #000000 !important;
  color: #ffffff !important;
}
body.high-contrast * {
  background-color: #000000 !important;
  color: #ffffff !important;
  border-color: #ffffff !important;
}
body.high-contrast a {
  color: #ffff00 !important;
  text-decoration: underline !important;
}
body.high-contrast img, body.high-contrast video {
  filter: contrast(150%) !important;
}

/* 3. Grayscale */
body.grayscale {
  filter: grayscale(100%) !important;
}

/* 4. Highlight Links */
body.highlight-links a, body.highlight-links button {
  background-color: yellow !important;
  color: black !important;
  text-decoration: underline !important;
  font-weight: bold !important;
  border: 2px solid #000 !important;
}

/* 5. Pause Animations */
body.pause-animation *, body.pause-animation *:before, body.pause-animation *:after {
  animation-play-state: paused !important;
  transition: none !important;
  scroll-behavior: auto !important;
}

/* 6. Dyslexia Friendly Font */
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600&display=swap');
body.dyslexia-font, 
body.dyslexia-font * {
  /* Using Lexend which is recognized as highly legible and dyslexia-friendly, with fallbacks */
  font-family: 'Lexend', 'Comic Sans MS', 'Trebuchet MS', sans-serif !important;
  letter-spacing: 0.1em !important;
  word-spacing: 0.2em !important;
  line-height: 1.6 !important;
}

/* 7. Keyboard Navigation Enhanced Outline */
body.keyboard-nav *:focus-visible {
  outline: 4px solid #f39c12 !important;
  outline-offset: 4px !important;
  box-shadow: 0 0 0 4px rgba(0,0,0,0.8) !important;
  z-index: 9999;
}
</style>
