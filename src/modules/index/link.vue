<!-- 
	关联手机号
 -->

<template>
	<div class="login">
		<group>
			<x-input title="手机号" placeholder="请输入手机号" v-model="tel"></x-input>
			<x-input type="password" title="密码" placeholder="请输入密码" v-model="password"></x-input>
		</group>

		<div class="btn" @click="submit">
			<div class="btn-link btn-submit" @click="submit">关联</div>
			<div class="btn-link btn-download" @click="goPage('download')">没有账号，点击下载</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, XInput, XButton } from 'vux'

	export default {
		name: "login",
		components: {
			Group, XInput, XButton 
		},
		data () {
			return {
				tel: "",
				password: ""
			}
		},
		methods: {
			submit () {
				let _this = this;

				if(this.tel.length != 11) {
					this.$vux.alert.show({
						content: "手机号格式不正确"
					})
					return;
				}

				if(this.password == "") {
					this.$vux.alert.show({
						content: "密码不能为空"
					})
					return;
				}

 			 	_this.$store.commit('updateLoadingStatus', {isLoading: true});
				_this.$http.post('/api/user/updateUserOpenId',
					this.qs.stringify({
						openId: this.$store.state.user.openId,
						mobile: this.tel,
						pwd: this.password,
						type: 0 // 0 微信
					})
      	).then(function(e) {
 			 		_this.$store.commit('updateLoadingStatus', {isLoading: false});
      		if(e.data.code == 1) {
		    		let beforeLoginUrl = JSON.parse(hold.localStorage.get('beforeLoginUrl'));
			    	if(beforeLoginUrl) {
			    		_this.getUserCode(openId, {name: beforeLoginUrl.name, query: beforeLoginUrl.query, params: beforeLoginUrl.params});
			    	} else {
				    	_this.getUserCode(openId, {name: 'car'});
			    	}
      		} else {
      			_this.$vux.alert.show({
      				content: e.data.msg
      			});
      		}
      	})
			},
			goPage (url) {
				this.$router.push({ name: url });
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	

	.btn {
		margin-top: 40px;
		padding: 0 $padding;
	}

	.btn-link {
		margin-bottom: 20px;
		line-height: $inputH;
		background: #1AAD19;
		text-align: center;
		border-radius: 6px;
		color: #fff;
		font-size: 20px;

		&.btn-download {
			background: #f4cb00;
		}
	}
</style>