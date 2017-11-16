// 用户信息存储
import * as types from '../mutation-types'

export default {
  state: {
    userId: '1',
    img: '',
    name: '',
    course: '',
    userCode: '',
    level: '',
    openId: '',
    btns: [],
    bangdingStatus: false,
    qrcode: "",
    hasMsg: '',
    pay: false, // 是否可支付
    shareImg: "", // 分享二维码
    randomNum: '' // 访问记录随机数
  },
  mutations: {
    updateUserId (state, payload) {
      state.userId = payload.userId
    },
    updateUserImg (state, payload) {
      state.img = payload.img
    },
    updateUserName (state, payload) {
      state.name = payload.name
    },
    updateUserCourse (state, payload) {
      state.course = payload.course
    },
    updateUserUserCode (state, payload) {
      state.userCode = payload.userCode
    },
    updateUserLevel (state, payload) {
      state.level = payload.level
    },
    updateUserOpenId (state, payload) {
      state.openId = payload.openId
    },
    updateUserBtns (state, payload) {
      state.btns = payload.btns
    },
    updateUserBangdingStatus (state, payload) {
      state.bangdingStatus = payload.bangdingStatus
    },
    updateUserQrcode (state, payload) {
      state.qrcode = payload.qrcode
    },
    updateUserPay (state, payload) {
      state.pay = payload.pay
    },
    updateUserHasMsg (state, payload) {
      state.hasMsg = payload.hasMsg
    },
    updateUserShareImg (state, payload) {
      state.shareImg = payload.shareImg
    },
    updateUserRandomNum (state, payload) {
      state.randomNum = payload.randomNum
    }
  }
}
