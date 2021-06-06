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
            <div class="classify-item">
                <span class="classify-item-title">分类:</span>
                <div class="classify-labels">
                    <span
                        :class="[
                            'item',
                            item.id == query.categoryId ? 'active' : '',
                        ]"
                        v-for="(item, $key) in categoryList"
                        :key="$key"
                        @click="changeCategoryId(item.id)"
                        >{{ item.cate_name }}</span
                    >
                </div>
            </div>
            <div class="classify-item">
                <span class="classify-item-title">字数:</span>
                <div class="classify-labels">
                    <span
                        :class="[
                            'item',
                            item.status == query.countWord ? 'active' : '',
                        ]"
                        v-for="(item, $key) in countWordList"
                        :key="$key"
                        @click="changeCountWord(item.status)"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
            <div class="classify-item">
                <span class="classify-item-title">状态:</span>
                <div class="classify-labels">
                    <span
                        :class="[
                            'item',
                            item.status == query.updateStatus ? 'active' : '',
                        ]"
                        v-for="(item, $key) in statusList"
                        :key="$key"
                        @click="changeUpdateStatus(item.status)"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
            <div class="classify-item">
                <span class="classify-item-title">更新:</span>
                <div class="classify-labels">
                    <span
                        :class="[
                            'item',
                            item.status == query.update ? 'active' : '',
                        ]"
                        v-for="(item, $key) in updateList"
                        :key="$key"
                        @click="changeUpdate(item.status)"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
        </div>
        <div class="store-sort">
            <div class="store-sort-item">
                <span class="item active">综合</span>
                <span class="item">字数</span>
                <span class="item">评分</span>
                <span class="item">热度</span>
            </div>
            <span class="sort-tip">评分可以按照书龄来选择</span>
            <div class="store-sort-item">
                <span class="item">一年内</span>
                <span class="item">五年内</span>
                <span class="item">十年内</span>
                <span class="item">老书虫</span>
            </div>
        </div>
        <div class="result-view">
            <div
                class="item"
                url="/pages/book/index"
                v-for="(item, $key) in novelList"
                :key="$key"
            >
                <div class="book-img">
                    <img :src="item.novel_img" alt="" />
                </div>
                <div class="item-info">
                    <div class="item-info-head">
                        <nuxt-link class="book-name" :to="`/novel?id=${item.id}`">{{
                            item.novel_name
                        }}</nuxt-link>
                        <span class="add-btn">加入书架</span>
                    </div>
                    <div class="book-info">
                        <span class="book-info-item">{{
                            item.author_name
                        }}</span>
                        <span class="book-info-item"
                            >{{
                                Number(item.word_number / 10000).toFixed(1)
                            }}万字</span
                        >
                        <span class="book-info-item">4小时前</span>
                        <span class="book-info-item">连载</span>
                    </div>
                    <span class="book-sore"
                        >综合评分：{{ item.score }}({{ item.scorer }}人)</span
                    >
                    <div class="book-tag">
                        <span class="book-tag-title">本书标签:</span>
                        <span
                            class="book-tag-item"
                            v-for="(item, $key) in item.novel_tags"
                            :key="$key"
                            >{{ item.tag_name }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <pagination
            :currentPage="query.page"
            :pageAll="pageAll"
            @changePage="changePage"
        />
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
                sort: "",
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
            statusList: [
                {
                    status: null,
                    name: "全部",
                },
                {
                    status: 0,
                    name: "连载中",
                },
                {
                    status: 1,
                    name: "已完结",
                },
                {
                    status: 2,
                    name: "已太监",
                },
            ],
            countWordList: [
                {
                    status: null,
                    name: "全部",
                },
                {
                    status: 1,
                    name: "10万以下",
                },
                {
                    status: 2,
                    name: "10万-100万",
                },
                {
                    status: 3,
                    name: "100万以上",
                },
            ],
            updateList: [
                {
                    status: null,
                    name: "全部",
                },
                {
                    status: 1,
                    name: "三日内",
                },
                {
                    status: 2,
                    name: "一月内",
                },
                {
                    status: 3,
                    name: "半年内",
                },
                {
                    status: 4,
                    name: "半年上",
                },
            ],
            categoryList: [],
            pageAll: 1,
            novelList: [],
        };
    },
    async asyncData({ app, query, params }) {
        // 请检查您是否在服务器端
        if (!process.server) return;
        query.page = query.page * 1 || 1;

        const result = await Promise.all([
            app.$api.novel.getCategory({ type: query.type }),
            app.$api.novel.getNovelList(query),
        ]);
        result[0].unshift({ id: null, cate_name: "全部" });

        return {
            query: query,
            categoryList: result[0],
            pageAll: result[1].pageAll,
            novelList: result[1].data,
        };
    },
    async activated() {
        if (this.categoryList.length < 1) {
            await this.getCategory()
            await this.getNovelList()
        }
    },
    methods: {
        async getCategory() {
            const params = { 
                type: this.query.type 
            }
            this.categoryList = await this.$api.novel.getCategory(params)
        },
        async getNovelList() {
            const res = await this.$api.novel.getNovelList(this.query)
            this.pageAll = res.pageAll;
            this.novelList = res.data;
        },
        // 分页
        changePage(page) {
            this.query.page = page;
            this.getNovelList();
        },
        // 男频 女频
        changeType(type) {
            this.query.type = type;
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
    },
};
</script>
<style lang="less" scoped>
.main {
    padding: 10px 0;
}
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
                color: #000;
            }
        }
    }
}
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
            color: #000;
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
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        .book-img {
            width: 100px;
            min-width: 100px;
            height: 132px;
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            margin-right: 15px;
            display: flex;
            align-items: center;
            background: #eee;
            img {
                width: 100%;
                height: auto;
            }
        }
        .item-info {
            flex: 1;
            height: auto;
            .item-info-head {
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .book-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #333;
                }
                .add-btn {
                    color: #567ceb;
                }
            }
            .book-info {
                line-height: 30px;
                .book-info-item {
                    margin-right: 10px;
                }
            }
            .book-sore,
            .book-tag {
                line-height: 30px;
                .book-tag-title,
                .book-tag-item {
                    margin-right: 10px;
                }
            }
        }
    }
    .item:nth-last-child(1) {
        border: none;
    }
}
</style>