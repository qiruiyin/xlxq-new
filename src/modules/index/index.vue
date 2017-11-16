<!-- 
	首页
 -->

<template>
	<div class="index" v-cloak>
		<div class="list" @click="goPage(item)" v-for="(item, index) in list" :key="index">{{ item.name }}</div>
	</div>
</template>

<script type="text/babel">
	import hold from 'src/commons/hold'

	export default {
		name: 'index',
	  data () {
	    return {
	    	list: [
	    		{
	    			name: "我的预约",
	    			value: "appointment"
	    		},{
	    			name: "我的爱车",
	    			value: "car"
	    		},{
	    			name: "我的车库",
	    			value: "carport"
	    		},{
	    			name: "我的收益",
	    			value: "profit"
	    		},{
	    			name: "下载页面",
	    			value: "download"
	    		}
	    	]
	    }
	  },
	  mounted () {
	  	// this.fetchData();
	  },
	  methods: {
	  	goPage (obj) {
	  		this.$router.push({ name: obj.value })
	  	},
	  	fetchData	() {
	  		let _this = this;
	  	
	  		_this.$http.post('/api/meeting/detail',
						this.qs.stringify({
							meetingId: 9
						})
					).then(function(e) {
				});
	  	}
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.list {
		width: 80%;
		line-height: 44px;
		margin: 10px auto;
		text-align: center;
		border: 1px solid red;
		border-radius: 10px;
		display: block;
	}
</style>