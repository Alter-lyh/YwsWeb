const PLATFORM = 'YWS-'

export const getToken = () => {
    let token = window.localStorage.getItem(PLATFORM + 'TOKEN')
    return token
}

export const setToken = (token) => {
    window.localStorage.setItem(PLATFORM + 'TOKEN', token)
}

export const clearToken = () => {
    let token = window.localStorage.removeItem(PLATFORM + 'TOKEN')
    return token
}

export const getUserInfo = () => {
    let token = window.localStorage.getItem(PLATFORM + 'UserInfo')
    return JSON.parse(token)
}

export const setUserInfo= (userinfo) => {
    window.localStorage.setItem(PLATFORM + 'UserInfo', JSON.stringify(userinfo))
}

export const clearUserInfo = () => {
    let token = window.localStorage.removeItem(PLATFORM + 'UserInfo')
    return token
}