// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/typography.css',
    '~/assets/css/layout.css',
    '~/assets/css/components.css',
    '~/assets/css/utilities.css',
    '~/assets/css/animations.css',
    '~/assets/css/reveal.css',
    '~/assets/css/header-umpku.css',
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://cms.umpku.ac.id',
      storageUrl: process.env.NUXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'id',
    locales: [
      { code: 'id', iso: 'id-ID', file: 'id.json', name: 'Indonesia' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    lazy: true,
    langDir: 'locales/',
    customRoutes: 'config',
    pages: {
      'agenda/index': {
        id: '/agenda',
        en: '/events'
      },
      'agenda/[slug]': {
        id: '/agenda/[slug]',
        en: '/events/[slug]'
      },
      'news/index': {
        id: '/berita',
        en: '/news'
      },
      'news/[slug]': {
        id: '/berita/[slug]',
        en: '/news/[slug]'
      },
      'sdgs/index': {
        id: '/sdgs',
        en: '/sdgs'
      },
      'sdgs/[slug]': {
        id: '/sdgs/[slug]',
        en: '/sdgs/[slug]'
      },
      'fakultas/[slug]': {
        id: '/fakultas/[slug]',
        en: '/faculty/[slug]'
      },
      'program-studi/[slug]': {
        id: '/program-studi/[slug]',
        en: '/study-program/[slug]'
      },
      'kontak/index': {
        id: '/kontak',
        en: '/contact'
      },
      '[slug]': {
        id: '/profil/[slug]',
        en: '/profile/[slug]'
      }
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/assets/css/font-awesome.min.css' },
        { rel: 'stylesheet', href: '/assets/css/line-awesome.min.css' },
        { rel: 'stylesheet', href: '/assets/css/flaticon.css' },
        { rel: 'stylesheet', href: '/assets/css/animate.css' },
        { rel: 'stylesheet', href: '/assets/css/owl.carousel.css' },
        { rel: 'stylesheet', href: '/assets/css/owl.theme.default.css' },
        { rel: 'stylesheet', href: '/assets/css/magnific-popup.css' },
        { rel: 'stylesheet', href: '/assets/css/barfiller.css' },
        { rel: 'stylesheet', href: '/assets/css/style.css' },
        { rel: 'stylesheet', href: '/assets/css/responsive.css' },
        { rel: 'stylesheet', href: '/assets/css/layout-override.css' },
        { rel: 'stylesheet', href: '/assets/css/layout.css' },
        { rel: 'stylesheet', href: '/assets/css/dynamic-menu.css' },
        { rel: 'stylesheet', href: '/assets/css/container-laboratory.css' },
        { rel: 'stylesheet', href: '/assets/css/editorial-article.css' },
        { rel: 'stylesheet', href: '/assets/css/reputation.css' },
        { rel: 'stylesheet', href: '/assets/css/campus-services.css' },
        { rel: 'stylesheet', href: '/assets/css/faculty-modern.css' },
        { rel: 'stylesheet', href: '/assets/css/faculty-detail.css' },
        { rel: 'stylesheet', href: '/assets/css/study-program-detail.css' },
        { rel: 'stylesheet', href: '/assets/css/campus-gallery.css' },
        { rel: 'stylesheet', href: '/assets/css/dynamic-page.css' },
        { rel: 'stylesheet', href: '/assets/css/contact-page.css' }
      ],
      script: [
        { src: '/assets/js/jquery-1.12.4.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/popper.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/bootstrap.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/owl.carousel.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/wow.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/jquery.waypoints.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/jquery.counterup.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/magnific-popup.min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/jquery.barfiller.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/jquery.sticky.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/isotope-3.0.6-min.js', tagPosition: 'bodyClose' },
        { src: '/assets/js/main.js', tagPosition: 'bodyClose' }
      ]
    }
  }
})
