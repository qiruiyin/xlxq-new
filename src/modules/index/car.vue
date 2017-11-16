<!-- 
	我的车库
 -->

<template>
	<div class="car">
		<swiper v-model="tabSelected" height="100%" :show-dots="false" :threshold="tabChangeW">
			<swiper-item v-for="(item, index) in carInfo" :key="index">
	 			<div class="car-content">
					<header>
						<div class="car-info">
							<div class="car-info-img" :style="{backgroundImage: 'url(' + item.carLogo + ')'}">		
							</div>
							<div class="car-info-content">
								<p>{{ item.carName }}</p>
								<p>{{ item.carSpce }}</p>
							</div>
						</div>
					</header>
					
					<div class="card" v-show="item.breakRules">
						<div class="card-header">违章记录</div>
						<div class="card-body">
							<div class="illegal" v-for="(illItem, illIndex) in item.breakRules" :key="illIndex">
								<div class="illegal-body">{{ illItem.reason }}</div>
								<div class="illegal-footer">
									<p>{{ illItem.address }}<span>{{ illItem.time }}</span></p>
								</div>
							</div>
						</div>
					</div>

					<div class="card">
						<div class="card-header">爱车详情</div>
						<div class="card-body">
							<ul class="xlxq-ul car-detail">
								<li>
									<label>车牌号码</label>
									<p>{{ item.carNo }}</p>
								</li>
								<li>
									<label>发动机号</label>
									<p>{{ item.carEngine }}</p>
								</li>
								<li>
									<label>车架号</label>
									<p>{{ item.carFrame }}</p>
								</li>
								<li>
									<label>行驶里程数</label>
									<p>{{ item.strokeCount }}</p>
								</li>
								<li>
									<label>日均里程数</label>
									<p>{{ item.dailyMileage }}</p>
								</li>
								<li>
									<label>上次洗车时间</label>
									<p>{{ item.carWashTime }}</p>
								</li>
								<li>
									<label>机油品牌</label>
									<p>{{ item.oilBrand }}</p>
								</li>
								<li>
									<label>上一次机油更换里程</label>
									<p>{{ item.oilMileage	 }}</p>
								</li>
								<li>
									<label>前轮轮胎规格</label>
									<p>{{ item.frontTireSpec }}</p>
								</li>
								<li>
									<label>后轮轮胎规格</label>
									<p>{{ item.backTireSpec }}</p>
								</li>
								<li>
									<label>左前轮胎</label>
									<div>
										<p><span>品牌</span>{{ item.tireBrandLF }}</p>
										<p><span>上一轮更换轮胎时间</span>{{ item.leftFrontTime	 }}</p>
									</div>
								</li>
								<li>
									<label>右前轮胎</label>
									<div>
										<p><span>品牌</span>{{ item.tireBrandRF }}</p>
										<p><span>上一轮更换轮胎时间</span>{{ item.rightFrontTime }}</p>
									</div>
								</li>
								<li>
									<label>左后轮胎</label>
									<div>
										<p><span>品牌</span>{{ item.tireBrandLR }}</p>
										<p><span>上一轮更换轮胎时间</span>{{ item.leftBackTime }}</p>
									</div>
								</li>
								<li>
									<label>右后轮胎</label>
									<div>
										<p><span>品牌</span>{{ item.tireBrandRR }}</p>					
										<p><span>上一轮更换轮胎时间</span>{{ item.rightBackTime }}</p>
									</div>
								</li>
								<li>
									<label>刹车片品牌</label>
									<p>{{ item.brakePadBrand }}</p>
								</li>
								<li>
									<label>刹车片更换里程</label>
									<p>{{ item.brakePadsMileage }}</p>
								</li>
								<li>
									<label>刹车油上次更换里程</label>
									<p>{{ item.brakeOilMileage }}</p>
								</li>
								<li>
									<label>防冻液品牌</label>
									<p>{{ item.antifreezeBrand }}</p>
								</li>
								<li>
									<label>防冻液更换时间</label>
									<p>111{{ item.antifreezeTime }}</p>
								</li>
								<li>
									<label>变速箱油更换里程</label>
									<p>{{ item.transmissionOilMileage }}</p>
								</li>
								<li>
									<label>滤清器品牌</label>
									<p>{{ item.filterBrand }}</p>
								</li>
								<li>
									<label>滤清器更换里程</label>
									<div>
										<p><span>机滤</span>{{ item.filterMileage }}</p>
										<p><span>空滤</span>{{ item.airMileage }}</p>
										<p><span>燃油滤清</span>{{ item.fuelFilterMileage }}</p>
										<p><span>空调滤清</span>{{ item.airConditioningMileage }}</p>
									</div>
								</li>
								<li>
									<label>保险日期</label>
									<p>{{ item.insuranceTime }}</p>
								</li>
								<li>
									<label>保险公司名称</label>
									<p>{{ item.insuranceName }}</p>
								</li>
								<li>
									<label>登记时间</label>
									<p>{{ item.registrationTime }}</p>
								</li>
								<li>
									<label>年检日期</label>
									<p>{{ item.inspectionDate }}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</swiper-item>
		</swiper>
		<div class="my-carport" @click="goPage({name: 'carport'})">我的车库</div>
	</div>
