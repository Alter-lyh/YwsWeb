<template>
    <transition name="fade">
        <div class="loading-mask" v-show="loadingShow"><van-loading color="#0094ff" /></div>
     </transition>
</template>

<script>
    export default {
        name:'Loading',
        data() {
            return {
            };
        },
        computed: {
            loadingShow() {
                return this.$store.state.loadingShow
            }
        },
        created() {
            this.$store.commit('updateLoadingShow', false)
        }
    }
</script>

<style scoped lang="less">
.loading-mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100004;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .loading-gif{
        width: 300px;
        height: auto;
        display: block;
    }
}
.fade-leave-active {
  transition: opacity .5s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>