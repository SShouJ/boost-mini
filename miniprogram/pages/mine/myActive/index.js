// pages/mine/myActive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    activityList:[],
    target:2,
  },
  changeItem(e){
    this.setData({
      target:e.currentTarget.dataset.id,
    })
  },
  toDetail(e){
    wx.navigateTo({
      url: '/feedback/pages/' + e.currentTarget.dataset.name
    })
  },
  toActive(){
    wx.navigateTo({
      url: "/pages/activity/createActive/index",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let navList = [
      {
        id:1,
        title:"全部",
      },
      {
        id:2,
        title:"待开奖",
      },
      {
        id:3,
        title:"已结束",
      },
      {
        id:4,
        title:"未开始",
      },
    ]
    this.setData({
      navList
    })
  },
  getActivity(){
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'activity',
      // 传给云函数的参数
      data: {
        type:'getMyActivity',
        status:1,
        pageSize: 2,
        pageNum: 1,
      },
      // 成功回调
    }).then(res => {
      console.log(res.result.data.list[0]);
      this.setData({
        activityList:res.result.data.list
      })
    })
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
    this.getActivity()
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