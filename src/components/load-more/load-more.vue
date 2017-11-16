<!-- 
	加载更多辅助
 -->

<template>
	<div class="load-more" v-cloak>
		<template v-if="!loadAll">
      <load-more tip="loading"></load-more>
		</template>
		<template v-else>
			<divider>没有更多数据</divider>
		</template>
	</div>
</template>

<script type="text/babel">
	import { LoadMore, Divider} from 'vux'

	export default {
		name: "elLoadMore",
		components: { LoadMore, Divider },
		props: ['loadAll'],
		data () {
			return {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.load-more {
		display: block;
	}
</style>

