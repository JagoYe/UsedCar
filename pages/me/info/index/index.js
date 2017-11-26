// pages/me/info/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSite: app.globalData.webSite,
  },
  publishInfo: function(){
    wx.navigateTo({
      url: '../publish_info/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var phone = app.globalData.userInfo.phone;
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/pendingVehicleSelectByPhone',
      data: {
        user_phone: phone
      },
      success: function(res){
        if (res.data.data != '' || res.data.data != 'undefined'){
          res.data.data.forEach(function (val, key) {
            if (res.data.data[key].status == 1) {
              res.data.data[key].status = '审核已通过'
            } else {
              res.data.data[key].status = '审核中'
            }
          })
        }
        that.setData({
          publishCar: res.data.data,
        })
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