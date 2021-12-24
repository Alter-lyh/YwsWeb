<template>
    <div class="container">
        <Header />
        <div class="my-swipe">
            <van-swipe :autoplay="3000" indicator-color="#1989fa">
                <van-swipe-item>
                    <nuxt-link class="item" :to="`/bookstore`">
                        <img
                            src="https://i.loli.net/2020/04/20/1GE9Lv78nJ4YoqA.png"
                            alt=""
                        />
                    </nuxt-link>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="notice">
            <!-- 公告 -->
            <van-notice-bar
                left-icon="volume-o"
                text="初次见面，你好！"
                mode="link"
            />
        </div>
        <div class="home-desk">
            <div class="item">
                <modify class="icon" theme="filled" size="18" fill="#567ceb"/>
                <span>发表书评</span>
            </div>
            <div class="item">
                <van-icon class="icon-van" name="printer" />
                <span>我要推书</span>
            </div>
            <div class="item">
                <add-print class="icon" theme="filled" size="18" fill="#567ceb"/>
                <span>创建书单</span>
            </div>
        </div>
        <!-- 站长推荐 -->
        <div class="recommend-books">
            <div class="books-header">
                <div class="icon-left"></div>
                <div class="title">站长推荐</div>
                <!-- <div class="action">
                    <van-icon name="replay" class="icon" />
                    <span>换一批</span>
                </div> -->
            </div>
            <div class="books-main">
                <nuxt-link  class="books-item" to="/novel/1.html">
                    <div class="img-box">
                        <img src="https://qidian.qpic.cn/qdbimg/349573/1010868264/300" alt="" />
                    </div>
                    <div class="books-bot">
                        <p class="title">诡秘之主</p>
                        <p class="update-time">更新：2020-11-15 16:00:00</p>
                    </div>
                    <div class="score">8.6</div>
                </nuxt-link >
                <nuxt-link  class="books-item" to="/novel/3.html">
                    <div class="img-box">
                        <img src="https://qidian.qpic.cn/qdbimg/349573/2597043/300" alt="" />
                    </div>
                    <div class="books-bot">
                        <p class="title">惊悚乐园</p>
                        <p class="update-time">更新：2017-11-27 16:00:00</p>
                    </div>
                    <div class="score">8.1</div>
                </nuxt-link >
                <nuxt-link  class="books-item" to="/novel/2.html">
                    <div class="img-box">
                        <img src="http://static.zongheng.com/upload/cover/82/c6/82c6df86f584c266b99c038e707000691567581295408.jpeg" alt="" />
                    </div>
                    <div class="books-bot">
                        <p class="title">宰执天下</p>
                        <p class="update-time">更新：2019-2-3 16:00:00</p>
                    </div>
                    <div class="score">8.2</div>
                </nuxt-link >
                <nuxt-link  class="books-item" to="/novel/4.html">
                    <div class="img-box">
                        <img src="https://qidian.qpic.cn/qdbimg/349573/2643379/300" alt="" />
                    </div>
                    <div class="books-bot">
                        <p class="title">奥术神座</p>
                        <p class="update-time">更新：2020-11-15 16:00:00</p>
                    </div>
                    <div class="score">8.3</div>
                </nuxt-link >
            </div>
        </div>
        <div class="home-list">
            <div class="item" v-for="(item, $key) in discussList" :key="$key">
                <div class="item-header">
                    <div class="item-header-left">
                        <img
                            class="author-img"
                            src="@/assets/img/user_defalut.png"
                            alt=""
                        />
                        <div class="author-info">{{item.userInfo.name}}</div>
                    </div>
                    <div class="item-header-right">随机推荐</div>
                </div>
                <div class="novel-info">
                    <nuxt-link :to="`/novel/${item.noverInfo.id}.html`" class="novel-name">《{{item.noverInfo.novel_name}}》</nuxt-link >
                    <van-rate
                        :value="item.score/2"
                        :size="18"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </div>
                <DiscussContent :content="item.content" :editTime="item.update_time" />
                <DiscussActions :dzNum="item.dz_num" :cNum="item.c_num" :replyNum="item.reply_num" :discussId="item.id" @setStatus="setStatus($event, $key)" @setReplayShow="setReplayShow($key)"/>
                <DiscussReplay v-show="item.replayShow" :replayShow="item.replayShow" :novelId="item.noverInfo.id" :discussId="item.id" />
            </div>
        </div>
    </div>
</template>

