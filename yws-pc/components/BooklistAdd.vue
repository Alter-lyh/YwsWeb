<template>
    <el-dialog
        :visible.sync="bookListAddFlag"
        :show-close="false"
        top="30vh"
        width="320px"
    >
        <div class="booklist-view">
            <h3 class="title">创建书单</h3>
            <div class="item">
                <span class="item-tilte">频道:</span>
                <el-select v-model="type" clearable placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="item">
                <span class="item-tilte">名称:</span>
                <el-input v-model="title" placeholder="请输入内容"></el-input>
            </div>
            <div class="item textarea">
                <span class="item-tilte">简介:</span>
                <el-input
                    type="textarea"
                    :rows="5"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="intro">
                </el-input>
            </div>
            <el-button type="primary" size="small" class="btn" @click="createBooklist">创建书单</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getToken, setUserInfo } from "@/plugins/auth";
export default {
    name: "Login",
    data() {
        return {
            options: [
                {
                    value: "1",
                    label: "男频",
                },
                {
                    value: "2",
                    label: "女频",
                }
            ],
            type: "",
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
    padding: 20px;
    .title {
        text-align: center;
        font-size: 22px;
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
        .item-tilte{
            min-width: 36px;
        }
    }
    /deep/.el-input__inner{
        border: none;
    }
    .textarea{
        align-items: flex-start;
        .item-tilte{
            padding-top: 8px;
        }
    }
    /deep/.el-textarea__inner{
        border: none;
        padding-top: 6px;
        font-size: 14px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
        textarea{
            
        }
    }
    .btn{
        margin: 0 auto;
        margin-top: 20px;
        display: block;
    }
}
/deep/.el-dialog {
    border-radius: 4px;
    overflow: hidden;
}
/deep/.el-dialog__header {
    display: none;
}
/deep/.el-dialog__body {
    padding: 0;
}
</style>
