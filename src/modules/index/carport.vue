<!-- 
	我的车库
 -->

<template>
	<div class="carport">
		<div class="img-text" @click="goPage" v-for="(item, index) in carportData" :key="index">
			<div class="img-text-img" :style="{backgroundImage: 'url(' + item.img + ')'}">		
				
			</div>
			<div v-show="item.carName" class="img-text-text">
				<p>{{ item.carName }}
					<span>{{ item.carSpce }}</span>
				</p>
				<div @click="setDefault(item.status, item.id)" :class=" item.status == 1 ? 'img-text-status':'img-text-btn'">{{ item.status == 1 ? '默认' : '设为默认' }}</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		name: "carport",
		data () {
			return {
				carportData: [
					{
						code: "",
						carName: "",
						carSpce: "",
						status: false
					}
				]
			}	
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;

	  		_this.$http.post('/api/carInformation/userCarQuery',
					  this.qs.stringify({
							userId: this.$store.state.user.userId
						})
					).then(function(e) {
						if(e.data.code == 1) {
							let carportData = [];

							if(e.data.data && e.data.data.length > 0) {
								carportData = e.data.data.map(function(item, index){
									return {
										id: item.carId,
										img: item.carLogo,
										carName: item.carName,
										carSpce: item.carSpce,
										status: item.carState
									}
								})
							}

							_this.carportData = carportData;
						} else {
							_this.$vux.alert.show({
								content: e.data.msg
							})
						}
				});
			},
			setDefault (status, carId) {
				if(status == 1) return;
				let _this = this;
				_this.$store.commit('updateLoadingStatus', {isLoading: true});
				_this.$http.post('/api/carInformation/modifyDefault',
					  this.qs.stringify({
							carId: carId
						})
					).then(function(e) {
						_this.$store.commit('updateLoadingStatus', {isLoading: false});
						if(e.data.code == 1) {
							_this.$vux.alert.show({
								content: e.data.msg,
								onHide () {
									_this.fetchData();
								}
							})
						} else {
							_this.$vux.alert.show({
								content: e.data.msg
							})
						}
					})
			},
			goPage () {
				this.$router.push({name: "car"})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.img-text-img {
		width: 60px;
		height: 60px;
	}

	.img-text-btn {
		background: $bgYellow;
	}
</style>