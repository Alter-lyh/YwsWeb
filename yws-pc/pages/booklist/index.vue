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
                </div>
                <div class="result-view">
                    <div class="item" v-for="(item, key) in bookList" :key="key">
                        <p class="item-title"><nuxt-link :to="`/booklist/${item.id}.html`">{{item.title}}</nuxt-link></p>
                        <div class="item-tag">
                            <span v-for="(item2, key2) in item.categorys" :key="key2">{{item2.category_name}}({{item2.count}})</span>
                        </div>
                        <p class="item-desc">{{item.intro}}</p>
                        <div class="item-bot">
                            <div class="item-bot-left">
                                <span class="nick-name">{{item.userInfo.name}}</span>
                                <span>{{item.update_time | timeFil}}</span>
                            </div>
                            <div class="item-bot-right">
                                <span>{{item.bookTotal}}本书</span>
                                <!-- <span>23赞</span> -->
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
                type: 1,
                sort: null,
            },
            channelList: [
                {
                    type: 1,
                    name: "男频",
                },
                {
                    type: 2,
                    name: "女频",
                },
            ],
            sortList: [
                {
                    status: null,
                    name: "综合",
                },
                {
                    status: 'time',
                    name: "时间",
                },
                {
                    status: 'point',
                    name: "热度",
                },
            ],
            pageAll: 1,
            bookList: [],
        };
    },
    async asyncData({ app, query, params }) {
        // 请检查您是否在服务器端
        if (!process.server) return;
        const result = await app.$api.booklistApi.getBooklist({ page: 1, type: 1})
        const json = result.data
        const pageAll = json.pageAll;
        let bookList = json.data;
        bookList.map(item => {
            let bookTotal = 0
            item.categorys.map(item2 => {
                bookTotal += item2.count
            })
            item.bookTotal = bookTotal
        })

        return {
            pageAll,
            bookList
        }
    },
    async mounted() {
        if (this.bookList.length > 0) return
        this.getBooklist()
    },
    methods: {
        async getBooklist() {
            const params = {...this.query}
            const res = await this.$api.booklistApi.getBooklist(params)
            const json = res.data
            this.pageAll = json.pageAll;
            this.bookList = json.data;
            this.bookList.map(item => {
                let bookTotal = 0
                item.categorys.map(item2 => {
                    bookTotal += item2.count
                })
                item.bookTotal = bookTotal
            })
        },
        // 分页
        changePage(page) {
            this.query.page = page;
            this.getBooklist();
        },
        // 男频 女频
        changeType(type) {
            this.query.type = type;
            this.getCategory()
            this.query.categoryId = null
            this.getBooklist();
        },
        // 分类
        changeCategoryId(id) {
            this.query.categoryId = id;
            this.getBooklist();
        },
        // 字数
        changeCountWord(status) {
            this.query.countWord = status;
            this.getBooklist();
        },
        // 更新状态
        changeUpdateStatus(status) {
            this.query.updateStatus = status;
            this.getBooklist();
        },
        // 更新时间
        changeUpdate(status) {
            this.query.update = status;
            this.getBooklist();
        },
        // 更新筛选状态
        changeSort(status) {
            this.query.sort = status;
            if (['score', 'scorer'].indexOf(status) != -1) {
                this.query.scoreSort = status;
            }
            this.getBooklist();
        },
        updateScore(status) {
            this.query.scoreSort = status;
            this.getBooklist();
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
                    padding-bottom: 10px;
                    a{
                        font-size: 18px;
                    }
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
                    margin-top: 15px;
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