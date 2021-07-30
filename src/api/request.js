import axios from 'axios'
import store from '@/store'
import {
  Message,
  Loading,
  MessageBox
} from 'element-ui'
import qs from 'qs'
import vue from 'vue'
import router from '../router'
import user from '@/api/userApi'
const httpClient = axios.create({
  baseURL: '/zhyq-estate',
  timeout: 30000
})
let loadingItem = {}
httpClient.interceptors.request.use((config) => {
  loadingItem = Loading.service({
    text: '加载中'
  })
  const c = {
    ...config
  }
  if (c.url.includes('/zhyq-auth') || c.url.includes('/zhyq-admin')) {
    c.baseURL = ''
  }
  const token = store.getters.token
  if (token) {
    config.headers.common.Authorization = token
    config.headers.common.reqSource = '1'
    return c
  }
  return c
}, (err) => {
  Message.error(err)
  return Promise.reject(err)
})

httpClient.interceptors.response.use((res) => {
  const { code, responseData: data, message } = res.data
  loadingItem.close()
  if (res.data instanceof Blob) {
    return res
  }
  if (+code === 50004) {
    const token = store.getters.token
    if (token) {
      store.commit('SET_TOKEN', '')
      MessageBox.alert('登录已过期，请重新登陆~', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        showClose: false
      })
        .then(() => {
          store.dispatch('Logout').then(() => {
            // TODO
            // const url = process.env.NODE_ENV === 'development' ? `http://112.6.99.54:9091/sso/auth/?redirectUrl=${encodeURIComponent('http://127.0.0.1:8080')}` : process.env.VUE_APP_MODE === 'test'
            //   ? `http://112.6.99.54:9091/sso/auth/?redirectUrl=${encodeURIComponent('http://112.6.99.54:8086')}` : `http://114.215.43.8:9091/sso/auth/?redirectUrl=${encodeURIComponent('http://114.215.43.8:8086')}`
            // window.location.replace(url)
            router.push('/login')
          })
        })
        .catch(() => { })
      return Promise.reject(new Error('error'))
    }
  }
  if (+code === 50009) {
    const token = store.getters.token
    if (token) {
      const a = token
      store.commit('SET_TOKEN', '')
      MessageBox.alert('是否延长会话', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        showClose: false
      })
        .then(() => {
          user.refreshToken({ oldToken: a }).then(b => {
            store.commit('SET_TOKEN', b.newToken)
            router.push('/home')
            if (res.config.url === '/sysMenu/getIndexMenu') {
              window.location.reload()
            }
          })
        })
        .catch(() => { })
      return Promise.reject(new Error('error'))
    }
  }
  if (+code !== 200) {
    Message.error(message)
    return Promise.reject(message)
  }
  return data
}, (err) => {
  Message.error(`服务器异常： ${err}`)
  loadingItem.close()
  vue.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    loadingItem.close()
  })
  return Promise.reject(err)
})

/**
 * post 表单提交
 * @param {*} url
 * @param {*} data
 */
httpClient.postForm = (url, data) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    url
  }
  return httpClient(options)
}
export default httpClient
