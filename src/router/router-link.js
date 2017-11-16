// 路由到path

import loadView from './async-view-loader'

const routes = [
	{
		path: '*',
		redirect: '/car' 
	// },{
	// 	path: '/index',
	// 	name: 'index',
	// 	component:  loadView(loaded => {
	// 		require(['../modules/index/index.vue'], loaded)
	// 	}),
	// 	meta: {
	// 		title: '一车独秀'
	// 	} 
	},{
		path: '/author',
		name: 'author',
		component:  loadView(loaded => {
			require(['../modules/author/author.vue'], loaded)
		}),
		meta: {
			title: '一车独秀'
		} 
	},{
		path: '/link',
		name: 'link',
		component:  loadView(loaded => {
			require(['../modules/index/link.vue'], loaded)
		}),
		meta: {
			title: '关联APP'
		}
	},{
		path: '/appointment',
		name: 'appointment',
		component:  loadView(loaded => {
			require(['../modules/index/appointment.vue'], loaded)
		}),
		meta: {
			title: '我的预约'
		}
	},{
		path: '/car',
		name: 'car',
		component:  loadView(loaded => {
			require(['../modules/index/car.vue'], loaded)
		}),
		meta: {
			title: '我的爱车'
		}
	},{
		path: '/carport',
		name: 'carport',
		component:  loadView(loaded => {
			require(['../modules/index/carport.vue'], loaded)
		}),
		meta: {
			title: '我的车库'
		}
	},{
		path: '/profit',
		name: 'profit',
		component:  loadView(loaded => {
			require(['../modules/index/profit.vue'], loaded)
		}),
		meta: {
			title: '我的收益'
		}
	},{
		path: '/appointment-detail',
		name: 'appointmentDetail',
		query: {
			orderId: "" // 预约订单id
		},
		component:  loadView(loaded => {
			require(['../modules/index/appointment-detail.vue'], loaded)
		}),
		meta: {
			title: '预约详情'
		}
	},{
		path: '/download',
		name: 'download',
		component:  loadView(loaded => {
			require(['../modules/index/download.vue'], loaded)
		}),
		meta: {
			title: '下载APP'
		}
	}
]

export default routes