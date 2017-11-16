import Vue from 'vue'
import router from '../router'
import store from '../store'
import hold from './hold'

import wordBook from './wordBook'

import qs from 'qs'
Vue.prototype.qs = qs

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 获取userCode
Vue.prototype.setRater = (data) => {
	return parseFloat(data.toFixed(1));
};

// 获取userId
// Vue.prototype.getUserCode = (openId,url = "") => {
// 	// loginType: 0 微信
// 	Vue.http.post('/api/login/weChatLogin',
// 			qs.stringify({
// 				"openId": openId,
// 				"loginType": 0,
// 				"userName": ""
// 			})
// 		).then(function(e) {
// 			if(e.data.code == 1) {
// 				let userId = e.data.data.userId;		
// 				hold.storage.set("openId", openId);
// 				hold.storage.set("userId", userId);
// 				store.commit("updateUserId", { userId: userId });
// 				store.commit("updateUserOpenId", { openId: openId });

// 				if(url) {
// 					router.push(url);
// 				}	
// 			} else {
// 				Vue.$vux.alert.show({
// 					content: e.data.msg
// 				})
// 			}
// 	});
// };

// 获取用户信息
Vue.prototype.getUserCode = (openId,url = "") => {
	Vue.http.post('/api/login/judgeWeChatLogin',
			qs.stringify({
				"openId": openId
			})
		).then(function(e) {
			hold.storage.set("openId", openId);
			store.commit("updateUserOpenId", { openId: openId });
			if(e.data.code == 1) {
				let userId = e.data.data.userId;		
				hold.storage.set("userId", userId);
				store.commit("updateUserId", { userId: userId });
				if(url) {
					router.push(url);
				}
			} else {
				router.push({name: 'link'});
			}
		})
}

// 删除数字
Vue.prototype.numToNull = (data) => {
	if(data) {
		return data.replace(/[0-9]*/g, "");
	} else {
		return data;
	}
};

// 名称校验数字和标点符号
Vue.prototype.nameTestNum = (data) => {
	if(/[0-9]/.test(data) || /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/.test(data) ||  /^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/.test(data)) {
		Vue.$vux.toast.text("姓名中不要含有数字、标点或空格");
		return true;
	}
	return false;
};

// 经典语录内容转换
Vue.prototype.quotationTransContent = (value) => {
	if(!value) return value;
	return value.replace(/\n/g, "<br />");
}

// 图片链接拼接
Vue.prototype.resolveImg =  function(img) {
	let imgUrl = Vue.prototype.wordBook.urlLink.img;

	if(!img || img.substr(0, 4) == "http") {
		return img
	} else {
		return imgUrl + img.replace(/\\/g, '/');
	}
}

// 富文本图片链接地址处理
Vue.prototype.resolveRichTextImg = function(text) {
	let textUrl = Vue.prototype.wordBook.urlLink.richText;

	if(!text) return text;
	text = text.replace(/\ssrc=\"http/g, '-CC309AB4-89E6-44D2-9A7C-A8F33F40F3BB-');
	text = text.replace(/\ssrc=\"/g, " src=\""+ textUrl);
	text = text.replace(/\-CC309AB4\-89E6\-44D2\-9A7C\-A8F33F40F3BB\-/g, " src=\"http");
	return text;
}

// 视频链接拼接
Vue.prototype.resolveVideo =  function(video) {
	// let imgUrl = 'http://glyh.qibeisoft.com/';
	let imgUrl = Vue.prototype.wordBook.urlLink.file;
	// let imgUrl = 'http://m.yoao.com/';

	if(!video) {
		return video
	} else {
		return videoUrl + video.replace(/\\/g, '/');
	}
}

// 处理首页通用的字段转换
Vue.prototype.resolveField =  function (_this, $obj, datas, img, link, url = "") {
	// 获取banner数据并处理
	let arr = [];

	if(datas && datas.length > 0) {
		arr = datas.map((item, i) => {
			// let data = "";
			// if(url != "" && item[url]) 
			// data =  item[url].replace("http://test.yoao.com/mobile/wechat/index.html", "http://localhost:9001")

			return {
				img: Vue.prototype.resolveImg(item[img]),
				link: link,
				url: url == "" ? url : item[url],
				name: item.name,
				desc: item.description,
				price: item.price,
				code: item.code
			}
		})
	}

	_this[$obj] = arr;
}

// 判断数组中是否包含指定元素
Vue.prototype.arrContain = function(arr, obj) {
	let status = false;

	if(arr && arr.length > 0) {
		arr.map(function(item, index){
			if(item == obj) {
				status = true
				return
			}
		})
	}
	return status;
}

// 是否登录
Vue.prototype.isLogin = () => {
  if(store.state.user.userCode == '') {
		Vue.$vux.confirm.show({
	    content: '为倡导绿色、安全的网络学习环境，敬请您进行身份证实名认证，认证成功即可获得1000积分！',
	    onCancel () {
	    	return false
	    },
	    onConfirm () {
	      router.push({name: 'bangding'});
	    }
	  });
  } else {
  	return true
	} 
}

// 登陆后页面跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = hold.session.get('beforeLoginUrl')
  if(!url || url.indexOf('/author') != -1){
    router.push('/index')
  } else {
    if(url == '/'){
      url = '/index'
    }
    router.push(url)
    hold.session.set('beforeLoginUrl', '')
  }
}

