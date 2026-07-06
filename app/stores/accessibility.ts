import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAccessibilityStore = defineStore('accessibility', () => {
  // State
  const fontSizeMultiplier = ref(1) // 1 = 100%, 1.2 = 120%, etc
  const isHighContrast = ref(false)
  const isGrayscale = ref(false)
  const isHighlightLinks = ref(false)
  const isPauseAnimations = ref(false)
  
  const isReadingGuide = ref(false)
  const isReadingMask = ref(false)
  const isDyslexiaFont = ref(false)
  
  const isTextToSpeech = ref(false)
  const isKeyboardNavigation = ref(false)

  const isPanelOpen = ref(false)

  // Initialize from localStorage
  const init = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('accessibility_settings')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          fontSizeMultiplier.value = parsed.fontSizeMultiplier ?? 1
          isHighContrast.value = parsed.isHighContrast ?? false
          isGrayscale.value = parsed.isGrayscale ?? false
          isHighlightLinks.value = parsed.isHighlightLinks ?? false
          isPauseAnimations.value = parsed.isPauseAnimations ?? false
          isReadingGuide.value = parsed.isReadingGuide ?? false
          isReadingMask.value = parsed.isReadingMask ?? false
          isDyslexiaFont.value = parsed.isDyslexiaFont ?? false
          isTextToSpeech.value = parsed.isTextToSpeech ?? false
          isKeyboardNavigation.value = parsed.isKeyboardNavigation ?? false
        } catch (e) {
          console.error("Failed to parse accessibility settings", e)
        }
      }
      applyBodyClasses()
    }
  }

  // Save to localStorage
  const save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility_settings', JSON.stringify({
        fontSizeMultiplier: fontSizeMultiplier.value,
        isHighContrast: isHighContrast.value,
        isGrayscale: isGrayscale.value,
        isHighlightLinks: isHighlightLinks.value,
        isPauseAnimations: isPauseAnimations.value,
        isReadingGuide: isReadingGuide.value,
        isReadingMask: isReadingMask.value,
        isDyslexiaFont: isDyslexiaFont.value,
        isTextToSpeech: isTextToSpeech.value,
        isKeyboardNavigation: isKeyboardNavigation.value
      }))
      applyBodyClasses()
    }
  }

  // Apply classes to body
  const applyBodyClasses = () => {
    if (typeof document === 'undefined') return
    
    const body = document.body
    
    // Font Size
    document.documentElement.style.setProperty('--a11y-font-multiplier', fontSizeMultiplier.value.toString())
    if (fontSizeMultiplier.value > 1) {
      body.classList.add('large-text')
    } else {
      body.classList.remove('large-text')
    }

    // Toggles
    isHighContrast.value ? body.classList.add('high-contrast') : body.classList.remove('high-contrast')
    isGrayscale.value ? body.classList.add('grayscale') : body.classList.remove('grayscale')
    isHighlightLinks.value ? body.classList.add('highlight-links') : body.classList.remove('highlight-links')
    isPauseAnimations.value ? body.classList.add('pause-animation') : body.classList.remove('pause-animation')
    isDyslexiaFont.value ? body.classList.add('dyslexia-font') : body.classList.remove('dyslexia-font')
    isReadingGuide.value ? body.classList.add('reading-guide') : body.classList.remove('reading-guide')
    isReadingMask.value ? body.classList.add('reading-mask') : body.classList.remove('reading-mask')
    isKeyboardNavigation.value ? body.classList.add('keyboard-nav') : body.classList.remove('keyboard-nav')
  }

  // Actions
  const togglePanel = () => {
    isPanelOpen.value = !isPanelOpen.value
  }

  const increaseFontSize = () => {
    if (fontSizeMultiplier.value < 1.5) {
      fontSizeMultiplier.value += 0.1
      save()
    }
  }

  const decreaseFontSize = () => {
    if (fontSizeMultiplier.value > 0.8) {
      fontSizeMultiplier.value -= 0.1
      save()
    }
  }

  const toggleHighContrast = () => { isHighContrast.value = !isHighContrast.value; save() }
  const toggleGrayscale = () => { isGrayscale.value = !isGrayscale.value; save() }
  const toggleHighlightLinks = () => { isHighlightLinks.value = !isHighlightLinks.value; save() }
  const togglePauseAnimations = () => { isPauseAnimations.value = !isPauseAnimations.value; save() }
  const toggleReadingGuide = () => { isReadingGuide.value = !isReadingGuide.value; save() }
  const toggleReadingMask = () => { isReadingMask.value = !isReadingMask.value; save() }
  const toggleDyslexiaFont = () => { isDyslexiaFont.value = !isDyslexiaFont.value; save() }
  const toggleTextToSpeech = () => { isTextToSpeech.value = !isTextToSpeech.value; save() }
  const toggleKeyboardNavigation = () => { isKeyboardNavigation.value = !isKeyboardNavigation.value; save() }

  const reset = () => {
    fontSizeMultiplier.value = 1
    isHighContrast.value = false
    isGrayscale.value = false
    isHighlightLinks.value = false
    isPauseAnimations.value = false
    isReadingGuide.value = false
    isReadingMask.value = false
    isDyslexiaFont.value = false
    isTextToSpeech.value = false
    isKeyboardNavigation.value = false
    save()
  }

  // Watch for changes that might need immediate action besides CSS
  watch(isTextToSpeech, (val) => {
    if (!val && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  })

  return {
    // State
    isPanelOpen,
    fontSizeMultiplier,
    isHighContrast,
    isGrayscale,
    isHighlightLinks,
    isPauseAnimations,
    isReadingGuide,
    isReadingMask,
    isDyslexiaFont,
    isTextToSpeech,
    isKeyboardNavigation,
    // Actions
    init,
    togglePanel,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleGrayscale,
    toggleHighlightLinks,
    togglePauseAnimations,
    toggleReadingGuide,
    toggleReadingMask,
    toggleDyslexiaFont,
    toggleTextToSpeech,
    toggleKeyboardNavigation,
    reset
  }
})
