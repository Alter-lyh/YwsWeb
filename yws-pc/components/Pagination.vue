<template>
    <div class="pagination">
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-count="pageAll"
            @current-change="changePage">
        </el-pagination>
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
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    margin-top: 10px;
}
</style>
