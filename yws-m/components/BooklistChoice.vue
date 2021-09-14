<template>
    <van-dialog
        v-model="bookListChoiceFlag"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        :showCancelButton="false">
        <div class="view">
            <h3 class="title">加入书单</h3>
            <div class="item">
                <span class="item-tilte">书单</span>
                <van-dropdown-menu :overlay="false">
                    <van-dropdown-item v-model="value1" :options="option1" />
                </van-dropdown-menu>
            </div>
            <div class="item">
                <span class="item-tilte">评分:</span>
                <div class="novel-score"><van-rate readonly :value="userScore.score" color="#ff9900"/></div>
            </div>
            <div class="item textarea">
                <van-field
                    label="评论" 
                    class="novel-comment"
                    v-model="userScore.content"
                    rows="5"
                    autosize
                    resize="none"
                    type="textarea"
                    placeholder="请输入内容"
                />
            </div>
            <van-button type="primary" class="btn" @click="addToBooklist">加入书单</van-button>
        </div>
    </van-dialog>
</template>

<script>
import { getToken, setUserInfo } from "@/plugins/auth";
export default {
    name: "Login",
    props: {
        userBooklist: {
            type: Array,
            default: () => {
                return []
            }
        },
        userScore: {
            type: Object,
            default: {
                score: 0,
                content: ''
            }
        }
    },
    data() {
        return {
            booklistId: "",
            value1: 0,
            option1: [],
        };
    },
    watch: {
        userBooklist(data) {
            this.booklistId = data[0].id
            data.map((item, index) => {
                this.option1.push({
                    text: item.title,
                    value: index
                })
            })
        }
    },
    computed: {
        bookListChoiceFlag: {
            get: function () {
                return this.$store.state.bookListChoiceFlag;
            },
            set: function (flag) {
                this.$store.commit("updateBookListChoice", flag);
            },
        },
    },
    created() {
    },
    mounted() {
        console.log(this.userBooklist);
        this.$store.commit("updateBookListChoice", false);
    },
    methods: {
        async addToBooklist() {
            console.log(this.userScore);
            this.$emit('addToBooklist', this.booklistId)
        }
    },
};
</script>

<style scoped lang="less">
.view {
    width: 100%;
    box-sizing: border-box;
    padding: 40px;
    .title {
        text-align: center;
        font-size: 44px;
        color: #f35656;
    }
    .item{
        width: 100%;
        display: flex;
        align-items: center;
        border-radius: 4px;
        min-height: 42px;
        margin-top: 20px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        padding-left: 10px;
        position: relative;
        .item-tilte{
            line-height: 90px;
            min-width: 100px;
            font-size: 28px;
            color: #646566;
            padding-left: 34px;
        }
        .novel-score{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /deep/.van-dropdown-menu{
            width: 80%;
        }
        /deep/.van-field__label{
            width: auto;
        }
        /deep/.van-field__body{
            padding-left: 20px;
        }
    }
    .btn{
        margin: 0 auto;
        margin-top: 40px;
        display: block;
    }
    /deep/.van-dropdown-item{
        top: 300px!important;
        background: #fff;
        .van-dropdown-item__content{
            box-sizing: border-box;
            padding: 0 20px;
        }
    }
}
</style>
