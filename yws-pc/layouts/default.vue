<template>
    <div id="app">
        <Header />
        <Nuxt
            class="container"
            keep-alive
            :keep-alive-props="{ include: includeArr }"
        />
        <Sidebar/>
        <Login/>
        <BooklistAdd/>
    </div>
</template>
<script>
import "@/assets/css/base.css";
export default {
    data() {
        return {
            includeArr: [
                'home',
                'bookstore',
                'bookshelf',
                'novel'
            ], // 包括在内的组件，是否keepalive
        };
    },
};
</script>
<style lang="less">
html,
body {
    background-color: #f3f4f7;
    min-width: 1100px;
    overflow-x: hidden;
}
#app {
    width: 100vw;
    padding-top: 68px;
}
.container {
    width: 1000px;
    margin: 0 auto;
}
.el-button{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
}
</style>