// 生成随机数
Vue.prototype.createRandom = (ind) => {
  let num = "";

  for(var i = 0; i < ind; i += 1){
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

// 页面路由访问记录
Vue.prototype.visitRouter = (title, url, op) => {
	// op : in 进入 out 离开
  let randomNum = store.state.user.randomNum;
  let locationOrigin = location.href.split("/#/")[0];
	if(!randomNum) {
    randomNum = Vue.prototype.createRandom(16);
    store.commit('updateUserRandomNum', {randomNum: randomNum});
  }
	Vue.http.post('/wechat/discover/addLog',
		{
			"title": title,
			"url": locationOrigin + '/#' + url,
			"randomNum": randomNum,
			"openId": store.state.user.openId,
			"op": op
		}
	).then(function(e) {

	});
}

// 商品访问统计记录
Vue.prototype.visitCount = (code, type = 0) => {
	// viewType 0产品 1头条
	Vue.http.post('/wechat/discover/addProductViewCount',
		{
			"code": code,
			"openId": store.state.user.openId,
			"viewType": type
		}
	).then(function(e) {

	});
}

// 音频视频播放记录
Vue.prototype.playCount = (code) => {
	Vue.http.post('/wechat/discover/addProductPlayCount',
		{
			"code": code,
			"openId": store.state.user.openId
		}
	).then(function(e) {

	});
}



Vue.prototype.invokePay = (data, url) => {
	let weixinConfig = {
			"appId": data.payment.appId,     //公众号名称，由商户传入     
     	"timeStamp": data.payment.timeStamp,         //时间戳，自1970年以来的秒数     
      "nonceStr": data.payment.nonceStr, //随机串     
      "package": data.payment.packageValue,     
      "signType": "MD5",         //微信签名方式：     
      "paySign": data.payment.paySign //微信签名 
		};
	WeixinJSBridge.invoke(
   'getBrandWCPayRequest', weixinConfig,
   function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
     		if(url != "") {
     			router.push(url);
     		} else {
     			router.go(0);
     		}
      } else if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
     		router.go(0);
      } else if(res.err_msg == "get_brand_wcpay_request:fail" ) {
      	// Vue.
      	Vue.$vux.alert.show({
      		content: "调取微信接口失败"
      	})
      } 
       // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
   })
}

// 支付订单
Vue.prototype.payWeixinOrder = (orderCode, url = "", orderType = "4", type = 0) => {
	// orderType : 1 课程 2 音视频 3 奖赏 4 商城
	// type == 1 商业思维多个一起报名

	if(type == 1) {
		Vue.http.post('/wechat/order/pay/enroll/prepare',
			{
				"openId": store.state.user.openId,
				"groupCode": orderCode,
			}).then(function(e) {
				store.commit('updateLoadingStatus', {isLoading: false});
				if(e.data.errcode == 1) {
					Vue.prototype.invokePay(e.data.data, url)
				} else {
					Vue.$vux.alert.show({
						content: e.data.errmsg
					})
				}
		})
	} else {
		Vue.http.post('/wechat/order/pay/prepare',
				{
					"openId": store.state.user.openId,
					"orderCode": orderCode,
				}
			).then(function(e) {
				store.commit('updateLoadingStatus', {isLoading: false});
				if(e.data.errcode == 1) {
					Vue.prototype.invokePay(e.data.data, url)
				} else {
					Vue.$vux.alert.show({
						content: e.data.errmsg
					})
				}
		});
	}
}

// 判断数组中是否包含指定元素
// Vue.prototype.getProductAd = function(productCode) {
// 	Vue.http.post('/wechat/discover/queryRandomLessonInfo',
// 		{
// 			productCode: productCode
// 		}).then(function(e) {
// 			if(e.data.errcode == 1) {
				
// 			} else {
// 				Vue.$vux.alert.show({
// 					content: e.data.errmsg
// 				})
// 			}
// 	})
// }

Vue.prototype.isObjectValueEqual = (a, b) => {
  // Of course, we can do it use for in 
  // Create arrays of property names
  let aProps = Object.getOwnPropertyNames(a),
  		bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}