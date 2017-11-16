<!-- 
	下载页面
 -->

<template>
	<div class="download">
		<img src="~assets/img/logo.png" alt="" class="logo">
		<h1>一车独秀</h1>
		<div class="btn-download" @click="goPage">点我下载</div>
	</div>
</template>

<script type="text/babel">
	export default {
		name: "download",
		data () {
			return {

			}
		},
		methods: {
			goPage () {
				// window.location.href = 'http://www.glongcar.com/redirct.html';
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			    window.location.href ="https://itunes.apple.com/cn/app/%E4%BA%AB%E6%9D%A5%E4%BA%AB%E8%B6%A3/id1182680014?mt=8";
				} else if (/(Android)/i.test(navigator.userAgent)) {
			    window.location.href ="http://a.app.qq.com/o/simple.jsp?pkgname=beitai.com.vvz.android.beitaimall";
				} else {
			    window.location.href ="http://sj.qq.com/myapp/detail.htm?apkName=beitai.com.vvz.android.beitaimall";
				};
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.download {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: url("~assets/img/download.png") no-repeat;
		background-size: 100%;
		background-position: bottom;
	}

	.logo {
		width: 130px;
		height: 130px;
		margin: 0 auto;
		margin-top: 30px;
	}

	h1 {
		text-align: center;
	}

	.btn-download {
		line-height: $inputH;
		border: 1px solid $bgYellow;
		margin: 0 12px;
		margin-top: 40px;
		text-align: center;
		font-size: 20px;
		border-radius: 6px;
		display: block;
	}
</style>