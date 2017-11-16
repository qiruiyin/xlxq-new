import * as types from '../mutation-types'

export default {
  state: {
    num: 0, // 购物车数量
    hasAjax: false // 是否来自接口返回
  },
  mutations: {
    updateCartNum (state, payload) {
      state.num = payload.num
    },
    updateCartHasAjax (state, payload) {
    	state.hasAjax = payload.hasAjax
    }
  }
}
