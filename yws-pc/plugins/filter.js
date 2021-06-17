import Vue from 'vue'
Vue.filter('titleFilter', function (title, size = 40) {
    let titleText = title
    if (title.length > size) titleText = title.slice(0, size) + '...'
    return titleText
})

Vue.filter('wordNumFilter', function (wordNum) {
    wordNum = (wordNum/10000).toFixed(2) + '万字'
    return wordNum
})

Vue.filter('timeFil', function (time) {
    let date = new Date(time * 1000)

    const newTime = (new Date()).getTime()
    const gapTime = (newTime - time * 1000)/1000
    if (gapTime < 60) {
        date = '刚刚'
    } else if (gapTime < 3600) {
        date = `${parseInt(gapTime/60)}分钟前`
    } else if (gapTime<24*3600) {
        date = `${parseInt(gapTime/3600)}小时前`
    } else if (gapTime<7*24*3600) {
        date = `${parseInt(gapTime/(24*3600))}天前`
    } else {
        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)
    }

    return date
})