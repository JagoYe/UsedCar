// pages/used/used_details/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSite: app.globalData.webSite,
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    subscript: "1",
    num: '3',
  },
  //页数显示
  subscript: function (e) {
    var that = this;
    var current = e.detail.current;
    var subscript = parseInt(current + 1);
    that.setData({
      subscript: subscript
    })
  },
  //点击预览图片
  clickPreview: function (e) {
    var that = this;
    var Img = that.data.imgUrls;
    var current = e.target.dataset.src;
    Img.forEach(function (val, key) {
      val = that.data.webSite + val;
      Img.push(val)
    })
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: Img // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },
  // 点击竞拍车辆
  ClickAuction: function(){
    var that = this;
    var num = that.data.num;
    that.setData({
      masks: 'masks',
      reveal: 'reveal'
    });
    var timer = setInterval(function () {
      num--;
      that.setData({
        num: num
      });
      if (num == 0) {
        clearInterval(timer);
        that.setData({
          masks: '',
          reveal: '',
          num: '3',
        })
      }
    }, 1000);
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