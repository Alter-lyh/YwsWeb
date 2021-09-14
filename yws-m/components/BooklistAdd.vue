<template>
    <van-dialog
        v-model="bookListAddFlag"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        :showCancelButton="false">
        <div class="booklist-view">
            <h3 class="title">创建书单</h3>
            <div class="item">
                <span class="item-tilte">频道</span>
                <van-dropdown-menu :overlay="false">
                    <van-dropdown-item v-model="value1" :options="option1" />
                </van-dropdown-menu>
            </div>
            <div class="item">
                <van-field label="名称" v-model="title" placeholder="请输入内容"></van-field>
            </div>
            <div class="item textarea">
                <van-field
                    label="简介" 
                    class="novel-comment"
                    v-model="intro"
                    rows="5"
                    autosize
                    resize="none"
                    placeholder="请输入内容"
                />
            </div>
            <van-button type="primary" class="btn" @click="createBooklist">创建书单</van-button>
        </div>
    </van-dialog>
</template>

<script>
import { getToken, setUserInfo } from "@/plugins/auth";
export default {
    name: "Login",
    data() {
        return {
            value1: 0,
            option1: [
                { text: '男频', value: 0 },
                { text: '女频', value: 1 }
            ],
            options: [
                {
                    value: "1",
                    text: "男频",
                },
                {
                    value: "2",
                    text: "女频",
                }
            ],
            type: "1",
            title: "",
            intro: ""
        };
    },
    computed: {
        bookListAddFlag: {
            get: function () {
                return this.$store.state.bookListAddFlag;
            },
            set: function (flag) {
                this.$store.commit("updateBookListAdd", flag);
            },
        },
    },
    created() {
        this.$store.commit("updateBookListAdd", false);
    },
    mounted() {},
    methods: {
        async createBooklist() {
            const params = {
                title: this.title,
                type: this.type,
                intro: this.intro
            }
            try {
                const res = await this.$api.booklistApi.createBooklist(params)
                if (res.code != '00') {
                    this.$message.error('创建失败');
                } else {
                    this.$message.success('创建成功');
                }
            } catch (error) {
                console.log(error);
            }
            this.$store.commit("updateBookListAdd", false);
        }
    },
};
</script>

<style scoped lang="less">
.booklist-view {
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
        display: flex;
        justify-content: space-between;
        position: relative;
        .item-tilte{
            line-height: 90px;
            min-width: 100px;
            font-size: 28px;
            color: #646566;
            padding-left: 34px;
        }
        /deep/.van-dropdown-menu{
            width: 80%;
        }
        /deep/.van-field__label{
            width: auto;
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
