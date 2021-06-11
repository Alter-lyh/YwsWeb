<template>
    <div class="container">
        <header class="header">
            <img class="book-img" :src="novelInfo.novel_img" alt=""/>
            <div class="header-info">
                <div class="book-info">
                    <span class="book-name">{{novelInfo.novel_name}}</span>
                </div>
                <div class="author-info">作者：{{novelInfo.author_name}}</div>
                <div class="book-word">本书字数：{{novelInfo.word_number}}</div>
                <div class="book-status">状态：已完结</div>
                <div class="update-time">更新时间：{{novelInfo.update_time}}</div>
                <div class="book-btns">
                    <el-dropdown>
                        <el-button size="small"  type="primary" class="bookinfo-button">
                            立即阅读
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
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
            <div class="book-score-view">
                
            </div>
        </header>
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
                    <div class="comment-btn">
                        <i class="el-icon-edit icon"></i>
                    </div>
                </div>
                <div class="comment-view">
                    <div class="item" v-for="(item, $key) in discussList" :key="$key">
                        <div class="item-header">
                            <div class="item-header-left">
                                <img class="author-img" src="https://avatar.lkong.com/avatar/000/68/77/17_avatar_small.jpg" alt=""/>
                                <div class="author-info">{{item.user.name}}</div>
                            </div>
                            <div class="novel-rate">
                                <el-rate
                                    :value="item.score/2"
                                    disabled
                                    text-color="#ff9900"
                                >
                                </el-rate>
                            </div>
                        </div>
                        <DiscussContent :content="item.content" :status="item.moreStatus" @checkShow="checkShow($key)" />
                        <DiscussActions />
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
        },
        async getDiscussList() {
            const params = { 
                novelId: this.novelId,
                page: this.page,
                num: 20,
                score: 1, //只展示有评分的
                sort: this.discussStatus
            }
            const res = await this.$api.novel.getDiscussList(params)
            this.page = res.page*1
            this.pageAll = res.pageAll
            this.discussList = res.data
            this.discussList.map(item => item.moreStatus = false)
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
        // 更新筛选状态
        changeSort(status) {
            this.discussStatus = status;
            this.getDiscussList();
        },
    }
}
</script>
<style lang="less" scoped>
.header{
	width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 20px 30px;
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
		color: #999;
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