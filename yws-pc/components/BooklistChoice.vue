<template>
    <el-dialog
        :visible.sync="bookListChoiceFlag"
        :show-close="false"
        top="30vh"
        width="320px"
    >
        <div class="view">
            <h3 class="title">加入书单</h3>
            <div class="item">
                <span class="item-tilte">书单:</span>
                <el-select v-model="booklistId" clearable placeholder="请选择">
                    <el-option
                        v-for="item in userBooklist"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="item">
                <span class="item-tilte">评分:</span>
                <el-rate
                    class="novel-score"
                    v-model="userScore.score"
                    :colors="colors">
                </el-rate>
            </div>
            <div class="item textarea">
                <span class="item-tilte">评论:</span>
                <el-input
                    type="textarea"
                    :rows="5"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="userScore.content">
                </el-input>
            </div>
            <el-button type="primary" size="small" class="btn" @click="addToBooklist">加入书单</el-button>
        </div>
    </el-dialog>
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
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        };
    },
    watch: {
        userBooklist(data) {
            this.booklistId = data[0].id
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
        .novel-score{
            margin-left: 10px;
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
