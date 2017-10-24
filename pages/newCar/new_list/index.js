// pages/used/used_list/index.js
var qqmapsdk;
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: false,
    searchHandle: '0',
  },
  //点击选择品牌
  clickBrand: function () {
    wx.navigateTo({
      url: '../sort/index',
    })
  },
  /**按条件选择 */
  tabChange: function (e) {
    var that = this;
    var searchHandle = that.data.searchHandle;
    var index = e.currentTarget.dataset.active;
    if (searchHandle == index) {
      that.setData({
        color: "",
        display: false,
        searchStyle: '',
        searchHandle: '0',
        show: ''
      });
    } else {
      var display = e.currentTarget.dataset.display;
      var color = 'change' + index;
      var searchStyle = 'active' + index;
      //当前点击内容出现
      that.setData({
        display: true,
        color: color,
        show: 'show',
        searchStyle: searchStyle,
        searchHandle: index
      });
    }
  },
  clickJump: function () {
    wx.navigateTo({
      url: '../new_details/index',
    })
  },
  //点击弹出选择城市
  clickCity: function () {
    var that = this;
    that.setData({
      active: 'active'
    })
  },
  //点击确认
  confirm: function (e) {
    var that = this;
    var city = e.currentTarget.dataset.index;
    console.log(city);
    that.setData({
      active: '',
      city: city
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用腾讯地图
    qqmapsdk = new QQMapWX({
      key: 'WS7BZ-NDZK4-52HUV-XTWAH-QJPP6-NBFEA',
    });
    qqmapsdk.getDistrictByCityId({
      id: '530000',
      success: function (res) {
        var citys = res.result[0];
        that.setData({
          citys: citys
        })
      },
    });
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