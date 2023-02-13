// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    pages: true,
    modules: ['@pinia/nuxt'],
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL
        },
    }
})
