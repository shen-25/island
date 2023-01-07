import { BookModel } from "../../models/book";
import { ClassicModel } from "../../models/classic";
const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    authorized: false,
    bookeCount: 0,
    classicList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyFavor();
    this.getMyBookCount();
  },

  getUserProfile() {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "登录小程序", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          authorized: true,
        });
      },
    });
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then((res) => {
      this.setData({
        bookCount: res.count,
      });
    });
  },
  getMyFavor() {
    classicModel.getMyFavor((res) => {
      console.log(res);
      this.setData({
        classicList: res.data,
      });
    });
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: "/pages/about/about",
    });
  },
  onAboutMarry(event) {
    wx.navigateTo({
      url: "/pages/marry/marry",
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
