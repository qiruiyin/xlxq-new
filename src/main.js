// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import myFilter from './filter'
import wordBook from './commons/wordBook'
import hold from 'src/commons/hold'

import qs from 'qs'

Vue.prototype.qs = qs

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

import commonFun from './commons'
// 微信签名
import weixinFun from './commons/weixin.js'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

// 微信
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

// Vue.http.defaults.timeout = 10000;                        //响应时间
Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';           //配置请求头
// Vue.http.defaults.baseURL = '';

// 清楚缓存
// window.localStorage.clear()


// 自己（未注册） ormObwzZ5-kjRzJZ36HQ_yAVLecc
// window.sessionStorage.setItem("openId", "ormObwz11Z5-kjRzJZ36HQ_yAVLecc");

// // // 春平
// window.sessionStorage.setItem("openId", "o1bsY1QpKs5hBGxbdQCga_87RExM");

// 点击延迟
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
