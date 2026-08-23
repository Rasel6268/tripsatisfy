import conf from "./config.js";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s - ${conf.APP_NAME}`,
    title: conf.APP_NAME,
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "facebook-domain-verification",
        content: "2w53cqpjqnp217ddvxgk3vf619gxra",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/assets/images/logo/favicon.svg",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/assets/css/bootstrap/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/assets/css/style.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css",
      },
      { rel: "stylesheet", type: "text/css", href: "/assets/css/custom.css" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css",
      },
    ],
    script: [
      { src: "/assets/js/bootstrap.bundle.min.js", body: true },
      {
        src: "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js",
        body: true,
      },
      { src: "https://code.jquery.com/jquery-3.6.0.js", body: true },
      { src: "https://code.jquery.com/ui/1.13.2/jquery-ui.js", body: true },
      { src: "/assets/js/tooltip/tooltip.js", body: true },
      {
        src: "https://accounts.google.com/gsi/client",
        async: true,
        defer: true,
      },
      // REMOVE THIS (deprecated): { src: 'https://apis.google.com/js/api:client.js' },
      { src: "/assets/js/bootstrap.bundle.min.js", body: true },

      { src: "/assets/js/select/custom-select.js", body: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  loadingIndicator: {
    name: "circle",
    color: "#3B8070",
    background: "white",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/somePlugins", ssr: false },
    { src: "~/plugins/Api", ssr: false },
    { src: "~/plugins/log", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: conf.BACKEND_API,
    browserBaseURL: conf.BACKEND_API,
  },

  /*
   ** Server Middleware
   */
  serverMiddleware: ["~/api/index.js"],
  env: {
    ROOT_URL: process.env.ROOT_URL || conf.baseURL,
    ...conf,
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "access",
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: { url: "/logout", method: "post" },
          user: {
            url: "/user",
            method: "get",
          },
        },
      },
    },
  },
};
