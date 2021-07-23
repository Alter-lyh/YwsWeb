const praiseApi = ($axios) => {
    return {
        // 点赞或者点踩
        setStatus(params) {
            return $axios.post(`/praise/setStatus`, params)
        },
    }
}

export default praiseApi