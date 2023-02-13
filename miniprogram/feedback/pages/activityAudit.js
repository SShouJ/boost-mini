// feedback/pages/activityAudit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    navList : [
      {
        id:0,
        title:"未审核",
      },
      {
        id:1,
        title:"已审核",
      },
    ],
    target:0,
    activityList:[{
      userAvatar:'../../images/avatar-nologin.png',
      userName:'佳华老师',
      userTime:'2小时前',
      class:'小班',
      activityImg:'../../images/img-activity1.png',
      title:'阿拉丁与神灯之沉睡精灵',
      subTitle:'平凡小子阿拉丁阴差阳错获得了神灯，并意外发现了神灯的秘密，这是...',
      date:'2016.04.15'
    },{
      userAvatar:'../../images/avatar-nologin.png',
      userName:'佳华老师',
      userTime:'2小时前',
      class:'大中班',
      activityImg:'../../images/img-activity1.png',
      title:'阿拉丁与神灯之沉睡精灵',
      subTitle:'平凡小子阿拉丁阴差阳错获得了神灯，并意外发现了神灯的秘密，这是...',
      date:'2016.04.15'
    }]
  },
  changeItem(e){
    this.setData({
      target:e.currentTarget.dataset.id,
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