const novelApi = ($axios) => {
    return {
        // 获取分类
        getCategory(params) {
            return $axios.get(`/novel/getCategory`, {            
                params: params        
            })
        },
        // 获取列表
        getNovelList(params) {
            return $axios.get(`/novel/getList`, {            
                params: params        
            })
        },
        // 获取信息
        getNovelInfo(params) {
            return $axios.get(`/novel/getInfo`, {            
                params: params        
            })
        },
        // 获取评论列表
        getDiscussList(params) {
            return $axios.get(`/novel/getDiscussList`, {            
                params: params        
            })
        },
        // 获取用户小说评论详情
        getDiscussInfo(params) {
            return $axios.get(`/novel/getDiscussInfo`, {            
                params: params        
            })
        },
        // 发布评论
        postDiscuss(params) {
            return $axios.post(`/novel/postDiscuss`, params)
        },
        // 修改书籍标签
        editTag(params) {
            return $axios.post(`/novel/addTag`, params)
        },
        // 获取用户小说标签
        getUserTagList(params) {
            return $axios.get(`/novel/getUserTagList`, {            
                params: params        
            })
        },
        // 打赏书籍
        addPoint(params) {
            return $axios.post(`/novel/addPoint`, params)
        },
    }
}

export default novelApi