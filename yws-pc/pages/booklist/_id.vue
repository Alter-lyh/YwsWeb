<template>
    <div class="container">
        <div class="header">
            <div class="tag-list">
                <el-tag size="small" v-for="(item, key) in bookListInfo.categorys" :key="key">{{item.category_name}}({{item.count}})</el-tag>
            </div>
            <h1 class="title">{{bookListInfo.title}}</h1>
            <p class="desc">{{bookListInfo.intro}}</p>
            <div class="header-bot">
                <span>{{bookListInfo.update_time | timeFil}}</span>
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
                    <div class="item" v-for="(item, $key) in novelList" :key="$key">
                        <div class="book-info">
                            <div class="info-left">
                                <img :src="item.novel.novel_img" alt="">
                            </div>
                            <div class="info-right">
                                <nuxt-link :to="`/novel/${item.novel.id}.html`" class="info-list">
                                    <span class="book-name">{{item.novel.novel_name}}</span>
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
                                </nuxt-link>
                                <el-dropdown :hide-on-click="false"  @command="addBookshelf">
                                    <span class="el-dropdown-link">
                                        {{item.novel.bookshelf_status | novelBookshelfFil}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-show="item.novel.bookshelf_status != 1" :command="`1,${item.novel.id},${$key}`">正在追读</el-dropdown-item>
                                        <el-dropdown-item v-show="item.novel.bookshelf_status != 2" :command="`2,${item.novel.id},${$key}`">养肥待看</el-dropdown-item>
                                        <el-dropdown-item v-show="item.novel.bookshelf_status != 3" :command="`3,${item.novel.id},${$key}`">已经看过</el-dropdown-item>
                                        <el-dropdown-item v-show="item.novel.bookshelf_status != 0" :command="`0,${item.novel.id},${$key}`" :divided="true">取消收藏</el-dropdown-item>
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
import { getToken } from "@/plugins/auth";
export default {
    name: 'booklistItem',
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
            bookListInfo: {
                userInfo: {name: ''}
            },
            novelList: [],
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
            isServer: true
        }
    },
    head() {
        const {id, title, intro, userInfo} = this.bookListInfo
        let keywords = ''
        this.novelList.map(item => {
            keywords += item.novel.novel_name + '，'
        })
        return {
            title: `${title}_小说推荐单_阅文说`,
            meta: [
                {hid: 'og:title', name: 'og:title', content: `${title}_小说推荐单_阅文说` },
                {name: 'mobile-agent', content: `format=html5; url=https://m.ywshuo.com/booklist/${id}.html`},
                {hid: 'keywords', name: 'keywords', content: `${userInfo.name}关于${keywords}等小说推荐，阅文说`},
                {hid: 'og:keywords', name: 'og:keywords', content: `${userInfo.name}关于${keywords}等小说推荐，阅文说`},
                {hid: 'description', name: 'description', content: `${title}，${intro}，${userInfo.name}的小说推荐单，关于${keywords}等小说推荐，阅文说`},
                {hid: 'og:description', name: 'og:description', content: `${title}，${intro}，${userInfo.name}的小说推荐单，关于${keywords}等小说推荐，阅文说`},
            ],
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
        if (!process.server) return {isServer: false};
        
        const {id} = params
        const booklistId = id.replace('.html', '')

        const result = await Promise.all([
            app.$api.booklistApi.getInfo({ booklistId }),
            app.$api.booklistApi.getNovelList({ booklistId })
        ]);
        const bookListInfo = result[0].data

        let novelList = result[1].data.data
        novelList.map(item => {
            item.replayShow = false
            item.discussInfo.page = 1
            item.discussInfo.pageAll = 1
        })
        return {
            booklistId,
            bookListInfo,
            novelList
        };
    },
    async activated() {
        if (this.bookListInfo.title || this.isServer) return
        this.booklistId = this.$route.params.id.replace('.html', '')
        this.getInfo()
        this.getNovelList()
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
            this.novelList = res.data.data
            this.novelList.map(item => {
                item.discussInfo.moreStatus = false
                item.discussInfo.replayShow = false
                item.discussInfo.page = 1
                item.discussInfo.pageAll = 1
            })
        },
        // 更新筛选状态
        changeSort(status) {
            this.query.sort = status;
            // this.getNovelList();
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
        // 添加到书架
        async addBookshelf(data) {
            data = data.split(',')
            const $key = data[2]
            const params = {
                type: data[0] == 0 ? 0 : data[0],
                status: data[0] == 0 ? 2 : 1,
                novelId: data[1]
            }
            try {
                const res = await this.$api.bookshelfApi.setStatus(params)
                if (res.code != '00') return
                if (data[0] != 0) {
                    this.$message.success('加入成功');
                } else {
                    this.$message.success('取消成功');
                }
                this.novelList[$key]['novel']['bookshelf_status'] = data[0]
            } catch (error) {
                console.log(error)
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
    .title{
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