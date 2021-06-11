<template>
    <header class="navbar-wrap">
        <nav class="navbar-inner">
            <div class="navbar-main-wrap">
                <nuxt-link to="/" class="logo"></nuxt-link>
                <div class="navbar-main">
                    <nuxt-link to="/bookstore" :class="[routeIndex == 2 ? 'active' : '']">书库</nuxt-link>
                    <nuxt-link to="/bookshelf" :class="[routeIndex == 3 ? 'active' : '']">书单</nuxt-link>
                    <nuxt-link to="/bookshelf" :class="[routeIndex == 3 ? 'active' : '']">帮助中心</nuxt-link>
                    <nuxt-link to="/bookshelf" :class="[routeIndex == 3 ? 'active' : '']">APP下载</nuxt-link>
                </div>
                <div class="search-view">
                    <el-input v-model="input" placeholder="请输入内容">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div>
            <div class="navbar-side">
                <div class="navbar-side-item">书架</div>
                <div class="navbar-side-item" @click="login">登录/注册</div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            input: ''
        };
    },
    computed: {
        routeIndex() {
            let routeIndex;
            switch (this.$route.path) {
                case "/":
                    routeIndex = 1;
                    break;
                case "/bookstore":
                    routeIndex = 2;
                    break;
                case "/bookshelf":
                    routeIndex = 3;
                    break;
            }
            return routeIndex;
        },
    },
    mounted() {
    },
    methods: {
        login() {
            this.$store.commit('updateLoginView', true)
        }
    }
};
</script>

<style scoped lang="less">
.navbar-wrap{
    width: 100%;
    height: 58px;
    background: #fff;
    box-shadow: 0 0 1px 0 rgba(0,0,0,.15);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    position: fixed;
    left: 0;
    top: 0;
}

.navbar-inner{
    width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navbar-main-wrap{
        display: flex;
        align-items: center;
        .logo{
            width: 100px;
            height: 30px;
            background: coral;
        }
        .navbar-main{
            margin: 0 40px;
            display: flex;
            align-items: center;
            a{
                height: 40px;
                line-height: 40px;
                cursor: pointer;
                font-size: 14px;
                margin: 0 10px;
            }
            a:nth-child(1){
                margin-left: 0;
            }
            .active{
                color: #557cea;
            }
        }
        .search-view{
            width: 200px;
            /deep/.el-input__inner{
                height: 38px;
            }
        }
    }
    .navbar-side{
        display: flex;
        align-items: center;
        .navbar-side-item{
            cursor: pointer;
            margin: 0 10px;
        }
        .navbar-side-item:nth-last-child(1){
            margin-right: 0;
        }
        .icon{
            font-size: 20px;
            margin: 0 10px;
            cursor: pointer;
        }
    }
}
</style>
