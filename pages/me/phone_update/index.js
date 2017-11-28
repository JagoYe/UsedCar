// pages/me/phone_update/index.js
var winWidth = 0
var winHeight = 0
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 3,
    className: 'model',
    on: 'on1',
    seconds: "60",
    check_code: "000000",
    flag: true,
    hide: false,
    check: '',
    numCheck: ''
  },
  //输入手机号触发事件
  mobileInput: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value,
      length: e.detail.cursor
    });
  },
  //输入验证码触发事件，获取input框的值
  // getValidation: function (e) {
  //   var that = this;
  //   that.setData({
  //     check: e.detail.value
  //   });
  // },
  // //输入数字验证码触发事件，获取input值
  // numCheckInput: function (e) {
  //   var that = this;
  //   that.setData({
  //     numCheck: e.detail.value
  //   })
  // },
  // //点击获取验证码
  // prove: function () {
  //   var that = this;
  //   var prompt;
  //   var phone = that.data.phone;
  //   if (that.data.length == 11) {
  //     wx.request({
  //       header: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       url: app.globalData.webSite + '/Home/Admin/sendPhoneMessage',
  //       data: {
  //         send_model: 'sign_up',
  //         phone: phone
  //       },
  //       method: 'POST',
  //       success: function (res) {
  //         that.setData({
  //           randomNum: res.data.randomNum
  //         });
  //       }
  //     });

  //     var check_code = '';
  //     for (var i = 0; i < 6; i++) {
  //       check_code += parseInt(Math.random() * 10);
  //     };
  //     that.setData({
  //       prompt: '',
  //       hid: true,
  //       flag: false,
  //       check_code: check_code
  //     });
  //     //重新获取验证码定时器
  //     var nums = that.data.seconds;
  //     var timer = setInterval(function () {
  //       nums--;
  //       that.setData({
  //         seconds: nums
  //       });
  //       if (nums == 0) {
  //         clearInterval(timer);
  //         that.setData({
  //           seconds: '60',
  //           flag: true,
  //           hid: false
  //         });
  //       }
  //     }, 1000);
  //   } else {
  //     wx.showModal({
  //       content: '您所填的手机号有误，请从新输入',
  //       success: function (res) {
  //         if (res.confirm) {
  //           console.log('用户点击确定')
  //         }
  //       }
  //     })
  //   }
  // },
  //修改手机号
  confirm: function (e) {
    var that = this;
    var check = that.data.check;//手动输入的手机短信验证码
    var numCheck = that.data.numCheck;//手动输入的数字验证码
    var check_code = that.data.check_code;//随机生成的数字验证码
    var randomNum = that.data.randomNum;//接口返回短信验证码
    // if (check == '' || check != randomNum || numCheck != check_code || numCheck == '') {
    //   wx.showModal({
    //     content: '您输入的手机短信验证码或数字验证码有误，请从新输入',
    //     success: function (res) {

    //     }
    //   })
    // } else {
    if(that.data.length == 11){
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Wechat/userPhoneUpdate',
        data: {
          old_phone: app.globalData.userInfo.phone,
          new_phone: that.data.phone,
        },
        method: 'POST',
        success: function (res) {
          app.globalData.userInfo.phone = that.data.phone;
          that.setData({
            className: 'model1',
            on: 'on'
          });
          var num = that.data.second;
          var timer = setInterval(function () {
            num--;
            that.setData({
              second: num
            });
            if (num == 0) {
              clearInterval(timer);
              wx.reLaunch({
                url: '/pages/me/index/index',
              })
            }
          }, 1000);
        }
      })
    }else{
      wx.showModal({
        content: '您输入的手机号码位数不对，请从新输入',
        success: function (res) {

        }
      })
    }
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        winHeight = res.windowHeight;
        winWidth = res.windowWidth;
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