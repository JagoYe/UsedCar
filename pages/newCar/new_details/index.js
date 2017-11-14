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
    display: false,
    num: 3,
    active: 1,
    collections: '收藏车源',
    success: '收藏成功'
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
  //显示联系电话块
  phone: function (e) {
    var that = this;
    var display = e.currentTarget.dataset.display;
    if (display == false) {
      that.setData({
        show: 'show',
        display: true,
        masks: 'masks'
      })
    } else {
      that.setData({
        show: '',
        display: false,
        masks: ''
      })
    }
  },
  //点击拨打电话
  dialDhone: function (e) {
    var that = this;
    that.setData({
      show: '',
      display: false,
      masks: ''
    });
    wx.makePhoneCall({
      phoneNumber: '13577134567', //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var phone = app.globalData.userInfo.phone;
    //取缓存
    wx.getStorage({
      key: 'newCar_details',
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
            status.data.data.forEach(function (val, key) {
              if (val.id == res.data.id) {
                that.setData({
                  status: '拍卖中'
                })
              }
            })
          }
        });
        var imgUrls = res.data.images.split(' | ');
        var archives = res.data.advantage.split('、');
        var length = imgUrls.length;
        var buy_year = res.data.buy_time.substring(0, 4);
        var buy_month = res.data.buy_time.substring(4, 6);
        var publish_time = res.data.publish_time.split('/');
        //请求浏览足迹接口
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/footprintAdd',
          data: {
            user_phone: phone,
            car_id: res.data.id
          },
          success: function (footprint) {

          }
        });
        // 查询收藏的接口
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/collectionSelectByPhone',
          data: {
            user_phone: phone,
          },
          success: function (select) {
            select.data.data.forEach(function (val, key) {
              if (res.data.id == val.id) {
                that.setData({
                  active: 0,
                  collections: '已收藏',
                  success: '取消收藏'
                })
              }
            })
          },
        });
        that.setData({
          length: length,
          usedDetails: res.data,
          imgUrls: imgUrls,
          archives: archives,
          buy_year: buy_year,
          buy_month: buy_month,
          publish_time: publish_time,
        })
      },
    });
  },
  //点击请求收藏接口
  Collection: function () {
    var that = this;
    var phone = app.globalData.userInfo.phone;
    if (that.data.active == 1) {
      wx.request({
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Wechat/collectionAdd',
        data: {
          user_phone: phone,
          car_id: that.data.usedDetails.id
        },
        success: function (footprint) {
          that.setData({
            masks: 'masks',
            reveal: 'reveal',
            success: '收藏成功'
          });
          var num = that.data.num;
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
                active: 0,
                collections: '已收藏'
              })
            }
          }, 1000);
        }
      })
    } else {
      wx.request({
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Wechat/collectionDelete',
        data: {
          user_phone: phone,
          car_id: that.data.usedDetails.id
        },
        success: function (res) {
          that.setData({
            masks: 'masks',
            reveal: 'reveal',
            success: '取消收藏'
          });
          var num = that.data.num;
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
                active: 1,
                collections: '收藏车源'
              })
            }
          }, 1000);
        }
      })
    }
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