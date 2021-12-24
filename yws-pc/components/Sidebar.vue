<template>
    <div class="sidebar">
        <el-tooltip class="item" effect="dark" content="QQ咨询" placement="left">
            <a href="tencent://message/?Menu=yes&uin=1031908340" target="_blank">
                <i class="el-icon-s-comment"></i>
            </a>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="返回顶部" placement="left" v-if="backTopFlag">
            <i class="el-icon-top" @click="backtop"></i>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name:'sidebar',
    data() {
        return {
            backTopFlag: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", () => {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop > 400) {
                this.backTopFlag = true;
            } else {
                this.backTopFlag = false;
            }
        });
    },
    methods: {
        backtop() {
            let timer = setInterval(function () {
                let osTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                let ispeed = Math.floor(-osTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop =
                    osTop + ispeed;
                this.isTop = true;
                if (osTop === 0) {
                    clearInterval(timer);
                }
            }, 20);
        },
    }
};
</script>

<style scoped lang="less">
.sidebar{
    position: fixed;
    right: 80px;
    bottom: 80px;
    z-index: 999;
    text-shadow: 0 2px 2px rgba(0,0,0,.15);
    .item{
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        cursor: pointer;
        box-shadow: 0 6px 12px 0 rgba(0,0,0,.15);
        border-radius: 50%;
        background-color: #fff;
        font-size: 20px;
        color: #555;
        margin-bottom: 10px;
    }
    .item:nth-last-child(1){
        margin-bottom: 0;
    }
    .item:hover{
        background: #ff6a00;
        color: #fff;
    }
    .el-icon-top{
        font-weight: bolder;
    }
}
</style>
