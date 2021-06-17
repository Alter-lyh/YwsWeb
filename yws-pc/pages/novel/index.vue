<template>
    <div class="container">
        <header class="header">
            <img class="book-img" :src="novelInfo.novel_img" alt=""/>
            <div class="header-info">
                <div class="book-info">
                    <span class="book-name">{{novelInfo.novel_name}}</span>
                </div>
                <div class="author-info">作者：{{novelInfo.author_name}}</div>
                <div class="book-word">本书字数：{{novelInfo.word_number | wordNumFilter}}</div>
                <div class="book-status">状态：已完结</div>
                <div class="update-time">更新时间：{{novelInfo.update_time | timeFil}}</div>
                <div class="book-btns">
                    <el-dropdown>
                        <el-button size="small"  type="primary" class="bookinfo-button">
                            立即阅读
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, $key) in novelInfo.source" :key="$key"><a :href="item.bookPage">{{item.siteName}}</a></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link">
                            正在追读<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown :hide-on-click="false">
                        <div class="point">
                            <bitcoin theme="filled" size="24" fill="#FF6F59"/>
                            <i>{{novelInfo.point}}</i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>投币</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i slot="reference" class="el-icon-more discuss-actions-right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>加入书单</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <!-- 评分区域 -->
            <div class="book-score-view">
                <el-tabs type="border-card">
                    <el-tab-pane label="综合" class="tab-pane">
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer > 10">{{novelInfo.score}}</p>
                            <p class="no-score" v-else>暂无评分</p>
                            <p>评分</p>
                        </div>
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer > 10">{{novelInfo.scorer}}</p>
                            <p class="no-score" v-else>人数不足</p>
                            <p>评分人数</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="三年内" class="tab-pane">
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer_1 > 10">{{novelInfo.score_1}}</p>
                            <p class="no-score" v-else>暂无评分</p>
                            <p>评分</p>
                        </div>
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer_1 > 10">{{novelInfo.scorer_1}}</p>
                            <p class="no-score" v-else>人数不足</p>
                            <p>评分人数</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="七年内" class="tab-pane">
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer_2 > 10">{{novelInfo.score_2}}</p>
                            <p class="no-score" v-else>暂无评分</p>
                            <p>评分</p>
                        </div>
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer_2 > 10">{{novelInfo.scorer_2}}</p>
                            <p class="no-score" v-else>人数不足</p>
                            <p>评分人数</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="七年上" class="tab-pane"><div class="item">
                            <p class="score" v-if="novelInfo.scorer_3 > 10">{{novelInfo.score_3}}</p>
                            <p class="no-score" v-else>暂无评分</p>
                            <p>评分</p>
                        </div>
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer_3 > 10">{{novelInfo.scorer_3}}</p>
                            <p class="no-score" v-else>人数不足</p>
                            <p>评分人数</p>
                        </div></el-tab-pane>
                </el-tabs>
            </div>
        </header>
        <div class="tag-list">
            <el-tag size="small" v-for="(item, $key) in tagList" :key="$key">{{item.tag_name}}</el-tag>
            <el-button class="button-new-tag" size="mini">新建标签</el-button>
        </div>
        <section class="book-layout-main">
            <div class="book-layout-main-left">
                <div class="book-intro">
                    <el-collapse accordion>
                        <el-collapse-item :title="novelInfo.synTitle" name="1">
                            <div>{{novelInfo.synopsis}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="book-sort-view">
                    <div class="sort-view">
                        <div :class="['item', item.status == discussStatus ?'active' : '']" v-for="(item, $key) in sortList" :key="$key" @click="changeSort(item.status)">{{item.name}}</div>
                    </div>
                    <div class="comment-btn" @click="commentFlag = !commentFlag">
                        <i class="el-icon-edit icon"></i>
                    </div>
                </div>
                <!-- 发表评论 -->
                <div class="post-comment" v-show="commentFlag">
                    <div class="post-novel-info">
                        <p>{{discussStatus != 'chat'?'评分':'吐槽'}}：{{novelInfo.novel_name}}</p>
                        <el-rate
                            class="novel-score"
                            v-show="discussStatus != 'chat'"
                            v-model="scoreValue"
                            :colors="colors">
                        </el-rate>
                    </div>
                    <el-input
                        class="novel-comment"
                        type="textarea"
                        :autosize="{minRows: 5}"
                        placeholder="写评论，发表评论要记得先对本书进行打分噢(内容不得少于2个字)"
                        v-model="content">
                    </el-input>
                    <div class="post-comment-tools">
                        <el-button type="primary" size="small">发送评论</el-button>
                    </div>
                </div>
                <!-- 评论列表 -->
                <div class="comment-view">
                    <div class="item" v-for="(item, $key) in discussList" :key="$key">
                        <div class="item-header">
                            <div class="item-header-left">
                                <img class="author-img" src="https://avatar.lkong.com/avatar/000/68/77/17_avatar_small.jpg" alt=""/>
                                <div class="author-info">{{item.user.name}}</div>
                            </div>
                            <div class="novel-rate" v-show="item.score">
                                <el-rate
                                    :value="item.score/2"
                                    disabled
                                    text-color="#ff9900"
                                >
                                </el-rate>
                            </div>
                        </div>
                        <DiscussContent :content="item.content" :status="item.moreStatus" @checkShow="checkShow($key)" />
                        <DiscussActions :replyNum="item.reply_num" @setReplayShow="setReplayShow($key, item.id)" />
                        <DiscussReplay :replyNum="item.reply_num" :replyList="item.replyList" :page="item.page" :pageAll="item.pageAll" v-show="item.replayShow" />
                    </div>
                </div>
                <pagination
                    :currentPage="page"
                    :pageAll="pageAll"
                    @changePage="changePage"
                />
            </div>
        </section>
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
            novelId: '',
            novelInfo: {
                synTitle: '简介：'
            },
            tagList: [],
            page: 1,
            pageAll: 1,
            discussStatus: null,
            sortList: [
                {
                    status: null,
                    name: "综合",
                },
                {
                    status: 'latest',
                    name: "最新",
                },
                {
                    status: 'point',
                    name: "热度",
                },
                {
                    status: 'chat',
                    name: "吐槽",
                }
            ],
            commentFlag: false, //是否显示书写评论区
            scoreValue: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            content: null,
            discussList: [],
            value: 3.5,
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
        this.novelId = this.$route.query.id
        await this.getNovelInfo()
        await this.getDiscussList()
        // if (this.categoryList.length < 1) {
        //     await this.getCategory()
        //     await this.getNovelList()
        // }
    },
    methods: {
        async getNovelInfo() {
            const params = { 
                novelId: this.novelId
            }
            this.novelInfo = await this.$api.novel.getNovelInfo(params)
            this.novelInfo['synTitle'] = '简介：'
            this.novelInfo.synopsis.length > 46 ? this.novelInfo['synTitle'] += this.novelInfo.synopsis.slice(0, 46) + '...' : this.novelInfo['synTitle'] += this.novelInfo.synopsis
            this.novelInfo.source = JSON.parse(this.novelInfo.source)
            this.tagList = this.novelInfo.novel_tags
        },
        async getDiscussList() {
            const params = { 
                novelId: this.novelId,
                page: this.page,
                num: 20,
                score: this.discussStatus != 'chat' ? 1 : 0, //1只展示有评分的，其他只展示无评分的
                sort: this.discussStatus != 'chat' ? this.discussStatus : null,
            }
            try {
                const res = await this.$api.novel.getDiscussList(params)
                this.page = res.page*1
                this.pageAll = res.pageAll
                this.discussList = res.data
                this.discussList.map(item => {
                    item.moreStatus = false
                    item.replayShow = false
                    item.page = 1
                    item.pageAll = 1
                })
            } catch (error) {
                console.log(error)
            }
        },
        // 分页
        changePage(page) {
            this.page = page;
            this.getDiscussList();
        },
        // 切换
        checkShow($key) {
            this.discussList[$key].moreStatus = !this.discussList[$key].moreStatus
            this.$set(this.discussList, $key, this.discussList[$key])
        },
        // 展开收起评论
        async setReplayShow($key, discussId) {
            this.discussList[$key].replayShow = !this.discussList[$key].replayShow
            if (this.discussList[$key].replayShow) {
                const params = {
                    discussId: discussId
                }
                const res = await this.$api.discussApi.getReply(params)
                console.log(res)
                this.discussList[$key].replyList = res.data
                this.discussList[$key].page = res.page
                this.discussList[$key].pageAll = res.pageAll
            }

            this.$set(this.discussList, $key, this.discussList[$key])
        },
        // 更新筛选状态
        changeSort(status) {
            this.discussStatus = status;
            this.getDiscussList();
        },
        // 发布评论
        async postDiscuss() {
            const params = {
                novelId: this.novelId,
                score: this.scoreValue,
                content: this.content,
            }
            try {
                const res = await this.$api.novel.postDiscuss(params)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
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
    padding-bottom: 0;
	display: flex;
	align-items: center;
	background: #FFFFFF;
	position: relative;
	.book-img{
		width: 150px;
        min-width: 150px;
        height: 200px;
		border-radius: 4px;
		overflow: hidden;
		margin-right: 20px;
	}
	.header-info{
		font-size: 16px;
		color: #666;
		.book-name{
            font-size: 24px;
            font-weight: bold;
			color: #000;
			margin-right: 10px;
        }
        .book-info{
            margin-bottom: 10px;
        }
		.book-tag{
			color: #409EFF;
		}
		.author-info,.book-word,.book-status,.update-time{
			margin-top: 6px;
        }
        .book-btns{
            margin-top: 12px;
        }
        .book-btns{
            display: flex;
            align-items: center;
            .el-dropdown{
                margin-right: 20px;
            }
            .el-dropdown-link {
                cursor: pointer;
                color: #567ceb;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
        }
        .point{
            width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 12px;
                font-weight: bold;
                color: #FF6F59;
                margin-left: 4px;
            }
        }
    }
    .book-score-view{
        height: auto;
        position: absolute;
        right: 30px;
        top: 20px;
        .tab-pane{
            display: flex;
            justify-content: center;
            align-items: center;
            .item{
                width: 48%;
                height: auto;
                p{
                    text-align: center;
                    line-height: 20px;
                    font-size: 12px;
                }
                .score{
                    font-size: 24px;
                    font-weight: bold;
                    color: #FF6F59;
                    line-height: 40px;
                }
                .no-score{
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 40px;
                }
            }
        }
        /deep/.el-tabs--border-card{
            box-sizing: border-box;
        }
        /deep/.el-tabs__item:nth-last-child(1){
            border-right: none;
        }
    }
}
.tag-list{
    width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 10px 30px;
    background: #FFFFFF;
    .el-tag{
        cursor: pointer;
        margin-right: 8px;
    }
    /deep/.el-button{
        padding: 5.4px 10px;
    }
}
.book-layout-main{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .book-layout-main-left{
        width: 710px;
        .book-intro{
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            background: #fff;
            font-size: 28rpx;
            color: #666;
        }
        .book-sort-view{
            width: 100%;
            height: 56px;
            padding: 0 20px;
            padding-left: 10px;
            box-sizing: border-box;
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            .sort-view{
                display: flex;
                align-items: center;
                .item{
                    min-width: 2em;
                    font-size: 14px;
                    padding: 0 10px;
                    border-right: 1px solid #ddd;
                    cursor: pointer;
                    color: #aaa;
                    position: relative;
                }
                .item:nth-last-child(1){
                    border-right: none;
                }
                .active{
                    color: #000;
                    font-weight: bold;
                }
            }
            .comment-btn{
                color: #888;
                .icon{
                    font-size: 20px;
                    cursor: pointer;
                    margin-right: 4px;
                }
            }
        }
        .post-comment{
            width: 100%;
            box-sizing: border-box;
            padding: 20px;
            background: #fff;
            margin: 10px 0;
            .post-novel-info{
                height: 30px;
                line-height: normal;
                display: flex;
                margin-bottom: 10px;
                p{
                    color: #333;
                    font-weight: bold;
                    margin-right: 15px;
                }
            }
            /deep/.el-textarea{
                textarea::-webkit-input-placeholder {
                    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
                }
                textarea:-moz-placeholder {
                    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
                }
                textarea::-moz-placeholder {
                    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
                }
                textarea::-ms-input-placeholder {
                    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
                }
            }
            .novel-comment{
                margin-bottom: 10px;
            }
            .post-comment-tools{
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }
        .comment-view{
            width: 100%;
            .item{
                width: 100%;
                height: auto;
                padding: 10px 20px;
                box-sizing: border-box;
                background-color: #FFFFFF;
                margin-bottom: 10px;
                .item-header{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .item-header-left{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .author-img{
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin-right: 10px;
                        }
                        .author-info{
                            font-size: 14px;
                            color: #616161;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
}
/deep/.el-collapse-item__header{
    border-bottom: none;
}
</style>