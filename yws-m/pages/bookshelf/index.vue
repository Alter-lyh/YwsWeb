<template>
    <div class="container">
        <div class="book-case-tap">
            <div :class="['item', type == 1 ? 'active' : '']" @click="setType(1)">正在追读</div>
            <div :class="['item', type == 2 ? 'active' : '']" @click="setType(2)">养肥待看</div>
            <div :class="['item', type == 3 ? 'active' : '']" @click="setType(3)">已经看过</div>
        </div>
        <div class="result-view">
            <p class="book-case-total">本书架共有{{novelList.length}}本书</p>
            <div class="novel-list">
                <div class="item" v-for="(item, $key) in novelList" :key="$key">
                    <div class="item-top">
                        <span class="novel-name">{{item.novel.novel_name}}</span>
                        <van-rate :value="item.score/2" :size="14" color="#ff9900"/>
                    </div>
                    <div class="item-bot">
                        <div class="bot-left">
                            <span>{{item.novel.author_name}}</span>
                            <span>{{item.novel.update_time | timeFil}}</span>
                        </div>
                        <div class="bot-right">
                            <span class="to-read" @click="readMore(item)">立即阅读</span>
                            <van-icon class="more-actions" name="weapp-nav" @click="statusMore(item)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 阅读的更多操作 -->
        <van-action-sheet v-model="show1" :actions="actions1" @select="onSelect1" cancel-text="取消" close-on-click-action @cancel="show1 = false"/>
        <!-- 书架状态的更多操作 -->
        <van-action-sheet v-model="show2" :actions="actions2" @select="onSelect2" />
        <Pagination
            :currentPage="page"
            :pageAll="pageAll"
            @changePage="changePage"
        />
    </div>
</template>
<script>
export default {
    name: 'bookshelf',
    data() {
        return {
            type: 1,
            page: 1,
            pageAll: 1,
            novelList: [],
            show1: false,
            actions1: [],
            novelId: '',
            show2: false,
            actions2: [],
        };
    },
    async asyncData({ app, query, params }) {
    },
    async activated() {
        this.getNoverList()
    },
    methods: {
        async getNoverList() {
            const params = {
                type: this.type,
                page: this.page,
            }
            try {
                const res = await this.$api.bookshelfApi.getNoverList(params)
                const json = res.data
                this.novelList = json.data
                this.pageAll = json.pageAll
                console.log(this.novelList);
            } catch (error) {
                console.log(error);
            }
            
        },
        async setType(type) {
            this.type = type
            this.getNoverList()
        },
        // 阅读的更多操作
        async readMore(item) {
            console.log(item.novel.source);
            this.actions1 = []
            const source = JSON.parse(item.novel.source)
            source.map(item => {
                this.actions1.push({
                    name: item. siteName,
                    ...item
                })
            })
            this.show1 = true
        },
        // 书架状态的更多操作
        async statusMore(item) {
            this.actions2 = [{name: '正在追读', type: 1}, {name: '养肥待看', type: 2}, {name: '已经看过', type: 3}, {name: '取消收藏', type: 0}]
            this.actions2 = this.actions2.filter(i => i.type != item.type)
            this.show2 = true
            this.novelId = item.novel_id
        },
        onSelect1(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show1 = false;
            window.location.href = item.bookPage
        },
        async onSelect2(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            const {type} = item
            const params = {
                type: type == 0 ? 0 : type,
                status: type == 0 ? 2 : 1,
                novelId: this.novelId
            }
            try {
                const res = await this.$api.bookshelfApi.setStatus(params)
                if (res.code != '00') return
                if (type != 0) {
                    this.$toast('加入成功');
                } else {
                    this.$toast('取消成功');
                }
            } catch (error) {
                console.log(error)
            }
            this.getNoverList()
            this.show2 = false;
        },
        changePage(page) {
            this.page = page;
            this.getNoverList()
        }
    }
};
</script>
<style lang="less" scoped>
.book-case-tap {
    width: 100%;
    height: 100px;
    background: #e9eaed;
    display: flex;
    .item {
        flex: 1;
        font-size: 32px;
        color: #333;
        padding: 30px 0;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
    }
    .active {
        background-color: #fff;
        border-radius: 10px 10px 0 0;
    }
}
.result-view {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 30px;
    padding-bottom: 20px;
    background: #fff;
    .book-case-total {
        padding: 36px 0 10px;
        color: #888;
        margin-bottom: 10px;
    }
    .novel-list{
        .item{
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f3f4f7;
            .item-top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                .novel-name{
                    font-size: 32px;
                }
            }
            .item-bot{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .bot-left{
                    font-size: 28px;
                    color: #999;
                    span{
                        margin-right: 10px;
                    }
                }
                .bot-right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    line-height: normal;
                    .to-read{
                        color: #567ceb;
                        margin-right: 30px;
                        font-size: 28px;
                        font-weight: bold;
                    }
                    .more-actions{
                        font-size: 40px;
                        color: #a3b1d8;
                    }
                }
            }
        }
        .item:nth-last-child(1){
            margin-bottom: 0;
            border-bottom: 1px solid transparent;
        }
    }
}

</style>