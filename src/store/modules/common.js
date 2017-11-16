import * as types from '../mutation-types'

export default {
  state: {
    imgUrl: 'http://192.168.1.170:8080/csm/'
  },
  mutations: {
    updateImgUrl (state, payload) {
      state.imgUrl = payload.imgUrl
    }
  }
}
