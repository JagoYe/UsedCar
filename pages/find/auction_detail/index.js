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
    subscript: "1"
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'carId',
      success: function(carId) {
        console.log(carId.data);
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: app.globalData.webSite + '/Home/Wechat/carSalePendingById',
          data: {id: carId.data},
          success:function(res){
            console.log(res);
            var imgUrls = res.data.data[0].images.split(' | ');
            var length = imgUrls.length;
            var archives = res.data.data[0].advantage.split('、');
            var time = res.data.data[0].publish_time.split('/');
            var publish_time = time[0] + '年' + time[1] + '月' + time[2] + '日';
            if(res.data.data[0].best_price == ''){
              var bid_price = parseFloat(res.data.data[0].car_sale.starting_price) + parseFloat(res.data.data[0].car_sale.amount_of_increase / 10000)
              that.setData({
                best_price: res.data.data[0].car_sale.starting_price,
                bid_price: bid_price
              })
            }else{
              var bid_price = parseFloat(res.data.data[0].best_price) + parseFloat(res.data.data[0].car_sale.amount_of_increase / 10000)
              that.setData({
                best_price: res.data.data[0].best_price,
                bid_price: bid_price 
              })
            }
            that.setData({
              length: length,
              imgUrls: imgUrls,
              cardetail: res.data.data[0],
              publish_time: publish_time,
              archives: archives,
            })
          }
        })  
      },
    })
  },
  // 点击竞拍车辆
  ClickAuction: function(){
    var that = this;
    that.setData({
      masks: 'masks',
      reveal: 'reveal'
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