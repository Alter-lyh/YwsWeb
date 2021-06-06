<template>
    <div class="main">
        <check-one theme="filled" size="32" fill="#17bd08"/>
        <div class="banner-view">
            <div class="banner-view-left">
                <img src="https://i.loli.net/2020/04/20/1GE9Lv78nJ4YoqA.png" alt="" />
            </div>
            <div class="banner-view-right">
                <div class="img-box">
                    <img src="https://i.loli.net/2020/09/27/w6EZDHovbXy4BQs.png" alt="" />
                </div>
                <div class="img-box">
                    <img src="https://i.loli.net/2020/04/20/daYJwDoV18gMTPN.png" alt="" />
                </div>
            </div>
        </div>
        <div class="bookpage-layout-main">
            <home-left-side />
            <home-right-side />
        </div>
    </div>
</template>

<script>
export default {
    name:'home',
    data() {
        return {
        };
    },
};
</script>

<style lang="less" scoped>
.banner-view {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    .banner-view-left {
        width: 495px;
        height: 270px;
        border-radius: 4px;
        overflow: hidden;
        img {
            width: auto;
            height: 100%;
        }
    }
    .banner-view-right {
        width: 495px;
        height: 270px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .img-box {
            width: 495px;
            height: 130px;
            border-radius: 4px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
.bookpage-layout-main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
</style>