<script>
import {Modify, AddPrint} from '@icon-park/vue'
export default {
    name:'home',
    components:{
        Modify,
        AddPrint
    },
    data() {
        return {
            discussList: [],
            page: 1,
            pageAll: 1,
            beforeUrl: ''
        };
    },
    async asyncData({ app, query, params }) {
        if (!process.server) return
        const res = await app.$api.novel.getRandomDiscuss({page: 1});
        if (res.code != '00') return {}
        const json = res.data
        let discussList = json.data
        discussList.map(item => {
            item.replayShow = false
            item.page = 1
            item.pageAll = 1
        })
        const pageAll = json.pageAll
        return {
            discussList,
            pageAll
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if(from.name) vm.beforeUrl = from.path
        });
    },
    async mounted() {
        if (this.beforeUrl == '') return
        this.$store.commit('updateLoadingShow', true)
        await this.getRandomDiscuss()
        this.$store.commit('updateLoadingShow', false)
    },
    methods: {
        async getRandomDiscuss() {
            const params = {
                page: this.page
            }
            try {
                const res = await this.$api.novel.getRandomDiscuss(params)
                if (res.code != '00') return
                const json = res.data
                this.discussList = json.data
                this.discussList.map(item => {
                    item.replayShow = false
                    item.page = 1
                    item.pageAll = 1
                })
                this.pageAll = json.pageAll
            } catch (error) {
                console.log(error);
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
        // 展开收起评论
        async setReplayShow($key) {
            this.discussList[$key].replayShow = !this.discussList[$key].replayShow
            this.$set(this.discussList, $key, this.discussList[$key])
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    padding-top: 100px;
    padding-bottom: 110px;
}
.my-swipe {
    width: 100%;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 10px;
    .item {
        width: 100%;
        height: 220px;
        background: #fff;
        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }
}
.home-desk {
    width: 700px;
    height: 100px;
    border-radius: 8px;
    background: #fff;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    line-height: normal;
    .item{
        width: 25%;
        font-size: 28px;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
        .icon{
            margin-right: 10px;
            margin-top: 4px;
        }
        .icon-van{
            font-size: 34px;
            margin-right: 10px;
            color: #567ceb;
        }
    }
}
.recommend-books {
    background: #fff;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
    .books-header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
        .icon-left {
            width: 12px;
            height: 36px;
            margin-right: 10px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAAB20lEQVQ4T5VVuzJDURRdi5HOeLT+gEaH8Y43MV6TCkFEkEjhD/IHCp3SjCqtfwhdGv5A69kxzjbn3GfuK3KbTPbZa6919tkPwv4kO5hCV08RlF2AQ5ZZniC8w8/HDWvP39pCY86NDeCX9xAZNv+dKPYviQY6keFt/YUmcqr3UYBhg47/Gvh+H6HsjV8AuI6MHAZXKHsTdRCjluRmj5C0DjxQcpOfEHRb/kEXJ4AllsAX1f6khLTbBglRAJTcVMiedHPKwbS4CDtykNFPRHUw40qKu4Gfkepw9j9+LobqMC3We+s0NWNpHzRLOkqLXSE+5vj0UuXn2pSUn28TcLwQfuCEKqQqLMZXRMQLUhWWIiRF1ITTG6qw7J266Q12kJN2gOpkxRcuuVpNxaqiBiRVT1NhaMBqm2k9XWsXkIkHRCilOlsXr5lbzA1zaQ2g05POBQOkzrkBnG/4GOKa02OmKmlA3IuFA1CVNn2SWieMqrzV2stHRClvfwqsQeY1rlc7AfMXpbJTF7FHZdJA0hmiHpWV7IWIMsPYTW8MkGCFUs2m5BWPzm6I9qVOZIP9GLEWymV2QH5xD8AslIhkNtgpGV7VXtwX0Ux46yhCsAuKvbL4BOAOfeqG1ZpZWX8hYrOdxKq5+QAAAABJRU5ErkJggg==)
                no-repeat;
            background-size: cover;
        }
        .title {
            font-size: 28px;
            font-weight: bold;
            flex: 1;
        }
        .action {
            display: flex;
            align-items: center;
            font-size: 24px;
            color: #666;
            .icon {
                font-size: 30px;
                color: #222;
                margin-right: 10px;
            }
        }
    }
    .books-main {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border-radius: 8px;
        margin-bottom: 10px;
        .books-item {
            width: 25%;
            height: auto;
            box-sizing: border-box;
            padding: 8px;
            border-radius: 8px;
            margin-bottom: 10px;
            position: relative;
            .img-box{
                width: 100%;
                height: auto;
                overflow: hidden;
                display: flex;
                align-items: center;
                border-radius: 8px;
                img {
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                }
            }
            .title {
                box-sizing: border-box;
                padding: 6px;
                font-size: 26px;
                color: #222;
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;  //显示几行
            }
            .update-time {
                box-sizing: border-box;
                padding: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 24px;
                color: #aaa;
            }
            .score{
                width: 70px;
                height: 40px;
                background: #ffb800;
                font-weight: 700;
                color: #fff;
                position: absolute;
                right: 8px;
                top: 8px;
                line-height: 40px;
                text-align: center;
                font-size: 28px;
            }
        }
    }
}
.home-list {
    margin-top: 20px;
    .item {
        width: 100%;
        height: auto;
        padding: 20px;
        box-sizing: border-box;
        background-color: #ffffff;
        margin-bottom: 20px;
        .item-header {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .item-header-left {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .author-img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                .author-info {
                    font-size: 28px;
                    color: #616161;
                    font-weight: 700;
                }
            }
            .item-header-right {
                padding: 10px;
                font-size: 28px;
                color: #d39867;
                background-color: #f7f0e6;
                border-radius: 8px;
            }
        }
        .novel-info {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: -16px;
            .novel-name {
                font-size: 36px;
                font-weight: bold;
                color: #000;
            }
        }
    }
}
</style>
