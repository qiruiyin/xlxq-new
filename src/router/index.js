import Vue from 'vue'
import commonFun from 'src/commons'
import store from 'src/store'
import Router from 'vue-router'
import routerLink from './router-link'
import hold from 'src/commons/hold'
import wordBook from 'src/commons/wordBook'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

Vue.use(Router)

const router = new Router({
  routes: routerLink
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0);

router.beforeEach((to, from, next) => {

  // 是否加载
  store.commit('updateLoadingStatus', {isLoading: true});
  if(!hold.storage.get('openId') && to.path != '/author' && to.path != '/download'){
    // 第一次进入项目
    hold.localStorage.set('beforeLoginUrl', JSON.stringify(to)) // 保存用户进入的url
    next('/author')
    return false
  }
  // 用户是否授权结束

  // 底部显不显示（Vue.prototype.wordBook.nav不显示列表）
  store.commit("updateNavStatus", { status: !Vue.prototype.arrContain(Vue.prototype.wordBook.nav, to.name) });

  if(to.name == 'msg') {
    store.commit("updateUserHasMsg", { hasMsg: '' });
  }
  // 切换效果
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
  // 切换效果结束
})

router.afterEach((to, from, next) => {

  store.commit('updateLoadingStatus', {isLoading: false})
  // 设置标题
  global.document.title = to.meta.title || '一车独秀'
  // 滚动条回到头部
  global.scrollTo(0, 0)
})

export default router
