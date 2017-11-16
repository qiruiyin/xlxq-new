<!-- 
	微信授权
 -->

<template>
	<div class="author" v-cloak>
		
	</div>
</template>

<script type="text/babel">
	import hold from 'src/commons/hold'
	
	export default {
		name: 'author',
		data () {
			return {

			}
		},
		mounted () {
			let _this = this,
					urlJson = _this.parseToJson(location.href),
					openId = "",
					paramP = "";

			if(urlJson) {
				openId = urlJson.openId;
				// paramP = urlJson.p;
			}

			alert(openId)
    	_this.getUserDemo(openId, {name: 'index'});
			// if(!openId) {
   //      // 跳转到微信授权页面
   //      // _this.$http.post('/wechat/system/access/generate',{
   //      // _this.$http.post('/wechat/wx/access/generate',{
   //      		// p: paramP
   //      	// }).then(function(e) {
	 	// 			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe1bde9dd199f4966&redirect_uri=http://www.glongcar.com/api/Wx/acceptCode&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect" 

	  // 		// });
	  //   } else {
	  //   	alert(openId);
	  //   	let beforeLoginUrl = JSON.parse(hold.localStorage.get('beforeLoginUrl'));
	  //   	alert(hold.localStorage.get('beforeLoginUrl'));
	  //   	if(beforeLoginUrl) {
	  //   		_this.getUserDemo(openId, {name: beforeLoginUrl.name, query: beforeLoginUrl.query, params: beforeLoginUrl.params});
	  //   	} else {
		 //    	_this.getUserDemo(openId, {name: 'index'});
	  //   	}
	  //   }
		},
		methods: {
			parseToJson (url) {
				if(url != "" && url.indexOf("?") != -1){
					let	url_json = {};
					url = url.replace("#/author", "");
					url = url.split("?");
					url = url[1].split('&');
					for (let i = 0; i<url.length ; i++) {
				    let str = url[i].split('=');
				    url_json[str[0]]=str[1];
					}
					return url_json;
				} else {
					return "";
				}
			},
			getUserDemo (openId, url) {
				let _this = this;
				// alert(this.qs.stringify({
				// 			"openId": openId
				// 		}))
				// this.$http.post('/api/login/judgeWeChatLogin',
				// 		this.qs.stringify({
				// 			"openId": openId
				// 		})
				// 	).then(function(e) {
				_this.$http.post('/api/carInformation/carDetailQuery',
					  this.qs.stringify({
							userId: 1
						})
					).then(function(e) {
						alert(10);
						alert(JSON.stringify(e.data))
						if(e.data.code == 1) {
							// let userId = e.data.data.userId;		
							// hold.storage.set("openId", openId);
							// hold.storage.set("userId", userId);
							// store.commit("updateUserId", { userId: userId });
							// store.commit("updateUserOpenId", { openId: openId });
							alert(url)
							if(url) {
								// router.push(url);
							}	
						} else {
							// router.push({name: 'link'});
							// Vue.$vux.alert.show({
							// 	content: e.data.msg
							// })
						}
					})
			}
		}
	}
</script>