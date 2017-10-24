//index.js
//获取应用实例
var app = getApp();
var qqmapsdk;
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');

Page({
  data: {

  },
  //点击查看全部车源
  clickSee: function () {
    wx.navigateTo({
      url: '../new_list/index',
    })
  },
  onLoad: function () {
    var that = this;
    //调用腾讯地图
    qqmapsdk = new QQMapWX({
      key: 'WS7BZ-NDZK4-52HUV-XTWAH-QJPP6-NBFEA',
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var city = addressRes.result.address_component.city;
            that.setData({
              city: city
            })
          }
        })
      }
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
    that.setData({
      active: '',
      city: city
    })
  },
  vehicleQuery: function (e) {
    var that = this;
    var brandName = e.currentTarget.dataset.brandname
    console.log(brandName);
  }
})
