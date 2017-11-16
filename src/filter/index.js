import Vue from 'vue'
// 注册
Vue.filter('numToCash', function (value) {
  // 返回处理后的值
	if(value == null || value == undefined || value == ""){
		return 0;
	} else if(value == 0) {
		return value;
	} else {
		var end = "",
			start = "";
		value = value.toFixed(2);
		
		if(value < 0) {
			start = "-";
			value += "";
			value = value.substring(1);
		}
		value += "";
		if(!/^-?\d+$/.test(value)) {
			end = value.split(".")[1];
			value = value.split(".")[0];
		}
		value = value.split("").reverse();
		var arr = [];
		value.map(function(elem, index){
			arr.push(elem);
			if(index%3 == 2 && index != value.length - 1) {
				arr.push(",");
			}
		});
		
		var respond = arr.reverse().join("");
		if(end != ""){
			return start + respond + "." + end;
		} else {    				
			return start + respond;
		}
	}
});

// Vue.filter('numToNull', function (data) {
// 	console.log(data)
// 	if(data) {
// 		return data.replace(/[0-9]*/g, "");
// 	} else {
// 		return data;
// 	}
// })


const myFilter = Vue.filter('numToCash')

export default myFilter