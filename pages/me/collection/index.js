// pages/me/collection/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: '0',
    bgColor: 'bgColor'
  },
  tabChange: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var condition = that.data.condition;
    if (index == condition){
      that.setData({
        active: 'active',
        bgColor: 'bgColor',
        bgColors: '',
        active1: ''
      })
    }else{
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
        var usedCar = [];
        var newCar = [];
        res.data.data.forEach(function(val,key){
          if(val.category == '2'){
            usedCar.push(val);
          }else{
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