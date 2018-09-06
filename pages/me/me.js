// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    img: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login() {
    wx.showLoading({
      title: '正在加载',
    })
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            method: 'POST',
            url: 'https://event.applinzi.com/index.php?type=my',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              jscode: res.code
            },
            success: (res) => {
              wx.hideLoading();
              let data = res.data.data;

              let date = new Date();
              for (let i = 0; i < data.length; i++) {
                if (date > new Date(data[i].active_time)) {
                  data[i].isout = true
                } else {
                  data[i].isout = false;
                }
              }
              this.setData({
                list: data
              })


            }
          })


        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },
  getData() {
    wx.request({
      url: 'https://event.applinzi.com/index.php?type=my',
      data: {
        jscode: thpageis.data.jscode
      },
      success(res) {
        let data = res;
        console.log(data);
        // let date = new Date();
        // for (let i = 0; i < data.length; i++) {
        //   if (date > new Date(data[i].active_time)) {
        //     data[i].isout = true
        //   } else {
        //     data[i].isout = false;
        //   }
        // }
        // this.setData({
        //   list: data
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindGetUserInfo: function (e) {

    wx.getUserInfo({
      success: res => {
        this.setData({
          img: res.userInfo.avatarUrl,
          name: res.userInfo.nickName
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // user_info
  // 没有user_info
  // wx.navigateback

  // 进来的人一定有user_info
  // img name
  // js_code  请求你的数据

  onShow: function () {
    this.login();
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