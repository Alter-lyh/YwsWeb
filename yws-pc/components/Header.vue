<template>
    <header class="navbar-wrap">
        <nav class="navbar-inner">
            <div class="navbar-main-wrap">
                <nuxt-link to="/" class="logo"></nuxt-link>
                <div class="navbar-main">
                    <nuxt-link to="/bookstore" :class="[routeIndex == 2 ? 'active' : '']">书库</nuxt-link>
                    <nuxt-link to="/booklist" :class="[routeIndex == 3 ? 'active' : '']">书单</nuxt-link>
                    <nuxt-link to="/notice" :class="['notice', routeIndex == 5 ? 'active' : '']">全民持股</nuxt-link>
                    <!-- <nuxt-link to="/bookshelf" :class="[routeIndex == 3 ? 'active' : '']">帮助中心</nuxt-link>
                    <nuxt-link to="/bookshelf" :class="[routeIndex == 3 ? 'active' : '']">APP下载</nuxt-link> -->
                </div>
                <div class="search-view">
                    <el-input v-model="input" placeholder="请输入内容" @change="onSearch">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div>
            <div class="navbar-side">
                <!-- <div class="navbar-side-item">足迹</div> -->
                <div class="navbar-side-item" @click="login" v-show="!loginStatus">登录/注册</div>
                
                <nuxt-link to="/bookshelf" :class="['navbar-side-item', routeIndex == 4 ? 'active' : '']" v-show="loginStatus">
                    <el-tooltip class="item" effect="dark" content="书架" placement="bottom">
                        <i class="el-icon-notebook-2"></i>
                    </el-tooltip>
                </nuxt-link>
                <div class="navbar-side-item" v-show="loginStatus" @click="taskSignIn">
                    <el-tooltip class="item" effect="dark" content="签到" placement="bottom">
                        <i class="el-icon-date"></i>
                    </el-tooltip>
                </div>
                <!-- <el-badge is-dot class="navbar-side-item" v-show="loginStatus"><i class="el-icon-bell"></i></el-badge> -->

                <el-dropdown class="navbar-side-item" v-show="loginStatus" placement="bottom">
                    <img class="user-img" src="https://s2.ax1x.com/2019/10/14/KSoO3T.png" alt=""/>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>{{userInfo.name}}</el-dropdown-item>
                        <el-dropdown-item :divided="true">我的书架</el-dropdown-item>
                        <el-dropdown-item>我的书评</el-dropdown-item>
                        <el-dropdown-item>我的书单</el-dropdown-item>
                        <el-dropdown-item>我的收藏</el-dropdown-item>
                        <el-dropdown-item :divided="true">个人设置</el-dropdown-item>
                        <el-dropdown-item :divided="true" @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </nav>
    </header>
</template>

<script>
import {clearToken, clearUserInfo} from "@/plugins/auth";
export default {
    data() {
        return {
            input: '',
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
                case "/booklist":
                    routeIndex = 3;
                    break;
                case "/bookshelf":
                    routeIndex = 4;
                    break;
                case "/notice":
                    routeIndex = 5;
                    break;
            }
            return routeIndex;
        },
        loginStatus() {
            return this.$store.getters.getLoginStatus
        },
        userInfo() {
            return this.$store.getters.getUserInfo
        }
    },
    mounted() {
    },
    methods: {
        login() {
            this.$store.commit('updateLoginView', true)
        },
        logout() {
            clearToken()
            clearUserInfo()
            this.$store.commit('updateLoginStatus', false)
            this.$store.commit('setUserInfo', {name: '默认用户'})
        },
        async taskSignIn() {
            const res = await this.$api.taskApi.signIn()
            if (res.code == '00') this.$message.success('签到成功');
        },
        // 搜索
        async onSearch() {
            if (this.input.trim() == '') {
                this.$toast('关键词不可为空')
                return
            }
            this.input = this.input.trim()
            window.location.href = `/search?keyword=${this.input}`
        },
    }
};
</script>

<style scoped lang="less">
.navbar-wrap{
    width: 100vw;
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
    min-width: 1000px;
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
            .notice{
                color: red;
                font-size: 18px;
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
            i{
                font-size: 18px;
            }
            .user-img{
                width: 36px;
                height: auto;
                display: block;
                border-radius: 50%;
            }
        }
        .navbar-side-item:nth-last-child(1){
            margin-right: 0;
        }
        .icon{
            font-size: 20px;
            margin: 0 10px;
            cursor: pointer;
        }
        .active{
            color: #557cea;
        }
    }
}
</style>
