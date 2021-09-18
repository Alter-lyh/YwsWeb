<template>
    <div class="container">
        <header class="header">
            <div class="tag-list">
                <el-tag size="small" v-for="(item, key) in bookListInfo.categorys" :key="key">{{item.category_name}}({{item.count}})</el-tag>
            </div>
            <h3>{{bookListInfo.title}}</h3>
            <p class="desc">{{bookListInfo.intro}}</p>
            <div class="header-bot">
                <span>{{bookListInfo.update_time | timeFil}}</span>
            </div>
        </header>
        <div class="content">
            <div class="content-left">
                <div class="store-sort">
                    <div class="store-sort-item">
                        <span :class="['item', query.sort == item.status ? 'active' : null]" v-for="(item, $key) in sortList" :key="$key" @click="changeSort(item.status)">{{item.name}}</span>
                    </div>
                </div>
                <div class="result-view">
                    <div class="item" v-for="(item, $key) in novelList" :key="$key">
                        <div class="book-info">
                            <div class="info-left">
                                <img :src="item.novel.novel_img" alt="">
                            </div>
                            <div class="info-right">
                                <div class="info-list">
                                    <a href="" class="book-name">{{item.novel.novel_name}}</a>
                                    <p class="info-item">
                                        <span>{{item.novel.author_name}}</span>
                                        <span>{{item.novel.word_number | wordNumFilter}}</span>
                                        <span>{{item.novel.update_status | updateStatusFil}}</span>
                                    </p>
                                    <p class="info-item">
                                        <span>更新时间:</span>
                                        <span>{{item.novel.update_time | timeFil}}</span>
                                    </p>
                                    <div class="info-item">
                                        <span>单主评分:</span>
                                        <el-rate
                                            class="novel-score"
                                            disabled
                                            :value="item.discussInfo.score/2"
                                            text-color="#ff9900">
                                        </el-rate>
                                    </div>
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
                        <DiscussContent :content="item.discussInfo.content" :status="item.discussInfo.moreStatus" :editTime="item.discussInfo.update_time" :scoreNum="item.discussInfo.score/2" @checkShow="checkShow($key)" />
                        <DiscussActions :dzNum="item.discussInfo.dz_num" :cNum="item.discussInfo.c_num" :replyNum="item.discussInfo.reply_num" :discussId="item.discussInfo.id" @setReplayShow="setReplayShow($key)" @setStatus="setStatus($event, $key)"/>
                        <DiscussReplay v-show="item.replayShow" :replayShow="item.replayShow" :novelId="item.novel_id" :discussId="item.discuss_id" />
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
            booklistId: '',
            bookListInfo: {},
            novelList: [],
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
        this.booklistId = this.$route.params.id.replace('.html', '')
        await this.getInfo()
        await this.getNovelList()
    },
    methods: {
        async getInfo() {
            const params = {
                booklistId: this.booklistId
            }
            const res = await this.$api.booklistApi.getInfo(params)
            this.bookListInfo = res.data
        },
        async getNovelList() {
            const params = {
                booklistId: this.booklistId
            }
            const res = await this.$api.booklistApi.getNovelList(params)
            console.log(res);
            this.novelList = res.data.data
            this.novelList.map(item => {
                item.discussInfo.moreStatus = false
                item.discussInfo.replayShow = false
                item.discussInfo.page = 1
                item.discussInfo.pageAll = 1
            })
        },
        // 切换
        checkShow($key) {
            this.novelList[$key].discussInfo.moreStatus = !this.novelList[$key].discussInfo.moreStatus
            this.$set(this.novelList, $key, this.novelList[$key])
        },
        // 展开收起评论
        async setReplayShow($key, discussId) {
            this.novelList[$key].replayShow = !this.novelList[$key].replayShow
            this.$set(this.novelList, $key, this.novelList[$key])
        },
        // 点赞
        async setStatus(json, $key) {
            if (json.type == 1) {
                if (json.status == 1) {
                    this.$notify({ type: 'success', message: '点赞成功' });
                    this.novelList[$key].discussInfo.dz_num++
                } else {
                    this.$notify({ type: 'success', message: '取消成功' });
                    this.novelList[$key].discussInfo.dz_num--
                }
            } else {
                if (json.status == 1) {
                    this.$notify({ type: 'success', message: '点踩成功' });
                    this.novelList[$key].discussInfo.c_num++
                } else {
                    this.$notify({ type: 'success', message: '取消成功' });
                    this.novelList[$key].discussInfo.c_num--
                }
            }
        },
        // 分页
        changePage(page) {
            this.page = page;
        },
    }
}
</script>
<style lang="less" scoped>
.header{
	width: 100%;
	height: auto;
	box-sizing: border-box;
    padding: 20px 20px;
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
                    margin-bottom: 20px;
                    .info-left{
                        width: 90px;
                        height: 120px;
                        border-radius: 4px;
                        overflow: hidden;
                        margin-right: 20px;
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