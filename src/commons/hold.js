// 只是关于本地缓存的处理

let localStorage = window.localStorage;
// let storage = window.localStorage;
let storage = window.sessionStorage;

const hold = {
	session: {

	},
	cookie: {

	},
	storage: {
		get (item) {
			return storage.getItem(item)
		},
		set (item, value) {
			return storage.setItem(item, value)
		},
		clear () {
			storage.clear();
		}
	},
	localStorage: {
		get (item) {
			return localStorage.getItem(item)
		},
		set (item, value) {
			return localStorage.setItem(item, value)
		},
		clear () {
			localStorage.clear();
		}
	}
}

export default hold;