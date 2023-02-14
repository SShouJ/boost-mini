// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    userInfo: {},
    avatarUrl:'',
    actInfoList:[
      {
        id:1,
        number:10,
        acttext:'已参与活动',
        page:"attendEvents"

      }, {
        id:2,
        number:0,
        acttext:'中奖记录',
        page:"winningRecords"
      },{
        id:3,
        number:0,
        acttext:'兑换记录',
        page:"redemptionHistory"
      }
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
  toFeedbackPages(data){
    console.log(data.currentTarget.dataset.name);
    wx.navigateTo({
      url: '/feedback/pages/'+ data.currentTarget.dataset.name,
    })
  },
  login() {
    const _this = this;
    if(this.data.islogin) return;
    wx.cloud.callFunction({
      name: 'user',
      data: {
        type:"findUser",
        avatarUrl:'cloud://cloud1-7ge7nl2m42cee9e9.636c-cloud1-7ge7nl2m42cee9e9-1316264853/avatar/avatar1.png',
      }
    }).then(res=>{
      console.log('------------我是调用查找用户的接口---------------');
      console.log(res);
      console.log('---------------------------我是调用查找用户的接口结束--------------------');
      if(res.result.status == 1){
        _this.setData({
          userInfo:res.result.event.userInfo,
          avatarUrl:res.result.event.userInfo.avatarUrl,
          islogin:true,
        })
        console.log(_this.data.userInfo);
      }else{
        _this.setUserInfo();
      }
    })
  },
  // 设置data中userinfo和islogin的值
  setUserInfo() {
    console.log("--------------")
    wx.getUserProfile({
      desc: '用于登录',
      success: (res) => {
        console.log(res);
        // 这边如果没有登录自动把数据加上去
        wx.cloud.callFunction({
          name: 'user',
          data: {
            type:'findUser',
            avatarUrl:'cloud://cloud1-7ge7nl2m42cee9e9.636c-cloud1-7ge7nl2m42cee9e9-1316264853/avatar/avatar1.png',
          }
        }).then(res=>{
          console.log(res.result);
          this.setData({
            userInfo:res.result.event.userInfo,
            avatarUrl:res.result.event.userInfo.avatarUrl,
          })
        })
        this.login();
        this.setData({
          // userInfo: res.userInfo,
          islogin: true
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.login();
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
