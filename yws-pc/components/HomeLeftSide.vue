<template>
    <div class="bookpage-layout-main-left">
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
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                >
                </el-rate>
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
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                >
                </el-rate>
            </div>
            <DiscussContent content="好文。日常角度写那个特殊的年代，从家里到社会，画卷逐渐展开。优点包括但不限于：" status="false" />
            <DiscussActions />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: 3.7
        };
    },
    mounted() {
    },
    methods: {
    }
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
