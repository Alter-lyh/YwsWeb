<template>
    <div class="container">
        <header class="header">
            <div class="tag-list">
                <el-tag size="small">古装</el-tag>
                <el-tag size="small">古装</el-tag>
            </div>
            <h3>变身小说合集</h3>
            <p class="desc">整理一下这些年看的变文，算是留个回忆吧。</p>
            <div class="header-bot">
                <span>201-45-45</span>
            </div>
        </header>
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
                        <p class="item-des">整理一下这些年看的变文，算是留个回忆吧。</p>
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
import {Bitcoin} from '@icon-park/vue'
export default {
    name: 'novel',
    components:{
        Bitcoin
    },
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
            sortList: [
                {
                    status: null,
                    name: "综合",
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
        }
    },
    watch: {
        discussType(type) {
            if (type == 2) {
                this.scoreValue = this.userScoreValue
                this.content = this.userContent
            } else {
                this.scoreValue = null
                this.content = null
            }
        }
    },
    async asyncData({ app, query, params }) {
        // 请检查您是否在服务器端
        if (!process.server) return;
        // query.page = query.page * 1 || 1;

        // const result = await Promise.all([
        //     app.$api.novel.getNovelInfo({ novelId: query.id }),
        // ]);

        // return {
        //     query: query,
        //     categoryList: result[0],
        //     pageAll: result[1].pageAll,
        //     novelList: result[1].data,
        // };
    },
    async activated() {
        // this.novelId = this.$route.query.id
        // await this.getNovelInfo()
        // await this.getDiscussList()
        // this.getDiscussInfo()
        // this.getUserTagList()
        // if (this.categoryList.length < 1) {
        //     await this.getCategory()
        //     await this.getNovelList()
        // }
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
.header{
	width: 100%;
	height: auto;
	box-sizing: border-box;
    padding: 20px 30px;
	background: #FFFFFF;
	position: relative;
    margin-bottom: 10px;
    .tag-list{
        .el-tag{
            cursor: pointer;
            margin-right: 8px;
        }
    }
    h3{
        font-size: 18px;
        color: #333;
        margin-top: 15px;
    }
    .desc{
        font-size: 14px;
        margin-top: 10px;
    }
    .header-bot{
        margin-top: 15px;
        span{
            font-size: 14px;
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
                .item-des{
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