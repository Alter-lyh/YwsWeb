<template>
    <div class="main">
        <div class="mine-hat">
            <div class="mine-main">
                <div class="my-face"><img src="@/assets/img/user_defalut.png" alt=""></div>
                <div class="my-face-right">
                    <p class="user-name">{{userInfo.name ? userInfo.name: '游客'}}</p>
                    <p class="user-id">{{userInfo.id ? `ID: ${userInfo.id}` :'暂无登录'}}</p>
                </div>
            </div>
            <div v-show="!loginStatus" class="mine-header-login" @click="login"><span>登录/注册</span></div>
            <div v-show="loginStatus" class="sign-img" @click="taskSignIn"><img src="@/assets/img/sign.png" alt=""></div>
        </div>
        <div class="mine-account">
            <div class="mine-account-button">我的账户</div>
            <div class="item">
                <p class="num">{{userInfo.point ? userInfo.point : '- -'}}</p>
                <p class="text">硬币</p>
            </div>
            <div class="item">
                <p class="num">- -</p>
                <p class="text">点赞</p>
            </div>
            <div class="item">
                <p class="num">- -</p>
                <p class="text">被关注</p>
            </div>
            <div class="item">
                <p class="num">- -</p>
                <p class="text">关注</p>
            </div>
        </div>
        <div class="mine-select-list">
            <div class="item" @click="toastTips">
                <span>我的消息</span>
                <van-icon name="arrow" class="icon" />
            </div>
            <div class="item" @click="toastTips">
                <span>我的书评</span>
                <van-icon name="arrow" class="icon" />
            </div>
            <div class="item">
                <span>我的书单</span>
                <van-icon name="arrow" class="icon" />
            </div>
            <div class="item" @click="logout">
                <span>退出登录</span>
                <van-icon name="arrow" class="icon" />
            </div>
        </div>
    </div>
</template>

<script>
import {clearToken, clearUserInfo, setUserInfo} from "@/plugins/auth";
export default {
    name: 'user',
    data() {
        return {
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
    async mounted() {
    },
    methods: {
        async taskSignIn() {
            const res = await this.$api.taskApi.signIn()
            if (res.code != '00') return
            this.$toast('签到成功');
            this.getUserInfo()
        },
        login() {
            this.$store.commit('updateLoginView', true)
        },
        logout() {
            clearToken()
            clearUserInfo()
            this.$store.commit('updateLoginStatus', false)
            this.$store.commit('setUserInfo', {name: '默认用户'})
            this.$toast('退出成功');
        },
        // 获取用户信息
        async getUserInfo() {
            try {
                const res = await this.$api.userApi.getInfo()
                setUserInfo(res.data)
                this.$store.commit('setUserInfo', res.data)
            } catch (error) {
                console.log(error);
            }
        },
        toastTips() {
            this.$toast('正在开发中');
        }
    },
};
</script>

<style lang="less" scoped>
.main{
    padding-bottom: 130px;
}
.mine-hat{
    height: 216px;
    background: url('~@/assets/img/bg_user.png') repeat-x;
    background-size: auto 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    .mine-main{
        width: 60%;
        height: 100%;
        display: flex;
        align-items: center;
        .my-face{
            width: 128px;
            height: 128px;
            border-radius: 50%;
            box-sizing: border-box;
            border: 4px solid #fff;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            img{
                width: 120px;
                height: 120px;
                display: block;
            }
        }
        .user-name{
            font-size: 28px;
            font-weight: bolder;
            color: #fff;
            line-height: 60px;
        }
        .user-id{
            font-size: 24px;
            color: #fff;
            line-height: 40px;
        }
    }
    .mine-header-login{
        width: 154px;
        height: 52px;
        font-size: 24px;
        color: #FF620E;
        text-align: center;
        line-height: 52px;
        background: #FFF;
        border: 1px solid #FF620E;
        border-radius: 26px;
    }
    .sign-img{
        width: 88px;
        height: 88px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
.mine-account{
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 140px;
    padding: 20px 0;
    margin-top: -20px;
    border-radius: 20px 20px 0 0;
    background: #ffffff;
    .mine-account-button{
        width: 25%;
        text-align: center;
        line-height: 90px;
        font-size: 28px;
        color: #333;
        font-weight: bolder;
        box-sizing: border-box;
        border-right: 1px dashed #ccc;
    }
    .item{
        width: 25%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 10px;
        text-align: center;
        .num{
            font-size: 28px;
            font-weight: bolder;
            color: #666;
        }
        .text{
            font-size: 24px;
            color: #888;
        }
    }
}
.mine-select-list{
    margin-top: 20px;
    .item{
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        margin-bottom: 20px;
        color: #555;
    }
}
</style>