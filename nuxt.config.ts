export default defineNuxtConfig({
    runtimeConfig: {
      public: {
      MONGODB_URI: 'mongodb+srv://yordisdurango:zFgn8AsIBTI1rw03@cluster0.y6f8p.mongodb.net/',
      //MONGODB_URI: 'mongodb://localhost:27017',
      CLOUDINARY_CLOUD_NAME: 'dn4xdl2v5',
      CLOUDINARY_API_KEY: '357585198847445',
      CLOUDINARY_API_SECRET: 'odYQsXNPvjMByG800ToDDoEajlY',
      }
    },
    routeRules: {
      '/': { prerender: true },
      '/api/*': { prerender: true },
      '/page': {
        redirect: { to: '/new-page', statusCode: 302 }
      }
    },
  
    app: {
      head: {
        title: 'Rotaly Web',
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { charset: 'utf-8' }
        ],
        link: [
          {
            rel: 'icon',
            type: 'image/svg+xml',
            href: 'https://www.rotary.org/sites/all/themes/rotary_rotaryorg/images/rotary-logo-color-2019-simplified.svg'
          }
        ]
      }
    },
  
    css: [
      '@fortawesome/fontawesome-free/css/all.css' // Incluye FontAwesome CSS
    ]
  })
  