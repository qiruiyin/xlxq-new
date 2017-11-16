<!-- 
	图文混排
 -->

<template>
	<div class="img-text-all">
		<h5>订单号： {{ imgTextData.code }}</h5>
		<div class="img-text">
			<div class="img-text-img" :style="{backgroundImage: 'url(' + imgTextData.img + ')'}">		
				<!-- <img :src="imgTextData.img" alt=""> -->
			</div>
			<div class="img-text-text">
				<div class="title">{{ imgTextData.name }}</div>
				<p>{{ imgTextData.content }}</p>
				<p>{{ imgTextData.carType }}</p>
				<p>总额：￥{{ imgTextData.sum }}<span>预约时间：{{ imgTextData.time }}</span></p>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		name: "elImgText",
		props: ['imgTextData'],
		data () {
			return {
				imgText: {
					// code: "",
					// name: "美车堂（港汇店）",
					// content: "洗车",
					// carType: "宝马X5 3.0L 2007",
					// sum: "40",
					// time: "2017/04/05 17:00-18:00"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.img-text-all {
		h5 {
			padding: 0 $padding;
			line-height: 44px;
		}
	}
	.img-text {
		padding: 0 $padding 10px;
	}
</style>