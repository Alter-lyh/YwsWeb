<template>
    <div class="sidebar" v-show="backTopFlag" @click="backtop">
        <van-icon name="back-top" class="icon" />
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
            if (scrollTop > 20) {
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
    width: 100px;
    height: 100px;
    position: fixed;
    bottom: 140px;
    right: 34px;
    cursor: pointer;
    z-index: 99;
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.15);
    border-radius: 50%;
    background-color: #fff;
    color: #ff6a00;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
        font-size: 42px;
        font-weight: 700;
    }
}
</style>
