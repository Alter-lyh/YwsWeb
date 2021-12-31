<template>
    <div class="container">
        <header class="header">
            <img class="book-img" :src="novelInfo.novel_img" alt=""/>
            <div class="header-info">
                <div class="book-info">
                    <h1 class="book-name">{{novelInfo.novel_name}}</h1>
                </div>
                <div class="author-info">作者：{{novelInfo.author_name}}</div>
                <div class="book-word">本书字数：{{novelInfo.word_number | wordNumFilter}}</div>
                <div class="book-status">状态：{{novelInfo.update_status | updateStatusFil}}</div>
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
                    <el-dropdown :hide-on-click="false" @command="addBookshelf">
                        <span class="el-dropdown-link">
                            {{novelBookshelfStatus | novelBookshelfFil}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-show="novelBookshelfStatus != 1" command="1">正在追读</el-dropdown-item>
                            <el-dropdown-item v-show="novelBookshelfStatus != 2" command="2">养肥待看</el-dropdown-item>
                            <el-dropdown-item v-show="novelBookshelfStatus != 3" command="3">已经看过</el-dropdown-item>
                            <el-dropdown-item v-show="novelBookshelfStatus != 0" command="0" :divided="true">取消收藏</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown :hide-on-click="false" @command="showCoin">
                        <div class="point" @click="showCoin">
                            <bitcoin theme="filled" size="24" fill="#FF6F59"/>
                            <i>{{novelInfo.point}}</i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>投币</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="click" placement="bottom" @command="moreActions">
                        <span class="el-dropdown-link">
                            <i slot="reference" class="el-icon-more discuss-actions-right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">创建书单</el-dropdown-item>
                            <el-dropdown-item command="2">加入书单</el-dropdown-item>
                            <el-dropdown-item command="3">错误反馈</el-dropdown-item>
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
                    <el-tab-pane label="七年上" class="tab-pane">
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer_3 > 10">{{novelInfo.score_3}}</p>
                            <p class="no-score" v-else>暂无评分</p>
                            <p>评分</p>
                        </div>
                        <div class="item">
                            <p class="score" v-if="novelInfo.scorer_3 > 10">{{novelInfo.scorer_3}}</p>
                            <p class="no-score" v-else>人数不足</p>
                            <p>评分人数</p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="user-score" @click="commentFlag = !commentFlag">
                    <span>我的评分</span>
                    <el-rate
                        class="novel-score"
                        disabled
                        v-model="userScore.score"
                        :colors="colors">
                    </el-rate>
                </div>
            </div>
        </header>
        <div class="tag-list">
            <el-tag size="small" v-for="(item, $key) in tagList" :key="$key">{{item.tag_name}}</el-tag>
            <el-tag size="small" v-for="(item, $key) in userTagList" closable type='success' :key="`userTag${$key}`" @close="closeTag(item,$key)">{{item.tag_name}}</el-tag>
            <el-input
                class="input-new-tag"
                v-if="tagInputFlag"
                v-model="tagText"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="addUserTag"
                @blur="tagInputFlag = !tagInputFlag"
                >
            </el-input>
            <el-button v-else class="button-new-tag" size="mini" @click="showAddTag">新建标签</el-button>
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
                        <p class="tips">最新和热度都只展示评分</p>
                    </div>
                    <div class="comment-btn" @click="commentFlag = !commentFlag">
                        <i class="el-icon-edit icon"></i>
                    </div>
                </div>
                <!-- 发表评论 -->
                <div class="post-comment" v-show="commentFlag">
                    <div class="post-novel-info">
                        <p class="discuss-type">
                            <span v-for="(item, $key) in discussTypeList" :key="`discuss${$key}`" :class="['item', discussType == item.type ? 'active' : '']" @click="discussType = item.type">{{item.text}}</span>
                            <span>{{novelInfo.novel_name}}</span>
                        </p>
                        <el-rate
                            class="novel-score"
                            v-show="discussType == 2"
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
                        <el-button type="primary" size="small" @click="postDiscuss">{{userScore.score >0 && discussType == 2 ? '修改评论' : '发送评论'}}</el-button>
                    </div>
                </div>
                <!-- 评论列表 -->
                <div class="comment-view">
                    <div class="item" v-for="(item, $key) in discussList" :key="$key">
                        <div class="item-header">
                            <div class="item-header-left">
                                <img class="author-img" src="@/assets/img/user_defalut.png" alt=""/>
                                <div class="author-info">{{item.userInfo.name}}</div>
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
                        <DiscussContent :content="item.content" :editTime="item.update_time" />
                        <DiscussActions :dzNum="item.dz_num" :cNum="item.c_num" :replyNum="item.reply_num" :discussId="item.id" @setReplayShow="setReplayShow($key)" @setStatus="setStatus($event, $key)"/>
                        <DiscussReplay v-show="item.replayShow" :replayShow="item.replayShow" :novelId="novelId" :discussId="item.id" />
                    </div>
                </div>
                <pagination
                    :currentPage="page"
                    :pageAll="pageAll"
                    @changePage="changePage"
                />
            </div>
        </section>
        <Coin @insertCoin="insertCoin"/>
        <BooklistAdd />
        <BooklistChoice :userBooklist="userBooklist" :userScore="userScore" @addToBooklist="addToBooklist"/>
    </div>
</template>
<script>
import {Bitcoin} from '@icon-park/vue'
import { getToken } from "@/plugins/auth";
export default {
    name: 'novel',
    components:{
        Bitcoin
    },
    data() {
        return {
            novelId: '',
            novelInfo: {
                synTitle: '简介：',
                novel_tags: [{tag_name: ''}]
            },
            tagList: [],
            tagInputFlag: false,
            tagText: '',
            userTagList: [],
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
            discussType: 1,
            discussTypeList: [
                {
                    type: 1,
                    text: '吐槽'
                },
                {
                    type: 2,
                    text: '评分'
                }
            ],
            scoreValue: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            content: '',
            // 用户评分
            userDiscussId: '',
            userScore: {},
            discussList: [],
            // 用户书籍在书架状态
            novelBookshelfStatus: 0,
            // 投币类型
            coinType: 1,
            // 用户书单
            userBooklist: [],
            isServer: true
        }
    },
    head() {
        const {id, novel_name, author_name, synTitle, novel_img, novel_tags} = this.novelInfo
        return {
            title: `${novel_name}_${author_name}_阅文说`,
            meta: [
                {hid: 'og:type', name: 'og:type', content: 'novel'},
                {hid: 'og:title', name: 'og:title', content: `${novel_name}_${author_name}_阅文说` },
                {hid: 'keywords', name: 'keywords', content: `${novel_name}, ${novel_name}评分, ${novel_name}最新章节, ${novel_name}追更阅读, ${author_name}, 阅文说`},
                {hid: 'og:keywords', name: 'og:keywords', content: `${novel_name}, ${novel_name}评分, ${novel_name}最新章节, ${novel_name}追更阅读, ${author_name}, 阅文说`},
                {hid: 'description', name: 'description', content: `${novel_name}是大神${author_name}所著，${novel_name}的评分、吐槽、深度解析、追更阅读由阅文说提供，${novel_name}${synTitle}`},
                {hid: 'og:description', name: 'og:description', content: `${novel_name}是大神${author_name}所著，${novel_name}的评分、吐槽、深度解析、追更阅读由阅文说提供，${novel_name}${synTitle}`},
                {hid: 'og:image', name: 'og:image', content: novel_img },
                {hid: 'og:novel:category', name: 'og:novel:category', content: novel_tags[0].tag_name },
                {hid: 'og:novel:author', name: 'og:novel:author', content: author_name },
                {hid: 'og:novel:book_name', name: 'og:novel:book_name', content: novel_name },
                {hid: 'og:novel:read_url', name: 'og:novel:read_url', content: `https://www.ywshuo.com/novel/${id}.html`},
            ],
        }
    },
    watch: {
        discussType(type) {
            if (type == 2) {
                this.scoreValue = this.userScore.score
                this.content = this.userScore.content
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
        const novelId = id.replace('.html', '')

        const result = await Promise.all([
            app.$api.novel.getNovelInfo({ novelId }),
            app.$api.novel.getDiscussList({ novelId, page: 1, num: 20, score: 0 })
        ]);
        // 书籍信息
        let novelInfo = result[0].data
        novelInfo['synTitle'] = '简介：'
        novelInfo.synopsis.length > 16 ? novelInfo['synTitle'] += novelInfo.synopsis.slice(0, 16) + '...' : novelInfo['synTitle'] += novelInfo.synopsis
        novelInfo.source = JSON.parse(novelInfo.source)

        // 标签
        const tagList = novelInfo.novel_tags

        // 当前页
        const page = result[1].data.page*1
        const pageAll = result[1].data.pageAll
        let discussList = result[1].data.data
        discussList.map(item => {
            item.replayShow = false
            item.page = 1
            item.pageAll = 1
        })

        return {
            novelInfo,
            tagList,
            page,
            pageAll,
            discussList
        };
    },
    async activated() {
        this.novelId = this.$route.params.id.replace('.html', '')
        if (!this.isServer){
            await this.getNovelInfo()
            await this.getDiscussList()
        }
        
        if (getToken()) {
            this.getDiscussInfo()
            this.getUserTagList()
            this.getBookShelfNoverStatus()
        }
    },
    methods: {
        async getNovelInfo() {
            const params = { 
                novelId: this.novelId
            }
            const res = await this.$api.novel.getNovelInfo(params)
            this.novelInfo = res.data
            this.novelInfo['synTitle'] = '简介：'
            this.novelInfo.synopsis.length > 46 ? this.novelInfo['synTitle'] += this.novelInfo.synopsis.slice(0, 46) + '...' : this.novelInfo['synTitle'] += this.novelInfo.synopsis
            this.novelInfo.source = JSON.parse(this.novelInfo.source)
            this.tagList = this.novelInfo.novel_tags
        },
        async getDiscussList() {
            let scoreStatus = 1
            if (this.discussStatus == 'chat') {
                scoreStatus = 2
            } else if (this.discussStatus == null) {
                scoreStatus = 0
            }

            const params = { 
                novelId: this.novelId,
                page: this.page,
                num: 20,
                score: scoreStatus, //1只展示有评分的，其他只展示无评分的
                sort: this.discussStatus != 'chat' ? this.discussStatus : null,
            }

            const res = await this.$api.novel.getDiscussList(params)
            const json = res.data
            this.page = json.page*1
            this.pageAll = json.pageAll
            this.discussList = json.data
            this.discussList.map(item => {
                item.replayShow = false
                item.page = 1
                item.pageAll = 1
            })
        },
        // 获取用户评论信息
        async getDiscussInfo() {
            const params = { 
                novelId: this.novelId
            }
            try {
                const res = await this.$api.novel.getDiscussInfo(params)
                const json = res.data
                this.userDiscussId = json.id
                this.userScore = {
                    score: json.score/2,
                    content: json.content
                }
            } catch (error) {
                console.log(error)
            }
        },
        // 显示输入新标签
        showAddTag() {
            this.tagInputFlag = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // 添加新的标签
        async addUserTag() {
            console.log(this.tagText)
            const params = {
                novelId: this.novelId,
                type: 1,
                tagName: this.tagText
            }
            const res = await this.$api.novel.editTag(params)
            // let inputValue = this.inputValue;
            // if (inputValue) {
            //     this.dynamicTags.push(inputValue);
            // }
            // this.inputVisible = false;
            // this.inputValue = '';
        },
        // 获取用户小说标签
        async getUserTagList() {
            const params = {
                novelId: this.novelId
            }
            const {data} = await this.$api.novel.getUserTagList(params)
            this.userTagList = data
        },
        // 删除用户标签
        async closeTag(item, $key) {
            const params = {
                novelId: this.novelId,
                type: 2,
                tagName: item.tag_name
            }
            const res = await this.$api.novel.editTag(params)
            this.userTagList.splice($key, 1);
        },
        // 分页
        changePage(page) {
            this.page = page;
            this.getDiscussList();
        },
        // 展开收起评论
        async setReplayShow($key) {
            this.discussList[$key].replayShow = !this.discussList[$key].replayShow
            this.$set(this.discussList, $key, this.discussList[$key])
        },
        // 更新筛选状态
        changeSort(status) {
            this.discussStatus = status;
            this.getDiscussList();
        },
        // 发布评论
        async postDiscuss() {
            if (this.content.length < 5) return this.$message.error('评论必须大于5个字');
            if (this.scoreValue <= 0 && this.discussType == 2) return this.$message.error('评分必须大于0');
            
            const type = this.userScore.score > 0 && this.discussType == 2 ? 2 : 1
            const params = {
                novelId: this.novelId,
                type: type, // 1 发布评论(评分和吐槽) 2修改评分
                score: this.discussType != 1 ? this.scoreValue : null,
                content: this.content,
            }
            try {
                const res = await this.$api.novel.postDiscuss(params)
                if (this.discussType == 2) this.getDiscussInfo()
                this.$message.success('发布成功');
                this.getDiscussList()
                this.commentFlag = false
            } catch (error) {
                console.log(error)
            }
        },
        // 点赞
        async setStatus(json, $key) {
            if (json.type == 1) {
                if (json.status == 1) {
                    this.$message.success('点赞成功')
                    this.discussList[$key].dz_num++
                } else {
                    this.$message.success('取消成功')
                    this.discussList[$key].dz_num--
                }
            } else {
                if (json.status == 1) {
                    this.$message.success('点踩成功')
                    this.discussList[$key].c_num++
                } else {
                    this.$message.success('取消成功')
                    this.discussList[$key].c_num--
                }
            }
        },
        // 获取书籍在书架状态
        async getBookShelfNoverStatus() {
            const params = {
                novelId: this.novelId
            }
            try {
                // console.log(params);
                const res = await this.$api.bookshelfApi.getNoverStatus(params)
                res.data.status == 1 ? this.novelBookshelfStatus = res.data.type : this.novelBookshelfStatus = 0
            } catch (error) {
                console.log(error)
            }
        },
        // 添加到书架
        async addBookshelf(type) {
            const params = {
                type: type == 0 ? 0 : type,
                status: type == 0 ? 2 : 1,
                novelId: this.novelId
            }
            try {
                const res = await this.$api.bookshelfApi.setStatus(params)
                if (res.code != '00') return
                if (type != 0) {
                    this.$message.success('加入成功');
                } else {
                    this.$message.success('取消成功');
                }
            } catch (error) {
                console.log(error)
            }
        },
        showCoin() {
            this.coinType = 1
            this.$store.commit('updateCoinView', true)
        },
        // 投币
        async insertCoin(coinNum) {
            const params = {
                target: this.coinType,
                targetId: this.novelId,
                changeNum: coinNum
            }
            // 打赏书籍
            if (this.coinType == 1) {
                const res = await this.$api.novel.addPoint(params)
                if (res.code != '00') return
                this.$message.success('谢谢打赏');
                this.getNovelInfo()
                this.$store.commit('updateCoinView', false)
            }
        },
        // 更多区域
        async moreActions(command) {
            if (command == 1) {
                this.$store.commit("updateBookListAdd", true);
            } else if (command == 2) {
                const params = {
                    num: 100,
                    userId: this.$store.getters.getUserInfo.id,
                }
                const res = await this.$api.booklistApi.getBooklist(params)
                if (res.code != '00') {
                    this.$message.success('请先新建书单');
                    this.$store.commit("updateBookListAdd", true);
                    return
                }
                this.userBooklist = res.data.data
                this.$store.commit("updateBookListChoice", true);
            }
        },
        // 加入到书单
        async addToBooklist(booklistId) {
            const params = {
                booklistId,
                novelId: this.novelId,
                discussId: this.userDiscussId,
                categoryId: this.novelInfo.category_id,
                score: this.userScore.score,
                content: this.userScore.content
            }
            try {
                const res = await this.$api.booklistApi.addBooklistNovel(params)
                if (res.code != '00') {
                    this.$message.error('加入失败');
                } else {
                    this.$message.success('加入成功');
                }
            } catch (error) {
                console.log(error);
            }
            this.$store.commit("updateBookListChoice", false);
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
            cursor: pointer;
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
        .user-score{
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            margin-top: 30px;
            color: #333;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;;
            span{
                margin-right: 10px;
            }
            /deep/.el-rate__item{
                cursor: pointer!important;;
            }
        }
    }
}
.tag-list{
    width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 10px 30px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .el-tag{
        cursor: pointer;
        margin-right: 8px;
        margin-bottom: 8px;
    }
    /deep/.el-button{
        padding: 5.4px 10px;
        margin-bottom: 8px;
    }
    /deep/.el-input{
        width: 70px;
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
                .tips{
                    font-size: 12px;
                    color: #E6A23C;
                    margin-left: 10px;
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
                .discuss-type{
                    color: #aaa;
                    font-weight: bold;
                    margin-right: 15px;
                    margin-left: -10px;
                    .item{
                        font-size: 14px;
                        padding: 0 10px;
                        border-right: 1px solid #ddd;
                        cursor: pointer;
                        color: #333;
                    }
                    .item:nth-child(2){
                        border-right: none;
                    }
                    .active{
                        color: #E6A23C;
                        font-weight: bold;
                    }
                }
            }
            /deep/.el-textarea{
                textarea, textarea::-webkit-input-placeholder {
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