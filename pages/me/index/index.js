// pages/me/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**点击跳转到修改手机号页面 */
  phoneUpdate: function(){
    wx.navigateTo({
      url: '../phone_update/index',
    })
  },
  /**点击跳转到收藏 */
  clickCollection: function(){
    wx.navigateTo({
      url: '../collection/index',
    })
  },
  /**点击跳转到信息页 */
  clickNews: function () {
    wx.navigateTo({
      url: '../info/index/index',
    })
  },
  /**点击跳转到足迹页 */
  clickHistory: function () {
    wx.navigateTo({
      url: '../history/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(res);
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