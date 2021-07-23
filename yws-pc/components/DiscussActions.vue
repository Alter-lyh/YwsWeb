<template>
    <div class="discuss-actions">
        <div class="discuss-actions-left">
            <div class="icon-btn" @click="setUpStatus"><thumbs-up theme="outline" size="16" fill="#333"/>{{dzNum > 0 ? dzNum : '赞'}}</div>
            <div class="icon-btn" @click="setDownStatus"><thumbs-down theme="outline" size="16" fill="#333"/>{{cNum > 0 ? cNum : '踩'}}</div>
            <div class="icon-btn" @click="setReplayShow"><comments theme="outline" size="16" fill="#333"/>{{replyNum > 0 ? replyNum : "评论"}}</div>
            <div class="icon-btn"><share theme="outline" size="16" fill="#333"/>分享</div>
            <!-- <div class="icon-btn"><like theme="outline" size="16" fill="#333"/>收藏</div> -->
        </div>
        <el-dropdown trigger="click" placement="bottom">
            <span class="el-dropdown-link">
                <i slot="reference" class="el-icon-more discuss-actions-right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>投诉</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
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
        }
    }
};
</script>

<style scoped lang="less">
.discuss-actions {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .discuss-actions-left {
        display: flex;
        align-items: center;
        .icon-btn {
            cursor: pointer;
            margin-right: 20px;
            display: flex;
            align-items: center;
            .i-icon{
                margin-right: 4px;
                display: flex;
                align-items: center;
                line-height: normal;
            }
        }
    }
    .discuss-actions-right {
        font-size: 20px;
        color: #606266;
        cursor: pointer;
    }
}
</style>
