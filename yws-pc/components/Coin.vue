<template>
    <el-dialog
        :visible.sync="coinFlag"
        :show-close="false"
        top="40vh"
        width="300px">
        <div class="coin-view">
            <h3 class="title">投币以资鼓励</h3>
            <p class="desc">账户余额{{coinNum}}</p>
            <div class="coin-center">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            <div class="coin-bot">
                <el-button size="small" type="info" @click="closeCoin">算了</el-button>
                <el-button size="small" type="primary" @click="insertCoin">确认</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import {getToken, setUserInfo} from "@/plugins/auth";
export default {
    name:'Login',
    data() {
        return {
            coinNum: 0,
            num: 1
        };
    },
    computed: {
      coinFlag:{
          get: function() {
              return this.$store.state.coinFlag
          },
          set: function (flag) {
              this.$store.commit('updateCoinView', flag)
          }
      }
    },
    created() {
        this.$store.commit('updateCoinView', false)
    },
    mounted() {
        if(getToken()) this.getUserInfo()
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            try {
                const res = await this.$api.userApi.getInfo()
                this.coinNum = res.data.point
                setUserInfo(res.data)
                this.$store.commit('setUserInfo', res.data)
            } catch (error) {
                console.log(error);
            }
        },
        // 切换硬币数量
        handleChange(value) {
            console.log(value);
        },
        closeCoin() {
            this.$store.commit('updateCoinView', false)
        },
        insertCoin() {
            this.$emit('insertCoin', this.num)
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
