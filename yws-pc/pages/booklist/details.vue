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
                        <div class="book-info">
                            <div class="info-left">
                                <img src="https://qidian.qpic.cn/qdbimg/349573/1014907056/300" alt="">
                            </div>
                            <div class="info-right">
                                <div class="info-list">
                                    <a href="" class="book-name">我的群员是大佬</a>
                                    <p class="info-item">
                                        <span>只会敲键盘</span>
                                        <span>199.8万字</span>
                                        <span>连载</span>
                                    </p>
                                    <p class="info-item">
                                        <span>更新时间:</span>
                                        <span>1年</span>
                                    </p>
                                    <p class="info-item">
                                        <span>单主评分:</span>
                                        <el-rate
                                            class="novel-score"
                                            disabled
                                            v-model="value">
                                        </el-rate>
                                    </p>
                                </div>
                                <el-dropdown :hide-on-click="false">
                                    <span class="el-dropdown-link">
                                        正在追读<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>黄金糕</el-dropdown-item>
                                        <el-dropdown-item>狮子头</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <p class="desc">整理一下这些年看的变文，算是留个回忆吧。</p>
                        <p class="create-time">发表于2019-07-21 00:44</p>
                        <DiscussActions replyNum="0" @setReplayShow="setReplayShow($key, item.id)" />
                    </div>
                    <div class="item">
                        <div class="book-info">
                            <div class="info-left">
                                <img src="https://qidian.qpic.cn/qdbimg/349573/1014907056/300" alt="">
                            </div>
                            <div class="info-right">
                                <div class="info-list">
                                    <a href="" class="book-name">我的群员是大佬</a>
                                    <p class="info-item">
                                        <span>只会敲键盘</span>
                                        <span>199.8万字</span>
                                        <span>连载</span>
                                    </p>
                                    <p class="info-item">
                                        <span>更新时间:</span>
                                        <span>1年</span>
                                    </p>
                                    <p class="info-item">
                                        <span>单主评分:</span>
                                        <el-rate
                                            class="novel-score"
                                            disabled
                                            v-model="value">
                                        </el-rate>
                                    </p>
                                </div>
                                <el-dropdown :hide-on-click="false">
                                    <span class="el-dropdown-link">
                                        正在追读<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>黄金糕</el-dropdown-item>
                                        <el-dropdown-item>狮子头</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <p class="desc">整理一下这些年看的变文，算是留个回忆吧。</p>
                        <p class="create-time">发表于2019-07-21 00:44</p>
                        <DiscussActions replyNum="0" @setReplayShow="setReplayShow($key, item.id)" />
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
            value: 3.7,
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
        setReplayShow() {

        }
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
            font-size: 14px;
            color: #999;
            .item {
                width: 100%;
                height: auto;
                background: #fff;
                padding: 20px;
                box-sizing: border-box;
                margin-bottom: 20px;
                .book-info{
                    display: flex;
                    margin-bottom: 10px;
                    .info-left{
                        width: 90px;
                        height: 120px;
                        border-radius: 4px;
                        overflow: hidden;
                        margin-right: 10px;
                        img{
                            width: 100%;
                            height: auto;
                            display: block;
                        }
                    }
                    .info-right{
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        .info-list{
                            .book-name{
                                max-width: 400px;
                                font-size: 18px;
                                font-weight: 700;
                            }
                            .info-item{
                                font-size: 14px;
                                color: #888;
                                margin-top: 10px;
                                display: flex;
                                align-items: center;
                                line-height: normal;
                                span{
                                    margin-right: 10px;
                                }
                                /deep/.novel-score{
                                    line-height: normal;
                                }
                            }
                        }
                        .el-dropdown-link {
                            cursor: pointer;
                        }
                    }
                }
                .desc{
                    font-size: 15px;
                    line-height: 2em;
                    color: #333;
                    word-wrap: break-word;
                    word-break: break-word;
                    white-space: pre-line;
                    overflow: hidden;
                }
                .create-time{
                    color: #999;
                    font-size: 12px;
                    display: block;
                    padding: 15px 0 20px;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 20px;
                }
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