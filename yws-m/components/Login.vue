<template>
    <van-dialog
        v-model="loginFlag"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        :showCancelButton="false">
        <div class="login-view">
            <p class="title">{{loginType == 2 ? '欢迎登录' : '马上注册'}}</p>
            <p class="tips">——— — 超过15,55名用户加入阅文说 — ———</p>
            <div class="login-block" v-show="loginType == 2">
                <van-field class="name-input" v-model="email" type="email" placeholder="请输入邮箱"></van-field>
                <van-field v-model="password" placeholder="请输入密码" show-password></van-field>
                <van-button type="primary" class="login-btn" @click="signIn">登录</van-button>
            </div>
            <div class="regist-block" v-show="loginType == 1">
                <van-field class="item" v-model="email" type="email" placeholder="请输入邮箱"></van-field>
                <van-field class="item" v-model="name" placeholder="请输入昵称"></van-field>
                <van-field class="item" v-model="password" placeholder="请输入密码"></van-field>
                <van-field class="item" v-model="confirmPassword" placeholder="请确认密码"></van-field>
                <div class="item">
                    <div class="scoreLevel">
                        <span class="item-tilte">书龄</span>
                        <van-dropdown-menu :overlay="false">
                            <van-dropdown-item v-model="value" :title="scoreTitle" :options="option" />
                        </van-dropdown-menu>
                    </div>
                </div>
                <div class="item">
                    <van-field class="name-input" v-model="yzCode" placeholder="邮箱验证码"></van-field>
                    <van-button type="primary" @click="sendYZcode">发送验证码</van-button>
                </div>
                <van-button type="primary" class="regist-btn" @click="register">注册</van-button>
            </div>
            <div class="login-type">
                <span class="login" v-show="loginType == 1" @click="loginType = 2">登录</span>
                <span class="regist" v-show="loginType == 2" @click="loginType = 1">注册</span>
            </div>
        </div>
    </van-dialog>
</template>

<script>
import {setToken, setUserInfo} from "@/plugins/auth";
export default {
    name:'Login',
    data() {
        return {
            loginType: 2,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            yzCode: '',
            scoreTitle: '请选择书龄',
            option: [{
                value: '1',
                text: '三年内'
            }, {
                value: '2',
                text: '七年内'
            }, {
                value: '3',
                text: '七年上'
            }],
            value: '',
        };
    },
    watch: {
        value(val) {
            this.scoreTitle = this.option[val*1-1]['text']
        }
    },
    computed: {
      loginFlag:{
          get: function() {
              return this.$store.state.loginFlag
          },
          set: function (flag) {
              this.$store.commit('updateLoginView', flag)
          }
      }
    },
    created() {
        this.$store.commit('updateLoginView', false)
    },
    mounted() {
    },
    methods: {
        // 登录
        async signIn() {
            if (!this.email || !this.password) {
                this.$toast('请输入完整数据');
                return
            }
            const params = {
                email: this.email,
                password: this.password
            }
            try {
                const res = await this.$api.userApi.signIn(params)
                const json = res.data
                setToken(json.token);
                setUserInfo(json)
                this.$store.commit('updateLoginStatus', true)
                this.$store.commit('updateLoginView', false)
                this.$store.commit('setUserInfo', json)
            } catch (error) {
                console.log(error)
            }
        },
        // 发送验证码
        async sendYZcode() {
            let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
            if (!emailReg.test(this.email)) {
                this.$toast('请输入正确邮箱');
                return
            }
            const params = {
                email: this.email
            }
            try {
                const res = await this.$api.userApi.sendMail(params)
                if (res != undefined) {
                    this.$toast.success('验证码已发送')
                }
            } catch (error) {
                console.log(error)
            }
        },
        // 注册
        async register() {
            let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
            if (!emailReg.test(this.email)) {
                this.$toast('请输入正确邮箱');
                return
            }
            if (this.value == '') {
                this.$message('请选择书龄');
                return
            }
            if (!this.name ||!this.email || !this.password || !this.confirmPassword || !this.yzCode) {
                this.$toast('请输入完整数据');
                return
            }
            if (this.password != this.confirmPassword) {
                this.$toast('两次输入密码不一致');
                return
            }
            const params = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                scoreLevel: this.value,
                yzCode: this.yzCode
            }
            try {
                const res = await this.$api.userApi.register(params)
                const json = res.data
                const userInfo = json[0]
                setToken(userInfo.token);
                setUserInfo(userInfo)
                this.$store.commit('updateLoginStatus', true)
                this.$store.commit('updateLoginView', false)
                this.$store.commit('setUserInfo', userInfo)
                this.$toast.success('注册成功，正在登录')
            } catch (error) {
                console.log(error)
            }
        }
    }
};
</script>

<style scoped lang="less">
.login-view{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    .title{
        font-size: 36px;
        color: #2b99ff;
        text-align: center;
    }
    .tips{
        font-size: 24px;
        color: #999;
        text-align: center;
        padding: 20px;
    }
    .login-block{
        width: 80%;
        margin: 20px auto;
        .name-input{
            margin-bottom: 20px;
        }
        .login-btn{
            width: 100%;
            margin-top: 20px;
        }
    }
    .regist-block{
        width: 80%;
        margin: 20px auto;
        .item{
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .scoreLevel{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #ebedf0;
            }
            .name-input{
                width: 55%;
            }
            .item-tilte{
                line-height: 90px;
                min-width: 100px;
                font-size: 28px;
                color: #646566;
                padding-left: 34px;
            }
            /deep/.van-dropdown-item{
                top: 710px!important;
                .van-cell{
                    padding-left: 115px;
                    padding-right: 80px;
                }
            }
            /deep/.van-dropdown-menu{
                width: 80%;
            }
        }
        .regist-btn{
            width: 100%;
            margin-top: 20px;
        }
    }
    .login-type{
        cursor: pointer;
        text-align: center;
        .login{
            color: #28a745;
            font-size: 28px;
            font-weight: bold;
        }
        .regist{
            color: #dc3545;
            font-size: 28px;
            font-weight: bold;
        }
    }
}
</style>
