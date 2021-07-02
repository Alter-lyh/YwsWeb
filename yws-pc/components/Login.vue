<template>
    <el-dialog
        :visible.sync="loginFlag"
        :show-close="false"
        top="20vh"
        width="600px">
        <div class="login-view">
            <div class="img-box">
                <img src="https://www.youwendang.com/static/images/login_left.png" alt="">
            </div>
            <div class="login-right">
                <p class="title">{{loginType == 2 ? '欢迎登录' : '马上注册'}}</p>
                <p class="tips">——— — 超过15,55名用户加入网站名称 — ———</p>
                <div class="login-block" v-show="loginType == 2">
                    <el-input class="name-input" v-model="email" type="email" placeholder="请输入邮箱"></el-input>
                    <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
                    <el-button type="primary" class="login-btn" @click="signIn">登录</el-button>
                </div>
                <div class="regist-block" v-show="loginType == 1">
                    <el-input class="item" v-model="email" type="email" placeholder="请输入邮箱"></el-input>
                    <el-input class="item" v-model="name" placeholder="请输入昵称"></el-input>
                    <el-input class="item" v-model="password" placeholder="请输入密码"></el-input>
                    <el-input class="item" v-model="confirmPassword" placeholder="请确认密码"></el-input>
                    <div class="item">
                        <el-input class="name-input" v-model="yzCode" placeholder="邮箱验证码"></el-input>
                        <el-button type="primary" @click="sendYZcode">发送验证码</el-button>
                    </div>
                    <el-button type="primary" class="regist-btn" @click="register">注册</el-button>
                </div>
                <div class="login-type">
                    <span class="login" v-show="loginType == 1" @click="loginType = 2">登录</span>
                    <span class="regist" v-show="loginType == 2" @click="loginType = 1">注册</span>
                </div>
            </div>
        </div>
    </el-dialog>
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
            yzCode: ''
        };
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
                this.$message('请输入完整数据');
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
                this.$message('请输入正确邮箱');
                return
            }
            const params = {
                email: this.email
            }
            try {
                const res = await this.$api.userApi.sendMail(params)
                if (res != undefined) {
                    this.$message({
                        message: '验证码已发送',
                        type: 'success'
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        // 注册
        async register() {
            let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
            if (!emailReg.test(this.email)) {
                this.$message('请输入正确邮箱');
                return
            }
            if (!this.name ||!this.email || !this.password || !this.confirmPassword || !this.yzCode) {
                this.$message('请输入完整数据');
                return
            }
            if (this.password != this.confirmPassword) {
                this.$message('两次输入密码不一致');
                return
            }
            const params = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
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
                this.$message({
                    message: '注册成功，正在登录',
                    type: 'success'
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
};
</script>

<style scoped lang="less">
.login-view{
    width: 600px;
    height: 440px;
    display: flex;
    .img-box{
        width: 204px;
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        img{
            width: 100%;
            height: auto;
        }
    }
    .login-right{
        width: 396px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{
            font-size: 18px;
            color: #2b99ff;
            text-align: center;
        }
        .tips{
            font-size: 12px;
            color: #999;
            text-align: center;
            padding: 10px;
        }
        .login-block{
            width: 60%;
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
            width: 60%;
            margin: 10px auto;
            .item{
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .name-input{
                    width: 60%;
                    margin-right: 10px;
                }
            }
            .regist-btn{
                width: 100%;
                margin-top: 10px;
            }
        }
        .login-type{
            cursor: pointer;
            text-align: center;
            .login{
                color: #28a745;
                font-size: 14px;
                font-weight: bold;
            }
            .regist{
                color: #dc3545;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
}
/deep/.el-dialog{
    border-radius: 4px;
    overflow: hidden;
}
/deep/.el-dialog__header{
    display: none;
}
/deep/.el-dialog__body{
    padding: 0;
}
</style>
