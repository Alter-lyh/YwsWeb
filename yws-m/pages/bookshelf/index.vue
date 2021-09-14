<template>
    <div class="container">
        <div class="book-case-tap">
            <div :class="['item', type == 1 ? 'active' : '']" @click="setType(1)">正在追读</div>
            <div :class="['item', type == 2 ? 'active' : '']" @click="setType(2)">养肥待看</div>
            <div :class="['item', type == 3 ? 'active' : '']" @click="setType(3)">已经看过</div>
        </div>
        <div class="result-view">
            <p class="book-case-total">本书架共有{{novelList.length}}本书</p>
            <div class="novel-list">
                <div class="item" v-for="(item, $key) in novelList" :key="$key">
                    <div class="item-top">
                        <span class="novel-name">{{item.novel.novel_name}}</span>
                        <van-rate :value="item.score/2" :size="14" color="#ff9900"/>
                    </div>
                    <div class="item-bot">
                        <div class="bot-left">
                            <span>{{item.novel.author_name}}</span>
                            <span>{{item.novel.update_time | timeFil}}</span>
                        </div>
                        <div class="bot-right">
                            <span class="to-read" @click="show = true">立即阅读</span>
                            <van-icon class="more-actions" name="weapp-nav" @click="show = true"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <el-table
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
                        <el-dropdown trigger="click" placement="bottom" @command="addBookshelf">
                            <span class="el-dropdown-link">
                                <i slot="reference" class="el-icon-more discuss-actions-right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-show="scope.row.type != 1" :command="composeValue(1, scope.row.novel.id)">正在追读</el-dropdown-item>
                                <el-dropdown-item v-show="scope.row.type != 2" :command="composeValue(2, scope.row.novel.id)">养肥待看</el-dropdown-item>
                                <el-dropdown-item v-show="scope.row.type != 3" :command="composeValue(3, scope.row.novel.id)">已经看过</el-dropdown-item>
                                <el-dropdown-item :command="composeValue(0, scope.row.novel.id)" :divided="true">取消收藏</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table> -->
        </div>
        <!-- 阅读的更多操作 -->
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
        <Pagination
            :currentPage="page"
            :pageAll="pageAll"
            @changePage="changePage"
        />
    </div>
</template>
<script>
export default {
    name: 'bookshelf',
    data() {
        return {
            type: 1,
            page: 1,
            pageAll: 1,
            novelList: [],
            show: false,
            actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
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
                type: this.type,
                page: this.page,
            }
            try {
                const res = await this.$api.bookshelfApi.getNoverList(params)
                const json = res.data
                this.novelList = json.data
                this.pageAll = json.pageAll
                console.log(this.novelList);
            } catch (error) {
                console.log(error);
            }
            
        },
        async setType(type) {
            this.type = type
            this.getNoverList()
        },
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
        },
        changePage(page) {
            this.page = page;
            this.getNoverList()
        },
        composeValue(type, novelId) {
            return {
                type,
                novelId
            };
        },
        // 添加到书架
        async addBookshelf({type, novelId}) {
            const params = {
                type: type == 0 ? 0 : type,
                status: type == 0 ? 2 : 1,
                novelId
            }
            try {
                const res = await this.$api.bookshelfApi.setStatus(params)
                if (res.code != '00') return
                if (type != 0) {
                    this.$message.success('加入成功');
                } else {
                    this.$message.success('取消成功');
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
};
</script>
<style lang="less" scoped>
.book-case-tap {
    width: 100%;
    height: 100px;
    background: #e9eaed;
    display: flex;
    .item {
        flex: 1;
        font-size: 32px;
        color: #333;
        padding: 30px 0;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
    }
    .active {
        background-color: #fff;
        border-radius: 10px 10px 0 0;
    }
}
.result-view {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 30px;
    padding-bottom: 20px;
    background: #fff;
    .book-case-total {
        padding: 36px 0 10px;
        color: #888;
        margin-bottom: 10px;
    }
    .novel-list{
        .item{
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f3f4f7;
            .item-top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                .novel-name{
                    font-size: 32px;
                }
            }
            .item-bot{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .bot-left{
                    font-size: 28px;
                    color: #999;
                    span{
                        margin-right: 10px;
                    }
                }
                .bot-right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    line-height: normal;
                    .to-read{
                        color: #567ceb;
                        margin-right: 30px;
                        font-size: 28px;
                        font-weight: bold;
                    }
                    .more-actions{
                        font-size: 40px;
                        color: #a3b1d8;
                    }
                }
            }
        }
        .item:nth-last-child(1){
            margin-bottom: 0;
            border-bottom: 1px solid transparent;
        }
    }
}

</style>