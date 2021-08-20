<template>
    <div id="app">
        <!-- <Loading :show="true"/> -->
        <Nuxt keep-alive :keep-alive-props="{ include: includeArr }"/>
        <Tabbar />
        <Sidebar />
        <Login/>
    </div>
</template>
<script>
export default {
  data(){
    return{
      includeArr:['home','novel','bookstore','bookshelf',],// 包括在内的组件，是否刷新
    }
  },
}
</script>
<style>
html,body {
    background-color: #f3f4f7;
    /* elementui */
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
    /* 淘票票 */
    /* font-family: 'Chinese Quote','Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif!important; */
}
p{
    margin: 0;
}
</style>
