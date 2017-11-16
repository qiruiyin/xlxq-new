// 页面切换
import * as types from '../mutation-types'

export default {
  state: {
    direction: 'forword'
  },
  mutations: {
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
}
