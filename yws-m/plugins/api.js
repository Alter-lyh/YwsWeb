import { Notify } from 'vant';
import { getToken, clearToken } from './auth'

import novelApi from '@/api/novelApi'
import userApi from '@/api/userApi'
import discussApi from '@/api/discussApi'
import booklistApi from '@/api/booklistApi'
import praiseApi from '@/api/praiseApi'
import bookshelfApi from '@/api/bookshelfApi'
import taskApi from '@/api/taskApi'
export default function ({ $axios }, inject) {
    // 请求拦截
    $axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
        if(getToken()) config.headers['authorization'] = getToken();
    })
    // 响应拦截
    $axios.onResponse(res => {
        let json = res.data
        if(json.code == '01') {
            clearToken()
        }
        if (json.code != '00') {
            Notify({ type: 'warning', message: json.msg });
            return Promise.resolve(json);
        }
        return json
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
    api.novel = novelApi($axios)
    api.userApi = userApi($axios)
    api.discussApi = discussApi($axios)
    api.booklistApi = booklistApi($axios)
    api.praiseApi = praiseApi($axios)
    api.bookshelfApi = bookshelfApi($axios)
    api.taskApi = taskApi($axios)

    // Inject to context as $api
    inject('api', api)
}