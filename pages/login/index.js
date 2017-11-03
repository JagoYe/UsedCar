// pages/me/phone_update/index.js
var winWidth = 0;
var winHeight = 0;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 3,
    className: 'model',
    on: 'on1',
    phone: '',
    seconds: "60",//时间
    showBtn: "codes",
    showBtn1: 'none',
    check: '',
    numConfirm: '000000',
    digital: '',
  },
  //输入手机号触发事件
  mobileInput: function (e) {
    var that = this;
    var phone;
    var length;
    that.setData({
      phone: e.detail.value,
      length: e.detail.cursor
    });
  },
  //输入验证码触发事件，获取input框的值
  getValidation: function (e) {
    var that = this;
    that.setData({
      check: e.detail.value
    });
  },
  //输入数字验证码触发事件，获取input的值
  numConfirm: function (e) {
    var that = this;
    that.setData({
      digital: e.detail.value
    })
  },
  //点击获取验证码
  prove: function () {
    var that = this;
    var prompt;
    var phone = that.data.phone;
    if (that.data.length == 11) {
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Admin/sendPhoneMessage',
        data: {
          send_model: 'sign_up',
          phone: phone
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            randomNum: res.data.randomNum
          });
        }
      });
      var numConfirm = '';
      for (var i = 0; i < 6; i++) {
        numConfirm += parseInt(Math.random() * 10);
      };
      that.setData({
        numConfirm: numConfirm,
        prompt: '',
        showBtn: "none",
        showBtn1: "codes"
      });
      //重新获取验证码定时器
      var nums = that.data.seconds;
      var timer = setInterval(function () {
        nums--;
        that.setData({
          seconds: nums
        });
        if (nums == 0) {
          clearInterval(timer);
          that.setData({
            showBtn: "codes",
            showBtn1: "none",
            seconds: '60'
          });
        }
      }, 1000);
    } else {
      that.setData({
        prompt: '手机号位数不对,无法获取验证码'
      })
    }
  },

  //点击注册
  confirm: function (e) {
    var that = this;
    var name = app.globalData.userInfo.nickName;
    var open_id = app.globalData.openId;
    var phone = that.data.phone;//接收电话号码
    var prompt;
    var length = that.data.length;
    var randomNum = that.data.randomNum;  //短信验证码
    var check = that.data.check;          //手动输入短信验证码
    var digital = that.data.digital       //手动输入的数字验证码
    var numConfirm = that.data.numConfirm //随机生成的数字验证码
    //判断手机号位数
    if (length == 11) {
      //判断验证码是否正确
      if (check == '' || randomNum != check || digital != numConfirm || digital == '') {
        that.setData({
          prompt: '手机短信验证码有误或数字验证码有误,请重新输入'
        });
      } else {
        wx.request({
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/userAdd',//调用接口地址
          data: {
            name: name,
            open_id: open_id,
            phone: phone
          },
          method: 'POST',
          success: function (res) {
            if (res.data.code == '200') {
              //更新globalData
              app.globalData.loginStatus = true;
              app.globalData.userInfo.phone = res.data.data.phone;
              app.globalData.userInfo.score = res.data.data.score;
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
                  //返回上一页
                  clearInterval(timer);
                  wx.navigateBack({
                    delta: 1 //返回页数
                  })
                }
              }, 1000);
            } else {
              that.setData({
                prompt: '注册失败'
              })
            }
          }
        });
        //
      }
    } else {
      that.setData({
        prompt: '手机号位数不对,无法注册'
      })
    }
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