// pages/find/carWash_details/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  clickdetail: function(){
    var that = this;
    wx.navigateTo({
      url: '/pages/find/auction_detail/index'
    })
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
      url: app.globalData.webSite + '/Home/Wechat/carSalePendingByStatus',
      data: { status: '0'},
      success:function(res){
        console.log(res);
        res.data.data.forEach(function(val,key){
          console.log(val);
          setInterval(function () {
            var timestamp = val.car_sale.ending_timestamp * 1000 - new Date().getTime();//获取剩余时间戳new Date().gitTime():获取当前时间戳
            if (timestamp >= 0) {
              var times = parseInt(timestamp / 1000);//毫秒转换为秒计算
              var day = parseInt(times / (60 * 60 * 24));//天
              var hour = parseInt((times - day * 24 * 60 * 60) / 3600);//小时
              var minute = parseInt((times - day * 24 * 60 * 60 - hour * 3600) / 60);//分
              var second = parseInt(times - day * 24 * 60 * 60 - hour * 3600 - minute * 60);//秒
              var time = day + '天' + hour + '小时' + minute + '分' + second + '秒';
              that.setData({
                time: time
              })
            } else {
              that.setData({
                time: '拍车结束',
                cardetails: res.data.data
              })
            }
          }, 1000);
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