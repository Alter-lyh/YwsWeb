import { Message } from 'element-ui';
import novleApi from '@/api/novleApi'
export default function ({ $axios }, inject) {
    // 请求拦截
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })
    // 响应拦截
    $axios.onResponse(res => {
        let json = res.data
        if (json.error != '00') {
            Message.error('错了哦，这是一条错误消息');
            return Promise.reject(json)
        }
        return json.data
    })
    // 错误拦截
    // $axios.onError(error => {
    //     nuxtError({
    //         statusCode: error.error,
    //         message: error.msg,
    //     });
    //     return Promise.resolve(false);
    // })

    // Create a custom axios instance
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, text/javascript, */*'
            }
        }
    })
    api.novel = novleApi($axios)
    // api.novel = {
    //     getNovelList(params) {
    //         return $axios.get(`/novel/getList`, {            
    //             params: params        
    //         })
    //     },
    //     getCategory(params) {
    //         return $axios.get(`/novel/getCategory`, {            
    //             params: params        
    //         })
    //     }
    // }

    // Inject to context as $api
    inject('api', api)
}