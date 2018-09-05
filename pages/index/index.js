// pages/index/index.js
Page({
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'form.active_time': e.detail.value
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  toastShow: function (event) {
    this.setData({ status: false })　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
    console.log(this.data.status);
  },
  toastHide: function (event) {
    this.setData({ status: true })
  },
  toastShow1: function (event) {
    this.setData({ status1: false })　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
    console.log(this.data.status1);
  },
  toastHide1: function (event) {
    this.setData({ status1: true })
  },
  downloadFile: function () {
    this.setData({ imgs: 'http://192.168.4.156/uek_active/?type=fenxiang&id=' + wx.getStorageSync("token") });
    this.toastShow1();
    // wx.request({
    //   url: 'http://192.168.4.156/uek_active/?type=fenxiang&id=' + wx.getStorageSync("token"), //仅为示例，并非真实的接口地址
    //   method: "GET",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success: (res) => {
    //     // 拿到活动Id
    //     // 吊起弹出窗口
       
    //     console.log(res)
       

    //   }
    // })
  },
  formSubmit(e) {

    this.setData({
      form: e.detail.value
    })
    this.setData({
      'form.user_name': this.data.user_info.nickName,
      'form.user_img': this.data.user_info.avatarUrl
    })
    wx.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求
          this.setData({
            "form.jscode": res.code
          })
          wx.request({
            url: 'http://192.168.4.156/uek_active/index.php?type=add', //仅为示例，并非真实的接口地址
            method: "POST",
            data: this.data.form,
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success:(res)=>{
              // 拿到活动Id
              // 吊起弹出窗口
              console.log(res);
              wx.setStorageSync("token", res.data.id);
              this.toastShow();
              
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

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
    status1:true,
    form: {},
    imgs:''
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
    wx.setStorageSync('user_info', e.detail.userInfo)
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