<template>
    <el-dialog
        :visible.sync="loginFlag"
        :show-close="false"
        top="40vh"
        width="300px">
        <div class="coin-view">
            <h3 class="title">投币以资鼓励</h3>
            <p class="desc">账户余额20</p>
            <div class="coin-center">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            <div class="coin-bot">
                <el-button size="small" type="info">信息按钮</el-button>
                <el-button size="small" type="primary">主要按钮</el-button>
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
            yzCode: '',
            loginFlag: true,
            num: 1
        };
    },
    computed: {
    //   loginFlag:{
    //       get: function() {
    //           return this.$store.state.loginFlag
    //       },
    //       set: function (flag) {
    //           this.$store.commit('updateLoginView', flag)
    //       }
    //   }
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
        },
        handleChange(value) {
            console.log(value);
        }
    }
};
</script>

<style scoped lang="less">
.coin-view{
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    .title{
        text-align: center;
        font-size: 22px;
        color: #f35656;
    }
    .desc{
        text-align: center;
        font-size: 12px;
        color: #E6A23C;
        margin: 10px 0;
    }
    .coin-center{
        display: flex;
        justify-content: center;
    }
    .coin-bot{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 50px;
        margin-top: 20px;
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
