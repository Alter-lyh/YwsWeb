const discussApi = ($axios) => {
    return {
        // 获取书籍评论回复列表
        getReply(params) {
            return $axios.get(`/discuss/getReply`, {            
                params: params        
            })
        },
    }
}

export default discussApi