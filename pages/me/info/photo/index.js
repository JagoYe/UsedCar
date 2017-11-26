// pages/me/info/photo/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
 //点击上传照片
  clickUpload: function(){
    var that = this;
    wx.chooseImage({
      success: function (res) {
        console.log(res);
        var imgAreey = [];
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          method:'POST',
          header: {
            "Content-Type": "multipart/form-data"
          },
          // url: app.globalData.webSite + '/Upload/wx/', //仅为示例，非真实的接口地址
          url: app.globalData.webSite + '/Home/Wechat/wxImageUpload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'AAAAAAAA',
          formData: {
            'user': 'test'
          },
          success: function (success) {
            imgAreey.push(res.tempFilePaths);
            that.setData({
              imgAreey: imgAreey
            })
            console.log(success);
          }
        })
      }
    })
  },
  // 点击确定
  return:function(){
    var that = this;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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