<template>
    <div class="container">
        <header class="header">
            <van-icon name="arrow-left" class="icon" @click="goBack" />
            <form action="/" class="search">
                <van-search
                    v-model="keyWord"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                >
                    <template #action>
                        <div @click="onSearch">搜索</div>
                    </template>
                </van-search>
            </form>
        </header>
        <!-- 热门搜索区 -->
        <div class="hot-view" v-show="historyKeyWords.length">
            <div class="hot-title"><div class="icon-left"></div>历史搜索</div>
            <van-tag type="warning" closeable  size="medium" class="tag" v-for="(item, $key) in historyKeyWords" :key="$key" @click="searchKey(item)" @close="close($key)">{{item}}</van-tag>
        </div>
        <!-- 搜索区 -->
        <div class="search-view">
            <div class="search-title">搜索结果({{novelList.length}})</div>
            <div class="search-list">
                <nuxt-link
                    class="item"
                    url="/pages/book/index"
                    v-for="(item, $key) in novelList"
                    :key="`book${$key}`"
                    :to="`/novel/${item.id}.html`"
                >
                    <div class="book-img">
                        <img :src="item.novel_img" alt="" />
                    </div>
                    <div class="item-info">
                        <div class="item-info-head">
                            <nuxt-link class="book-name" :to="`/novel/${item.id}.html`">
                                {{item.novel_name}}
                            </nuxt-link>
                        </div>
                        <div class="book-info">
                            <span class="book-info-item">作者:{{item.author_name}}</span>
                        </div>
                        <div class="book-info">
                            <span class="book-info-item">{{item.word_number | wordNumFilter}}</span>
                            <span class="book-info-item">{{item.update_time | timeFil}}</span>
                        </div>
                        <div class="book-sore-list">
                            <span class="book-sore">当前评分：<em>{{ item.score }}</em>（{{ item.scorer }}人）</span>
                            <span class="book-info-item"></span>
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
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "search",
    data() {
        return {
            keyWord: "",
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
        if (this.$route.meta.isBack) {
            document.documentElement.scrollTop = document.body.scrollTop = 0
        }
        this.$route.meta.isBack = true
        let historyKeyWords = window.localStorage.getItem('historyKeyWords') || '[]'
        historyKeyWords = JSON.parse(historyKeyWords)
        this.historyKeyWords = historyKeyWords
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async onSearch() {
            if (this.keyWord.trim() == '') {
                this.$toast('关键词不可为空')
                return
            }
            this.keyWord = this.keyWord.trim()
            this.historyKeyWords.map((item, key) => {
                if (item == this.keyWord) {
                    console.log(1);
                    this.historyKeyWords.splice(key, 1)
                }
            })
            // 保存历史记录
            this.historyKeyWords.unshift(this.keyWord)
            window.localStorage.setItem('historyKeyWords', JSON.stringify(this.historyKeyWords))
            this.$toast.loading({
                duration: 0
            });
            const params = {
                keyword: this.keyWord,
            };
            try {
                const res = await  this.$api.novel.search(params)
                if (res.code != '00') return
                this.novelList = res.data
            } catch (error) {
                console.log(error);
            } finally {
                this.$toast.clear()
            }
            
        },
        async searchKey(item) {
            this.keyWord = item
            console.log(item);
            await this.onSearch()
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
.container{
    min-height: 100vh;
    box-sizing: border-box;
    background: #fff;
    padding-top: 110px;
    padding-bottom: 20px;
}
.header {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    .icon {
        font-size: 32px;
    }
    .search {
        flex: 1;
    }
}
.hot-view{
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0 20px;
    .hot-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 20px 0;
        font-size: 28px;
        font-weight: bolder;
        .icon-left {
            width: 12px;
            height: 36px;
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
}
.search-view {
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0 20px;
    .search-title {
        line-height: 60px;
        font-size: 24px;
    }
    .search-list {
        width: 100%;
        height: auto;
        background: #fff;
        box-sizing: border-box;
        font-size: 28px;
        color: #999;
        .item {
            width: 100%;
            height: auto;
            padding: 40px 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border-bottom: 1px solid #eee;
            overflow: hidden;
            .book-img {
                width: 200px;
                min-width: 200px;
                height: 264px;
                border-radius: 8px;
                cursor: pointer;
                overflow: hidden;
                margin-right: 30px;
                display: flex;
                align-items: center;
                background: #eee;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .item-info {
                width: 100%;
                height: auto;
                .item-info-head {
                    width: 100%;
                    height: 70px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .book-name {
                        width: 310px;
                        font-size: 32px;
                        font-weight: 700;
                        color: #333;
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .add-btn {
                        color: #567ceb;
                    }
                }
                .book-info {
                    line-height: 50px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .book-info-item {
                        margin-right: 20px;
                    }
                    .book-info-item:nth-last-child(1){
                        margin-right: 0;
                    }
                }
                .book-sore {
                    line-height: 50px;
                }
                .book-sore{
                    margin-right: 20px;
                    color: #333;
                    em{
                        color: #FF6F59;
                        font-weight: bold;
                    }
                }
                .book-tag{
                    line-height: 50px;
                    display: -webkit-box;
                    overflow-x: auto;
                    margin-top: 10px;
                    .book-tag-title,
                    .book-tag-item {
                        margin-right: 20px;
                    }
                }
                .book-tag-item{
                    display: block;
                    padding: 0 8px;
                    background-color: #f8f9fa;
                    font-size: 24px;
                }
            }
        }
        .item:nth-child(1) {
            padding-top: 0;
        }
        .item:nth-last-child(1) {
            border: none;
        }
    }
}
</style>
