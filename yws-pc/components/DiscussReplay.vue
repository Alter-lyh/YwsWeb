<template>
    <div class="discuss-replay">
        <div class="replay-header">共{{replyList.length}}条评论</div>
        <div class="replay-item" v-for="(item, $key) in replyList" :key="$key">
            <div class="replay-item-header">
                <img class="author-img" src="@/assets/img/user_defalut.png" alt=""/>
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
                <el-dropdown trigger="click" placement="bottom">
                    <span class="el-dropdown-link">
                        <i slot="reference" class="el-icon-more discuss-actions-right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>投诉</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="replay-item-post" v-show="replayShowList.indexOf($key) != -1">
                <div class="replay-div" contenteditable="plaintext-only" placeholder="内容不得少于5个字"></div>
                <div class="replay-btn" @click="replayItemComment($event, item.parent_id, item.novel_id, $key, item.user_id)">发布评论</div>
            </div>
        </div>
        <div class="discuss-pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="page"
                :page-count="pageAll"
                @current-change="changePage">
            </el-pagination>
        </div>
        <div class="replay-foot">
            <div class="replay-div" contenteditable="plaintext-only" placeholder="内容不得少于5个字"></div>
            <div class="replay-btn" @click="replayComment($event)">发布评论</div>
        </div>
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
            replayShowList: []
        };
    },
    watch: {
        async replayShow(flag) {
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
        async replayComment(event) {
            event = event ? event : window.event; 
            const obj = event.srcElement ? event.srcElement : event.target;

            let content = obj.previousElementSibling.innerHTML
            content = content.replace(/\s+$/, '')
            if (content.length < 5) return this.$message.error('评论必须大于5个字');

            const params = {
                parentId: this.discussId,
                novelId: this.novelId,
                content: content,
            }
            try {
                const res = await this.$api.discussApi.postReply(params)
                if (res.code != '00') return
                this.$message.success('评论发布成功');
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
            if (content.length < 5) return this.$message.error('评论必须大于5个字');
            const params = {
                parentId: parentId,
                novelId: novelId,
                content: content,
                resId: resId
            }
            try {
                const res = await this.$api.discussApi.postReply(params)
                if (res.code != '00') return
                this.$message.success('评论发布成功');
                this.changePage(1)
            } catch (error) {
                console.log(error)
            }
            this.setReplayShow($key)
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
    border-radius: 3px;
    margin: 18px 0;
    .replay-header{
        padding-bottom: 20px;
        color: #999;
        font-size: 14px;
    }
    .replay-item{
        border-top: 1px solid #ddd;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        .replay-item-header{
            height: 50px;
            display: flex;
            align-items: center;
            .author-img{
                width: 26px;
                height: 26px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .author-info{
                font-size: 14px;
                color: #616161;
                font-weight: 700;
            }
        }
        .replay-item-content{
            font-size: 14px;
            color: #333;
            letter-spacing: 2px;
            line-height: 24px;
            .replay-title{
                color: #8590a6;
                font-weight: bold;
            }
        }
        .replay-item-foot{
            width: 100%;
            height: 40px;
            line-height: normal;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #999;
            .replay-item-foot-left {
                display: flex;
                align-items: center;
                line-height: normal;
                span{
                    font-size: 14px;
                    margin: 0 20px;
                    cursor: pointer;
                }
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
                font-size: 18px;
                color: #606266;
                cursor: pointer;
            }
        }
        .replay-item-post{
            display: flex;
            align-items: flex-end;
            line-height: normal;
            margin-top: 10px;
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
        padding: 5px 14px;
        border: 1px solid #DCDFE6;
        margin-right: 10px;
        font-size: 14px;
        line-height: 20px;
        border-radius: 2px;
    }
    .replay-div:empty:before {
        content: attr(placeholder);
        color: #bbb;
    }
    .replay-div:focus{
        border-color: #567ceb;
    }
    .replay-btn{
        width: 70px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        border-radius: 2px;
        background-color: #567ceb;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
    }
}
</style>
