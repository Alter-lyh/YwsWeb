<template>
    <div class="bookpage-layout-main-right">
        <div class="home-desk">
            <div class="icon-btn">
                <i class="el-icon-edit-outline icon"></i>
                发表书评
            </div>
            <div class="icon-btn">
                <i class="el-icon-printer icon"></i>
                我要推书
            </div>
            <div class="icon-btn">
                <i class="el-icon-takeaway-box icon"></i>
                创建书单
            </div>
        </div>
        <div class="home-nav-list">
            <div class="home-nav-item">我的书架</div>
            <div class="home-nav-item">我的书架</div>
            <div class="home-nav-item">我的书架</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
			return {
				
			};
		},
		mounted() {
		},
		methods: {
		}
};
</script>

<style scoped lang="less">
.bookpage-layout-main-right{
    width: 280px;
    .home-desk{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        margin-bottom: 10px;
        .icon-btn{
            width: 33.33%;
            height: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #343434;
            cursor: pointer;
            .icon{
                font-size: 20px;
                margin-bottom: 8px;
            }
        }
        .icon-btn:nth-child(2){
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
        }
    }
    .home-nav-list{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 20px 0;
        background: #ffffff;
        .home-nav-item{
            line-height: 30px;
            box-sizing: border-box;
            padding-left: 20px;
            cursor: pointer;
        }
    }
}
</style>
