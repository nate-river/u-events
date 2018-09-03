// pages/index/index.js
Page({
  toastShow: function (event) {
    this.setData({ status: false })　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },
  toastHide: function (event) {
    this.setData({ status: true })
  },
  downloadFile: function () {
    wx.downloadFile({
      url: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png', //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            console.log(result)
          }
        })

      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    status: true　　　　　　　　　　　　//data里面的属性可以传递到视图
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
  wx.request({
      url: 'https://event.applinzi.com/index.php?type=add', //仅为示例，并非真实的接口地址
      method:"post",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
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
    
  },
 

})