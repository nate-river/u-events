// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  
  getData() {
    let data = [{
      user_name: "活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1",
      user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLgXj6Axr2aRKDv3qIIwrfnGyMjPUmJI2auiaO4xZBCIYkvQ4ria784dXoXMzPiaxhMgicnoiasqG0GsIQ/132",
      active_info: "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
      active_time: "2018/09/04 19:28",
      number: "111",
    },
    {
      user_name: "活动2",
      user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLgXj6Axr2aRKDv3qIIwrfnGyMjPUmJI2auiaO4xZBCIYkvQ4ria784dXoXMzPiaxhMgicnoiasqG0GsIQ/132",
      active_info: "描述",
      active_time: "2018/09/05 19:28",
      number: "111",
    }
    ];


     let date =  new Date();
     for(let i=0;i<data.length;i++){
        if(date > new Date(data[i].active_time) ){
           data[i].isout = true 
        }else{
           data[i].isout = false;
        }
     }
     this.setData({
       list:data
     })
    // wx.request({
    //   url: 'https://event.applinzi.com/index.php?type=my',
    //   data: {
    //     jscode: this.data.jscode
    //   },
    //   success(res) {
      
    //     this.setData({
    //       list: res.data
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindGetUserInfo: function (e) {
    // if (this.data.islogin) {
    //   console.log(e.detail.userInfo.avatarUrl)
    // } else {

    // }
    wx.getUserInfo({
      success:res=>{
        this.setData({
          img: res.userInfo.avatarUrl
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