// import imgBanner from 'assets/img/banner.jpg'
// import imgAd from 'assets/img/index/ad.png'
import imgTuijianHeader from 'assets/img/index/header.png'
// import imgCourseOther from 'assets/img/index/course.png'
// import imgPlay from 'assets/img/index/header.png'

export const getterIndex = {
	// bannerDatas: [
	// 	{
	// 	  // url: 'banner/1',
	// 	  img: imgBanner,
	// 	},{
	// 	  // url: 'banner/1',
	// 	  img: imgBanner,
	// 	},{
	// 	  // url: 'banner/1',
	// 	  img: imgBanner,
	// 	}
	// ],
	// adDatas: [
	// 	{
	// 	  url: 'banner/1',
	// 	  img: imgAd,
	// 	},{
	// 	  url: 'banner/1',
	// 	  img: imgAd,
	// 	},{
	// 	  url: 'banner/1',
	// 	  img: imgAd,
	// 	}
	// ],
	entryDatas: [
		{
			value: 'audio',
			name: '音频',
			img: 'audio',
			url: 'rankList',
			type: 'audio'
		},{
			value: 'video',
			name: '视频',
			img: 'video',
			url: 'rankList',
			type: 'video'
		},{
			value: 'download',
			name: '资料下载',
			img: 'download',
			url: 'downloadList',
			type: ''
		},{
			value: 'mall',
			name: '积分商城',
			img: 'mall',
			url: 'mall',
			type: ''
		},{
			value: 'course',
			name: '线下课程',
			img: 'course',
			url: 'course',
			type: ''
		}
	],
	entryVideosDatas: [
		{
			value: '1',
			name: '他用一年的时间颠覆了智力',
			img: '',
			url: 'videoDetail',
			id: 1
		},{
			value: '1',
			name: '他用一年的时间颠覆了智力',
			img: '',
			url: 'videoDetail',
			id: 2
		},{
			value: '1',
			name: '他用一年的时间颠覆了智力',
			img: '',
			url: 'videoDetail',
			id: 3
		}
	],
	tuijianAudioDatas: {
		num: 44323,
		img: imgTuijianHeader,
		list: [
			{
				value: '',
				name: '狼群（全新修订全本珍藏版 上）',
				url: 'audioDetail',
				id: 1,
				src: ''
			},{
				value: '',
				name: '狼群（全新修订全本珍藏版 上）',
				url: 'audioDetail',
				id: 2,
				src: ''
			},{
				value: '',
				name: '狼群（全新修订全本珍藏版 上）',
				url: 'audioDetail',
				id: 3,
				src: ''
			}
		]
	},
	tuijianQuotationDatas: {
		num: 44323,
		img: imgTuijianHeader,
		list: [
			{
				value: '',
				name: '狼群（全新修订全本珍藏版 上）',
				url: 'quotation'
			},{
				value: '',
				name: '狼群（全新修订全本珍藏版 上）',
				url: 'quotation'
			},{
				value: '',
				name: '狼群（全新修订全本珍藏版 上）',
				url: 'quotation'
			}
		]
	},
	tuijianVideoDatas: [
		{
			title: '总裁商业思维1',
			price: '1233',
			priceUnit: '年',
			priceCurrency: '￥',
			desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
			label: '主讲', 
			speaker: '苏引华',
			subscribe: '234343',
			url: '',
			id: ''
		},{
			title: '总裁商业思维2',
			price: '1233',
			priceUnit: '年',
			priceCurrency: '￥',
			desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
			label: '主讲', 
			speaker: '苏引华',
			subscribe: '234343',
			url: '',
			id: ''
		},{
			title: '总裁商业思维3',
			price: '1233',
			priceUnit: '年',
			priceCurrency: '￥',
			desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
			label: '主讲', 
			speaker: '苏引华',
			subscribe: '234343',
			url: '',
			id: ''
		}
	],
	courseOthers: [
		// {
		// 	value: '',
		// 	name: '',
		// 	url: '',
		// 	img: ''
		// }
	]
}