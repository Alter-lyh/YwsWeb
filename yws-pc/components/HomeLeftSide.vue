<template>
    <div class="bookpage-layout-main-left">
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
                <nuxt-link class="novel-name" :to="`/novel/${item.novel_id}.html`">《{{item.novelInfo.novel_name}}》</nuxt-link>
                <el-rate
                    :value="item.score/2"
                    disabled
                    text-color="#ff9900"
                >
                </el-rate>
            </div>
            <DiscussContent :content="item.content" :editTime="item.update_time" />
            <DiscussActions :dzNum="item.dz_num" :cNum="item.c_num" :replyNum="item.reply_num" :discussId="item.id" @setStatus="setStatus($event, $key)" @setReplayShow="setReplayShow($key)"/>
            <DiscussReplay v-show="item.replayShow" :replayShow="item.replayShow" :novelId="item.novelInfo.id" :discussId="item.id" />
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeLeftSide",
    props: ['page', 'pageAll', 'discussList'],
    data() {
        return {
        };
    },
    methods: {
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

<style scoped lang="less">
.bookpage-layout-main-left {
    width: 710px;
    .item {
        width: 100%;
        height: auto;
        padding: 10px 20px;
        box-sizing: border-box;
        background-color: #ffffff;
        margin-bottom: 10px;
        .item-header {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .novel-info {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .novel-name {
                font-size: 18px;
                font-weight: bold;
                color: #000;
            }
        }
    }
}

.item-header {
    .item-header-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .author-img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .author-info {
            font-size: 14px;
            color: #616161;
            font-weight: 700;
        }
    }
    .item-header-right {
        padding: 5px;
        font-size: 14px;
        color: #d39867;
        background-color: #f7f0e6;
        border-radius: 4px;
    }
}
</style>
