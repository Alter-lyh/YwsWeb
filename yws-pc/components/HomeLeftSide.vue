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
            <div class="item-content">
                <div class="content-inner">
                    <div class="content-inner-details">
                        好文。日常角度写那个特殊的年代，从家里到社会，画卷逐渐展开。优点包括但不限于：<br />1.
                        人物刻画。所有，合
                    </div>
                    <div class="show-more">...展开全部</div>
                </div>
                <div class="createdAt-source">
                    编辑于2020-01-18 13:22
                </div>
            </div>
            <div class="item-actions">
                <div class="item-actions-left">
                    <el-button type="primary" icon="el-icon-caret-top">赞</el-button >
                    <el-button type="primary" icon="el-icon-caret-bottom">踩</el-button>
                    <div class="icon-btn"><i class="el-icon-s-comment icon"></i> 我要评论</div>
                    <div class="icon-btn"><i class="el-icon-s-promotion icon"></i> 分享</div>
                    <div class="icon-btn"><i class="el-icon-star-off icon"></i> 收藏</div>
                </div>
                <el-popover
                    placement="bottom"
                    content="删除"
                    trigger="click">
                    <i slot="reference" class="el-icon-more item-actions-right"></i>
                </el-popover>
            </div>
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
            <div class="item-content">
                <div class="content-inner">
                    <div class="content-inner-details">
                        好文。日常角度写那个特殊的年代，从家里到社会，画卷逐渐展开。优点包括但不限于：<br />1.
                        人物刻画。所有，合
                    </div>
                    <div class="show-more">...展开全部</div>
                </div>
                <div class="createdAt-source">
                    编辑于2020-01-18 13:22
                </div>
            </div>
            <div class="item-actions">
                <div class="item-actions-left">
                    <el-button type="primary" icon="el-icon-caret-top">赞</el-button >
                    <el-button type="primary" icon="el-icon-caret-bottom">踩</el-button>
                    <div class="icon-btn"><i class="el-icon-s-comment icon"></i> 我要评论</div>
                    <div class="icon-btn"><i class="el-icon-s-promotion icon"></i> 分享</div>
                    <div class="icon-btn"><i class="el-icon-star-off icon"></i> 收藏</div>
                </div>
                <el-popover
                    placement="bottom"
                    content="删除"
                    trigger="click">
                    <i slot="reference" class="el-icon-more item-actions-right"></i>
                </el-popover>
            </div>
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
        padding-bottom: 20px;
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
        .item-content {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 10px;
            padding-bottom: 0;
            .content-inner {
                .content-inner-details {
                    font-size: 14px;
                    color: #333;
                    letter-spacing: 1px;
                }
                .show-more {
                    font-size: 14px;
                    color: #567ceb;
                    cursor: pointer;
                }
            }
            .createdAt-source {
                width: 100%;
                line-height: 48px;
                font-size: 14px;
                color: #999;
            }
        }
        .item-actions {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .item-actions-left {
                display: flex;
                align-items: center;
                .icon-btn {
                    cursor: pointer;
                    margin: 20px;
                }
                .icon {
                    font-size: 16px;
                }
            }
            .item-actions-right {
                font-size: 24px;
                color: #c9c9d1;
                cursor: pointer;
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
