// pages/me/collection/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: '0',
    bgColor: 'bgColor',
    display: false
  },
  tabChange: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var condition = that.data.condition;
    if (index == condition){
      wx.request({
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Wechat/collectionSelectByPhone',
        data: {
          user_phone: '18787312252',
        },
        success: function (res) {
          var usedCar = [];
          var newCar = [];
          res.data.data.forEach(function (val, key) {
            if (val.category == '2') {
              usedCar.push(val);
            } else if (val.category == '1') {
              newCar.push(val)
            }
          });
          that.setData({
            newCar: newCar,
            usedCar: usedCar
          });
        }
      });
      that.setData({
        active: 'active',
        bgColor: 'bgColor',
        bgColors: '',
        active1: ''
      })
    }else{
      wx.request({
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Wechat/collectionSelectByPhone',
        data: {
          user_phone: '18787312252',
        },
        success: function (res) {
          var usedCar = [];
          var newCar = [];
          res.data.data.forEach(function (val, key) {
            if (val.category == '2') {
              usedCar.push(val);
            } else if (val.category == '1') {
              newCar.push(val)
            }
          });
          that.setData({
            newCar: newCar,
            usedCar: usedCar
          });
        }
      });
      that.setData({
        active: 'active1',
        bgColor: '',
        bgColors: 'bgColor',
        active1: 'active'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/collectionSelectByPhone',
      data: {
        user_phone: '18787312252',
      },
      success: function(res){
        console.log(res);
        var usedCar = [];
        var newCar = [];
        res.data.data.forEach(function(val,key){
          if(val.category == '2'){
            usedCar.push(val);
          } else if (val.category == '1'){
            newCar.push(val)
          }
        });
        that.setData({
          newCar: newCar,
          usedCar: usedCar
        });
      }
    });
  },
  //点击删除二手车收藏
  deleteUsedCar: function(e){
    var that = this;
    var car_id = e.currentTarget.dataset.id;
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/collectionDelete',
      data: {
        user_phone: '18787312252',
        car_id: car_id
      },
      success: function (res) {
        // that.data.usedCar.forEach(function (val, key) {
        //   console.log(val);
        //   that.data.usedCar[key].state = '0';
        // });
        that.data.usedCar.forEach(function (val, key) {
          if (val.id == car_id) {
            that.data.usedCar[key].state = '1';
          }
        });
        that.setData({
          usedCar: that.data.usedCar
        });
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/collectionSelectByPhone',
          data: {
            user_phone: '18787312252',
          },
          success: function (res) {
            var usedCar = [];
            var newCar = [];
            res.data.data.forEach(function (val, key) {
              if (val.category == '2') {
                usedCar.push(val);
              } else if (val.category == '1') {
                newCar.push(val)
              }
            });
            that.setData({
              newCar: newCar,
              usedCar: usedCar
            });
          }
        });
      }
    })
  },
  //点击删除新车收藏
  deleteNewCar: function (e) {
    var that = this;
    var car_id = e.currentTarget.dataset.id;
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.webSite + '/Home/Wechat/collectionDelete',
      data: {
        user_phone: '18787312252',
        car_id: car_id
      },
      success: function (res) {
        // that.data.newCar.forEach(function (val, key) {
        //   console.log(val);
        //   that.data.newCar[key].state = '0';
        // });
        that.data.newCar.forEach(function (val, key) {
          if (val.id == car_id) {
            that.data.newCar[key].state = '1';
          }
        });
        that.setData({
          newCar: that.data.newCar
        });
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/collectionSelectByPhone',
          data: {
            user_phone: '18787312252',
          },
          success: function (res) {
            var usedCar = [];
            var newCar = [];
            res.data.data.forEach(function (val, key) {
              if (val.category == '2') {
                usedCar.push(val);
              } else if (val.category == '1') {
                newCar.push(val)
              }
            });
            that.setData({
              newCar: newCar,
              usedCar: usedCar
            });
          }
        });
      }
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