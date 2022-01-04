<template>
    <div class="page-bottom">
        <nuxt-link to="/" class="item">
            <i class="iconfont icon-shuchengxuanzhong"></i>
            <span>首页</span>
        </nuxt-link>
        <div class="item" @click="showCoin">
            <bitcoin theme="filled" size="24" fill="#FF6F59"/>
            <span>{{coinNum}}</span>
        </div>
        <van-popover
            v-model="bookShelfShow"
            trigger="click"
            :actions="bookShelfList"
            @select="addBookshelf"
            placement="top"
            >
            <template #reference>
                <van-button plain color="#409EFF" class="bookinfo-button">{{bookShelfStatus | novelBookshelfFil}}</van-button>
            </template>
        </van-popover>
        <van-popover
            v-model="sourceShow"
            trigger="click"
            :actions="sourceList"
            @select="toRead"
            placement="top"
            >
            <template #reference>
                <van-button color="#409EFF" class="bookinfo-button">立即阅读</van-button>
            </template>
        </van-popover>
    </div>
</template>

<script>
    import {getUserInfo} from "@/plugins/auth";
    import {Bitcoin} from '@icon-park/vue'
    export default {
        props: {
            novelId: {
                type: String,
                default: ''
            },
            // 书源列表
            sourceList: {
                type: Array,
                default: () => []
            }
        },
        components:{
            Bitcoin
        },
        data() {
            return {
                // 硬币数量
                coinNum: 0,
                // 书源是否显示
                sourceShow: false,
                // 用户书籍在书架状态
                bookShelfStatus: 0,
                // 加入书架是否显示
                bookShelfShow: false,
                // 书架功能列表
                bookShelfList: [{text: '正在追读', type: 1}, {text: '养肥待看', type: 2}, {text: '已经看过', type: 3}, {text: '取消收藏', type: 0}]
            };
        },
        mounted() {
            const userInfo = getUserInfo()
            if (userInfo) {
                this.coinNum = userInfo.point || 0
            }
        },
        methods: {
            toRead(action) {
                window.open(action.bookPage)
            },
            showCoin() {
                this.$store.commit('updateCoinView', true)
            },
            async addBookshelf(action) {
                const {type} = action
                const params = {
                    type: type == 0 ? 0 : type,
                    status: type == 0 ? 2 : 1,
                    novelId: this.novelId
                }
                try {
                    const res = await this.$api.bookshelfApi.setStatus(params)
                    if (res.code != '00') return
                    if (type != 0) {
                        this.bookShelfStatus = type
                        this.$toast('加入成功');
                    } else {
                        this.bookShelfStatus = 0
                        this.$toast('取消成功');
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            // 获取书籍在书架状态
            async getBookShelfNoverStatus() {
                const params = {
                    novelId: this.novelId
                }
                try {
                    const res = await this.$api.bookshelfApi.getNoverStatus(params)
                    res.data.status == 1 ? this.bookShelfStatus = res.data.type : this.bookShelfStatus = 0
                } catch (error) {
                    console.log(error)
                }
            },
        }
    }
</script>

<style scoped lang="less">
/* 底部操作菜单 */
.page-bottom{
    width: 100%;
	height: 100px;
	position:fixed;
	left: 0;
	bottom:0;
	z-index: 1;
	display: flex;
	justify-content: space-around;
	align-items: center;
	box-sizing: border-box;
	padding: 0 20px;
    background: #fff;
	box-shadow: 0 0 20px 0 rgba(0,0,0,.5);
    .item{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #fc725f;
        i{
            font-size: 48px;
        }
    }
    .bookinfo-button{
        height: 80px;
    }
}
</style>