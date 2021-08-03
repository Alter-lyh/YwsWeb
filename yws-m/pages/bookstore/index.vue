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
    async activated() {
        console.log(1);
        // await this.getCategory()
        // await this.getNovelList()
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
    },
};
</script>

<style lang="less" scoped>
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
</style>