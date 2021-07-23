const bookshelfApi = ($axios) => {
    return {
        // 加入或移除书签
        setStatus(params) {
            return $axios.post(`/bookshelf/setStatus`, params)
        },
        // 加入或移除书签
        getNoverList(params) {
            return $axios.get(`/bookshelf/getNoverList`, params)
        },
    }
}

export default bookshelfApi