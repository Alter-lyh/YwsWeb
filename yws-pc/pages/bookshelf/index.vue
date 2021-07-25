<template>
    <div class="container book-case">
        <div class="book-case-side"></div>
        <div class="book-case-right">
            <div class="book-case-tap">
                <div class="item active">正在追读</div>
                <div class="item">养肥待看</div>
                <div class="item">已经看过</div>
            </div>
            <div class="result-view">
                <p class="book-case-total">本书架共有{{novelList.length}}本书</p>
                <el-table
                    ref="multipleTable"
                    :data="novelList"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="书名/作者" width="190" class-name="novel-title">
                        <template slot-scope="scope">
                            <span class="name">{{scope.row.novel.novel_name}}</span>
                            <span>{{scope.row.novel.author_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="我的评分" width="150">
                        <template slot-scope="scope">
                            <el-rate
                                class="novel-score"
                                disabled
                                :value="scope.row.score/2">
                            </el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="最后更新"
                        show-overflow-tooltip
                        class-name="more-actions"
                    >
                        <template slot-scope="scope">
                            <span class="time">{{scope.row.novel.update_time | timeFil}}</span>
                            <a href="">立即阅读</a>
                            <el-dropdown trigger="click" placement="bottom">
                                <span class="el-dropdown-link">
                                    <i slot="reference" class="el-icon-more discuss-actions-right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>投诉</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bookshelf',
    data() {
        return {
            novelList: [],
            tableData: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
            ],
        };
    },
    async asyncData({ app, query, params }) {
    },
    async activated() {
        this.getNoverList()
    },
    methods: {
        async getNoverList() {
            const params = {
                type: 1,
                num: 100
            }
            try {
                const res = await this.$api.bookshelfApi.getNoverList(params)
                const json = res.data
                this.novelList = json.data
                console.log(this.novelList);
            } catch (error) {
                console.log(error);
            }
            
        }
    }
};
</script>
<style lang="less" scoped>
.container {
    padding-top: 10px;
}
.book-case {
    display: flex;
    .book-case-side {
        width: 235px;
        height: 200px;
        margin-right: 10px;
        font-size: 14px;
        background: #fff;
    }
    .book-case-right {
        width: 755px;
        height: auto;
        .book-case-tap {
            width: 100%;
            height: 50px;
            background: #e9eaed;
            display: flex;
            .item {
                font-size: 16px;
                color: #333;
                padding: 15px 30px;
                font-weight: 700;
                cursor: pointer;
            }
            .active {
                background-color: #fff;
                border-radius: 5px 5px 0 0;
            }
        }
        .result-view {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 0 30px;
            padding-bottom: 10px;
            background: #fff;
            .book-case-total {
                padding: 18px 0 5px;
                color: #888;
                margin-bottom: 0;
            }
            .novel-title{
                .name{
                    font-size: 16px;
                    color: #222;
                    font-weight: bold;
                    margin-right: 10px;
                }
                span{
                    font-size: 12px;
                }
            }
            .more-actions{
                a{
                    color: #567ceb;
                    margin-left: 15px;
                    flex: 1;
                    font-size: 14px;
                    font-weight: bold;
                }
                .discuss-actions-right {
                    font-size: 20px;
                    color: #a3b1d8;
                    cursor: pointer;
                }
            }
        }
    }
}
/deep/.el-table::before{
    height: 0;
}
/deep/.el-table__row:nth-last-child(1) td{
    border: none;
}
/deep/.more-actions .cell{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: normal;
}
</style>