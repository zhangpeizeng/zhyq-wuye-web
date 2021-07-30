import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRouterMap, asyncRouterMap } from './config'
import NProgress from 'nprogress'
import store from '@/store/index'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [...constantRouterMap, ...asyncRouterMap],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局的路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '智慧园区后台管理系统'
  }
  NProgress.start()
  next()
  // 判断是否获取信息(登录)成功过
  const token = store.getters.token
  if (to.meta.notLogin) {
    next()
  } else if (!token) {
    // TODO
    // if (location.href.includes('ticket')) {
    //   next()
    // } else {
    //   const url = process.env.NODE_ENV === 'development' ? `http://112.6.99.54:9091/sso/auth/?redirectUrl=${encodeURIComponent('http://127.0.0.1:8080')}` : process.env.VUE_APP_MODE === 'test'
    //     ? `http://112.6.99.54:9091/sso/auth/?redirectUrl=${encodeURIComponent('http://112.6.99.54:8086')}` : `http://114.215.43.8:9091/sso/auth/?redirectUrl=${encodeURIComponent('http://114.215.43.8:8086')}`
    //   window.location.replace(url)
    // }
    router.push('/login')
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})

const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
