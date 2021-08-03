<template>
    <header class="header">
        <nuxt-link to="/" class="logo"></nuxt-link>
        <div class="header-right">
            <div class="item">
                <van-icon name="search" size="1.2em"/>
            </div>
            <div class="item">
                <van-icon name="notes-o" size="1.2em"/>
            </div>
            <div class="item">
                <van-badge dot>
                    <van-icon name="bell" size="1.2em"/>
                </van-badge>
            </div>
            <div class="item">
                <img class="user-img" src="https://s2.ax1x.com/2019/10/14/KSoO3T.png" alt=""/>
            </div>
        </div>
    </header>
</template>

<script>
// import {clearToken, clearUserInfo} from "@/plugins/auth";
export default {
    data() {
        return {
            input: '',
        };
    },
    computed: {
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
        taskSignIn() {
            // const res = this.$api.taskApi.signIn()
            console.log(res);
        }
    }
};
</script>

<style scoped lang="less">
.header{
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    .logo{
        width: 200px;
        height: 60px;
        background: coral;
    }
    .header-right{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .item{
            margin-left: 30px;
            /deep/.van-badge--dot{
                width: 18px;
                height: 18px;
                background: #F56C6C;
            }
            .user-img{
                width: 60px;
                height: auto;
                display: block;
                border-radius: 50%;
            }
        }
    }
}
</style>
