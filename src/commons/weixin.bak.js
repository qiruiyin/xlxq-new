/**
 * 微信接口
 */
function signUrl() {
	$.ajax({
		type : "POST",
		url : "http://test.yoao.com/system/weixin/getSign.json",
		dataType : "json",
		data:{url : location.href},
		success : function(data) {
			// if(data.status != 0){
			// 	return false;
			// }
			// wx.config({
			// 	debug : false,
			// 	appId : data.signature.appId,
			// 	timestamp : data.signature.timestamp,
			// 	nonceStr : data.signature.nonceStr,
			// 	signature : data.signature.signature,
			// 	jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'closeWindow' ]
			// });
			
			// wx.ready(function() {
			// 	wx.checkJsApi({
			// 		jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'closeWindow' ]
			// 	});
			// });
			
			// showTopMenu(false);
			
			// wx.error(function(res) {
			// 	if(res.err_msg){
			// 		alert(res.err_msg);
			// 	}
			// });
		}
	});
}

signUrl();

function openShare(baseUrl, title, desc, openId, imgUrl) {
	if(!openId || openId == null || openId == ''){
		toastr.error("分享码未取到,不能分享!");
		return false;
	}
	//toastr.info("正在获取分享二维码,请稍后...");
	$.ajax({
		type : "POST",
		url : basePath+"system/weixin/getQrcode.json",
		dataType : "json",
		data:{openId:openId},
		success : function(qrcodePath) {
			if(qrcodePath && qrcodePath != null && qrcodePath.length > 0){
				$("#share-tip").show();
				setShareProductUrl(title, desc, baseUrl+qrcodePath, baseUrl+imgUrl);
			} else {
				toastr.error("二维码获取失败,请稍后再试!");
			}
		}
	})
}

function setShareProductUrl(title, desc, promoteUrl, imgUrl) {
	toastr.info("正在打开分享菜单,请稍后...");
	showTopMenu(true);
	
	weChatMoments(title, desc, promoteUrl, imgUrl);
	weChatFriend(title, desc, promoteUrl, imgUrl);
	tencentQFriend(title, desc, promoteUrl, imgUrl);
	tencentWeiBo(title, desc, promoteUrl, imgUrl);
}

function showTopMenu(status){
	if(status){
		wx.hideAllNonBaseMenuItem();
		wx.showMenuItems({
			menuList: ['menuItem:refresh','menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite']
		});
		wx.showOptionMenu();
	} else{
		wx.hideOptionMenu();
	}
}

// 分享到微信朋友圈
function weChatMoments(title, desc, promoteUrl, imgUrl) {
	wx.onMenuShareTimeline({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到微信好友
function weChatFriend(title, desc, promoteUrl, imgUrl) {
	wx.onMenuShareAppMessage({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到qq好友
function tencentQFriend(title, desc, promoteUrl, imgUrl) {
	wx.onMenuShareQQ({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到腾讯微博
function tencentWeiBo(title, desc, promoteUrl, imgUrl) {
	wx.onMenuShareWeibo({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}