/**
  利用对象的方法保存状态
const promise = new Promise((resolve, reject) => {

    pending fulfilled rejected
    进行中 ->  完成  或者->  失败  凝固了
    不可逆转
  wx.getSystemInfo({
    success: (res) => {
      resolve(res)
    },
    fail: (error) => {
      reject(error)
    }
  })
}) 
//回调函数
promise.then((res) => {
  console.log(res)
}, (error) => {
  console.log(error)
})
*/

import { config } from "../config.js";

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

class HTTP {
  //以对象的形式传参数 解构
  request({ url, data = {}, method = 'GET' }) {
    //返回promise对象
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      // url: config.api_base_url + url,
      url: `${config.api_base_url}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          //告诉promise要改状态了
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }


