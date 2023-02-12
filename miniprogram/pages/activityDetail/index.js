// pages/activityDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:1800,
    countdown:'',
    text:'还差10人可抽取下一级奖品，立即参与',
    showIndex:null,//打开弹窗的对应下标
    height:'',//屏幕高度
    joinFlag:false,
    showFlag:false,
    percent:68,
    timeDate:''
  },
  openPopup(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      showIndex:index
    })
  },
  //转时间
  toHHmmss (data) {
    var time;
    var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (data % (1000 * 60)) / 1000;
    time = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
    return time;
 },
 
  date(){
   let date = new Date().getTime()
   date = 1676246400000 - date
   date = this.toHHmmss(date)
  // let  seconds = (date % (1000 * 60)) / 1000;
    this.setData({
      time:date
    })
    // console.log(date);
  },
  //关闭弹窗
  closePopup(){
    this.setData({
      showIndex:null
    })
  },
  toPage(data){
    console.log(data.currentTarget.dataset.name);
    wx.navigateTo({
      url: '/pages/'+ data.currentTarget.dataset.name+'/index',
    })
  },
  join(data){
    console.log(data.currentTarget.dataset);
    var _this = this
    // console.log(data);
    this.setData({
      joinFlag:true,
      showFlag:data.currentTarget.dataset.flag,
      text:'还差10人可抽取下一级奖品，点击分享',
      percent:90
    })
    console.log(this.data.showFlag);
    if (this.data.showFlag == "true") {
      wx.showModal({
        title: '活动提示',
        content: '参与成功，分享好友的积分换豪礼',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            _this.setData({
              showFlag : false
            })
            console.log(_this.data.showFlag)
          }
        }
      })
    }
    // console.log(this.data.joinFalg);
  },
  countdown(){
    var minute=Math.floor(this.data.time  / 60 );
    var second=this.data.time  % 60
    second<10?second='0'+second:'';
    this.setData({
        countdown:minute+':'+second,
        time:this.data.time-1
    })
    setTimeout(this.countdown, 1000);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.countdown()
    this.date()
    wx.showShareMenu({
      withShareTicket: true,
      menus:['shareAppMessage','shareTimeline']
  })
    console.log(options)
  },
  // 倒计时
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.windowHeight
        });
      },
    })
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