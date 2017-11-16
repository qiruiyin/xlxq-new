// 加载效果
import * as types from '../mutation-types'

export default {
  state: {
    isLoading: true
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
}
