<template>
    <div class="discuss-content">
        <div class="content-inner">
            <span class="content-inner-details" v-if="status || content.length <= 80">{{content}}</span>
            <span class="content-inner-details" v-show="!status && content.length > 80">{{content | titleFilter(80)}}</span>
            <span class="show-more" v-if="content.length > 140" @click="checkShow(status)">{{!status ? '展开全部' : '收起全部'}}</span>
        </div>
        <div class="createdAt-source">
            <span>编辑于{{editTime | timeFil}}</span>
            <van-rate v-if="scoreNum" class="user-score" readonly :value="scoreNum" color="#ff9900"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "DiscussContent",
    props: {
        content: '',
        editTime: '',
        scoreNum: 0
    },
    data() {
        return {
            status: false,
        };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        checkShow() {
            this.status = !this.status
        }
    }
};
</script>

<style scoped lang="less">
.discuss-content {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    .content-inner {
        .content-inner-details {
            font-size: 28px;
            color: #333;
            letter-spacing: 4px;
            line-height: 48px;
            white-space: pre-wrap;
        }
        .show-more {
            font-size: 28px;
            color: #567ceb;
            cursor: pointer;
        }
    }
    .createdAt-source {
        width: 100%;
        line-height: 96px;
        font-size: 28px;
        color: #999;
        display: flex;
        justify-content: space-between;
        /deep/.van-rate__item{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
