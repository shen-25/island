// pages/book_detail/book_detail.js
import { BookModel } from "../../models/book"
import { LikeModel } from "../../models/like"
const bookeModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLike(event){
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel,this.data.book.id,400)
   },

   /**
    * 点击输入框，弹出真实的输入框
    * @param {} event 
    */
   onFakePost(event){
      this.setData({
        posting: true
      })
   },
   onCancel(event){
    this.setData({
      posting: false
    })
   },

   onPost(event){
    //自定义的事件传递的参数在detail里
    const comment = event.detail.text || event.detail.value
    if(comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookeModel.postComment(this.data.book.id, comment)
    .then((res)=>{
      wx.showToast({
        title: '添加成功',
        icon: 'none'
      })
      console.log(this.data.comments)
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })

    })

   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading()
    const bId = options.bId
    const detail = bookeModel.getDetail(bId)
    const comments = bookeModel.getComments(bId)
    const likeStatus = bookeModel.getLikeStatus(bId)

    /*
      等待所有子promise完成,数据放在res数组中，
      race 竞争，返回结果是竞争成功的结果
    */

    Promise.all([detail, comments, likeStatus])
    .then(res =>{
      // console.log(res)
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
    })


    // detail.then((res) => {
    //   this.setData({
    //     book: res
    //   })
    // })
    // comments.then((res) => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then((res) => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })

    // })
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