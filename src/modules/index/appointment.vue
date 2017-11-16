<!-- 
	我的预约
 -->

<template>
	<div class="appointment">
		<scroller lock-x :height="-scrollInfo.offsetBottom + 'px'" @on-scroll-bottom="loadMore" ref="scrollerBottom" :scroll-bottom-offst="200">
			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabData" @click="tabSelected = index" :key="index">
	        	{{ item.name }}
	        </tab-item>
	      </tab>

	      <div v-show="tabSelected == index" v-for="(tabContentDatasList, index) in tabData" :key="index">
					<el-img-text @click.native="goPage(item)" v-for="(item, ind) in tabContentDatasList.list" :key="ind" :img-text-data="item"></el-img-text>
					<el-load-more :load-all="tabContentDatasList.loadAll"></el-load-more>
	      </div>
	    </div>
		</scroller>
	</div>
</template>

<script type="text/babel">
	import { Scroller, Tab, TabItem } from 'vux'
	import elImgText from 'components/img-text/img-text'
	import elLoadMore from 'components/load-more/load-more'

	export default {
		name: "appointment",
		components: {
		  Scroller, Tab, TabItem, elImgText, elLoadMore
		},
		data () {
			return {
				tabSelected: 0,
				scrollInfo: {
					offsetBottom: 60,
				},
				tabData: [
					{
						name: "已付款",
						onFetching: false,
						loadAll: false,
						orderState: 2,
						pageSize: this.wordBook.pageCount,
						pageNo: 1,
						list: []
					},{
						name: "未付款",
						onFetching: false,
						loadAll: false,
						orderState: 1,
						pageSize: this.wordBook.pageCount,
						pageNo: 1,
						list: []
					}
				],
				tabSelected: 0
			}
		},
		watch: {
			tabSelected (newValue, oldValue) {
				this.onTabClick()
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.tabData[_this.tabSelected].onFetching = true;		
				_this.$http.post('/api/order/historyOrder',
					  _this.qs.stringify({
							userId: _this.$store.state.user.userId,
							pageSize: _this.tabData[_this.tabSelected].pageSize,
							pageNo: _this.tabData[_this.tabSelected].pageNo,
							orderState: _this.tabData[_this.tabSelected].orderState
						})
					).then(function(e) {
						if(e.data.code == 1) {
							let list = [];
							if(e.data.data && e.data.data.length > 0) {
								list = e.data.data.map(function(item, index){
									let img = item.facadePhotoUrl.split(",")[0];
									return {
										id: item.orderId,
										code: item.orderCode,
										img: img,
										name: item.address,
										content: item.carName,
										carType: item.storeName,
										sum: item.totalMoney,
										time: item.orderDate + " " + item.endTime
									}
								})
							}

							if(list.length < _this.tabData[_this.tabSelected].pageSize) {
								_this.tabData[_this.tabSelected].loadAll = true;
							}

							if(_this.tabData[_this.tabSelected].pageNo == 1) {
								_this.tabData[_this.tabSelected].list = list;
							} else {
								_this.tabData[_this.tabSelected].list = _this.tabData[_this.tabSelected].list.concat(list);
							}
							_this.tabData[_this.tabSelected].pageNo++;

						} else {
							_this.$vux.alert.show({
								content: e.data.msg
							})
						}

						_this.resetView();
						_this.tabData[_this.tabSelected].onFetching = false;		
				});
			},
			resetView () {
				let _this = this;
				this.$nextTick(() => {
          this.$refs.scrollerBottom.reset()
        })
			},
			onTabClick () {
				let _this = this;

				if(this.tabData[_this.tabSelected].list.length == 0){
					this.fetchData()
				}
			},
			loadMore () {
				let _this = this;
				if(this.tabData[_this.tabSelected].onFetching || this.tabData[_this.tabSelected].loadAll) {

				} else {
	        this.tabData[_this.tabSelected].onFetching = true;
					this.fetchData()
				}
			},
			goPage (data) {
				this.$router.push({ name: 'appointmentDetail', query: { orderId: data.id } })
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
</style>