</template>

<script type="text/babel">
	import { Swiper, SwiperItem }  from 'vux'
	import elImgText from 'components/img-text/img-text'

	export default {
		name: "car",
		components: {
			Swiper, SwiperItem, elImgText
		},
		data () {
			return {
				carLogo: "",
				tabSelected: 0,
				tabChangeW: this.wordBook.tabChangeW,
				carInfo: [
					// {
					// 	carName: "", // 车名
					// 	carSpce: "", // 车品牌车系年份
					// 	breakRules: [], // 违章
					// 	carNo: "", // 车牌号码
					// 	carEngine: "", // 发动机号
					// 	carFrame: "", // 车架号
					// 	strokeCount: "", // 行驶里程数
					// 	dailyMileage: "", // 日均里程数
					// 	carWashTime: "", // 上一次洗车时间
					// 	oilBrand: "", // 机油品牌
					// 	oilMileage: "", // 上一次机机油更换里程
					// 	frontTireSpec: "", // 前轮轮胎规格
					// 	backTireSpec: "", // 后轮轮胎规格
					// 	tireBrandLF: "", // 跟换轮胎的品牌-左前轮胎
					// 	leftFrontTime: "", // 上次更换轮胎时间-右前轮胎
					// 	tireBrandRF: "", // 跟换轮胎的品牌-右前轮胎
					// 	RightFrontTime: "", // 上次更换轮胎时间-左前轮胎
					// 	tireBrandLR: "", // 跟换轮胎的品牌-左后轮胎
					// 	leftBackTime: "", // 上次更换轮胎时间-左后轮胎
					// 	tireBrandRR: "", // 跟换轮胎的品牌-右后轮胎
					// 	rightBackTime: "", // 上次更换轮胎时间-右后轮胎
					// 	brakePadBrand: "", // 刹车片品牌
					// 	brakePadsMileage: "", // 刹车片更换里程
					// 	antifreezeBrand: "", // 防冻液品牌
					// 	antifreezeTime: "", // 防冻液更换时间
					// 	transmissionOilMileage: "", // 变速箱油更换里程
					// 	filterBrand: "", // 滤清器品牌
					// 	filterMileage: "", // 滤清器更换里程-机滤
					// 	airMileage: "", // 滤清器更换里程-空滤
					// 	fuelFilterMileage: "", // 滤清器更换里程-燃油滤清
					// 	airConditioningMileage: "", // 滤清器更换里程-空调滤清
					// 	insuranceTime: "", // 保险日期
					// 	insuranceName: "", // 保险公司名称
					// 	registrationTime: "", // 登记时间
					// }
				]
			}
		},
		mounted () {
	  	this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;

	  		_this.$http.post('/api/carInformation/carDetailQuery',
					  this.qs.stringify({
							userId: this.$store.state.user.userId
						})
					).then(function(e) {
						if(e.data.code == 1) {
							let carInfo = [],
									breakRules = [];

							_this.carInfo = e.data.data;
						} else {
							_this.$vux.alert.show({
								content: e.data.msg
							})
						}
				});
			},
			goPage (url) {
				this.$router.push(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	$imgTextImgWidth: 80px;
	$imgTextTextSpanFont: 14px;
	$imgTextTextSpanFontColor: $fontColorGray;

	$tabBorderColor: $borderColor;
	$tabHeaderHeight: 44px;
	$tabTitleActiveBg: $bg;

	.car {
		position: absolute;
		width: 100%;
		height: 100%;

		.vux-slider {
			height: 100%;
		}
	}

	.car-info {
		padding: 0 $padding;
		display: flex;

		.car-info-img {
			width: $imgTextImgWidth;
			height: $imgTextImgWidth;
			background-size: cover;
			background-position: center;
		}

		.car-info-content {
			padding: $padding 0 $padding .5em;
			flex: 1;
			line-height: $imgTextImgWidth/2 - $padding;

			p {
				&:last-child {
					line-height: 2;
					font-size: 12px;
					color: $fontColorTips;
				}
			}
		}
	}

	.car-content {
		height: 100%;
		overflow: auto;
	}

	.illegal {
		@include halfpxline(0, $borderColor, 0, 0, 1px, 0);
		padding: 10px $padding;
		line-height: 1.75;
	}

	.illegal-body {

	}

	.illegal-footer {
		p {
			text-align: justify;
			word-break: break-word;
			@extend %clearfix;
			
			span {
				float: right;
				text-indent: 1em;
			}
		}
	}

	.car-detail {
		li {
			@include halfpxline(0, $borderColor, 0, 0, 1px, 0);
			padding: 10px $padding;
			line-height: 1.75;
			display: flex;

			& > label {
				display: block;
			}

			p {
				text-indent: 1em;

				&:first-child {
					display: inline-block;
				}
			}

			p {
				span {
					padding-right: 1em;
				}
			}
		}
	}

	.my-carport {
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		max-width: $maxW;
		height: 50px;
		margin: 0 auto;
		line-height: 50px;
		background-color: $bgYellow;
		text-align: center;
		color: $fontColorBlack;
		letter-spacing: .5em;
	  	cursor: pointer;
		z-index: 8;
	}
</style>