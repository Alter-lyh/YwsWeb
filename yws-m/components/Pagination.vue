<template>
    <div class="pagination">
        <van-pagination v-model="currentPage" :page-count="pageAll" @change="changePage"/>
    </div>
</template>

<script>
export default {
    props: ['currentPage', 'pageAll'],
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
        changePage(page) {
            this.$emit('changePage', page)
        }
    }
};
</script>

<style scoped lang="less">
.pagination{
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    margin-top: 20px;
}
</style>
