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
        <Coin/>
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
}
#app {
    width: 100%;
    padding-top: 68px;
}
.container {
    width: 1000px;
    margin: 0 auto;
}
</style>
