// 消息增加过渡后记录上一个页面
import * as types from '../mutation-types'

export default {
  state: {
    name: "",
    userCode: "",
    openId: "",
    url: ''
  },
  mutations: {
    updateMsgName (state, payload) {
      state.name = payload.name
    },
    updateMsgUserCode (state, payload) {
      state.userCode = payload.userCode
    },
    updateMsgOpenId (state, payload) {
      state.openId = payload.openId
    },
    updateMsgUrl (state, payload) {
      state.url = payload.url
    }
  }
}
