<template>
    <div class="discuss-replay">
        <div class="replay-header">共{{replyList.length}}条评论</div>
        <div class="replay-item" v-for="(item, $key) in replyList" :key="$key">
            <div class="replay-item-header">
                <img class="author-img" src="https://avatar.lkong.com/avatar/000/68/77/17_avatar_small.jpg" alt=""/>
                <div class="author-info">{{item.userInfo.name}}</div>
            </div>
            <div class="replay-item-content"><span v-if="item.resInfo" class="replay-title">回复{{item.resInfo.name}} </span>{{item.content}}</div>
            <div class="replay-item-foot">
                <div class="replay-item-foot-left">
                    编辑于{{item.update_time | timeFil}}
                    <span @click="setReplayShow($key)">回复</span>
                    <div class="icon-btn"><thumbs-up theme="outline" size="16" fill="#333"/>{{ item.dz_num > 0 ? item.dz_num : '赞'}}</div>
                    <div class="icon-btn"><thumbs-down theme="outline" size="16" fill="#333"/>{{ item.c_num > 0 ? item.c_num : '踩'}}</div>
                </div>
                <van-icon name="weapp-nav" @click="show = true"/>
            </div>
            <div class="replay-item-post" v-show="replayShowList.indexOf($key) != -1">
                <div class="replay-div" contenteditable="plaintext-only" placeholder="内容不得少于5个字"></div>
                <div class="replay-btn" @click="replayItemComment($event, item.parent_id, item.novel_id, $key, item.user_id)">发布评论</div>
            </div>
        </div>
        <div class="discuss-pagination">
            <van-pagination :value="page" :page-count="pageAll" @change="changePage"/>
        </div>
        <div class="replay-foot">
            <div class="replay-div" contenteditable="plaintext-only" placeholder="内容不得少于5个字"></div>
            <div class="replay-btn" @click="replayComment($event, itemKey)">发布评论</div>
        </div>
        <van-action-sheet v-model="show" cancel-text="取消" close-on-click-action :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import {ThumbsUp, ThumbsDown} from '@icon-park/vue'
export default {
    name: "DiscussReplay",
    components:{
        ThumbsUp,
        ThumbsDown
    },
    props: ['replayShow', 'novelId', 'discussId'],
    data() {
        return {
            replyList: [],
            page: 1,
            pageAll: 1,
            replayShowList: [],
            // 更多选项
            show: false,
            actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
        };
    },
    watch: {
        async replayShow(flag) {
            console.log(flag);
            if (!flag) return
            const params = {
                discussId: this.discussId
            }
            const res = await this.$api.discussApi.getReply(params)
            const json = res.data
            this.replyList = json.data
            this.page = json.page
            this.pageAll = json.pageAll
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        // 是否显示子评论的回复按钮
        setReplayShow($key) {
            let k = this.replayShowList.indexOf($key)
            if (k == -1) {
                this.replayShowList.push($key)
            } else {
                this.replayShowList.splice(k, 1)
            }
        },
        // 切换子评论页码
        async changePage(page) {
            this.page = page
            const params = {
                discussId: this.discussId,
                page: this.page
            }
            try {
                const res = await this.$api.discussApi.getReply(params)
                if (res.code != '00') return
                const json = res.data
                this.replyList = json.data
            } catch (error) {
                console.log(error);
            }
        },
        // 回复子评论
        async replayComment(event, itemKey) {
            event = event ? event : window.event; 
            const obj = event.srcElement ? event.srcElement : event.target;

            let content = obj.previousElementSibling.innerHTML
            content = content.replace(/\s+$/, '')
            if (content.length < 5) return this.$toast('评论必须大于5个字');

            const params = {
                parentId: this.discussId,
                novelId: this.novelId,
                content: content,
            }
            try {
                const res = await this.$api.discussApi.postReply(params)
                if (res.code != '00') return
                this.$toast('评论发布成功');
                this.changePage(1)
            } catch (error) {
                console.log(error)
            }
        },
        // 回复子评论的评论
        async replayItemComment(event, parentId, novelId, $key, resId) {
            event = event ? event : window.event; 
            const obj = event.srcElement ? event.srcElement : event.target;

            let content = obj.previousElementSibling.innerHTML
            content = content.replace(/\s+$/, '')
            if (content.length < 5) return this.$toast('评论必须大于5个字');
            const params = {
                parentId: parentId,
                novelId: novelId,
                content: content,
                resId: resId
            }
            try {
                const res = await this.$api.discussApi.postReply(params)
                if (res.code != '00') return
                this.$toast('评论发布成功');
                this.changePage(1)
            } catch (error) {
                console.log(error)
            }
            this.setReplayShow($key)
        },
        // 点击更多选项的参数
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
        },
    }
};
</script>

<style scoped lang="less">
.discuss-replay{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    margin: 18px 0;
    .replay-header{
        padding-bottom: 20px;
        color: #999;
        font-size: 28px;
    }
    .replay-item{
        border-top: 1px solid #ddd;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        .replay-item-header{
            height: 100px;
            display: flex;
            align-items: center;
            .author-img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 20px;
            }
            .author-info{
                font-size: 28px;
                color: #616161;
                font-weight: 700;
            }
        }
        .replay-item-content{
            font-size: 28px;
            color: #333;
            letter-spacing: 2px;
            line-height: 40px;
            .replay-title{
                color: #8590a6;
                font-weight: bold;
            }
        }
        .replay-item-foot{
            width: 100%;
            height: 80px;
            line-height: normal;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24px;
            color: #999;
            .replay-item-foot-left {
                display: flex;
                align-items: center;
                line-height: normal;
                span{
                    font-size: 28px;
                    margin: 0 20px;
                }
                .icon-btn {
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
            .van-popover__wrapper{
                font-size: 32px;
                color: #606266;
                display: flex;
                align-items: center;
            }
        }
        .replay-item-post{
            display: flex;
            align-items: flex-end;
            line-height: normal;
            margin-top: 20px;
        }
    }
    .discuss-pagination{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
    .replay-foot{
        display: flex;
        align-items: flex-end;
        line-height: normal;
        border-top: 1px solid #ddd;
        padding-top: 20px;
    }
    .replay-div{
        width: 100%;
        color: #333;
        overflow: auto;
        display: block;
        white-space: pre;
        box-sizing: border-box;
        padding: 12px 28px;
        border: 1px solid #DCDFE6;
        margin-right: 20px;
        font-size: 28px;
        line-height: 40px;
        border-radius: 4px;
    }
    .replay-div:empty:before {
        content: attr(placeholder);
        color: #bbb;
    }
    .replay-div:focus{
        border-color: #567ceb;
    }
    .replay-btn{
        width: 180px;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        border-radius: 4px;
        background-color: #567ceb;
        color: #fff;
        font-size: 24px;
    }
}
</style>
