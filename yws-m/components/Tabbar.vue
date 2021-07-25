<template>
    <div class="tabbar">
        <div class="item">
            <i class="iconfont icon-dingdan1"></i>
            <span>书架</span>
        </div>
        <nuxt-link to="/" :class="['item', this.$route.path == '/' ? 'active' : '']">
            <i class="iconfont icon-shuchengxuanzhong"></i>
            <span>首页</span>
        </nuxt-link>
        <nuxt-link to="/bookstore" :class="['item', this.$route.path == '/bookstore' ? 'active' : '']">
            <i class="iconfont icon-faxian3"></i>
            <span>发现</span>
        </nuxt-link>
        <div class="item">
            <i class="iconfont icon-biaoqing2"></i>
            <span>我的</span>
        </div>
    </div>
</template>

<script>
export default {
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
