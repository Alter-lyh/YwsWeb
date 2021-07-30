<template>
    <header class="header">
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
    height: 80px;
    background: #fff;
}
</style>
