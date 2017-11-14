// pages/me/history/index.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSite: app.globalData.webSite
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
      url: app.globalData.webSite + '/Home/Wechat/footprintSelectByPhone',
      data: {
        user_phone: phone,
      },
      success: function(res){
        res.data.data.forEach(function(val,key){
          var imageArr = val.images.split(' | ');
          res.data.data[key]['first_image'] = imageArr[0];
        })
        that.setData({
          footprintCar: res.data.data
        })
      }
    })  
  },

  // 点击车辆足迹跳转到详情页
  clickJump: function (e) {
    var that = this;
    var car_id = e.currentTarget.dataset.id;
    // var carDetails = e.currentTarget.dataset.item
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/carSelectById',
      data: { car_id },
      success: function (res) {
        if (res.data.data[0].category == '1'){
          wx.setStorage({
            key: 'newCar_details',
            data: res.data.data[0],
            success: function (res1) {
              wx.navigateTo({
                url: '../../newCar/new_details/index',
              })
            }
          })
        }else{
          wx.setStorage({
            key: 'used_details',
            data: res.data.data[0],
            success: function (res1) {
              wx.navigateTo({
                url: '../../used/used_details/index',
              })
            }
          })
        }
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