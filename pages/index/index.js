//index.js
//获取应用实例
var app = getApp();
var qqmapsdk;
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');

Page({
  data: {
    // area: ['宝马','丰田','奥迪','本田'] 
  },
  //选择品牌
  bindPickerChange: function (e) {
    var that = this;
    var brand_name = that.data.area[e.detail.value];
    if(that.data.city == ''){
      var city_name = that.data.citys[that.data.cityIndex]
    }else{
      var city_name = that.data.city
    }
    wx.setStorage({
      key: 'brand',
      data: brand_name,
      success: function(brand){
        wx.setStorage({
          key: 'cityName',
          data: city_name,
          success: function (cityName) {
            wx.request({
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: app.globalData.webSite + '/Home/Wechat/carSelectByCityAndBrand',
              data: {
                category: '2',
                city_name: city_name,
                brand_name: brand_name
              },
              success: function (res) {
                wx.setStorage({
                  key: 'usedCar',
                  data: res.data.data,
                  success: function (car) {
                    wx.navigateTo({
                      url: '../used/used_list/index',
                    })
                  }
                })
              }
            });
          }
        })
      }
    })
    that.setData({
      areaIndex: e.detail.value
    })
  },
  //点击查看全部车源
  clickSee: function(e){
    var that = this;
    var price_a = e.currentTarget.dataset.a;
    var price_b = e.currentTarget.dataset.b;
    if (that.data.city == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city
    }
    wx.setStorage({
      key: 'cityName',
      data: city_name,
      success: function(cityName){
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/carSelectByPriceVarious',
          data: {
            category: '2',
            city_name: city_name,
            price_a: price_a,
            price_b: price_b,
            status: ''
          },
          success: function (res) {
            wx.setStorage({
              key: 'usedCar',
              data: res.data.data,
              success: function (car) {
                wx.navigateTo({
                  url: '../used/used_list/index',
                })
              }
            })
          }
        })
      }
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
        var citys = [];
        res.result[0].forEach(function(val,key){
          citys.push(val.fullname)
        })
        that.setData({
          citys: citys
        })
      },
    });
    //调用品牌接口
    wx.request({
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/carBrandSelectAll',
      success: function(res){
        var area = [];
        res.data.forEach(function(val,key){
          area.push(val.name)
        });
        that.setData({
          area: area
        })
      }
    })    
  },
  //点击弹出选择城市
  clickCity: function(e){
    var that = this;
    that.setData({
      cityIndex: e.detail.value,
      city:''
    })
  },
  // 点击品牌选择
  vehicleQuery: function(e){
    var that = this;
    var brand_name = e.currentTarget.dataset.brandname
    if (that.data.city == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city
    }
    wx.setStorage({
      key: 'brand',
      data: brand_name,
      success: function(brand){
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/carSelectByCityAndBrand',
          data: {
            category: '2',
            city_name: city_name,
            brand_name: brand_name
          },
          success: function (res) {
            wx.setStorage({
              key: 'usedCar',
              data: res.data.data,
              success: function (car) {
                wx.navigateTo({
                  url: '../used/used_list/index',
                })
              }
            })
          }
        });
      }
    })
  },
  //按价格查询
  priceChoice:function(e){
    var that = this;
    var price_a = e.currentTarget.dataset.a;
    var price_b = e.currentTarget.dataset.b;
    if (that.data.city == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city
    }
    wx.setStorage({
      key: 'price',
      data: { price_a, price_b},
      success: function(price){
        wx.setStorage({
          key: 'cityName',
          data: city_name,
          success: function (cityName) {
            wx.request({
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: app.globalData.webSite + '/Home/Wechat/carSelectByPrice',
              data: {
                category: '2',
                city_name: city_name,
                price_a: price_a,
                price_b: price_b
              },
              success: function (res) {
                wx.setStorage({
                  key: 'usedCar',
                  data: res.data.data,
                  success: function (car) {
                    wx.navigateTo({
                      url: '../used/used_list/index',
                    })
                  }
                })
              }
            });
          }
        })
      }
    })
  }
})
