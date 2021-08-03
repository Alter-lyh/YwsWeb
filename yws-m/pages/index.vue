<template>
    <div class="container">
        <Header />
        <div class="my-swipe">
            <van-swipe :autoplay="3000" indicator-color="#1989fa">
                <van-swipe-item>
                    <div class="item">
                        <img
                            src="https://i.loli.net/2020/04/20/1GE9Lv78nJ4YoqA.png"
                            alt=""
                        />
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="item">
                        <img
                            src="https://i.loli.net/2020/04/20/1GE9Lv78nJ4YoqA.png"
                            alt=""
                        />
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="item">
                        <img
                            src="https://i.loli.net/2020/04/20/1GE9Lv78nJ4YoqA.png"
                            alt=""
                        />
                    </div>
                </van-swipe-item>
            </van-swipe>
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
                <!-- <modify class="icon" theme="filled" size="18" fill="#567ceb"/> -->
                <add-print class="icon" theme="filled" size="18" fill="#567ceb"/>
                <span>创建书单</span>
            </div>
        </div>
        <div class="home-list">
            <div class="item">
                <div class="item-header">
                    <div class="item-header-left">
                        <img
                            class="author-img"
                            src="https://avatar.lkong.com/avatar/000/33/33/16_avatar_small.jpg"
                            alt=""
                        />
                        <div class="author-info">曲调有氧</div>
                    </div>
                    <div class="item-header-right">官方推荐</div>
                </div>
                <div class="novel-info">
                    <div class="novel-name">《穿到民国吃瓜看戏》</div>
                    <van-rate
                        v-model="value"
                        :size="18"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </div>
                <DiscussContent content="好文。日常角度写那个特殊的年代，从家里到社会，画卷逐渐展开。优点包括但不限于：" status="false" />
                <DiscussActions />
            </div>
            <div class="item">
                <div class="item-header">
                    <div class="item-header-left">
                        <img
                            class="author-img"
                            src="https://avatar.lkong.com/avatar/000/33/33/16_avatar_small.jpg"
                            alt=""
                        />
                        <div class="author-info">曲调有氧</div>
                    </div>
                    <div class="item-header-right">官方推荐</div>
                </div>
                <div class="novel-info">
                    <div class="novel-name">《穿到民国吃瓜看戏》</div>
                    <van-rate
                        v-model="value"
                        :size="18"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </div>
                <DiscussContent content="好文。日常角度写那个特殊的年代，从家里到社会，画卷逐渐展开。优点包括但不限于：" status="false" />
                <DiscussActions />
            </div>
        </div>
    </div>
</template>

<script>
import {Modify, AddPrint} from '@icon-park/vue'
export default {
    components:{
        Modify,
        AddPrint
    },
    data() {
        return {
            value: 3,
        };
    },
    mounted() {},
    methods: {
        login() {
            this.$store.commit("updateLoginView", true);
        },
        logout() {
            clearToken();
            clearUserInfo();
            this.$store.commit("updateLoginStatus", false);
            this.$store.commit("setUserInfo", { name: "默认用户" });
        },
        taskSignIn() {
            // const res = this.$api.taskApi.signIn()
            console.log(res);
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
        height: 250px;
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
