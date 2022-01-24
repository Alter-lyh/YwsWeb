<template>
    <div class="main">
        <nuxt-link class="banner-view" :to="`/bookstore`">
        </nuxt-link >
        <div class="bookpage-layout-main">
            <HomeLeftSide :page="page" :pageAll="pageAll" :discussList="discussList" />
            <home-right-side />
        </div>
    </div>
</template>

<script>
export default {
    name:'home',
    data() {
        return {
            discussList: [],
            page: 1,
            pageAll: 1,
            beforeUrl: ''
        };
    },
    head() {
        return {
            meta: [
                { name: 'mobile-agent', content: 'format=html5; url=https://m.ywshuo.com/' },
                { hid: 'og:type', name: 'og:type', content: 'website' },
            ],
        }
    },
    async asyncData({ app, query, params }) {
        if (!process.server) return
        const res = await app.$api.novel.getRandomDiscuss({page: 1});
        if (res.code != '00') return {}
        const json = res.data
        let discussList = json.data
        discussList.map(item => {
            item.replayShow = false
            item.page = 1
            item.pageAll = 1
        })
        const pageAll = json.pageAll
        return {
            discussList,
            pageAll
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if(from.name) vm.beforeUrl = from.path
        });
    },
    async mounted() {
        if (this.beforeUrl == '') return
        await this.getRandomDiscuss()
    },
    methods: {
        async getRandomDiscuss() {
            const params = {
                page: this.page
            }
            try {
                const res = await this.$api.novel.getRandomDiscuss(params)
                if (res.code != '00') return
                const json = res.data
                this.discussList = json.data
                this.discussList.map(item => {
                    item.replayShow = false
                    item.page = 1
                    item.pageAll = 1
                })
                this.pageAll = json.pageAll
            } catch (error) {
                console.log(error);
            }
        },
    }
};
</script>

<style lang="less" scoped>
.banner-view {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    overflow: hidden;
    display: block;
    background: #333;
}
.bookpage-layout-main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
</style>
