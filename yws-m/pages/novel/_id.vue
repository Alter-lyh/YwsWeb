<template>
    <div class="container">
        <header class="header">
            <img class="book-img" :src="novelInfo.novel_img" alt=""/>
            <div class="header-info">
                <span class="book-name">{{novelInfo.novel_name}}</span>
                <div class="author-info">作者：{{novelInfo.author_name}}</div>
                <div class="book-word">本书字数：{{novelInfo.word_number | wordNumFilter}}</div>
                <div class="book-status">状态：{{novelInfo.update_status | updateStatusFil}}</div>
                <div class="update-time">更新时间：{{novelInfo.update_time | timeFil}}</div>
            </div>
            <div class="more-nav" @click="showPopover = true">
                <van-popover
                    v-model="showPopover"
                    trigger="click"
                    :actions="actions"
                    @select="onSelect"
                    placement="bottom-end"
                    :offset="[6, 0]"
                    get-container=".more-nav"
                    >
                    <template #reference>
                        <van-icon name="weapp-nav"/>
                    </template>
                </van-popover>
            </div>
        </header>
        <div class="tag-list">
            <van-tag type="warning" size="medium" v-for="(item, $key) in tagList" :key="$key">{{item.tag_name}}</van-tag>
            <van-tag type="success" size="medium" closable @close="closeTag(item,$key)" v-for="(item, $key) in userTagList" :key="`userTag${$key}`">{{item.tag_name}}</van-tag>
            <input v-model="tagText" ref="tagInput" v-show="tagInputFlag" class="input-new-tag" @keyup.enter="addUserTag" @blur="tagInputFlag = false" type="text">
            <van-button plain type="info" size="mini" v-show="!tagInputFlag" @click="tagInputFlag = !tagInputFlag">新建标签</van-button>
        </div>
        <div class="book-btns">
            <div class="item">
                <bitcoin theme="filled" size="24" fill="#FF6F59"/>
                <i>{{novelInfo.point}}</i>
            </div>
            <div class="item" @click="createBooklist">创建书单</div>
            <div class="item" @click="addBooklist">加入书单</div>
        </div>
        <!-- 评分区域 -->
        <div class="book-score-view">
            <van-tabs type="card">
                <van-tab title="综合">
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
                </van-tab>
                <van-tab title="三年内">
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
                </van-tab>
                <van-tab title="七年内">
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
                </van-tab>
                <van-tab title="七年上">
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
                </van-tab>
            </van-tabs>
            <van-divider>我的评分</van-divider>
            <div @click="showAddScore"><van-rate class="user-score" readonly v-model="userScore.score"/></div>
        </div>
        <!-- 简介 -->
        <van-collapse v-model="introNames" class="book-intro">
            <van-collapse-item :title="novelInfo.synTitle" name="1">{{novelInfo.synopsis}}</van-collapse-item>
        </van-collapse>
        <!-- 评论筛选 -->
        <div class="book-sort-view">
            <div class="sort-view">
                <div :class="['item', item.status == discussStatus ?'active' : '']" v-for="(item, $key) in sortList" :key="$key" @click="changeSort(item.status)">{{item.name}}</div>
                <p class="tips">最新和热度都只展示评分</p>
            </div>
            <div class="comment-btn" @click="commentFlag = !commentFlag">
                <van-icon class="icon" name="edit" />
            </div>
        </div>
        <!-- 发表评论 -->
        <div class="post-comment" v-show="commentFlag">
            <div class="post-novel-info">
                <p class="discuss-type">
                    <span v-for="(item, $key) in discussTypeList" :key="`discuss${$key}`" :class="['item', discussType == item.type ? 'active' : '']" @click="discussType = item.type">{{item.text}}</span>
                    <span>{{novelInfo.novel_name}}</span>
                </p>
                <van-rate class="novel-score" v-show="discussType == 2" v-model="scoreValue"/>
            </div>
            <van-field
                class="novel-comment"
                v-model="content"
                rows="4"
                autosize
                label=""
                type="textarea"
                placeholder="写评论，发表评论要记得先对本书进行打分噢(内容不得少于2个字)"
            />
            <div class="post-comment-tools">
                <van-button color="#409EFF" size="small" @click="postDiscuss">{{userScore.score >0 && discussType == 2 ? '修改评论' : '发送评论'}}</van-button>
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
                        <van-rate readonly  :value="item.score/2" color="#ff9900"/>
                    </div>
                </div>
                <DiscussContent :content="item.content" :editTime="item.update_time" />
                <DiscussActions :dzNum="item.dz_num" :cNum="item.c_num" :replyNum="item.reply_num" :discussId="item.id" @setReplayShow="setReplayShow($key)" @setStatus="setStatus($event, $key)"/>
                <DiscussReplay v-show="item.replayShow" :replayShow="item.replayShow" :novelId="novelId" :discussId="item.id" />
            </div>
        </div>
        <!-- 分页 -->
        <Pagination
            :currentPage="page"
            :pageAll="pageAll"
            @changePage="changePage"
        />
        <!-- 底部按钮 -->
        <NovelBottom :novelId="novelId" :sourceList="sourceList"/>
        <!-- 创建书单 -->
        <BooklistAdd />
        <!-- 加入书单 -->
        <BooklistChoice :userBooklist="userBooklist" :userScore="userScore" @addToBooklist="addToBooklist"/>
        <!-- 投币 -->
        <Coin @insertCoin="insertCoin"/>
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
                synTitle: '简介：'
            },
            // 书源
            sourceList: [],
            tagList: [],
            tagInputFlag: false,
            tagText: '',
            userTagList: [],
            // 简介展开区域
            introNames: [],
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
            // 投币类型
            coinType: 1,
            // 用户书单
            userBooklist: [],
            // 书籍更多选项
            showPopover: false,
            // 通过 actions 属性来定义菜单选项
            actions: [{ text: '我的书架' }, { text: '我的书单' }, { text: '举报' }],
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
        },
        tagInputFlag(flag) {
            if (flag) {
                this.$nextTick(function() {
                    this.$refs.tagInput.focus()
                })
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
    async mounted() {
        this.novelId = this.$route.params.id.replace('.html', '')
        this.$store.commit('updateLoadingShow', true)
        await this.getNovelInfo()
        await this.getDiscussList()
        this.getDiscussInfo()
        this.getUserTagList()
        this.$store.commit('updateLoadingShow', false)
    },
    methods: {
        async getNovelInfo() {
            const params = { 
                novelId: this.novelId
            }
            const res = await this.$api.novel.getNovelInfo(params)
            this.novelInfo = res.data
            this.novelInfo['synTitle'] = '简介：'
            this.novelInfo.synopsis.length > 16 ? this.novelInfo['synTitle'] += this.novelInfo.synopsis.slice(0, 16) + '...' : this.novelInfo['synTitle'] += this.novelInfo.synopsis
            this.novelInfo.source = JSON.parse(this.novelInfo.source)
            this.novelInfo.source.map(item => {
                this.sourceList.push({
                    text: item. siteName,
                    ...item
                })
            })
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
        // 展示用户评分区域
        showAddScore() {
            this.commentFlag = !this.commentFlag
            this.discussType = 2
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
            const params = {
                novelId: this.novelId,
                type: 1,
                tagName: this.tagText
            }
            try {
                const res = await this.$api.novel.editTag(params)
                if (res.code != '00') return
                this.tagInputFlag = false
                this.getUserTagList()
            } catch (error) {
                console.log(error);
            }
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
            if (this.content.length < 5) return this.$toast('评论必须大于5个字');
            if (this.scoreValue <= 0) return this.$toast('评分必须大于0');

            const type = this.userScore.score > 0 && this.discussType == 2 ? 2 : 1
            const params = {
                novelId: this.novelId,
                type: type, // 1 发布评论 2修改评论
                score: this.discussType != 1 ? this.scoreValue : null,
                content: this.content,
            }
            try {
                const res = await this.$api.novel.postDiscuss(params)
                if (this.discussType == 2) this.userScore.score = res.data.score
                this.$toast('发布成功');
                this.getDiscussList()
                this.commentFlag = false
            } catch (error) {
                console.log(error)
            }
        },
        // 点赞或点踩
        async setStatus(json, $key) {
            if (json.type == 1) {
                if (json.status == 1) {
                    this.$notify({ type: 'success', message: '点赞成功' });
                    this.discussList[$key].dz_num++
                } else {
                    this.$notify({ type: 'success', message: '取消成功' });
                    this.discussList[$key].dz_num--
                }
            } else {
                if (json.status == 1) {
                    this.$notify({ type: 'success', message: '点踩成功' });
                    this.discussList[$key].c_num++
                } else {
                    this.$notify({ type: 'success', message: '取消成功' });
                    this.discussList[$key].c_num--
                }
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
                    this.$toast('加入成功');
                } else {
                    this.$toast('取消成功');
                }
            } catch (error) {
                console.log(error)
            }
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
                this.$toast('谢谢打赏');
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
                    this.$toast('请先新建书单');
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
                    this.$toast('加入失败');
                } else {
                    this.$toast('加入成功');
                }
            } catch (error) {
                console.log(error);
            }
            this.$store.commit("updateBookListChoice", false);
        },
        // 点击书籍更多选项
        onSelect(action) {
            // Toast(action.text);
        },
        // 创建书单
        createBooklist() {
            if(!getToken()) return this.$notify({ type: 'warning', message: '请先登录' });
            this.$store.commit("updateBookListAdd", true);
        },
        // 加入书单
        async addBooklist() {
            if(!getToken()) return this.$notify({ type: 'warning', message: '请先登录' })
            const params = {
                num: 100,
                userId: this.$store.getters.getUserInfo.id,
            }
            const res = await this.$api.booklistApi.getBooklist(params)
            if (res.code != '00') {
                this.$toast('请先新建书单');
                this.$store.commit("updateBookListAdd", true);
                return
            }
            this.userBooklist = res.data.data
            this.$store.commit("updateBookListChoice", true);
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    padding-bottom: 120px;
}
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
		width: 200px;
        min-width: 200px;
        height: 264px;
        border-radius: 8px;
		overflow: hidden;
		margin-right: 20px;
	}
	.header-info{
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
    .more-nav{
        position: absolute;
        right: 30px;
        top: 20px;
        i{
            font-size: 42px;
        }
    }
}
.tag-list{
    width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 20px 30px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .input-new-tag{
        width: 120px;
        height: 48px;
        font-size: 24px;
        line-height: 48px;
        box-sizing: border-box;
    }
    /deep/.van-tag{
        margin-right: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-bottom: 10px;
    }
}
.book-btns{
    width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 20px 30px;
    margin-top: 20px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: normal;
    .item{
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
        margin: 0 20px;
        font-size: 28px;
        font-weight: bold;
        color: #567ceb;
        i{
            font-size: 34px;
            font-weight: bold;
            color: #FF6F59;
            margin-left: 8px;
        }
    }
}
.book-score-view{
    width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 20px 30px;
    background: #FFFFFF;
    margin-top: 20px;
    /deep/.van-tabs__nav--card{
        margin: 0;
    }
    .van-tab__pane{
        display: flex;
        justify-content: center;
        align-items: center;
        .item{
            width: 48%;
            height: auto;
            padding-top: 20px;
            p{
                text-align: center;
                font-size: 24px;
                margin: 20px 0;
            }
            .score{
                font-size: 40px;
                font-weight: bold;
                color: #FF6F59;
                display: block;
                height: 50px;
                line-height: 50px;
            }
            .no-score{
                font-size: 40px;
                font-weight: bold;
                display: block;
                height: 50px;
            }
        }
    }
    .user-score{
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        padding-bottom: 10px;
    }
}
.book-intro{
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    font-size: 28px;
    color: #666;
    margin-top: 20px;
}
.book-sort-view{
    width: 100%;
    height: 80px;
    padding: 0 30px;
    padding-left: 15px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .sort-view{
        display: flex;
        align-items: center;
        .item{
            min-width: 2em;
            font-size: 28px;
            padding: 0 15px;
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
            font-size: 24px;
            color: #E6A23C;
            margin-left: 20px;
        }
    }
    .comment-btn{
        color: #888;
        .icon{
            font-size: 38px;
        }
    }
}
.post-comment{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 30px;
    background: #fff;
    margin: 20px 0;
    .post-novel-info{
        height: 60px;
        line-height: normal;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .discuss-type{
            color: #aaa;
            font-weight: bold;
            margin-right: 30px;
            margin-left: -20px;
            .item{
                font-size: 28px;
                padding: 0 20px;
                border-right: 1px solid #ddd;
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
    /deep/.van-cell{
        padding: 0;
        textarea, textarea::-webkit-input-placeholder {
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
        }
    }
    .novel-comment{
        margin-bottom: 10px;
        border: 1px solid #333;
        padding: 12px;
    }
    .post-comment-tools{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
// 评论列表
.comment-view{
    width: 100%;
    .item{
        width: 100%;
        height: auto;
        padding: 20px 30px;
        box-sizing: border-box;
        background-color: #FFFFFF;
        margin-bottom: 20px;
        .item-header{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .item-header-left{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .author-img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                .author-info{
                    font-size: 28px;
                    color: #616161;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
<style lang="less">
.more-nav .van-popover__arrow{
    right: 10px!important;
}
</style>