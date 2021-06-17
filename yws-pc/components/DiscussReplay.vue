<template>
    <div class="discuss-replay">
        <div class="replay-header">共{{replyNum}}条评论</div>
        <div class="replay-item" v-for="(item, $key) in replyList" :key="$key">
            <div class="replay-item-header">
                <img class="author-img" src="https://avatar.lkong.com/avatar/000/68/77/17_avatar_small.jpg" alt=""/>
                <div class="author-info">45678</div>
            </div>
            <div class="replay-item-content">{{item.content}}</div>
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
                <div class="replay-div" contenteditable="true" placeholder="内容不得少于5个字">{{content}}</div>   
                <el-button class="replay-btn" type="primary" size="small">发布评论</el-button>
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
            <div class="replay-div" contenteditable="true" placeholder="内容不得少于5个字">{{content}}</div>   
            <el-button class="replay-btn" type="primary" size="small">发布评论</el-button>
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
    props: ['replyNum', 'replyList', 'page', 'pageAll'],
    data() {
        return {
            content:  null,
            replayShowList: []
        };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        // 是否显示回复按钮
        setReplayShow($key) {
            
            let k = this.replayShowList.indexOf($key)
            if (k == -1) {
                this.replayShowList.push($key)
            } else {
                this.replayShowList.splice(k, 1)
            }

        },
        changePage() {

        }
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
}
</style>
