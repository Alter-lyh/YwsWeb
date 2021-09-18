export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'yws-m',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: '//at.alicdn.com/t/font_1703717_x5x84zyhig.css',
            },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'vant/lib/index.css',
        '@/assets/iconfont/iconfont.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/vant',
        '@/plugins/filter',
        '@/plugins/api',
        { src: '@/plugins/localStorage.js', ssr: false }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        proxy: true,
        prefix: '/api/',
        credentials: true
    },

    proxy: {
        '/api/': {
            target: 'http://127.0.0.1:8038/api',//这个网站是开源的可以请求到数据的
            pathRewrite: {
                '^/api/': '/',
                changeOrigin: true
            }
        }
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    server: {
        port: 3002, // default: 3000
        host: '0.0.0.0', // default: localhost
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
