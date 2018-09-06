// pages/event/event.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'primary',
    id: 0,
    disabled: false,
    a: null,
    // 活动信息
    activeinfo: null,
    // 用户信息
    user_info: null,
    list: [],
    islogin: false,
    code: 0,
  },
  // 打电话
  callperson() {
    wx.makePhoneCall({
      phoneNumber: '15735183801'
    })
  },

  // 获取用户信息
  bindGetUserInfo: function (e) {
    this.setData({
      user_info: e.detail.userInfo
    }, () => {
      this.join();
    })
  },

  join() {
    if (wx.getStorageSync('a')) {
      this.setData({
        a: wx.getStorageSync('a')
      })
      wx.showToast({
        title: '不要重复点击',
        icon: 'none'
      })
      return;
    } else {
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.showLoading({
              title: '正在加载',
            })
            wx.request({
              method: "POST",
              url: 'https://event.applinzi.com/index.php?type=join',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                jscode: res.code,
                user_name: this.data.user_info.nickName,
                user_img: this.data.user_info.avatarUrl,
                active_id: this.data.id
              },
              success: (ress) => {
                this.setData({
                  a: true
                })
                wx.setStorageSync('a', true)
                wx.hideLoading();
                if (ress.data.code == 200) {
                  this.getData();
                }
              }
            })


          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }

  },

  // 设置是否可以加入
  setDisabled() {
    // 活动人数  参加
    let flag = this.data.list.some(element => element.user_name == this.data.user_info.nickName);
    if (this.data.activeinfo.active_person > this.list.length && flag) {
      this.setData({
        disabled: true
      })
    }
  },

  // 获取活动信息
  getData() {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.showLoading({
            title: '正在加载',
          })
          wx.request({
            method: 'POST',
            url: 'https://event.applinzi.com/index.php?type=actives&id=' + this.data.id,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              jscode: res.code
            },
            success: (ress) => {
              wx.hideLoading();
              this.setData({
                activeinfo: ress.data.active,
                list: ress.data.list
              });
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    } else {
      this.setData({
        id: 131
      })
    }
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
    this.setData({
      a: wx.getStorageSync('a')
    })
    this.getData();
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