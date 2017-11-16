		// 1 普通学员
// 2 思维导图
// 3 商业思维
// 4 系统思维
// 5 思维商学院
const headerBtns = {
	level1: {
		course: '普通学员',
		btns: [
			{
				value: 'enlist',
				name: '我要报名',
				link: 'enlist'
			}
		]
	},
	level2: {
		value: 'shangyesiwei',
		course: '商业思维',
		btns: [
			{
				value: 'retrain',
				name: '复训',
				link: 'retrain'
			},{
				value: 'upgrade',
				name: '升级',
				link: 'upgrade'
			}
		]
	},
	level31: {
		value: 'siweidaotu',
		course: '思维导图',
		btns: [
			{
				value: 'retrain',
				name: '复训',
				link: 'retrain'
			},{
				value: 'upgrade',
				name: '升级',
				link: 'upgrade'
			}
		]
	},
	level3: {
		value: 'xitongsiwei',
		course: '系统思维',
		btns: [
			{
				value: 'retrain',
				name: '复训',
				link: 'retrain'
			},{
				value: 'upgrade',
				name: '升级',
				link: 'upgrade'
			}
		]
	},
	level4: {
		value: 'siweishangxueyuan',
		course: '商学院',
		btns: [
			{
			// 	value: 'retrain',
			// 	name: '复训',
			// 	link: 'retrain'
			// },{
				value: 'takeCourse',
				name: '参加课程',
				link: 'courseOrder'
			}
		]
	},
};

export default  headerBtns