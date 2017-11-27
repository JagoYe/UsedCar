// pages/me/info/photo/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSite: app.globalData.webSite
  },
 //点击上传照片
  clickUpload: function(){
    var that = this;
    var key = Math.random().toString(36).substr(2);
    wx.chooseImage({
      success: function (res) {
        that.data.imgArray.push(res.tempFilePaths);
        that.setData({
          imgArray: that.data.imgArray
        })
        // var tempFilePaths = res.tempFilePaths
        // wx.uploadFile({
        //   method:'POST',
        //   header: {
        //     "Content-Type": "multipart/form-data"
        //   },
        //   url: app.globalData.webSite + '/Home/Wechat/wxImageUpload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'ABC',
        //   formData: {
        //     'user': 'test',
        //     'key': key
        //   },
        //   success: function (success) {
        //     console.log(success);
        //   }
        // })
      }
    })
  },
  //点击删除
  delete:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var imgArray = that.data.imgArray
    if(that.data.imgArray != []){
      imgArray.forEach(function (val, key) {
        if(index == val[0]){
          imgArray.splice(key, 1);
        }
      });
      console.log(imgArray);
      that.setData({
        imgArray: imgArray
      })
    }
    that.setData({
      imgArray: imgArray
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
    var that = this;
    var imgArray = [];
    that.setData({
      imgArray: imgArray
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