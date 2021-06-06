export const state = () => ({
    loginFlag: false
})

// 同步修改代码
export const mutations = {
    updateLoginView(state, flag = false) {
        state.loginFlag = flag
    }
}