const booklistApi = ($axios) => {
    return {
        // 获取列表
        getBooklist(params) {
            return $axios.get(`/booklist/getList`, {
                params: params        
            })
        },
        // 获取详情
        getInfo(params) {
            return $axios.get(`/booklist/getInfo`, {
                params: params        
            })
        },
        // 获取书单书籍列表
        getNovelList(params) {
            return $axios.get(`/booklist/getNovelList`, {
                params: params        
            })
        },
        // 获取书单书籍评论
        getDiscussList(params) {
            return $axios.get(`/booklist/getDiscussList`, {
                params: params        
            })
        },
        // 创建
        createBooklist(params) {
            return $axios.post(`/booklist/create`, params)
        },
        // 创建
        addBooklistNovel(params) {
            return $axios.post(`/booklist/addNovel`, params)
        },
    }
}

export default booklistApi