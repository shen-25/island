// pages/book/book.js
import {
  BookModel
} from "../../models/book";

import { random } from "../../util/common";

const bookeModel = new BookModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  onSearching() {
    this.setData({
      searching: true
    })
  },
  onCancel() {
    this.setData({
      searching: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    bookeModel.getHotList().
      then((res) => {
        this.setData({
          books: res
        })
      })

    /**
     * 正确调用promise,返回一个promise
     */
    /** bookeModel.getHotList().
       then((res) => {
         console.log(res)
         return bookeModel.getMyBookCount()
       }).then(res => {
         console.log(res)
         return bookeModel.getMyBookCount()
       }).then(res => {
         console.log(res)
       })
       */

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})