import Vue from 'vue'
import store from '../store'
import wordBook from './wordBook'
import hold from './hold'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

// 分享到微信朋友圈
let weChatMoments = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareTimeline({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到微信好友
let weChatFriend = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareAppMessage({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {},
    fail: function (res) {
      alert(JSON.stringify(res));
    }
	});
}

// 分享到qq好友
let tencentQFriend = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareQQ({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到腾讯微博
let tencentWeiBo = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareWeibo({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}


let setShareProductUrl = (title, desc, promoteUrl, imgUrl) => {
	// showTopMenu(true);
	weChatMoments(title, desc, promoteUrl, imgUrl);
	weChatFriend(title, desc, promoteUrl, imgUrl);
	tencentQFriend(title, desc, promoteUrl, imgUrl);
	tencentWeiBo(title, desc, promoteUrl, imgUrl);
}

let showTopMenu = (status) => {
	if(status){
		Vue.wechat.hideAllNonBaseMenuItem();
		Vue.wechat.showMenuItems({
			menuList: ['menuItem:refresh','menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite']
		});
		Vue.wechat.showOptionMenu();
	} else{
		Vue.wechat.hideOptionMenu();
	}
}

// 微信分享
Vue.prototype.openShare = (baseUrl, title, desc, openId, imgUrl, status = false) => {
	if(!openId || openId == null || openId == ''){
		// toastr.error("分享码未取到,不能分享!");
		return false;
	}
	//toastr.info("正在获取分享二维码,请稍后...");
	Vue.http.post("/wechat/wx/qrcode/create",{openId:openId}).then(function(e) {
		let qrcodePath = e.data.data.qrcodePath || '1';
		if(qrcodePath && qrcodePath != null && qrcodePath.length > 0){
			// $("#share-tip").show();
			store.commit("updateUserQrcode", { 'qrcode': baseUrl+qrcodePath + "?time=" + Date.parse(new Date())})

			if(status) {
				Vue.prototype.signUrl(location.href, true, { url: baseUrl+qrcodePath, imgUrl: 'http://m.yoao.com/mobile/wechat/logo.jpg' });
			} else {
				setShareProductUrl(title, desc, baseUrl+qrcodePath, 'http://m.yoao.com/mobile/wechat/logo.jpg');
				Vue.wechat.hideOptionMenu();
				Vue.wechat.hideAllNonBaseMenuItem();
			}
		} else {
			// toastr.error("二维码获取失败,请稍后再试!");
			// Vue.vux.toast.text('二维码获取失败,请稍后再试!', 'top')
		}
	});
}

// 微信签名
Vue.prototype.signUrl = (url, status = false, obj = {}) => {
	store.commit("updateUserPay", { 'pay': false})
	// store.
  Vue.http.post("/wechat/wx/sign/url",{url: url}).then(function(e) {
  	let data = e.data.data.signature;
  	
  	if(data.status != 0){
			return false;
		}

		store.commit("updateUserPay", { 'pay': true});

		Vue.wechat.config({
			debug : false,
			appId : data.signature.appId,
			timestamp : data.signature.timestamp,
			nonceStr : data.signature.nonceStr,
			signature : data.signature.signature,
			jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'closeWindow' ]
		});
		Vue.wechat.ready(function() {
			Vue.wechat.checkJsApi({
				jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'closeWindow' ]
			});

			if(status) {
				setShareProductUrl("富班长商学院", '海量"企业"管理与"行业资料"任你下载，大量"培训视频"与"商业思维"随你观看！', obj.url, obj.imgUrl);
				Vue.wechat.hideOptionMenu();
				Vue.wechat.hideAllNonBaseMenuItem();
			}
		});
		
		Vue.wechat.error(function(res) {
			if(res.err_msg){
				alert(res.err_msg);
			}
		});

		if(!status) {
			Vue.prototype.openShare(Vue.prototype.wordBook.urlLink.share, "富班长商学院", '海量"企业"管理与"行业资料"任你下载，大量"培训视频"与"商业思维"随你观看！', hold.storage.getItem("openId"), "", status);
		} else {
			store.commit("updateUserShareImg", { 'shareImg': obj.url + "?time=" + Date.parse(new Date())})
		}
  });
}


