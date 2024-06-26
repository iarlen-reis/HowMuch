// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_API_BASE,
    },
  },
});
