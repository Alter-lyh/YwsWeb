const bookshelfApi = ($axios) => {
    return {
        // 加入或移除书签
        setStatus(params) {
            return $axios.post(`/bookshelf/setStatus`, params)
        },
        // 
        getNoverList(params) {
            return $axios.get(`/bookshelf/getNoverList`, {
                params: params        
            })
        },
        getNoverStatus(params) {
            return $axios.get(`/bookshelf/getNoverStatus`, {
                params: params        
            })
        }
    }
}

export default bookshelfApi