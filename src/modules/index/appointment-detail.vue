<!-- 
	预约详情
 -->

<template>
	<div class="appointment-detail">
		<group>
			<cell title="日期" :value="appData.date"></cell>
			<cell title="时间" :value="appData.time"></cell>
			<cell title="爱车" :value="appData.car"></cell>
			<cell title="服务"></cell>
			<cell :title="appData.service.name">
				<div class="service-info" slot="after-title"><span>{{ appData.service.brand }}</span>￥{{ appData.service.price }}</div>
			</cell>
			<cell title="" :value="appData.sum"></cell>
			<cell title="券减" :value="appData.minus"></cell>
			<cell title="" :value="appData.real"></cell>
		</group>
	</div>
</template>

<script type="text/babel">
	import { Cell, CellBox, CellFormPreview, Group } from 'vux'

	export default {
		name: "productDetail",
		components: {
			Cell, CellBox, CellFormPreview, Group
		},
		data () {
			return {
				appData: {
					date: "",
					time: "",
					car: "",
					service: {
						name: "",
						brand: "",
						price: ""
					},
					sum: "",
					minus: "",
					real: ""
				}
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.$http.post('/api/order/orderDetailQuery',
					  this.qs.stringify({
							orderId: this.$route.query.orderId
						})
					).then(function(e) {
						if(e.data.code == 1) {
							let obj = e.data.data;

							_this.appData = {
								date: obj.orderDate,
								time: obj.startTime + "-" + obj.endTime,
								car: obj.carName,
								service: {
									name: obj.service[0].services,
									brand: obj.service[0].brand,
									price: obj.service[0].privilegePrice || obj.service[0].price
								},
								sum: obj.totalMoney,
								minus: obj.discountPrice || 0,
								real: obj.payPrice || 0
							}
						} else {
							_this.$vux.alert.show({
								content: e.data.msg
							})
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.service-info {
		position: absolute;
		top: 50%;
		right: $padding;
		margin-top: -10px;
		
		span {
			margin-right: 2em;
		}
	}
</style>