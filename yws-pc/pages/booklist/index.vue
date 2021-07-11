<template>
    <div class="main">
        <div class="select-view">
            <div class="classify-item">
                <span class="classify-item-title">频道:</span>
                <div class="classify-labels">
                    <span
                        :class="[
                            'item',
                            item.type == query.type ? 'active' : '',
                        ]"
                        v-for="(item, $key) in channelList"
                        :key="$key"
                        @click="changeType(item.type)"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-left">
                <div class="store-sort">
                    <div class="store-sort-item">
                        <span :class="['item', query.sort == item.status ? 'active' : null]" v-for="(item, $key) in sortList" :key="$key" @click="changeSort(item.status)">{{item.name}}</span>
                    </div>
                    <span class="sort-tip" v-show="['score', 'scorer'].indexOf(query.sort) != -1">评分和评分人数可以按照书龄来选择</span>
                    <div class="store-sort-item" v-show="['score', 'scorer'].indexOf(query.sort) != -1">
                        <span :class="['item', query.scoreSort == item.status ? 'active' : null]" v-for="(item, $key) in scoreSortList" :key="'score'+$key" v-show="query.sort == 'score'" @click="updateScore(item.status)">{{item.name}}</span>
                        <span :class="['item', query.scoreSort == item.status ? 'active' : null]" v-for="(item, $key) in scorerSortList" :key="'scorer'+$key" v-show="query.sort == 'scorer'" @click="updateScore(item.status)">{{item.name}}</span>
                    </div>
                </div>
                <div class="result-view">
                    <div class="item">
                        <p class="item-title">书单名称</p>
                        <div class="item-tag">
                            <span>测试</span>
                            <span>测试</span>
                        </div>
                        <p class="item-desc">整理一下这些年看的变文，算是留个回忆吧。</p>
                        <div class="item-bot">
                            <div class="item-bot-left">
                                <span class="nick-name">昵称</span>
                                <span>1天前</span>
                            </div>
                            <div class="item-bot-right">
                                <span>51本书</span>
                                <span>23赞</span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <p class="item-title">书单名称</p>
                        <div class="item-tag">
                            <span>测试</span>
                            <span>测试</span>
                        </div>
                        <p class="item-desc">整理一下这些年看的变文，算是留个回忆吧。</p>
                        <div class="item-bot">
                            <div class="item-bot-left">
                                <span class="nick-name">昵称</span>
                                <span>1天前</span>
                            </div>
                            <div class="item-bot-right">
                                <span>51本书</span>
                                <span>23赞</span>
                            </div>
                        </div>
                    </div>
                </div>
                <pagination
                    class="pagin-ation"
                    :currentPage="query.page"
                    :pageAll="pageAll"
                    @changePage="changePage"
                />
            </div>
            <div class="content-right"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bookstore',
    data() {
        return {
            query: {
                page: 1,
                type: null,
                categoryId: null,
                update: null,
                updateStatus: null,
                countWord: null,
                sort: null,
                scoreSort: 'score',
            },
            channelList: [
                {
                    type: null,
                    name: "全部",
                },
                {
                    type: 1,
                    name: "男频",
                },
                {
                    type: 2,
                    name: "女频",
                },
            ],
            categoryList: [],
            sortList: [
                {
                    status: null,
                    name: "综合",
                },
                {
                    status: 'word_number',
                    name: "字数",
                },
                {
                    status: 'score',
                    name: "评分",
                },
                {
                    status: 'scorer',
                    name: "评分人数",
                },
                {
                    status: 'point',
                    name: "热度",
                },
            ],
            pageAll: 1,
            novelList: [],
        };
    },
    async asyncData({ app, query, params }) {
        // 请检查您是否在服务器端
        // if (!process.server) return;
        // query.page = query.page * 1 || 1;

        // const result = await Promise.all([
        //     app.$api.novel.getCategory({ type: query.type }),
        //     app.$api.novel.getNovelList(query),
        // ]);
        // result[0].unshift({ id: null, cate_name: "全部" });

        // return {
        //     query: query,
        //     categoryList: result[0],
        //     pageAll: result[1].pageAll,
        //     novelList: result[1].data,
        // };
    },
    async activated() {
        // await this.getCategory()
        // await this.getNovelList()
    },
    methods: {
        async getCategory() {
            const params = { 
                type: this.query.type 
            }
            const res = await this.$api.novel.getCategory(params)
            this.categoryList = res.data
        },
        async getNovelList() {
            const params = {...this.query}
            if (['score','scorer'].indexOf(this.query.sort) != -1) {
                params.sort = this.query.scoreSort
            }
            const res = await this.$api.novel.getNovelList(params)
            const json = res.data
            this.pageAll = json.pageAll;
            this.novelList = json.data;
        },
        // 分页
        changePage(page) {
            this.query.page = page;
            this.getNovelList();
        },
        // 男频 女频
        changeType(type) {
            this.query.type = type;
            this.getCategory()
            this.query.categoryId = null
            this.getNovelList();
        },
        // 分类
        changeCategoryId(id) {
            this.query.categoryId = id;
            this.getNovelList();
        },
        // 字数
        changeCountWord(status) {
            this.query.countWord = status;
            this.getNovelList();
        },
        // 更新状态
        changeUpdateStatus(status) {
            this.query.updateStatus = status;
            this.getNovelList();
        },
        // 更新时间
        changeUpdate(status) {
            this.query.update = status;
            this.getNovelList();
        },
        // 更新筛选状态
        changeSort(status) {
            this.query.sort = status;
            if (['score', 'scorer'].indexOf(status) != -1) {
                this.query.scoreSort = status;
            }
            this.getNovelList();
        },
        updateScore(status) {
            this.query.scoreSort = status;
            this.getNovelList();
        }
    },
};
</script>
<style lang="less" scoped>
.select-view {
    width: 100%;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    padding: 10px 20px;
    margin-bottom: 10px;
    .classify-item {
        width: 100%;
        height: auto;
        display: flex;
        font-size: 14px;
        color: #aaa;
        line-height: 1em;
        padding-top: 10px;
        .classify-item-title {
            min-width: 40px;
        }
        .classify-labels {
            display: flex;
            flex-wrap: wrap;
            .item {
                padding: 0 10px;
                border-right: 1px solid #ddd;
                cursor: pointer;
                color: #aaa;
                margin-bottom: 15px;
            }
            .item:nth-last-child(1) {
                border-right: none;
            }
            .active {
                color: #5DA7FF;
                font-weight: bold;
            }
        }
    }
}
.content{
    display: flex;
    justify-content: space-between;
    .content-left{
        width: 710px;
        .store-sort {
            width: 100%;
            height: auto;
            background: #fff;
            padding: 15px 15px 15px 10px;
            box-sizing: border-box;
            font-size: 14px;
            color: #aaa;
            margin-bottom: 10px;
            .store-sort-item {
                display: flex;
                line-height: 1em;
                padding: 10px 0;
                .item {
                    padding: 0 10px;
                    border-right: 1px solid #ddd;
                    cursor: pointer;
                    color: #aaa;
                    padding: 0 10px;
                }
                .item:nth-last-of-type(1) {
                    border-right: none;
                }
                .active {
                    color: #5DA7FF;
                    font-weight: bold;
                }
            }
            .sort-tip {
                color: #e96900;
                padding: 0 10px;
            }
        }
        .result-view {
            width: 100%;
            height: auto;
            background: #fff;
            padding: 0 20px;
            box-sizing: border-box;
            font-size: 14px;
            color: #999;
            .item {
                width: 100%;
                height: auto;
                padding: 20px 0;
                border-bottom: 1px solid #eee;
                .item-title{
                    color: #333;
                    font-weight: 700;
                    line-height: 1em;
                    font-size: 18px;
                    padding-bottom: 10px;
                }
                .item-tag{
                    color: #7d97e2;
                    font-size: 14px;
                    cursor: pointer;
                    span{
                        margin-right: 10px;
                    }
                }
                .item-desc{
                    margin-top: 10px;
                }
                .item-bot{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    margin-top: 10px;
                    .item-bot-left{
                        span{
                            margin-right: 10px;
                        }
                        .nick-name{
                            font-size: 14px;
                            color: #333;
                            font-weight: bold;
                        }
                    }
                    .item-bot-right{
                        text-align: right;
                        span{
                            margin-left: 20px;
                        }
                    }
                }
            }
            .item:nth-last-child(1) {
                border: none;
            }
        }
    }
    .content-right{
        width: 280px;
        height: 40px;
        background: #fff;
    }
}


</style>