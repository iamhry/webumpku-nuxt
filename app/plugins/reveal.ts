export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el) {
      if (import.meta.server) return
      
      el.classList.add('reveal')

      const delay = el.dataset.revealDelay || '0'
      el.style.setProperty('--reveal-delay', `${delay}ms`)

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
      })

      observer.observe(el)
      // @ts-ignore
      el.__revealObserver = observer
    },

    unmounted(el) {
      if (import.meta.server) return
      // @ts-ignore
      el.__revealObserver?.disconnect()
    },

    getSSRProps(binding, vnode) {
      // Extract delay from node's props/dataset if available
      // The template binds it as data-reveal-delay
      const props = vnode?.props || {}
      const delay = props['data-reveal-delay'] || '0'
      
      return {
        class: 'reveal',
        style: {
          '--reveal-delay': `${delay}ms`
        }
      }
    }
  })
})
