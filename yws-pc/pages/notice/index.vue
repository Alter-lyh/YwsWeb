<template>
    <div class="container">
        <div class="notice">
            <h4 class="title">全民持股计划</h4>
            <div class="content">
                <p>为推进网站发展，我决定实行全民持股计划</p>
                <p>简单的来说，就是把网站收益与硬币挂钩</p>
                <p>举个例子，网站三天内产生的收益为100元，流通的硬币为100枚，那么到兑换时，1硬币即可兑换1元。如果流通的硬币为200枚，则1硬币可兑换0.5元。硬币没有固定价值，根据收益变动而变动</p>
                <p><span>分成比例：</span>试运行阶段为100%，正式阶段不低于50%</p>
                <p><span>发放形式：</span>加我QQ发你红包</p>
                <p><span>发放起点：</span>5元起兑（不然我怕我累死）</p>
                <p><span>发放日期：</span>每周一我会公布截至上周末，产生的收益和硬币，用户可以在当天来找我兑换，过时就等下一次。</p>
                <p><span>硬币来源：</span>1.签到。2.给小说评分。后续会开放更多的</p>
                <p><span>特殊福利：</span>前十次给书籍评分，每次可以额外获取一元红包，评分字数不得少于15字</p>
                <p><span>注意事项：</span>用机器刷签到，或者瞎吉儿评分等等非法手段来薅羊毛的话（虽然这个羊毛少的可怜），我是不认的！</p>
                <p><span>书荒交流群：</span>1159724927，加群可以获取每日具体的可兑换金额和硬币数</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'notice',
    data() {
        return {
            amount: this.$config.amount,
            point: this.$config.point
        };
    },
    head() {
        return {
            title: `通知_阅文说`,
            meta: [
                {hid: 'og:title', name: 'og:title', content: `通知_阅文说` },
                {hid: 'keywords', name: 'keywords', content: `通知_阅文说`},
                {hid: 'og:keywords', name: 'og:keywords', content: `通知_阅文说`},
                {hid: 'description', name: 'description', content: `通知_阅文说`},
                {hid: 'og:description', name: 'og:description', content: `通知_阅文说`},
            ],
        }
    },
    async asyncData({ app, query, params }) {
    },
    async activated() {
    },
    methods: {
    }
};
</script>
<style lang="less" scoped>
.container {
    padding-top: 10px;
}
.notice{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    color: #333;
    .title{
        text-align: center;
        font-size: 20px;
        color: #222;
    }
    .content{
        text-indent: 2em;
        font-size: 16px;
        line-height: 1.9;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
        span{
            color: #222;
            font-weight: bold;
        }
        .money{
            color: red;
            font-size: 18px;
        }
    }
}
</style>