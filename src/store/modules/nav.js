// 是否显示底部菜单
import * as types from '../mutation-types'

export default {
  state: {
    status: true
  },
  mutations: {
    updateNavStatus (state, payload) {
      state.status = payload.status
    }
  }
}
