import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
	data = {
		mixin: 'This is mixin data.'
	}
	methods = {
		goto(url) {
			wx.navigateTo({
				url: url
			})
		}
	}

	onShow() {
		console.log('mixin onShow')
	}

	onLoad() {
		console.log('mixin onLoad')
	}
}
