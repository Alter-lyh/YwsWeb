<template>
    <div class="discuss-actions">
        <div class="discuss-actions-left">
            <div class="icon-btn" @click="setUpStatus"><thumbs-up theme="outline" size="16" fill="#333"/>{{dzNum > 0 ? dzNum : '赞'}}</div>
            <div class="icon-btn" @click="setDownStatus"><thumbs-down theme="outline" size="16" fill="#333"/>{{cNum > 0 ? cNum : '踩'}}</div>
            <div class="icon-btn" @click="setReplayShow"><comments theme="outline" size="16" fill="#333"/>{{replyNum > 0 ? replyNum : "评论"}}</div>
            <div class="icon-btn"><share theme="outline" size="16" fill="#333"/>分享</div>
            <!-- <div class="icon-btn"><like theme="outline" size="16" fill="#333"/>收藏</div> -->
        </div>
        <van-icon name="weapp-nav" @click="show = true" />
        <van-action-sheet v-model="show" cancel-text="取消" close-on-click-action :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import {ThumbsUp, ThumbsDown, Comments, Share, Like} from '@icon-park/vue'
export default {
    name: "DiscussActions",
    components:{
        ThumbsUp,
        ThumbsDown,
        Comments,
        Share,
        Like
    },
    props: ['dzNum', 'cNum', 'replyNum'],
    data() {
        return {
            show: false,
            actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
        };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        setReplayShow() {
            this.$emit('setReplayShow')
        },
        setUpStatus() {
            this.$emit('setStatus', 1)
        },
        setDownStatus() {
            this.$emit('setStatus', 2)
        },
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
        },
    }
};
</script>

<style scoped lang="less">
.discuss-actions {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .discuss-actions-left {
        display: flex;
        align-items: center;
        .icon-btn {
            cursor: pointer;
            margin-right: 40px;
            display: flex;
            align-items: center;
            .i-icon{
                margin-right: 8px;
                display: flex;
                align-items: center;
                line-height: normal;
            }
        }
    }
    .discuss-actions-right {
        font-size: 40px;
        color: #606266;
        cursor: pointer;
    }
}
</style>
