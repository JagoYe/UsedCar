// pages/me/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //验证跳转到对应页面
  verification: function (e) {
    //获取url
    var that = this;
    var url = e.currentTarget.dataset.url;
    //登录验证
    var loginConfirm = app.globalData.loginConfirm;
    loginConfirm(url);
  },
  // /**点击跳转到修改手机号页面 */
  // phoneUpdate: function(){
  //   wx.navigateTo({
  //     url: '../phone_update/index',
  //   })
  // },
  // /**点击跳转到收藏 */
  // clickCollection: function(){
  //   wx.navigateTo({
  //     url: '../collection/index',
  //   })
  // },
  // /**点击跳转到信息页 */
  // clickNews: function () {
  //   wx.navigateTo({
  //     url: '../info/index/index',
  //   })
  // },
  // /**点击跳转到足迹页 */
  // clickHistory: function () {
  //   wx.navigateTo({
  //     url: '../history/index',
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      phone:app.globalData.userInfo.phone
    })
    if (app.globalData.loginStatus == false) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
    };
    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = res.userInfo.avatarUrl
        that.setData({
          userImage: avatarUrl,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})