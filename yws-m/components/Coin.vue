<template>
    <van-dialog
        v-model="coinFlag"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        :showCancelButton="false">
        <div class="coin-view">
            <h3 class="title">投币以资鼓励</h3>
            <p class="desc">账户余额：{{coinNum}}</p>
            <div class="coin-center">
                <van-stepper v-model="num" @change="handleChange" :min="1" :max="10" />
            </div>
            <div class="coin-bot">
                <van-button type="default" size="normal" @click="closeCoin">算了</van-button>
                <van-button type="primary" size="normal" @click="insertCoin">确认</van-button>
            </div>
        </div>
    </van-dialog>
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
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 40px;
    .title{
        text-align: center;
        font-size: 44px;
        color: #f35656;
    }
    .desc{
        text-align: center;
        font-size: 28px;
        color: #E6A23C;
        margin: 20px 0;
    }
    .coin-center{
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
    .coin-bot{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 40px;
        margin-top: 40px;
        /deep/.van-button{
            width: 240px;
        }
    }
}
</style>
