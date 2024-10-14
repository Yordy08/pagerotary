// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    'bootstrap/dist/css/bootstrap.css',
    // Agregamos CSS de Owl Carousel
    'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css',
    // Agregamos CSS de Font Awesome
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
  ],

  head: {
    script: [
      { src: 'https://code.jquery.com/jquery-3.5.1.min.js', type: 'text/javascript', defer: true }, // jQuery
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.11/typed.min.js', type: 'text/javascript', defer: true }, // Typed.js
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js', type: 'text/javascript', defer: true }, // Waypoints
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', type: 'text/javascript', defer: true } // OwlCarousel JS
    ]
  },

  build: {
    transpile: [],
  },

  vite: {
    optimizeDeps: {
      include: ['bootstrap']
    }
  }
});
