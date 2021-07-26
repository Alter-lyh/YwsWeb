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

Vue.filter('updateStatusFil', function (updateStatus) {
    switch (updateStatus*1) {
        case 0:
            updateStatus = '连载中'
            break;

        case 1:
            updateStatus = '已完结'
            break;
    
        default:
            updateStatus = '太监中'
            break;
    }
    return updateStatus
})

Vue.filter('novelBookshelfFil', function (novelBookshelfStatus) {
    switch (novelBookshelfStatus*1) {
        case 0:
            novelBookshelfStatus = '加入书架'
            break;

        case 1:
            novelBookshelfStatus = '正在追读'
            break;
    
        case 2:
            novelBookshelfStatus = '养肥待看'
            break;
        
        case 1:
            novelBookshelfStatus = '已经看过'
            break;
    }
    return novelBookshelfStatus
})