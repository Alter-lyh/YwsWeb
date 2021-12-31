export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: '全站书库_阅文说',
        meta: [
            { charset: 'utf-8' },
            { lang:'zh-CN' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'author', content: 'safe' },
            { hid: 'og:title', name: 'og:title', content: '全站书库_阅文说' },
            { hid: 'keywords', name: 'keywords', content: '小说推荐, 读者评分, 书单分享, 正版阅读, 全站书库' },
            { hid: 'og:keywords', name: 'og:keywords', content: '小说推荐, 读者评分, 书单分享, 正版阅读, 全站书库' },
            { hid: 'description', name: 'description', content: '阅文说（www.ywshuo.com）是集小说推荐、正版阅读、读者评分、书单分享于一体，收录全网小说的书库，在这里不但可以追看小说最新更新,还可以解决书荒寻找到更多更好看的小说！' },
            { hid: 'og:description', name: 'og:description', content: '阅文说（www.ywshuo.com）是集小说推荐、正版阅读、读者评分、书单分享于一体，收录全网小说的书库，在这里不但可以追看小说最新更新,还可以解决书荒寻找到更多更好看的小说！' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'assets/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/api',
        '@/plugins/filter',
        { src: '@/plugins/localStorage.js', ssr: false }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
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

    router: {
        middleware: ['isMobile'],
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    server: {
        port: 3001, // default: 3000
        host: '0.0.0.0', // default: localhost
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^element-ui/],
    }
}
