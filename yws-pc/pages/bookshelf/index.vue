<template>
    <div class="container book-case">
        <div class="book-case-side"></div>
        <div class="book-case-right">
            <div class="book-case-tap">
                <div class="item active">正在追读</div>
                <div class="item">正在追读</div>
                <div class="item">正在追读</div>
            </div>
            <div class="result-view">
                <p class="book-case-total">本书架共有1本书</p>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="日期" width="120">
                        <template slot-scope="scope">{{
                            scope.row.date
                        }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
        }
    }
}
/deep/.el-table::before{
    height: 0;
}
/deep/.el-table__row:nth-last-child(1) td{
    border: none;
}
</style>