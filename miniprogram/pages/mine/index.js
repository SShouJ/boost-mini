// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      image:"../../images/icon-activity.png"
    },
    {
      id:2,
      title:"商家入驻",
      image:"../../images/icon-activity.png"
    },
    {
      id:3,
      title:"入驻审核",
      image:"../../images/icon-activity.png"
    }
   ]
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