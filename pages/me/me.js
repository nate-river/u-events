// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    img:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  
  getData() {
    wx.request({
      url: 'https://event.applinzi.com/index.php?type=my',
      data: {
        jscode: this.data.jscode
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
      success:res=>{
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
      // let info=wx.getStorageSync("user_info");
      // if(info){

      // }else{
      //   wx.navigateBack();
      // }
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