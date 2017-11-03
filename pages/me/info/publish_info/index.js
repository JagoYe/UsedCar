// pages/me/info/publish_info/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: '0',
    carHandle: '',
    disabled: 'disabled',
    num: 3,
    car: {
      
    }
  },
  // form表单提交确认发布
  formSubmit: function (e) {
    var that = this;
    var num = that.data.num;
    var detailCar = e.detail.value;
    // console.log(e.detail.value);
    wx.getUserInfo({
      success: function (user) {
        var nickName = user.userInfo.nickName
        if (
          detailCar.city_name != '' && detailCar.category != '' &&
          detailCar.brand_name != '' && detailCar.style_name != '' &&
          detailCar.cost_price != '' && detailCar.price != '' && 
          detailCar.mileage != '' && detailCar.output != '' &&
          detailCar.detail != '' && detailCar.buy_time != '' &&
          detailCar.color != '' && detailCar.situation != '' && 
          detailCar.factory != '' && detailCar.advantage != ''){
            wx.request({
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: app.globalData.webSite + '/Home/Wechat/pendingVehicleAdd',
              data: {
                city_name: detailCar.city_name,
                category: detailCar.category,
                brand_name: detailCar.brand_name,
                style_name: detailCar.style_name,
                cost_price: detailCar.cost_price,
                price: detailCar.price,
                mileage: detailCar.mileage,
                output: detailCar.output,
                detail: detailCar.detail,
                buy_time: detailCar.buy_time,
                images: 'test',
                color: detailCar.color,
                situation: detailCar.situation,
                factory: detailCar.factory,
                advantage: detailCar.advantage,
                user_name: nickName,
                user_phone: '18787312252'
              },
              success: function (res) {
                that.setData({
                  show: 'show',
                  reveal: 'reveal'
                })
                var timer = setInterval(function () {
                  num--;
                  that.setData({
                    num: num
                  });
                  if (num == 0) {
                    clearInterval(timer);
                    that.setData({
                      show: '',
                      reveal: ''
                    });
                    wx.navigateBack({
                      delta: 2
                    });
                  }
                }, 1000);
              }
            })
        }
      }
    }) 
  },

  //多行文本框
  inputText: function (e) {
    var that = this;
    that.setData({
      length: e.detail.value.length,
      value: e.detail.value
    });
  },
  //点击弹出
  clickPop: function(e){
    var that = this;
    var input = e.currentTarget.dataset.input;
    that.setData({
      active:'active',
      height:'height',
      carHandle: input
    });
  },
  //确定
  confirm: function (e) {
    var that = this;
    var input = that.data.carHandle;
    var car = that.data.car;
    var value = that.data.value;
    if(input == 'title') {
      car.title = value;
      that.setData({
        active: '',
        height:'',
        car: car,
        values:'',
        disabled:''
      });
    }else if(input == 'brand') {
      car.brand = value;
      that.setData({
        active: '',
        height: '',
        car: car,
        values: '',
        disabled: ''
      });
    }else if(input == 'time') {
      car.time = value;
      that.setData({
        active: '',
        height: '',
        car: car,
        values: '',
        disabled: ''
      });
    }
  },
  //上传照片
  upload: function(){
    wx.navigateTo({
      url: '../photo/index',
    })
  },
  // //确认发布
  // release: function(e){
  //   var that = this;
  //   wx.navigateBack({
  //     data: 1
  //   });
  //   console.log(that.data);
  //   wx.request({
  //     method: 'POST',
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     url: app.globalData.webSite + '/Home/Wechat/pendingVehicleAdd',
  //     data:{

  //     }
  //   })  
  // },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    var year = e.detail.value.substring(0,4) + '年';
    var month = e.detail.value.substring(5, 7) + '月';
    var day = e.detail.value.substring(8, 10) + '日';
    var date = year + month + day;
    this.setData({
      date: date,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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