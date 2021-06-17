const userApi = ($axios) => {
    return {
        // 发送验证码
        sendMail(params) {
            return $axios.post(`/email/sendMail`, params)
        },
        // 用户注册
        register(params) {
            return $axios.post(`/user/register`, params)
        },
        // 用户登录
        signIn(params) {
            return $axios.post(`/user/signIn`, params)
        },
        // 获取用户信息
        getInfo(params) {
            return $axios.get(`/user/getInfo`, {            
                params: params        
            })
        },
    }
}

export default userApi