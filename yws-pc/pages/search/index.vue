<template>
    <div class="main">
        <!-- 热门搜索区 -->
        <div class="hot-view" v-show="historyKeyWords.length">
            <div class="hot-title"><div class="icon-left"></div>历史搜索</div>
            <el-tag size="medium" class="tag" v-for="(item, $key) in historyKeyWords" :key="$key" closable type="danger" @click="searchKey(item)" @close="close($key)">{{item}}</el-tag>
        </div>
        <!-- 结果区域 -->
        <div class="result-view">
            <div
                class="item"
                url="/pages/book/index"
                v-for="(item, $key) in novelList"
                :key="$key"
            >
                <div class="book-img">
                    <img :src="item.novel_img" alt="" />
                </div>
                <div class="item-info">
                    <div class="item-info-head">
                        <nuxt-link class="book-name" :to="`/novel/${item.id}.html`">{{
                            item.novel_name
                        }}</nuxt-link>
                        <span class="add-btn">加入书架</span>
                    </div>
                    <div class="book-info">
                        <span class="book-info-item">{{
                            item.author_name
                        }}</span>
                        <span class="book-info-item">{{item.word_number | wordNumFilter}}</span>
                        <span class="book-info-item">{{item.update_time | timeFil}}</span>
                        <span class="book-info-item">{{item.update_status | updateStatusFil}}</span>
                    </div>
                    <div class="book-sore-list">
                        <span class="book-sore">综合评分：<em>{{ item.score }}</em>（{{ item.scorer }}人）</span>
                        <span class="book-sore">三年内：<em>{{ item.score_1 }}</em>（{{ item.scorer_1 }}人）</span>
                        <span class="book-sore">七年内：<em>{{ item.score_2 }}</em>（{{ item.scorer_2 }}人）</span>
                        <span class="book-sore">七年内：<em>{{ item.score_3 }}</em>（{{ item.scorer_3 }}人）</span>
                    </div>
                    <div class="book-tag">
                        <span class="book-tag-title">本书标签:</span>
                        <span
                            class="book-tag-item"
                            v-for="(item, $key) in item.novel_tags"
                            :key="$key"
                            >{{ item.tag_name }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "search",
    data() {
        return {
            keyword: "",
            historyKeyWords: [],
            novelList: []
        };
    },
    head() {
        return {
            title: `搜索_全网搜索_阅文说`,
            meta: [
                {hid: 'og:title', name: 'og:title', content: `搜索_全网搜索_阅文说` },
                {hid: 'keywords', name: 'keywords', content: `小说搜索，全网小说搜索，阅文说`},
                {hid: 'og:keywords', name: 'og:keywords', content: `小说搜索，全网小说搜索，阅文说`},
                {hid: 'description', name: 'description', content: `阅文说可以搜索全网小说`},
                {hid: 'og:description', name: 'og:description', content: `阅文说可以搜索全网小说`},
            ],
        }
    },
    async activated() {
        this.keyword = this.$route.query.keyword
        if (!this.keyword) return
        let historyKeyWords = window.localStorage.getItem('historyKeyWords') || '[]'
        historyKeyWords = JSON.parse(historyKeyWords)
        this.historyKeyWords = historyKeyWords
        this.search()
    },
    methods: {
        async search() {
            this.historyKeyWords.map((item, key) => {
                if (item == this.keyword) {
                    this.historyKeyWords.splice(key, 1)
                }
            })
            // 保存历史记录
            this.historyKeyWords.unshift(this.keyword)
            window.localStorage.setItem('historyKeyWords', JSON.stringify(this.historyKeyWords))
            const params = {
                keyword: this.keyword,
            };
            try {
                const res = await  this.$api.novel.search(params)
                if (res.code != '00') return
                this.novelList = res.data
            } catch (error) {
                console.log(error);
            }
        },
        async searchKey(item) {
            window.location.href = `./search?keyword=${item}`
        },
        // 删除历史搜索记录
        close(key) {
            this.historyKeyWords.splice(key, 1)
            window.localStorage.setItem('historyKeyWords', JSON.stringify(this.historyKeyWords))
        },
    },
};
</script>

<style lang="less" scoped>
.hot-view{
    box-sizing: border-box;
    padding: 10px 0;
    .hot-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        font-weight: bolder;
        margin-bottom: 10px;
        .icon-left {
            width: 6px;
            height: 18px;
            margin-right: 10px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAAB20lEQVQ4T5VVuzJDURRdi5HOeLT+gEaH8Y43MV6TCkFEkEjhD/IHCp3SjCqtfwhdGv5A69kxzjbn3GfuK3KbTPbZa6919tkPwv4kO5hCV08RlF2AQ5ZZniC8w8/HDWvP39pCY86NDeCX9xAZNv+dKPYviQY6keFt/YUmcqr3UYBhg47/Gvh+H6HsjV8AuI6MHAZXKHsTdRCjluRmj5C0DjxQcpOfEHRb/kEXJ4AllsAX1f6khLTbBglRAJTcVMiedHPKwbS4CDtykNFPRHUw40qKu4Gfkepw9j9+LobqMC3We+s0NWNpHzRLOkqLXSE+5vj0UuXn2pSUn28TcLwQfuCEKqQqLMZXRMQLUhWWIiRF1ITTG6qw7J266Q12kJN2gOpkxRcuuVpNxaqiBiRVT1NhaMBqm2k9XWsXkIkHRCilOlsXr5lbzA1zaQ2g05POBQOkzrkBnG/4GOKa02OmKmlA3IuFA1CVNn2SWieMqrzV2stHRClvfwqsQeY1rlc7AfMXpbJTF7FHZdJA0hmiHpWV7IWIMsPYTW8MkGCFUs2m5BWPzm6I9qVOZIP9GLEWymV2QH5xD8AslIhkNtgpGV7VXtwX0Ux46yhCsAuKvbL4BOAOfeqG1ZpZWX8hYrOdxKq5+QAAAABJRU5ErkJggg==)
                no-repeat;
            background-size: cover;
        }
    }
    .tag{
        margin-right: 8px;
        margin-bottom: 10px;
    }
    .el-tag{
        cursor: pointer;
    }
}
.result-view {
    width: 100%;
    height: auto;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 14px;
    color: #999;
    .item {
        width: 100%;
        height: auto;
        padding: 20px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        .book-img {
            width: 100px;
            min-width: 100px;
            height: 132px;
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            margin-right: 15px;
            display: flex;
            align-items: center;
            background: #eee;
            img {
                width: 100%;
                height: auto;
            }
        }
        .item-info {
            flex: 1;
            height: auto;
            .item-info-head {
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .book-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #333;
                }
                .add-btn {
                    color: #567ceb;
                }
            }
            .book-info {
                line-height: 30px;
                .book-info-item {
                    margin-right: 10px;
                }
            }
            .book-sore,
            .book-tag {
                line-height: 30px;
                .book-tag-title,
                .book-tag-item {
                    margin-right: 10px;
                }
            }
            .book-sore{
                margin-right: 10px;
                color: #333;
                em{
                    color: #FF6F59;
                    font-weight: bold;
                }
            }
            .book-tag-item{
                padding: 4px 8px;
                background-color: #f8f9fa;
            }
        }
    }
    .item:nth-last-child(1) {
        border: none;
    }
}
</style>
