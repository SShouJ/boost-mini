// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    userInfo: {},
    actInfoList: [{
      id: 1,
      number: 10,
      acttext: '已参与活动',
      page: "attendEvents"

    }, {
      id: 2,
      number: 0,
      acttext: '中奖记录',
      page: "winningRecords"
    }, {
      id: 3,
      number: 0,
      acttext: '兑换记录',
      page: "redemptionHistory"
    }],
    mineNav: [{
        id: 1,
        title: "我的活动",
        image: "../../images/icon-myactive.png",
        name: "myActive"
      },
      {
        id: 2,
        title: "商家入驻",
        image: "../../images/icon-settled.png",
        name: "settled"
      },
      {
        id: 3,
        title: "入驻审核",
        image: "../../images/icon-audit.png",
        name: "audit"
      }, {
        id: 4,
        title: "收货地址",
        image: "../../images/icon-audit.png",
        name: "address"
      }
    ]
  },
  toPage(data) {
    let _this = this
    console.log(data.currentTarget.dataset.name);
    if (this.data.userInfo.openid) {

      wx.navigateTo({
        url: '/pages/mine/' + data.currentTarget.dataset.name + '/index',
      })
    }else{
      _this.addUser()
    }
  },
  toFeedbackPages(data) {
    let _this = this
    console.log(data.currentTarget.dataset.name);
    if (this.data.userInfo.openid) {
      wx.navigateTo({
        url: '/feedback/pages/' + data.currentTarget.dataset.name,
      })
    } else {
      _this.addUser()
    }
  },
  async addUser() {
    console.log(1);
    let {
      getUserInfo,
      addUserInfo,
      getUserProfile
    } = getApp();
    let res = await getUserProfile();
    console.log(res);
    let res2 = await addUserInfo();
    console.log(res2);
    if (res2.result.status == 1) {
      let res3 = await getUserInfo();
      console.log(res3);
      this.setData({
        userInfo: res3.result.data,
        islogin: true
      })
    }
    // console.log('同意');
    // wx.getUserProfile({
    //   desc: '用于登录',
    //   success: async(res) => {
    //     let res = await getApp().addUserInfo()
    //     console.log(res);
    //   }
    // })
    //   if (res.result.status == 1 ) {
    //       let userInfo = await getApp().getUserInfo();
    //       this.setData({
    //         userInfo : userInfo,
    //         islogin : true
    //         })
    //   }
    //   console.log(this.data.userInfo);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let res = await getApp().getUserInfo()
    if (res.result.status == 1) {
      this.setData({
        userInfo: res.result.data,
        islogin: true
      })
    } else {
      console.log(res.result.msg);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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