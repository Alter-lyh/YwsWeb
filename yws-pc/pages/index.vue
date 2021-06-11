<template>
    <div class="main">
        <div class="banner-view">
            <img src="https://i.loli.net/2020/04/20/1GE9Lv78nJ4YoqA.png" alt="" />
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
    height: 265px;
    box-sizing: border-box;
    overflow: hidden;
    img{
        width: 100%;
        height: auto;
    }
    // display: flex;
    // justify-content: space-between;
    // .banner-view-left {
    //     width: 495px;
    //     height: 270px;
    //     border-radius: 4px;
    //     overflow: hidden;
    //     img {
    //         width: auto;
    //         height: 100%;
    //     }
    // }
    // .banner-view-right {
    //     width: 495px;
    //     height: 270px;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     .img-box {
    //         width: 495px;
    //         height: 130px;
    //         border-radius: 4px;
    //         overflow: hidden;
    //         img {
    //             width: 100%;
    //             height: 100%;
    //         }
    //     }
    // }
}
.bookpage-layout-main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
</style>
