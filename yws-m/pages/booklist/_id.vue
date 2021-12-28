<template>
    <div class="container">
        <header class="header">
            <div class="tag-list">
                <van-tag class="tag" type="warning" size="medium" v-for="(item, key) in bookListInfo.categorys" :key="key">{{item.category_name}}({{item.count}})</van-tag>
            </div>
            <h3>{{bookListInfo.title}}</h3>
            <p class="desc">{{bookListInfo.intro}}</p>
            <div class="header-bot">
                <span>{{bookListInfo.update_time | timeFil}}</span>
            </div>
        </header>
        <div class="store-sort">
            <div class="store-sort-item">
                <span :class="['item', query.sort == item.status ? 'active' : null]" v-for="(item, $key) in sortList" :key="$key" @click="changeSort(item.status)">{{item.name}}</span>
            </div>
        </div>
        <div class="result-view">
            <div class="item" v-for="(item, $key) in novelList" :key="$key">
                <nuxt-link :to="`/novel/${item.novel.id}.html`" class="book-info">
                    <div class="info-left">
                        <img :src="item.novel.novel_img" alt="">
                    </div>
                    <div class="info-right">
                        <div class="info-list">
                            <span class="book-name">{{item.novel.novel_name}}</span>
                            <div class="author-info">作者：{{item.novel.author_name}}</div>
                            <div class="book-word">本书字数：{{item.novel.word_number | wordNumFilter}}</div>
                            <div class="book-status">状态：{{item.novel.update_status | updateStatusFil}}</div>
                            <div class="update-time">更新时间：{{item.novel.update_time | timeFil}}</div>
                        </div>
                        <div class="more-nav" @click.prevent="showItemMore(item.novel, $key)">
                            {{item.novel.bookshelf_status | novelBookshelfFil}}
                        </div>
                    </div>
                </nuxt-link>
                <DiscussContent :content="item.discussInfo.content" :status="item.discussInfo.moreStatus" :editTime="item.discussInfo.update_time" :scoreNum="item.discussInfo.score/2" @checkShow="checkShow($key)" />
                <DiscussActions :dzNum="item.discussInfo.dz_num" :cNum="item.discussInfo.c_num" :replyNum="item.discussInfo.reply_num" :discussId="item.discussInfo.id" @setReplayShow="setReplayShow($key)" @setStatus="setStatus($event, $key)"/>
                <DiscussReplay v-show="item.replayShow" :replayShow="item.replayShow" :novelId="item.novel_id" :discussId="item.discuss_id" />
            </div>
        </div>
        <Pagination
            class="pagin-ation"
            :currentPage="query.page"
            :pageAll="pageAll"
            @changePage="changePage"
        />
        <!-- 书籍更多操作 -->
        <van-action-sheet v-model="showPopover" cancel-text="取消" close-on-click-action :actions="actions" @select="addBookshelf" />
    </div>
</template>
<script>
import {Bitcoin} from '@icon-park/vue'
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
            novelId: '',
            $key: 0,
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
            // 书籍更多选项
            showPopover: false,
            // 通过 actions 属性来定义菜单选项
            actions: [{name: '正在追读', type: 1}, {name: '养肥待看', type: 2}, {name: '已经看过', type: 3}, {name: '取消收藏', type: 0}],
            isServer: true
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
        this.$store.commit('updateLoadingShow', true)
        await this.getInfo()
        await this.getNovelList()
        this.$store.commit('updateLoadingShow', false)
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
                item.replayShow = false
                item.discussInfo.page = 1
                item.discussInfo.pageAll = 1
            })
        },
        // 显示加入书架等选项
        showItemMore(novel, $key) {
            this.actions = [{name: '正在追读', type: 1}, {name: '养肥待看', type: 2}, {name: '已经看过', type: 3}, {name: '取消收藏', type: 0}]
            this.actions = this.actions.filter(i => i.type != novel.bookshelf_status)
            this.novelId = novel.id
            this.$key = $key
            this.showPopover = true
        },
        // 添加到书架
        async addBookshelf(action) {
            const {type} = action
            const params = {
                type: type,
                status: type == 0 ? 2 : 1,
                novelId: this.novelId
            }
            try {
                const res = await this.$api.bookshelfApi.setStatus(params)
                if (res.code != '00') return
                if (type != 0) {
                    this.$notify({ type: 'success', message: '加入成功' });
                } else {
                    this.$notify({ type: 'success', message: '取消成功' });
                }
                this.novelList[this.$key]['novel']['bookshelf_status'] = type
            } catch (error) {
                console.log(error)
            }
        },
        // 更新筛选状态
        changeSort(status) {
            this.query.sort = status;
            // this.getNovelList();
        },
        // 切换
        checkShow($key) {
            this.novelList[$key].discussInfo.moreStatus = !this.novelList[$key].discussInfo.moreStatus
            this.$set(this.novelList, $key, this.novelList[$key].discussInfo)
        },
        // 展开收起评论
        async setReplayShow($key) {
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
    padding: 40px 40px;
	background: #FFFFFF;
	position: relative;
    margin-bottom: 20px;
    .tag-list{
        .tag{
            cursor: pointer;
            margin-right: 16px;
        }
    }
    h3{
        font-size: 36px;
        color: #333;
        margin-top: 30px;
    }
    .desc{
        font-size: 28px;
        margin-top: 20px;
    }
    .header-bot{
        margin-top: 30px;
        span{
            font-size: 28px;
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
}
.result-view {
    width: 100%;
    height: auto;
    font-size: 28px;
    color: #999;
    .item {
        width: 100%;
        height: auto;
        background: #fff;
        padding: 40px;
        box-sizing: border-box;
        margin-bottom: 40px;
        .book-info{
            display: flex;
            margin-bottom: 20px;
            position: relative;
            .info-left{
                width: 200px;
                min-width: 200px;
                height: 264px;
                border-radius: 8px;
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
                    font-size: 28px;
                    color: #666;
                    .book-name{
                        font-size: 36px;
                        font-weight: bold;
                        color: #000;
                        margin-bottom: 20px;
                        display: block;
                    }
                    .book-tag{
                        color: #409EFF;
                    }
                    .author-info,.book-word,.book-status,.update-time{
                        margin-top: 10px;
                    }
                }
            }
            .more-nav{
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
}
</style>