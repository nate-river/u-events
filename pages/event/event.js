// pages/event/event.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'default',
    aid: 10,
    disabled: false,
    // 活动信息
    activeinfo: {},
    // 用户信息
    user: null,
    islogin: false,
    code: 0,
  },
  // 获取用户信息
  bindGetUserInfo: function(e) {
    this.setData({
      user: e.detail.userInfo
    }, () => {
      wx.setStorageSync('info', this.data.user);
      this.login();
    })
  },

  login() {
    wx.login({
      success: function(res) {
        if (res.code) {
          this.setData({
            code: res.code
          }, () => {
            wx.request({
              url: 'https://event.applinzi.com/',
              data: {
                jscode: res.code
              }
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  // 设置是否可以加入
  setDisabled() {
    // 活动人数  参加
    let a = 30,
      b = 20;
    if (b >= a) {
      this.setData({
        disabled: true
      })
    }
  },

  // 获取活动信息
  getData() {
    wx.request({
      url: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        aid: this.data.aid
      },
      success: function(res) {
        console.log(res.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //  this.setDisabled()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})