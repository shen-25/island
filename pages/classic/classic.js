// pages/classic/classic.js
import { ClassicModel } from "../../models/classic"
import {LikeModel} from "../../models/like"
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false
  },

  onLike: function(event){
    // console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.request({
    //   url: 'http://bl.talelin.com/v1/classic/latest',
    //   header:{
    //     appkey: 'lsJibUYqB4agSkP5',
    //   },
    //   success:(res)=>{
    //     console.log(res)
    //   }

    // })
    classicModel.getLatest((res)=>{
      // console.log(res)
      this.setData({
        classic: res.data
      })
    })
    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})