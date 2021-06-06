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
                    <el-input class="name-input" v-model="input" placeholder="请输入邮箱"></el-input>
                    <el-input v-model="input" placeholder="请输入密码" show-password></el-input>
                    <el-button type="primary" class="login-btn">登录</el-button>
                </div>
                <div class="regist-block" v-show="loginType == 1">
                    <el-input class="item" v-model="input" placeholder="请输入邮箱"></el-input>
                    <el-input class="item" v-model="input" placeholder="请输入密码"></el-input>
                    <el-input class="item" v-model="input" placeholder="请确认密码"></el-input>
                    <div class="item">
                        <el-input class="name-input" v-model="input" placeholder="邮箱"></el-input>
                        <el-button type="primary">发送验证码</el-button>
                    </div>
                    <el-input v-model="input" placeholder="邮箱验证码"></el-input>
                    <el-button type="primary" class="regist-btn">注册</el-button>
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
export default {
    name:'Login',
    data() {
        return {
            loginType: 1,
            input: ''
        };
    },
    computed: {
      loginFlag:{
          get: function() {
              return this.$store.state.loginFlag
          },
          set: function (falg) {
              this.$store.commit('updateLoginView', falg)
          }
      }
    },
    mounted() {
    },
    methods: {
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
