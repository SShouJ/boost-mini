// pages/activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:[],
    navList:[],
    target:2,
  },
  toDetails(e){
    wx.navigateTo({
      url: '/pages/activityDetail/index?id='+e.currentTarget.dataset.id
    })
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
      let activityList = [
        {
          id:1,
          activityImg:"../../images/activity.png",
          activityName:"活动名称1",
          start:"2023-01-13",
          end:"2023-01-15",
          pressList:[
            {
              id:1001,
              pressImg:"../../images/goods1.png",
            },
            {
              id:1002,
              pressImg:"../../images/goods1.png",
            },
            {
              id:1003,
              pressImg:"../../images/goods1.png",
            },
            {
              id:1004,
              pressImg:"../../images/goods1.png",
            }
          ]
        },
        {
          id:2,
          activityImg:"../../images/activity.png",
          activityName:"活动名称2",
          start:"2023-01-13",
          end:"2023-01-15",
          pressList:[
            {
              id:1005,
              pressImg:"../../images/goods1.png",
            },
            {
              id:1006,
              pressImg:"../../images/goods1.png",
            },
            {
              id:1007,
              pressImg:"../../images/goods1.png",
            },
            {
              id:1008,
              pressImg:"../../images/goods1.png",
            }
          ]
        },
        {
          id:3,
          activityImg:"../../images/activity.png",
          activityName:"活动名称1",
          start:"2023-01-13",
          end:"2023-01-15",
          pressList:[
            {
              pressImg:"../../images/goods1.png",
            },
            {
              pressImg:"../../images/goods1.png",
            },
            {
              pressImg:"../../images/goods1.png",
            },
            {
              pressImg:"../../images/goods1.png",
            }
          ]
        },
      ]
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
        activityList,
        navList
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