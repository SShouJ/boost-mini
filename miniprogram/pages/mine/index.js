// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    userInfo: {},
    actInfoList:[
      {
        id:1,
        number:10,
        acttext:'已参与活动'
      }, {
        id:2,
        number:0,
        acttext:'中奖记录'
      },
    ],
   mineNav:[
     {
      id:1,
      title:"我的活动",
      image:"../../images/icon-myactive.png",
      name:"myActive"
    },
    {
      id:2,
      title:"商家入驻",
      image:"../../images/icon-settled.png",
      name:"settled"
    },
    {
      id:3,
      title:"入驻审核",
      image:"../../images/icon-audit.png",
      name:"audit"
    },{
      id:4,
      title:"收货地址",
      image:"../../images/icon-audit.png",
      name:"address"
    }
   ]
  },
  toPage(data){
    console.log(data.currentTarget.dataset.name);
    wx.navigateTo({
      url: '/pages/mine/'+ data.currentTarget.dataset.name+'/index',
    })
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