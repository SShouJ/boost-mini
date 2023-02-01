// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    userInfo: {},
    activities: [
      {
        id: 1,
        text: '信息1'
      },
      {
        id: 2,
        text: '信息2'
      },
      {
        id: 3,
        text: '信息3'
      },
      {
        id: 4,
        text: '信息4'
      },
    ],
    navList: ['推荐', '男装', '女装', '手机', '电脑', '百货', '电器', '全部',],
    nav_type: 0,
  },
  changeType: function (e) {
    let {
      index
    } = e.currentTarget.dataset;
    if (this.data.nav_type === index || index === undefined) {
      return false;
    } else {
      // 当前点击的
      console.log(this.data.navList[index])
      this.setData({
        nav_type: index
      })
    }
  },
  login() {
    const _this = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {

          _this.setUserInfo();
        }
      }
    })
  },
  // 设置data中userinfo和islogin的值
  setUserInfo() {
    wx.getUserProfile({
      desc: '用于登录',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        this.setData({
          islogin: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})