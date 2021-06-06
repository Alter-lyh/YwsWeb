import Vue from 'vue'
Vue.filter('titleFilter', function (title, size = 40) {
    let titleText = title
    if (title.length > size) titleText = title.slice(0, size) + '...'
    return titleText
})