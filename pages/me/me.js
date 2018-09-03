// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    islogin: false,
    list: [],
    jscode: '1234'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login() {

  },
  getData() {
    wx.request({
      url: 'https://event.applinzi.com/index.php?type=my',
      data: {
        jscode: this.data.jscode
      },
      success(res) {
        this.setData({
          list: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindGetUserInfo: function (e) {
    if (this.data.islogin) {
      console.log(e.detail.userInfo.avatarUrl)
    } else {

    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // user_info
  // 没有user_infp
  // wx.navigateback
  
  // 进来的人一定有user_info
  // img name
  // js_code  请求你的数据

  onShow: function () {
    var value = wx.getStorageSync('key')
    if (value) {
      this.setData({
        islogin: true
      })
      this.getData();
    } else {
      this.login();
    }
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