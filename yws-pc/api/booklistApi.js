const booklistApi = ($axios) => {
    return {
        // 获取分类
        getBooklist(params) {
            return $axios.get(`/booklist/getList`, {            
                params: params        
            })
        }
    }
}

export default booklistApi