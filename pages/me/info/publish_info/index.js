// pages/me/info/publish_info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: '0',
    carHandle: '',
    disabled: 'disabled',
    car: {
      
    }
  },
  // form表单
  formSubmit: function (e) {
    console.log(e.detail.value);
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
  //确认发布
  release: function(){
    wx.navigateBack({
      data: 1
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