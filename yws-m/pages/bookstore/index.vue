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
                        :key="`sort0${$key}`"
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
                        :key="`sort1${$key}`"
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
                        :key="`sort2${$key}`"
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
                        :key="`sort3${$key}`"
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
                        :key="`sort4${$key}`"
                        @click="changeUpdate(item.status)"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
        </div>
        <div class="store-sort">
            <div class="store-sort-item">
                <span :class="['item', query.sort == item.status ? 'active' : null]" v-for="(item, $key) in sortList" :key="`sort5${$key}`" @click="changeSort(item.status)">{{item.name}}</span>
            </div>
            <span class="sort-tip" v-show="['score', 'scorer'].indexOf(query.sort) != -1">评分和评分人数可以按照书龄来选择</span>
            <div class="store-sort-item" v-show="['score', 'scorer'].indexOf(query.sort) != -1">
                <span :class="['item', query.scoreSort == item.status ? 'active' : null]" v-for="(item, $key) in scoreSortList" :key="'score'+$key" v-show="query.sort == 'score'" @click="updateScore(item.status)">{{item.name}}</span>
                <span :class="['item', query.scoreSort == item.status ? 'active' : null]" v-for="(item, $key) in scorerSortList" :key="'scorer'+$key" v-show="query.sort == 'scorer'" @click="updateScore(item.status)">{{item.name}}</span>
            </div>
        </div>
        <div class="result-view">
            <nuxt-link
                class="item"
                url="/pages/book/index"
                v-for="(item, $key) in novelList"
                :key="`book${$key}`"
                :to="`/novel/${item.id}.html`"
            >
                <div class="book-img">
                    <img :src="item.novel_img" alt="" />
                </div>
                <div class="item-info">
                    <div class="item-info-head">
                        <span class="book-name" :to="`/novel/${item.id}.html`">{{item.novel_name}}</span>
                        <span class="add-btn">加入书架</span>
                    </div>
                    <div class="book-info">
                        <span class="book-info-item">作者:{{item.author_name}}</span>
                    </div>
                    <div class="book-info">
                        <span class="book-info-item">{{item.word_number | wordNumFilter}}</span>
                        <span class="book-info-item">{{item.update_time | timeFil}}</span>
                    </div>
                    <div class="book-sore-list">
                        <span class="book-sore">当前评分：<em>{{ item.score }}</em>（{{ item.scorer }}人）</span>
                        <span class="book-info-item"></span>
                    </div>
                    <div class="book-tag">
                        <span class="book-tag-title">本书标签:</span>
                        <span
                            class="book-tag-item"
                            v-for="(item, $key) in item.novel_tags"
                            :key="$key"
                            >{{ item.tag_name }}</span>
                    </div>
                </div>
            </nuxt-link>
        </div>
        <Pagination
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
            beforeUrl: '',
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
        if (!process.server) return;

        const result = await Promise.all([
            app.$api.novel.getCategory(),
            app.$api.novel.getNovelList({ page: 1, scoreSort: 'score' })
        ]);

        const categoryList = result[0].data

        const pageAll = result[1].data.pageAll;
        const novelList = result[1].data.data;
        return {
            categoryList,
            pageAll,
            novelList
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if(from.name) vm.beforeUrl = from.path
        });
    },
    async mounted() {
        if (this.beforeUrl == '') return
        this.$store.commit('updateLoadingShow', true)
        await this.getCategory()
        await this.getNovelList()
        this.$store.commit('updateLoadingShow', false)
    },
    methods: {
        // 获取分类
        async getCategory() {
            const params = { 
                type: this.query.type 
            }
            const res = await this.$api.novel.getCategory(params)
            this.categoryList = res.data
        },
        // 获取小说列表
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
.main{
    padding-bottom: 130px;
}
.select-view {
    width: 100%;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 40px;
    margin-bottom: 20px;
    .classify-item {
        width: 100%;
        height: auto;
        display: flex;
        font-size: 28px;
        color: #aaa;
        line-height: 1em;
        padding-top: 20px;
        .classify-item-title {
            min-width: 80px;
        }
        .classify-labels {
            display: flex;
            flex-wrap: wrap;
            .item {
                padding: 0 20px;
                border-right: 1px solid #ddd;
                cursor: pointer;
                color: #aaa;
                margin-bottom: 30px;
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
    padding: 30px 30px 30px 20px;
    box-sizing: border-box;
    font-size: 28px;
    color: #aaa;
    margin-bottom: 20px;
    .store-sort-item {
        display: flex;
        line-height: 1em;
        padding: 20px 0;
        .item {
            padding: 0 20px;
            border-right: 1px solid #ddd;
            cursor: pointer;
            color: #aaa;
            padding: 0 20px;
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
        padding: 0 20px;
    }
}
.result-view {
    width: 100%;
    height: auto;
    background: #fff;
    padding: 0 40px;
    box-sizing: border-box;
    font-size: 28px;
    color: #999;
    .item {
        width: 100%;
        height: auto;
        padding: 40px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        .book-img {
            width: 200px;
            min-width: 200px;
            height: 264px;
            border-radius: 8px;
            cursor: pointer;
            overflow: hidden;
            margin-right: 30px;
            display: flex;
            align-items: center;
            background: #eee;
            img {
                width: 100%;
                height: auto;
            }
        }
        .item-info {
            width: 100%;
            height: auto;
            .item-info-head {
                width: 100%;
                height: 70px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .book-name {
                    width: 310px;
                    font-size: 32px;
                    font-weight: 700;
                    color: #333;
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .add-btn {
                    color: #567ceb;
                }
            }
            .book-info {
                line-height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .book-info-item {
                    margin-right: 20px;
                }
                .book-info-item:nth-last-child(1){
                    margin-right: 0;
                }
            }
            .book-sore {
                line-height: 50px;
            }
            .book-sore{
                margin-right: 20px;
                color: #333;
                em{
                    color: #FF6F59;
                    font-weight: bold;
                }
            }
            .book-tag{
                line-height: 50px;
                display: -webkit-box;
                overflow-x: auto;
                margin-top: 10px;
                .book-tag-title,
                .book-tag-item {
                    margin-right: 20px;
                }
            }
            .book-tag-item{
                display: block;
                padding: 0 8px;
                background-color: #f8f9fa;
                font-size: 24px;
            }
        }
    }
    .item:nth-last-child(1) {
        border: none;
    }
}
</style>