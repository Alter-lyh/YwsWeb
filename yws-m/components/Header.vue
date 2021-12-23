<template>
    <header class="header">
        <nuxt-link to="/" class="logo"></nuxt-link>
        <div class="header-right">
            <nuxt-link to="/search" class="item">
                <van-icon name="search" size="1.2em"/>
            </nuxt-link>
            <div class="item" v-show="!loginStatus" @click="login">登录/注册</div>
            <div class="item" v-show="loginStatus" @click="toastTips">
                <van-icon name="notes-o" size="1.2em"/>
            </div>
            <div class="item" v-show="loginStatus" @click="toastTips">
                <van-badge dot>
                    <van-icon name="bell" size="1.2em"/>
                </van-badge>
            </div>
            <van-popover
                v-model="showPopover"
                trigger="click"
                :actions="actions"
                @select="onSelect"
                placement="bottom-end"
                :offset="[6, 8]"
                class="item"
                v-show="loginStatus"
                >
                <template #reference>
                    <img class="user-img" src="https://s2.ax1x.com/2019/10/14/KSoO3T.png" alt=""/>
                </template>
            </van-popover>
        </div>
    </header>
</template>

<script>
import {clearToken, clearUserInfo} from "@/plugins/auth";
export default {
    data() {
        return {
            input: '',
            showPopover: false,
            // 通过 actions 属性来定义菜单选项
            actions: [{ text: '我的书架' }, { text: '我的书评' }, { text: '我的书单' }, { text: '我的收藏' }, { text: '个人设置' }, { text: '退出' }],
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
        onSelect(action) {
            if (action.text == '退出') {
                this.logout()
                return
            }
            this.$toast(action.text);
        },
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
        },
        toastTips() {
            this.$toast('正在开发中');
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
            display: flex;
            align-items: center;
            line-height: normal;
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
<style lang="less">
.van-popover__arrow{
    right: 16px!important;
}
</style>
