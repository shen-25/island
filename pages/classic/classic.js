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
    first: false,
    likeCount: 0,
    likeStatus: true
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
    /**
     * 模板字符串
     */
    // let a = 2344
    // console.log(`${a}11111`)
    classicModel.getLatest((res)=>{
      // console.log(res)
      this.setData({
        classic: res.data,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      })
    })
    
  },
  
  
  onLike: function(event){
    // console.log(event)
    let behavior = event.detail.behavior
    console.log(behavior)
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    // this.setData({
    //   likeCount: behavior == 'like'? likeCount + 1: likeCount - 1,
    //   likeStatus:  behavior == 'like'? true: false
    // })
  },
  
  onNext(event){
    this._updateClassic('next')
    
  },
  onPrevious:function(event){
    this._updateClassic('previous')
  },

  _updateClassic(nextOrPrevious){
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (data)=>{
    /**
     * 先关掉
     */
    //  this._getLikeStatus(data.id, data.type)
      this.setData({
        classic: data,
        latest: classicModel.isLatest(data.index),
        first: classicModel.isFirst(data.index)
      })
    })
  },
  
  _getLikeStatus:function(artID, category){
    likeModel.getClassicLikeStatus(artID, category, (data)=>{
      this.setData({
        likeCount: data.fav_nums,
        likeStatus: data.like_status
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