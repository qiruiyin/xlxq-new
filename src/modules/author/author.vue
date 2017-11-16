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

			if(!openId) {
        // 跳转到微信授权页面
        // _this.$http.post('/wechat/system/access/generate',{
        // _this.$http.post('/wechat/wx/access/generate',{
        		// p: paramP
        	// }).then(function(e) {
	 				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe1bde9dd199f4966&redirect_uri=http://jk.glongcar.com/api/Wx/acceptCode&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect" 

	  		// });
	    } else {
	    	let beforeLoginUrl = JSON.parse(hold.localStorage.get('beforeLoginUrl'));
	    	if(beforeLoginUrl) {
	    		_this.getUserCode(openId, {name: beforeLoginUrl.name, query: beforeLoginUrl.query, params: beforeLoginUrl.params});
	    	} else {
		    	_this.getUserCode(openId, {name: 'car'});
	    	}
	    }
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
			}
		}
	}
</script>