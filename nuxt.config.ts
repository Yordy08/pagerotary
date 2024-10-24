export default defineNuxtConfig({
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    
      MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://yordisdurango:zFgn8AsIBTI1rw03@cluster0.y6f8p.mongodb.net/',
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'dn4xdl2v5',
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '357585198847445',
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'odYQsXNPvjMByG800ToDDoEajlY',
      CORREO: process.env.CORREO || 'emugameplay.tv@gmail.com',
      PASSWORD: process.env.PASSWORD || 'fuaq brxw tvyt oltk',
      PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000'
    
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
  ],

  compatibilityDate: '2024-10-19'
})
