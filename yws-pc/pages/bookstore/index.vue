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
                <span :class="['item', query.sort == item.status ? 'active' : null]" v-for="(item, $key) in sortList" :key="$key" @click="changeSort(item.status)">{{item.name}}</span>
            </div>
            <span class="sort-tip" v-show="['score', 'scorer'].indexOf(query.sort) != -1">评分和评分人数可以按照书龄来选择</span>
            <div class="store-sort-item" v-show="['score', 'scorer'].indexOf(query.sort) != -1">
                <span :class="['item', query.scoreSort == item.status ? 'active' : null]" v-for="(item, $key) in scoreSortList" :key="'score'+$key" v-show="query.sort == 'score'" @click="updateScore(item.status)">{{item.name}}</span>
                <span :class="['item', query.scoreSort == item.status ? 'active' : null]" v-for="(item, $key) in scorerSortList" :key="'scorer'+$key" v-show="query.sort == 'scorer'" @click="updateScore(item.status)">{{item.name}}</span>
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
                        <span class="book-info-item">{{item.word_number | wordNumFilter}}</span>
                        <span class="book-info-item">{{item.update_time | timeFil}}</span>
                        <span class="book-info-item">{{item.update_status | updateStatusFil}}</span>
                    </div>
                    <div class="book-sore-list">
                        <span class="book-sore">综合评分：<em>{{ item.score }}</em>（{{ item.scorer }}人）</span>
                        <span class="book-sore">三年内：<em>{{ item.score_1 }}</em>（{{ item.scorer_1 }}人）</span>
                        <span class="book-sore">七年内：<em>{{ item.score_2 }}</em>（{{ item.scorer_2 }}人）</span>
                        <span class="book-sore">七年内：<em>{{ item.score_3 }}</em>（{{ item.scorer_3 }}人）</span>
                    </div>
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
            scoreSortList: [
                {
                    status: 'score',
                    name: "综合",
                },
                {
                    status: 'score_1',
                    name: "三年内",
                },
                {
                    status: 'score_2',
                    name: "七年内",
                },
                {
                    status: 'score_3',
                    name: "七年上",
                },
            ],
            scorerSortList: [
                {
                    status: 'scorer',
                    name: "综合",
                },
                {
                    status: 'scorer_1',
                    name: "三年内",
                },
                {
                    status: 'scorer_2',
                    name: "七年内",
                },
                {
                    status: 'scorer_3',
                    name: "七年上",
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
        await this.getCategory()
        await this.getNovelList()
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
            .book-sore{
                margin-right: 10px;
                color: #333;
                em{
                    color: #FF6F59;
                    font-weight: bold;
                }
            }
            .book-tag-item{
                padding: 4px 8px;
                background-color: #f8f9fa;
            }
        }
    }
    .item:nth-last-child(1) {
        border: none;
    }
}
</style>