// pages/used/used_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: false,
    searchHandle: '0',
  },

  tabChange: function (e) {
    var that = this;
    var searchHandle = that.data.searchHandle;
    var index = e.currentTarget.dataset.active;
    if (searchHandle == index) {
      that.setData({
        color:"",
        display: false,
        searchStyle: '',
        searchHandle: '0',
        show:''
      });
    } else {
      var display = e.currentTarget.dataset.display;
      var color = 'change' + index;
      var searchStyle = 'active' + index;
      //当前点击内容出现
      that.setData({
        display: true,
        color:color,
        show:'show',
        searchStyle: searchStyle,
        searchHandle: index
      });
    }
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