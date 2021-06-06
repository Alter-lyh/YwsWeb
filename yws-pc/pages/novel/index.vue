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
                <div class="update-time">更新时间：{{novelInfo.update_time}}</div>
                <div class="book-btns">
                    <div class="readbtn bookinfo-button">点击阅读</div>
                    <div class="bookinfo-button">正在追读</div>
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
                        <div class="item active">综合</div>
                        <div class="item">综合</div>
                        <div class="item">综合</div>
                    </div>
                    <div class="comment-btn"></div>
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
                        <div class="item-content">
                            <div class="content-inner">
                                <span class="content-inner-details" v-show="checkList.indexOf(item) != -1 || item.content.length <= 140">{{item.content}}</span>
                                <span class="content-inner-details" v-show="checkList.indexOf(item) == -1 && item.content.length > 140">{{item.content | titleFilter(140)}}</span>
                                <span class="show-more" v-if="item.content.length > 140" @click="checkShow(item)">{{checkList.indexOf(item) == -1 ? '展开全部' : '收起全部'}}</span>
                            </div>
                            <div class="createdAt-source">编辑于2020-01-18 13:22</div>
                        </div>
                        <div class="item-actions">
                            <div class="item-actions-left">
                                <el-button type="primary" icon="el-icon-caret-top">赞</el-button >
                                <el-button type="primary" icon="el-icon-caret-bottom">踩</el-button>
                                <div class="icon-btn"><i class="el-icon-s-comment icon"></i> 我要评论</div>
                                <div class="icon-btn"><i class="el-icon-s-promotion icon"></i> 分享</div>
                                <div class="icon-btn"><i class="el-icon-star-off icon"></i> 收藏</div>
                            </div>
                            <el-popover
                                placement="bottom"
                                content="删除"
                                trigger="click">
                                <i slot="reference" class="el-icon-more item-actions-right"></i>
                            </el-popover>
                        </div>
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
export default {
    name: 'novel',
    data() {
        return {
            novelId: '',
            novelInfo: {
                synTitle: '简介：'
            },
            page: 1,
            pageAll: 1,
            discussList: [],
            checkList: [],
            value: 3.5
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
                sort: 'latest'
            }
            const res = await this.$api.novel.getDiscussList(params)
            this.page = res.page*1
            this.pageAll = res.pageAll
            this.discussList = res.data
        },
        // 分页
        changePage(page) {
            this.page = page;
            this.getDiscussList();
        },
        // 切换
        checkShow(item) {
            if (this.checkList.indexOf(item) != -1) {
                this.checkList.map((i, key) => {
                    if (item.id == i.id) return this.checkList.splice(key, 1)
                })
            } else {
                this.checkList.push(item)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    padding-top: 10px;
}
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
			font-size: 32px;
			color: #000;
			margin-right: 10px;
		}
		.book-tag{
			color: #409EFF;
		}
		.author-info,.book-word,.update-time,.book-btns{
			margin-top: 10px;
        }
        .book-btns{
            display: flex;
            .bookinfo-button{
                padding: 0 15px;
                height: 34px;
                background: #fff;
                border: 1px solid #eee;
                border-radius: 4px;
                color: #888;
                font-size: 14px;
                cursor: pointer;
                text-align: center;
                line-height: normal;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
            }
            .readbtn{
                background: #567ceb;
                color: #fff;
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
                }
            }
            .comment-btn{
                color: #888;
                .icon{
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
                padding-bottom: 20px;
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
                .item-content{
                    width: 100%;
                    height: auto;
                    box-sizing: border-box;
                    padding: 10px;
                    padding-bottom: 0;
                    .content-inner{
                        .content-inner-details{
                            font-size: 14px;
                            color: #333;
                            letter-spacing: 1px;
                            line-height: 2em;
                        }
                        .show-more{
                            font-size: 14px;
                            color: #567ceb;
                            cursor: pointer;
                            margin-top: 6px;
                        }
                    }
                    .createdAt-source{
                        width: 100%;
                        line-height: 48px;
                        font-size: 14px;
                        color: #999;
                    }
                }
                .item-actions{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .item-actions-left{
                        display: flex;
                        align-items: center;
                        .icon-btn{
                            cursor: pointer;
                            margin: 0 20px;
                        }
                        .icon{
                            font-size: 16px;
                        }
                    }
                    .item-actions-right{
                        font-size: 36px;
                        color: #c9c9d1;
                        cursor: pointer;
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