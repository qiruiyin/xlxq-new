<!-- 
	我的收益
 -->

<template>
	<div class="myprofit">
		<scroller lock-x :height="-scrollInfo.offsetBottom + 'px'" @on-scroll-bottom="loadMore" ref="scrollerBottom" :scroll-bottom-offst="200">
			<div class="myprofit-content">			
				<div class="profit-sum">
					<p>累计收益<span>￥{{ profitData.sum || 0 }}</span></p>
				</div>

				<div class="profit-lists">
					<div class="profit-list" v-for="(item, index) in profitData.list" :key="index">
						<p v-if="item.type == 1">您的享友<span>{{ item.name }}</span>在<span>{{ item.address }}</span>洗车，消费<span>{{ item.price }}元</span>，您获得<span>{{ item.profit }}元</span>收益。</p>
						<p v-else>您的车<span>{{ item.name }}</span>出租订单已完成，您获得租金<span>{{ item.profit }}</span>元</p>
						<div class="date">{{ item.time }}</div>
					</div>
					<el-load-more :load-all="profitData.loadAll"></el-load-more>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script type="text/babel">
	import { Scroller } from 'vux'
	import elLoadMore from 'components/load-more/load-more'

	export default {
		name: "profit",
		components: {
		  Scroller, elLoadMore
		},
		data () {
			return {
				scrollInfo: {
					offsetBottom: 1,
				},
				profitData: {
					sum: "20",
					pageSize: this.wordBook.pageCount,
					pageNo: 1,
					onFetching: false,
					loadAll: false,
					list: [
						// {
						// 	name: "",
						// 	address: "",
						// 	service: "",
						// 	price: "",
						// 	profit: "",
						// 	time: "",
						// 	type: ""
						// }
					]
				}
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.fetchSum();
				this.fetchList();
			},
			fetchSum () {
				let _this = this;
				_this.$http.post('/api/earnings/addUpEarnings',
					  _this.qs.stringify({
							userId: _this.$store.state.user.userId
						})
					).then(function(e) {
						if(e.data.code == 1){
							_this.profitData.sum = e.data.data.earnings;
						} else {
							_this.$vux.alert.show({
								content: e.data.msg
							})
						}
					})
			},
			fetchList () {
				let _this = this;
        this.profitData.onFetching = true;
				_this.$http.post('/api/earnings/shareMakeMoney',
					  _this.qs.stringify({
							userId: _this.$store.state.user.userId,
							pageSize: _this.profitData.pageSize,
							pageNo: _this.profitData.pageNo,
						})
					).then(function(e) {
						if(e.data.code == 1) {
							let list = [];
							if(e.data.data && e.data.data.length > 0) {
								list = e.data.data.map(function(item, index){
									return {
										id: item.id,
										name: item.earningsObject,
										address: item.merchantName,
										service: "",
										price: item.expenseAmount,
										profit: item.earningsAmount,
										time: item.earningsTime,
										type: item.type
									}
								})
							}

							if(list.length < _this.profitData.pageSize) {
								_this.profitData.loadAll = true;
							}
							
							if(_this.profitData.pageNo == 1){
								_this.profitData.list = list;
							} else {
								_this.profitData.list = _this.profitData.list.concat(list);
							}

							_this.profitData.pageNo++;
						} else {
							_this.$vux.alert.show({
								content: e.data.msg
							})
						}
	        	_this.profitData.onFetching = false;
					})
			},
			resetView () {
				let _this = this;
				this.$nextTick(() => {
          this.$refs.scrollerBottom.reset()
        })
			},
			loadMore () {
				let _this = this;
				if(this.profitData.onFetching || this.profitData.loadAll) {

				} else {
	        this.profitData.onFetching = true;
					this.fetchList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.myprofit-content {
		padding-top: $marginBottom;
	}

	.profit-sum {
		width: 130px;
		height: 130px;
		margin: 0 auto;
		margin-bottom: $marginBottom;
		@include halfpxline(100%);
		border-radius: 130px;
		text-align: center;

		p {
			padding: 40px 0;

			span {
				margin-top: 6px;
				font-weight: bolder;
				display: block;
			}
		}
	}

	.profit-lists {

	}

	.profit-list {
		@include halfpxline(0, $borderColor, 1px , 0, 0, 0);
		padding: 10px $padding;

		&:last-child {
			@include halfpxline(0, $borderColor, 1px , 0, 1px, 0);
		}
		
		p {
			text-indent: 2em;
			text-align: justify;
			line-height: 1.75;

			span {
				padding: 0 10px;
				font-weight: bolder;
				font-size: 18px;
			}
		}

		.date {
			text-align: right;
		}
	}
</style>