<template>
    <div class="tabbar" v-show="[1,2,3,4,5].indexOf(routeIndex) != -1">
        <nuxt-link to="/bookshelf" :class="['item', this.$route.path == '/bookshelf' ? 'active' : '']">
            <i class="iconfont icon-dingdan1"></i>
            <span>书架</span>
        </nuxt-link>
        <nuxt-link to="/" :class="['item', this.$route.path == '/' ? 'active' : '']">
            <i class="iconfont icon-shuchengxuanzhong"></i>
            <span>首页</span>
        </nuxt-link>
        <nuxt-link to="/bookstore" :class="['item', this.$route.path == '/bookstore' ? 'active' : '']">
            <i class="iconfont icon-faxian3"></i>
            <span>书库</span>
        </nuxt-link>
        <nuxt-link to="/booklist" :class="['item', this.$route.path == '/booklist' ? 'active' : '']">
            <i class="iconfont icon-text"></i>
            <span>书单</span>
        </nuxt-link>
        <nuxt-link to="/user" :class="['item', this.$route.path == '/user' ? 'active' : '']">
            <i class="iconfont icon-biaoqing2"></i>
            <span>我的</span>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    computed: {
        routeIndex() {
            let routeIndex;
            switch (this.$route.path) {
                case "/":
                    routeIndex = 1;
                    break;
                case "/bookshelf":
                    routeIndex = 2;
                    break;
                case "/bookstore":
                    routeIndex = 3;
                    break;
                case "/booklist":
                    routeIndex = 4;
                    break;
                case "/user":
                    routeIndex = 5;
                    break;
            }
            return routeIndex;
        },
    },
};
</script>

<style lang="less">
.tabbar{
    width: 100%;
    height: 110px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .item{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #B5B5B5;
        i{
            font-size: 48px;
        }
    }
    .active{
        color: #fc725f;
    }
}
</style>
