//index.js
//获取应用实例
var app = getApp();
var qqmapsdk;
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');

Page({
  data: {
    webSite: app.globalData.webSite 
  },
  //选择品牌
  bindPickerChange: function (e) {
    var that = this;
    var brand_name = that.data.area[e.detail.value];
    if (that.data.city == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city
    }
    wx.setStorage({
      key: 'brand',
      data: brand_name,
      success: function (brand) {
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
                category: '1',
                city_name: city_name,
                brand_name: brand_name
              },
              success: function (res) {
                wx.setStorage({
                  key: 'usedCar',
                  data: res.data.data,
                  success: function (car) {
                    wx.navigateTo({
                      url: '../new_list/index',
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
  clickSee: function (e) {
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
      success: function (cityName) {
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/carSelectByPriceVarious',
          data: {
            category: '1',
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
                  url: '../new_list/index',
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
        res.result[0].forEach(function (val, key) {
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
      success: function (res) {
        var area = [];
        res.data.forEach(function (val, key) {
          area.push(val.name)
        });
        that.setData({
          area: area
        })
      }
    });
    //新车车热门推荐
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/carHotSelectByCategory',
      data: { category: '1' },
      success: function (res) {
        //请求拍卖中的接口
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/carSalePendingByStatus',
          data: { status: '1' },
          success: function (status1) {
            //请求拍卖已完成的接口
            wx.request({
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: app.globalData.webSite + '/Home/Wechat/carSalePendingByStatus',
              data: { status: '2' },
              success: function (status2) {
                if (res.data.already != ''){
                  res.data.already.forEach(function (val, key) {
                    var imageArr = val.images.split(' | ');
                    var buy_year = val.buy_time.substring(0, 4);
                    var buy_month = val.buy_time.substring(4, 6);
                    res.data.already[key]['buy_year'] = buy_year;
                    res.data.already[key]['buy_month'] = buy_month;
                    res.data.already[key]['first_image'] = imageArr[0];
                  })
                }
                if (status1.data.data != '') {
                  var deleteArr = [];
                  res.data.already.forEach(function (val1, key1) {
                    status1.data.data.forEach(function (val2, key2) {
                      status2.data.data.forEach(function (val3, key3) {
                        // var imageArr = val1.images.split(' | ');
                        // var buy_year = val1.buy_time.substring(0, 4);
                        // var buy_month = val1.buy_time.substring(4, 6);
                        // res.data.already[key1]['buy_year'] = buy_year;
                        // res.data.already[key1]['buy_month'] = buy_month;
                        // res.data.already[key1]['first_image'] = imageArr[0];
                        if (val1.id == val2.id) {
                          res.data.already[key1]['status'] = '拍卖中'
                        } else if (val1.id == val3.id) {
                          deleteArr.push(val1.id);
                        }
                      })
                    })
                  });
                  //delete删除已完成项
                  res.data.already.forEach(function (val, key) {
                    deleteArr.forEach(function (val1, key1) {
                      if (val.id == val1) {
                        res.data.already.splice(key, 1);
                      }
                    });
                  });
                } else {
                  var deleteArr = [];
                  if (status2.data.data != '' && res.data.code == 200){
                    res.data.already.forEach(function (val1, key1) {
                      status2.data.data.forEach(function (val2, key2) {
                        if (val1.id == val2.id) {
                          deleteArr.push(val1.id);
                        } //else {
                        //   var imageArr = val1.images.split(' | ');
                        //   var buy_year = val1.buy_time.substring(0, 4);
                        //   var buy_month = val1.buy_time.substring(4, 6);
                        //   res.data.already[key1]['buy_year'] = buy_year;
                        //   res.data.already[key1]['buy_month'] = buy_month;
                        //   res.data.already[key1]['first_image'] = imageArr[0];
                        // }
                      });
                    });
                    //delete删除已完成项
                    res.data.already.forEach(function (val, key) {
                      deleteArr.forEach(function (val1, key1) {
                        if (val.id == val1) {
                          res.data.already.splice(key, 1);
                        }
                      });
                    });
                  }
                }
                that.setData({
                  usedCar: res.data.already
                })
              }
            })
          }
        });
      }
    })
  },
  //点击弹出选择城市
  clickCity: function (e) {
    var that = this;
    that.setData({
      cityIndex: e.detail.value,
      city: ''
    })
  },
  // 点击品牌选择
  vehicleQuery: function (e) {
    var that = this;
    var brand_name = e.currentTarget.dataset.brandname
    if (that.data.city == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city
    }
    wx.setStorage({
      key: 'cityName',
      data: city_name,
      success: function(cityName){
        wx.setStorage({
          key: 'brand',
          data: brand_name,
          success: function (brand) {
            wx.request({
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: app.globalData.webSite + '/Home/Wechat/carSelectByCityAndBrand',
              data: {
                category: '1',
                city_name: city_name,
                brand_name: brand_name
              },
              success: function (res) {
                wx.setStorage({
                  key: 'usedCar',
                  data: res.data.data,
                  success: function (car) {
                    wx.navigateTo({
                      url: '../new_list/index',
                    })
                  }
                })
              }
            });
          }
        })
      }
    })
  },
  //按价格查询
  priceChoice: function (e) {
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
      data: { price_a, price_b },
      success: function (price) {
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
                category: '1',
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
                      url: '../new_list/index',
                    })
                  }
                })
              }
            });
          }
        })
      }
    })
  },
  //收藏车源
  Collection: function () {
    var that = this;
    wx.navigateTo({
      url: '../../me/collection/index',
    })
  },
  //浏览足迹
  footprint: function () {
    var that = this;
    wx.navigateTo({
      url: '../../me/history/index',
    })
  },
  //点击跳转到详情页
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
        //请求拍卖中的接口
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/carSalePendingByStatus',
          data: { status: '1' },
          success: function (status) {
            if (status.data.data != '') {
              status.data.data.forEach(function (val, key) {
                if (val.id == res.data.data[0].id) {
                  wx.setStorage({
                    key: 'carId',
                    data: car_id,
                    success: function (res) {
                      wx.navigateTo({
                        url: '/pages/find/auction_detail/index'
                      })
                    }
                  })
                } else {
                  wx.setStorage({
                    key: 'newCar_details',
                    data: res.data.data[0],
                    success: function (res1) {
                      wx.navigateTo({
                        url: '/pages/newCar/new_details/index',
                      })
                    }
                  })
                }
              })
            } else {
              wx.setStorage({
                key: 'newCar_details',
                data: res.data.data[0],
                success: function (res1) {
                  wx.navigateTo({
                    url: '/pages/newCar/new_details/index',
                  })
                }
              })
            }
          }
        });
        // //请求拍卖中的接口
        // wx.request({
        //   method: 'POST',
        //   header: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   },
        //   url: app.globalData.webSite + '/Home/Wechat/carSalePendingByStatus',
        //   data: { status: '1' },
        //   success: function (status) {
        //     status.data.data.forEach(function (val, key) {
        //       if (val.id == res.data.data[0].id) {
        //         wx.setStorage({
        //           key: 'carId',
        //           data: car_id,
        //           success: function (res) {
        //             wx.navigateTo({
        //               url: '/pages/find/auction_detail/index'
        //             })
        //           }
        //         })
        //       } else {
        //         wx.setStorage({
        //           key: 'newCar_details',
        //           data: res.data.data[0],
        //           success: function (res1) {
        //             wx.navigateTo({
        //               url: '/pages/newCar/new_details/index',
        //             })
        //           }
        //         })
        //       }
        //     })
        //   }
        // });
        // if (res.data.data[0]['status']) {
        //   wx.setStorage({
        //     key: 'carId',
        //     data: car_id,
        //     success: function (res) {
        //       wx.navigateTo({
        //         url: '/pages/find/auction_detail/index'
        //       })
        //     }
        //   })
        // }
        // wx.setStorage({
        //   key: 'newCar_details',
        //   data: res.data.data[0],
        //   success: function (res1) {
        //     wx.navigateTo({
        //       url: '/pages/newCar/new_details/index',
        //     })
        //   }
        // })
        // wx.setStorage({
        //   key: 'newCar_details',
        //   data: res.data.data[0],
        //   success: function (res1) {
        //     wx.navigateTo({
        //       url: '/pages/newCar/new_details/index',
        //     })
        //   }
        // })
      }
    })
  },
})
