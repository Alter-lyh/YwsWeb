<template>
    <div class="discuss-content">
        <div class="content-inner">
            <span class="content-inner-details" v-if="status || content.length <= 140">{{content}}</span>
            <span class="content-inner-details" v-show="!status && content.length > 140">{{content | titleFilter(140)}}</span>
            <span class="show-more" v-if="content.length > 140" @click="checkShow(status)">{{!status ? '展开全部' : '收起全部'}}</span>
        </div>
        <div class="createdAt-source">
            编辑于{{editTime | timeFil}}
        </div>
    </div>
</template>

<script>
export default {
    name: "DiscussContent",
    props: {
        content: '',
        editTime: ''
    },
    data() {
        return {
            status: false,
        };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        checkShow() {
            this.status = !this.status
        }
    }
};
</script>

<style scoped lang="less">
.discuss-content {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    .content-inner {
        .content-inner-details {
            font-size: 14px;
            color: #333;
            letter-spacing: 2px;
            line-height: 24px;
            white-space: pre-wrap;
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
</style>
