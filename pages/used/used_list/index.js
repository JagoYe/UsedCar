// pages/used/used_list/index.js
var qqmapsdk;
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: false,
    searchHandle: '0',
    webSite: app.globalData.webSite,
    area: ['宝马', '丰田', '奥迪','本田']
  },
  //选择品牌
  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  //点击跳转品牌选择页
  clickBrand: function(){
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
        color:"",
        display: false,
        searchStyle: '',
        searchHandle: '0',
        show:''
      });
    } else {
      var display = e.currentTarget.dataset.display;
      var color = 'change' + index;
      var searchStyle = 'active' + index;
      //当前点击内容出现
      that.setData({
        display: true,
        color:color,
        show:'show',
        searchStyle: searchStyle,
        searchHandle: index
      });
    }
  },
  //点击跳转到详情页
  clickJump: function(e){
    var that = this;
    var carDetails = e.currentTarget.dataset.usedcar;
    wx.setStorage({
      key: 'used_details',
      data: carDetails,
      success: function(res){
        wx.navigateTo({
          url: '../used_details/index',
        })
      }
    })
  },
  //点击选择城市
  clickCity: function (e) {
    var that = this;
    that.setData({
      cityIndex: e.detail.value,
      city_name: ''
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
        var citys = [];
        res.result[0].forEach(function (val, key) {
          citys.push(val.fullname)
        })
        that.setData({
          citys: citys
        })
      },
    });
    //取出上一页的数据缓存
    wx.getStorage({
      key: 'usedCar',
      success: function(res) {
        res.data.forEach(function(val,key){
          var imageArr = val.images.split(' | ');
          res.data[key]['first_image'] = imageArr[0];
        });
        that.setData({
          usedCar: res.data,
          city_name: res.data[0].city_name
        })
      },
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