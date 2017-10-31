// pages/used/sort/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    letterArr: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    webSite: app.globalData.webSite,
    toView: 'F',
    scrollTop: '',
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
      url: app.globalData.webSite + '/Home/Wechat/carBrandSelectAll',
      success: function(res){
        var brandObj = [
          {
            'initial': 'test'
          }
        ];
        var brandHandle = 0;
        
        res.data.forEach(function(val1, key1) {
          var handleObj = {}
          handleObj['initial'] = val1.initial;
          handleObj['name'] = [];
          handleObj['name'].push(val1.name);
          
          brandObj.forEach(function(val2, key2) {
            if (val2.initial == handleObj.initial) {
              brandHandle++;
            }
          });
          if(brandHandle == 0) {
            brandObj.push(handleObj);
          }else {
            brandObj.forEach(function(val3, key3) {
              if (val3.initial == val1.initial) {
                brandObj[key3]['name'].push(val1.name);
              }
            });
          }
          brandHandle = 0;
        });
        brandObj.splice(0,1);
        that.setData({
          brand: brandObj
        })
      }
      
    })
  },
  //点击品牌选择
  BrandChoice:function(e){
    var that = this;
    var brand_name = e.currentTarget.dataset.brand_name;
    wx.getStorage({
      key: 'cityName',
      success: function(res) {
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/carSelectByCityAndBrand',
          data:{
            category: '2', 
            city_name: res.data, 
            brand_name: brand_name
          },
          success: function(brandCar){
            wx.getStorage({
              key: 'usedCar',
              success: function(usedCar) {
                usedCar.data = brandCar.data.data;
                wx.setStorage({
                  key: 'usedCar',
                  data: usedCar.data,
                  success: function (car) {
                    wx.navigateBack({
                      delta: 1
                    })
                    // wx.navigateTo({
                    //   url: '../used_list/index',
                    // })
                  }
                })
              },
            })
          }
        })  
      },
    })
  },
  //点击字母选择车辆品牌
  cliclLetter: function(e){
    var that = this;
    var letter = e.currentTarget.dataset.letter
    that.data.brand.forEach(function(val,key){
      if (letter == val.initial){
        that.setData({
          toView: letter
        })
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