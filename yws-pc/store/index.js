export const state = () => ({
    loginFlag: false,
    loginStatus: false,
    userInfo: {
        name: '默认用户'
    },
    coinFlag: false,
    bookListAddFlag: false
})

export const getters = {
    getLoginStatus: (state) => {//通过属性访问
        return state.loginStatus
    },
    getUserInfo: state => {
        return state.userInfo
    }
}

// 同步修改代码
export const mutations = {
    updateLoginView(state, flag = false) {
        state.loginFlag = flag
    },
    updateLoginStatus(state, flag = false) {
        state.loginStatus = flag
    },
    setUserInfo(state, info) {
        state.userInfo = info
    },
    updateCoinView(state, flag = false) {
        state.coinFlag = flag
    },
    updateBookListAdd(state, flag = false) {
        state.bookListAddFlag = flag
    },
}