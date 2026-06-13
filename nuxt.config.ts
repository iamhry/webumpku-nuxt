// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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
        { rel: 'stylesheet', href: '/assets/css/responsive.css' }
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
