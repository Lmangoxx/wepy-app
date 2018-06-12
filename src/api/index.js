// 百度api-
// 7f86886733f3551c5be66c29ad5c38e2
// http://api.map.baidu.com/telematics/v3/movie?qt=hot_movie&location=%E5%8C%97%E4%BA%AC&ak=E4805d16520de693a3fe707cdc962045
export default class API {
    constructor (param) {
        this.bdUrl = 'https://api.map.baidu.com';
        this.ak = '7vOk8dIwoZQIUVD9vK1kO4k4im4KMxPH';
        this.output = 'json';
    }
    location () {
        const self = this;
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    wx.request({
                        url: `${self.bdUrl}/geocoder/v2/`,
                        data: {
                            ak: self.ak,
                            location: `${res.latitude},${res.longitude}`,
                            output: self.output
                        },
						success(res) {
							let data = res.data
							if (data.status === 0) {
								resolve(data.result.addressComponent.city)
							} else {
                                reject(res) 
                            }
                        },
                        fail(err) {
                            reject(err)
                        }
					})
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    }
    movie (param) {
        const self = this;
        param = param || {};
        let movieParams = {
            ak: self.ak,
            location: param['location'] || '北京',
            output: self.output,
            qt: 'hot_movie'
        }
        let otherParams = {
            success: param['success'] || function () {},
            fail: param['fail'] || function () {}
        }
        wx.request({
            url: `${self.bdUrl}/telematics/v3/movie`,
            data: movieParams,
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success (res) {
                res = res['data'];
                if (res['error'] === 0 && res['status'] === 'Success') {
                    otherParams.success(res.result);
                } else {
                    otherParams.fail({
                        errMsg: res['status'],
                        statusCode: res['error']
                    });
                }
            },
            fail (data) {
                otherParams.fail(data);
            }
        })
    }
}