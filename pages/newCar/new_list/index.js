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
    // area: ['宝马', '丰田', '奥迪','本田'],
    price_a: '0',
    price_b: '100000',
    brand_name: '',
    letterArr: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    toView: 'F',
    scrollTop: '',
    priceArr: [
      [
        {
          name: '不限',
          price_a: '0',
          price_b: '100000',
          id: '1'
        },
        {
          name: '3万以下',
          price_a: '0',
          price_b: '3',
          id: '2'
        },
        {
          name: '3-5万',
          price_a: '3',
          price_b: '5',
          id: '3'
        },
      ],
      [
        {
          name: '5-10万',
          price_a: '5',
          price_b: '10',
          id: '4'
        },
        {
          name: '10-15万',
          price_a: '10',
          price_b: '15',
          id: '5'
        },
        {
          name: '15-20万',
          price_a: '15',
          price_b: '20',
          id: '6'
        },
      ],
      [
        {
          name: '20-25万',
          price_a: '20',
          price_b: '25',
          id: '7'
        },
        {
          name: '25-30万',
          price_a: '25',
          price_b: '30',
          id: '8'
        },
        {
          name: '30万以上',
          price_a: '30',
          price_b: '100000',
          id: '9'
        }
      ]
    ]
  },
  //选择品牌搜索框搜索
  bindPickerChange: function (e) {
    var that = this;
    var brand_name = that.data.area[e.detail.value];
    if (that.data.city_name == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city_name
    }
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
        res.data.data.forEach(function (val, key) {
          var imageArr = val.images.split(' | ');
          res.data.data[key]['first_image'] = imageArr[0];
          var buy_year = val.buy_time.substring(0, 4);
          var buy_month = val.buy_time.substring(4, 6);
          res.data.data[key]['buy_year'] = buy_year;
          res.data.data[key]['buy_month'] = buy_month;
        });
        that.setData({
          brand_name: brand_name,
          usedCar: res.data.data
        })
      }
    });
    this.setData({
      areaIndex: e.detail.value
    })
  },
  //点击跳转品牌选择页
  clickBrand: function () {
    var that = this;
    that.setData({
      popbrand: 'popbrand'
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
        wx.setStorage({
          key: 'newCar_details',
          data: res.data.data[0],
          success: function (res1) {
            wx.navigateTo({
              url: '../new_details/index',
            })
          }
        })
      }
    })
  },
  //点击选择城市
  clickCity: function (e) {
    var that = this;
    wx.getStorage({
      key: 'cityName',
      success: function (res) {
        res.data = that.data.citys[e.detail.value];
        wx.setStorage({
          key: 'cityName',
          data: res.data,
          success: function (cityName) {

          }
        })
      },
    })
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
    //取出上一个页面的城市地址缓存
    wx.getStorage({
      key: 'cityName',
      success: function (res) {
        that.setData({
          city_name: res.data
        })
      },
    });
    //取出上一个页面的price_a和price_b的数据缓存
    wx.getStorage({
      key: 'price',
      success: function (res) {
        that.setData({
          price_a: res.data.price_a,
          price_b: res.data.price_b
        })
      },
    });
    //取出上一个页面的brand_name品牌的数据缓存
    wx.getStorage({
      key: 'brand',
      success: function (res) {
        that.setData({
          brand_name: res.data
        })
      },
    });
    //取出上一页的数据缓存
    wx.getStorage({
      key: 'usedCar',
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
                // console.log(status1);
                res.data.forEach(function (val1, key1) {
                  status1.data.data.forEach(function (val2, key2) {
                    status2.data.data.forEach(function (val3, key3) {
                      if (val1.id == val2.id) {
                        res.data[key1]['status'] = '拍卖中';
                        var imageArr = val1.images.split(' | ');
                        var buy_year = val1.buy_time.substring(0, 4);
                        var buy_month = val1.buy_time.substring(4, 6);
                        res.data[key1]['buy_year'] = buy_year;
                        res.data[key1]['buy_month'] = buy_month;
                        res.data[key1]['first_image'] = imageArr[0];
                      } else if (val1.id == val3.id) {
                        // res.data[key1] = ''
                        // delete res.data[key1];
                        // res.data.remove(key1);
                      }
                    })
                  })
                })
                console.log(res.data);
                that.setData({
                  usedCar: res.data
                })
              }
            })
          }
        });
        // res.data.forEach(function (val, key) {
        //   var imageArr = val.images.split(' | ');
        //   var buy_year = val.buy_time.substring(0, 4);
        //   var buy_month = val.buy_time.substring(4, 6);
        //   res.data[key]['buy_year'] = buy_year;
        //   res.data[key]['buy_month'] = buy_month;
        //   res.data[key]['first_image'] = imageArr[0];
        // });
        // that.setData({
        //   usedCar: res.data
        // })
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
    //调用所有品牌
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/carBrandSelectAll',
      success: function (res) {
        var brandObj = [
          {
            'initial': 'test'
          }
        ];
        var brandHandle = 0;

        res.data.forEach(function (val1, key1) {
          var handleObj = {}
          handleObj['initial'] = val1.initial;
          handleObj['name'] = [];
          handleObj['name'].push(val1.name);

          brandObj.forEach(function (val2, key2) {
            if (val2.initial == handleObj.initial) {
              brandHandle++;
            }
          });
          if (brandHandle == 0) {
            brandObj.push(handleObj);
          } else {
            brandObj.forEach(function (val3, key3) {
              if (val3.initial == val1.initial) {
                brandObj[key3]['name'].push(val1.name);
              }
            });
          }
          brandHandle = 0;
        });
        brandObj.splice(0, 1);
        that.setData({
          brand: brandObj
        })
      }

    })
  },
  // 默认排序选择（清除所有选择恢复默认排序）
  sort: function (e) {
    var that = this;
    var searchHandle = that.data.searchHandle;
    var index = e.currentTarget.dataset.active;
    var priceArr = that.data.priceArr;
    if (that.data.city_name == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city_name
    };
    priceArr.forEach(function (val, key) {
      val.forEach(function (val1, key1) {
        val[key1].active = '0';
      })
    });
    that.setData({
      priceArr: priceArr
    })
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/carSelectByPriceVarious',
      data: {
        category: '1',
        city_name: city_name,
        price_a: '0',
        price_b: '100000',
        status: ''
      },
      success: function (res) {
        res.data.data.forEach(function (val, key) {
          var imageArr = val.images.split(' | ');
          res.data.data[key]['first_image'] = imageArr[0];
          var buy_year = val.buy_time.substring(0, 4);
          var buy_month = val.buy_time.substring(4, 6);
          res.data.data[key]['buy_year'] = buy_year;
          res.data.data[key]['buy_month'] = buy_month;
        });
        that.setData({
          usedCar: res.data.data,
          brand_name: '',
          price_a: '0',
          price_b: '100000',
          color: "",
          display: false,
          searchStyle: '',
          searchHandle: '0',
          show: ''
        })
      }
    });
  },
  //按各种条件搜索
  term: function (e) {
    var that = this;
    var searchHandle = that.data.searchHandle;
    var price_a = that.data.price_a;
    var price_b = that.data.price_b;
    var term = e.currentTarget.dataset.term;
    if (that.data.city_name == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city_name
    }
    var requestCondition = {
      category: '1',
      city_name: city_name,
      price_a: price_a,
      price_b: price_b,
      status: term
    }
    if (that.data.brand_name != '') {
      requestCondition.brand_name = that.data.brand_name;
    }
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/carSelectByPriceVarious',
      data: requestCondition,
      success: function (res) {
        res.data.data.forEach(function (val, key) {
          var imageArr = val.images.split(' | ');
          res.data.data[key]['first_image'] = imageArr[0];
          var buy_year = val.buy_time.substring(0, 4);
          var buy_month = val.buy_time.substring(4, 6);
          res.data.data[key]['buy_year'] = buy_year;
          res.data.data[key]['buy_month'] = buy_month;
        });
        that.setData({
          usedCar: res.data.data,
          color: "",
          display: false,
          searchStyle: '',
          searchHandle: '0',
          show: ''
        })
      }
    });
  },
  //价格区间搜索
  PriceRange: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    var priceArr = that.data.priceArr;
    var price_a = e.currentTarget.dataset.a;
    var price_b = e.currentTarget.dataset.b;
    if (that.data.city_name == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city_name
    }
    priceArr.forEach(function (val, key) {
      val.forEach(function (val1, key1) {
        val[key1].active = '0';
      })
    });
    priceArr.forEach(function (val, key) {
      val.forEach(function (val1, key1) {
        if (val1.id == id) {
          val[key1].active = '1';
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
              res.data.data.forEach(function (val, key) {
                var imageArr = val.images.split(' | ');
                res.data.data[key]['first_image'] = imageArr[0];
                var buy_year = val.buy_time.substring(0, 4);
                var buy_month = val.buy_time.substring(4, 6);
                res.data.data[key]['buy_year'] = buy_year;
                res.data.data[key]['buy_month'] = buy_month;
              });
              that.setData({
                price_a: price_a,
                price_b: price_b,
                usedCar: res.data.data,
                color: "",
                display: false,
                searchStyle: '',
                searchHandle: '0',
                show: ''
              })
            }
          })
        }
      })
    });
    that.setData({
      priceArr: priceArr
    })
  },

  //点击字母选择车辆品牌
  cliclLetter: function (e) {
    var that = this;
    var letter = e.currentTarget.dataset.letter
    that.data.brand.forEach(function (val, key) {
      if (letter == val.initial) {
        that.setData({
          toView: letter
        })
      }
    })
  },
  //点击所有品牌选择搜索车辆
  BrandChoice: function (e) {
    var that = this;
    var brand_name = e.currentTarget.dataset.brand_name;
    if (that.data.city_name == '') {
      var city_name = that.data.citys[that.data.cityIndex]
    } else {
      var city_name = that.data.city_name
    }
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
        console.log(res);
        res.data.data.forEach(function (val, key) {
          var imageArr = val.images.split(' | ');
          res.data.data[key]['first_image'] = imageArr[0];
          var buy_year = val.buy_time.substring(0, 4);
          var buy_month = val.buy_time.substring(4, 6);
          res.data.data[key]['buy_year'] = buy_year;
          res.data.data[key]['buy_month'] = buy_month;
        });
        that.setData({
          brand_name: brand_name,
          popbrand: '',
          usedCar: res.data.data
        })
      }
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