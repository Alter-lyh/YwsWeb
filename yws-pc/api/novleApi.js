const novleApi = ($axios) => {
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
    }
}

export default novleApi