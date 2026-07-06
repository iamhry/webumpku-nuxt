<template>
  <div 
    v-if="store.isPanelOpen"
    class="accessibility-panel"
    role="dialog"
    aria-labelledby="a11y-panel-title"
    aria-modal="true"
  >
    <div class="panel-header">
      <h2 id="a11y-panel-title">Accessibility Tools</h2>
      <button class="close-btn" @click="store.togglePanel" aria-label="Close Accessibility Menu">
        &times;
      </button>
    </div>

    <div class="panel-content">
      <!-- Tahap 1 -->
      <section class="a11y-section">
        <h3>Font Adjustments</h3>
        <div class="action-grid">
          <button @click="store.increaseFontSize" class="a11y-btn" aria-label="Increase Font Size">
            <span class="icon">A+</span> Increase Text
          </button>
          <button @click="store.decreaseFontSize" class="a11y-btn" aria-label="Decrease Font Size">
            <span class="icon">A-</span> Decrease Text
          </button>
        </div>
      </section>

      <section class="a11y-section">
        <h3>Display Options</h3>
        <div class="action-grid">
          <button 
            @click="store.toggleHighContrast" 
            :class="['a11y-btn', { active: store.isHighContrast }]"
            :aria-pressed="store.isHighContrast"
          >
            <span class="icon">◑</span> High Contrast
          </button>
          <button 
            @click="store.toggleGrayscale" 
            :class="['a11y-btn', { active: store.isGrayscale }]"
            :aria-pressed="store.isGrayscale"
          >
            <span class="icon">◧</span> Grayscale
          </button>
          <button 
            @click="store.toggleHighlightLinks" 
            :class="['a11y-btn', { active: store.isHighlightLinks }]"
            :aria-pressed="store.isHighlightLinks"
          >
            <span class="icon">🔗</span> Highlight Links
          </button>
          <button 
            @click="store.togglePauseAnimations" 
            :class="['a11y-btn', { active: store.isPauseAnimations }]"
            :aria-pressed="store.isPauseAnimations"
          >
            <span class="icon">⏸</span> Pause Animations
          </button>
        </div>
      </section>

      <!-- Tahap 2 & 3 -->
      <section class="a11y-section">
        <h3>Reading Assistance</h3>
        <div class="action-grid">
          <button 
            @click="store.toggleReadingGuide" 
            :class="['a11y-btn', { active: store.isReadingGuide }]"
            :aria-pressed="store.isReadingGuide"
          >
            <span class="icon">▬</span> Reading Guide
          </button>
          <button 
            @click="store.toggleReadingMask" 
            :class="['a11y-btn', { active: store.isReadingMask }]"
            :aria-pressed="store.isReadingMask"
          >
            <span class="icon">⬛</span> Reading Mask
          </button>
          <button 
            @click="store.toggleDyslexiaFont" 
            :class="['a11y-btn', { active: store.isDyslexiaFont }]"
            :aria-pressed="store.isDyslexiaFont"
          >
            <span class="icon">Abc</span> Dyslexia Friendly
          </button>
          <button 
            @click="store.toggleTextToSpeech" 
            :class="['a11y-btn', { active: store.isTextToSpeech }]"
            :aria-pressed="store.isTextToSpeech"
          >
            <span class="icon">🔊</span> Text to Speech
          </button>
          <button 
            @click="store.toggleKeyboardNavigation" 
            :class="['a11y-btn', { active: store.isKeyboardNavigation }]"
            :aria-pressed="store.isKeyboardNavigation"
          >
            <span class="icon">⌨</span> Keyboard Nav
          </button>
        </div>
      </section>

      <section class="a11y-section reset-section">
        <button @click="store.reset" class="a11y-btn a11y-btn-danger" aria-label="Reset All Accessibility Settings">
          Reset All Settings
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccessibilityStore } from '~/stores/accessibility'

const store = useAccessibilityStore()
</script>

<style scoped>
.accessibility-panel {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 360px;
  max-height: calc(100vh - 120px);
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
  border: 1px solid #e2e8f0;
}

/* For dark mode / high contrast fallbacks in the panel itself */
:global(.high-contrast) .accessibility-panel {
  background: #000 !important;
  color: #fff !important;
  border: 2px solid #fff !important;
}
:global(.high-contrast) .accessibility-panel .panel-header {
  background: #000 !important;
  color: #fff !important;
  border-bottom: 2px solid #fff !important;
}

.panel-header {
  padding: 16px 20px;
  background: var(--primary-color, #0b2e59);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 5px;
}

.close-btn:focus-visible {
  outline: 2px solid #f39c12;
}

.panel-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.a11y-section {
  margin-bottom: 24px;
}

.a11y-section h3 {
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
  font-weight: 600;
}

:global(.high-contrast) .a11y-section h3 {
  color: #ffcc00 !important;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.a11y-btn {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 12px 8px;
  font-size: 0.85rem;
  color: #334155;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  transition: all 0.2s;
  font-weight: 500;
}

.a11y-btn .icon {
  font-size: 1.25rem;
  display: block;
}

.a11y-btn:hover, .a11y-btn:focus-visible {
  background: #e2e8f0;
  border-color: #94a3b8;
  outline: none;
}

.a11y-btn:focus-visible {
  outline: 2px solid #0b2e59;
  outline-offset: 2px;
}

.a11y-btn.active {
  background: var(--primary-color, #0b2e59);
  color: white;
  border-color: var(--primary-color, #0b2e59);
}

.a11y-btn.active .icon {
  color: white;
}

:global(.high-contrast) .a11y-btn {
  background: #000 !important;
  color: #fff !important;
  border: 2px solid #fff !important;
}
:global(.high-contrast) .a11y-btn.active {
  background: #fff !important;
  color: #000 !important;
}

.reset-section {
  margin-top: 10px;
  margin-bottom: 0;
}

.a11y-btn-danger {
  width: 100%;
  background: #fee2e2;
  color: #dc2626;
  border-color: #f87171;
  padding: 12px;
  font-size: 0.95rem;
}

.a11y-btn-danger:hover, .a11y-btn-danger:focus-visible {
  background: #fca5a5;
  color: #b91c1c;
}

:global(.high-contrast) .a11y-btn-danger {
  background: #000 !important;
  color: #ff3333 !important;
  border: 2px solid #ff3333 !important;
}

@media (max-width: 768px) {
  .accessibility-panel {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-height: 100vh;
    border-radius: 0;
    border: none;
  }
  
  .panel-header {
    padding: 20px;
  }
  
  .panel-content {
    padding: 20px;
    padding-bottom: 100px; /* Space for the floating button or safe area */
  }
}
</style>
