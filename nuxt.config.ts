export default defineNuxtConfig({

    runtimeConfig: {
        public: {
            MONGODB_URI: 'mongodb://localhost:27017/',
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


})