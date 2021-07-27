const taskApi = ($axios) => {
    return {
        // 用户登录
        signIn(params) {
            return $axios.post(`/task/signIn`, params)
        },
    }
}

export default taskApi