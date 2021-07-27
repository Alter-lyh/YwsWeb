<template>
    <el-dialog
        :visible.sync="bookListAddFlag"
        :show-close="false"
        top="30vh"
        width="300px"
    >
        <div class="booklist-view">
            <h3 class="title">创建书单</h3>
            <div class="item">
                <span class="item-tilte">频道</span>
                <el-select v-model="value" clearable placeholder="请选择">
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
                <span class="item-tilte">名称</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="item textarea">
                <span class="item-tilte">简介</span>
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>
            </div>
            <el-button type="primary" size="small" class="btn">主要按钮</el-button>
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
                    value: "选项1",
                    label: "黄金糕",
                },
                {
                    value: "选项2",
                    label: "双皮奶",
                },
                {
                    value: "选项3",
                    label: "蚵仔煎",
                },
                {
                    value: "选项4",
                    label: "龙须面",
                },
                {
                    value: "选项5",
                    label: "北京烤鸭",
                },
            ],
            value: "",
            input: "",
            textarea: ""
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
        this.$store.commit("updateBookListAdd", true);
    },
    mounted() {},
    methods: {},
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
        .item-tilte{
            min-width: 50px;
        }
    }
    .textarea{
        align-items: flex-start;
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
