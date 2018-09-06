// pages/index/index.js
Page({

  saveImg: function () {
    wx.showLoading({
      title: '下载中',
    });
    wx.downloadFile({
      url: 'https://event.applinzi.com/index.php?type=fenxiang&id=' + wx.getStorageSync("token"),
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          wx.playVoice({
            filePath: res.tempFilePath
          })
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
            }
          })
        }
      }
    });
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'form.active_time': e.detail.value
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },

  toastShow: function (event) {
    this.setData({ status: false })　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },
  toastHide: function (event) {
    this.setData({ status: true })
  },
  toastShow1: function (event) {
    this.setData({ status1: false })　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },
  toastHide1: function (event) {
    this.setData({ status1: true })
  },
  downloadFile: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading();
    }, 2000);
    this.setData({ imgs: 'https://event.applinzi.com/index.php?type=fenxiang&id=' + wx.getStorageSync("token") });
    this.toastShow1();
    this.setData({ status: true });
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    this.setData({
      animationData: animation.export()
    })
  },
  formSubmit(e) {

    this.setData({
      form: e.detail.value
    })

    this.setData({
      'form.user_name': this.data.user_info.nickName,
      'form.user_img': this.data.user_info.avatarUrl
    })
    if (!this.data.form.title || !this.data.form.active_info || !this.data.form.active_time || !this.data.form.active_person) {
      wx.showToast({
        title: '请输入完整活动信息',
        icon: 'none',
        duration: 2000
      });
      this.setData({ status: true });

    }
    else {
      wx.showLoading({
        title: '正在加载',
      })

      wx.login({
        success: (res) => {
          if (res.code) {
            //发起网络请求
            this.setData({
              "form.jscode": res.code
            })
            wx.setStorageSync('form.jscode', res.code)

            wx.request({
              url: 'https://event.applinzi.com/index.php?type=add', //仅为示例，并非真实的接口地址
              method: "POST",
              data: this.data.form,
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: (res) => {
                wx.hideLoading();
                // 拿到活动Id
                // 吊起弹出窗口
                wx.setStorageSync("token", res.data.id);
                this.toastShow();
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });

    }

  },
  // 点击分享到好友 调微信接口
  // 点击分享到朋友圈   下载图片 把图片在页面中显示
  // 点击保存到相册   调微信接口

  /**
   * 页面的初始数据
   */
  data: {
    user_info: null,
    status: true,　　　　　　　　　　　//data里面的属性可以传递到视图
    status1: true,
    form: {

      active_time: "请选择日期",
    },
    imgs: '',
    animationData: {}
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
    if (!this.data.user_info) {
      if (wx.getStorageSync('user_info')) {
        this.setData({
          user_info: wx.getStorageSync('user_info')
        })
      } else {

      }
    }
  },
  get(e) {
    this.setData({
      user_info: e.detail.userInfo
    })
    wx.setStorageSync('user_info', e.detail.userInfo);



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

  },


})